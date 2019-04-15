"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const ProfileController_1 = require("../controller/ProfileController");
class MainComponent extends Component_1.Component {
    constructor(app) {
        super(app);
        this.profileController = new ProfileController_1.ProfileController(this);
        this.profileController.update(app);
        this.title = "";
        this.menuList = null;
    }
    setMenuList(menuList) {
        this.menuList = menuList;
    }
    getPage() {
        let ret = this.getHead();
        ret += this.getMenu();
        ret += "    </div>" +
            "</nav>" +
            "<div class=\"container\">" +
            "    <div class=\"row\">vuoto" +
            "    </div>        " +
            "</div>";
        ret += this.getFoot("");
        return ret;
    }
    getHead() {
        return "<!DOCTYPE html>" +
            "<html lang=\"en\">" +
            "<head>" +
            "    <meta charset=\"UTF-8\">" +
            "    <title>" + this.title + "</title>" +
            "    <link rel=\"stylesheet\" type=\"text/css\" href=\"/newStyle.css\">" +
            "    <link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\">" +
            "    <!--bootstrap-->" +
            "    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\">" +
            "    <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>" +
            "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\"></script>" +
            "    <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\"></script>" +
            "</head>" +
            "<body>";
    }
    getMenu() {
        let ret = "<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
            "    <div class=\"navbar-brand\">Colletta</div>" +
            "    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
            "        <span class=\"navbar-toggler-icon\"></span>" +
            "    </button>" +
            "    <div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">" +
            "<ul class=\"navbar-nav\">";
        for (let i in this.menuList) {
            ret += "" +
                "<li class=\"nav-item\">" +
                "   <a class=\"nav-link\" href=\"" + this.menuList[i].link + "\">" + this.menuList[i].name + "</a>" +
                "</li>";
        }
        ret += "</ul>";
        //aggiungo login o logout
        ret += this.loginLogout();
        ret += "    </div>" +
            "</nav>";
        return ret;
    }
    loginLogout() {
        if (this.profileController.isLoggedIn()) {
            return "" +
                "        <div class=\"login-container\">" +
                "        <form action='/logout'>" +
                "           <div class=\"form-group\">" +
                "               <button type=\"submit\" class=\"btn btn-primary btn-block\">Logout</button>" +
                "           </div>" +
                "        </form>" +
                "        </div>";
        }
        else {
            let ret = "";
            ret += "" +
                "        <form class='navbar-form navbar-right' method ='post' action='/checklogin'>";
            if (this.profileController.isLoginInvalid()) {
                ret += "<p class='red'>username o password invalidi</p>";
            }
            ret += "           <div class=\"form-group\">" +
                "               <input type=\"text\" class=\"form-control\" name='username' placeholder=\"Username\" required=\"required\">" +
                "           </div>" +
                "           <div class=\"form-group\">" +
                "               <input type=\"password\" class=\"form-control\" name='password' placeholder=\"Password\" required=\"required\">" +
                "           </div>" +
                "           <button type=\"submit\" class=\"btn btn-primary btn-block\">Login</button>" +
                "        </form>";
            return ret;
        }
    }
    getFoot(script) {
        return "</body>" +
            "<script>" + script + "</script>" +
            "</html>";
    }
}
exports.MainComponent = MainComponent;
//# sourceMappingURL=MainComponent.js.map