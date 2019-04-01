"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageController_1 = require("./PageController");
class AuthenticationController extends PageController_1.PageController {
    //private fileSystem:any;
    constructor(viewLogin, viewRegistration) {
        super(null);
        this.viewLogin = viewLogin;
        this.viewRegistration = viewRegistration;
        //this.fileSystem = require ('fs');
    }
    update(app) {
        app.get('/login', (request, response) => {
            response.send(this.viewLogin.getPage());
        });
        app.get('/registration', (request, response) => {
            if (typeof request.query.mess === 'undefined') {
                console.log("passo");
                response.send(this.viewRegistration.getPage());
            }
            else {
                response.send(this.viewRegistration.getPageM(request.query.mess));
            }
        });
    }
}
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=AuthenticationController.js.map