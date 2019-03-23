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
var PageView_1 = require("./PageView");
var InsertPageView = /** @class */ (function (_super) {
    __extends(InsertPageView, _super);
    function InsertPageView() {
        return _super.call(this) || this;
    }
    InsertPageView.prototype.getPage = function () {
        return "<!DOCTYPE html> " +
            "<html lang=\"it\"> " +
            "<head> " +
            "<meta charset=\"UTF-8\"> " +
            "<title>Inserimento frase</title> " +
            "<link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\"> " +
            "</head> " +
            "<body> " +
            "<div id=\"back\"> " +
            "<h1>NUOVO ESERCIZIO</h1>" +
            "<form method=\"POST\" action=\"/exercise\"> " +
            "<label for=\"sentence\">Inserisci una frase</label> " +
            "<input type=\"text\" id=\"sentence\" name=\"sentence\"/> " +
            "<input type=\"submit\" value=\"invia\"/> </form> " +
            "</div> " +
            "</body> " +
            "</html>";
        // return this.fileSystem.readFileSync('./public/insert.html').toString();
    };
    return InsertPageView;
}(PageView_1.PageView));
exports.InsertPageView = InsertPageView;
