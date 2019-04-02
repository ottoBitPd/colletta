import {DatabaseClassManager} from "./DatabaseClassManager";
import {Class} from "./Class";

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
    public async deleteStudent(classID:string, studentID:string):void{
        var _class:Class=await this.dbClassManager.read(classID);
        var students:string []= _class.getStudents();
        var indexToRemove:number = students.indexOf(studentID);
        students.splice(indexToRemove,1);
        await this.dbClassManager.update("data/classes/"+ classID + "/students", students);
    }
    public addStudent(studentID:string,classID:string ):void{

    }
    public addClass(teacherID:string):void{}
    //public addExercize():void{}
    //get students(idclass)
    //get exercises(idclass)
    //
}
