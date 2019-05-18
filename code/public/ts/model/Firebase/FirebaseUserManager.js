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
const Student_1 = require("../Data/Student");
const Teacher_1 = require("../Data/Teacher");
/**
 *   Class to manage users into the database
 *   @extends FirebaseManager
 */
class FirebaseUserManager extends FirebaseManager_1.FirebaseManager {
    constructor() {
        super();
        FirebaseManager_1.FirebaseManager.registerInstance("FirebaseUserManager", this);
    }
    /**
     *   This method adds a new user into the database
     *   @param obj - the object to insert
     *   @returns { boolean } returns "true" if the operation is successful
     */
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = obj;
            const exist = yield this.search(user.getUsername());
            return new Promise(function (resolve) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (exist === "false") {
                        if (user.isTeacher() === true) {
                            const teacher = obj;
                            FirebaseManager_1.FirebaseManager.database.ref('data/users').push({ name: teacher.getName(),
                                password: teacher.getPassword(), lastname: teacher.getLastName(), username: teacher.getUsername(),
                                city: teacher.getCity(), school: teacher.getSchool(), INPScode: teacher.getINPS(),
                                email: teacher.getEmail()
                            });
                        }
                        else if (user.isStudent() === true) {
                            const student = obj;
                            FirebaseManager_1.FirebaseManager.database.ref('data/users').push({
                                //let student= <Student>obj;
                                name: student.getName(), password: student.getPassword(), lastname: student.getLastName(),
                                username: student.getUsername(), city: student.getCity(), school: student.getSchool(),
                                email: student.getEmail()
                            });
                        }
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
     *   This method looks for users into the database
     *   @param username - the id of the user to search
     *   @returns (string) - the user's username if exists
     */
    search(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref('data/users/').orderByChild('username')
                    .once("value", function (snapshot) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data) {
                            if (data.val().username.toLowerCase() === username.toLowerCase()) {
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
     * This method looks for all the users into the database
     * @returns {Map<string, string>} a map key-username of all the users
     */
    elements() {
        return __awaiter(this, void 0, void 0, function* () {
            let container = new Map();
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref('data/users')
                    .once("value", function (snapshot) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data) {
                            container.set(data.key, data.val().username);
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
     *   This method reads user informations from the database
     *   @param id - the id of the user to read
     */
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ProData = this.getUserById(id);
            const read = yield ProData;
            return read;
        });
    }
    /**
     *   This method returns an user from the database
     *   @param id - the id of the user to return
     *   @returns { User } the User object
     */
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref("data/users/" + id)
                    .once('value', function (snapshot) {
                    if (snapshot.exists()) {
                        let readData = snapshot.val();
                        let user;
                        if (readData.INPScode) {
                            user = new Teacher_1.Teacher(id, readData.username, readData.password, readData.name, readData.lastname, readData.city, readData.school, readData.INPScode, readData.email);
                        }
                        else {
                            user = new Student_1.Student(id, readData.username, readData.password, readData.name, readData.lastname, readData.city, readData.school, readData.email, readData.classId);
                        }
                        resolve(user);
                    }
                    return resolve(undefined);
                });
            });
        });
    }
    /**
     *   This method removes an user from the database
     *   @param id - the id of the user to remove
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
     *   This method removes an user from the database
     *   @param id - the id of the user to remove
     *   @returns { boolean } returns "true" if the operation is successful
     */
    removeFromId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = FirebaseManager_1.FirebaseManager.database.ref("data/users/" + id);
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
     *   This method modifies user informations into the database
     *   @param path - the path of the user to modify
     *   @param value - the new value
     */
    update(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let splittedPath = path.split("/");
            let position = splittedPath.length - 1;
            let field = splittedPath[position];
            switch (field) {
                case "password":
                    yield this.updateField(path, value);
                    break;
                case "name":
                    yield this.updateField(path, value);
                    break;
                case "lastname":
                    yield this.updateField(path, value);
                    break;
                case "city":
                    yield this.updateField(path, value);
                    break;
                case "school":
                    yield this.updateField(path, value);
                    break;
                case "username":
                    yield this.updateField(path, value);
                    break;
                case "INPScode":
                    yield this.updateField(path, value);
                    break;
                case "email":
                    yield this.updateField(path, value);
                    break;
                default:
                    console.log("field doesn't exists");
                    return;
            }
        });
    }
    /**
     *   This method modifies user informations into the database
     *   @param path - the path of the user to modify
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
exports.FirebaseUserManager = FirebaseUserManager;
//# sourceMappingURL=FirebaseUserManager.js.map