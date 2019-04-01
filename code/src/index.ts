//import * as functions from 'firebase-functions';//
import * as express from "express";

import {InsertPageView} from './ts/view/InsertPageView';
import {InsertPageController} from './ts/controller/InsertPageController';
import {ExercisePageView} from "./ts/view/ExercisePageView";
import {ExerciseController} from "./ts/controller/ExerciseController";
/*import {SavePageController} from "./ts/controller/SavePageController";*/
import {SavePageView} from "./ts/view/SavePageView";

//import {User} from "./ts/model/User";
//import {User} from "./ts/model/User";
import {FirebaseUserManager} from "./ts/model/FirebaseUserManager";
//import {FirebaseExerciseManager} from "./ts/model/FirebaseExerciseManager";
//import {Exercise} from "./ts/model/Exercise";
//import {ItalianExercise} from "./ts/model/ItalianExercise";
// @ts-ignore
import {Data} from ".ts/model/Data";
import {User} from "./ts/model/User";
//import {FirebaseExerciseManager} from "./ts/model/FirebaseExerciseManager";
const objDb = new FirebaseUserManager();
//const objDbEx = new FirebaseExerciseManager();

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


import {Exercise} from "./ts/model/Exercise";
import {Client} from "./ts/model/Client";
import ClientBuilder = Client.ClientBuilder;


app.listen(8080, async function () {
    var host = "127.0.0.1";
    var port = "8080";
    console.log("Example app listening at http://%s:%s", host, port);

<<<<<<< HEAD
    //-------------- PROVA PER UPDATE ----------
    // @ts-ignore
    //let key= await objDb.insert("")
/*
    let key= await objDbEx.search("frase per prova");
    console.log (key);
    let topics : string [] = ["modifica", "anche", "time"];
    let path1 = ("data/sentences/" + key + "/solutions/-LbN7803AaGYNgx5b-8k/topics");
    await objDbEx.update(path1, topics);
*/
    /*
    let key= await objDbEx.search("frase per prova");
    console.log(key);
    let ex = <ItalianExercise>(await objDbEx.read(key));
    console.log(ex.getSentence());


    let user=new User("ciccio652", "ciccio", "ciccio", "pasticcio", "Padova", "UniPD");
    // @ts-ignore
    const b =await objDb.insert(user);
    console.log(b);
    // @ts-ignore
    const idkey=await objDb.search(user.getUsername());
    // @ts-ignore
    let user2 : User = await objDb.read(idkey);
    console.log(user2.getName());
    */

    const idkey=await objDb.search("perry");
    console.log(idkey);
    // @ts-ignore
    let user2 : User = await objDb.read(idkey);
    console.log(user2.getUsername());
    let path1 = ("data/users/" + idkey + "/username");
    await objDb.update(path1, "ciccio652");
    console.log(user2.getUsername());

});
=======

    // @ts-ignore
    var rd : Exercise = new Exercise("ciao tizio come", "authorIdValue");
    rd.setSolution("solverIdValue",[ 'Smn', 'Ams', 'Ei' ]
        ,["topic1","topic2"],5);
    let myMap = new Map();
    var d = new Date();
    rd.addSolution(999,"solverIdValue1",["ciao","p"],["topic1","topic2"],5,myMap,d);
    objDb.insert(rd);
    console.log("ciaooooo");

    let client = (new ClientBuilder()).build();
    client.getClassClient();


    console.log("Example app listening at http://%s:%s", host, port);
});
>>>>>>> 130d677f694a86367158c685ba991e9230783eb0
