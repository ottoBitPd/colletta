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
const FirebaseManager_1 = require("./FirebaseManager");
const Class_1 = require("../Data/Class");
/**
 *   Class to manage classes into the database
 *   @extends FirebaseManager
 */
class FirebaseClassManager extends FirebaseManager_1.FirebaseManager {
    constructor() {
        super();
        FirebaseManager_1.FirebaseManager.registerInstance("FirebaseClassManager", this);
    }
    /**
     *   This method adds a new class into the database
     *   @param obj - the class to insert
     *   @returns { boolean } returns "true" if the operation is successful
     */
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const _class = obj;
            const exists = yield this.search(_class.getName());
            return new Promise(function (resolve) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (exists === "false") {
                        FirebaseManager_1.FirebaseManager.database.ref('data/classes').push({
                            name: _class.getName(),
                            description: _class.getDescription(),
                            students: _class.getStudents(),
                            teacherID: _class.getTeacherID(),
                            exercises: _class.getExercises(),
                            time: Date.now()
                        });
                        return resolve(true);
                    }
                    else {
                        return resolve(false);
                    }
                });
            });
        });
    }
    /**
     *   This method looks for classes into the database
     *   @param name - the name of the class to search
     *   @returns (string) - returns the class key if exists
     */
    search(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref('data/classes/')
                    .once("value", function (snapshot) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data) {
                            if (data.val().name.toLowerCase() === name.toLowerCase()) {
                                return resolve(data.key);
                            }
                        });
                        return resolve("false");
                    }
                    return resolve("false");
                });
            });
        });
    }
    /**
     * This method looks for all the classes into the database
     * @returns {Map<string, string>} a map class key-teacher id containing all the classes saved into the database
     */
    elements() {
        return __awaiter(this, void 0, void 0, function* () {
            let container = new Map();
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref('data/classes')
                    .once("value", function (snapshot) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data) {
                            container.set(data.key, data.val().teacherID);
                        });
                        return resolve(container);
                    }
                    else {
                        return resolve(container);
                    }
                });
            });
        });
    }
    /**
     *   This method reads class informations from the database
     *   @param id - the id of the class to read
     *   @returns { Data } returns the class object
     */
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ProData = this.getClassById(id);
            const readed = yield ProData;
            return readed;
        });
    }
    /**
     *   This method returns an class from the database
     *   @param id - the id of the class to return
     *   @returns { Class } the Class object
     */
    getClassById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref("data/classes/" + id)
                    .once('value', function (snapshot) {
                    if (snapshot.exists()) {
                        const readData = snapshot.val();
                        const _class = new Class_1.Class(id, readData.name, readData.description, readData.teacherID, readData.students, readData.exercises, readData.time);
                        return resolve(_class);
                    }
                    else {
                        return resolve(undefined);
                    }
                });
            });
        });
    }
    /**
     *   This method removes a class from the database
     *   @param id - the id of the class to remove
     *   @returns { boolean } returns "true" if the operation is successful
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ProData = this.removeFromId(id);
            const removed = yield ProData;
            return removed;
        });
    }
    /**
     *   This method removes a class from the database
     *   @param id - the id of the class to remove
     *   @returns { boolean } returns "true" if the operation is successful
     */
    removeFromId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = FirebaseManager_1.FirebaseManager.database.ref("data/classes/" + id);
            return new Promise(function (resolve) {
                ref.once('value', function (snapshot) {
                    if (snapshot.exists()) {
                        ref.remove();
                        // @ts-ignore
                        return resolve(true);
                    }
                    return resolve(false);
                });
            });
        });
    }
    /**
     *   This method modifies class informations into the database
     *   @param path - the path of the class to modify
     *   @param value - the new value
     */
    update(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const splittedPath = path.split("/");
            const position = splittedPath.length - 1;
            const field = splittedPath[position];
            switch (field) {
                case "exercises":
                    yield this.updateField(path, value);
                    break;
                case "students":
                    yield this.updateField(path, value);
                    break;
                default:
                    console.log("field doesn't exists");
                    return;
            }
            yield this.updateTime(path);
        });
    }
    /**
     *   This method sets the exercise time at now
     *   @param path - the path of the exercise to modify
     */
    updateTime(path) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            let ref = FirebaseManager_1.FirebaseManager.database.ref(path).parent.child("time");
            ref.once('value', function (snapshot) {
                if (snapshot.exists()) {
                    ref.set(Date.now());
                }
            });
        });
    }
    /**
     *   This method modifies class informations into the database
     *   @param path - the path of the class to modify
     *   @param value - the new value
     */
    updateField(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = FirebaseManager_1.FirebaseManager.database.ref(path);
            ref.once('value', function (snapshot) {
                if (snapshot.exists()) {
                    ref.set(value);
                }
            });
        });
    }
}
exports.FirebaseClassManager = FirebaseClassManager;
//# sourceMappingURL=FirebaseClassManager.js.map