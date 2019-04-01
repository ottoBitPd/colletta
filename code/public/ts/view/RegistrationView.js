"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageView_1 = require("./PageView");
class RegistrationView extends PageView_1.PageView {
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
            "<form method=\"POST\" action=\"/profile\"> " +
            "<label for=\"sentence\">Inserisci i tuoi dati</label> " +
            "<input type=\"text\" id=\"name\" name=\"name\" placeholder=\"Inserisci il tuo nome\"/> " +
            "<input type=\"text\" id=\"surname\" name=\"surname\" placeholder=\"Inserisci il tuo cognome\"/> " +
            "<br/><select name=\"role\">" +
            "<option value=\"student\">Allievo</option>" +
            "<option value=\"teacher\">Insegnante</option>" +
            "</select>" +
            "<br/><input type=\"text\" id=\"username\" name=\"username\" placeholder=\"Inserisci la tua username\"/> " +
            "<input type=\"password\" id=\"password\" name=\"password\" placeholder=\"Inserisci la tua password\"/> " +
            "<input type=\"submit\" value=\"invia\"/> " +
            "</form> " +
            "</div> " +
            "</body> " +
            "</html>";
        // return this.fileSystem.readFileSync('./public/insert.html').toString();
    }
    getPageM(messages) {
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
                "<form method=\"POST\" action=\"/profile\"> " +
                "<label for=\"sentence\">Inserisci i tuoi dati</label> " +
                "<input type=\"text\" id=\"name\" name=\"name\" placeholder=\"Inserisci il tuo nome\"/> " +
                "<input type=\"text\" id=\"surname\" name=\"surname\" placeholder=\"Inserisci il tuo cognome\"/> " +
                "<br/>Ruolo<select name=\"role\">" +
                "<option value=\"student\">Allievo</option>" +
                "<option value=\"teacher\">Insegnante</option>" +
                "<option value=\"developer\">Sviluppatore</option>" +
                "</select>" +
                "<br/>" +
                "<input type=\"text\" id=\"minps\" name=\"minps\" placeholder=\"Inserisci la tua matricola INPS\"/>" +
                "<br/><input type=\"text\" id=\"username\" name=\"username\" placeholder=\"Inserisci la tua username\"/> " +
                "<input type=\"password\" id=\"password\" name=\"password\" placeholder=\"Inserisci la tua password\"/> " +
                "<input type=\"submit\" value=\"invia\"/> " +
                "</form> " +
                "</div> " +
                "</body> " +
                /*"<script>" +
            var x = document.getElementById().value;
            switch (x) {
                "</script>"
                    "</html>";
            }*/
                "</html>";
            // return this.fileSystem.readFileSync('./public/insert.html').toString();
        }
        return "errorcaxo";
    }
}
exports.RegistrationView = RegistrationView;
//# sourceMappingURL=RegistrationView.js.map