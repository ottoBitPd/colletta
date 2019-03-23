"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var PageController_1 = require("./PageController");
/**
 * InsertPageController is a class that represents the controller for the insert page
 */
var InsertPageController = /** @class */ (function (_super) {
    __extends(InsertPageController, _super);
    /**
     * InsertPageController constructor initializes all attributes needed to InsertPageController object.
     */
    function InsertPageController(view) {
        return _super.call(this, view) || this;
    }
    /**
     * This method provides the insert page, received from the View.
     * @param app
     */
    InsertPageController.prototype.update = function (app) {
        var _this = this;
        app.get('/insert', function (request, response) {
            response.send(_this.view.getPage());
        });
    };
    return InsertPageController;
}(PageController_1.PageController));
exports.InsertPageController = InsertPageController;
