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
    //da un voto alla soluzione corrente(newSolution) rispetto a solution con quel teacherID
    evaluate(teacherID) {
<<<<<<< HEAD
        var mySolution = this.getNewSolution();
        if (mySolution == null) {
=======
        const mySolution = this.getNewSolution();
        if (mySolution === null) {
>>>>>>> 7864bf13b5e02e8d76b41f59181e574bf03b9cea
            return -1;
        }
        else {
            let tags = [];
<<<<<<< HEAD
            let solutions = this.getSolutions();
            if (teacherID != null) {
                var teacherSolution = solutions.find(function (element) {
                    return element.getSolverId() == teacherID;
=======
            const solutions = this.getSolutions();
            if (teacherID !== null) {
                const teacherSolution = solutions.find(function (element) {
                    return element.getSolverId() === teacherID;
>>>>>>> 7864bf13b5e02e8d76b41f59181e574bf03b9cea
                });
                if (typeof (teacherSolution) === 'undefined') {
                    throw new Error("ID non trovato");
                }
                else {
                    tags = teacherSolution.getSolutionTags();
                }
            }
            else {
<<<<<<< HEAD
                var hunposSolution = this.autosolve();
=======
                const hunposSolution = this.autosolve();
>>>>>>> 7864bf13b5e02e8d76b41f59181e574bf03b9cea
                for (let i in hunposSolution.sentence) {
                    tags.push(hunposSolution.sentence[i].label);
                }
            }
            return mySolution.evaluateSolution(tags);
        }
    }
    toJSON() {
        return 1;
    }
}
exports.Exercise = Exercise;
//# sourceMappingURL=Exercise.js.map