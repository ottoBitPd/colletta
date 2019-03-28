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
const ItalianExercise_1 = require("./ItalianExercise");
//import * as firebase from "firebase";
//import {Exercise} from "./Exercise";
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
            if (key === undefined) {
                key = this.writeSentence(exercise.getSentence());
            }
            this.writeSolution(exercise, key);
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
                                console.log("esiste");
                                return resolve(data.key);
                            }
                            console.log("non esiste");
                            return resolve(undefined);
                        });
                    }
                    console.log("database vuoto");
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
    writeSentence(sentence) {
        let ref = FirebaseManager_1.FirebaseManager.database.ref('data/sentences/').push({ sentence: sentence });
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
    writeSolution(exercise, sentenceKey) {
        // vecchi parametri words: string[], finalTags: string[], sentence: string, sentenceKey: number
        let words = exercise.getSentence().split(" "); //poi ci sarà una funzione split migliore in Exercise
        let finalTags = exercise.getSolutionTags();
        //let topics = exercise.getTopics();
        let solutionKey = 0;
        //console.log("sentenceKey: " + sentenceKey);
        FirebaseManager_1.FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions')
            .once("value", (snap) => {
            solutionKey = snap.numChildren();
            FirebaseManager_1.FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/' + String(solutionKey)).set({
                "difficulty": exercise.getDifficulty(),
                "topics": exercise.getTopics()
            });
            for (let wordSolutionKey = 0; wordSolutionKey < words.length; wordSolutionKey++) {
                FirebaseManager_1.FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/' + String(solutionKey)).child(String(wordSolutionKey)).set({
                    "word": words[wordSolutionKey],
                    "tag": finalTags[wordSolutionKey]
                });
            }
        });
    }
    // @ts-ignore
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ProData = this.getExerciseById(id);
            const readed = yield ProData;
            return readed;
        });
    }
    // @ts-ignore
    getExerciseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                FirebaseManager_1.FirebaseManager.database.ref("data/sentences/" + id)
                    .once('value', function (snapshot) {
                    if (snapshot.exists()) {
                        let readedData;
                        readedData = new ItalianExercise_1.ItalianExercise(snapshot.val().sentence);
                        readedData.setKey(id);
                        readedData.setDifficulty(snapshot.val().difficulty);
                        readedData.setSolutionTags(snapshot.val().tag);
                        readedData.setTopics(snapshot.val().topics);
                        return resolve(readedData);
                    }
                    return resolve(undefined);
                });
            });
        });
    }
    // @ts-ignore
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
}
exports.FirebaseExerciseManager = FirebaseExerciseManager;
//# sourceMappingURL=FirebaseExerciseManager.js.map