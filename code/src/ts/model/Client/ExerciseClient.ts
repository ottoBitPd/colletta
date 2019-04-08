
import {DatabaseExerciseManager} from "../DatabaseManager/DatabaseExerciseManager";
import {Exercise} from "../Data/Exercise";
import {Data} from "../Data/Data";

class ExerciseClient{
    private dbExerciseManager : DatabaseExerciseManager;
    constructor(){
        this.dbExerciseManager= new DatabaseExerciseManager();
    }

    public async autosolve(sentence: string, authorId :string) : Promise<string[]>{
        let exercise = new Exercise(sentence,authorId);
        return exercise.autosolve();
    }

    public getSplitSentence(sentence:string) : string []{
        return sentence.split(" ");
    }

    public insertExercise(sentence: string , authorId :string, solution : any, valutation :any) : void {
        let exercise = new Exercise(sentence, authorId);
        exercise.setSolution(solution[0],solution[1],solution[2],solution[3]);
        exercise.addValutation(valutation[0], valutation[1]);
        this.dbExerciseManager.insert(exercise);
    }

    async searchExercise(substring:string) : Promise<Map<string, string>>{
        var regex = new RegExp(substring,"i");
        var elements = await this.dbExerciseManager.elements();//returns a map<id,sentence> of all exercises in the db
        var mapToReturn = new Map<string, string>();
        elements.forEach(function (value:string, key:string){
            if(value.search(regex)>=0){
                mapToReturn.set(key,value);
            }
        });
        if(mapToReturn.size===0){//if no exercise corresponds with the substring
            mapToReturn.set("false","false");
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
    }

    /*
    //lo usava la vecchia versione di searchExercise
    private async getExercise(id:string):Promise<Data>{
        return await this.dbExerciseManager.read(id);
    }*/

    async searchSolution(sentence:string) : Promise<Map<string,string>>{
        var mapToReturn = new Map<string, string>();
        var exerciseKey = await this.dbExerciseManager.search(sentence);
        //console.log("exerciseKey: ",exerciseKey);
        if(exerciseKey !== "false"){
            var exercise : Data = await this.dbExerciseManager.read(exerciseKey);
            //console.log("Exercise: ",exercise);
            var solutions = (<Exercise>exercise).getSolutions();
            for(let i in solutions){
                let key = solutions[i].getKey();
                if(key!==null) {
                    mapToReturn.set(key, solutions[i].getSolverId());
                }
            }
            //console.log("mapToReturn: ",mapToReturn);
            return mapToReturn;
        }
        //console.log("nessun esercizio trovato");
        mapToReturn.set("false","false");//nessun esercizio trovato
        return mapToReturn;
    }

    public async getSentence(id: string): Promise<string> {
        var exercise : Data = await this.dbExerciseManager.read(id);
        return (<Exercise>exercise).getSentence();
    }
}
export{ExerciseClient}
