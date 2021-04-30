module.exports = {
    // options...
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8090',
                ws: true,
                changeOrigin: true
            },
        }
    }
}