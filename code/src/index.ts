//import * as functions from 'firebase-functions';//
import * as express from 'express';

import {InsertPageView} from './ts/view/InsertPageView';
import {InsertPageController} from './ts/controller/InsertPageController';
import {ExercisePageView} from "./ts/view/ExercisePageView";
import {ExerciseController} from "./ts/controller/ExerciseController";
/*import {SavePageController} from "./ts/controller/SavePageController";*/
import {SavePageView} from "./ts/view/SavePageView";

import {FirebaseExerciseManager} from "./ts/model/FirebaseExerciseManager";
const objDb = new FirebaseExerciseManager();

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

var insertPageView = new InsertPageView();
var insertPage = new InsertPageController(insertPageView);
insertPage.update(app);

var savePageView = new SavePageView();
var exercisePageView = new ExercisePageView();
var exercisePage = new ExerciseController(exercisePageView, savePageView, objDb );//objDb
exercisePage.update(app);

/*var savePageView = new SavePageView();
var savePage = new SavePageController(savePageView, objDb);
savePage.update(app);*/


import {Exercise} from "./ts/model/Exercise";
import {Client} from "./ts/model/Client";
import ClientBuilder = Client.ClientBuilder;


app.listen(8080, async function () {
    var host = "127.0.0.1";
    var port = "8080";
    console.log("Example app listening at http://%s:%s", host, port);


    // @ts-ignore
    var rd : Exercise = new Exercise("frase per prova", "authorIdValue");
    rd.setSolution("solverIdValue",["tag1","tag2"],["topic1","topic2"],5);
    rd.addValutation("teacherIdValue",10);
    objDb.insert(rd);

    let client = (new ClientBuilder()).build();
    client.getClassClient();


    console.log("Example app listening at http://%s:%s", host, port);
});