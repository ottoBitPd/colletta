"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Component is an abstract class that represents the view
 * for all the application pages
 */
class Component {
    constructor(app) {
        this.app = app;
    }
    //only for tslint
    getApp() {
        return this.app;
    }
}
exports.Component = Component;
//# sourceMappingURL=Component.js.map