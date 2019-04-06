import {PagePresenter} from "./PagePresenter";
import {PageView} from "../view/PageView";
/**
 * InsertPagePresenter is a class that represents the presenter for the insert page
 */
class InsertPagePresenter extends PagePresenter{
    /**
     * InsertPagePresenter constructor initializes all attributes needed to InsertPagePresenter object.
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
export {InsertPagePresenter};