import {PageView} from "./PageView";
import {InsertPresenter} from "../presenter/InsertPresenter";

/**
 *   Class to display the page to insert a new exercise
 *   @extends PageView
 */
class InsertPageView extends PageView {

    private exercisePresenter : InsertPresenter;
    constructor(app : any){
        super();
        this.exercisePresenter =  new InsertPresenter(this);
        this.exercisePresenter.update(app);
    }

    /**
     * This method is used to display the page body structure
     * @return {string} the HTML source
     */
    async getPage() {
        let ret = this.getHead();
        ret +=this.getMenu();
        ret +="\t\t<div class=\"container\" style=\"margin-top: 10%\">\n" +
            "\t\t\t<h1 class ='text-center mb-5'>Inserisci frase</h1>\n" +
            "\t\t\t<form method ='post' action='/exercise'>\n"+
            "\t\t\t\t<div class=\"form-group\">\n" +
            "\t\t\t\t\t<input type=\"text\" class=\"form-control\" id='sentence' name='sentence' placeholder=\"Inserisci una frase\" required=\"required\">\n" +
            "\t\t\t\t</div>\n" +
            "\t\t\t\t<div class=\"form-group text-center\">\n" +
            "\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0 w-25\">Invia</button>\n" +
            "\t\t\t\t\t</div>\n" +
            "\t\t\t</form>\n";

        ret+="\t\t</div>\n"+this.getFoot("");
        return ret;
    }
}
export {InsertPageView};