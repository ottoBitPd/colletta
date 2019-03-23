import {PageController} from "./PageController";
/**
 * InsertPageController is a class that represents the controller for the insert page
 */
class InsertPageController extends PageController{
    view;
    /**
     * InsertPageController constructor initializes all attributes needed to InsertPageController object.
     */
    constructor(view){
        super(view);
    }

    /**
     * This method provides the insert page, received from the View.
     * @param app
     */
    update(app){
        app.get('/insert', (request, response) => {
            response.send(this.view.getPage());
        });
    }
}
export {InsertPageController};