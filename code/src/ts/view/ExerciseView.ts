import {PageView} from "./PageView";
import {ExercisePresenter} from "../presenter/ExercisePresenter";

class ExerciseView extends PageView{
    private sentence : any;
    private posTranslation : any;
    private posTags : any;
    private fileSystem : any;
    //@ts-ignore
    private exercisePresenter : ExercisePresenter;
    constructor(app : any){
        super();
        this.sentence = null;
        this.posTranslation = null;
        this.posTags = null;
        this.exercisePresenter = new ExercisePresenter(this);
        this.exercisePresenter.update(app);
        this.fileSystem = require('fs');
    }


    setSentence(value : string) {
        this.sentence = value;
    }

    setPosTranslation(value : string[]) {
        this.posTranslation = value;
    }

    setPosTags(value : string[]) {
        this.posTags = value;
    }

    getPage() {

        const words = this.sentence.split(" ");
        let ret = this.getHead(this.buildCss(words));
        ret +=this.getMenu();
        ret +="<div class=\"container\">" +
            "    <div id=\"esercizio\">" +
            "        <form method=\"POST\" action=\"/saveExercise\">";

                            ret+=this.buildTable(words);
            //si esegue un passaggio alla OttoBit (^o^)
            ret+="" +
            "            <input type=\"hidden\" name=\"wordsnumber\" value=\"*wordsnumber*\"/>" +
            "            <input type=\"hidden\" name=\"sentence\" value=\""+this.sentence+"\"/>";
                if(this.posTags) {
                    ret += "<input type=\"hidden\" name=\"hunposTags\" value='" + JSON.stringify(this.posTags) + "'/>";
                }
            ret+="   <br/>" +
            "            <input type=\"text\" name=\"topics\"/>" +
            "            <select name=\"difficulty\">" +
            "                <option value=\"1\">Molto facile</option>" +
            "                <option value=\"2\">Facile</option>" +
            "                <option value=\"3\">Medio</option>" +
            "                <option value=\"4\">Difficile</option>" +
            "                <option value=\"5\">Molto difficile</option>" +
            "            </select>" +
            "            <div id=\"submit\"><input type=\"submit\" value=\"Invia\"/></div>" +
            "        </form>" +
            "    </div>" +
            "    </body>" +
            "    <script>";
            ret+=this.getScript();
            ret+="    </script>" +
            "</html>";
            return ret;
        // let data =  this.fileSystem.readFileSync('./public/exercise.html').toString();
        //
        // data=data.replace(/\*table\*/g, this.buildForm(words));
        // data=data.replace(/\*script\*/g, this.getScript());
        // data=data.replace(/\*css\*/g, this.buildCss(words));
        // //data=data.replace(/\*wordsnumber\*/g, words.length);
        // data=data.replace(/\*sentence\*/g, this.sentence);
        // data=data.replace(/\*hunposTags\*/g, JSON.stringify(this.hunposTags));
        // return data;
    }
    private buildTable(words : string[]){
        let table=""+
            "<ul class='list-group'>" +
            "<li class='list-group-item active'>" +
            "<div class='row'>" +
                "<div class='col-sm-4'>" +
                "FRASE" +
                "</div>";
            if(this.posTranslation) {
                table +=""+
                "<div class='col-sm-4'>" +
                "CORREZIONE AUTOGENERATA" +
                "</div>";
            }
        table +="<div class='col-sm-4'>" +
                "CORREZIONE" +
                "</div>" +
            "</div>" +
            "</li>";
        for(let i=0;i < words.length;i++){
            table += ""+
            "<li class='list-group-item'>" +
                "<div class='row'>" +
                    "<div class='col-sm-4'>" +
                        words[i] +
                    "</div>";
                if(this.posTranslation) {
                table += "" +
                    "<div class='col-sm-4'>" +
                        this.posTranslation[i] +
                    "</div>";
                }
            table+=""+
                "<div class='row'>" +
                "<div class='col-sm-4'>" +
                this.getSelect(i) +
                "</div>"+
            "</div>" +
            "</li>";
        }
        return table + "</ul>";
    }

    private buildCss(words : string[]){
        let css="<style>\n";
        for(let i=0;i < words.length;i++){
            css += this.getCss(i);
        }
        return css+"</style>\n";
    }

    private getSelect(index : number){
        const input =  this.fileSystem.readFileSync('./public/htmlSelect.html').toString();
        return input.replace(/\*i\*/g,index);
    }

    private getScript(){
        return this.fileSystem.readFileSync('./public/jsSelect.js').toString();
    }

    private getCss(index : number){
        const input =  this.fileSystem.readFileSync('./public/cssSelect.css').toString();
        return input.replace(/\*i\*/g,index);
    }
    private getMenu() : string {
        let ret ="<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
            "    <div class=\"navbar-brand\">Colletta</div>" +
            "    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
            "        <span class=\"navbar-toggler-icon\"></span>" +
            "    </button>" +
            "    <div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">"+
            "<ul class=\"navbar-nav mr-auto\">";
        for(let i in this.menuList) {
            ret += ""+
                "<li class=\"nav-item\">" +
                "   <a class=\"nav-link\" href=\""+this.menuList[i].link+"\">"+this.menuList[i].name+"</a>" +
                "</li>";
        }
        ret+="</ul>";
        //aggiungo login o logout
        ret+=this.getLoginArea();
        ret+="    </div>" +
            "</nav>";
        return ret;
    }

    private getLoginArea() : string {

        if(this.exercisePresenter.isLoggedIn()){
            return "" +
                "        <form class='form-inline my-2 my-lg-0' action='/logout'>\n" +
                "           <div class=\"form-group\">" +
                "               <button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0\">Logout</button>" +
                "           </div>\n" +
                "        </form>\n";
        }
        else{
            let ret ="";
            ret += "" +
                "        <form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>\n";
            if(this.exercisePresenter.isLoginInvalid()){
                ret+="<p class='red'>username o password invalidi</p>\n";
            }
            ret+="           <div class=\"form-group\">" +
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
}
export {ExerciseView};