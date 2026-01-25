const { getConfig, createS3Client } = require("./config");
const { uploadPackage } = require("./upload");
const { cleanupStaleFiles } = require("./cleanup");

const deployPackage = async (client, bucketName, pkgName) => {
  const uploadedKeys = await uploadPackage(client, bucketName, pkgName);

  if (!uploadedKeys) return;

  await cleanupStaleFiles(client, bucketName, pkgName, uploadedKeys);
};

const parseChangedPackages = () => {
  return process.argv[2] ? process.argv[2].split(",") : [];
};

const main = async () => {
  const changedPackages = parseChangedPackages();

  if (changedPackages.length === 0) {
    console.log("No packages changed. Skipping deployment.");
    return;
  }

  const config = getConfig();
  const client = createS3Client(config);

  console.log(`🚀 Deploying ${changedPackages.length} packages: ${changedPackages.join(", ")}`);

  for (const pkgName of changedPackages) {
    await deployPackage(client, config.bucketName, pkgName);
  }

  console.log("✨ Deployment complete!");
};

main();
