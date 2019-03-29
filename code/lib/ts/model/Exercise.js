"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HunposManager_1 = require("./HunposManager");
const Solution_1 = require("./Solution");
class Exercise {
    constructor(sentence, authorId) {
        this.sentence = sentence;
        this.key = "-1";
        this.authorId = authorId;
        this.newSolution = null;
        this.solutions = [];
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
    getAuthorId() {
        return this.authorId;
    }
    setKey(key) {
        this.key = key;
    }
    setSentence(sentence) {
        this.sentence = sentence;
    }
    setSolution(solverId, solutionTags, topics, difficulty) {
        this.newSolution = new Solution_1.Solution(undefined, solverId, solutionTags, topics, difficulty);
    }
    addSolution(key, solverId, solutionTags, topics, difficulty, valutations, time) {
        this.solutions.push(new Solution_1.Solution(key, solverId, solutionTags, topics, difficulty, valutations, time));
    }
    getSolutions() {
        return this.solutions;
    }
    addValutation(teacherID, mark) {
        if (this.newSolution)
            this.newSolution.addNewMark(teacherID, mark);
    }
    getNewSolution() {
        return this.newSolution;
    }
    autosolve() {
        return this.getPOSManager().getSolution(this.getSentence());
    }
    ;
    evaluate(teacherID) {
        console.log("almeno qui entra");
        var mySolution = this.getNewSolution();
        if (mySolution == null) {
            return -1;
        }
        else {
            var rightTagsNumber = 0;
            let sol;
            let tags = [];
            let exists = false;
            let solutions = this.getSolutions();
            if (teacherID != null) {
                for (let i = 0; i < solutions.length && !exists; i++) {
                    if (solutions[i].getSolverId() == teacherID) {
                        console.log("trovatoID");
                        exists = true;
                        tags = solutions[i].getSolutionTags();
                    }
                }
            }
            else if (!exists) {
                console.log("non trovato id");
                sol = this.autosolve();
                for (let i in sol.sentence) {
                    tags.push(sol.sentence[i].label);
                }
            }
            let mySolutionTags = mySolution.getSolutionTags();
            for (let j = 0; j < mySolutionTags.length; j++) {
                if (mySolutionTags[j] == tags[j]) {
                    rightTagsNumber++;
                }
            }
            return ((rightTagsNumber * 10) / mySolutionTags.length);
        }
    }
    toJSON() {
        return 1;
    }
}
exports.Exercise = Exercise;
//# sourceMappingURL=Exercise.js.map