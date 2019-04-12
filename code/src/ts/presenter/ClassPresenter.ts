import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";

var session = require('express-session');

class ClassPresenter extends PagePresenter {

    constructor(view: any) {
        super(view);
        this.client = (new Client.builder()).buildClassClient().buildUserClient().build();
    }

    update(app: any) {
        this.classes(app);

    }
    private classes(app : any){
        app.get('/classes', async (request: any, response: any) => {
            let menuList :any;
            menuList= {
                0 :{"link":"/","name":"Homepage"}
            }

            this.view.setMenuList(menuList);
            let classClient = this.client.getClassClient();
            let userClient = this.client.getUserClient();
            if(classClient && userClient) {
                console.log("username: "+session.username);
                let id = await userClient.search(session.username);
                if(id !== "false") {
                    let map = await classClient.getClassesByTeacher(id);//returns map<idClasse, className>
                    this.view.setClassesList(map);
                }
            }
            else{
                this.view.setClassesList(new Map());
            }
            response.send(this.view.getPage());
        });
    }
}
export {ClassPresenter};