import {Data} from "./Data";

class Class implements Data {

    private teacherID : string;
    private students : string[];

    constructor(teacherID : string, students : string[]){
        this.teacherID = teacherID;
        this.students = students;
    }

    public getTeacherID() : string {
        return this.teacherID;
    }

    public getStudents() : string[] {
        return this.students;
    }

    public toJSON() : any{
        return 1;
    }
}
export {Class};