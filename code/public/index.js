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
const ExerciseView_1 = require("./ts/view/ExerciseView");
const ProfileView_1 = require("./ts/view/ProfileView");
const RegistrationView_1 = require("./ts/view/RegistrationView");
const SearchView_1 = require("./ts/view/SearchView");
const ClassesView_1 = require("./ts/view/ClassesView");
const ClassView_1 = require("./ts/view/ClassView");
const DeveloperView_1 = require("./ts/view/DeveloperView");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
new InsertPageView_1.InsertPageView(app);
new ProfileView_1.ProfileView(app);
new RegistrationView_1.RegistrationView(app);
new ExerciseView_1.ExerciseView(app);
new SearchView_1.SearchView(app);
new ClassesView_1.ClassesView(app);
new ClassView_1.ClassView(app);
new DeveloperView_1.DeveloperView(app);
/*
//OLD STYLE
const exercisePage = new ExercisePresenter(exerciseView, savePageView);
exercisePage.update(app);

const loginView  = new LoginView();
const registrationView : any= new RegistrationView();
const LoginPage = new AuthenticationPresenter(loginView,registrationView);
LoginPage.update(app);
*/
app.listen(8080, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const host = "127.0.0.1";
        const port = "8080";
        console.log("Example app listening at http://%s:%s", host, port);
        /*
        //prove per media
        let exerciseClient = (new Client.builder()).buildUserClient().buildExerciseClient().build().getExerciseClient();
        if(exerciseClient) {
            let result = await exerciseClient.getStudentAverage("-LcfF2c3ksUjdj0jXLZi");
            let myMap= new Map();
            for (let entry of Array.from(result.entries())) {
                myMap.set(new Date(entry[0]), entry[1]);
            }
            console.log("result: ",result);
            console.log("myMap: ",myMap);
            let average = result.get(Math.max.apply(null, Array.from(result.keys())));
            console.log("average: ",average);
        }
        */
    });
});
//# sourceMappingURL=index.js.map