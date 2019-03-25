//import * as functions from 'firebase-functions';//
import * as express from 'express';

import {InsertPageView} from './ts/view/InsertPageView';
import {InsertPageController} from './ts/controller/InsertPageController';
import {ExercisePageView} from "./ts/view/ExercisePageView";
import {ExercisePageController} from "./ts/controller/ExercisePageController";
import {SavePageController} from "./ts/controller/SavePageController";
import {SavePageView} from "./ts/view/SavePageView";

import {FirebaseAdapter} from './ts/model/FirebaseAdapter';
const objDb = new FirebaseAdapter();

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
console.log("a: "+__dirname);
var insertPageView = new InsertPageView();
var insertPage = new InsertPageController(insertPageView);
insertPage.update(app);

var exercisePageView = new ExercisePageView();
var exercisePage = new ExercisePageController(exercisePageView, objDb );//objDb
exercisePage.update(app);

var savePageView = new SavePageView();
var savePage = new SavePageController(savePageView, objDb);
savePage.update(app);

//exports.app = functions.https.onRequest(app); per firebase deployable

app.listen(8080, function () {
    var host = "127.0.0.1";
    var port = "8080";
    console.log("Example app listening at http://%s:%s", host, port)
});