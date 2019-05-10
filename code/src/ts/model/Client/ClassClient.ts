import {DatabaseClassManager} from "../DatabaseManager/DatabaseClassManager";
import {Class} from "../Data/Class";
import {Data} from "../Data/Data";

/**
 * Class to use the class functionality exposed into the model
 */
class ClassClient{
    private dbClassManager : DatabaseClassManager;
    constructor(){
        this.dbClassManager= new DatabaseClassManager();
    }

    /**
     * This method returns an instance of DatabaseClassManager
     * @returns {DatabaseClassManager} the instance of the database
     */
    public getDbClassManager(): DatabaseClassManager {
        return this.dbClassManager;
    }

    /**
     * This method removes a class from the database
     * @param classId - the id of the class to remove
     * @return {boolean} returns "true" if the operation is successful
     */
    public async deleteClass(classId:string): Promise<boolean>{
        return await this.dbClassManager.remove(classId);
    }

    /**
     * This method removes a student of a class from the database
     * @param classId - the id of the class in which remove the student
     * @param studentId - the id of the student to remove
     */
    public async deleteStudent(classId:string, studentId:string){
        var _class: Data = await this.dbClassManager.read(classId);
        var students:string []  = (<Class>_class).getStudents();
        if(students[0]!=="n") {//if there are students to remove
            if(students.length===1){//if it is the last exercise
                students = ["n"];
            }
            else {
                var indexToRemove: number = students.indexOf(studentId);
                students.splice(indexToRemove, 1);
            }
            await this.dbClassManager.update("data/classes/" + classId + "/students", students);
        }
    }

    /**
     * This method removes an exercise of a class from the database
     * @param classId - the id of the class in which remove the exercise
     * @param exerciseId - the id of the exercise to remove
     */
    public async deleteExercise(classId:string, exerciseId:string) : Promise<void>{
        var _class: Data = await this.dbClassManager.read(classId);
        var exercises:string []  = (<Class>_class).getExercises();
        if(exercises[0]!=="n") {//if there are exercises to remove
            if(exercises.length===1){//if it is the last exercise
                exercises = ["n"];
            }
            else {
                var indexToRemove: number = exercises.indexOf(exerciseId);
                exercises.splice(indexToRemove, 1);
            }
            await this.dbClassManager.update("data/classes/" + classId + "/exercises", exercises);
        }
    }

    /**
     * This method adds a student of a class into the database
     * @param studentId - the id of the student to add
     * @param classId - the id of the class in which add the student
     */
    public async addStudent(studentId:string,classId:string){
        var _class:Data=await this.dbClassManager.read(classId);
        var students : string []= (<Class>_class).getStudents();
        if(students[0]!=="n") {//if the class already has some students
            students.push(studentId);
        }
        else {//if there are no students
            students[0]=studentId;
        }
        await this.dbClassManager.update("data/classes/" + classId + "/students", students);
    }

    /**
     * This method adds a class to the database
     * @param name - the name of the class to add
     * @param description - the description of the class to add
     * @param teacherId - the id of the teacher who creates the class
     * @return {boolean} returns "true" if the operation is successful
     */
    public async addClass(name:string, description:string, teacherId:string):Promise<boolean>{
        var _class = new Class("0",name, description,teacherId,["n"],["n"]);
        return await this.dbClassManager.insert(_class);
    }

    /**
     * This method adds an exercise of a class into the database
     * @param exerciseId - the id of the exercise to add
     * @param classId - the id of the class in which add the exercise
     */
    public async addExercise(exerciseId:string, classId:string){
        var _class : Data = await this.dbClassManager.read(classId);
        var exercises:string [] = (<Class>_class).getExercises();
        if(exercises[0]!=="n") {//if the class already has some exercises
            exercises.push(exerciseId);
        }
        else {//if there are no exercises
            exercises[0]=exerciseId;
        }
        await this.dbClassManager.update("data/classes/"+ classId + "/exercises", exercises);
    }

    /**
     * This method returns the student list of a class.
     * @param classId - the class which you want to know the student list
     * @returns { string[] } returns a list of students.
     */
    public async getStudents(classId:string): Promise<string[]>{
        var _class : Data = await this.dbClassManager.read(classId);
        return (<Class>_class).getStudents();
    }

    /**
     * This method returns the exercise list of a class.
     * @param classId - the class which you want to know the exercise list
     * @returns { string[] } returns a list of exercise.
     */
    public async getExercises(classId:string):Promise<string[]>{
        var _class : Data = await this.dbClassManager.read(classId);
        return (<Class>_class).getExercises();
    }

    /**
     * This method returns a list of class of which the selected teacher is the creator
     * @param teacherId - the id of the teacher which we want to know the classes
     * @returns {any} the list of classes
     */
    public async findTeacherClasses(teacherId : string) : Promise<any[]> {
        var elements = await this.dbClassManager.elements();
        let ret = [];
        for (let entry of Array.from(elements.entries())) {
            let key = entry[0];
            let value = entry[1];
            if(value===teacherId){
                let _class : Data = await this.dbClassManager.read(key);
                ret.push((<Class>_class).toJSON());
            }
        }
        return ret;
    }

    /**
     * This method returns a list of class in which the selected student is signed up
     * @param studentId - the id of the student which we want to know the classes
     * @returns {any} the list of classes
     */
    public async findStudentClasses(studentId:string) : Promise<any[]>{
        var elements = await this.dbClassManager.elements();
        let ret = [];
        for (let entry of Array.from(elements.entries())) {
            let key = entry[0];
            let _class = await this.dbClassManager.read(key);
            let students = (<Class> _class).getStudents();
            for(let i in students){
                if(students[i]===studentId){
                    ret.push((<Class>_class).toJSON());
                }
            }
        }
        return ret;
    }

    /**
     * This method returns the informations of a class
     * @param id - the id of the class
     * @return {any} a JSON file containing the class informations
     */
    public async getClassData(id:string) : Promise<any> {
        const _class : Data = await this.dbClassManager.read(id);
        return (<Class> _class).toJSON();
    }
}
export{ClassClient}
