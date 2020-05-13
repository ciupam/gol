module.exports = {
  "**/*.js": (fs) => fs.map((f) => `prettier --write '${f}'`),
};
