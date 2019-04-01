"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//import * as functions from 'firebase-functions';//
const express = require("express");
const InsertPageView_1 = require("./ts/view/InsertPageView");
const InsertPageController_1 = require("./ts/controller/InsertPageController");
const ExercisePageView_1 = require("./ts/view/ExercisePageView");
const ExerciseController_1 = require("./ts/controller/ExerciseController");
/*import {SavePageController} from "./ts/controller/SavePageController";*/
const SavePageView_1 = require("./ts/view/SavePageView");
//import {User} from "./ts/model/User";
//import {User} from "./ts/model/User";
const FirebaseUserManager_1 = require("./ts/model/FirebaseUserManager");
//import {FirebaseExerciseManager} from "./ts/model/FirebaseExerciseManager";
const objDb = new FirebaseUserManager_1.FirebaseUserManager();
//const objDbEx = new FirebaseExerciseManager();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
var insertPageView = new InsertPageView_1.InsertPageView();
var insertPage = new InsertPageController_1.InsertPageController(insertPageView);
insertPage.update(app);
var savePageView = new SavePageView_1.SavePageView();
var exercisePageView = new ExercisePageView_1.ExercisePageView();
var exercisePage = new ExerciseController_1.ExerciseController(exercisePageView, savePageView, objDb); //objDb
exercisePage.update(app);
/*var savePageView = new SavePageView();
var savePage = new SavePageController(savePageView, objDb);
savePage.update(app);*/
const Exercise_1 = require("./ts/model/Exercise");
const Client_1 = require("./ts/model/Client");
var ClientBuilder = Client_1.Client.ClientBuilder;
app.listen(8080, function () {
    return __awaiter(this, void 0, void 0, function* () {
        var host = "127.0.0.1";
        var port = "8080";
<<<<<<< HEAD
        console.log("Example app listening at http://%s:%s", host, port);
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
        const idkey = yield objDb.search("perry");
        console.log(idkey);
        // @ts-ignore
        let user2 = yield objDb.read(idkey);
        console.log(user2.getUsername());
        let path1 = ("data/users/" + idkey + "/username");
        yield objDb.update(path1, "ciccio652");
        yield console.log(user2.getUsername());
=======
        console.log("Example app listening at http://%s:%s", host, port);
        // @ts-ignore
        var rd = new Exercise_1.Exercise("ciao tizio come", "authorIdValue");
        rd.setSolution("solverIdValue", ['Smn', 'Ams', 'Ei'], ["topic1", "topic2"], 5);
        let myMap = new Map();
        var d = new Date();
        rd.addSolution(999, "solverIdValue1", ["ciao", "p"], ["topic1", "topic2"], 5, myMap, d);
        objDb.insert(rd);
        console.log(rd.evaluate());
        console.log("ciaooooo");
        let client = (new ClientBuilder()).build();
        client.getClassClient();
        console.log("Example app listening at http://%s:%s", host, port);
>>>>>>> 130d677f694a86367158c685ba991e9230783eb0
    });
});
//# sourceMappingURL=index.js.map