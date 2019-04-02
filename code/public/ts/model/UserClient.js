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