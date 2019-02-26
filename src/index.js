const InsertPageController = require("./js/controller/InsertPageController.js");
const InsertPage = require("./js/view/InsertPage.js")
const express = require('express');
var app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var insertPageView = new InsertPage(null);
var insertPage = new InsertPageController(insertPageView, null, app);

var ExercisePageView = new ExercisePage();
var insertPage = new InsertPageController(ExercisePageView, null, app);
insertPage.update(app);
/*
var exercisePage = new ExercisePageController();
exercisePage.update(app);
*/


/**
 * Binds and listens for connections on the specified host and port.
 * @param port - the port where listen for connections callback function
 */
var server = app.listen(8080, function () {
    var host = "127.0.0.1";
    var port = "8080";
    console.log("Example app listening at http://%s:%s", host, port)
});
