var shell = require('shelljs');
var path = require('path');
var publicPath = path.join(__dirname);
var buildPage = function (argv) {
    if (argv.remain.length) {
        if(argv.remain[0] !== '--page'){
            console.log('error build page');
            return false;
        }
        var pageNames = argv.remain.slice(1);
        pageNames.forEach(function (pageName, i) {
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
                console.log('the {' + pageName +'} page is built');
            }
        });
        console.log('complete the building page!');
    }
};
module.exports = buildPage;
