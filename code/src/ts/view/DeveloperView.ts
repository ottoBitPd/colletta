import {PageView} from "./PageView";
import {DeveloperPresenter} from "../presenter/DeveloperPresenter";

/**
 *   Class to display the developer page
 *   @extends PageView
 */
class DeveloperView extends PageView {
    private devPresenter :DeveloperPresenter;
    constructor(app : any) {
        super();
        this.devPresenter= new DeveloperPresenter(this);
        this.devPresenter.update(app);
    }

    /**
     * This method is used to display the page body structure
     * @return {string} the HTML source
     */
    public async getPage() {
        let ret = "" +
            "<!DOCTYPE html>\n" +
            "<html lang=\"it\">\n" +
            "\t<head>\n" +
            "\t\t<meta charset=\"UTF-8\">\n" +
            "\t\t<title>"+this.title+"</title>\n" +
            "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\">\n" +
            "\t\t<!--bootstrap-->" +
            "\t\t<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\">\n" +
            "\t\t<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.7.0/css/all.css\" integrity=\"sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ\" crossorigin=\"anonymous\">\n" +
            "\t\t<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>\n" +
            "\t\t<script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\"></script>\n" +
            "\t\t<script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\"></script>\n" +
            "\t</head>\n" +
            "<body>\n";
        ret += this.getMenu();
        ret += "" +
            "\t<div class='row container mx-auto'>\n"+
            "\t\t\t<div class=\"col-sm-8 mx-auto text-center\">\n";
        if(!this.devPresenter.isLoggedIn()) {
            let s = this.devPresenter.getMessage();
            if (s) {
                ret += "<p class='text-danger'>Password inserita non corretta</p>";
            }
            ret += "\t\t\t<form action='checkdeveloper' method='post'>" +
                "\t\t\t\t<input type=\"password\" class='form-control my-2' name=\"password\" placeholder=\"Inserisci la password dello sviluppatore\" required/>\n" +
                "\t\t\t\t<button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0 w-25\">Invia</button>\n" +
                "\t\t\t</form>" +
                "\t\t\t</div>" +
                "</div>\n";
        }
        else{//developer is loggedIn
            ret += "\t\t\t<form action='/developer' method='get'>" +
            "\t\t\t\t<input type=\"text\" class='form-control my-2' name=\"sentence\" placeholder=\"Inserisci una frase\"/>\n" +
            "\t\t\t\t<input type=\"number\" class='form-control my-2' id= \"valutationFrom\" name=\"valutationFrom\" placeholder=\"Scegli una valutazione minima \" min='1' max='10' onchange='syncFunc()'/>\n" +
            "\t\t\t\t<input type=\"number\" class='form-control my-2' id= \"valutationTo\" name=\"valutationTo\" placeholder=\"Scegli una valutazione massima \" min='1' max='10'/>\n" +

            "<div class=\"form-group row\">\n" +
            "  <label for=\"example-date-input\" class=\"col-2 col-form-label\">Data inizio</label>\n" +
            "  <div class=\"col-10\">\n" +
            "    <input class=\"form-control\" type=\"date\" name=\"dateFrom\" id=\"date\">\n" +
            "  </div>" +
            "</div>" +
            "<div class=\"form-group row\">\n" +
            "  <label for=\"example-date-input\" class=\"col-2 col-form-label\">Data fine</label>\n" +
            "  <div class=\"col-10\">\n" +
            "    <input class=\"form-control\" type=\"date\" name=\"dateTo\" id=\"date\">\n" +
            "  </div>" +
            "</div>" +
            "\t\t\t\t<input type=\"text\" class='form-control' name=\"user\" placeholder=\"Inserisci un user\"/>\n" +
            "\t\t\t\t<button type=\"submit\" class=\"btn btn-primary my-2 w-25\">Filtra</button>\n" +
            "\t\t\t</form>\n\t\t\t</div>\n";

            ret+= await this.printList();
            ret+="<div class='row col-sm-12'> ";
            if(this.devPresenter.getAnnotations().length>0) {
                let csv = await this.devPresenter.createCsvFromAnnotations();
                let txt = await this.devPresenter.createTxtFromAnnotations();
                ret += "<div class='col-sm-8 row'>" +
                    "<p class='col-sm-2 my-3'>Download</p>" +
                    "<button class='col-sm-4 btn btn-primary my-2 mx-3 w-25' onclick='download(\"" + escape(csv) + "\",\"csv\")' >CSV</button>" +
                    "<button class='col-sm-4 btn btn-primary my-2 mx-3 w-25' onclick='download(\"" + escape(txt) + "\",\"txt\")' >TXT</button>" +
                    "</div>";
            }
            ret+=`<a href='/download' class='btn btn-primary my-2 mx-${this.devPresenter.getAnnotations().length > 0 ? "3" : "auto"} w-25'>Scarica il modello</a>`+
            "</div>" +
            "</div>" +
            "</div>";
        }

        ret+=this.getFoot(this.getScript());
        return ret;
    }

    /**
     * This method is used to display the list of search results
     * @return {string} the HTML source
     */
    //@ts-ignore
    private async printList() {
        let results = await this.devPresenter.getAnnotations();
        if(results.length===0){
            return "<h2 class='h5 col-sm-12 text-danger text-center'>Nessun risultato</h2>";//resultList is not set yet, cause nobody searched yet
        }
        let ret="";

        if(results.length>0) {
            ret += "\t<div class=\"col-sm-12 mx-auto text-center\">" +
                "\t\t<ul class=\"col-sm-12 list-group\">\n" +
                "\t\t\t<li class='list-group-item active'>" +
                "\t\t\t\t<div class='row'>" +
                "\t\t\t\t\t<div class='col-sm-4'>Esercizi</div>"+
                "\t\t\t\t\t<div class='col-sm-2'>Data</div>"+
                "\t\t\t\t\t<div class='col-sm-2'>ID esercizio</div>"+
                "\t\t\t\t\t<div class='col-sm-2'>Hash utente</div>"+
                "\t\t\t\t\t<div class='col-sm-1'>Valutazione</div>"+
                "\t\t\t\t\t<div class='col-sm-1'>Ruolo</div>"+
                "\t\t\t\t</div>" +
                "\t\t\t</li>";

            for (let i in results) {
                    ret += "\t\t\t<li class=\"list-group-item\">" +
                        "\t\t\t\t<div class='row'>" +
                        "\t\t\t\t\t<div class='col-sm-4'>" + results[i].sentence + "</div>\n";
                    let date = new Date(results[i].time);

                    ret += "\t\t\t\t\t<div class='col-sm-2'>" + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + "</div>" +
                        "\t\t\t\t\t<div class='col-sm-2 overflow-tip'><p class='text-truncate'>" + results[i].id + "</p></div>\n" +
                        "\t\t\t\t\t<div class='col-sm-2 overflow-tip'><p class='text-truncate'>" + results[i].solverID + "</p></div>\n" +
                        "\t\t\t\t\t<div class='col-sm-1 overflow-tip'>" + (results[i].valutations[1] !== undefined ? results[i].valutations[1] : "N.V.")+ "</div>\n";

                    ret+="\t\t\t\t\t<div class='col-sm-1 overflow-tip'>" + results[i].teacher + "</div>\n" +
                        "\t\t\t\t</div>\n" +
                        "\t\t\t</li>\n";
                //}
            }
        }
        return ret+"\t\t</ul>\n";
    }

    /**
     * This method invokes all the scripts necessary to create the view
     */
    private getScript() {
        return "" +
            "function syncFunc() {" +
            "var val = document.getElementById('valutationFrom').value;" +
            "document.getElementById('valutationTo').value= val;" +
            "document.getElementById('valutationTo').min= val;" +
            "}" +


            "function download(content,ext){" +
            "content=unescape(content);" +
            "var downloadLink = document.createElement(\"a\");\n" +
            "var blob = new Blob([\"\ufeff\", content]);\n" +
            "var url = URL.createObjectURL(blob);\n" +
            "downloadLink.href = url;\n" +
            "downloadLink.download = \"annotations.\"+ext;\n" +
            "\n" +
            "document.body.appendChild(downloadLink);\n" +
            "downloadLink.click();\n" +
            "document.body.removeChild(downloadLink);" +


            /*
                "var encodedUri = encodeURI(csvContent);\n" +
                "var link = document.createElement(\"a\");\n" +
                "link.setAttribute(\"href\", encodedUri);\n" +
                "link.setAttribute(\"download\", \"my_data.csv\");\n" +
                "document.body.appendChild(link);\n" +
                "\n" +
                "link.click();"+
                */
            "}";

    }

    /**
     * This method is used to display the page menù
     * @return {string} the HTML source
     */
    public getMenu() : string {
        let ret ="<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
            "    <a class=\"navbar-brand\" href='/developer'>Colletta</a>" +
            "    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
            "        <span class=\"navbar-toggler-icon\"></span>" +
            "    </button>" +
            "    <div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">"+
            "<ul class=\"navbar-nav mr-auto\">";
        ret+="</ul>";
        //aggiungo login o logout
        ret+=this.getLoginArea();
        ret+="    </div>" +
            "</nav>";
        return ret;
    }

    /**
     * This method is used to display the page login area
     * @return {string} the HTML source
     */
    public getLoginArea() : string {
        if(this.devPresenter.isLoggedIn()){
            return "" +
                "        <form class='form-inline my-2 my-lg-0' action='/logout'>\n" +
                "           <div class=\"form-group\">" +
                "               <button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0\">Logout</button>\n" +
                "           </div>\n" +
                "        </form>\n";
        }
        return"";
    }
}

export {DeveloperView};