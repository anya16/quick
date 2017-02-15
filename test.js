var express = require('express');
var path = require('path');
var app = express();
var staticPath = path.posix.join('./');
app.use(staticPath,express.static(staticPath));
app.listen(8001, (err)=> {
    console.log(err);
});