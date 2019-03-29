import {Data} from "./Data";

class Class implements Data {

    private teacherID : string;
    private students : string[];

    constructor(tID : string, stus : string[]){
        this.teacherID = tID;
        this.students = stus;
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