
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
require("dotenv").config();


const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME;
const ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;

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


async function uploadFile(filePath, key) {
  const fileContent = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath) || "application/octet-stream";

  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileContent,
      ContentType: contentType,

    });
    
    await client.send(command);
    console.log(`✅ Uploaded: ${key}`);
  } catch (err) {
    console.error(`❌ Failed to upload ${key}:`, err);
    process.exit(1);
  }
}


function getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}


async function main() {

  const changedPackages = process.argv[2] ? process.argv[2].split(",") : [];

  if (changedPackages.length === 0) {
    console.log("No packages changed. Skipping deployment.");
    return;
  }

  console.log(`🚀 Deploying ${changedPackages.length} packages: ${changedPackages.join(", ")}`);

  for (const pkgName of changedPackages) {

    const distPath = path.resolve(__dirname, `../packages/${pkgName}/dist`);

    if (!fs.existsSync(distPath)) {
      console.warn(`⚠️  Warning: No "dist" folder found for ${pkgName}. Skipping.`);
      continue;
    }

    const files = getFiles(distPath);

    for (const file of files) {

      const relativePath = path.relative(distPath, file);
      

      const s3Key = `snippets/${pkgName}/${relativePath}`.replace(/\\/g, "/");

      await uploadFile(file, s3Key);
    }
  }

  console.log("✨ Deployment complete!");
}

main();
