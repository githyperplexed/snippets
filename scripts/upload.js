const fs = require("fs");
const mime = require("mime-types");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getFilesRecursively, getDistPath, toS3Key } = require("./files");

const uploadFile = async (client, bucketName, filePath, key) => {
  const fileContent = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath) || "application/octet-stream";

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: fileContent,
    ContentType: contentType,
  });

  try {
    await client.send(command);
    console.log(`✅ Uploaded: ${key}`);
  } catch (err) {
    console.error(`❌ Failed to upload ${key}:`, err);
    process.exit(1);
  }
};

const uploadPackage = async (client, bucketName, pkgName) => {
  const distPath = getDistPath(pkgName);

  if (!fs.existsSync(distPath)) {
    console.warn(`⚠️  Warning: No "dist" folder found for ${pkgName}. Skipping.`);
    return null;
  }

  const files = getFilesRecursively(distPath);
  const uploadedKeys = [];

  for (const file of files) {
    const key = toS3Key(pkgName, distPath, file);
    await uploadFile(client, bucketName, file, key);
    uploadedKeys.push(key);
  }

  return uploadedKeys;
};

module.exports = { uploadFile, uploadPackage };
