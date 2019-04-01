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
const FirebaseUserManager_1 = require("./ts/model/FirebaseUserManager");
const FirebaseClassManager_1 = require("./ts/model/FirebaseClassManager");
const Class_1 = require("./ts/model/Class");
const Teacher_1 = require("./ts/model/Teacher");
const Student_1 = require("./ts/model/Student");
const objDb = new FirebaseUserManager_1.FirebaseUserManager();
// @ts-ignore
const objDbC = new FirebaseClassManager_1.FirebaseClassManager();
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
app.listen(8080, function () {
    return __awaiter(this, void 0, void 0, function* () {
        var host = "127.0.0.1";
        var port = "8080";
        console.log("Example app listening at http://%s:%s", host, port);
        // @ts-ignore
        let ben = new Teacher_1.Teacher("benny", "mepiasa", "Benedetto", "Cosentino", "Catania", "unipd", 404);
        //await objDb.insert(ben);
        let io = new Student_1.Student("gian995", "gianduiotto", "Gianmarco", "Pettenuzzo", "SML", "unipd");
        let gio = new Student_1.Student("perry15", "xiaomi", "Giovanni", "Peron", "campo", "unipd");
        //await objDb.insert(io);
        //await objDb.insert(gio);
        let classe = [io.getUsername(), gio.getUsername()];
        let eser = ["es1", "es2"];
        // @ts-ignore
        let c = new Class_1.Class("8bit", "classe per i bimbi di swe", yield objDb.search("benny"), classe, eser);
        yield objDbC.insert(c);
        // @ts-ignore
        let classID = yield objDbC.search(c.getTeacherID(), c.getName());
        // @ts-ignore
        console.log(classID);
        yield objDbC.remove(classID);
    });
});
//# sourceMappingURL=index.js.map