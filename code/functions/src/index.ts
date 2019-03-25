import * as functions from 'firebase-functions';
import * as express from 'express';

import {InsertPageView} from './ts/view/InsertPageView';
import {InsertPageController} from './ts/controller/InsertPageController';
import {ExercisePageView} from "./ts/view/ExercisePageView";
import {ExercisePageController} from "./ts/controller/ExercisePageController";
import {SavePageController} from "./ts/controller/SavePageController";
import {SavePageView} from "./ts/view/SavePageView";

import {FirebaseAdapter} from './ts/model/FirebaseAdapter';
const objDb = new FirebaseAdapter();

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

var insertPageView = new InsertPageView();
var insertPage = new InsertPageController(insertPageView);
insertPage.update(app);

var exercisePageView = new ExercisePageView();
var exercisePage = new ExercisePageController(exercisePageView, objDb );//objDb
exercisePage.update(app);

var savePageView = new SavePageView();
var savePage = new SavePageController(savePageView, objDb);
savePage.update(app);

//const { exec } = require('child_process');
/*app.get('/test', (request: any, response: any) => {
    let shell=require('shelljs');
    //let fileSystem=require('fs');
    const { exec } = require('child_process');
    /*exec('echo "ehila te come stai" > ./src/ts/controller/hunpos/file.txt');
    //shell.exec('echo "ehila te come stai" > ./src/ts/controller/hunpos/file.txt');
    response.send("paperino: "+fileSystem.readFileSync('./src/ts/controller/hunpos/file.txt').toString());*/
    /*fileSystem.appendFileSync('./tmp/ciao.txt', "ehi\n thomas\n");
    console.log("file: \n"+fileSystem.readFileSync("./tmp/ciao.txt").toString());
    response.send("file: <br/>"+fileSystem.readFileSync("./tmp/ciao.txt").toString());*/
    /*shell.exec('echo "ehila te come stai"');
    exec('echo "si riprova"');
    response.send("va in mona");

});*/
console.log("A");
exports.app = functions.https.onRequest(app);
