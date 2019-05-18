"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseClassManager_1 = require("../DatabaseManager/DatabaseClassManager");
const Class_1 = require("../Data/Class");
/**
 * Class to use the class functionality exposed into the model
 */
class ClassClient {
    constructor() {
        this.dbClassManager = new DatabaseClassManager_1.DatabaseClassManager();
    }
    /**
     * This method returns an instance of DatabaseClassManager
     * @returns {DatabaseClassManager} the instance of the database
     */
    getDbClassManager() {
        return this.dbClassManager;
    }
    /**
     * This method removes a class from the database
     * @param classId - the id of the class to remove
     * @return {boolean} returns "true" if the operation is successful
     */
    deleteClass(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbClassManager.remove(classId);
        });
    }
    /**
     * This method removes a student of a class from the database
     * @param classId - the id of the class in which remove the student
     * @param studentId - the id of the student to remove
     */
    deleteStudent(classId, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classId);
            var students = _class.getStudents();
            if (students[0] !== "n") { //if there are students to remove
                if (students.length === 1) { //if it is the last exercise
                    students = ["n"];
                }
                else {
                    var indexToRemove = students.indexOf(studentId);
                    students.splice(indexToRemove, 1);
                }
                yield this.dbClassManager.update("data/classes/" + classId + "/students", students);
            }
        });
    }
    /**
     * This method removes an exercise of a class from the database
     * @param classId - the id of the class in which remove the exercise
     * @param exerciseId - the id of the exercise to remove
     */
    deleteExercise(classId, exerciseId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classId);
            var exercises = _class.getExercises();
            if (exercises[0] !== "n") { //if there are exercises to remove
                if (exercises.length === 1) { //if it is the last exercise
                    exercises = ["n"];
                }
                else {
                    var indexToRemove = exercises.indexOf(exerciseId);
                    exercises.splice(indexToRemove, 1);
                }
                yield this.dbClassManager.update("data/classes/" + classId + "/exercises", exercises);
            }
        });
    }
    /**
     * This method adds a student of a class into the database
     * @param studentId - the id of the student to add
     * @param classId - the id of the class in which add the student
     */
    addStudent(studentId, classId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classId);
            var students = _class.getStudents();
            if (students[0] !== "n") { //if the class already has some students
                students.push(studentId);
            }
            else { //if there are no students
                students[0] = studentId;
            }
            yield this.dbClassManager.update("data/classes/" + classId + "/students", students);
        });
    }
    /**
     * This method adds a class to the database
     * @param name - the name of the class to add
     * @param description - the description of the class to add
     * @param teacherId - the id of the teacher who creates the class
     * @return {boolean} returns "true" if the operation is successful
     */
    addClass(name, description, teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = new Class_1.Class("0", name, description, teacherId, ["n"], ["n"]);
            return yield this.dbClassManager.insert(_class);
        });
    }
    /**
     * This method adds an exercise of a class into the database
     * @param exerciseId - the id of the exercise to add
     * @param classId - the id of the class in which add the exercise
     */
    addExercise(exerciseId, classId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classId);
            var exercises = _class.getExercises();
            if (exercises[0] !== "n") { //if the class already has some exercises
                exercises.push(exerciseId);
            }
            else { //if there are no exercises
                exercises[0] = exerciseId;
            }
            yield this.dbClassManager.update("data/classes/" + classId + "/exercises", exercises);
        });
    }
    /**
     * This method returns the student list of a class.
     * @param classId - the class which you want to know the student list
     * @returns { string[] } returns a list of students.
     */
    getStudents(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classId);
            return _class.getStudents();
        });
    }
    /**
     * This method returns the exercise list of a class.
     * @param classId - the class which you want to know the exercise list
     * @returns { string[] } returns a list of exercise.
     */
    getExercises(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classId);
            return _class.getExercises();
        });
    }
    /**
     * This method returns a list of class of which the selected teacher is the creator
     * @param teacherId - the id of the teacher which we want to know the classes
     * @returns {any} the list of classes
     */
    findTeacherClasses(teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            var elements = yield this.dbClassManager.elements();
            let ret = [];
            for (let entry of Array.from(elements.entries())) {
                let key = entry[0];
                let value = entry[1];
                if (value === teacherId) {
                    let _class = yield this.dbClassManager.read(key);
                    ret.push(_class.toJSON());
                }
            }
            return ret;
        });
    }
    /**
     * This method returns a list of class in which the selected student is signed up
     * @param studentId - the id of the student which we want to know the classes
     * @returns {any} the list of classes
     */
    findStudentClasses(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            var elements = yield this.dbClassManager.elements();
            let ret = [];
            for (let entry of Array.from(elements.entries())) {
                let key = entry[0];
                let _class = yield this.dbClassManager.read(key);
                let students = _class.getStudents();
                for (let i in students) {
                    if (students[i] === studentId) {
                        ret.push(_class.toJSON());
                    }
                }
            }
            return ret;
        });
    }
    /**
     * This method returns the informations of a class
     * @param id - the id of the class
     * @return {any} a JSON file containing the class informations
     */
    getClassData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const _class = yield this.dbClassManager.read(id);
            return _class.toJSON();
        });
    }
}
exports.ClassClient = ClassClient;
//# sourceMappingURL=ClassClient.js.map