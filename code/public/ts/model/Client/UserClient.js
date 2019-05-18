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
const DatabaseUserManager_1 = require("../DatabaseManager/DatabaseUserManager");
const Teacher_1 = require("../Data/Teacher");
const Student_1 = require("../Data/Student");
const passwordHash = require('bcryptjs');
/**
 * Class to use the user functionality exposed into the model
 */
class UserClient {
    constructor() {
        this.dbUserManager = new DatabaseUserManager_1.DatabaseUserManager();
    }
    /**
     * This method inserts a student into the database
     * @param username - the username of the student
     * @param password - the password of the student
     * @param name - the name of the student
     * @param surname - the surname of the student
     * @param city - the city of the student
     * @param school - the school of the student
     * @param email - the email of the student
     * @returns {boolean} returns "true" if the operation is successful
     */
    insertStudent(username, password, name, surname, city, school, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbUserManager.insert(new Student_1.Student("0", username, password, name, surname, city, school, email));
        });
    }
    /**
     * This method inserts a teacher into the database
     * @param username - the username of the teacher
     * @param password - the password of the teacher
     * @param name - the name of the teacher
     * @param surname - the surname of the teacher
     * @param city - the city of the teacher
     * @param school - the school of the teacher
     * @param inps - the INPS code of the teacher
     * @param email - the email of the teacher
     * @returns {boolean} returns "true" if the operation is successful
     */
    insertTeacher(username, password, name, surname, city, school, inps, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbUserManager.insert(new Teacher_1.Teacher("0", username, password, name, surname, city, school, inps, email));
        });
    }
    /**
     * This method verifies the user identity
     * @param username - the username of the user
     * @param insertedPassword - the password currently inserted by the user
     * @returns {boolean} returns "true" if the user has inserted correct data
     */
    verifyUser(username, insertedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = yield this.dbUserManager.search(username);
            if (idUser !== "false") {
                const user = yield this.dbUserManager.read(idUser);
                if (user !== null) {
                    const password = user.getPassword();
                    return this.checkPassword(insertedPassword, password);
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        });
    }
    /**
     * This method verifies if the currently inserted password is the same saved into the database
     * @param insertedPassword - the currently inserted password
     * @param password - the saved password
     * @returns {boolean} returns "true" if the two passwords are matching
     */
    checkPassword(insertedPassword, password) {
        if (passwordHash.compareSync(insertedPassword, password)) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * This method returns checks if a user is a teacher.
     * @returns { boolean } returns "true" if the user is a teacher.
     */
    isTeacher(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.dbUserManager.search(username);
            const user = yield this.dbUserManager.read(id);
            if (user !== undefined)
                return user.isTeacher();
            else
                return false;
        });
    }
    /**
     * This method returns the list of teachers inserted into the database
     * @returns {string[]} the list of users
     */
    teacherList() {
        return __awaiter(this, void 0, void 0, function* () {
            let teacherMap = yield this.dbUserManager.elements();
            let list = [];
            for (let teacher of teacherMap) {
                let condition = yield this.isTeacher(teacher[1]);
                if (condition)
                    list.push(teacher[0]);
            }
            return list;
        });
    }
    /**
     * This method looks for an user into the database
     * @param username - the username of the user we are looking for
     * @returns {string}
     */
    search(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbUserManager.search(username);
        });
    }
    /**
     * This method returns user informations
     * @param id - the id of the user we are looking for
     * @returns {any} returns the user informations
     */
    getUserData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === "false" || id === "-1")
                return { id: "-1" };
            const user = yield this.dbUserManager.read(id);
            let userData = user.toJSON();
            if (user.isTeacher()) {
                userData.inps = user.getINPS();
            }
            return userData;
        });
    }
    /**
     * This method modifies user informations
     * @param username - the username of the user of which we want to change data
     * @param userUpdateData - the new informations
     */
    updateUser(username, userUpdateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.dbUserManager.search(username);
            yield this.dbUserManager.update('data/users/' + id + '/name', userUpdateData.name);
            yield this.dbUserManager.update('data/users/' + id + '/lastname', userUpdateData.lastname);
            yield this.dbUserManager.update('data/users/' + id + '/city', userUpdateData.city);
            yield this.dbUserManager.update('data/users/' + id + '/school', userUpdateData.school);
            yield this.dbUserManager.update('data/users/' + id + '/email', userUpdateData.email);
            yield this.dbUserManager.update('data/users/' + id + '/username', userUpdateData.username);
            yield this.dbUserManager.update('data/users/' + id + '/password', userUpdateData.password);
            if (userUpdateData.inps !== undefined) {
                yield this.dbUserManager.update('data/users/' + id + '/INPScode', userUpdateData.inps);
            }
        });
    }
    /**
     * This method looks for users into the database
     * @param substring - part of the username of the user
     * @param teacher - false if you want to search student only, true if you want to search teacher only
     * @returns {Map<string, string>} a map key-name of the search results
     */
    searchUser(substring, teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            var regex = new RegExp(substring, "i");
            var elements = yield this.dbUserManager.elements(); //returns a map<id,username> of all users in the db
            var mapToReturn = new Map();
            for (let entry of Array.from(elements.entries())) {
                let key = entry[0];
                let value = entry[1];
                let user = yield this.dbUserManager.read(key);
                if (teacher && user.isTeacher()) {
                    if (value.search(regex) >= 0) {
                        mapToReturn.set(key, value);
                    }
                }
                else if (!teacher && !user.isTeacher()) {
                    if (value.search(regex) >= 0) {
                        mapToReturn.set(key, value);
                    }
                }
            }
            return mapToReturn;
        });
    }
    /**
     * This method encrypts the user password
     * @param password - the password inserted by the user
     */
    hashPassword(password) {
        return passwordHash.hashSync(password, 10);
    }
}
exports.UserClient = UserClient;
//# sourceMappingURL=UserClient.js.map