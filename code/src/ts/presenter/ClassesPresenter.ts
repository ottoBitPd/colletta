import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";
import {UserKind} from "../view/PageView";
import * as fileSystem from "fs";

var session = require('express-session');

class ClassesPresenter extends PagePresenter {

    private listType : any;
    constructor(view: any) {
        super(view);
        this.client = (new Client.builder()).buildClassClient().buildUserClient().buildExerciseClient().build();
    }

    update(app: any) {
        this.classes(app);
        this.exercises(app);
        this.insertClass(app);
        this.deleteClass(app);
    }
    private classes(app : any){
        app.get('/classes', async (request: any, response: any) => {
            let userClient = this.client.getUserClient();
            if (userClient && session.username && session.username !== "developer"){
                if (await userClient.isTeacher(session.username)){
                    //console.log("teacher");
                    this.view.setUserKind(UserKind.teacher);
                } else {
                    //console.log("student");
                    this.view.setUserKind(UserKind.student);
                }
            }
            this.listType = "classes";
            this.view.setTitle("Le tue classi");
            response.send(await this.view.getPage());
        });
    }
    private exercises(app : any){
        app.get('/exercises', async (request: any, response: any) => {
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
            this.listType = "exercises";
            this.view.setTitle("I tuoi esercizi");
            response.send(await this.view.getPage());
        });
    }
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
     *
     */
    public async getClasses() : Promise<any[]>{
        let classClient = this.client.getClassClient();
        let userClient = this.client.getUserClient();
        if(classClient && userClient) {
            let id = await userClient.search(session.username);
            if (id !== "false") {
                if (await userClient.isTeacher(session.username)) {
                    //console.log("username: "+session.username);
                    let arr = await classClient.getClassesByTeacher(id);//returns map<idClasse, className>
                    //console.log("arr: ",arr);
                    return arr;
                } else {//is a student
                    let arr = await classClient.getClassesByStudent(id);//returns map<idClasse, className>
                    //console.log("arr: ",arr);
                    return arr;
                }
            }
        }
        return [];
    }

    /**
     *
     */
    public async getExercises() : Promise<any[]>{
        let exerciseClient = this.client.getExerciseClient();
        let userClient = this.client.getUserClient();
        if(exerciseClient && userClient) {
            let id = await userClient.search(session.username);
            if (id !== "false") {
                if (await userClient.isTeacher(session.username)) {
                    //console.log("username: "+session.username);
                    let arr = await exerciseClient.getExercisesByAuthor(id);//returns map<idClasse, className>
                    console.log("arrBEFORE: ", arr);
                    arr=this.translateExercises(arr);
                    console.log("arrAFTER: ", arr);
                    return arr;
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
                        let itaTags = []
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
    public translateTag(tag : string){
        console.log("arriva: "+tag);
        const content = fileSystem.readFileSync("./src/ts/presenter/vocabolario.json");
        const jsonContent = JSON.parse(content.toString());

        var lowercase=tag.split(/[A-Z]{1,2}/);
        var uppercase=tag.split(/[a-z0-9]+/);
        var result="";
        //console.log("uppercase[0]: "+uppercase[0]);
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
}
export {ClassesPresenter}

