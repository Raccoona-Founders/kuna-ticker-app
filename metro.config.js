// var nodejsModules = require('node-libs-react-native');
// nodejsModules.vm = require.resolve('vm-browserify');

module.exports = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
    },
};
