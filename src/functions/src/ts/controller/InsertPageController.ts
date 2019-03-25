import {PageController} from "./PageController";
import {PageView} from "../view/PageView";
/**
 * InsertPageController is a class that represents the controller for the insert page
 */
class InsertPageController extends PageController{
    /**
     * InsertPageController constructor initializes all attributes needed to InsertPageController object.
     */
    constructor(view: PageView){
        super(view);
    }

    /**
     * This method provides the insert page, received from the View.
     * @param app
     */
    update(app: any){
        app.get('/insert', (request: any, response: any) => {
            response.send(this.view.getPage());
        });
    }
}
export {InsertPageController};