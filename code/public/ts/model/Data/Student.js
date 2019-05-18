"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
/*
*   Class to create and manage "Student" objects
*   @extends User
*/
class Student extends User_1.User {
    /*
    *   Initializes all attributes needed to Student object.
    */
    constructor(id, username, password, name, lastname, city, school, email) {
        super(id, username, password, name, lastname, city, school, email);
    }
    /*
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
    /*
    * This method returns the valutations map of a student.
    * @param exercises - the list of all the exercises available
    * @returns { Map<number, number> } returns the valutations map.
    */
    getAverage(exercises) {
        let averageMap = new Map();
        let solutions = [];
        exercises.forEach((currentValue, index) => {
            solutions = solutions.concat(currentValue.getSolutions().filter((sol) => sol.getSolverId() === this.getID()));
        });
        let sumTotal = 0;
        var i = 0;
        solutions.forEach((currentValue, index) => {
            let sumSingleSolution = 0;
            currentValue.getValutations().forEach((value, key) => {
                sumSingleSolution += value;
                i++;
            });
            sumTotal += sumSingleSolution;
            let media = sumTotal / i;
            averageMap.set(currentValue.getTime(), media);
        });
        return averageMap;
    }
}
exports.Student = Student;
//# sourceMappingURL=Student.js.map