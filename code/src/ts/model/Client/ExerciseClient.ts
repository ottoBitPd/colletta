import {DatabaseExerciseManager} from "../DatabaseManager/DatabaseExerciseManager";
import {Exercise} from "../Data/Exercise";
import {Data} from "../Data/Data";
import {Solution} from "../Data/Solution";

class ExerciseClient{
    private dbExerciseManager : DatabaseExerciseManager;
    constructor(){
        this.dbExerciseManager= new DatabaseExerciseManager();
    }
    /**
     * This method returns an array of exercises done by a student whose id has passed
     * @param sentence - the sentence that must to be solve
     * @param authorId - the author's id who write the sentence
     * @returns Promise<string[]> - array containing the result
     */
    public async autosolve(sentence: string, authorId :string) : Promise<string[]>{
        let exercise = new Exercise(sentence,authorId);
        let autosolution = exercise.autosolve();
        let result = [];
        for (let value of autosolution.sentence){
            result.push(value.label);
        }
        return result;
    }

    /**
     * This method splits a sentence on spaces and punctuation
     * @param sentence - a sentence that must to be splitted
     * @returns string [] - an array containing the split sentence
     */
    public getSplitSentence(sentence:string) : string []{
        let tmp = new Exercise(sentence,"xxx");
        return tmp.getSplitSentence();
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

    /**
     *
     * @param sentence
     * @param solverID
     * @return a JSON of this form
     *          {
     *              "id" : solverID,
     *              "tags" : solutionTags,
     *              "time" : solutionTime
     *          }
     */
    async searchSolution(sentence:string,solverID: string) : Promise<any[]>{/*
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
        return mapToReturn;*/

        let result : any[] = [];
        let exerciseKey = await this.dbExerciseManager.search(sentence);
        //console.log("exerciseKey: ",exerciseKey);
        if(exerciseKey !== "false") {
            let exercise: Data = await this.dbExerciseManager.read(exerciseKey);
            //console.log("Exercise: ",exercise);
            let solutions = (<Exercise>exercise).getSolutions();
            for(let value of solutions) {
                if (value.getSolverId() === solverID)
                    result.push(
                        {
                            "id" : value.getKey(),
                            "userID" : value.getSolverId(),
                            "tags" : value.getSolutionTags(),
                            "time" : value.getTime(),
                            "difficulty" : value.getDifficulty(),
                            "topics" : value.getTopics()
                        });
            }
        }
        return result;
    }

    public async getSentence(id: string): Promise<string> {
        var exercise : Data = await this.dbExerciseManager.read(id);
        //console.log(exercise);
        return (<Exercise>exercise).getSentence();
    }

    public async evaluate(newSolution : string[],solverID : string,topics : string[], sentence : string, difficulty : number ,teacherID? : string) : Promise<number> {
        let exercise: Exercise;

        if (teacherID !== undefined)
            exercise = <Exercise>(await this.dbExerciseManager.read(await this.dbExerciseManager.search(sentence)));
        else
            exercise = new Exercise(sentence, solverID);

        exercise.setSolution(solverID, newSolution, topics, difficulty);
        return exercise.evaluate(teacherID);
    }

    public async getExerciseData(id:string) : Promise<any> {
        const exercise : Data = await this.dbExerciseManager.read(id);
        let exerciseData = (<Exercise>exercise).toJSON();
        return exerciseData;
    }

    /**
     * This method returns an array of exercises done by a student whose id has passed
     * @param id - the id of the student
     * @returns Exercise[] - array containing the result
     */
    private async getExercisesByStudent(id :string) :Promise<Exercise[]>{
        var elements = await this.dbExerciseManager.elements();//returns a map<id,sentence> of all exercises in the db
        var toReturn = [];
        for (let entry of Array.from(elements.entries())) {
            let key = entry[0];
            //let value = entry[1];
            let e = await this.dbExerciseManager.read(key);
            let s = await (<Exercise> e).getSolutions();
            for(let i in s){
                if(s[i].getSolverId()===id){
                    toReturn.push((<Exercise> e));
                }
            }
        }
        return toReturn;
    }
    /**
     * This method receives an array of exercises and calculate the average of all valutations obtained by the student
     * @param studentId - a string representing the ID of a student
     * @returns Map<number,number> - a map containing the date of the solution given and the valutation obtained
     */
    public async getStudentAverage(studentId: string) : Promise<Map<number,number>> {
        let averageMap = new Map<number, number>();
        let solutions: Solution[] = [];
        let exercises = await this.getExercisesByStudent(studentId);
        exercises.forEach((currentValue: Exercise, index: number) => {
            solutions=solutions.concat(currentValue.getSolutions().filter((sol) => sol.getSolverId() === studentId));
        });
        let  sumTotal = 0; var i = 0;
        //sort solutions
        solutions.sort((a,b)=>{
            let x = a.getTime();
            let y = b.getTime();
            if (x && y)
                return x - y;
            return 0;
        });

        solutions.forEach((currentValue: Solution, index: number) => {
            let sumSingleSolution = 0;
            currentValue.getValutations()!.forEach((value: number,key: string) => {
                sumSingleSolution+=value;
                i++;
            });
            sumTotal+=sumSingleSolution;
            let media=sumTotal/i;
            averageMap.set(currentValue.getTime()!, media);
        });
        return averageMap;
    }

}
export{ExerciseClient}
