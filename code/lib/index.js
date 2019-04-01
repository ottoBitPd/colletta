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
const LoginView_1 = require("./ts/view/LoginView");
const RegistrationView_1 = require("./ts/view/RegistrationView");
const AuthenticationController_1 = require("./ts/controller/AuthenticationController");
const FirebaseExerciseManager_1 = require("./ts/model/FirebaseExerciseManager");
const objDb = new FirebaseExerciseManager_1.FirebaseExerciseManager();
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
const loginView = new LoginView_1.LoginView();
const registrationView = new RegistrationView_1.RegistrationView();
const LoginPage = new AuthenticationController_1.AuthenticationController(loginView, registrationView);
LoginPage.update(app);
//import {Exercise} from "./ts/model/Exercise";
//import {Client} from "./ts/model/Client";
//import ClientBuilder = Client.ClientBuilder;
app.listen(8080, function () {
    return __awaiter(this, void 0, void 0, function* () {
        var host = "127.0.0.1";
        var port = "8080";
        console.log("Example app listening at http://%s:%s", host, port);
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
    });
});
//# sourceMappingURL=index.js.map