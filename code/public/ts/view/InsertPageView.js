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
const PageView_1 = require("./PageView");
const InsertPresenter_1 = require("../presenter/InsertPresenter");
/**
 *   Class to display the page to insert a new exercise
 *   @extends PageView
 */
class InsertPageView extends PageView_1.PageView {
    constructor(app) {
        super();
        this.exercisePresenter = new InsertPresenter_1.InsertPresenter(this);
        this.exercisePresenter.update(app);
    }
    /**
     * This method is used to display the page body structure
     * @return {string} the HTML source
     */
    getPage() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = this.getHead();
            ret += this.getMenu();
            ret += "\t\t<div class=\"container\" style=\"margin-top: 10%\">\n" +
                "\t\t\t<h1 class ='text-center mb-5'>Inserisci frase</h1>\n" +
                "\t\t\t<form method ='post' action='/exercise'>\n" +
                "\t\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t\t<input type=\"text\" class=\"form-control\" id='sentence' name='sentence' placeholder=\"Inserisci una frase\" required=\"required\">\n" +
                "\t\t\t\t</div>\n" +
                "\t\t\t\t<div class=\"form-group text-center\">\n" +
                "\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0 w-25\">Invia</button>\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t</form>\n";
            ret += "\t\t</div>\n" + this.getFoot("");
            return ret;
        });
    }
}
exports.InsertPageView = InsertPageView;
//# sourceMappingURL=InsertPageView.js.map