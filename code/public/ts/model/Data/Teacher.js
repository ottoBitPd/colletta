"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
/*
*   Class to create and manage "Teacher" objects
*   @extends User
*/
class Teacher extends User_1.User {
    /*
    *   Initializes all attributes needed to Teacher object.
    */
    constructor(id, username, password, name, lastname, city, school, inps, email) {
        super(id, username, password, name, lastname, city, school, email);
        this.INPS = inps;
    }
    /*
    * This method returns the iist of classes created by a specific teacher.
    * @param classList - the list of all the available classes
    * @returns { Class[]} returns the list of classes.
    */
    getClasses(classList) {
        let lista = [];
        classList.forEach((_class) => {
            if (_class.getTeacherID() === this.getID())
                lista.push(_class);
        });
        return lista;
    }
    /*
    * This method returns the teacher INPS code.
    * @returns { string } returns the INPS code.
    */
    getINPS() {
        return this.INPS;
    }
    /*
    * This method returns checks if a user is a teacher.
    * @returns { boolean } returns "true" if the user is a teacher.
    */
    isTeacher() {
        return true;
    }
}
exports.Teacher = Teacher;
//# sourceMappingURL=Teacher.js.map