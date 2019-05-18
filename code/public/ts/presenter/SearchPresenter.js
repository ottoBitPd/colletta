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
 * Class provides to manage the search
 */
class SearchPresenter extends PagePresenter_1.PagePresenter {
    constructor(view) {
        super(view);
        this.searchType = "";
        this.results = new Map();
        this.client = (new Client_1.Client.builder()).buildExerciseClient().buildUserClient().build();
    }
    /**
     * This method provides to set search type
     * @param value
     */
    setSearchType(value) {
        this.searchType = value;
    }
    /**
     * This method returns type search
     */
    getSearchType() {
        return this.searchType;
    }
    update(app) {
        this.exerciseSearchPage(app);
        this.searchExercise(app);
        this.studentSearchPage(app);
        this.searchStudent(app);
        this.classExerciseSearchPage(app);
    }
    /**
     * This method provides to manage exercise search page
     * @param app
     */
    exerciseSearchPage(app) {
        app.get('/exercise/search', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let userClient = this.client.getUserClient();
            if (session.username !== undefined)
                if (userClient && (yield userClient.isTeacher(session.username))) {
                    this.view.setUserKind(PageView_1.UserKind.teacher);
                }
                else {
                    this.view.setUserKind(PageView_1.UserKind.student);
                }
            else
                this.view.setUserKind(PageView_1.UserKind.user);
            if (request.query.s === undefined) {
                let exerciseClient = this.client.getExerciseClient();
                if (exerciseClient) {
                    let map = yield exerciseClient.searchExercise("");
                    this.setResults(map);
                }
            }
            session.invalidLogin = request.query.mess === "invalidLogin";
            this.setSearchType("exercise");
            this.view.setTitle("Ricerca esercizio");
            //this.viewProfile.setMainList(["class1","class2","class3","class4","class5","class6","class7","class8"]);
            response.send(yield this.view.getPage());
        }));
    }
    /**
     * This method provides to manage exercise search
     * @param app
     */
    searchExercise(app) {
        app.post('/searchexercise', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let userClient = this.client.getUserClient();
            if (session.username !== undefined)
                if (userClient && (yield userClient.isTeacher(session.username))) {
                    this.view.setUserKind(PageView_1.UserKind.teacher);
                }
                else {
                    this.view.setUserKind(PageView_1.UserKind.student);
                }
            else
                this.view.setUserKind(PageView_1.UserKind.user);
            let exerciseClient = this.client.getExerciseClient();
            if (exerciseClient) {
                let map = yield exerciseClient.searchExercise(request.body.sentence); //returns map<idEsercizio, sentence>
                this.setResults(map);
                if (this.searchType === "exercise")
                    response.redirect("/exercise/search?s=" + encodeURIComponent(request.body.sentence));
                if (this.searchType === "classExercise")
                    response.redirect(307, "/class/exercise/search?s=" + encodeURIComponent(request.body.sentence));
            }
            else {
                this.setResults(new Map());
                if (this.searchType === "exercise")
                    response.redirect("/exercise/search");
                if (this.searchType === "classExercise")
                    response.redirect(307, "/class/exercise/search?s=" + encodeURIComponent(request.body.sentence));
            }
        }));
    }
    /**
     * This method provides to manage student search page
     * @param app
     */
    studentSearchPage(app) {
        app.post('/student/insert', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let userClient = this.client.getUserClient();
            if (session.username !== undefined)
                if (userClient && (yield userClient.isTeacher(session.username))) {
                    this.view.setUserKind(PageView_1.UserKind.teacher);
                }
                else {
                    this.view.setUserKind(PageView_1.UserKind.student);
                }
            else
                this.view.setUserKind(PageView_1.UserKind.user);
            if (request.query.s === undefined) {
                this.setResults(new Map());
            }
            this.setSearchType("student");
            this.view.setTitle("Ricerca studente");
            response.send(yield this.view.getPage());
        }));
    }
    /**
     *  This method provides to manage student search
     * @param app
     */
    searchStudent(app) {
        app.post('/searchstudent', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let userClient = this.client.getUserClient();
            if (session.username !== undefined)
                if (userClient && (yield userClient.isTeacher(session.username))) {
                    this.view.setUserKind(PageView_1.UserKind.teacher);
                }
                else {
                    this.view.setUserKind(PageView_1.UserKind.student);
                }
            else
                this.view.setUserKind(PageView_1.UserKind.user);
            if (userClient) {
                let map = yield userClient.searchUser(request.body.sentence, false); //returns map<idEsercizio, sentence>
                this.setResults(map);
                response.redirect(307, "/student/insert?s=" + encodeURIComponent(request.body.sentence));
            }
            else {
                this.setResults(new Map());
                response.redirect(307, "/student/insert?s=" + encodeURIComponent(request.body.sentence));
            }
        }));
    }
    /**
     * This method provides to set the results
     * @param map
     */
    setResults(map) {
        this.results = map;
    }
    /**
     * This method returns the results
     * @returns results
     */
    getResults() {
        return this.results;
    }
    /**
     * This method provides to manage exercise search belong a class
     * @param app
     */
    classExerciseSearchPage(app) {
        app.post('/class/exercise/search', (request, response) => __awaiter(this, void 0, void 0, function* () {
            if (request.query.s === undefined) {
                this.setResults(new Map());
            }
            this.setSearchType("classExercise");
            response.send(yield this.view.getPage());
        }));
    }
}
exports.SearchPresenter = SearchPresenter;
//# sourceMappingURL=SearchPresenter.js.map