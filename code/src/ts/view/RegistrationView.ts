import {PageView} from "./PageView";

class RegistrationView extends PageView {
    constructor() {
        super();
    }

    getPage() {
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
            "<form method=\"POST\" action=\"/saveuser\"> " +
            "<label for=\"sentence\">Inserisci i tuoi dati</label> " +
            "<input type=\"text\" id=\"name\" name=\"name\" placeholder=\"Inserisci il tuo nome\"/> " +
            "<input type=\"text\" id=\"surname\" name=\"surname\" placeholder=\"Inserisci il tuo cognome\"/><br/>" +
            "<input type=\"text\" id=\"city\" name=\"city\" placeholder=\"Inserisci la tua città\"/>" +
            "<input type=\"text\" id=\"school\" name=\"school\" placeholder=\"Inserisci la tua scuola\"/>" +
            "<br/><select name=\"role\" id='role' onchange=\"myFunction()\">" +
            "<option value=\"student\">Allievo</option>" +
            "<option value=\"teacher\">Insegnante</option>" +
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

    getPageM(messages:string) {
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
    }
}

export {RegistrationView};