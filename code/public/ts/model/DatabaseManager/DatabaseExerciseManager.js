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
const FirebaseExerciseManager_1 = require("../Firebase/FirebaseExerciseManager");
/**
 *   Class to manage exercises into the database
 *   @extends DatabaseManager
 */
class DatabaseExerciseManager extends DatabaseManager_1.DatabaseManager {
    constructor() {
        super(new FirebaseExerciseManager_1.FirebaseExerciseManager());
    }
    /**
     *   This method adds a new exercise into the database
     *   @param obj - the object to insert
     *   @returns { boolean } returns "true" if the operation is successful
     */
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().insert(obj);
        });
    }
    /**
     *   This method removes an exercise from the database
     *   @param id - the id of the exercise to remove
     *   @returns { boolean } returns "true" if the operation is successful
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().remove(id);
        });
    }
    /**
     *   This method reads exercises informations from the database
     *   @param id - the id of the exercise to read
     *   @return {Data} returns the exercise with the corr
     */
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().read(id);
        });
    }
    /**
     *   This method looks for exercises into the database
     *   @param id - the id of the exercise to search
     *   @returns (string) - returns the exercise key if exists
     */
    search(sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().search(sentence);
        });
    }
    /**
     *   This method modifies exercises into the database
     *   @param path - the path of the exercise to modify
     *   @param value - the new value to insert
     */
    update(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().update(path, value);
        });
    }
    /**
     * This method looks for all the exercises into the database
     * @returns {Map<string, string>} a map key-sentence containing all the exercises saved into the database
     */
    elements() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getDatabase().elements();
        });
    }
}
exports.DatabaseExerciseManager = DatabaseExerciseManager;
//# sourceMappingURL=DatabaseExerciseManager.js.map