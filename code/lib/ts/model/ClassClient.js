"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseClassManager_1 = require("./DatabaseClassManager");
class ClassClient {
    constructor() {
        this.dbClassManager = new DatabaseClassManager_1.DatabaseClassManager();
    }
    getDbClassManager() {
        return this.dbClassManager;
    }
}
exports.ClassClient = ClassClient;
//# sourceMappingURL=ClassClient.js.map