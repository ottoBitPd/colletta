"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageController_1 = require("./PageController");
class AuthenticationController extends PageController_1.PageController {
    //private fileSystem:any;
    constructor(viewLogin, viewRegistration) {
        super(null);
        this.passwordHash = require('password-hash');
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
        app.post("/profile", (req, res) => {
            let hashedPassword = this.passwordHash.generate(req.body.username);
            // console.log(hashedPassword);
            if (req.body.username !== "admin") {
                res.send('<h3>Utente registrato</h3>');
                ref.child('profilo6').set({ username: req.body.username, password: hashedPassword });
            }
            else
                res.send('<h3>Credenziali sbagliate</h3>');
        });
    }
}
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=AuthenticationController.js.map