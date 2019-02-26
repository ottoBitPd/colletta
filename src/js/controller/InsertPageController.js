const PageController = require("./PageController.js");
class InsertPageController extends PageController{
    constructor(view, model,app){
        super();
        this.view=view;
        this.model=model;
        this.app=app;
    }
    update(app){
        app.get('/insert', (request, response) => {
            response.send(this.getView().getPage());
        });
    }
}
module.exports = InsertPageController;