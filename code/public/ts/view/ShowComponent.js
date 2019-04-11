"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProfileController_1 = require("../controller/ProfileController");
const DecoratorComponent_1 = require("./DecoratorComponent");
class ShowComponent extends DecoratorComponent_1.DecoratorComponent {
    constructor(app, component) {
        super(app, component);
        this.elementList = null;
        this.profileController = new ProfileController_1.ProfileController(this);
    }
    //tslint
    getProfileController() {
        return this.profileController;
    }
    getPage() {
        return "<div>" + this.elementList + "</div>";
    }
    setElementList(elementList) {
        this.elementList = elementList;
    }
}
exports.ShowComponent = ShowComponent;
//# sourceMappingURL=ShowComponent.js.map