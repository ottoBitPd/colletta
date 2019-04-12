"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageView_1 = require("./PageView");
const SearchPresenter_1 = require("../presenter/SearchPresenter");
class SearchView extends PageView_1.PageView {
    constructor(app) {
        super();
        this.searchTitle = "esercizio";
        this.resultList = null;
        this.searchPresenter = new SearchPresenter_1.SearchPresenter(this);
        this.searchPresenter.update(app);
    }
    setResultList(value) {
        this.resultList = value;
    }
    getPage() {
        let ret = this.getHead();
        ret += this.getMenu();
        ret += "<div class=\"container\">" +
            "<h1>RICERCA " + this.searchTitle.toUpperCase() + "</h1>" +
            "<form method ='post' action='/searchExercise'>" +
            "   <div class=\"form-group\">" +
            "       <label for=\"sentence\">Frase</label>" +
            "       <input type=\"text\" class=\"form-control\" id='sentence' name='sentence' placeholder=\"Inserisci una frase\" required=\"required\">" +
            "   </div>" +
            "   <div class=\"form-group\">" +
            "       <button type=\"submit\" class=\"btn btn-primary btn-block\">Cerca</button>" +
            "   </div>" +
            "</form>";
        ret += this.printList();
        ret += "</div>" + this.getFoot("");
        return ret;
    }
    getMenu() {
        let ret = "<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
            "    <div class=\"navbar-brand\">Colletta</div>" +
            "    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
            "        <span class=\"navbar-toggler-icon\"></span>" +
            "    </button>" +
            "    <div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">" +
            "<ul class=\"navbar-nav mr-auto\">";
        for (let i in this.menuList) {
            ret += "" +
                "<li class=\"nav-item\">" +
                "   <a class=\"nav-link\" href=\"" + this.menuList[i].link + "\">" + this.menuList[i].name + "</a>" +
                "</li>";
        }
        ret += "</ul>";
        //aggiungo login o logout
        ret += this.getLoginArea();
        ret += "    </div>" +
            "</nav>";
        return ret;
    }
    getLoginArea() {
        if (this.searchPresenter.isLoggedIn()) {
            return "" +
                "        <form class='form-inline my-2 my-lg-0' action='/logout'>\n" +
                "           <div class=\"form-group\">" +
                "               <button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0\">Logout</button>" +
                "           </div>\n" +
                "        </form>\n";
        }
        else {
            let ret = "";
            ret += "" +
                "        <form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>\n";
            if (this.searchPresenter.isLoginInvalid()) {
                ret += "<p class='text-danger m-1 p-1'>username o password invalidi</p>";
            }
            ret += "           <div class=\"form-group\">" +
                "               <input type=\"text\" class=\"form-control mr-sm-2\" name='username' placeholder=\"Username\" required=\"required\">" +
                "           </div>\n" +
                "           <div class=\"form-group\">" +
                "               <input type=\"password\" class=\"form-control mr-sm-2\" name='password' placeholder=\"Password\" required=\"required\">" +
                "           </div>\n" +
                "           <div class=\"form-group\">" +
                "               <button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0\">Login</button>" +
                "           </div>\n" +
                "        </form>\n";
            return ret;
        }
    }
    printList() {
        if (this.resultList === null) {
            return ""; //resultList is not set yet, cause nobody searched yet
        }
        if (this.resultList.has("false")) {
            return "Nessun risultato"; //resultList is not set yet, cause nobody searched yet
        }
        let ret = "<h2>Esercizi: </h2>\n" +
            "<form method='post' action='/exercise'>" +
            "<ul class=\"list-group\">\n";
        this.resultList.forEach((value, key) => {
            ret += "<li class=\"list-group-item\"><p class='d-inline pr-1'>" + value + "</p>" +
                "<button class='btn btn-primary btn-sm float-right' name='sentence' value='" + value + "' type='submit'>Esegui esercizio</button>" +
                "</li>\n";
        });
        return "</ul></form>\n" + ret;
    }
}
exports.SearchView = SearchView;
//# sourceMappingURL=SearchView.js.map