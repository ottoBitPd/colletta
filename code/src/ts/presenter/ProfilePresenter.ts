import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";
import {UserKind} from "../view/PageView";

var session = require('express-session');

class ProfilePresenter extends PagePresenter{
    //private classClient : ClassClient | undefined;

    constructor(view : any){
        super(view);
        this.client = (new Client.builder()).buildUserClient().build();
    }

    update(app : any){

        app.get('/profile', async (request: any, response: any) => {
            //session.invalidLogin = request.query.mess==="invalidLogin";

            //this.view.setMainList("Login avvenuto con successo sei nel tuo profilo"+session.username);

            let menuList :any;
            menuList= {
                0 :{"link":"link1","name":"name1"},
                1 :{"link":"link2","name":"name2"}
            }
            this.view.setMenuList(menuList);
            //this.viewProfile.setMainList(["class1","class2","class3","class4","class5","class6","class7","class8"]);
            let userClient = this.client.getUserClient();
            if (userClient){
                if (await userClient.isTeacher(session.username)){
                    //console.log("teacher");
                    this.view.setUserKind(UserKind.teacher);
                } else {
                    //console.log("student");
                    this.view.setUserKind(UserKind.student);
                }
            }

            response.send(this.view.getPage());
        });



        app.post('/deleteClass', async (request: any, response: any) => {
            //console.log("post: ",request.body);
            response.send("elimino la classe "+request.body.classToDelete);
        });
    }

}
export {ProfilePresenter};