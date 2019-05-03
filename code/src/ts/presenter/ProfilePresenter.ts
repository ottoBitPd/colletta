import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";
import {UserKind} from "../view/PageView";

var session = require('express-session');

/**
 *
 */
class ProfilePresenter extends PagePresenter{
    //private classClient : ClassClient | undefined;

    constructor(view : any){
        super(view);
        this.client = (new Client.builder()).buildUserClient().buildExerciseClient().build();
    }
    /**
     * This method provides to manage the view urls.
     * @param app
     */
    update(app : any){
        app.post('/update', async (request: any, response: any) => {
            let userClient = this.client.getUserClient();
            if (userClient){
                const id = await userClient.search(session.username);
                const userData = await userClient.getUserData(id);
                let check : boolean =false;
                if(request.body.oldpassword==="" && request.body.password==="") {
                    check = true;
                }
                if(request.body.oldpassword!=="" && request.body.password!=="") {
                    if (userClient.checkPassword(request.body.oldpassword,userData.password)) {
                        request.body.password = userClient.hashPassword(request.body.password);
                        check = true;
                        this.view.setError("Password modificata");
                    }
                    else {
                        check = false;
                        this.view.setError("Modifica abortita username esistente o password errata");
                    }
                }
                if(check===true && request.body.username==="") {
                    check = true;
                }
                else {
                    if(check===true && await userClient.search(request.body.username)==="false") {
                        check=true;
                    }
                    else {
                        check=false;
                        this.view.setError("Modifica abortita username esistente o password errata");
                    }
                }
                if(check) {
                    this.view.setError("");
                    let userUpdateData: any = {};
                    for (let i in request.body) {
                        if (i !== "oldpassword" && i!=="inps"){
                            if (request.body[i]!=="") {
                                userUpdateData[i] = request.body[i];
                            }
                            else
                                userUpdateData[i] = userData[i];
                        }
                    }
                    if (await userClient.isTeacher(session.username)) {
                        //console.log("teacher");
                        if (/^[^\s]$/.test(request.body.inps))
                            userUpdateData.inps = request.body.inps;
                        else
                            userUpdateData.inps = userData.inps;
                        this.view.setUserKind(UserKind.teacher);
                    } else {
                        //console.log("student");
                        this.view.setUserKind(UserKind.student);
                    }
                    await userClient.updateUser(session.username, userUpdateData);
                    session.username = userUpdateData.username;
                }
            }
            response.redirect('/profile');
        });

        app.get('/profile', async (request: any, response: any) => {
            let userClient = this.client.getUserClient();
            if (userClient && session.username){
                const id = await userClient.search(session.username);
                const userData = await userClient.getUserData(id);
                //console.log("userData: ",userData);
                this.view.setUserData(userData);
                if (await userClient.isTeacher(session.username)){
                    this.view.setUserKind(UserKind.teacher);
                } else {
                    this.view.setUserKind(UserKind.student);
                }
            }

            if (session.username === undefined)
                response.redirect('/');

            this.view.setTitle("Profilo");
            response.send(await this.view.getPage());
        });
    }

    public async getStudentClass () {
        let userClient= this.client.getUserClient();
        if(userClient){
            const id = await userClient.search(session.username);
            const userData = await userClient.getUserData(id);
            return userData.classId;
        }
    }

    /**
     * This method provides all the info related to the exercise's valutation of a student
     */
    public async getAverageInfo() : Promise<Map<number,number>>{
        let userClient= this.client.getUserClient();
        let exerciseClient= this.client.getExerciseClient();
        if(userClient && exerciseClient) {
            let id = await userClient.search(session.username);
            let result = await exerciseClient.getStudentAverage(id);
            return result;
        }
        return new Map();
    }
}
export {ProfilePresenter};