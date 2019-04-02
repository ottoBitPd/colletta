import {DatabaseExerciseManager} from "./DatabaseExerciseManager";

class ExerciseClient{
    private dbExerciseManager : DatabaseExerciseManager;
    constructor(){
        this.dbExerciseManager= new DatabaseExerciseManager();
    }

    getDbExerciseManager(): DatabaseExerciseManager {
        return this.dbExerciseManager;
    }
    insertNewExercise(){

    }
}
export{ExerciseClient}