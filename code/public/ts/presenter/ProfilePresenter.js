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
const PagePresenter_1 = require("./PagePresenter");
const Client_1 = require("../model/Client/Client");
const PageView_1 = require("../view/PageView");
var session = require('express-session');
/**
 *
 */
class ProfilePresenter extends PagePresenter_1.PagePresenter {
    constructor(view) {
        super(view);
        this.client = (new Client_1.Client.builder()).buildUserClient().buildExerciseClient().build();
    }
    /**
     * This method provides to manage the view urls.
     * @param app
     */
    update(app) {
        app.post('/update', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let userClient = this.client.getUserClient();
            if (userClient) {
                const id = yield userClient.search(session.username);
                const userData = yield userClient.getUserData(id);
                let check = false;
                if (request.body.oldpassword === "" && request.body.password === "") {
                    check = true;
                }
                if (request.body.oldpassword !== "" && request.body.password !== "") {
                    if (userClient.checkPassword(request.body.oldpassword, userData.password)) {
                        request.body.password = userClient.hashPassword(request.body.password);
                        check = true;
                        this.view.setError("Password modificata");
                    }
                    else {
                        check = false;
                        this.view.setError("Modifica abortita username esistente o password errata");
                    }
                }
                if (check === true && request.body.username === "") {
                    check = true;
                }
                else {
                    if (check === true && (yield userClient.search(request.body.username)) === "false") {
                        check = true;
                    }
                    else {
                        check = false;
                        this.view.setError("Modifica abortita username esistente o password errata");
                    }
                }
                if (check) {
                    this.view.setError("");
                    let userUpdateData = {};
                    for (let i in request.body) {
                        if (i !== "oldpassword" && i !== "inps") {
                            if (request.body[i] !== "") {
                                userUpdateData[i] = request.body[i];
                            }
                            else
                                userUpdateData[i] = userData[i];
                        }
                    }
                    if (yield userClient.isTeacher(session.username)) {
                        if (/^[^\s]$/.test(request.body.inps))
                            userUpdateData.inps = request.body.inps;
                        else
                            userUpdateData.inps = userData.inps;
                        this.view.setUserKind(PageView_1.UserKind.teacher);
                    }
                    else {
                        this.view.setUserKind(PageView_1.UserKind.student);
                    }
                    yield userClient.updateUser(session.username, userUpdateData);
                    session.username = userUpdateData.username;
                }
            }
            response.redirect('/profile');
        }));
        app.get('/profile', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let userClient = this.client.getUserClient();
            if (userClient && session.username) {
                const id = yield userClient.search(session.username);
                const userData = yield userClient.getUserData(id);
                this.view.setUserData(userData);
                if (yield userClient.isTeacher(session.username)) {
                    this.view.setUserKind(PageView_1.UserKind.teacher);
                }
                else {
                    this.view.setUserKind(PageView_1.UserKind.student);
                }
            }
            if (session.username === undefined)
                response.redirect('/');
            this.view.setTitle("Profilo");
            response.send(yield this.view.getPage());
        }));
    }
    getStudentClass() {
        return __awaiter(this, void 0, void 0, function* () {
            let userClient = this.client.getUserClient();
            if (userClient) {
                const id = yield userClient.search(session.username);
                const userData = yield userClient.getUserData(id);
                return userData.classId;
            }
        });
    }
    /**
     * This method provides all the info related to the exercise's valutation of a student
     */
    getAverageInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let userClient = this.client.getUserClient();
            let exerciseClient = this.client.getExerciseClient();
            if (userClient && exerciseClient) {
                let id = yield userClient.search(session.username);
                let result = yield exerciseClient.getStudentAverage(id);
                return result;
            }
            return new Map();
        });
    }
}
exports.ProfilePresenter = ProfilePresenter;
//# sourceMappingURL=ProfilePresenter.js.map