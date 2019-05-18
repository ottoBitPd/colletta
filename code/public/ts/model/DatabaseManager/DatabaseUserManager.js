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
const DatabaseManager_1 = require("./DatabaseManager");
const FirebaseUserManager_1 = require("../Firebase/FirebaseUserManager");
/**
 *   Class to manage users into the database
 *   @extends DatabaseManager
 */
class DatabaseUserManager extends DatabaseManager_1.DatabaseManager {
    constructor() {
        super(new FirebaseUserManager_1.FirebaseUserManager());
    }
    /**
     *   This method adds a new user into the database
     *   @param obj - the object to insert
     *   @returns { boolean } returns "true" if the operation is successful
     */
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().insert(obj);
        });
    }
    /**
     *   This method removes an user from the database
     *   @param id - the id of the user to remove
     *   @returns { boolean } returns "true" if the operation is successful
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().remove(id);
        });
    }
    /**
     *   This method reads user informations from the database
     *   @param id - the id of the user to read
     */
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().read(id);
        });
    }
    /**
     *   This method modifies user informations into the database
     *   @param path - the path of the user to modify
     *   @param value - the new value
     */
    update(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().update(path, value);
        });
    }
    /**
     *   This method looks for users into the database
     *   @param id - the id of the user to search
     *   @returns (string) - the user's username if exists
     */
    search(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().search(username);
        });
    }
    /**
     * This method looks for all the users into the database
     * @returns {Map<string, string>} a map key-username of all the users
     */
    elements() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().elements();
        });
    }
}
exports.DatabaseUserManager = DatabaseUserManager;
//# sourceMappingURL=DatabaseUserManager.js.map