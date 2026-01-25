const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const getConfig = () => {
  const config = {
    bucketName: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    accountId: process.env.CLOUDFLARE_R2_ACCOUNT_ID,
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  };

  const missingVars = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(", ")}`);
    process.exit(1);
  }

  return config;
};

const createS3Client = (config) => {
  return new S3Client({
    region: "auto",
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
};

module.exports = { getConfig, createS3Client };
