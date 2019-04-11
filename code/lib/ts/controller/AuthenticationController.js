"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageController_1 = require("./PageController");
const Client_1 = require("../model/Client");
const Student_1 = require("../model/Student");
const Teacher_1 = require("../model/Teacher");
class AuthenticationController extends PageController_1.PageController {
    //private fileSystem:any;
    constructor(viewLogin, viewRegistration) {
        super(null);
        this.passwordHash = require('password-hash');
        this.viewLogin = viewLogin;
        this.viewRegistration = viewRegistration;
        this.client = (new Client_1.Client.builder()).buildUserClient().build();
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
            else { //errore username
                response.send(this.viewRegistration.getPageM(request.query.mess));
            }
        });
        app.post("/profile", (req, res) => {
            const hashedPassword = this.passwordHash.generate(req.body.username);
            // console.log(hashedPassword);
            console.log("client: :" + this.client);
            const user = this.client.getUserClient();
            console.log("username :" + req.body.username + " role: " + req.body.role + " user : " + user);
            if (req.body.username !== "admin" && req.body.role === "student" && user !== undefined) {
                const student = new Student_1.Student(req.body.username, hashedPassword, req.body.name, req.body.surname, "Città", "Scuola");
                user.insert(student);
                console.log("studente registrato con successo");
                res.redirect("/login?mess=regisDone");
            }
            else if (req.body.username !== "admin" && req.body.role === "teacher" && user !== undefined) {
                const teacher = new Teacher_1.Teacher(req.body.username, hashedPassword, req.body.name, req.body.surname, "Città", "Scuola", 0);
                user.insert(teacher);
                console.log("teacher registrato con successo");
                res.redirect("/login?mess=regisDone");
            }
            else {
                console.log("tutto a puttane");
                res.redirect("/registration?mess=errUsername");
            }
        });
    }
}
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=AuthenticationPresenter.js.map