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
const FirebaseExerciseManager_1 = require("./FirebaseExerciseManager");
class DatabaseExerciseManager {
    constructor() {
        this.firebaseExerciseManager = new FirebaseExerciseManager_1.FirebaseExerciseManager();
    }
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseExerciseManager.insert(obj);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseExerciseManager.remove(id);
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseExerciseManager.read(id);
        });
    }
    search(sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseExerciseManager.search(sentence);
        });
    }
    update(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseExerciseManager.update(path, value);
        });
    }
    elements() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseExerciseManager.elements();
        });
    }
}
exports.DatabaseExerciseManager = DatabaseExerciseManager;
//# sourceMappingURL=DatabaseExerciseManager.js.map