"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Class {
    constructor(teacherID, students) {
        this.teacherID = teacherID;
        this.students = students;
    }
    getTeacherID() {
        return this.teacherID;
    }
    getStudents() {
        return this.students;
    }
    toJSON() {
        return 1;
    }
}
exports.Class = Class;
//# sourceMappingURL=Class.js.map