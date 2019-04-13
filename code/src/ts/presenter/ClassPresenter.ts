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

            let students = await this.getStudents(request.body.key);
            console.log("Studenti: ",students);
            this.view.setStudentsList(students);
            //TODO fare lo stesso per gli esercizi della classe e vedere se funziona
            let exercises = await this.getExercises(request.body.key);
            console.log("Exercises: ",exercises);
            this.view.setStudentsList(exercises);
            //response.send(this.view.getPage());
        });
    }

    /**
     * This method returns an array of json that represents the students of the class
     * identified by the id passed as paramater of the method
     * @param classId
     */
    private async getStudents(classId : string) : Promise<any>{
        let classClient = this.client.getClassClient();
        let userClient = this.client.getUserClient();
        if(classClient && userClient) {
            let studentsId = await classClient.getStudents(classId);
            if (studentsId.length > 0) {//it there are students in the class
                let students = new Array();//array di json student
                for (let i in studentsId) {
                    let student = await userClient.getUserData(studentsId[i]);
                    students.push(student);
                }
                return students;
            }
        }
    }
    /**
     * This method returns an array of json that represents the exercises of the class
     * identified by the id passed as paramater of the method
     * @param classId
     */
    //@ts-ignore
    private async getExercises(classId : string) : Promise<any>{
        let classClient = this.client.getClassClient();
        let userClient = this.client.getUserClient();
        if(classClient && userClient) {
            let exercisesId = await classClient.getExercises(classId);
            //TODO && exercisesId[0]!=="n" forse controllo daportare in ClassClient??
            if (exercisesId.length > 0 && exercisesId[0]!=="n") {//it there are students in the class
                let exercises = new Array();//array di json student
                for (let i in exercisesId) {
                    let exercise = await userClient.getUserData(exercisesId[i]);
                    exercises.push(exercise);
                }
                return exercises;
            }
        }
    }
}
export {ClassPresenter};