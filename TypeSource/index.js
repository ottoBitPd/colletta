"use strict";
exports.__esModule = true;
var InsertPageController_1 = require("./ts/controller/InsertPageController");
var ExercisePageController_1 = require("./ts/controller/ExercisePageController");
var SavePageController_1 = require("./ts/controller/SavePageController");
var InsertPageView_1 = require("./ts/view/InsertPageView");
var ExercisePageView_1 = require("./ts/view/ExercisePageView");
var SavePageView_1 = require("./ts/view/SavePageView");
var express_1 = require("express");
var app = express_1["default"]();
/*bodyParser is needed to get the post values from html forms*/
var body_parser_1 = require("body-parser");
app.use(body_parser_1["default"].urlencoded({ extended: false }));
/*use static path public is needed to link css files with html pages*/
app.use(express_1["default"].static(__dirname + '/public'));
/*creating a FireBaseAdapter object to use Firebase database in the classes which require it*/
var FirebaseAdapter_1 = require("./ts/model/FirebaseAdapter");
var objDb = new FirebaseAdapter_1.FirebaseAdapter();
var insertPageView = new InsertPageView_1.InsertPageView();
var insertPage = new InsertPageController_1.InsertPageController(insertPageView);
insertPage.update(app);
var exercisePageView = new ExercisePageView_1.ExercisePageView();
var exercisePage = new ExercisePageController_1.ExercisePageController(exercisePageView, objDb);
exercisePage.update(app);
var savePageView = new SavePageView_1.SavePageView();
var savePage = new SavePageController_1.SavePageController(savePageView, objDb);
savePage.update(app);
/**
 * Binds and listens for connections on the specified host and port. (Creates the server).
 * @param port - the port where listen for connections callback function
 */
app.listen(8080, function () {
    var host = "127.0.0.1";
    var port = "8080";
    console.log("Example app listening at http://%s:%s", host, port);
});
