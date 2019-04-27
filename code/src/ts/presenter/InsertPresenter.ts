import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";
import {UserKind} from "../view/PageView";


var session = require('express-session');

class InsertPresenter extends PagePresenter{

    constructor(view : any){
        super(view);
        this.client =(new Client.builder()).buildExerciseClient().buildUserClient().build();
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
            /*if(exerciseClient && userClient){
                //console.log("session.username: ", session.username);
                if(session.username!== undefined && await userClient.isTeacher(session.username)) {
                    //loggato come insegnante

                }
                else if(session.username!== undefined && !(await userClient.isTeacher(session.username))){
                    //loggato come studente
                }
                else{
                    //non loggato
                }
            }*/
            /*let menuList :any;
            menuList= {
                0 :{"link":"/exercise/search","name":"Ricerca esercizio"}
            }*/
            this.view.setTitle("Homepage");
            //this.view.setMenuList(menuList);
            //this.viewProfile.setMainList(["class1","class2","class3","class4","class5","class6","class7","class8"]);
            response.send(await this.view.getPage());
        });
    }
}
export {InsertPresenter};