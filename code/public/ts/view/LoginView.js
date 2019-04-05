"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageView_1 = require("./PageView");
class LoginView extends PageView_1.PageView {
    constructor(app) {
        super(app);
        this.error = "";
    }
    setError(error) {
        this.error = error;
    }
    getPage() {
        return "<!DOCTYPE html> " +
            "<html lang=\"it\"> " +
            "<head> " +
            "<meta charset=\"UTF-8\"> " +
            "<title>Login</title> " +
            "<link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\"> " +
            "</head> " +
            "<body> " +
            "<div id=\"back\"> " +
            "<h1>LOGIN</h1>" +
            "<p class='red'>" + this.error + "</p>" +
            "<form method=\"POST\" action=\"/checklogin\"> " +
            "<input type=\"text\" id=\"username\" name=\"username\" placeholder='Inserisci la tua username'/> " +
            "<input type=\"password\" id=\"password\" name=\"password\" placeholder='Inserisci la tua password'/> " +
            "<input type=\"submit\" value=\"invia\"/> " +
            "</form> " +
            "<a href=\"/registration\">Registrati</a>" +
            "</div> " +
            "</body> " +
            "</html>";
        // return this.fileSystem.readFileSync('./public/insert.html').toString();
    }
}
exports.LoginView = LoginView;
//# sourceMappingURL=LoginView.js.map