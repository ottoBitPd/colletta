"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUserManager_1 = require("./DatabaseUserManager");
class UserClient {
    constructor() {
        this.dbUserManager = new DatabaseUserManager_1.DatabaseUserManager();
    }
    /*getDbUserManager(): DatabaseUserManager {
        return this.dbUserManager;
    }*/
    insert(user) {
        return this.dbUserManager.insert(user);
    }
}
exports.UserClient = UserClient;
//# sourceMappingURL=UserClient.js.map