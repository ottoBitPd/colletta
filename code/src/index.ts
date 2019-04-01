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

//import {Exercise} from "./ts/model/Exercise";

import {Student} from "./ts/model/Student"
import {Teacher} from "./ts/model/Teacher"
import {Class} from "./ts/model/Class";

app.listen(8080, async function () {
    var host = "127.0.0.1";
    var port = "8080";
    console.log("Example app listening at http://%s:%s", host, port);
    /*
    -------------- PROVA PER UPDATE ----------
    // @ts-ignore

    let key= await objDb.search("frase per prova");
    let path = ("data/sentences/" + key + "/solutions/0/difficulty");
    await objDb.update(path, "5");
    */

    let classes = [
        new Class("ciao",["1","2","3"]),
        new Class("cia",["1","3"]),
        new Class("ciao",["1","2","3"])
    ];

    let student = new Student("ciaone","","cc","cc","cc","cc");
    let teacher = new Teacher("ciaone","","cc","cc","cc","cc",123);

    student.databaseInfo.id = "2";
    teacher.databaseInfo.id = "ciao";
    console.log(student.getClasses(classes));
    console.log(teacher.getClasses(classes));
});