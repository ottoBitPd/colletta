"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirebaseUserManager_1 = require("./FirebaseUserManager");
class DatabaseUserManager {
    constructor() {
        this.firebaseUserManager = new FirebaseUserManager_1.FirebaseUserManager();
    }
    insert(obj) {
        return this.firebaseUserManager.insert(obj);
    }
    remove(id) {
        return null;
    }
    // @ts-ignore
    update(id) {
    }
}
exports.DatabaseUserManager = DatabaseUserManager;
//# sourceMappingURL=DatabaseUserManager.js.map