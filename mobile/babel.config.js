module.exports = function (api) {
    api.cache(true)
    let plugins = []

    plugins.push('react-native-worklets/plugin')
    return {
        presets: [
            'nativewind/babel',
            ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
        ],

        plugins,
    }
}
