"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
/**
 *   Class to create and manage "Student" objects
 *   @extends User
 */
class Student extends User_1.User {
    /**
     *   Initializes all attributes needed to Student object.
     */
    constructor(id, username, password, name, lastname, city, school, email, classId) {
        super(id, username, password, name, lastname, city, school, email);
    }
    /**
     * This method returns the iist of classes in which the student is signed up.
     * @param classList - the list of all the available classes
     * @returns { Class[]} returns the list of classes.
     */
    getClasses(classList) {
        let list = [];
        classList.forEach((_class) => {
            if (_class.getStudents().indexOf(this.getID()) !== -1) {
                list.push(_class);
            }
        });
        return list;
    }
    /**
     * This method checks if a user is a student.
     * @returns { boolean } returns "true" if the user is a student.
     */
    isStudent() {
        return true;
    }
}
exports.Student = Student;
//# sourceMappingURL=Student.js.map