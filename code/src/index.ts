import * as express from "express";

import {InsertPageView} from './ts/view/InsertPageView';
import {SaveView} from "./ts/view/SaveView";
import {ExerciseView} from "./ts/view/ExerciseView";
import {ProfileView} from "./ts/view/ProfileView";
import {RegistrationView} from "./ts/view/RegistrationView";
import {SearchView} from "./ts/view/SearchView";
import {ClassesView} from "./ts/view/ClassesView";


const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

new InsertPageView(app);
new ProfileView(app);
new RegistrationView(app);
new SaveView(app);
new ExerciseView(app);
new SearchView(app);
new ClassesView(app);

/*
//OLD STYLE
const exercisePage = new ExercisePresenter(exerciseView, savePageView);
exercisePage.update(app);

const loginView  = new LoginView();
const registrationView : any= new RegistrationView();
const LoginPage = new AuthenticationPresenter(loginView,registrationView);
LoginPage.update(app);
*/

app.listen(8080, async function () {
    const host = "127.0.0.1";
    const port = "8080";
    console.log("Example app listening at http://%s:%s", host, port);
});

