import {PageController} from "./PageController"
import {LoginView} from "../view/LoginView";
import {RegistrationView} from "../view/RegistrationView";
import {Client} from "../model/Client";

import {Student} from "../model/Student";
import {Teacher} from "../model/Teacher";
import {User} from "../model/User";
import {Data} from "../model/Data";
import {UserClient} from "../model/UserClient";


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
        app.get('/profile', (request: any, response: any) => {
            response.send("Login avvenuto con successo sei nel tuo profilo");
        });
        app.get('/login', (request: any, response: any) => {
            if(request.query.mess==="invalidLogin") {
                this.viewLogin.setError("username o password invalidi");
            }
            else{
                this.viewLogin.setError("");
            }
            response.send(this.viewLogin.getPage());
        });
        app.post('/checklogin', async (request: any, response: any) => {
            if(this.client && request.body.username !== "admin"){//if is not undefined
                let idUser = await this.client.search(request.body.username);
                if(idUser!=="false"){
                    let user : Data= await this.client.read(idUser);
                    let password=(<User>user).getPassword();
                    if(this.passwordHash.compareSync(request.body.password,password)){
                        //console.log("password match");
                        response.redirect("/profile");
                    }
                    //console.log("password dont match")
                    response.redirect("/login?mess=invalidLogin");
                }
                //console.log("user dont match");
                response.redirect("/login?mess=invalidLogin");
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
                const student = new Student( req.body.username, hashedPassword, req.body.name, req.body.surname, "Città", "Scuola")
                this.client.insert(student);
                console.log("studente registrato con successo");
                res.redirect("/login?mess=regisDone");

            }
            else if(req.body.username!=="admin" && req.body.role==="teacher" && this.client !== undefined){
                const teacher = new Teacher( req.body.username, hashedPassword, req.body.name, req.body.surname, "Città", "Scuola", 0);
                this.client.insert(teacher);
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
