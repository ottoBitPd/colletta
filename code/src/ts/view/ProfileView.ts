import {PageView} from "./PageView";

class ProfileView extends PageView{
    private classList: any;
    constructor(){
        super();
        this.classList = null;

    }
    setClassList( list : string []){
        this.classList=list;
    }

    getPage() {

        let str : string = "<!DOCTYPE html> " +
            "<html lang=\"it\"> " +
            "<head> " +
            "<meta charset=\"UTF-8\"> " +
            "<title>Elenco</title> " +
            "<link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\"> " +
            "</head> " +
            "<body> " +
            "<div style='overflow: auto' class='background' id=\"classes\"> " +
            "<h1>Elenco classi</h1>" +
            "<form method='post' action='/deleteClass'>" +
            "<ul>" ;
        for(let l in this.classList){
            str += "<li><h2 style='float: left'>Elimina</h2>";
            str += "<button name=\"classToDelete\" value=\""+this.classList[l]+"\" type=\"submit\">Elimina</button></li>";
        }

        str += "</ul></form>" +
            "</div> " +
            "</body> " +
            "</html>";
        return str;
    }


}
export {ProfileView};