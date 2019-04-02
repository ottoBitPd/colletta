import {DatabaseExerciseManager} from "./DatabaseExerciseManager";
import {Exercise} from "./Exercise";


class ExerciseClient{
    private dbExerciseManager : DatabaseExerciseManager;
    constructor(){
        this.dbExerciseManager= new DatabaseExerciseManager();
    }

    getDbExerciseManager(): DatabaseExerciseManager {
        return this.dbExerciseManager;
    }

    async autosolve(sentence: string, author :string) : Promise<string[]>{
        /*let exerciseId = await this.dbExerciseManager.search(sentence);
        let exercise : Data | null= await this.dbExerciseManager.read(exerciseId);*/
        let exercise = new Exercise(sentence,author);
        return exercise.autosolve();

    }

    async read(exerciseId :string){
        return await this.dbExerciseManager.read(exerciseId);
    }

    async insertExercise(sentence :string , author : string, solution=[], topics=[]){
        let ex = new Exercise(sentence,author);
        ex.setSolution(author,solution,topics,-1);
        await this.dbExerciseManager.insert(ex);
    }

    getSentenceSplitted(sentence:string) : string []{
        return sentence.split(" ");
    }

    setSolution(sentence: string , author :string, solverId : string,finalTags :string [], topics : string [], difficulty : number) {
        let exercise = new Exercise(sentence, author);
        exercise.setSolution(solverId,finalTags,topics,difficulty);
        this.dbExerciseManager.insert(exercise);
    }
    addValutation(sentence: string , author :string, userId : string, mark : number){
        let exercise = new Exercise(sentence, author);
        exercise.addValutation(userId, mark);
    }
}
export{ExerciseClient}