"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageView_1 = require("./PageView");
const ProfilePresenter_1 = require("../presenter/ProfilePresenter");
class ProfileView extends PageView_1.PageView {
    constructor(app) {
        super();
        this.profileController = new ProfilePresenter_1.ProfilePresenter(this);
        this.profileController.update(app);
    }
    getPage() {
        let ret = this.getHead();
        ret += this.getMenu();
        ret += "<div class=\"container\">" +
            "<p>Benvenuto nel tuo profilo</p>" +
            "<a href='/insert'>Inserisci un esercizio</a>" +
            "</div>";
        ret += this.getFoot("");
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
                "" +
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
        if (this.profileController.isLoggedIn()) {
            return "" +
                "        <form class='form-inline' action='/logout'>" +
                "           <div class=\"form-group\">" +
                "               <button type=\"submit\" class=\"btn btn-primary btn-block\">Logout</button>" +
                "           </div>" +
                "        </form>";
        }
        else {
            let ret = "";
            ret += "" +
                "        <form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>";
            if (this.profileController.isLoginInvalid()) {
                ret += "<p class='text-danger m-1 p-1'>username o password invalidi</p>";
            }
            ret += "           <div class=\"form-group\">" +
                "               <input type=\"text\" class=\"form-control mr-sm-2\" name='username' placeholder=\"Username\" required=\"required\">" +
                "           </div>" +
                "           <div class=\"form-group\">" +
                "               <input type=\"password\" class=\"form-control mr-sm-2\" name='password' placeholder=\"Password\" required=\"required\">" +
                "           </div>" +
                "           <div class=\"form-group\">" +
                "               <button type=\"submit\" class=\"btn btn-outline-success my-2 my-sm-0\">Login</button>" +
                "           </div>" +
                "        </form>";
            return ret;
        }
    }
}
exports.ProfileView = ProfileView;
//# sourceMappingURL=ProfileView.js.map