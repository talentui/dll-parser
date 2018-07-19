const namingConvention = require("@talentui/dll-naming");
const path = require('path');

module.exports = class DllReference {
    constructor(dllList=[], buildProd) {
        this.rawDllList = dllList;
        this.buildProd = buildProd;
        this.dllList = this.parseDll();
    }

    parseDll() {
        return this.rawDllList.map(dll => {
            if (typeof dll === "object") {
                return dll;
            } else if (typeof dll === "string") {
                let packagePath = path.resolve(process.cwd(), 'node_modules', dll);
                let version = require(`${packagePath}/package.json`).version;
                let { filename, manifest } = namingConvention(
                    dll,
                    version,
                    this.buildProd
                );
                return {
                    file: `${packagePath}/dist/${filename}`,
                    manifest: `${packagePath}/dist/${manifest}`
                };
            } else {
                console.error("dllList 格式不正确");
            }
        });
    }

    getRefPlugin(appRoot) {
        return this.dllList.map(dll => {
            return new (require("webpack")).DllReferencePlugin({
                manifest: require(dll.manifest),
                context: appRoot
            });
        });
    }
};
