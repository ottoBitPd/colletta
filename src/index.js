/*const functions = require('firebase-functions');
*/
const express = require('express');
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
var UrlManager = require('./js/urlManager.js');
var u = new UrlManager();

var server = u.start(app).listen(8080, function () {
    var host = "127.0.0.1";
    var port = "8080";
    console.log("Example app listening at http://%s:%s", host, port)
})
server.listen(8080);