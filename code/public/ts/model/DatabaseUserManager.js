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
const FirebaseUserManager_1 = require("./FirebaseUserManager");
class DatabaseUserManager {
    constructor() {
        this.firebaseUserManager = new FirebaseUserManager_1.FirebaseUserManager();
    }
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseUserManager.insert(obj);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseUserManager.remove(id);
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseUserManager.read(id);
        });
    }
    update(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseUserManager.update(path, value);
        });
    }
    search(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseUserManager.search(username);
        });
    }
    elements() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseUserManager.elements();
        });
    }
}
exports.DatabaseUserManager = DatabaseUserManager;
//# sourceMappingURL=DatabaseUserManager.js.map