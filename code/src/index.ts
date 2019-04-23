import * as express from "express";

import {InsertPageView} from './ts/view/InsertPageView';
import {ExerciseView} from "./ts/view/ExerciseView";
import {ProfileView} from "./ts/view/ProfileView";
import {RegistrationView} from "./ts/view/RegistrationView";
import {SearchView} from "./ts/view/SearchView";
import {ClassesView} from "./ts/view/ClassesView";
import {ClassView} from "./ts/view/ClassView";
import {Client} from "./ts/model/Client/Client";


const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

new InsertPageView(app);
new ProfileView(app);
new RegistrationView(app);
new ExerciseView(app);
new SearchView(app);
new ClassesView(app);
new ClassView(app);
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

    let exerciseClient = (new Client.builder()).buildUserClient().buildExerciseClient().build().getExerciseClient();
    if(exerciseClient) {
        let result = await exerciseClient.getStudentAverage("-LcfF2c3ksUjdj0jXLZi");
        let myMap= new Map();
        for (let entry of Array.from(result.entries())) {
            myMap.set(new Date(entry[0]), entry[1]);
        }
        console.log("result: ",result);
        console.log("myMap: ",myMap);
        let average = result.get(Math.max.apply(null, Array.from(result.keys())));
        console.log("average: ",average);
    }
});

