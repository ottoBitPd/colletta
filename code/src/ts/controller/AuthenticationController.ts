import {PageController} from "./PageController"
import {LoginView} from "../view/LoginView";
import {RegistrationView} from "../view/RegistrationView";
import {Client} from "../model/Client";

import {UserClient} from "../model/UserClient";
//import {Session} from "inspector";

const session = require('express-session');

class AuthenticationController extends PageController {
    private passwordHash = require('bcryptjs');


    private viewLogin: LoginView;
    private viewRegistration: RegistrationView;
    private client : UserClient | undefined;
    //private fileSystem:any;

    constructor(viewLogin: LoginView, viewRegistration: RegistrationView) {
        super(null);
        this.viewLogin = viewLogin;
        this.viewRegistration = viewRegistration;
        this.client = (new Client.builder()).buildUserClient().build().getUserClient();
        //this.fileSystem = require ('fs');
    }

    update(app: any) {
        app.get('/logout', (request: any, response: any) => {
            //TODO cancellarle tutte
            delete request.session.username;
            delete request.session.password;
            response.redirect('/login');
        });
        app.get('/profile', (request: any, response: any) => {
            response.send("Login avvenuto con successo sei nel tuo profilo "+session.username+
                "<br><a href='/logout'>Logout</a>");
        });
        app.get('/login', (request: any, response: any) => {
            console.log("sessione: "+session.username);
            console.log("sessione: "+session.password);
            if(request.query.mess==="invalidLogin") {
                this.viewLogin.setError("username o password invalidi");
            }
            else{
                this.viewLogin.setError("");
            }
            response.send(this.viewLogin.getPage());
        });
        app.post('/checklogin', async (request: any, response: any) => {
            //app.use(session({name:'bortolone',secret: 'ciao',resave: true, saveUninitialized: true}));


            console.log(session);
            if(this.client && request.body.username !== "admin") {//if is not undefined
                if (await this.client.verifyUser(request.body.username, request.body.password)) {
                    app.use(session({secret: 'colletta',resave: false, saveUninitialized: true}));
                    session.username = request.body.username;
                    session.password = request.body.password;
                    response.redirect("/profile");
                }
                else {
                    response.redirect("/login?mess=invalidLogin");
                }
            }
        });
        app.get('/registration', (request: any, response: any) => {
            if(request.query.mess==="errUsername") {
                this.viewRegistration.setError("username già utilizzata, scegli un'altra username");
            }
            else{
                this.viewRegistration.setError("");
            }
            response.send(this.viewRegistration.getPage());
        });

        app.post("/saveuser", (req:any,res:any)=>{
            const hashedPassword = this.passwordHash.hashSync(req.body.username,10);
            //console.log("hashedPassword:" + hashedPassword);
            console.log("username :"+req.body.username+" role: "+ req.body.role+" user : "+this.client );
            if(req.body.username!=="admin" && req.body.role==="student" && this.client !== undefined)
            {
                this.client.insertStudent(req.body.username, hashedPassword, req.body.name, req.body.surname, "Città", "Scuola");
                console.log("studente registrato con successo");
                res.redirect("/login?mess=regisDone");

            }
            else if(req.body.username!=="admin" && req.body.role==="teacher" && this.client !== undefined){
                this.client.insertTeacher(req.body.username, hashedPassword, req.body.name, req.body.surname, "Città", "Scuola", "0002");
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
