import {PageController} from "./PageController"
import {LoginView} from "../view/LoginView";
import {RegistrationView} from "../view/RegistrationView";


class AuthenticationController extends PageController {
    private passwordHash = require('password-hash');

    private viewLogin: LoginView;
    private viewRegistration: RegistrationView;

    //private fileSystem:any;

    constructor(viewLogin: LoginView, viewRegistration: RegistrationView) {
        super(null);
        this.viewLogin = viewLogin;
        this.viewRegistration = viewRegistration;

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
            else {
                response.send(this.viewRegistration.getPageM(request.query.mess));
            }


        });

        app.post("/profile", (req:any,res:any)=>{
            let hashedPassword = this.passwordHash.generate(req.body.username);
            // console.log(hashedPassword);

            if(req.body.username!=="admin")
            {
                res.send('<h3>Utente registrato</h3>');
                ref.child('profilo6').set({username: req.body.username,password:hashedPassword});

            }else
                res.send('<h3>Credenziali sbagliate</h3>');
        });
    }
}
export {AuthenticationController};
