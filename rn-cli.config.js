var nodejsModules = require('node-libs-react-native');
nodejsModules.vm = require.resolve('vm-browserify');

module.exports = {
    extraNodeModules: nodejsModules,
    getSourceExts: () => ['jsx', 'mjs', 'js', 'ts', 'tsx'],
};
