var shell = require('shelljs');
var path = require('path');
var publicPath = path.join(__dirname);
var buildPage = function (argv) {
    if (argv.remain.length) {
        var pageName = argv.remain[0].split('--page=')[1];
        if (pageName) {
        	shell.rm('-rf', path.resolve(__dirname, '../src/' + pageName));
        	shell.rm('-f', path.resolve(__dirname, '../src/model/' + pageName + 'Model.js'));
        	shell.rm('-f', path.resolve(__dirname, '../src/view/' + pageName + 'View.js'));
            shell.mkdir(path.resolve(__dirname, '../src/' + pageName));
            shell.touch(path.resolve(__dirname, '../src/' + pageName + '/' + 'index.js'));
            shell.touch(path.resolve(__dirname, '../src/' + pageName + '/' + pageName + '.scss'));
            shell.touch(path.resolve(__dirname, '../src/' + pageName + '/' + pageName + '.html'));
            shell.touch(path.resolve(__dirname, '../src/model/' + pageName + 'Model.js'));
            shell.touch(path.resolve(__dirname, '../src/view/' + pageName + 'View.js'));
        }
    }
};
module.exports = buildPage;
