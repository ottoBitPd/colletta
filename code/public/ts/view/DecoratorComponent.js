"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
class DecoratorComponent extends Component_1.Component {
    constructor(app, component) {
        super(app);
        this.component = component;
    }
    //only for tslint
    getComponent() {
        return this.component;
    }
}
exports.DecoratorComponent = DecoratorComponent;
//# sourceMappingURL=DecoratorComponent.js.map