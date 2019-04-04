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
const PageController_1 = require("./PageController");
//import {Client} from "../model/Client";
//import {ClassClient} from "../model/ClassClient";
class ProfileController extends PageController_1.PageController {
    constructor(viewProfile) {
        super(null);
        this.viewProfile = viewProfile;
        //this.classClient =(new Client.builder()).buildClassClient().build().getClassClient();
    }
    update(app) {
        app.get('/profile', (request, response) => {
            this.viewProfile.setClassList(["class1", "class2", "class3", "class4", "class5", "class6", "class7", "class8"]);
            response.send(this.viewProfile.getPage());
        });
        app.post('/deleteClass', (request, response) => __awaiter(this, void 0, void 0, function* () {
            console.log("post: ", request.body);
            response.send("elimino la classe " + request.body.classToDelete);
        }));
    }
}
exports.ProfileController = ProfileController;
//# sourceMappingURL=ProfileController.js.map