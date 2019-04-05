import {DatabaseExerciseManager} from "./DatabaseExerciseManager";
import {Exercise} from "./Exercise";
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

    async insertExercise(sentence :string , authorId : string, solution=[], topics=[]){
        let ex = new Exercise(sentence,authorId);
        ex.setSolution(authorId,solution,topics,-1);
        await this.dbExerciseManager.insert(ex);
    }

    getSplitSentence(sentence:string) : string []{
        return sentence.split(" ");
    }

    setSolution(sentence: string , authorId :string, solverId : string, finalTags :string [], topics : string [], difficulty : number) : void {
        let exercise = new Exercise(sentence, authorId);
        exercise.setSolution(solverId,finalTags,topics,difficulty);
        this.dbExerciseManager.insert(exercise);
    }
    addValutation(sentence: string , authorId :string, userId : string, mark : number) : void {
        let exercise = new Exercise(sentence, authorId);
        exercise.addValutation(userId, mark);
    }

    async getExercise(id:string):Promise<Exercise>{
        return await this.dbExerciseManager.read(id);
    }

    async searchExercise(substring:string):Promise<Exercise[]>{
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
            exercises.push(await this.getExercise(ids[i]));
        }
        return exercises;
    }
}
export{ExerciseClient}
