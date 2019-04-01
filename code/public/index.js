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
<<<<<<< HEAD
const LoginView_1 = require("./ts/view/LoginView");
const RegistrationView_1 = require("./ts/view/RegistrationView");
const AuthenticationController_1 = require("./ts/controller/AuthenticationController");
const FirebaseExerciseManager_1 = require("./ts/model/FirebaseExerciseManager");
const objDb = new FirebaseExerciseManager_1.FirebaseExerciseManager();
=======
const FirebaseUserManager_1 = require("./ts/model/FirebaseUserManager");
//import {FirebaseExerciseManager} from "./ts/model/FirebaseExerciseManager";
const objDb = new FirebaseUserManager_1.FirebaseUserManager();
//const objDbEx = new FirebaseExerciseManager();
>>>>>>> 2de84acd94baf15a1e7780ff42b9280e1fe9dd02
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
const insertPageView = new InsertPageView_1.InsertPageView();
const insertPage = new InsertPageController_1.InsertPageController(insertPageView);
insertPage.update(app);
const savePageView = new SavePageView_1.SavePageView();
const exercisePageView = new ExercisePageView_1.ExercisePageView();
const exercisePage = new ExerciseController_1.ExerciseController(exercisePageView, savePageView, objDb); //objDb
exercisePage.update(app);
<<<<<<< HEAD
const loginView = new LoginView_1.LoginView();
const registrationView = new RegistrationView_1.RegistrationView();
const LoginPage = new AuthenticationController_1.AuthenticationController(loginView, registrationView);
LoginPage.update(app);
//import {Exercise} from "./ts/model/Exercise";
//import {Client} from "./ts/model/Client";
//import ClientBuilder = Client.ClientBuilder;
=======
/*var savePageView = new SavePageView();
var savePage = new SavePageController(savePageView, objDb);
savePage.update(app);*/
<<<<<<< HEAD
//import {Exercise} from "./ts/model/Exercise";
//import {Client} from "./ts/model/Client";
//import ClientBuilder = Client.ClientBuilder;
=======
>>>>>>> 448935f6fe3b08e8e8e812e97d23069c3982df4d
>>>>>>> 2de84acd94baf15a1e7780ff42b9280e1fe9dd02
app.listen(8080, function () {
    return __awaiter(this, void 0, void 0, function* () {
        var host = "127.0.0.1";
        var port = "8080";
        console.log("Example app listening at http://%s:%s", host, port);
<<<<<<< HEAD
        /*  // @ts-ignore
          var rd : Exercise = new Exercise("ciao tizio come", "authorIdValue");
          rd.setSolution("solverIdValue",[ 'Smn', 'Ams', 'Ei' ]
              ,["topic1","topic2"],5);
          let myMap = new Map();
          var d = new Date();
          rd.addSolution(999,"solverIdValue1",["ciao","p"],["topic1","topic2"],5,myMap,d);
          objDb.insert(rd);
          console.log("ciaooooo");
      
          let client = (new ClientBuilder()).build();
          client.getClassClient();*/
=======
<<<<<<< HEAD
        // @ts-ignore
        /*var rd : Exercise = new Exercise("frase per prova", "authorIdValue");
        rd.setSolution("solverIdValue",["tag1","tag2"],["topic1","topic2"],5);
        rd.addValutation("teacherIdValue",10);
        objDb.insert(rd);*/
        /*let client = (new ClientBuilder()).build();
        client.getClassClient();*/
=======
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
        const idkey = yield objDb.search("ciccio652");
        console.log(idkey);
        // @ts-ignore
        let user2 = yield objDb.read(idkey);
        console.log(user2.getUsername());
        let path1 = ("data/users/" + idkey + "/username");
        yield objDb.update(path1, "perry15");
        console.log(user2.getUsername());
>>>>>>> 448935f6fe3b08e8e8e812e97d23069c3982df4d
>>>>>>> 2de84acd94baf15a1e7780ff42b9280e1fe9dd02
    });
});
//# sourceMappingURL=index.js.map