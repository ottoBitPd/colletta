"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, username, password, name, lastname, city, school) {
        this.DatabaseUserInfo = class {
            constructor(id, psw, name, lN, city, sc) {
                this.id = id;
                this.password = psw;
                this.name = name;
                this.lastName = lN;
                this.city = city;
                this.school = sc;
            }
        };
        this.username = username;
        this.databaseInfo = new this.DatabaseUserInfo(id, password, name, lastname, city, school);
    }
    getUsername() {
        return this.username;
    }
    getName() {
        return this.databaseInfo.name;
    }
    getLastName() {
        return this.databaseInfo.lastName;
    }
    getCity() {
        return this.databaseInfo.city;
    }
    getSchool() {
        return this.databaseInfo.school;
    }
    getPassword() {
        return this.databaseInfo.password;
    }
    samePassword(otherPassword) {
        if (otherPassword === this.databaseInfo.password)
            return true;
        return false;
    }
    setID(id) {
        this.databaseInfo.id = id;
    }
    isTeacher() {
        return false;
    }
    getID() {
        return this.databaseInfo.id;
    }
    toJSON() {
        return 1;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map