import {PageView} from "./PageView";
import {InsertPageController} from "../controller/InsertPageController";

class InsertPageView extends PageView {

    private insertPageController : InsertPageController;
    constructor(app : any){
        super();
        this.insertPageController =  new InsertPageController(this);
        this.insertPageController.update(app);
    }

    getPage() {
        return "<!DOCTYPE html> " +
            "<html lang=\"it\"> " +
            "<head> " +
            "<meta charset=\"UTF-8\"> " +
            "<title>Inserimento frase</title> " +
            "<link rel=\"stylesheet\" href=\"/style.css\"> " +
            "</head> " +
            "<body> " +
            "<div id=\"back\"> " +
            "<h1>NUOVO ESERCIZIO</h1>" +
            "<form method=\"POST\" action=\"/exercise\"> " +
            "<label for=\"sentence\">Inserisci una frase</label> " +
            "<input type=\"text\" id=\"sentence\" name=\"sentence\"/> " +
            "<input type=\"submit\" value=\"invia\"/> </form> " +
            "</div> " +
            "</body> " +
            "</html>";
    }
}
export {InsertPageView};