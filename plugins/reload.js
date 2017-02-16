function HtmlReload(compiler, middleware) {
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
            middleware.publish({
                action: 'reload'
            });
            cb && cb();
            console.log('get');
        });
    })
}
module.exports = HtmlReload;