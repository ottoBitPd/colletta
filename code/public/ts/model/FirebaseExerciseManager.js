"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirebaseManager_1 = require("./FirebaseManager");
//import {Exercise} from "./Exercise";
class FirebaseExerciseManager extends FirebaseManager_1.FirebaseManager {
    constructor() {
        super();
        FirebaseManager_1.FirebaseManager.registerInstance("FirebaseExerciseManager", this);
        this.sentences = 0;
        FirebaseManager_1.FirebaseManager.database.ref('data/sentences').on("value", snap => {
            if (snap) //aggiunto per TSLint
                this.sentences = snap.numChildren();
            //console.log("inizio key: "+this.sentences);
        });
    }
    insert(obj) {
        //guardo se esiste data in json e butto dentro in db
        let exercise = obj;
        let key = this.checkIfExists(exercise.getSentence());
        //console.log("key1: " + key);
        if (key === -1) {
            key = this.writeSentence(exercise.getSentence());
            //this.writeDifficulty(key,exercise.getDifficulty());
            //this.writeTopics(key,exercise.getTopics());
        }
        //console.log("key2: " + key);
        this.writeSolution(exercise, key);
        return key;
    }
    /**
     * This method checks if a sentence already exists in the database.
     * @param sentence - the sentence to check.
     * @returns {number} the key of the sentence if sentence already exists, -1 otherwise.
     */
    checkIfExists(sentence) {
        var equal = false;
        for (var sentenceKey = 0; sentenceKey < this.sentences; sentenceKey++) {
            FirebaseManager_1.FirebaseManager.database.ref('data/sentences/' + sentenceKey).on("value", (snap) => {
                // @ts-ignore
                if (sentence.toLowerCase() === snap.val().sentence.toLowerCase()) {
                    equal = true;
                }
            });
            if (equal) {
                return sentenceKey;
            }
        }
        return -1;
    }
    /**
     * This method writes a sentence in the database.
     * @param sentence - the sentence to write
     * @returns {number} returns the key of the sentence written
     */
    writeSentence(sentence) {
        FirebaseManager_1.FirebaseManager.database.ref('data/sentences/' + this.sentences).set({ sentence: sentence });
        //return this.sentences - 1;
        return this.sentences - 1;
    }
    // /**
    //  */
    //  * This method writes the difficulty of a sentence in the database.
    //  * @param sentence - the sentence to write
    //  * @returns {number} returns the key of the sentence written
    //  */
    // private writeDifficulty(sentenceKey : number, difficulty: number) : void {
    //     FirebaseManager.database.ref('data/sentences/' + sentenceKey).set({difficulty: difficulty});
    // }
    // /**
    //  * This method writes th topics of a sentence in the database.
    //  * @param sentence - the sentence to write
    //  * @returns {number} returns the key of the sentence written
    //  */
    // private writeTopics(sentenceKey : number, topics: string []) : void {
    //     for (let topicIndex = 0; topicIndex < topics.length; topicIndex++) {
    //         FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/topics').set({
    //             "topic": topics[topicIndex]
    //         });
    //     }
    // }
    /**
     * This method write the sentence solution on the database.
     * The sentence solution is composed of tags coming from hunpos and from user correction,
     * these tags are contained in finalTags parameter.
     * @param words - array containing the sentence words
     * @param finalTags - array containing the sentence tags
     * @param sentence - the sentence string
     * @param sentenceKey - key of the sentence in the database
     */
    writeSolution(exercise, sentenceKey /*words: string[], finalTags: string[], sentence: string, sentenceKey: number*/) {
        let words = exercise.getSentence().split(" "); //poi ci sarà una funzione split migliore in Exercise
        let finalTags = exercise.getSolutionTags();
        //let topics = exercise.getTopics();
        let solutionKey = 0;
        //console.log("sentenceKey: " + sentenceKey);
        FirebaseManager_1.FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions').once("value", snap => {
            // @ts-ignore
            solutionKey = snap.numChildren();
            //console.log("solutionKey: " + solutionKey);
            console.log("difficulty: " + exercise.getDifficulty());
            /*FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/'+String(solutionKey)).set({
                "difficulty": exercise.getDifficulty()
            });*/
            FirebaseManager_1.FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/' + String(solutionKey)).set({
                "difficulty": exercise.getDifficulty(),
                "topics": exercise.getTopics()
            });
            for (let wordSolutionKey = 0; wordSolutionKey < words.length; wordSolutionKey++) {
                //console.log("number: " + solutionKey);
                //console.log("string: " + String(solutionKey));
                FirebaseManager_1.FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/' + String(solutionKey)).child(String(wordSolutionKey)).set({
                    "word": words[wordSolutionKey],
                    "tag": finalTags[wordSolutionKey]
                });
            }
        });
    }
}
exports.FirebaseExerciseManager = FirebaseExerciseManager;
//# sourceMappingURL=FirebaseExerciseManager.js.map