"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PagePresenter_1 = require("./PagePresenter");
/**
 * InsertPagePresenter is a class that represents the presenter for the insert page
 */
class InsertPagePresenter extends PagePresenter_1.PagePresenter {
    /**
     * InsertPagePresenter constructor initializes all attributes needed to InsertPagePresenter object.
     */
    constructor(view) {
        super(view);
    }
    /**
     * This method provides the insert page, received from the View.
     * @param app
     */
    update(app) {
        app.get('/insert', (request, response) => {
            response.send(this.view.getPage());
        });
    }
}
exports.InsertPagePresenter = InsertPagePresenter;
//# sourceMappingURL=InsertPagePresenter.js.map