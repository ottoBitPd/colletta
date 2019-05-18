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
const FirebaseClassManager_1 = require("../Firebase/FirebaseClassManager");
/**
 *   Class to manage classes into the database
 *   @extends DatabaseManager
 */
class DatabaseClassManager extends DatabaseManager_1.DatabaseManager {
    constructor() {
        super(new FirebaseClassManager_1.FirebaseClassManager());
    }
    /**
     *   This method adds a new class into the database
     *   @param obj - the object to insert
     *   @returns { boolean } returns "true" if the operation is successful
     */
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().insert(obj);
        });
    }
    /**
     *   This method removes a class from the database
     *   @param id - the id of the class to remove
     *   @returns { boolean } returns "true" if the operation is successful
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().remove(id);
        });
    }
    /**
     *   This method reads class informations from the database
     *   @param id - the id of the class to read
     *   @returns { Data } returns the class object
     */
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().read(id);
        });
    }
    /**
     *   This method looks for classes into the database
     *   @param id - the id of the class to search
     *   @returns (string) - returns the class key if exists
     */
    search(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().search(id);
        });
    }
    /**
     *   This method modifies class informations into the database
     *   @param path - the path of the class to modify
     *   @param value - the new value
     */
    update(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().update(path, value);
        });
    }
    /**
     * This method looks for all the classes into the database
     * @returns {Map<string, string>} a map class key-teacher id containing all the classes saved into the database
     */
    elements() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().elements();
        });
    }
}
exports.DatabaseClassManager = DatabaseClassManager;
//# sourceMappingURL=DatabaseClassManager.js.map