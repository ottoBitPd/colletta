//import * as functions from 'firebase-functions';//
import * as express from "express";

import {InsertPageView} from './ts/view/InsertPageView';
import {InsertPageController} from './ts/controller/InsertPageController';
import {ExercisePageView} from "./ts/view/ExercisePageView";
import {ExerciseController} from "./ts/controller/ExerciseController";
/*import {SavePageController} from "./ts/controller/SavePageController";*/
import {SavePageView} from "./ts/view/SavePageView";
import {LoginView} from "./ts/view/LoginView";
import {RegistrationView} from "./ts/view/RegistrationView";
import {AuthenticationController} from "./ts/controller/AuthenticationController";


import {FirebaseExerciseManager} from "./ts/model/FirebaseExerciseManager";
const objDb = new FirebaseExerciseManager();

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

const insertPageView = new InsertPageView();
const insertPage = new InsertPageController(insertPageView);
insertPage.update(app);

const savePageView = new SavePageView();
const exercisePageView = new ExercisePageView();
const exercisePage = new ExerciseController(exercisePageView, savePageView, objDb );//objDb
exercisePage.update(app);

const loginView  = new LoginView();
const registrationView : any= new RegistrationView();
const LoginPage = new AuthenticationController(loginView,registrationView);
LoginPage.update(app);



//import {Exercise} from "./ts/model/Exercise";
//import {Client} from "./ts/model/Client";
//import ClientBuilder = Client.ClientBuilder;


app.listen(8080, async function () {
    var host = "127.0.0.1";
    var port = "8080";
    console.log("Example app listening at http://%s:%s", host, port);


  /*  // @ts-ignore
    var rd : Exercise = new Exercise("ciao tizio come", "authorIdValue");
    rd.setSolution("solverIdValue",[ 'Smn', 'Ams', 'Ei' ]
        ,["topic1","topic2"],5);
    let myMap = new Map();
    var d = new Date();
    rd.addSolution(999,"solverIdValue1",["ciao","p"],["topic1","topic2"],5,myMap,d);
    objDb.insert(rd);
    console.log("ciaooooo");

    let client = (new ClientBuilder()).build();
    client.getClassClient();*/


});
