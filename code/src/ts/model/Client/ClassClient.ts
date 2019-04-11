import {DatabaseClassManager} from "../DatabaseManager/DatabaseClassManager";
import {Class} from "../Data/Class";
import {Data} from "../Data/Data";

class ClassClient{
    private dbClassManager : DatabaseClassManager;
    constructor(){
        this.dbClassManager= new DatabaseClassManager();
    }

    public getDbClassManager(): DatabaseClassManager {
        return this.dbClassManager;
    }
    public async deleteClass(classID:string): Promise<boolean>{
        return await this.dbClassManager.remove(classID);
    }
    public async deleteStudent(classID:string, studentID:string){
        var _class: Data = await this.dbClassManager.read(classID);
        var students:string []  = (<Class>_class).getStudents();
        var indexToRemove:number = students.indexOf(studentID);
        students.splice(indexToRemove,1);
        await this.dbClassManager.update("data/classes/"+ classID + "/students", students);
    }
    public async addStudent(studentID:string,classID:string){
        var _class:Data=await this.dbClassManager.read(classID);
        var students:string []= (<Class>_class).getStudents();
        students.push(studentID);
        await this.dbClassManager.update("data/classes/"+ classID + "/students", students);
    }
    public async addClass(name:string, description:string, teacherID:string):Promise<boolean>{
        var _class = new Class(name, description,teacherID,[],[]);
        return await this.dbClassManager.insert(_class);
    }
    public async addExercize(exerciseID:string, classID:string){
        var _class : Data = await this.dbClassManager.read(classID);
        var exercises:string [] = (<Class>_class).getStudents();
        exercises.push(exerciseID);
        await this.dbClassManager.update("data/classes/"+ classID + "/exercises", exercises);
    }

    public async getStudents(classID:string): Promise<string[]>{
        var _class : Data = await this.dbClassManager.read(classID);
        return (<Class>_class).getStudents();
    }
    public async getExercises(classID:string):Promise<string[]>{
        var _class : Data = await this.dbClassManager.read(classID);
        return (<Class>_class).getStudents();

    }
}
export{ClassClient}
