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
const Class_1 = require("./Class");
class FirebaseClassManager extends FirebaseManager_1.FirebaseManager {
    constructor() {
        super();
        FirebaseManager_1.FirebaseManager.registerInstance("FirebaseClassManager", this);
    }
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const _class = obj;
            const exists = yield this.search(_class.getTeacherID(), _class.getName());
            return new Promise(function (resolve) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (exists === "false") {
                        FirebaseManager_1.FirebaseManager.database.ref('data/classes').push({
                            name: _class.getName(),
                            description: _class.getDescription(),
                            students: _class.getStudents(),
                            teacherID: _class.getTeacherID(),
                            exercises: _class.getExercises()
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
    search(teacherID, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref('data/classes/')
                    .once("value", function (snapshot) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data) {
                            if ((data.val().teacherID.toLowerCase() === teacherID.toLowerCase()) &&
                                (data.val().name.toLowerCase() === name.toLowerCase())) {
                                //console.log("esiste");
                                return resolve(data.key);
                            }
                        });
                        //console.log("non esiste");
                        return resolve("false");
                    }
                    //console.log("database vuoto");
                    return resolve("false");
                });
            });
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ProData = this.getClassById(id);
            const readed = yield ProData;
            return readed;
        });
    }
    getClassById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref("data/classes/" + id)
                    .once('value', function (snapshot) {
                    if (snapshot.exists()) {
                        let readData = snapshot.val();
                        let _class = new Class_1.Class(readData.name, readData.description, readData.teacherID, readData.students, readData.exercises);
                        return resolve(_class);
                    }
                    return resolve(undefined);
                });
            });
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ProData = this.removeFromId(id);
            const removed = yield ProData;
            return removed;
        });
    }
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
    update(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let splittedPath = path.split("/");
            let position = splittedPath.length - 1;
            let field = splittedPath[position];
            console.log(field);
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
        });
    }
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