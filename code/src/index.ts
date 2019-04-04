import * as express from "express";
import {InsertPageView} from './ts/view/InsertPageView';
import {InsertPageController} from './ts/controller/InsertPageController';

import {LoginView} from "./ts/view/LoginView";
import {RegistrationView} from "./ts/view/RegistrationView";
import {AuthenticationController} from "./ts/controller/AuthenticationController";

import {ExerciseView} from "./ts/view/ExerciseView";
import {SaveView} from "./ts/view/SaveView";
import {ExerciseController} from "./ts/controller/ExerciseController";

import {ProfileView} from "./ts/view/ProfileView";
import {ProfileController} from "./ts/controller/ProfileController";


const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
const insertPageView = new InsertPageView();
const insertPage = new InsertPageController(insertPageView);
insertPage.update(app);

const savePageView = new SaveView();
const exerciseView = new ExerciseView();

const exercisePage = new ExerciseController(exerciseView, savePageView);
exercisePage.update(app);

const loginView  = new LoginView();
const registrationView : any= new RegistrationView();
const LoginPage = new AuthenticationController(loginView,registrationView);
LoginPage.update(app);

const profileView  = new ProfileView();
const profilePage = new ProfileController(profileView);
profilePage.update(app);

app.listen(8080, async function () {
    const host = "127.0.0.1";
    const port = "8080";
    console.log("Example app listening at http://%s:%s", host, port);
});