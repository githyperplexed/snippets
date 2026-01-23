
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
require("dotenv").config();

// Configuration
const BUCKET_NAME = process.env.CLOUDFLARE_BUCKET_NAME;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.CLOUDFLARE_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.CLOUDFLARE_SECRET_ACCESS_KEY;
const PUBLIC_URL_BASE = process.env.PUBLIC_URL_BASE; // Optional: for logging

if (!BUCKET_NAME || !ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

// Helper: Upload a single file
async function uploadFile(filePath, key) {
  const fileContent = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath) || "application/octet-stream";

  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileContent,
      ContentType: contentType,
      // CacheControl: "max-age=3600", // Optional: 1 hour cache
    });
    
    await client.send(command);
    console.log(`✅ Uploaded: ${key}`);
  } catch (err) {
    console.error(`❌ Failed to upload ${key}:`, err);
    process.exit(1);
  }
}

// Helper: Recursively walk a directory
function getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

// Main logic
async function main() {
  // Arguments passed from the GitHub Action or CLI
  // We expect a comma-separated list of package names that CHANGED
  // Example: "profile-thrower,glowing-card"
  const changedPackages = process.argv[2] ? process.argv[2].split(",") : [];

  if (changedPackages.length === 0) {
    console.log("No packages changed. Skipping deployment.");
    return;
  }

  console.log(`🚀 Deploying ${changedPackages.length} packages: ${changedPackages.join(", ")}`);

  for (const pkgName of changedPackages) {
    // We assume the package name exactly matches the folder name in "packages/"
    const distPath = path.resolve(__dirname, `../packages/${pkgName}/dist`);

    if (!fs.existsSync(distPath)) {
      console.warn(`⚠️  Warning: No "dist" folder found for ${pkgName}. Skipping.`);
      continue;
    }

    const files = getFiles(distPath);

    for (const file of files) {
      // transform absolute path to relative path from dist
      // e.g. /users/me/repo/packages/abc/dist/index.js -> index.js
      const relativePath = path.relative(distPath, file);
      
      // Construct the key for R2
      // Goal: snippets/<pkgName>/<relativePath>
      // Make sure we use forward slashes for S3 keys
      const s3Key = `snippets/${pkgName}/${relativePath}`.replace(/\\/g, "/");

      await uploadFile(file, s3Key);
    }
  }

  console.log("✨ Deployment complete!");
}

main();
