import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";
import {UserKind} from "../view/PageView";
import * as fileSystem from "fs";

var session = require('express-session');

/**
 *   Class to manage the classes of students
 *   @extends PagePresenter
 */
class ListPresenter extends PagePresenter {

    private listType : any;

    constructor(view: any) {
        super(view);
        this.client = (new Client.builder()).buildClassClient().buildUserClient().buildExerciseClient().build();
    }

    /**
     * This method provides to manage the view urls.
     * @param app
     */
    update(app: any) {
        this.classes(app);
        this.exercises(app);
        this.insertClass(app);
        this.deleteClass(app);
    }

    /**
     *  This method manages the classes page url
     * @param app
     */
    private classes(app : any){
        app.get('/classes', async (request: any, response: any) => {
            let userClient = this.client.getUserClient();
            if (userClient && session.username && session.username !== "developer"){
                if (await userClient.isTeacher(session.username)){
                    this.view.setUserKind(UserKind.teacher);
                } else {
                    this.view.setUserKind(UserKind.student);
                }
            }

            this.listType = "classes";
            this.view.setTitle("Le tue classi");
            response.send(await this.view.getPage());
        });
    }

    /**
     *  This method manages exercises page url
     * @param app
     */
    private exercises(app : any){
        app.get('/exercises', async (request: any, response: any) => {
            let userClient = this.client.getUserClient();
            if (userClient && session.username && session.username !== "developer"){
                if (await userClient.isTeacher(session.username)){
                    this.view.setUserKind(UserKind.teacher);
                } else {
                    this.view.setUserKind(UserKind.student);
                }
            }
            this.listType = "exercises";
            this.view.setTitle("I tuoi esercizi");
            response.send(await this.view.getPage());
        });
    }

    /**
     * This method inserts a new class
     * @param app
     */
    private insertClass(app: any) {
        app.post('/insertclass', async (request: any, response: any) => {
            let classClient = this.client.getClassClient();
            let userClient = this.client.getUserClient();
            if(classClient && userClient) {
                let id = await userClient.search(session.username);
                if(id !== "false") {
                    classClient.addClass(request.body.classname, request.body.description, id);
                }
            }
            response.redirect('/classes');
        });
    }

    /**
     * This method deletes a class
     * @param app
     */
    private deleteClass(app: any) {
        app.post('/deleteclass', async (request: any, response: any) => {
            let classClient = this.client.getClassClient();
            if(classClient) {

                await classClient.deleteClass(request.body.key);
                //ritorna boolean per gestione errore
            }

            response.redirect('/classes');
        });
    }

    /**
     * This method provides to return an array of classes
     * @returns Promise<any[]>
     */
    public async getClasses() : Promise<any[]>{
        let classClient = this.client.getClassClient();
        let userClient = this.client.getUserClient();
        if(classClient && userClient) {
            let id = await userClient.search(session.username);
            if (id !== "false") {
                if (await userClient.isTeacher(session.username)) {
                    return await classClient.findTeacherClasses(id);
                } else {//is a student
                    return await classClient.findStudentClasses(id);
                }
            }
        }
        return [];
    }

    /**
     * This method provides to return an array of exercises
     * @returns Promise<any[]>
     */
    public async getExercises() : Promise<any[]>{
        let exerciseClient = this.client.getExerciseClient();
        let userClient = this.client.getUserClient();
        if(exerciseClient && userClient) {
            let id = await userClient.search(session.username);
            if (id !== "false") {
                if (await userClient.isTeacher(session.username)) {
                    let arr = await exerciseClient.findExercises(id);//returns map<idClasse, className>
                    return this.translateExercises(arr);
                }
            }
        }
        return [];

    }

    public getListType() : any{
        return this.listType;
    }

    /**
     * This method receives an array of JSON representing exercises,
     * removes from it solutions created by solvers that are not the exercise's author,
     * it adds a field words containing the exercise's sentence split word by word for each exercise in the array
     * @param exercises
     */
    private translateExercises(exercises : any []) : any []{
        let toReturn : any [] = [];
        let exerciseClient = this.client.getExerciseClient();
        if(exerciseClient) {
            for (let i in exercises) {
                exercises[i].words = exerciseClient.getSplitSentence(exercises[i].sentence);
                for(let y in exercises[i].solutions){
                    if (exercises[i].solutions[y].solverId !== exercises[i].authorId) {
                        delete exercises[i].solutions[y];
                    }
                    else{
                        let itaTags = [];
                        for(let z in exercises[i].solutions[y].solutionTags){
                            itaTags.push(this.translateTag(exercises[i].solutions[y].solutionTags[z]));
                        }
                        exercises[i].solutions[y].itaTags=itaTags;
                    }
                }
                toReturn.push(exercises[i]);
            }
        }
        return toReturn;
    }
    /**
     * Converts a single tag to an italian string representing it
     * @param tag - a string containg the tag to convert
     * @returns {string} a string containing the italian translation of the tag
     */
    public translateTag(tag : string) : string {
        const content = fileSystem.readFileSync("./src/ts/presenter/vocabolario.json");
        const jsonContent = JSON.parse(content.toString());

        var lowercase=tag.split(/[A-Z]{1,2}/);
        var uppercase=tag.split(/[a-z0-9]+/);
        var result="";

        if(uppercase[0]!=='V' && uppercase[0]!=='PE' && uppercase[0]!=='PC' && uppercase[0]!=='VA' && uppercase[0]!='VM'){
            for(var i in jsonContent){
                if(i===uppercase[0]){
                    result+=jsonContent[i];
                }
                if(lowercase[1]){
                    if(i===lowercase[1]){
                        result+=" ";
                        result+=jsonContent[i];
                    }
                }
            }
            return result;

        }
        for(var x in jsonContent){
            if(x===tag){
                result+=jsonContent[x];
            }
        }
        return result;
    }
    /**
     * This method provides to return number of students belong to a class
     * @param classId the Id of the chosen class
     */
    public async getStudentNumber(classId: string) : Promise<number>{
        let classClient = this.client.getClassClient();
        let userClient = this.client.getUserClient();
        if(classClient && userClient) {
            let studentsId = await classClient.getStudents(classId);
            if (studentsId[0]==="n") {//it there are students in the class
                return 0;
            }
            return studentsId.length;
        }
        return -1;
    }
}
export {ListPresenter}

