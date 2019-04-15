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
var session = require('express-session');
class SearchPresenter extends PagePresenter_1.PagePresenter {
    constructor(view) {
        super(view);
        this.client = (new Client_1.Client.builder()).buildExerciseClient().build();
    }
    update(app) {
        app.get('/home', (request, response) => {
            session.invalidLogin = request.query.mess === "invalidLogin";
            let menuList;
            menuList = {
                0: { "link": "link1", "name": "name1" },
                1: { "link": "link2", "name": "name2" }
            };
            this.view.setTitle("Homepage");
            this.view.setMenuList(menuList);
            //this.viewProfile.setMainList(["class1","class2","class3","class4","class5","class6","class7","class8"]);
            response.send(this.view.getPage());
        });
        app.post('/searchExercise', (request, response) => __awaiter(this, void 0, void 0, function* () {
            //console.log("frase da cercare : "+request.body.sentence);
            let exerciseClient = this.client.getExerciseClient();
            if (exerciseClient) {
                let map = yield exerciseClient.searchExercise(request.body.sentence); //returns map<idEsercizio, sentence>
                this.view.setResultList(map);
                response.redirect("/home");
            }
        }));
    }
    //@ts-ignore
    searchExercises(sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            let exerciseClient = this.client.getExerciseClient();
            if (exerciseClient) {
                yield exerciseClient.searchExercise(sentence);
            }
        });
    }
}
exports.SearchPresenter = SearchPresenter;
//# sourceMappingURL=SearchPresenter.js.map