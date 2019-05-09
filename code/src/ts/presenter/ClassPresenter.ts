import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";
import {UserKind} from "../view/PageView";

var session = require('express-session');
/**
 *   Class to manage a single class
 *   @extends PagePresenter
 */
class ClassPresenter extends PagePresenter {
    private classId : string = "";

    constructor(view: any) {
        super(view);
        this.client = (new Client.builder()).buildClassClient().buildUserClient().buildExerciseClient().build();
    }
    /**
     * This method provides to manage the view urls.
     * @param app
     */
    update(app: any) {
        this.class(app);
        this.deleteStudent(app);
        this.deleteExercise(app);
        this.addStudent(app);
        this.addExercise(app);
    }

    /**
     * This method provides to assign an id
     * @param value
     */
    private setClassId( value : string){
        this.classId = value;
    }

    /**
     * This method provides to return the id
     * @return {string}
     */
    public getClassId() : string{
        return this.classId;
    }

    /**
     *  This method provides to manage a class
     * @param app
     */

    private class(app : any){
        app.get('/class', async (request: any, response: any) => {

            this.setClassId(request.query.classId);

            this.view.setTitle("Classe");

            let userClient= this.client.getUserClient();
            if(userClient){

                if(await userClient.isTeacher(session.username))
                    this.view.setUserKind(UserKind.teacher);
                else

                    this.view.setUserKind(UserKind.student);
            }

            response.send(await this.view.getPage());
        });
    }

    /**
     * This method returns an array of json that represents the students of the class
     * identified by the id passed as parameter of the method
     */
    public async getStudents() : Promise<any>{
        let classClient = this.client.getClassClient();
        let userClient = this.client.getUserClient();
        if(classClient && userClient) {
            let studentsId = await classClient.getStudents(this.classId);

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
     * identified by the id passed as parameter of the method
     */
    public async getExercises() : Promise<any>{
        let classClient = this.client.getClassClient();
        let exerciseClient = this.client.getExerciseClient();
        if(classClient && exerciseClient) {
            let exercisesId = await classClient.getExercises(this.classId);
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

    /**
     *  This method provides to return a class
     */
    public async getClass() : Promise<any>{
        let classClient = this.client.getClassClient();
        if(classClient) {
            return await classClient.getClassData(this.classId);
        }
    }

    /**
     * This method provides to delete a student from a class
     * @param app
     */
    private deleteStudent(app: any) {
        app.post('/deletestudent', async (request: any, response: any) => {
            let classClient = this.client.getClassClient();
            if(classClient) {
                await classClient.deleteStudent(request.body.classId, request.body.studentId);
            }
            response.redirect('/class?classId='+request.body.classId);
        });
    }

    /**
     * This method provides to delete an exercise from a class
     * @param app
     */
    private deleteExercise(app: any) {
        app.post('/deleteexercise', async (request: any, response: any) => {
            let classClient = this.client.getClassClient();
            if(classClient) {
                await classClient.deleteExercise(request.body.classId, request.body.exerciseId);
            }
            response.redirect('/class?classId='+request.body.classId);
        });
    }

    /**
     * This method provides to return number of students belong to a class
     */
    public async getStudentNumber() : Promise<number> {
        let classClient = this.client.getClassClient();
        let userClient = this.client.getUserClient();
        if(classClient && userClient) {
            let studentsId = await classClient.getStudents(this.classId);
            if (studentsId[0]==="n") {//it there are students in the class
                return 0;
            }
            return studentsId.length;
        }
        return -1;
    }
    /**
     * This method provides to return number of classes belong to a teacher
     */
    public async getClasses() : Promise<any[]> {
        let classClient = this.client.getClassClient();
        let userClient = this.client.getUserClient();
        if(classClient && userClient) {
            //console.log("username: "+session.username);
            let id = await userClient.search(session.username);
            if(id !== "false") {
                let map = await classClient.getClassesByTeacher(id);//returns map<idClasse, className>
                return map;
            }
        }
        return [];
    }
    /**
     * This method provides to add a student to a class
     */
    private addStudent(app: any) {
        app.post('/addstudent', async (request: any, response: any) => {

            let classClient = this.client.getClassClient();
            let userClient = this.client.getUserClient();

            if(classClient && userClient) {
                await classClient.addStudent(request.body.studentId,this.classId);
            }
            response.redirect('/class?classId='+this.classId);
        });
    }

    /**
     * This method provides to add exercise to a class
     */
    private addExercise(app: any) {
        app.post('/addexercise', async (request: any, response: any) => {
            let classClient = this.client.getClassClient();
            if(classClient) {
                await classClient.addExercise(request.body.exerciseId,this.classId);
                //ritorna boolean per gestione errore
            }
            response.redirect('/class?classId='+this.classId);
        });
    }
}
export {ClassPresenter};