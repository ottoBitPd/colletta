import {DatabaseExerciseManager} from "./DatabaseExerciseManager";
import {Exercise} from "./Exercise";
import {Data} from "./Data";
import {User} from "./User";

class ExerciseClient{
    private dbExerciseManager : DatabaseExerciseManager;
    constructor(){
        this.dbExerciseManager= new DatabaseExerciseManager();
        this.exercise = undefined;
    }

    getDbExerciseManager(): DatabaseExerciseManager {
        return this.dbExerciseManager;
    }

    async solveExrercise(sentence: string) : Promise<string[]>{
        let exerciseId = await this.dbExerciseManager.search(sentence);
        let exercise : Data | null= await this.dbExerciseManager.read(exerciseId);
        return (<Exercise>exercise).autosolve();

    }
    getSentenceSplitted() : string []{
        let words = [];
        if(this.exercise)
            return this.exercise.getSenteceSplitted();
        return ;
    }
    get

    insertNewExercise();
    /*setSolution("solverIdValue",finalTags,this.convertTopics(request.body.topics),request.body.difficulty);
    addValutation("teacherIdValue",10);//valori di prova*/
}
export{ExerciseClient}