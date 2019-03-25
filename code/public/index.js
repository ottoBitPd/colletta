"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as functions from 'firebase-functions';//
const express = require("express");
const InsertPageView_1 = require("./ts/view/InsertPageView");
const InsertPageController_1 = require("./ts/controller/InsertPageController");
const ExercisePageView_1 = require("./ts/view/ExercisePageView");
const ExercisePageController_1 = require("./ts/controller/ExercisePageController");
const SavePageController_1 = require("./ts/controller/SavePageController");
const SavePageView_1 = require("./ts/view/SavePageView");
const FirebaseAdapter_1 = require("./ts/model/FirebaseAdapter");
const objDb = new FirebaseAdapter_1.FirebaseAdapter();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
console.log("a: " + __dirname);
var insertPageView = new InsertPageView_1.InsertPageView();
var insertPage = new InsertPageController_1.InsertPageController(insertPageView);
insertPage.update(app);
var exercisePageView = new ExercisePageView_1.ExercisePageView();
var exercisePage = new ExercisePageController_1.ExercisePageController(exercisePageView, objDb); //objDb
exercisePage.update(app);
var savePageView = new SavePageView_1.SavePageView();
var savePage = new SavePageController_1.SavePageController(savePageView, objDb);
savePage.update(app);
//exports.app = functions.https.onRequest(app); per firebase deployable
app.listen(8080, function () {
    var host = "127.0.0.1";
    var port = "8080";
    console.log("Example app listening at http://%s:%s", host, port);
});
//# sourceMappingURL=index.js.map