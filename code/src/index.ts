import * as express from "express";
import {InsertPageView} from './ts/view/InsertPageView';
import {InsertPageController} from './ts/controller/InsertPageController';
import {LoginView} from "./ts/view/LoginView";
import {RegistrationView} from "./ts/view/RegistrationView";
import {AuthenticationController} from "./ts/controller/AuthenticationController";
import {FirebaseExerciseManager} from "./ts/model/FirebaseExerciseManager";
import {ExercisePageView} from "./ts/view/ExercisePageView";
import {SavePageView} from "./ts/view/SavePageView";



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
// @ts-ignore
const exercisePage = new ExerciseController(exercisePageView, savePageView, objDb );
exercisePage.update(app);
const loginView  = new LoginView();
const registrationView : any= new RegistrationView();
const LoginPage = new AuthenticationController(loginView,registrationView);
LoginPage.update(app);

app.listen(8080, async function () {
    const host = "127.0.0.1";
    const port = "8080";
    console.log("Example app listening at http://%s:%s", host, port);
});