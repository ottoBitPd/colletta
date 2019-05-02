import {PageView, UserKind} from "./PageView";
import {ClassesPresenter} from "../presenter/ClassesPresenter";

/**
 *   Class to display the classes page
 *   @extends PageView
 */
class ClassesView extends PageView {

    private classPresenter : ClassesPresenter;
    //private classesList: any;
    constructor(app : any){
        super();
        this.classPresenter =  new ClassesPresenter(this);
        this.classPresenter.update(app);
        //this.classesList = null;
    }

    /*public setClassesList(value: any) {
        this.classesList = value;
    }*/

    /**
     * This method is used to display the page body structure
     * @return {string} the HTML source
     */
    async getPage() {
        let ret = this.getHead();
        ret +=this.getMenu();
        ret +="\t<div class=\"container\">" +
            "\t\t<div class='col-sm-10 mx-auto'>";
        let s="Le tue classi";
        if(this.classPresenter.getListType()==="exercises"){
            s="I tuoi esercizi";
        }
        ret+="\t\t\t<h1 class='text-center mb-5'>"+s+"</h1>";
        if(this.userKind===UserKind.teacher && this.classPresenter.getListType()==="classes") {
            ret +="\t\t\t<div class='col-sm-12 text-right'>\n" +
            "\t\t\t<a class=\"btn btn-primary my-3\" href=\"javascript:showInsertClassForm()\" role=\"button\">Aggiungi una nuova classe</a>\n";
            ret += this.insertClass();
            ret += "\t\t\t</div>\n";
        }
        ret+= await this.printList();
        ret+="\t\t</div>" +
        "\t</div>";
        ret+=this.getFoot(this.getScript());
        return ret;
    }

    /**
     * This method is used to display the page menù
     * @return {string} the HTML source
     */
    private getMenu() : string {
        let ret =""+
            "<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
            "\t<div class=\"navbar-brand\">Colletta</div>" +
            "\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
            "\t\t<span class=\"navbar-toggler-icon\"></span>" +
            "\t</button>" +
            "\t<div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">"+
            "\t\t<ul class=\"navbar-nav mr-auto\">"+
            "\t\t<li class=\"nav-item\">\n" +
            "\t\t\t<a id=\"toProgress\" href= \"/\" class=\"nav-link\" >Homepage</a>\n" +
            "\t\t</li>\n"+
            "\t</ul>";
        //aggiungo login o logout
        ret+=this.getLoginArea();
        ret+="\t\t</div>" +
            "\t</nav>";
        return ret;
    }

    /**
     * This method is used to display the page login area
     * @return {string} the HTML source
     */
    private getLoginArea() : string {

        if(this.classPresenter.isLoggedIn()){
            return "" +
                "\t\t\t<form class='form-inline my-2 my-lg-0' action='/logout'>\n" +
                "\t\t\t\t<div class=\"form-group\">" +
                "\t\t\t\t\t<a class=\"btn btn-default btn-circle btn-sm mr-4 pt-2\" href=\"/profile\" role=\"button\"><i class=\"fas fa-user-circle\" style=\"color: white; font-size:26px\"></i></a>\n" +
                "\t\t\t\t\t<button type=\"submit\" class=\"btn-sm btn-primary my-2 my-sm-0\">Logout</button>\n" +
                "\t\t\t\t</div>\n" +
                "\t\t\t</form>\n";
        }
        else{
            let ret ="";
            ret += "" +
                "\t\t\t<form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>\n";
            if(this.classPresenter.isLoginInvalid()){
                ret+="\t\t\t\t<p class='text-danger m-1 p-1'>username o password invalidi</p>\n";
            }
            ret+="\t\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t\t<input type=\"text\" class=\"form-control mr-sm-2\" name='username' placeholder=\"Username\" required=\"required\">          \n" +
                "\t\t\t\t</div>\n" +
                "\t\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t\t<input type=\"password\" class=\"form-control mr-sm-2\" name='password' placeholder=\"Password\" required=\"required\">           \n" +
                "\t\t\t\t</div>\n" +
                "\t\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t\t<button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0 mr-2\">Accedi</button>\n" +
                "\t\t\t\t\t<a class=\"btn-sm btn btn-primary my-2 my-sm-0\" href=\"/registration\" role=\"button\">Registrati</a>\n"+
                "\t\t\t\t</div>\n" +
                "\t\t\t</form>\n";
            return ret;
        }
    }

    /**
     * This method is used to display the class list
     * @return {string} the HTML source
     */
    private async printList() {
        let elements =[];
        let header;
        if(this.classPresenter.getListType()==="classes") {
            elements = await this.classPresenter.getClasses();
            header = "<div class='row'>\n" +
                "<div class='col-sm-2 mx-auto'>CLASSE</div>\n" +
                "<div class='col-sm-6 mx-auto'>DESCRIZIONE</div>\n" +
                "<div class='col-sm-4 mx-auto'></div>\n" +
                "</div>\n";
        }
        if(this.classPresenter.getListType()==="exercises") {
            elements = await this.classPresenter.getExercises();
            header = "<div class='row'>\n" +
                "<div class='col-sm-12 mx-auto'>ESERCIZIO</div>\n" +
                "</div>\n";
        }
        if(elements === null){
            return "";//resultList is not set yet, cause nobody searched yet
        }
        if(elements.length<=0){
            if(this.classPresenter.getListType()==="classes")
                return "<h2 class='h5 text-danger text-center'>Non hai classi</h2>";//resultList is not set yet, cause nobody searched yet
            if(this.classPresenter.getListType()==="exercises")
                return "<h2 class='h5 text-danger text-center'>Non hai inserito alcun esercizio</h2>";
        }
        else {
            let ret = "" +
                "<div class=\"col-sm-12\" id=\"esercizio\">\n" +
                "<ul class='list-group text-center'>\n" +
                "<li class='list-group-item active'>\n" +
                header +
                "</li>\n";
            for(let i in elements){
                ret+="<li class='list-group-item'>\n" +
                "<div class='row'>\n";
                if(this.classPresenter.getListType()==="classes") {
                    ret += "<div class='col-sm-2 mx-auto'>\n" +
                        "<a class='btn btn-link btn-sm' href='/class?classId=" + elements[i].id + "'>" + elements[i].name + "</a>\n" +
                        "</div>\n" +
                        "<div class='col-sm-6 mx-auto'>\n" +
                        elements[i].description +
                        "</div>\n" +
                        "<div class='col-sm-4 mx-auto text-center'>\n";
                    if (this.userKind === UserKind.teacher) {
                        ret += "<form method='post' action='/deleteclass'>\n" +
                            "<button class='btn btn-danger btn-sm' name='key' value='" + elements[i].id + "' type='submit'>Elimina</button>\n" +
                            "</form>\n";
                    }
                    ret += "</div>\n";
                }
                if(this.classPresenter.getListType()==="exercises") {
                    ret += "<div class='col-sm-12 mx-auto'>\n" +
                    "<p class='h5 font-weight-bold mb-2'>"+elements[i].sentence +"</p>\n" +
                    "<div class='row'>\n";
                    let n=1;
                    for(let y in elements[i].solutions) {
                        ret += "<div class='col-sm-8 mx-auto font-weight-bold py-2'>Soluzione "+n+"</div>\n";
                        if(elements[i].solutions[y]._public==="true"){
                            ret+="<div class='col-sm-2 mx-auto text-success py-2'>Pubblica</div>\n";
                        }
                        else{
                            ret+="<div class='col-sm-2 mx-auto text-danger py-2'>Privata</div>\n";
                        }
                        ret+=""+
                            "<div class='col-sm-2 mx-auto py-2'>\n" +
                            "<form method='post' action='/exercise/insert'>\n" +
                            "<input type='hidden' name='exerciseKey' value='"+elements[i].key+"'>\n" +
                            "<input type='hidden' name='solutionKey' value='"+elements[i].solutions[y].key+"'>\n" +
                            "<button class='btn btn-primary btn-sm' name='sentence' value='" + elements[i].sentence + "' type='submit'>Modifica</button>\n" +
                            "</form>\n"+
                            "</div>\n";
                        if(elements[i].solutions[y].solverId===elements[i].authorId) {
                            n++;
                            //ret +="<div class='row'>\n";
                            for(let z in elements[i].solutions[y].itaTags) {
                                ret += "<div class='col-sm-3 mx-auto text-left'>\n" +
                                    elements[i].words[z] +
                                    "</div>\n" +
                                    "<div class='col-sm-9 mx-auto text-left'>\n" +
                                    elements[i].solutions[y].itaTags[z] +
                                    "</div>\n";
                            }
                            //ret +="</div>\n";
                        }
                    }
                    ret+="</div>\n" +
                    "</div>\n";
                }
                ret+="</div>\n" +
                "</li>\n";
            }
            ret+="</ul>" +
                "</div>";
            return ret;
        }
        return "";
    }

    /**
     * This method invokes all the scripts necessary to create the view
     */
    private getScript() {
        return "" +
        "function showInsertClassForm(){\n" +
        "\tdocument.getElementById('insertClassForm').style.display = 'block';\n" +
        "}\n" +
        "function hideInsertClassForm(){\n" +
        "\tdocument.getElementById('insertClassForm').style.display = 'none';\n" +
        "}\n";
    }

    /**
     * This method is used to display the form used to create new classes
     * @return {string} the HTML source
     */
    private insertClass() {
        let ret=""+
        "\t\t\t<form method='post' id='insertClassForm' action='/insertclass' style='display:none'>\n" +
        "\t\t\t\t<div class=\"form-group text-center\">\n" +
        "\t\t\t\t\t<label class='h5' for=\"sentence\">Inserisci i dati della classe</label>\n " +
        "\t\t\t\t\t<input type=\"text\" class=\"form-control my-2\" name=\"classname\" placeholder=\"Inserisci il nome della classe\" required/>" +
        "\t\t\t\t\t<input type=\"text\" class=\"form-control my-2\" name=\"description\" placeholder=\"Inserisci una descrizione della classe\" required/>" +
        "\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0 w-25\" onclick='hideInsertClassForm()'>Crea classe</button>" +
        "\t\t\t\t</div>\n" +
        "\t\t\t</form>\n ";
        return ret;
    }
}
export {ClassesView};