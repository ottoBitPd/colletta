"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HunposManager_1 = require("./HunposManager");
class Exercise /*extends Data*/ {
    constructor(key, sentence) {
        this.sentence = sentence;
        this.key = key;
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
    getTopics() {
        return this.topics;
    }
    getDifficulty() {
        return this.difficulty;
    }
}
exports.Exercise = Exercise;
//# sourceMappingURL=Exercise.js.map