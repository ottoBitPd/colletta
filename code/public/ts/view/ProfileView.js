"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageView_1 = require("./PageView");
class ProfileView extends PageView_1.PageView {
    constructor() {
        super();
        this.classList = null;
    }
    setClassList(list) {
        this.classList = list;
    }
    getPage() {
        let str = "<!DOCTYPE html> " +
            "<html lang=\"it\"> " +
            "<head> " +
            "<meta charset=\"UTF-8\"> " +
            "<title>Elenco</title> " +
            "<link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\"> " +
            "</head> " +
            "<body> " +
            "<div style='overflow: auto' class='background' id=\"classes\"> " +
            "<h1>Elenco classi</h1>" +
            "<form method='post' action='/deleteClass'>" +
            "<ul>";
        for (let l in this.classList) {
            str += "<li><h2 style='float: left'>Elimina</h2>";
            str += "<button name=\"classToDelete\" value=\"" + this.classList[l] + "\" type=\"submit\">Elimina</button></li>";
        }
        str += "</ul></form>" +
            "</div> " +
            "</body> " +
            "</html>";
        return str;
    }
}
exports.ProfileView = ProfileView;
//# sourceMappingURL=ProfileView.js.map