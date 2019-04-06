import * as express from "express";

import {InsertPageView} from './ts/view/InsertPageView';
//import {InsertPagePresenter} from './ts/presenter/InsertPagePresenter';




import {ExerciseView} from "./ts/view/ExerciseView";
import {SaveView} from "./ts/view/SaveView";
//import {ExercisePresenter} from "./ts/presenter/ExercisePresenter";

import {ProfileView} from "./ts/view/ProfileView";

import {RegistrationView} from "./ts/view/RegistrationView";


const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));


new InsertPageView(app);
//const insertPage = new InsertPagePresenter(insertPageView);
//insertPage.update(app);
new ProfileView(app);
new RegistrationView(app);

new SaveView(app);
new ExerciseView(app);
/*
const exercisePage = new ExercisePresenter(exerciseView, savePageView);
exercisePage.update(app);*/

/*const loginView  = new LoginView();
const registrationView : any= new RegistrationView();
const LoginPage = new AuthenticationPresenter(loginView,registrationView);
LoginPage.update(app);*/



/*registrationPage.update(app)
profilePage.update(app);*/

app.listen(8080, async function () {
    const host = "127.0.0.1";
    const port = "8080";
    console.log("Example app listening at http://%s:%s", host, port);
});

