"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageView_1 = require("./PageView");
const ProfileController_1 = require("../controller/ProfileController");
class RegistrationView extends PageView_1.PageView {
    constructor(app) {
        super(app);
        this.profileController = new ProfileController_1.ProfileController(this);
        this.profileController.update(app);
    }
    getPage() {
        let ret = this.getHead();
        ret += "<div class=\"container\">" +
            "   <div class=\"row\">" +
            "<h1>Registrati</h1>";
        if (this.profileController.isUsernameIvalid()) {
            ret += "<p class='red'>username già utilizzata, scegli un'altra username</p>";
        }
        ret +=
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
                "<input type=\"password\" id=\"checkpassword\" name=\"checkpassword\" placeholder=\"Conferma la tua password\" oninput=\"checkPassword()\"/> " +
                "<p id='messPassword'></p>" +
                "<br/><input type=\"submit\" value=\"invia\"/> " +
                "</form> " +
                "    </div>        " +
                "</div>";
        ret += this.getFoot(this.getScript());
        return ret;
    }
    getScript() {
        return "<script>" +
            "function myFunction(){" +
            "var x = document.getElementById('role').value;" +
            "var elem = document.getElementById('inps');" +
            //"alert('valore: '+x);"+
            "if (x==='teacher') {" +
            "elem.style.display='inline';" +
            "}" +
            "else{" +
            "elem.style.display='none';" +
            "}" +
            "}" +
            "function checkPassword(){" +
            "var password = document.getElementById('password').value;" +
            "var checkpassword = document.getElementById('checkpassword').value;" +
            "var p =document.getElementById('messPassword');" +
            "if(password===checkpassword){" +
            "p.innerHTML = 'Password confermata';" +
            "p.style.color='lime';" +
            "}" +
            "else{" +
            "p.innerHTML = 'Password diversa da quella inserita';" +
            "p.style.color='red';" +
            "}" +
            "}" +
            "</script>";
    }
}
exports.RegistrationView = RegistrationView;
//# sourceMappingURL=RegistrationView.js.map