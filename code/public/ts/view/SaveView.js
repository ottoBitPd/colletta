"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageView_1 = require("./PageView");
/**
 *   Class to display the savings page
 *   @extends PageView
 */
class SaveView extends PageView_1.PageView {
    constructor(app) {
        super();
        this.fileSystem = require('fs');
    }
    /**
     * This method is used to display the page body structure
     * @return {string} the HTML source
     */
    getPage() {
        return this.fileSystem.readFileSync('./public/exerciseSaved.html').toString();
    }
}
exports.SaveView = SaveView;
//# sourceMappingURL=SaveView.js.map