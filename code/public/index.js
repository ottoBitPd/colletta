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
const Teacher_1 = require("./ts/model/Teacher");
const Student_1 = require("./ts/model/Student");
const objDb = new FirebaseUserManager_1.FirebaseUserManager();
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
        let file = new Teacher_1.Teacher("Gilby55", "daccordoo", "Gilberto", "File", "Padova", "UniPD", 404);
        yield objDb.insert(file);
        let gio = new Student_1.Student("Perry15", "Xiaominote7", "Giovanni", "Peron", "Camposampiero city", "UniPD");
        yield objDb.insert(gio);
        let keyfile = yield objDb.search("Gilby55");
        // @ts-ignore
        console.log(keyfile);
        let bfile = yield objDb.read(keyfile);
        console.log(bfile);
        // @ts-ignore
        console.log("inpscode " + ((bfile).getINPS()));
        let path = ("data/users/" + keyfile + "/INPScode");
        objDb.update(path, 526821651616512161561);
    });
});
//# sourceMappingURL=index.js.map