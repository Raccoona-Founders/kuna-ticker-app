
var nodejsModules = require('node-libs-react-native');

module.exports = {
    getTransformModulePath: () => require.resolve('react-native-typescript-transformer'),
    extraNodeModules: nodejsModules,
    getSourceExts: () => ['jsx', 'mjs', 'js', 'ts', 'tsx'],
};
