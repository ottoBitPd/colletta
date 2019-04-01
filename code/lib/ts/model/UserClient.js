"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUserManager_1 = require("./DatabaseUserManager");
class UserClient {
    constructor() {
        this.dbUserManager = new DatabaseUserManager_1.DatabaseUserManager();
    }
    getDbUserManager() {
        return this.dbUserManager;
    }
}
exports.UserClient = UserClient;
//# sourceMappingURL=UserClient.js.map