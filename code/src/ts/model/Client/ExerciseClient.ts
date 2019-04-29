import {DatabaseExerciseManager} from "../DatabaseManager/DatabaseExerciseManager";
import {Exercise} from "../Data/Exercise";
import {Data} from "../Data/Data";
import {Solution} from "../Data/Solution";
/**
 *   Class to create and manage "ExerciseClient" objects
 */

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
        let autosolution = await exercise.autosolve();
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
       let tmp = new Exercise(sentence, "xxx");
       return tmp.getSplitSentence();
    }

    public insertExercise(sentence: string , authorId :string, solution : any, valutation :any, _public? : boolean) : void {
        let exercise = new Exercise(sentence, authorId);
        exercise.setSolution(solution[0],solution[1],solution[2],solution[3],_public||false);
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
    }

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

    async searchSolution(sentence:string,solverID: string) : Promise<any[]>{
        let result : any[] = [];
        let exerciseKey = await this.dbExerciseManager.search(sentence);
        //console.log("exerciseKey: ",exerciseKey);
        if(exerciseKey !== "false") {
            let exercise: Data = await this.dbExerciseManager.read(exerciseKey);
            //console.log("Exercise: ",exercise);
            let solutions = (<Exercise>exercise).getSolutions();
            for(let value of solutions) {
                if (value.getSolverId() === solverID) {
                    result.push(
                        {
                            "id": value.getKey(),
                            "userID": value.getSolverId(),
                            "tags": value.getSolutionTags(),
                            "time": value.getTime(),
                            "difficulty": value.getDifficulty(),
                            "topics": value.getTopics(),
                            "_public": value.getPublic()
                        });
                }
            }
        }
        return result;
    }

    async searchAllSolution(sentence:string) : Promise<any[]> {
        let result: any[] = [];
        var regex= new RegExp(sentence, "i");
        var elements = await this.dbExerciseManager.elements();
        for (let entry of Array.from(elements)) {
            let key=entry[0];
            let value = entry[1];

            if(value.search(regex)>=0){
                let exercise: Data = await this.dbExerciseManager.read(key);
                let phrase = (<Exercise>exercise).getSentence();
                let solutions = (<Exercise>exercise).getSolutions();
                for (let sol of solutions) {
                    let val = "";
                    // @ts-ignore
                    for (let vals of sol.getValutations().entries()) {
                        val = val + vals[0] + "=>" + vals[1];
                    }
                    result.push(
                        {
                            "sentence": phrase,
                            "solverID": sol.getSolverId(),
                            "tags": sol.getSolutionTags(),
                            "time": sol.getTime(),
                            "difficulty": sol.getDifficulty(),
                            "topics": sol.getTopics(),
                            "valutations": val
                        });
                }
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
        return await exercise.evaluate(teacherID);
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
     * This method returns an array of JSON representing all the exercises inserted by a user whose id it is passed as parameter
     * @param id
     * @returns {JSON []} - an array of JSON representing all the exercises inserted by a user
     */
    public async getExercisesByAuthor(id :string) :Promise<any[]>{
        var elements = await this.dbExerciseManager.elements();//returns a map<id,sentence> of all exercises in the db
        var toReturn = [];
        for (let entry of Array.from(elements.entries())) {
            let key = entry[0];
            //let value = entry[1];
            let e = await this.dbExerciseManager.read(key);
            if((<Exercise> e).getAuthorId()===id){
                toReturn.push((<Exercise> e).toJSON());
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
