import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";
import {UserKind} from "../view/PageView";


var session = require('express-session');

class InsertPresenter extends PagePresenter{

    constructor(view : any){
        super(view);
        this.client =(new Client.builder()).buildUserClient().build();
    }

    update(app : any){
        this.insertExercise(app);
    }

    private insertExercise(app : any) : void{
        app.get('/', async (request: any, response: any) => {
            session.invalidLogin = request.query.mess==="invalidLogin";

            let userClient = this.client.getUserClient();
            if (userClient && session.username && session.username !== "developer"){
                if (await userClient.isTeacher(session.username)){
                    console.log("teacher");
                    this.view.setUserKind(UserKind.teacher);
                } else {
                    console.log("student");
                    this.view.setUserKind(UserKind.student);
                }
            }
            else {
                //console.log("developer");
                this.view.setUserKind(UserKind.developer);
            }

            response.send(await this.view.getPage());
        });
    }
}
export {InsertPresenter};