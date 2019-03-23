import {InsertPageController} from './ts/controller/InsertPageController';
import {ExercisePageController} from "./ts/controller/ExercisePageController";
import {SavePageController} from "./ts/controller/SavePageController";
import {InsertPageView} from "./ts/view/InsertPageView";
import {ExercisePageView} from "./ts/view/ExercisePageView";
import {SavePageView} from "./ts/view/SavePageView";


import express from 'express';
let app = express();

/*bodyParser is needed to get the post values from html forms*/
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: false }));
/*use static path public is needed to link css files with html pages*/
app.use(express.static(__dirname + '/public'));
/*creating a FireBaseAdapter object to use Firebase database in the classes which require it*/
import {FirebaseAdapter} from './ts/model/FirebaseAdapter';
const objDb = new FirebaseAdapter();

var insertPageView = new InsertPageView();
var insertPage = new InsertPageController(insertPageView);
insertPage.update(app);

var exercisePageView = new ExercisePageView();
var exercisePage = new ExercisePageController(exercisePageView, objDb );
exercisePage.update(app);

var savePageView = new SavePageView();
var savePage = new SavePageController(savePageView, objDb);
savePage.update(app);



/**
 * Binds and listens for connections on the specified host and port. (Creates the server).
 * @param port - the port where listen for connections callback function
 */
app.listen(8080, function () {
    var host = "127.0.0.1";
    var port = "8080";
    console.log("Example app listening at http://%s:%s", host, port)
});
