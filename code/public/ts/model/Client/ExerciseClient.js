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
const DatabaseExerciseManager_1 = require("../DatabaseManager/DatabaseExerciseManager");
const Exercise_1 = require("../Data/Exercise");
/**
 *   Class to create and manage "ExerciseClient" objects
 */
/**
 * Class to use the exercise functionality exposed into the model
 */
class ExerciseClient {
    constructor() {
        this.dbExerciseManager = new DatabaseExerciseManager_1.DatabaseExerciseManager();
    }
    /**
     * This method returns an array of exercises done by a student whose id has passed
     * @param sentence - the sentence that must to be solve
     * @param authorId - the author's id who write the sentence
     * @returns Promise<string[]> - array containing the result
     */
    autosolve(sentence, authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            let exercise = new Exercise_1.Exercise(sentence, authorId);
            let autosolution = yield exercise.autosolve();
            let result = [];
            for (let value of autosolution.sentence) {
                result.push(value.label);
            }
            return result;
        });
    }
    /**
     * This method splits a sentence on spaces and punctuation
     * @param sentence - a sentence that must to be splitted
     * @returns string [] - an array containing the split sentence
     */
    getSplitSentence(sentence) {
        let tmp = new Exercise_1.Exercise(sentence, "xxx");
        return tmp.getSplitSentence();
    }
    /**
     * This method inserts a new exercise into the database
     * @param sentence - the exercise sentence
     * @param authorId - the id of the exercise creator
     * @param solution - the solution of the exercise
     * @param valutation - the valutation of the solution
     * @param _public - the state (public/private) of the solution
     */
    insertExercise(sentence, authorId, solution, valutation, _public = false) {
        let exercise = new Exercise_1.Exercise(sentence, authorId);
        exercise.setSolution(solution[0], solution[1], solution[2], solution[3], _public);
        if (valutation !== {})
            exercise.addValutation(valutation[0], valutation[1]);
        this.dbExerciseManager.insert(exercise);
    }
    /**
     * This method looks for exercises into the database
     * @param substring - part of the sentence to look for
     * @returns {Map<string, string>} a map key-sentence of the search results
     */
    searchExercise(substring) {
        return __awaiter(this, void 0, void 0, function* () {
            var regex = new RegExp(substring, "i");
            var elements = yield this.dbExerciseManager.elements(); //returns a map<id,sentence> of all exercises in the db
            var mapToReturn = new Map();
            elements.forEach(function (value, key) {
                if (value.search(regex) >= 0) {
                    mapToReturn.set(key, value);
                }
            });
            return mapToReturn;
        });
    }
    /**
     * This method looks for solutions written by a specific user into the database
     * @param sentence - the sentence of which we want the solutions
     * @param solverId - the id of the user who wrote the solution
     * @returns {any[]} the list of solutions
     */
    searchSolution(sentence, solverId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            let exerciseKey = yield this.dbExerciseManager.search(sentence);
            if (exerciseKey !== "false") {
                let exercise = yield this.dbExerciseManager.read(exerciseKey);
                let solutions = exercise.getSolutions();
                for (let value of solutions) {
                    if (value.getSolverId() === solverId) {
                        result.push({
                            "id": value.getKey(),
                            "userID": value.getSolverId(),
                            "tags": value.getSolutionTags(),
                            "time": value.getTime(),
                            "difficulty": value.getDifficulty(),
                            "topics": value.getTopics(),
                            "_public": value.getPublic()
                        });
                    }
                }
            }
            return result;
        });
    }
    searchAllSolution() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            var elements = yield this.dbExerciseManager.elements();
            for (let entry of Array.from(elements)) {
                let key = entry[0];
                let exercise = yield this.dbExerciseManager.read(key);
                let phrase = exercise.getSentence();
                let solutions = exercise.getSolutions();
                for (let sol of solutions) {
                    let val = [];
                    for (let vals of sol.getValutations().entries()) {
                        val = [vals[0], vals[1]];
                    }
                    result.push({
                        "id": exercise.getKey(),
                        "sentence": phrase,
                        "solverID": sol.getSolverId(),
                        "tags": sol.getSolutionTags(),
                        "time": sol.getTime(),
                        "difficulty": sol.getDifficulty(),
                        "topics": sol.getTopics(),
                        "valutations": val
                    });
                }
            }
            return result;
        });
    }
    /**
     * This method returns the sentence of an exercise.
     * @param id - the id of the exercise
     * @returns { string } returns the exercise sentence.
     */
    getSentence(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let exercise = yield this.dbExerciseManager.read(id);
            return exercise.getSentence();
        });
    }
    /**
     * This method evaluates a solution of an exercise
     * @param newSolution - the solution to evaluate
     * @param solverId - the id of the user who wrote the solution
     * @param topics - the list of arguments of the exercise
     * @param sentence - the sentence of the exercise
     * @param difficulty - the difficulty of the exercise
     * @param teacherId - the id of the teacher who gave the solution
     */
    evaluate(newSolution, solverId, topics, sentence, difficulty, teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            let exercise;
            if (teacherId !== undefined)
                exercise = (yield this.dbExerciseManager.read(yield this.dbExerciseManager.search(sentence)));
            else
                exercise = new Exercise_1.Exercise(sentence, solverId);
            exercise.setSolution(solverId, newSolution, topics, difficulty);
            return yield exercise.evaluate(teacherId);
        });
    }
    /**
     * This method returns the exercise informations
     * @param id - the id of the exercise of which we want to know data
     */
    getExerciseData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exercise = yield this.dbExerciseManager.read(id);
            return exercise.toJSON();
        });
    }
    /**
     * This method returns an array of exercises done by a student whose id has passed
     * @param solverId - the id of the student
     * @returns Exercise[] - array containing the result
     */
    findSolvedExercises(solverId) {
        return __awaiter(this, void 0, void 0, function* () {
            var elements = yield this.dbExerciseManager.elements(); //returns a map<id,sentence> of all exercises in the db
            var toReturn = [];
            for (let entry of Array.from(elements.entries())) {
                let key = entry[0];
                let e = yield this.dbExerciseManager.read(key);
                let s = yield e.getSolutions();
                for (let i in s) {
                    if (s[i].getSolverId() === solverId) {
                        toReturn.push(e);
                    }
                }
            }
            return toReturn;
        });
    }
    /**
     * This method returns an array of JSON representing all the exercises inserted by a user whose id it is passed as parameter
     * @param authorId
     * @returns {JSON []} - an array of JSON representing all the exercises inserted by a user
     */
    findExercises(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            var elements = yield this.dbExerciseManager.elements(); //returns a map<id,sentence> of all exercises in the db
            var toReturn = [];
            for (let entry of Array.from(elements.entries())) {
                let key = entry[0];
                let e = yield this.dbExerciseManager.read(key);
                if (e.getAuthorId() === authorId) {
                    toReturn.push(e.toJSON());
                }
            }
            return toReturn;
        });
    }
    /**
     * This method receives an array of exercises and calculate the average of all valutations obtained by the student
     * @param studentId - a string representing the ID of a student
     * @returns Map<number,number> - a map containing the date of the solution given and the valutation obtained
     */
    getStudentAverage(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            let averageMap = new Map();
            let solutions = [];
            let exercises = yield this.findSolvedExercises(studentId);
            exercises.forEach((currentValue, index) => {
                solutions = solutions.concat(currentValue.getSolutions().filter((sol) => sol.getSolverId() === studentId
                    && sol.getValutations() && sol.getValutations().size > 0));
            });
            let sumTotal = 0;
            var i = 0;
            //sort solutions
            solutions.sort((a, b) => {
                let x = a.getTime();
                let y = b.getTime();
                if (x && y)
                    return x - y;
                return 0;
            });
            solutions.forEach((currentValue, index) => {
                let sumSingleSolution = 0;
                currentValue.getValutations().forEach((value, key) => {
                    sumSingleSolution += value;
                    i++;
                });
                sumTotal += sumSingleSolution;
                let media = sumTotal / i;
                averageMap.set(currentValue.getTime(), media);
            });
            return averageMap;
        });
    }
    updateSolution(exerciseId, solutionId, solution) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbExerciseManager.update('data/sentences/' + exerciseId + '/solutions/' + solutionId + '/tags', solution.tags);
            yield this.dbExerciseManager.update('data/sentences/' + exerciseId + '/solutions/' + solutionId + '/topics', solution.topics);
            yield this.dbExerciseManager.update('data/sentences/' + exerciseId + '/solutions/' + solutionId + '/public', solution._public);
            yield this.dbExerciseManager.update('data/sentences/' + exerciseId + '/solutions/' + solutionId + '/difficulty', solution.difficulty);
        });
    }
}
exports.ExerciseClient = ExerciseClient;
//# sourceMappingURL=ExerciseClient.js.map