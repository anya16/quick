var shell = require('shelljs');
var path = require('path');
var event = process.env.npm_lifecycle_event && process.env.npm_lifecycle_event;
var argv = process.env.npm_config_argv && process.env.npm_config_argv;
//'{"remain":[],"cooked":["run","go"],"original":["run","go"]}'
var _argv = JSON.parse(argv);
/*if (_argv.remain.length) {
	var pageName = _argv.remain[0].split('--page=')[1];
	if(pageName){
		
	}
}*/
//console.log(__dirname);

if (event == 'module') {
    var argv = process.env.npm_config_argv && process.env.npm_config_argv;
    var _argv = JSON.parse(argv);
    if (_argv.remain.length) {
    	var pageName = _argv.remain[0].split('--page=')[1];
    	if(pageName)
    }
} else {

}
console.log(event);
