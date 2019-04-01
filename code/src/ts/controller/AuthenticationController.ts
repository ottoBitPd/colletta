import {PageController} from "./PageController"
import {LoginView} from "../view/LoginView";
import {RegistrationView} from "../view/RegistrationView";
import {Client} from "../model/Client";

import {Student} from "../model/Student";
import {Teacher} from "../model/Teacher";


class AuthenticationController extends PageController {
    private passwordHash = require('password-hash');


    private viewLogin: LoginView;
    private viewRegistration: RegistrationView;
    private client : Client;
    //private fileSystem:any;

    constructor(viewLogin: LoginView, viewRegistration: RegistrationView) {
        super(null);
        this.viewLogin = viewLogin;
        this.viewRegistration = viewRegistration;
        this.client = (new Client.builder()).buildUserClient().build();
        //this.fileSystem = require ('fs');
    }

    update(app: any) {
        app.get('/login', (request: any, response: any) => {

            response.send(this.viewLogin.getPage());

        });
        app.get('/registration', (request: any, response: any) => {
            if (typeof request.query.mess === 'undefined') {
                console.log("passo");
                response.send(this.viewRegistration.getPage());
            }
            else {//errore username
                response.send(this.viewRegistration.getPageM(request.query.mess));
            }


        });

        app.post("/profile", (req:any,res:any)=>{
            const hashedPassword = this.passwordHash.generate(req.body.username);
            // console.log(hashedPassword);
            console.log("client: :"+this.client);
            const user = this.client.getUserClient();
            console.log("username :"+req.body.username+" role: "+ req.body.role+" user : "+user );
            if(req.body.username!=="admin" && req.body.role==="student" && user !== undefined)
            {
                const student = new Student( req.body.username, hashedPassword, req.body.name, req.body.surname, "Città", "Scuola")
                user.insert(student);
                console.log("studente registrato con successo");
                res.redirect("/login?mess=regisDone");

            }
            else if(req.body.username!=="admin" && req.body.role==="teacher" && user !== undefined){
                const teacher = new Teacher( req.body.username, hashedPassword, req.body.name, req.body.surname, "Città", "Scuola", 0);
                user.insert(teacher);
                console.log("teacher registrato con successo");
                res.redirect("/login?mess=regisDone");
            }
            else{

                console.log("tutto a puttane");
                res.redirect("/registration?mess=errUsername");
            }
        });
    }
}
export {AuthenticationController};
