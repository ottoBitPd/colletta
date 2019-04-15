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
    getSplitSentence(sentence) {
        return sentence.split(" ");
    }
    insertExercise(sentence, authorId, solution, valutation) {
        let exercise = new Exercise_1.Exercise(sentence, authorId);
        exercise.setSolution(solution[0], solution[1], solution[2], solution[3]);
        exercise.addValutation(valutation[0], valutation[1]);
        this.dbExerciseManager.insert(exercise);
    }
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
            if (mapToReturn.size === 0) { //if no exercise corresponds with the substring
                mapToReturn.set("false", "false");
            }
            return mapToReturn;
            /*
            //old version bisogna ritornare una mappa
            var ids:string [] = [];
            var exercises: Exercise [] = [];
            elements.forEach(function (value:string, key:string){
                if(value.search(regex)>=0){
                    ids.push(key);
                }
            });
            for(var i in ids){
                exercises.push(<Exercise>await this.getExercise(ids[i]));
            }
            return exercises;*/
        });
    }
    /*
    //lo usava la vecchia versione di searchExercise
    private async getExercise(id:string):Promise<Data>{
        return await this.dbExerciseManager.read(id);
    }*/
    searchSolution(sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            var mapToReturn = new Map();
            var exerciseKey = yield this.dbExerciseManager.search(sentence);
            //console.log("exerciseKey: ",exerciseKey);
            if (exerciseKey !== "false") {
                var exercise = yield this.dbExerciseManager.read(exerciseKey);
                //console.log("Exercise: ",exercise);
                var solutions = exercise.getSolutions();
                for (let i in solutions) {
                    let key = solutions[i].getKey();
                    if (key !== null) {
                        mapToReturn.set(key, solutions[i].getSolverId());
                    }
                }
                //console.log("mapToReturn: ",mapToReturn);
                return mapToReturn;
            }
            //console.log("nessun esercizio trovato");
            mapToReturn.set("false", "false"); //nessun esercizio trovato
            return mapToReturn;
        });
    }
    getSentence(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var exercise = yield this.dbExerciseManager.read(id);
            return exercise.getSentence();
        });
    }
}
exports.ExerciseClient = ExerciseClient;
//# sourceMappingURL=ExerciseClient.js.map