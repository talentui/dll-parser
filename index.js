const namingConvention = require("@talentui/dll-naming");

module.exports = class DllReference {
    constructor(dllList, buildProd) {
        this.rawDllList = dllList;
        this.buildProd = buildProd;
        this.dllList = this.parseDll();
    }

    parseDll() {
        return this.rawDllList.map(dll => {
            if (typeof dll === "object") {
                return dll;
            } else if (typeof dll === "string") {
                let packageName = dll;
                let version = require(`${dll}/package.json`).version;
                let { filename, manifest } = namingConvention(
                    packageName,
                    version,
                    this.buildProd
                );
                return {
                    file: `${dll}/dist/${filename}`,
                    manifest: `${dll}/dist/${manifest}`
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
