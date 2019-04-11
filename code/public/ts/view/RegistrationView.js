"use strict";
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
        let ret = "" +
            "<!DOCTYPE html>\n" +
            "   <html lang=\"it\">\n" +
            "   <head>\n" +
            "       <meta charset=\"UTF-8\">\n" +
            "       <title>" + this.title + "</title>\n" +
            "       <link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\">\n" +
            "       <!--bootstrap-->" +
            "       <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\">" +
            "       <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.7.0/css/all.css\" integrity=\"sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ\" crossorigin=\"anonymous\">" +
            "       <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>\n" +
            "       <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\"></script>\n" +
            "       <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\"></script>\n" +
            "       </head>\n" +
            "       <body>\n";
        ret += this.getMenu();
        ret += "" +
            "           <div class=\"row\">\n" +
            "               <div class=\"col-sm-8 mx-auto text-center\">\n" +
            "                   <h1 class='h2'>Registrazione</h1>\n";
        //"               </div>\n" +
        //"               <div class=\"col-sm-8 mx-auto\">\n";
        if (this.authPresenter.isUsernameInvalid()) {
            ret += "                     <p class='text-danger'>username già utilizzata, scegli un'altra username</p>\n";
        }
        ret +=
            "<form method='post' action='/saveuser'>\n" +
                "<div class=\"form-group\">\n" +
                "<label class='h5' for=\"sentence\">Inserisci i tuoi dati</label>\n " +
                "<input type=\"text\" class=\"form-control my-2\" id=\"name\" name=\"name\" placeholder=\"Inserisci il tuo nome\" required/>" +
                "<input type=\"text\" class=\"form-control my-2\" id=\"surname\" name=\"surname\" placeholder=\"Inserisci il tuo cognome\" required/>" +
                "<input type=\"text\" class=\"form-control my-2\" id=\"city\" name=\"city\" placeholder=\"Inserisci la tua città\" required/>" +
                "<input type=\"text\" class=\"form-control my-2\" id=\"school\" name=\"school\" placeholder=\"Inserisci la tua scuola\" required/>" +
                "<select class='form-control my-2' name=\"role\" id='role' onchange=\"myFunction() required\">" +
                "   <option value=\"student\">Allievo</option>" +
                "   <option value=\"teacher\">Insegnante</option>" +
                "</select>" +
                "<input type=\"text\" class='form-control my-2' style=\"display: none;\" id=\"inps\" name=\"inps\" placeholder=\"Inserisci il tuo codice inps\" required/>" +
                "<input type=\"text\" class='form-control my-2' id=\"username\" name=\"username\" placeholder=\"Inserisci la tua username\" required/> " +
                "<input type=\"password\" class='form-control my-2' id=\"password\" name=\"password\" placeholder=\"Inserisci la tua password\" required/> " +
                "<input type=\"password\" class='form-control my-2' id=\"checkpassword\" name=\"checkpassword\" placeholder=\"Conferma la tua password\" oninput=\"checkPassword()\" required/> " +
                "<p id='messPassword'></p>" +
                "<button type=\"submit\" id='btnsubmit' class=\"btn btn-primary my-2 my-sm-0 w-25\">Invia</button>" +
                "</div>\n" +
                "</form>\n " +
                "</div>\n" +
                "</div>\n";
        ret += this.getFoot(this.getScript());
        return ret;
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