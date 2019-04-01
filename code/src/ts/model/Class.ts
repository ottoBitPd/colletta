import {Data} from "./Data";

class Class implements Data {

    private name : string;
    private description : string;
    private teacherID : string;
    private students : string[];
    private exercises : string[];

    constructor(name : string, description : string, teacherID : string, students : string[], exercises : string[]){
        this.name = name;
        this.description = description;
        this.teacherID = teacherID;
        this.students = students;
        this.exercises = exercises;
    }

    public getName() : string {
        return this.name;
    }

    public getDescription() : string {
        return this.description;
    }

    public getTeacherID() : string {
        return this.teacherID;
    }

    public getStudents() : string[] {
        return this.students;
    }

    public getExercises() : string[] {
        return this.exercises;
    }

    public getNumberOfStudents() : number {
        return this.students.length;
    }

    public deleteStudent(student : string) : void {
        this.students = this.students.filter(s => s !== student);
    }

    public deleteExercise(exerKey : string) : void {
        this.exercises = this.exercises.filter(e => e !== exerKey);
    }

    public addStudent(student : string) : void {
        this.students.push(student);
    }

    public addExercise(exercise : string) : void {
        this.exercises.push(exercise);
    }

    public findStudent(student : string) : boolean {
        for(let i = 0; i<this.students.length; i++){
            if(this.students[i] === student)
                return true;
        }

        return false;
    }

    public toJSON() : any{
        return 1;
    }
}
export {Class};