"use strict";
exports.__esModule = true;
/**
 * PageView is an abstract class that represents the view
 * for all the application pages
 */
var PageView = /** @class */ (function () {
    /**
     * PageView is an abstract class and it cannot have objects
     */
    function PageView() {
        this.fileSystem = require('fs');
    }
    /**
     * Abstract method
     */
    PageView.prototype.getPage = function () {
        throw new TypeError("Cannot call abstract method");
    };
    return PageView;
}());
exports.PageView = PageView;
