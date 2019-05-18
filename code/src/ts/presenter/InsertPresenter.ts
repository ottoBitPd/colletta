import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";
import {UserKind} from "../view/PageView";


var session = require('express-session');

/**
 *  Class to insert a new exercise
 */
class InsertPresenter extends PagePresenter{

    constructor(view : any){
        super(view);
        this.client =(new Client.builder()).buildUserClient().build();
    }
    /**
     * This method provides to manage the view urls.
     * @param app
     */
    update(app : any){
        this.insertExercise(app);
    }

    /**
     * This method provides to add a new exercise
     * @param app
     */
    private insertExercise(app : any) : void{
        app.get('/', async (request: any, response: any) => {
            session.invalidLogin = request.query.mess==="invalidLogin";
            this.view.setTitle("Homepage");
            let userClient = this.client.getUserClient();
            if (userClient && session.username && session.username !== "developer"){
                if (await userClient.isTeacher(session.username)){
                    this.view.setUserKind(UserKind.teacher);
                } else {
                    this.view.setUserKind(UserKind.student);
                }
            }
            else {
                this.view.setUserKind(UserKind.developer);
            }

            response.send(await this.view.getPage());
        });
    }
}
export {InsertPresenter};