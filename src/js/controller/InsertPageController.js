const PageController = require("./PageController.js");
class InsertPageController extends PageController{
    constructor(view, model){
        super();
        this.view=view;
        this.model=model;
    }
    update(app){
        app.get('/insert', (request, response) => {
            response.send(this.view.getPage());
        });
    }
}
module.exports = InsertPageController;