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
        app.post('/update', async (request: any, response: any) => {
            let userClient = this.client.getUserClient();
            if (userClient){
                let userUpdateData : any = {
                    "name" : request.body.name,
                    "lastname" : request.body.lastname,
                    "city" : request.body.city,
                    "school" : request.body.school
                }
                if (await userClient.isTeacher(session.username)){
                    //console.log("teacher");
                    userUpdateData.inps= request.body.inps;
                    this.view.setUserKind(UserKind.teacher);
                } else {
                    //console.log("student");
                    this.view.setUserKind(UserKind.student);
                }
                await userClient.updateUser(session.username,userUpdateData);
            }
            response.redirect('/profile');
        });

        app.get('/profile', async (request: any, response: any) => {
            let userClient = this.client.getUserClient();
            if (userClient){
                const id = await userClient.search(session.username);
                const userData = await userClient.getUserData(id);
                //console.log("userData: ",userData);
                this.view.setUserData(userData);
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