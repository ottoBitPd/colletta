import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";

//var session = require('express-session');

class ClassPresenter extends PagePresenter {

    constructor(view: any) {
        super(view);
        this.client = (new Client.builder()).buildClassClient().buildUserClient().build();
    }

    update(app: any) {
        this.class(app);

    }
    private class(app : any){
        app.post('/class', async (request: any, response: any) => {
            let menuList :any;
            menuList= {
                0 :{"link":"/","name":"Homepage"}
            }
            this.view.setTitle("Classe");
            this.view.setMenuList(menuList);
            let classClient = this.client.getClassClient();
            let userClient = this.client.getUserClient();
            if(classClient && userClient) {
                let studentsId = await classClient.getStudents(request.post.key);//returns map<idClasse, className>
                if(studentsId.length>0) {//it there are students in the class
                    let students = new Array();//array di json student
                    for (let i in studentsId) {
                        let student = userClient.getUserData(studentsId[i]);
                        students.push(student);
                    }
                    console.log("Studenti: "+students);
                    this.view.setStudentsList(students);
                }
                //TODO fare lo stesso per gli esercizi della classe e vedere se funziona
            }
            else{
                this.view.setClassesList(new Map());
            }
            //response.send(this.view.getPage());
        });
    }
}
export {ClassPresenter};