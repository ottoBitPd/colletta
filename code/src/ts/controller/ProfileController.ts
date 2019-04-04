import {PageController} from "./PageController"

//import {Client} from "../model/Client";
//import {ClassClient} from "../model/ClassClient";


class ProfileController extends PageController{
    //private classClient : ClassClient | undefined;
    private viewProfile : any;
    constructor(viewProfile : any){
        super(null);
        this.viewProfile=viewProfile;
        //this.classClient =(new Client.builder()).buildClassClient().build().getClassClient();
    }

    update(app : any){
        app.get('/profile', (request: any, response: any) => {
            this.viewProfile.setClassList(["class1","class2","class3","class4","class5","class6","class7","class8"])
            response.send(this.viewProfile.getPage());
        });
        app.post('/deleteClass', async (request: any, response: any) => {
            console.log("post: ",request.body);
            response.send("elimino la classe "+request.body.classToDelete);
        });
    }

}
export {ProfileController};