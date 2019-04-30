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
            ret += "<div class=\"container\" style=\"margin-top: 10%\">" +
                "<h1 class ='text-center mb-5'>Inserisci frase</h1>" +
                "<form method ='post' action='/exercise'>" +
                "   <div class=\"form-group\">" +
                "       <input type=\"text\" class=\"form-control\" id='sentence' name='sentence' placeholder=\"Inserisci una frase\" required=\"required\">" +
                "   </div>" +
                "   <div class=\"form-group text-center\">" +
                "       <button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0 w-25\">Invia</button>" +
                "   </div>" +
                "</form>";
            ret += "</div>" + this.getFoot("");
            return ret;
        });
    }
    /**
     * This method is used to display the page menù
     * @return {string} the HTML source
     */
    getMenu() {
        let ret = "<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
            "\t<div class=\"navbar-brand\">Colletta</div>\n" +
            "\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">\n" +
            "\t\t<span class=\"navbar-toggler-icon\"></span>\n" +
            "\t</button>\n" +
            "\t\t<div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">\n" +
            "\t\t<ul class=\"navbar-nav mr-auto\">\n" +
            "\t\t\t<li class=\"nav-item\">\n" +
            "\t\t\t\t<a id=\"toProgress\" href= \"/exercise/search\" class=\"nav-link\" >Ricerca esercizio</a>\n" +
            "\t\t\t</li>\n";
        if (this.userKind === PageView_1.UserKind.student) {
            ret += "\t\t\t<li class=\"nav-item\">\n" +
                "\t\t\t\t<a href= \"/classes\" class=\"nav-link\" >Le tue classi</a>\n" +
                "\t\t\t</li>\n";
        }
        else if (this.userKind === PageView_1.UserKind.teacher) { //insegnante
            ret += "" +
                "\t\t\t<li class=\"nav-item\">\n" +
                "\t\t\t\t<a href= \"/classes\" class=\"nav-link\" >Area classi</a>\n" +
                "\t\t\t</li>\n" +
                "\t\t\t<li class=\"nav-item\">\n" +
                //href= "/exercise/insert" credo
                "\t\t\t\t<a href= \"#\" class=\"nav-link\" onclick='document.getElementById(\"insertExerciseForm\").classList.toggle(\"d-none\")'>Crea esercizio</a>\n" +
                "\t\t\t</li>\n" +
                "\t\t\t<li class=\"nav-item\">\n" +
                "\t\t\t\t<a href= \"/exercises\" class=\"nav-link\" >I tuoi esercizi</a>\n" +
                "\t\t\t</li>\n";
        }
        ret += "\t\t</ul>\n";
        //aggiungo login o logout
        ret += this.getLoginArea();
        ret += "    </div>" +
            "</nav>";
        ret +=
            "<form method='post' action='/exercise/insert' id='insertExerciseForm' class='d-none'>" +
                "   <div class=\"input-group col-sm-4 py-2 bg-dark\">" +
                "       <input type=\"hidden\" name=\"solutionKey\" value='null'>" +
                "       <input type=\"hidden\" name=\"exerciseKey\" value='null'>" +
                "       <input type=\"text\" name=\"sentence\" class=\"form-control\" required>" +
                "       <button type=\"submit\" class=\"btn btn-primary\">Invia</button>" +
                "   </div>" +
                "</form>";
        return ret;
    }
    /**
     * This method is used to display the page login area
     * @return {string} the HTML source
     */
    getLoginArea() {
        if (this.exercisePresenter.isLoggedIn()) {
            return "" +
                "        <form class='form-inline my-2 my-lg-0' action='/logout'>\n" +
                "           <div class=\"form-group\">" +
                "               <a class=\"btn btn-default btn-circle btn-sm mr-4 pt-2\" href=\"/profile\" role=\"button\"><i class=\"fas fa-user-circle\" style=\"color: white; font-size:26px\"></i></a>\n" +
                "               <button type=\"submit\" class=\"btn-sm btn-primary my-2 my-sm-0\">Logout</button>\n" +
                "           </div>\n" +
                "        </form>\n";
        }
        else {
            let ret = "";
            ret += "" +
                "        <form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>\n";
            if (this.exercisePresenter.isLoginInvalid()) {
                ret += "<p class='text-danger m-1 p-1'>username o password invalidi</p>";
            }
            ret += "<div class=\"form-group\">               \n" +
                "\t\t\t\t<input type=\"text\" class=\"form-control mr-sm-2\" name='username' placeholder=\"Username\" required=\"required\">          \n" +
                "\t\t\t</div>\n" +
                "           <div class=\"form-group\">               \n" +
                "           \t\t<input type=\"password\" class=\"form-control mr-sm-2\" name='password' placeholder=\"Password\" required=\"required\">           \n" +
                "           \t</div>\n" +
                "           <div class=\"form-group\">            \n" +
                "\t\t\t\t<button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0 mr-2\">Accedi</button>  \n" +
                //"           \t\t<button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0\">Registrati</button> \n" +          \n" +
                "<a class=\"btn-sm btn btn-primary my-2 my-sm-0\" href=\"/registration\" role=\"button\">Registrati</a>" +
                "           \t</div>\n" +
                "        </form>\n";
            return ret;
        }
    }
}
exports.InsertPageView = InsertPageView;
//# sourceMappingURL=InsertPageView.js.map