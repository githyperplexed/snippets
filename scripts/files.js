const fs = require("fs");
const path = require("path");

const getFilesRecursively = (dir) => {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });

  return dirents.flatMap((dirent) => {
    const fullPath = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFilesRecursively(fullPath) : fullPath;
  });
};

const getDistPath = (pkgName) => {
  return path.resolve(__dirname, `../packages/${pkgName}/dist`);
};

const toS3Key = (pkgName, distPath, filePath) => {
  const relativePath = path.relative(distPath, filePath);
  return `snippet/${pkgName}/${relativePath}`.replace(/\\/g, "/");
};

module.exports = { getFilesRecursively, getDistPath, toS3Key };
