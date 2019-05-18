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
const HunposManager_1 = require("../POSManager/HunposManager");
const Solution_1 = require("./Solution");
/**
 *   Class to create and manage "Exercise" objects
 */
class Exercise {
    /**
     *   Initializes all attributes needed to Exercise object.
     */
    constructor(sentence, authorId) {
        this.sentence = sentence;
        this.key = "-1";
        this.authorId = authorId;
        this.newSolution = null;
        this.solutions = [];
        this.pos = new HunposManager_1.HunposManager();
    }
    /**
     * This method returns the key of an exercise.
     * @returns { string } returns the exercise key.
     */
    getKey() {
        return this.key;
    }
    /**
     * This method returns the sentence of an exercise.
     * @returns { string } returns the exercise sentence.
     */
    getSentence() {
        return this.sentence;
    }
    /**
     * This method returns a new POSManager reference.
     * @returns { POSManager } returns the reference.
     */
    getPOSManager() {
        return this.pos;
    }
    /**
     * This method returns the Id of the exercise author.
     * @returns { string } returns the author Id.
     */
    getAuthorId() {
        return this.authorId;
    }
    /**
     * This method modifies a new exercise key.
     * @param key - the new key
     */
    setKey(key) {
        this.key = key;
    }
    /**
     * This method modifies a new exercise sentence.
     * @param sentence - the new sentence
     */
    setSentence(sentence) {
        this.sentence = sentence;
    }
    /**
     * This method modifies an exercise solution.
     * @param solverId - the Id of the user who writes the solution
     * @param solutionTags - the list of solution tags
     * @param topics - the list of solution topics
     * @param difficulty - the grade of difficulty
     */
    setSolution(solverId, solutionTags, topics, difficulty, _public) {
        this.newSolution = new Solution_1.Solution(undefined, solverId, solutionTags, topics, difficulty, _public || false);
    }
    /**
     * This method add an exercise solution.
     * @param key - the solution key
     * @param solverId - the Id of the user who writes the solution
     * @param solutionTags - the list of solution tags
     * @param topics - the list of solution topics
     * @param difficulty - the grade of difficulty
     * @param valutations - the list of valutations (time and mark)
     * @param time - the date of the solution
     * @param _public - the
     */
    addSolution(key, solverId, solutionTags, topics, difficulty, valutations, time, _public) {
        this.solutions.push(new Solution_1.Solution(key, solverId, solutionTags, topics, difficulty, _public, valutations, time));
    }
    /**
     * This method returns the solution of the exercise.
     * @returns { Solution[] } returns the list of solution.
     */
    getSolutions() {
        return this.solutions;
    }
    /**
     * This method adds a new valutation to an exercise.
     * @param teacherId - the Id of the teacher who evaluates the solution
     * @param mark - the valutation
     */
    addValutation(teacherId, mark) {
        if (this.newSolution)
            this.newSolution.addNewMark(teacherId, mark);
        else
            throw new Error("Nessuna soluzione proposta");
    }
    /**
     * This method returns the actual solution of the exercise.
     * @returns { Solution | null } returns the actual solution of the exercise if exists.
     */
    getNewSolution() {
        return this.newSolution;
    }
    /**
     * This method returns the automatic solution of the exercise.
     * @returns { any } returns the automatic (Hunpos) solution of the exercise.
     */
    autosolve() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getPOSManager().getSolution(this.getSentence());
        });
    }
    ;
    /**
     * This method splits a sentence on spaces and punctuation
     * @param sentence - a sentence that must to be splitted
     * @returns string [] - an array containing the split sentence
     */
    getSplitSentence() {
        this.prepareSentence(); //adding spaces to split punctation
        let arr = this.sentence.split(new RegExp(" |(?<=')"));
        arr = arr.filter(Boolean); //remove empty string like ''
        return arr;
    }
    /**
     * This method adds spaces to the exercise sentence before and after every punctation symbol
     */
    prepareSentence() {
        this.sentence = this.sentence.replace(/\-/g, " - ");
        this.sentence = this.sentence.replace(/\!/g, " ! ");
        this.sentence = this.sentence.replace(/\?/g, " ? ");
        this.sentence = this.sentence.replace(/,/g, " , ");
        this.sentence = this.sentence.replace(/:/g, " : ");
        this.sentence = this.sentence.replace(/;/g, " ; ");
        this.sentence = this.sentence.replace(/\//g, " / ");
        this.sentence = this.sentence.replace(/\*/g, " * ");
        this.sentence = this.sentence.replace(/\(/g, " ( ");
        this.sentence = this.sentence.replace(/\)/g, " ) ");
        this.sentence = this.sentence.replace(/\[/g, " [ ");
        this.sentence = this.sentence.replace(/\]/g, " ] ");
        this.sentence = this.sentence.replace(/{/g, " { ");
        this.sentence = this.sentence.replace(/}/g, " } ");
        this.sentence = this.sentence.replace(/_/g, " _ ");
        this.sentence = this.sentence.replace(/`/g, " ` ");
        this.sentence = this.sentence.replace(/‘/g, " ‘ ");
        this.sentence = this.sentence.replace(/’/g, " ’ ");
        this.sentence = this.sentence.replace(/\"/g, " \" ");
        this.sentence = this.sentence.replace(/“/g, " “ ");
        this.sentence = this.sentence.replace(/”/g, " ” ");
        this.sentence = this.sentence.replace(/«/g, " « ");
        this.sentence = this.sentence.replace(/»/g, " » ");
        this.sentence = this.sentence.replace(/\s+/g, ' '); //if there are multiple spaces
        this.sentence = this.sentence.replace(/\s+'/g, '\''); //if there are spaces before '
        let arr = this.sentence.split("");
        for (let i = 0; i < arr.length; i++) {
            if (i <= arr.length - 3 && arr[i] === "." && arr[i + 1] === "." && arr[i + 2] === ".") {
                arr[i] = " ... ";
                arr[i + 1] = arr[i + 2] = " ";
            }
            else if (arr[i] === ".") {
                arr[i] = " . ";
            }
        }
        this.sentence = arr.join("");
    }
    /**
     * This method provides a valutation to the current solution (newSolution) comparing the latter with
     * the solution of the teacherId passed
     * @param teacherID - the id of the teacher who provide the solution which will be compared the current solution
     * @returns number - the grade calculated
     */
    evaluate(teacherID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.newSolution === null) {
                return -1;
            }
            else {
                let tags = [];
                if (teacherID !== undefined) {
                    const teacherSolution = this.solutions.find(function (element) {
                        return element.getSolverId() === teacherID;
                    });
                    if (teacherSolution === undefined) {
                        throw new Error("ID non trovato");
                    }
                    else {
                        tags = teacherSolution.getSolutionTags();
                    }
                }
                else {
                    const hunposSolution = yield this.autosolve();
                    for (let i in hunposSolution.sentence) {
                        tags.push(hunposSolution.sentence[i].label);
                    }
                }
                return this.newSolution.evaluateSolution(tags);
            }
        });
    }
    /**
     * This method returns a JSON file containing all the exercise informations
     * @return {any} the JSON file made like:
     *                  sentence    [the exercise sentence]
     *                  authorId    [the Id of the author of the exercise creator]
     *                  key         [the exercise key]
     *                  solutions   [the list of exercise solutions]
     */
    toJSON() {
        let exercise = {};
        exercise.sentence = this.sentence;
        exercise.authorId = this.authorId;
        exercise.key = this.key;
        exercise.solutions = [];
        for (let i in this.solutions) {
            exercise.solutions.push(this.solutions[i].toJSON());
        }
        return exercise;
    }
}
exports.Exercise = Exercise;
//# sourceMappingURL=Exercise.js.map