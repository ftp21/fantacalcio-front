module.exports = {
    publicPath: '/',
    chainWebpack: config => {
        config
            .plugin("html")
            .tap(args => {
                args[0].template = './public/index.html'
                return args
            })
    }
};