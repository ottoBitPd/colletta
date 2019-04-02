import {DatabaseExerciseManager} from "./DatabaseExerciseManager";
import {Exercise} from "./Exercise";


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

    getSplittedSentence(sentence:string) : string []{
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
}
export{ExerciseClient}