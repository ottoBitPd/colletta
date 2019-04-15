"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PageView_1 = require("./PageView");
const AuthenticationPresenter_1 = require("../presenter/AuthenticationPresenter");
class RegistrationView extends PageView_1.PageView {
    constructor(app) {
        super();
        this.authPresenter = new AuthenticationPresenter_1.AuthenticationPresenter(this);
        this.authPresenter.update(app);
    }
    getPage() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = "" +
                "<!DOCTYPE html>\n" +
                "<html lang=\"it\">\n" +
                "\t<head>\n" +
                "\t\t<meta charset=\"UTF-8\">\n" +
                "\t\t<title>" + this.title + "</title>\n" +
                "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\">\n" +
                "\t\t<!--bootstrap-->" +
                "\t\t<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\">" +
                "\t\t<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.7.0/css/all.css\" integrity=\"sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ\" crossorigin=\"anonymous\">" +
                "\t\t<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>\n" +
                "\t\t<script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\"></script>\n" +
                "\t\t<script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\"></script>\n" +
                "\t</head>\n" +
                "<body>\n";
            ret += this.getMenu();
            ret += "" +
                "\t<div class='row container mx-auto'>\n" +
                "\t\t<div class=\"col-sm-8 mx-auto text-center\">\n" +
                "\t\t\t<h1 class='h2'>Registrazione</h1>\n";
            if (this.authPresenter.isUsernameInvalid()) {
                ret += "\t\t\t<p class='text-danger'>username già utilizzata, scegli un'altra username</p>\n";
            }
            ret += "" +
                "\t\t\t<form method='post' action='/saveuser'>\n" +
                "\t\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t\t<label class='h5' for=\"sentence\">Inserisci i tuoi dati</label>\n " +
                "\t\t\t\t\t<input type=\"text\" class=\"form-control my-2\" id=\"name\" name=\"name\" placeholder=\"Inserisci il tuo nome\" required/>" +
                "\t\t\t\t\t<input type=\"text\" class=\"form-control my-2\" id=\"surname\" name=\"surname\" placeholder=\"Inserisci il tuo cognome\" required/>" +
                "\t\t\t\t\t<input type=\"text\" class=\"form-control my-2\" id=\"city\" name=\"city\" placeholder=\"Inserisci la tua città\" required/>" +
                "\t\t\t\t\t<input type=\"text\" class=\"form-control my-2\" id=\"school\" name=\"school\" placeholder=\"Inserisci la tua scuola\" required/>" +
                "\t\t\t\t\t<select class='form-control my-2' name=\"role\" id='role' onchange=\"myFunction()\" required>" +
                "\t\t\t\t\t<option value=\"student\">Allievo</option>" +
                "\t\t\t\t\t<option value=\"teacher\">Insegnante</option>" +
                "\t\t\t\t\t</select>" +
                "\t\t\t\t\t<input type=\"text\" class='form-control my-2' style=\"display: none;\" id=\"inps\" name=\"inps\" placeholder=\"Inserisci il tuo codice inps\" required/>" +
                "\t\t\t\t\t<input type=\"text\" class='form-control my-2' id=\"email\" name=\"email\" placeholder=\"Inserisci la tua email\" required/> " +
                "\t\t\t\t\t<input type=\"text\" class='form-control my-2' id=\"username\" name=\"username\" placeholder=\"Inserisci la tua username\" required/> " +
                "\t\t\t\t\t<input type=\"password\" class='form-control my-2' id=\"password\" name=\"password\" placeholder=\"Inserisci la tua password\" required/> " +
                "\t\t\t\t\t<input type=\"password\" class='form-control my-2' id=\"checkpassword\" name=\"checkpassword\" placeholder=\"Conferma la tua password\" oninput=\"checkPassword()\" required/> " +
                "\t\t\t\t\t<p id='messPassword'></p>" +
                "\t\t\t\t\t<button type=\"submit\" id='btnsubmit' class=\"btn btn-primary my-2 my-sm-0 w-25\">Invia</button>" +
                "\t\t\t\t</div>\n" +
                "\t\t\t</form>\n " +
                "\t\t</div>\n" +
                "\t</div>\n";
            ret += this.getFoot(this.getScript());
            return ret;
        });
    }
    getScript() {
        return "" +
            "function myFunction(){\n" +
            "   var x = document.getElementById('role').value;\n" +
            "   var elem = document.getElementById('inps');\n" +
            //"alert('valore: '+x);"+
            "   if (x==='teacher') {\n" +
            "       elem.style.display='inline';\n" +
            "   }\n" +
            "   else{\n" +
            "       elem.style.display='none';\n" +
            "   }\n" +
            "}\n" +
            "function checkPassword(){\n" +
            "   var password = document.getElementById('password').value;\n" +
            "   var checkpassword = document.getElementById('checkpassword').value;\n" +
            "   var submit = document.getElementById('btnsubmit');\n" +
            "   var p =document.getElementById('messPassword');\n" +
            "   if(password===checkpassword){\n" +
            "       p.innerHTML = 'Password confermata';\n" +
            "       p.style.color='lime';\n" +
            "       submit.removeAttribute('disabled','');\n" +
            "   }\n" +
            "   else{\n" +
            "       p.innerHTML = 'Password diversa da quella inserita';\n" +
            "       p.style.color='red';\n" +
            "       submit.setAttribute('disabled','');\n" +
            "   }\n" +
            "}\n";
    }
    getMenu() {
        let ret = "" +
            "<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
            "    <div class=\"navbar-brand\">Colletta</div>" +
            "    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
            "        <span class=\"navbar-toggler-icon\"></span>" +
            "    </button>" +
            "    <div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">" +
            "       <ul class=\"navbar-nav mr-auto\">" +
            "           <li class=\"nav-item\">" +
            "               <a class=\"nav-link\" href=\"/\">Torna alla home</a>" +
            "           </li>" +
            "       </ul>" +
            "    </div>" +
            "</nav>";
        return ret;
    }
}
exports.RegistrationView = RegistrationView;
//# sourceMappingURL=RegistrationView.js.map