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
const DatabaseClassManager_1 = require("./DatabaseClassManager");
const Class_1 = require("./Class");
class ClassClient {
    constructor() {
        this.dbClassManager = new DatabaseClassManager_1.DatabaseClassManager();
    }
    getDbClassManager() {
        return this.dbClassManager;
    }
    deleteClass(classID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbClassManager.remove(classID);
        });
    }
    deleteStudent(classID, studentID) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classID);
            var students = _class.getStudents();
            var indexToRemove = students.indexOf(studentID);
            students.splice(indexToRemove, 1);
            yield this.dbClassManager.update("data/classes/" + classID + "/students", students);
        });
    }
    addStudent(studentID, classID) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classID);
            var students = _class.getStudents();
            students.push(studentID);
            yield this.dbClassManager.update("data/classes/" + classID + "/students", students);
        });
    }
    addClass(name, description, teacherID) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = new Class_1.Class(name, description, teacherID, [], []);
            return yield this.dbClassManager.insert(_class);
        });
    }
    addExercize(exerciseID, classID) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classID);
            var exercises = _class.getStudents();
            exercises.push(exerciseID);
            yield this.dbClassManager.update("data/classes/" + classID + "/exercises", exercises);
        });
    }
    getStudents(classID) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classID);
            return _class.getStudents();
        });
    }
    getExercises(classID) {
        return __awaiter(this, void 0, void 0, function* () {
            var _class = yield this.dbClassManager.read(classID);
            return _class.getStudents();
        });
    }
}
exports.ClassClient = ClassClient;
//# sourceMappingURL=ClassClient.js.map