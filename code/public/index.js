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
const express = require("express");
const InsertPageView_1 = require("./ts/view/InsertPageView");
const InsertPageController_1 = require("./ts/controller/InsertPageController");
const LoginView_1 = require("./ts/view/LoginView");
const RegistrationView_1 = require("./ts/view/RegistrationView");
const AuthenticationController_1 = require("./ts/controller/AuthenticationController");
const ExerciseView_1 = require("./ts/view/ExerciseView");
const SaveView_1 = require("./ts/view/SaveView");
const ExerciseController_1 = require("./ts/controller/ExerciseController");
const ProfileView_1 = require("./ts/view/ProfileView");
const ProfileController_1 = require("./ts/controller/ProfileController");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
const insertPageView = new InsertPageView_1.InsertPageView();
const insertPage = new InsertPageController_1.InsertPageController(insertPageView);
insertPage.update(app);
const savePageView = new SaveView_1.SaveView();
const exerciseView = new ExerciseView_1.ExerciseView();
const exercisePage = new ExerciseController_1.ExerciseController(exerciseView, savePageView);
exercisePage.update(app);
const loginView = new LoginView_1.LoginView();
const registrationView = new RegistrationView_1.RegistrationView();
const LoginPage = new AuthenticationController_1.AuthenticationController(loginView, registrationView);
LoginPage.update(app);
const profileView = new ProfileView_1.ProfileView();
const profilePage = new ProfileController_1.ProfileController(profileView);
profilePage.update(app);
app.listen(8080, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const host = "127.0.0.1";
        const port = "8080";
        console.log("Example app listening at http://%s:%s", host, port);
    });
});
//# sourceMappingURL=index.js.map