"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exercise_1 = require("./Exercise");
class ItalianExercise extends Exercise_1.Exercise {
    constructor(sentence) {
        super(sentence);
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
        //2 array di tags uno riferito alla soluzione di riferimento esatta
        //prendere la soluzione con quell'ID
        return 1;
    }
}
exports.ItalianExercise = ItalianExercise;
//# sourceMappingURL=ItalianExercise.js.map