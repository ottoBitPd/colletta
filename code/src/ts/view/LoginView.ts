import {PageView} from "./PageView";

class LoginView extends PageView{
    constructor(){
        super();
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
            "<form method=\"POST\" action=\"/profile\"> " +
            "<label for=\"sentence\">Inserisci una frase</label> " +
            "<input type=\"text\" id=\"username\" name=\"username\"/> " +
            "<input type=\"password\" id=\"password\" name=\"password\"/> " +
            "<input type=\"submit\" value=\"invia\"/> " +
            "</form> " +
            "<a href=\"/registration\">Registrati</a>"+
        "</div> " +
        "</body> " +
        "</html>";
        // return this.fileSystem.readFileSync('./public/insert.html').toString();
    }
}
export {LoginView};