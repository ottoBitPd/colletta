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
/*import {ExercisePageView} from "./ts/view/ExercisePageView";
import {ExerciseController} from "./ts/controller/ExerciseController";
import {SavePageView} from "./ts/view/SavePageView";*/
const LoginView_1 = require("./ts/view/LoginView");
const RegistrationView_1 = require("./ts/view/RegistrationView");
const AuthenticationController_1 = require("./ts/controller/AuthenticationController");
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
const FirebaseUserManager_1 = require("./ts/model/FirebaseUserManager");
<<<<<<< HEAD
const FirebaseClassManager_1 = require("./ts/model/FirebaseClassManager");
>>>>>>> 24d1d471687b0249866b1676f63e14647e0eb878
const Class_1 = require("./ts/model/Class");
const FirebaseClassManager_1 = require("./ts/model/FirebaseClassManager");
const objDb = new FirebaseClassManager_1.FirebaseClassManager();
// @ts-ignore
<<<<<<< HEAD
=======
const objDbC = new FirebaseClassManager_1.FirebaseClassManager();
>>>>>>> 2e9495e021589f870c65e3191570385d33099a4e
>>>>>>> 24d1d471687b0249866b1676f63e14647e0eb878
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
const insertPageView = new InsertPageView_1.InsertPageView();
const insertPage = new InsertPageController_1.InsertPageController(insertPageView);
insertPage.update(app);
<<<<<<< HEAD
const savePageView = new SavePageView_1.SavePageView();
const exercisePageView = new ExercisePageView_1.ExercisePageView();
const exercisePage = new ExerciseController_1.ExerciseController(exercisePageView, savePageView, objDb); //objDb
exercisePage.update(app);
/*var savePageView = new SavePageView();
var savePage = new SavePageController(savePageView, objDb);
savePage.update(app);*/
=======
/*const savePageView = new SavePageView();
const exercisePageView = new ExercisePageView();
const exercisePage = new ExerciseController(exercisePageView, savePageView);//objDb
exercisePage.update(app);*/
>>>>>>> 24d1d471687b0249866b1676f63e14647e0eb878
const loginView = new LoginView_1.LoginView();
const registrationView = new RegistrationView_1.RegistrationView();
const LoginPage = new AuthenticationController_1.AuthenticationController(loginView, registrationView);
LoginPage.update(app);
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
//import {Exercise} from "./ts/model/Exercise";
<<<<<<< HEAD
const Student_1 = require("./ts/model/Student");
const Teacher_1 = require("./ts/model/Teacher");
const Class_1 = require("./ts/model/Class");
app.listen(8080, function () {
    return __awaiter(this, void 0, void 0, function* () {
        var host = "127.0.0.1";
        var port = "8080";
        console.log("Example app listening at http://%s:%s", host, port);
<<<<<<< HEAD
=======
        /*
        -------------- PROVA PER UPDATE ----------
        // @ts-ignore
    
        let key= await objDb.search("frase per prova");
        let path = ("data/sentences/" + key + "/solutions/0/difficulty");
        await objDb.update(path, "5");
        */
        let classes = [new Class_1.Class("ciao", ["1", "2", "3"]), new Class_1.Class("cia", ["1", "3"]), new Class_1.Class("ciao", ["1", "2", "3"])];
        let student = new Student_1.Student("ciaone", "", "cc", "cc", "cc", "cc");
        let teacher = new Teacher_1.Teacher("ciaone", "", "cc", "cc", "cc", "cc", 123);
        student.databaseInfo.id = "2";
        teacher.databaseInfo.id = "ciao";
        console.log(student.getClasses(classes));
        console.log(teacher.getClasses(classes));
=======
//import {Client} from "./ts/model/Client";
//import ClientBuilder = Client.ClientBuilder;
=======
>>>>>>> 47ab27f4adcef8ffc23fc87cf5fe90ec8c1174ed
>>>>>>> 6f5582cbb399fdad3aa5396bdc408ac6db38dd4f
>>>>>>> 2e9495e021589f870c65e3191570385d33099a4e
>>>>>>> 24d1d471687b0249866b1676f63e14647e0eb878
app.listen(8080, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const host = "127.0.0.1";
        const port = "8080";
        console.log("Example app listening at http://%s:%s", host, port);
<<<<<<< HEAD
        let _clas = new Class_1.Class("fa0", "fdf0", "fdafadsf", ["fs", "kk"], ["1", "2"]);
        let k = yield objDb.insert(_clas);
        console.log(k);
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
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
        let file = new Teacher_1.Teacher("Gilby55", "daccordoo", "Gilberto", "File", "Padova", "UniPD", 404);
        yield objDb.insert(file);
        let gio = new Student_1.Student("Perry15", "Xiaominote7", "Giovanni", "Peron", "Camposampiero city", "UniPD");
        yield objDb.insert(gio);
        let keyfile = yield objDb.search("Gilby55");
>>>>>>> 7864bf13b5e02e8d76b41f59181e574bf03b9cea
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
<<<<<<< HEAD
        let c = new Class_1.Class("8bit", "classe per i bimbi di swe", yield objDb.search("benny"), classe, eser);
        yield objDbC.insert(c);
        // @ts-ignore
        let classID = yield objDbC.search(c.getTeacherID(), c.getName());
        // @ts-ignore
        console.log(classID);
        yield objDbC.remove(classID);
=======
        console.log("inpscode " + ((bfile).getINPS()));
        let path = ("data/users/" + keyfile + "/INPScode");
        objDb.update(path, 526821651616512161561);
>>>>>>> 47ab27f4adcef8ffc23fc87cf5fe90ec8c1174ed
>>>>>>> 9db7ee1784113cb663fb16eba5c63c485f967a12
>>>>>>> 6f5582cbb399fdad3aa5396bdc408ac6db38dd4f
>>>>>>> 7864bf13b5e02e8d76b41f59181e574bf03b9cea
>>>>>>> 2e9495e021589f870c65e3191570385d33099a4e
>>>>>>> 24d1d471687b0249866b1676f63e14647e0eb878
    });
});
//# sourceMappingURL=index.js.map