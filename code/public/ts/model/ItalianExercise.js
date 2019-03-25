"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exercise_1 = require("./Exercise");
class ItalianExercise extends Exercise_1.Exercise {
    constructor(key, sentence) {
        super(key, sentence);
    }
    getKey() {
        return super.getKey();
    }
    getSentence() {
        return super.getSentence();
    }
    getPOSManager() {
        return super.getPOSManager();
    }
    setKey(key) {
        super.setKey(key);
    }
    setSentence(sentence) {
        super.setSentence(sentence);
    }
    autosolve() {
        return super.getPOSManager().getSolution(this.getSentence());
    }
    evaluate(correctionID, solution) {
        return 1;
    }
    toJSON() {
        return 1;
    }
}
exports.ItalianExercise = ItalianExercise;
//# sourceMappingURL=ItalianExercise.js.map