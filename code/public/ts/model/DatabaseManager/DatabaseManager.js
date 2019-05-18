"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *   Class to manage the database.
 *   @abstract
 */
class DatabaseManager {
    constructor(fm) {
        this.firebaseManager = fm;
    }
    /**
     * This method returns a database reference.
     */
    getDatabase() {
        return this.firebaseManager;
    }
}
exports.DatabaseManager = DatabaseManager;
//# sourceMappingURL=DatabaseManager.js.map