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
const FirebaseManager_1 = require("./FirebaseManager");
const User_1 = require("./User");
class FirebaseUserManager extends FirebaseManager_1.FirebaseManager {
    constructor() {
        super();
        FirebaseManager_1.FirebaseManager.registerInstance("FirebaseUserManager", this);
    }
    // @ts-ignore
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = obj;
            let exist = yield this.search(user.getUsername());
            if (exist === "false") {
                FirebaseManager_1.FirebaseManager.database.ref('data/users/').push({ name: user.getName(),
                    password: user.getPassword(), lastname: user.getLastName(), username: user.getUsername(),
                    city: user.getCity(), school: user.getSchool() });
                return user.getID();
            }
            else {
                return (exist);
            }
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ProData = this.getUserById(id);
            const read = yield ProData;
            return read;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref("data/users/" + id)
                    .once('value', function (snapshot) {
                    if (snapshot.exists()) {
                        // @ts-ignore
                        let readData = snapshot.val();
                        //----TODO: CONTROLLO SE USER è ALLIEVO O INSEGNANTE
                        let user = new User_1.User(readData.username, readData.password, readData.name, readData.lastname, readData.city, readData.school);
                        return resolve(user);
                    }
                    return resolve(undefined);
                });
            });
        });
    }
    search(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref('data/users/').orderByChild('username')
                    .once("value", function (snapshot) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data) {
                            if (data.val().username.toLowerCase() === username.toLowerCase()) {
                                //console.log("esiste");
                                return resolve(data.key);
                            }
                        });
                        //console.log("non esiste");
                        return resolve("false");
                    }
                    //console.log("database vuoto");
                    return resolve("false");
                });
            });
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ProData = this.removeFromId(id);
            const removed = yield ProData;
            return removed;
        });
    }
    removeFromId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = FirebaseManager_1.FirebaseManager.database.ref("data/users/" + id);
            return new Promise(function (resolve) {
                ref.once('value', function (snapshot) {
                    if (snapshot.exists()) {
                        ref.remove();
                        // @ts-ignore
                        return resolve(true);
                    }
                    return resolve(false);
                });
            });
        });
    }
    update(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let splittedPath = path.split("/");
            let position = splittedPath.length - 1;
            let field = splittedPath[position];
            console.log(field);
            switch (field) {
                case "password":
                    yield this.updateField(path, value);
                    break;
                case "name":
                    yield this.updateField(path, value);
                    break;
                case "lastname":
                    yield this.updateField(path, value);
                    break;
                case "city":
                    yield this.updateField(path, value);
                    break;
                case "school":
                    yield this.updateField(path, value);
                    break;
                case "username":
                    yield this.updateField(path, value);
                    break;
                default:
                    console.log("field doesn't exists");
                    return;
            }
        });
    }
    updateField(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = FirebaseManager_1.FirebaseManager.database.ref(path);
            ref.once('value', function (snapshot) {
                if (snapshot.exists()) {
                    ref.set(value);
                }
            });
        });
    }
}
exports.FirebaseUserManager = FirebaseUserManager;
//# sourceMappingURL=FirebaseUserManager.js.map