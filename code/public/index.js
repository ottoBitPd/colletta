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
const FirebaseUserManager_1 = require("./ts/model/FirebaseUserManager");
const Student_1 = require("./ts/model/Student");
const Teacher_1 = require("./ts/model/Teacher");
const objDb = new FirebaseUserManager_1.FirebaseUserManager();
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
app.listen(8080, function () {
    return __awaiter(this, void 0, void 0, function* () {
        var host = "127.0.0.1";
        var port = "8080";
        console.log("Example app listening at http://%s:%s", host, port);
        let st = new Student_1.Student("ciccio652", "qwerty", "ciccio", "pasticcio", "padova", "uniPD");
        console.log(st.isTeacher());
        let te = new Teacher_1.Teacher("file88", "p1", "Gilberto", "File", "Padua", "UniPD", 404);
        console.log(te.isTeacher());
    });
});
//# sourceMappingURL=index.js.map