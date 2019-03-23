"use strict";
exports.__esModule = true;
/**
 * PageController is an abstract class that represents the controller
 * for all the application pages
 */
var PageController = /** @class */ (function () {
    /**
     * PageController is an abstract class and it cannot have objects
     */
    function PageController(view) {
        this.view = view;
        if (this.constructor === PageController) {
            throw new TypeError("Cannot construct abstract class");
        }
    }
    /**Abstract method **/
    PageController.prototype.update = function (app) {
        throw new TypeError("Cannot call abstract method");
    };
    return PageController;
}());
exports.PageController = PageController;
