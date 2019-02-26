const CollettaObserver = require("../CollettaObserver.js");
class PageController extends CollettaObserver {

    constructor(view, model, app) {
        super();
        if (this.constructor === CollettaObserver) {
            throw new TypeError("Cannot construct abstract class");
        }
    }

    update(app) {
        throw new TypeError("Cannot call abstract method");
    }

    getView() {
        return this.view;
    }

    getModel() {
        return this.model;
    }
}

module.exports = PageController;