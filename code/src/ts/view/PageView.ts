/**
 * PageView is an abstract class that represents the view
 * for all the application pages
 */
enum UserKind {
    user =0,
    student = 1,
    teacher =2,
    developer=3
}

var session = require('express-session');

/**
 * Class to represent the view for all the application pages
 * @abstract
 */
abstract class PageView {
    protected title : any;
    //protected menuList: any;
    protected userKind : UserKind;
    /**
     * PageView is an abstract class and it cannot have objects
     */
    constructor(){
        //this.menuList = null;
        this.title = null;
        this.userKind = 0;
    }

    /**
     * This method modifies the page title
     * @param value - the new page title
     */
    setTitle(value: any) {
        this.title = value;
    }

    /**
     * This method modifies the page list
     * @param value - the new list value
     */
    /*setMenuList(value: any) {
        this.menuList = value;
    }*/

    /**
     * This method modifies the type of an user
     * @param user - the new user type
     */
    setUserKind(usr : UserKind) {
        this.userKind = usr;
    }

    /**
     * This method returns the type of an user
     * @return { UserKind } the kind of the user
     */
    getUserKind() : UserKind{
        return this.userKind;
    }

    /**
     * This method is used to display the page header
     * @return {string} the HTML source
     */
    getHead(style? : string) : string {
        let ret = "<!DOCTYPE html>\n" +
        "<html lang=\"it\">\n" +
        "\t<head>\n" +
        "\t\t<meta charset=\"UTF-8\">\n" +
        "\t\t<title>"+this.title+"</title>\n" +
        "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\">\n"+
        "\t\t<!-- Resources -->\n" +
        "\t\t<script src=\"https://www.amcharts.com/lib/4/core.js\"></script>\n" +
        "\t\t<script src=\"https://www.amcharts.com/lib/4/charts.js\"></script>\n" +
        "\t\t<script src=\"https://www.amcharts.com/lib/4/themes/animated.js\"></script>\n" +
        "\t\t<!--bootstrap-->\n" +
        "\t\t<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\">\n" +
        "\t\t<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.7.0/css/all.css\" integrity=\"sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ\" crossorigin=\"anonymous\">\n" +
        "\t\t<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>\n" +
        "\t\t<script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\"></script>\n" +
        "\t\t<script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\"></script>\n";
            if(style!==undefined){ ret += style;}
        ret += "\t</head>\n" +
        "\t<body>\n";
        return ret;
    }

    /**
     * This method is used to display the page footer
     * @return {string} the HTML source
     */
    getFoot(script : string) : string {
        return "\t</body>\n" +
            "\t<script>\n"+script+"\t</script>\n" +
        "</html>";
    }

    public getMenu() : string {
        let ret ="\t\t<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">\n" +
            "\t\t\t<a class=\"navbar-brand\" href='/'>Colletta</a>\n" +
            "\t\t\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">\n" +
            "\t\t\t\t<span class=\"navbar-toggler-icon\"></span>\n" +
            "\t\t\t</button>\n" +
            "\t\t\t<div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">\n"+
            "\t\t\t\t<ul class=\"navbar-nav mr-auto\">\n"+
            "\t\t\t\t\t<li class=\"nav-item\">\n" +
            "\t\t\t\t\t\t<a id=\"toProgress\" href= \"/exercise/search\" class=\"nav-link\" >Ricerca esercizio</a>\n" +
            "\t\t\t\t\t</li>\n";
        if(this.userKind===UserKind.student) {
            ret += "\t\t\t\t\t<li class=\"nav-item\">\n" +
                "\t\t\t\t\t\t<a href= \"/classes\" class=\"nav-link\" >Le tue classi</a>\n" +
                "\t\t\t\t\t</li>\n";
        }
        else if (this.userKind===UserKind.teacher){//insegnante
            ret += ""+
                "\t\t\t\t\t<li class=\"nav-item\">\n" +
                "\t\t\t\t\t\t<a href= \"/classes\" class=\"nav-link\" >Area classi</a>\n" +
                "\t\t\t\t\t</li>\n"+
                "\t\t\t\t\t<li class=\"nav-item\">\n" +
                //href= "/exercise/insert" credo
                "\t\t\t\t\t\t<a href= \"#\" class=\"nav-link\" onclick='document.getElementById(\"insertExerciseForm\").classList.toggle(\"d-none\")'>Crea esercizio</a>\n" +
                "\t\t\t\t\t</li>\n"+
                "\t\t\t\t\t<li class=\"nav-item\">\n" +
                "\t\t\t\t\t\t<a href= \"/exercises\" class=\"nav-link\" >I tuoi esercizi</a>\n" +
                "\t\t\t\t\t</li>\n";
        }
        ret+="\t\t\t\t</ul>\n";
        //aggiungo login o logout
        ret+=this.getLoginArea();
        ret+="\t\t\t</div>\n" +
            "\t\t</nav>\n";
        ret +=
            "\t\t<form method='post' action='/exercise/insert' id='insertExerciseForm' class='d-none'>\n" +
            "\t\t\t<div class=\"input-group col-sm-4 py-2 bg-dark\">\n" +
            "\t\t\t\t<input type=\"hidden\" name=\"solutionKey\" value='null'>\n" +
            "\t\t\t\t<input type=\"hidden\" name=\"exerciseKey\" value='null'>\n" +
            "\t\t\t\t<input type=\"text\" name=\"sentence\" class=\"form-control\" require='required'>\n" +
            "\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\">Invia</button>\n" +
            "\t\t\t</div>\n" +
            "\t\t</form>\n";
        return ret;
    }

    public getLoginArea() : string {

        if(session.username !== undefined){
            return "" +
                "\t\t\t\t<form class='form-inline my-2 my-lg-0' action='/logout'>\n" +
                "\t\t\t\t\t<div class=\"form-group\">" +
                "\t\t\t\t\t\t<a class=\"btn btn-default btn-circle btn-sm mr-4 pt-2\" href=\"/profile\" role=\"button\">" +
                "<i class=\"fas fa-user-circle\" style=\"color: white; font-size:26px\"></i><p class='text-white d-inline-block p-0 pl-3 m-0 pt-1 align-top'>Il tuo profilo</p></a>\n" +
                "\t\t\t\t\t\t<button type=\"submit\" class=\"btn-sm btn-primary my-2 my-sm-0\">Logout</button>\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t</form>\n";
        }
        else{
            let ret ="";
            ret += "" +
                "\t\t\t\t<form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>\n";
            if(session.invalidLogin){
                ret+="\t\t\t\t\t<p class='text-danger m-1 p-1'>username o password invalidi</p>\n";
            }
            ret+="\t\t\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t\t\t<input type=\"text\" class=\"form-control mr-sm-2\" name='username' placeholder=\"Username\" required=\"required\">\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t\t\t<input type=\"password\" class=\"form-control mr-sm-2\" name='password' placeholder=\"Password\" required=\"required\">\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t\t\t<button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0 mr-2\">Accedi</button>\n" +
                "\t\t\t\t\t\t<a class=\"btn-sm btn btn-primary my-2 my-sm-0\" href=\"/registration\" role=\"button\">Registrati</a>\n"+
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t</form>\n";
            return ret;
        }
    }

    /**
     * This method is used to display the page body
     * @return {string} the HTML source
     */
    abstract async getPage() : Promise<string>;



}
export {PageView};
export {UserKind};