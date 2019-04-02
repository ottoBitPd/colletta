"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseExerciseManager_1 = require("./DatabaseExerciseManager");
class ExerciseClient {
    constructor() {
        this.dbExerciseManager = new DatabaseExerciseManager_1.DatabaseExerciseManager();
    }
    getDbExerciseManager() {
        return this.dbExerciseManager;
    }
    insertNewExercise() {
    }
}
exports.ExerciseClient = ExerciseClient;
//# sourceMappingURL=ExerciseClient.js.map