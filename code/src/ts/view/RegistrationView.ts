import {PageView} from "./PageView";
import {AuthenticationPresenter} from "../presenter/AuthenticationPresenter";

class RegistrationView extends PageView {
    private authPresenter :AuthenticationPresenter;
    constructor(app : any) {
        super();
        this.authPresenter= new AuthenticationPresenter(this);
        this.authPresenter.update(app);
    }

    getPage() {
        let ret = "<!DOCTYPE html>" +
            "<html lang=\"it\">\n" +
            "<head>\n" +
            "    <meta charset=\"UTF-8\">\n" +
            "    <title>"+this.title+"</title>\n" +
            "    <link rel=\"stylesheet\" type=\"text/css\" href=\"/newStyle.css\">\n" +
            /*"    <link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\">\n"+*/
            "    <!--bootstrap-->" +
            "    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\">" +
            "    <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.7.0/css/all.css\" integrity=\"sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ\" crossorigin=\"anonymous\">" +
            "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>\n" +
            "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\"></script>\n" +
            "    <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\"></script>\n";
        ret +=  "<div class=\"container\">" +
                "<div class=\"row\">" +
                "<div class=\"col-sm-12\">" +
                        "<h1>Registrati</h1>";
        if(this.authPresenter.isUsernameInvalid()){
            ret+= "<p class='red'>username già utilizzata, scegli un'altra username</p>";
        }
        ret+=
                        "<form method='post' action='/saveuser'> " +
                            "<div class=\"form-group\">" +
                                "<label for=\"sentence\">Inserisci i tuoi dati</label> " +
                                "<input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\" placeholder=\"Inserisci il tuo nome\"/> " +
                                "<input type=\"text\" class=\"form-control\" id=\"surname\" name=\"surname\" placeholder=\"Inserisci il tuo cognome\"/><br/>" +
                                "<input type=\"text\" class=\"form-control\" id=\"city\" name=\"city\" placeholder=\"Inserisci la tua città\"/>" +
                                "<input type=\"text\" class=\"form-control\" id=\"school\" name=\"school\" placeholder=\"Inserisci la tua scuola\"/>" +
                                "<br/>" +
                                "<select class='form-control' name=\"role\" id='role' onchange=\"myFunction()\">" +
                                "<option value=\"student\">Allievo</option>" +
                                "<option value=\"teacher\">Insegnante</option>" +
                                "</select>" +
                                "<br/><input type=\"text\" class='form-control' style=\"display: none;\" id=\"inps\" name=\"inps\" placeholder=\"Inserisci il tuo codice inps\"/>" +
                                "<br/><input type=\"text\" class='form-control' id=\"username\" name=\"username\" placeholder=\"Inserisci la tua username\"/> " +
                                "<input type=\"password\" class='form-control' id=\"password\" name=\"password\" placeholder=\"Inserisci la tua password\"/> " +
                                "<input type=\"password\" class='form-control' id=\"checkpassword\" name=\"checkpassword\" placeholder=\"Conferma la tua password\" oninput=\"checkPassword()\"/> " +
                                "<p id='messPassword'></p>" +
                                "<br/>" +
                                "<button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0 w-25\">Invia</button>" +
                            "</div>" +
                        "</form> " +
                    "</div>" +
                "</div>" +
        "</div>";
        ret+=this.getFoot(this.getScript());

        return ret;
    }
    private getScript(){
        return"" +
            "function myFunction(){\n"+
            "var x = document.getElementById('role').value;\n" +
            "var elem = document.getElementById('inps');\n"+
            //"alert('valore: '+x);"+
            "if (x==='teacher') {\n" +
            "elem.style.display='inline';\n"+
            "}\n"+
            "else{\n"+
            "elem.style.display='none';\n"+
            "}\n" +
            "}\n"+
            "function checkPassword(){\n" +
            "var password = document.getElementById('password').value;\n" +
            "var checkpassword = document.getElementById('checkpassword').value;\n" +
            "var p =document.getElementById('messPassword');\n" +
            "if(password===checkpassword){\n" +
            "p.innerHTML = 'Password confermata';\n" +
            "p.style.color='lime';\n" +
            "}\n" +
            "else{\n" +
            "p.innerHTML = 'Password diversa da quella inserita';\n" +
            "p.style.color='red';\n" +
            "}\n"+
            "}\n"+
            "" ;
    }
    /*getPageM(messages:string) {
        if (messages === "errUsername") {
            return "<!DOCTYPE html> " +
                "<html lang=\"it\"> " +
                "<head> " +
                "<meta charset=\"UTF-8\"> " +
                "<title>Registrazione</title> " +
                "<link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\"> " +
                "</head> " +
                "<body> " +
                "<div id=\"back\"> " +
                "<h1>Registrati</h1>" +
                "<p class='red'>Username già usata</p>" +
                "<form method=\"POST\" action=\"/saveuser\"> " +
                "<label for=\"sentence\">Inserisci i tuoi dati</label> " +
                "<input type=\"text\" id=\"name\" name=\"name\" placeholder=\"Inserisci il tuo nome\"/> " +
                "<input type=\"text\" id=\"surname\" name=\"surname\" placeholder=\"Inserisci il tuo cognome\"/><br/>" +
                "<input type=\"text\" id=\"city\" name=\"city\" placeholder=\"Inserisci la tua città\"/>" +
                "<input type=\"text\" id=\"school\" name=\"school\" placeholder=\"Inserisci la tua scuola\"/>" +
                "<br/>Ruolo<select name=\"role\">" +
                "<option value=\"student\">Allievo</option>" +
                "<option value=\"teacher\">Insegnante</option>" +
                "<option value=\"developer\">Sviluppatore</option>" +
                "</select>" +
                "<br/><input type=\"text\" id=\"inps\" name=\"inps\" placeholder=\"Inserisci il tuo codice inps\"/>" +
                "<br/><input type=\"text\" id=\"username\" name=\"username\" placeholder=\"Inserisci la tua username\"/> " +
                "<input type=\"password\" id=\"password\" name=\"password\" placeholder=\"Inserisci la tua password\"/> " +
                "<br/><input type=\"submit\" value=\"invia\"/> " +
                "</form> " +
                "</div> " +
                "</body> " +
                "<script>" +
                "function myFunction(){"+
                    "var x = document.getElementById('role').value;" +
                    "var elem = document.getElementById('inps');"+
                    //"alert('valore: '+x);"+
                    "if (x==='teacher') {" +
                        "elem.style.display='inline';"+
                    "}"+
                    "else{"+
                        "elem.style.display='none';"+
                    "}" +
                "}"+
                "</script>" +
                "</html>";
        }
        return "errorcaxo";
    }*/
}

export {RegistrationView};