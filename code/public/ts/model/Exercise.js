"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HunposManager_1 = require("./HunposManager");
class Exercise {
    constructor(sentence) {
        this.sentence = sentence;
        this.key = "-1";
        this.solutionTags = [];
        this.topics = [];
        this.difficulty = 0;
        this.hunpos = new HunposManager_1.HunposManager();
    }
    getKey() {
        return this.key;
    }
    getSentence() {
        return this.sentence;
    }
    getPOSManager() {
        return this.hunpos;
    }
    setKey(key) {
        this.key = key;
    }
    setSentence(sentence) {
        this.sentence = sentence;
    }
    setTopics(topics) {
        this.topics = topics;
    }
    setDifficulty(difficulty) {
        this.difficulty = difficulty;
    }
    setSolutionTags(solutionTags) {
        this.solutionTags = solutionTags;
    }
    getTopics() {
        return this.topics;
    }
    getDifficulty() {
        return this.difficulty;
    }
    getSolutionTags() {
        return this.solutionTags;
    }
    evaluate(correctionID, solution) { return 1; }
    ;
    toJSON() {
        return 1;
    }
}
exports.Exercise = Exercise;
//# sourceMappingURL=Exercise.js.map