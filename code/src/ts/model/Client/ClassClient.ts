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
    public async deleteClass(classId:string): Promise<boolean>{
        return await this.dbClassManager.remove(classId);
    }
    public async deleteStudent(classId:string, studentId:string){
        var _class: Data = await this.dbClassManager.read(classId);
        var students:string []  = (<Class>_class).getStudents();
        var indexToRemove:number = students.indexOf(studentId);
        students.splice(indexToRemove,1);
        await this.dbClassManager.update("data/classes/"+ classId + "/students", students);
    }
    public async addStudent(studentID:string,classId:string){
        var _class:Data=await this.dbClassManager.read(classId);
        var students:string []= (<Class>_class).getStudents();
        students.push(studentID);
        await this.dbClassManager.update("data/classes/"+ classId + "/students", students);
    }
    public async addClass(name:string, description:string, teacherId:string):Promise<boolean>{
        var _class = new Class(name, description,teacherId,[],[]);
        return await this.dbClassManager.insert(_class);
    }
    public async addExercize(exerciseId:string, classId:string){
        var _class : Data = await this.dbClassManager.read(classId);
        var exercises:string [] = (<Class>_class).getStudents();
        exercises.push(exerciseId);
        await this.dbClassManager.update("data/classes/"+ classId + "/exercises", exercises);
    }

    public async getStudents(classId:string): Promise<string[]>{
        var _class : Data = await this.dbClassManager.read(classId);
        return (<Class>_class).getStudents();
    }
    public async getExercises(classId:string):Promise<string[]>{
        var _class : Data = await this.dbClassManager.read(classId);
        return (<Class>_class).getStudents();

    }
    /**
    This method returns a amp of entries string, string where the first string is the Id of the class and the second
     is the name of th class
     @param teacherId - the id of the teacher
     @returns Map<string,string>
     */
    public async getClassesByTeacher(teacherId : string) : Promise<Map<string,string>> {
        var elements = await this.dbClassManager.elements();
        var mapToReturn = new Map<string, string>();
        //N.B. forEach(async (...)) doesn't work
        for (let entry of Array.from(elements.entries())) {
            let key = entry[0];
            let value = entry[1];
            if(value===teacherId){
                let _class : Data = await this.dbClassManager.read(key);
                mapToReturn.set(key,(<Class>_class).getName());
            }
        }
        //console.log("mapToReturn: ",mapToReturn);
        return mapToReturn;
    }

}
export{ClassClient}
