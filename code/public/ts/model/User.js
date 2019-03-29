"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(username) {
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
        this.databaseInfo = new this.DatabaseUserInfo(0, "", "", "", "", "");
    }
    getName() {
        return this.databaseInfo.name;
    }
    getLastName() {
        return this.databaseInfo.lastName;
    }
    toJSON() {
        return 1;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map