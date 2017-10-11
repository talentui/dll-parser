`talent-ui-webpack-config` `talent-ui-dll-webpack-config`都有共同的对dllList解析逻辑，所以将这部分逻辑逻辑抽离出来，单独发布一个包，维护这部分公用的逻辑

# 用法
```js 
  /*** 
    parseDll
      1. 参数 ：dllList就是传入的dll列表，如 ['@beisen/talent-ui-dll-foundation']
      2. 返回值：解析后的dllList信息，包含file 和 manifest.json 文件路径
    generateDllReferencePlugins：
      1. 参数 ： 经过parseDll 解析后的dllList
      2. 返回值： dllReferencePlugins 插件，将其合并到webpack plugins中即可
  **/

 const { generateDllReferencePlugins, parseDll } = require('@beisen/talent-ui-dll-parser-util');
 const dllListAfterParser = parseDll(dllList);
 const dllReferencePlugins = generateDllReferencePlugins(dllListAfterParser);
```