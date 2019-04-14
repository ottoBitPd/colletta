import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";

//var session = require('express-session');

class ClassPresenter extends PagePresenter {

    constructor(view: any) {
        super(view);
        this.client = (new Client.builder()).buildClassClient().buildUserClient().buildExerciseClient().build();
    }

    update(app: any) {
        this.class(app);
        this.deleteStudent(app);
        this.deleteExercise(app);
    }
    private class(app : any){
        app.get('/class', async (request: any, response: any) => {
            let menuList :any;
            menuList= {
                0 :{"link":"/","name":"Homepage"}
            }
            this.view.setTitle("Classe");
            this.view.setMenuList(menuList);
            console.log("Id della classe: "+request.query.classId);
            this.view.setClass(await this.getClassData(request.query.classId));
            let students = await this.getStudents(request.query.classId);
            console.log("Studenti: ",students);
            this.view.setStudentsList(students);
            let exercises = await this.getExercises(request.query.classId);
            console.log("Exercises: ",exercises);
            this.view.setExercisesList(exercises);
            response.send(this.view.getPage());
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
            if (studentsId.length > 0 && studentsId[0]!=="n") {//it there are students in the class
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
        let exerciseClient = this.client.getExerciseClient();
        if(classClient && exerciseClient) {
            let exercisesId = await classClient.getExercises(classId);
            if (exercisesId.length > 0 && exercisesId[0]!=="n") {//it there are students in the class
                let exercises = new Array();//array di json student
                for (let i in exercisesId) {
                    let exercise = await exerciseClient.getExerciseData(exercisesId[i]);
                    exercises.push(exercise);
                }
                return exercises;
            }
        }
    }
    private async getClassData(classId : string) : Promise<any>{
        let classClient = this.client.getClassClient();
        if(classClient) {
            let _class = await classClient.getClassData(classId);
            return _class;
        }
    }
    private deleteStudent(app: any) {
        app.post('/deletestudent', async (request: any, response: any) => {
            let classClient = this.client.getClassClient();
            if(classClient) {
                await classClient.deleteStudent(request.body.classId, request.body.studentId);
                //ritorna boolean per gestione errore
            }
            response.redirect('/class?classId='+request.body.classId);
            //response.redirect(307, '/class');
        });
    }
    private deleteExercise(app: any) {
        app.post('/deleteexercise', async (request: any, response: any) => {
            let classClient = this.client.getClassClient();
            if(classClient) {
                await classClient.deleteExercise(request.body.classId, request.body.exerciseId);
                //ritorna boolean per gestione errore
            }
            response.redirect('/class?classId='+request.body.classId);
            //response.redirect(307, '/class');
        });
    }
}
export {ClassPresenter};