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
const DatabaseUserManager_1 = require("./DatabaseUserManager");
const Teacher_1 = require("./Teacher");
const Student_1 = require("./Student");
class UserClient {
    constructor() {
        this.passwordHash = require('bcryptjs');
        this.dbUserManager = new DatabaseUserManager_1.DatabaseUserManager();
    }
    insertStudent(username, password, name, surname, city, school) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbUserManager.insert(new Student_1.Student(username, password, name, surname, city, school));
        });
    }
    insertTeacher(username, password, name, surname, city, school, inps) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbUserManager.insert(new Teacher_1.Teacher(username, password, name, surname, city, school, inps));
        });
    }
    verifyUser(username, insertedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            let idUser = yield this.search(username);
            if (idUser !== "false") {
                let user = yield this.read(idUser);
                if (user !== null) {
                    let password = user.getPassword();
                    if (this.passwordHash.compareSync(insertedPassword, password)) {
                        //console.log("password match");
                        return true;
                    }
                    else {
                        //console.log("password dont match")
                        return false;
                    }
                }
                else {
                    //console.log("password dont match")
                    return false;
                }
            }
            else {
                return false;
            }
        });
    }
    search(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbUserManager.search(username);
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbUserManager.read(id);
        });
    }
}
exports.UserClient = UserClient;
//# sourceMappingURL=UserClient.js.map