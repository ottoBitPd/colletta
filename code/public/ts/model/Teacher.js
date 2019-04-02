"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
class Teacher extends User_1.User {
    constructor(username, password, name, lastname, city, school, inps) {
        super(username, password, name, lastname, city, school);
        this.INPS = inps;
    }
    getClasses(classList) {
        let lista = [];
        classList.forEach((_class) => {
            if (_class.getTeacherID() == this.getID())
                lista.push(_class);
        });
        return lista;
    }
    getINPS() {
        return this.INPS;
    }
    isTeacher() {
        return true;
    }
}
exports.Teacher = Teacher;
//# sourceMappingURL=Teacher.js.map