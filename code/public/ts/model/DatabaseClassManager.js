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
const FirebaseClassManager_1 = require("./FirebaseClassManager");
class DatabaseClassManager {
    constructor() {
        this.firebaseClassManager = new FirebaseClassManager_1.FirebaseClassManager();
    }
    insert(obj) {
        return this.firebaseClassManager.insert(obj);
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseClassManager.remove(id);
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseClassManager.read(id);
        });
    }
    update(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseClassManager.update(path, value);
        });
    }
    elements() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseClassManager.elements();
        });
    }
}
exports.DatabaseClassManager = DatabaseClassManager;
//# sourceMappingURL=DatabaseClassManager.js.map