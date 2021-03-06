import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";

const session = require('express-session');
const passwordHash = require('bcryptjs');

/**
 *   Class to create and manage the authentication of application
 *   @extends PagePresenter
 */
class RegistrationPresenter extends PagePresenter {

    constructor(view : any){
        super(view);
        this.client = (new Client.builder()).buildUserClient().build();
    }

    /**
     * This method provides to manage the view urls.
     * @param app
     */
    update(app: any) {
        app.get('/logout', (request: any, response: any) => {

            delete session.invalidLogin;
            delete session.errUsername;
            delete session.username;
            delete session.password;

            response.redirect('/');
        });
        app.get('/profile', (request: any, response: any) => {
            response.send("Login avvenuto con successo sei nel tuo profilo"+session.username);
        });

        app.post('/checklogin', async (request: any, response: any) => {
            let userClient = this.client.getUserClient();

            if(userClient && request.body.username !== "admin") {//if is not undefined

                if (await userClient.verifyUser(request.body.username, request.body.password)) {
                    app.use(session({secret: 'colletta',resave: false, saveUninitialized: true}));
                    session.username = request.body.username;
                    session.password = request.body.password;
                    response.redirect("/");
                }
                else {

                    response.redirect("/?mess=invalidLogin");
                }
            }
        });

        app.get('/registration', async (request: any, response: any) => {
            session.errUsername = request.query.mess === "errUsername";
            this.view.setTitle("Registrati");
            response.send(await this.view.getPage());
        });

        app.post("/saveuser", async (req:any,res:any) => {

            const hashedPassword = passwordHash.hashSync(req.body.username,10);
            let userClient = this.client.getUserClient();
            if(userClient !== undefined){
                const exist = await userClient.search(req.body.username);
                if(exist==="false") {
                    if (req.body.role === "student") {
                        userClient.insertStudent(req.body.username, hashedPassword, req.body.name, req.body.surname, req.body.city, req.body.school, req.body.email);
                        res.redirect("/");
                    } else if (req.body.role === "teacher") {
                        userClient.insertTeacher(req.body.username, hashedPassword, req.body.name, req.body.surname, req.body.city, req.body.school, req.body.inps, req.body.email);
                        res.redirect("/");
                    }
                    else {
                        res.redirect("/registration?mess=errUsername");
                    }
                }else {
                    res.redirect("/registration?mess=errUsername");
                }
            }
        });
    }

    /**
     * This method returns true if username is invalid.
     * @return boolean
     */
    public isUsernameInvalid() : boolean {
        return  session.errUsername;
    }
}
export {RegistrationPresenter};

