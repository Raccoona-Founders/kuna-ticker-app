var nodejsModules = require('node-libs-react-native');
nodejsModules.vm = require.resolve('vm-browserify');

module.exports = {
    getTransformModulePath() {
        return require.resolve('react-native-typescript-transformer');
    },
    extraNodeModules: nodejsModules,
    getSourceExts: () => ['jsx', 'mjs', 'js', 'ts', 'tsx'],
};
