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
app.use(function (req, res, next) {
    res.status(404).sendFile("404.html", { root: "public" });
});
let port = process.argv[2];
if (!port)
    port = "8080";
app.listen(port.toString(), function () {
    return __awaiter(this, void 0, void 0, function* () {
        const host = "localhost";
        console.log("Application listening at http://%s:%s", host, port);
    });
});
//# sourceMappingURL=index.js.map