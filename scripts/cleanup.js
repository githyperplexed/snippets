const { ListObjectsV2Command, DeleteObjectsCommand } = require("@aws-sdk/client-s3");

const getPackagePrefix = (pkgName) => `snippet/${pkgName}/`;

const listExistingKeys = async (client, bucketName, prefix) => {
  const keys = [];
  let continuationToken;

  do {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
      ContinuationToken: continuationToken,
    });

    const response = await client.send(command);
    const contents = response.Contents || [];
    keys.push(...contents.map((obj) => obj.Key));
    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  return keys;
};

const deleteKeys = async (client, bucketName, keys) => {
  if (keys.length === 0) return;

  const command = new DeleteObjectsCommand({
    Bucket: bucketName,
    Delete: {
      Objects: keys.map((key) => ({ Key: key })),
    },
  });

  await client.send(command);
};

const cleanupStaleFiles = async (client, bucketName, pkgName, uploadedKeys) => {
  const prefix = getPackagePrefix(pkgName);
  const existingKeys = await listExistingKeys(client, bucketName, prefix);

  const uploadedSet = new Set(uploadedKeys);
  const staleKeys = existingKeys.filter((key) => !uploadedSet.has(key));

  if (staleKeys.length === 0) {
    console.log(`🧹 No stale files to clean up for ${pkgName}`);
    return;
  }

  await deleteKeys(client, bucketName, staleKeys);
  console.log(`🧹 Cleaned up ${staleKeys.length} stale files for ${pkgName}`);
};

module.exports = { cleanupStaleFiles };
