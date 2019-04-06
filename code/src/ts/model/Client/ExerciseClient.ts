import {DatabaseExerciseManager} from "../DatabaseManager/DatabaseExerciseManager";
import {Exercise} from "../Data/Exercise";
import {Data} from "../Data/Data";
//import {forEach} from "@firebase/util";


class ExerciseClient{
    private dbExerciseManager : DatabaseExerciseManager;
    constructor(){
        this.dbExerciseManager= new DatabaseExerciseManager();
    }

    async autosolve(sentence: string, authorId :string) : Promise<string[]>{
        let exercise = new Exercise(sentence,authorId);
        return exercise.autosolve();
    }

    getSplitSentence(sentence:string) : string []{
        return sentence.split(" ");
    }

    //setSolution(sentence: string , authorId :string, solverId : string, finalTags :string [], topics : string [], difficulty : number) : void {
    insertExercise(sentence: string , authorId :string, solution : any, valutation :any) : void {
        let exercise = new Exercise(sentence, authorId);
        exercise.setSolution(solution[0],solution[1],solution[2],solution[3]);
        exercise.addValutation(valutation[0], valutation[1]);
        this.dbExerciseManager.insert(exercise);
    }
    private async getExercise(id:string):Promise<Data>{
        return await this.dbExerciseManager.read(id);
    }

    async searchExercise(substring:string) : Promise<Exercise[]>{
        var regex= new RegExp(substring,"i");
        var elements = await this.dbExerciseManager.elements();
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
        return exercises;
    }
    //non funziona
    async searchSolution(sentence:string) : Promise<Map<string,string>>{
        //var regex= new RegExp(substring,"i");
        var exerciseKey = await this.dbExerciseManager.search(sentence);
        if(exerciseKey !== "false"){
            var exercise : Data = await this.dbExerciseManager.read(exerciseKey);
            //console.log("Exercise: ",exercise);
            console.log("solution ",(<Exercise>exercise).getSolutions());
        }
        return new Map();
    }
}
export{ExerciseClient}
