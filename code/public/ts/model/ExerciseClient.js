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
const DatabaseExerciseManager_1 = require("./DatabaseExerciseManager");
const Exercise_1 = require("./Exercise");
//import {forEach} from "@firebase/util";
class ExerciseClient {
    constructor() {
        this.dbExerciseManager = new DatabaseExerciseManager_1.DatabaseExerciseManager();
    }
    autosolve(sentence, authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            let exercise = new Exercise_1.Exercise(sentence, authorId);
            return exercise.autosolve();
        });
    }
    /*
    async insertExercise(sentence :string , authorId : string, solution=[], topics=[]){
        let ex = new Exercise(sentence,authorId);
        ex.setSolution(authorId,solution,topics,-1);
        await this.dbExerciseManager.insert(ex);
    }
    */
    getSplitSentence(sentence) {
        return sentence.split(" ");
    }
    //setSolution(sentence: string , authorId :string, solverId : string, finalTags :string [], topics : string [], difficulty : number) : void {
    insertExercise(sentence, authorId, solution, valutation) {
        let exercise = new Exercise_1.Exercise(sentence, authorId);
        exercise.setSolution(solution[0], solution[1], solution[2], solution[3]);
        exercise.addValutation(valutation[0], valutation[1]);
        this.dbExerciseManager.insert(exercise);
    }
    /*
    addValutation(sentence: string , authorId :string, userId : string, mark : number) : void {
        let exercise = new Exercise(sentence, authorId);
        exercise.addValutation(userId, mark);
    }
    */
    getExercise(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbExerciseManager.read(id);
        });
    }
    searchExercise(substring) {
        return __awaiter(this, void 0, void 0, function* () {
            var regex = new RegExp(substring, "i");
            var elements = yield this.dbExerciseManager.elements();
            var ids = [];
            var exercises = [];
            elements.forEach(function (value, key) {
                if (value.search(regex) >= 0) {
                    ids.push(key);
                }
            });
            for (var i in ids) {
                exercises.push(yield this.getExercise(ids[i]));
            }
            return exercises;
        });
    }
}
exports.ExerciseClient = ExerciseClient;
//# sourceMappingURL=ExerciseClient.js.map