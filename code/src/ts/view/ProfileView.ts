import {PageView} from "./PageView";
import {ProfileController} from "../controller/ProfileController";

class ProfileView extends PageView{

    private profileController :ProfileController;
    constructor(app : any){
        super(app);
        this.profileController= new ProfileController(this);
        this.profileController.update(app);
    }

    getPage() {
        let ret = this.getHead();
            ret +=this.getMenu();
            ret+="    </div>" +
            "</nav>" +
            "<div class=\"container\">" +
            "    <div class=\"row\">" +
                    this.getMain()
            "    </div>        " +
            "</div>";
            ret+=this.getFoot("");
            return ret;
    }


    private getMenu() {
        let ret ="<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
        "    <div class=\"navbar-brand\">Colletta</div>" +
        "    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
        "        <span class=\"navbar-toggler-icon\"></span>" +
        "    </button>" +
        "    <div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">"+
        "<ul class=\"navbar-nav\">";
        for(let i in this.menuList) {
            ret += ""+
                "<li class=\"nav-item\">" +
                "   <a class=\"nav-link\" href=\""+this.menuList[i].link+"\">"+this.menuList[i].name+"</a>" +
                "</li>";
        }
        ret+="</ul>";
        //aggiungo login o logout
        ret+=this.loginLogout();
        ret+="    </div>" +
            "</nav>";
        return ret;
    }

    private getMain() {
        return this.mainList;
    }

    private loginLogout() {

        if(this.profileController.isLoggedIn()){
            return "" +
                "        <div class=\"login-container\">" +
                "        <form action='/logout'>" +
                "           <div class=\"form-group\">" +
                "               <button type=\"submit\" class=\"btn btn-primary btn-block\">Logout</button>" +
                "           </div>" +
                "        </form>" +
                "        </div>";
        }
        else{
            let ret ="";
            ret += "" +
                "        <form class='navbar-form navbar-right' method ='post' action='/checklogin'>";
            if(this.profileController.isLoginInvalid()){
                ret+="<p class='red'>username o password invalidi</p>";
            }
            ret+="           <div class=\"form-group\">" +
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
}
export {ProfileView};