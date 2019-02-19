/*const functions = require('firebase-functions');
*/
const express = require('express');
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


var Controller = require('./js/controller.js');
var c = new Controller();


var server = c.start(app).listen(8080, function () {
    var host = "127.0.0.1";
    var port = "8080";
    console.log("Example app listening at http://%s:%s", host, port)
})
