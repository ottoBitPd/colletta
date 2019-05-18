import * as express from "express";

import {InsertPageView} from './ts/view/InsertPageView';
import {ExerciseView} from "./ts/view/ExerciseView";
import {ProfileView} from "./ts/view/ProfileView";
import {RegistrationView} from "./ts/view/RegistrationView";
import {SearchView} from "./ts/view/SearchView";
import {ClassesView} from "./ts/view/ClassesView";
import {ClassView} from "./ts/view/ClassView";
import {DeveloperView} from "./ts/view/DeveloperView";


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
new DeveloperView(app);

app.use(function(req, res, next) {
    res.status(404).sendFile("404.html",{root:"public"});
});

let port = process.argv[2];
if (!port)
    port = "8080";

app.listen(port.toString(), async function () {
    const host = "localhost";
    console.log("Application listening at http://%s:%s", host, port);
});

