"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
class Student extends User_1.User {
    constructor(id, username, password, name, lastname, city, school) {
        super(id, username, password, name, lastname, city, school);
    }
    getClasses(classList) {
        let lista = [];
        classList.forEach((_class) => {
            if (_class.getStudents().indexOf(this.getID()) !== -1) {
                lista.push(_class);
            }
        });
        return lista;
    }
    getAverage(exercises) {
        let averageMap = new Map();
        let solutions = [];
        for (let i = 0; i < exercises.length; i++)
            solutions.concat((exercises[i].getSolutions()).filter((sol) => sol.getSolverId() === this.getID()));
        solutions = solutions.sort((sol1, sol2) => sol1.getTime() - sol2.getTime());
        let totalValutation = 0;
        let counter = 0;
        for (let i = 0; i < solutions.length; i++) {
            let valutations = solutions[i].getValutations();
            if (valutations) {
                valutations.forEach((value, key) => {
                    totalValutation += value;
                });
                counter += valutations.size;
            }
            averageMap.set(solutions[i].getTime(), totalValutation / counter);
        }
        return averageMap;
    }
}
exports.Student = Student;
//# sourceMappingURL=Student.js.map