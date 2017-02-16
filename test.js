var shell = require('shelljs');
var path = require('path');
var env = process.env.NODE_ENV = require('./build').NODE_ENV;
shell.rm('-rf', path.join(__dirname,'./dist'));