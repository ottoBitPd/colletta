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
const Exercise_1 = require("./Exercise");
class FirebaseExerciseManager extends FirebaseManager_1.FirebaseManager {
    constructor() {
        super();
        FirebaseManager_1.FirebaseManager.registerInstance("FirebaseExerciseManager", this);
    }
    // @ts-ignore
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            //guardo se esiste data in json e butto dentro in db
            let exercise = obj;
            let key;
            key = yield this.search(exercise.getSentence());
            console.log("ritorna: " + key);
            if (key === undefined) { //exercise does not exist in the db
                console.log("inserting sentence");
                key = this.writeSentence(exercise.getSentence(), exercise.getAuthorId());
            }
            let solution = exercise.getNewSolution();
            if (solution !== null) {
                console.log("inserting solution");
                this.writeSolution(solution, key);
            }
            return key;
        });
    }
    /**
     * This method checks if a sentence already exists in the database.
     * @param sentence - the sentence to check.
     * @returns {number} the key of the sentence if sentence already exists, -1 otherwise.
     */
    search(sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref('data/sentences/').orderByChild('sentence')
                    .once("value", function (snapshot) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data) {
                            if (data.val().sentence.toLowerCase() === sentence.toLowerCase()) {
                                //console.log("esiste");
                                return resolve(data.key);
                            }
                        });
                        //console.log("non esiste");
                        return resolve(undefined);
                    }
                    //console.log("database vuoto");
                    return resolve(undefined);
                });
            });
        });
    }
    /**
     * This method writes a sentence in the database.
     * @param sentence - the sentence to write
     * @returns {number} returns the key of the sentence written
     */
    writeSentence(sentence, authorId) {
        let ref = FirebaseManager_1.FirebaseManager.database.ref('data/sentences/').push({ sentence: sentence, authorId: authorId });
        let array = String(ref).split("/");
        //console.log("returno: "+array[array.length -1])
        return array[array.length - 1];
    }
    /**
     * This method write the sentence solution on the database.
     * The sentence solution is composed of tags coming from hunpos and from user correction,
     * these tags are contained in finalTags parameter.
     * @param words - array containing the sentence words
     * @param finalTags - array containing the sentence tags
     * @param sentence - the sentence string
     * @param sentenceKey - key of the sentence in the database
     */
    writeSolution(solution, sentenceKey) {
        if (solution.getValutations() !== null) {
            FirebaseManager_1.FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/').push({
                "solverId": solution.getSolverId(),
                "tags": solution.getSolutionTags(),
                "topics": solution.getTopics(),
                "difficulty": solution.getDifficulty(),
                "valutations": solution.JSONValutations(),
                "time": Date.now()
            });
        }
    }
    /*
    private writeValutation(exercise : Exercise, sentenceKey : string, solutionKey : number) {
        FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/'+solutionKey+'/valutations')
            .once("value", (snap : any) => {
                let valutationKey = snap.numChildren();
                FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/' + String(solutionKey)).child(String(valutationKey)).set({
                    "teacherId": "id del teacher che ha inserito la valutazione scelta",
                    "valutation": "10 se session=teacher, else risultato evaluate()"
                });

            });
    }
    */
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ProData = this.getExerciseById(id);
            const readed = yield ProData;
            return readed;
        });
    }
    getExerciseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref("data/sentences/" + id)
                    .once('value', function (snapshot) {
                    if (snapshot.exists()) {
                        let readData = snapshot.val();
                        let exercise = new Exercise_1.Exercise(readData.sentence, readData.authorID);
                        exercise.setKey(id);
                        for (let sol in readData.solutions) {
                            let vals = new Map();
                            for (let val in readData.solutions[sol].valutations) {
                                vals.set(val, readData.solutions[sol].valutations[val]);
                            }
                            exercise.addSolution(readData.solutions[sol].key, readData.solutions[sol].solverID, readData.solutions[sol].tags, readData.solutions[sol].topics, readData.solutions[sol].difficulty, vals, readData.solutions[sol].time);
                        }
                        return resolve(exercise);
                    }
                    return resolve(undefined);
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
            const ref = FirebaseManager_1.FirebaseManager.database.ref("data/sentences/" + id);
            // @ts-ignore
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
                case "difficulty":
                    yield this.updateField(path, value);
                    break;
                case "tags":
                    yield this.updateField(path, value);
                    break;
                case "topics":
                    yield this.updateField(path, value);
                    break;
                default:
                    yield console.log("field doesn't exists");
                    return;
            }
            yield this.updateTime(path);
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
    updateTime(path) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            let ref = FirebaseManager_1.FirebaseManager.database.ref(path).parent.child("time");
            ref.once('value', function (snapshot) {
                if (snapshot.exists()) {
                    ref.set(Date.now());
                }
            });
        });
    }
}
exports.FirebaseExerciseManager = FirebaseExerciseManager;
//# sourceMappingURL=FirebaseExerciseManager.js.map