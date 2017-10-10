const namingConvention = require("@beisen/talent-ui-dll-naming-convention");
const { buildProd, appRoot } = require("./constants.js");

//解决dll方法
const parseDll = dllList => {
  return dllList.map(dll => {
    if (typeof dll === "object") {
      return dll;
    } else if (typeof dll === "string") {
      let packageName = dll;
      let version = require(`${dll}/package.json`).version;
      let { filename, manifest } = namingConvention(
        packageName,
        version,
        buildProd
      );
      return {
        file: `${dll}/dist/${filename}`,
        manifest: `${dll}/dist/${manifest}`
      };
    } else {
      console.error("dllList 格式不正确");
    }
  });
};

module.exports = (dllList = []) => {
  const DllReferencePlugins = parseDll(dllList).map(dll => {
    return new (require("webpack")).DllReferencePlugin({
      manifest: require(dll.manifest),
      context: appRoot
    });
  });
  return DllReferencePlugins;
};
