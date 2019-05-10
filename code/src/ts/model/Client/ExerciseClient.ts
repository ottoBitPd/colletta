import {DatabaseExerciseManager} from "../DatabaseManager/DatabaseExerciseManager";
import {Exercise} from "../Data/Exercise";
import {Data} from "../Data/Data";
import {Solution} from "../Data/Solution";
/**
 *   Class to create and manage "ExerciseClient" objects
 */

/**
 * Class to use the exercise functionality exposed into the model
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

    /**
     * This method inserts a new exercise into the database
     * @param sentence - the exercise sentence
     * @param authorId - the id of the exercise creator
     * @param solution - the solution of the exercise
     * @param valutation - the valutation of the solution
     * @param _public - the state (public/private) of the solution
     */
    public insertExercise(sentence: string , authorId :string, solution : any, valutation :any, _public : boolean = false) : void {
        let exercise = new Exercise(sentence, authorId);
        exercise.setSolution(solution[0],solution[1],solution[2],solution[3],_public);
        if (valutation !== {})
            exercise.addValutation(valutation[0], valutation[1]);
        this.dbExerciseManager.insert(exercise);
    }

    /**
     * This method looks for exercises into the database
     * @param substring - part of the sentence to look for
     * @returns {Map<string, string>} a map key-sentence of the search results
     */
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
     * This method looks for solutions written by a specific user into the database
     * @param sentence - the sentence of which we want the solutions
     * @param solverId - the id of the user who wrote the solution
     * @returns {any[]} the list of solutions
     */
    async searchSolution(sentence:string,solverId: string) : Promise<any[]>{
        let result : any[] = [];
        let exerciseKey = await this.dbExerciseManager.search(sentence);
        if(exerciseKey !== "false") {
            let exercise: Data = await this.dbExerciseManager.read(exerciseKey);
            let solutions = (<Exercise>exercise).getSolutions();
            for(let value of solutions) {
                if (value.getSolverId() === solverId) {
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

    public async searchAllSolution() : Promise<any[]> {
        let result: any[] = [];
        var elements = await this.dbExerciseManager.elements();
        for (let entry of Array.from(elements)) {
            let key = entry[0];
            let exercise: Data = await this.dbExerciseManager.read(key);
            let phrase = (<Exercise>exercise).getSentence();
            let solutions = (<Exercise>exercise).getSolutions();
            for (let sol of solutions) {
                let val:any[] = [];
                for (let vals of sol.getValutations()!.entries()) {
                    val = [vals[0], vals[1]];
                }

                result.push(
                    {
                        "id": (<Exercise>exercise).getKey(),
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
        return result;
    }

    /**
     * This method returns the sentence of an exercise.
     * @param id - the id of the exercise
     * @returns { string } returns the exercise sentence.
     */
    public async getSentence(id: string): Promise<string> {
        let exercise : Data = await this.dbExerciseManager.read(id);
        return (<Exercise>exercise).getSentence();
    }

    /**
     * This method evaluates a solution of an exercise
     * @param newSolution - the solution to evaluate
     * @param solverId - the id of the user who wrote the solution
     * @param topics - the list of arguments of the exercise
     * @param sentence - the sentence of the exercise
     * @param difficulty - the difficulty of the exercise
     * @param teacherId - the id of the teacher who gave the solution
     */
    public async evaluate(newSolution : string[],solverId : string,topics : string[], sentence : string,
                          difficulty : number ,teacherId? : string) : Promise<number> {
        let exercise: Exercise;

        if (teacherId !== undefined)
            exercise = <Exercise>(await this.dbExerciseManager.read(await this.dbExerciseManager.search(sentence)));
        else
            exercise = new Exercise(sentence, solverId);

        exercise.setSolution(solverId, newSolution, topics, difficulty);
        return await exercise.evaluate(teacherId);
    }

    /**
     * This method returns the exercise informations
     * @param id - the id of the exercise of which we want to know data
     */
    public async getExerciseData(id : string) : Promise<any> {
        const exercise : Data = await this.dbExerciseManager.read(id);
        return (<Exercise>exercise).toJSON();
    }

    /**
     * This method returns an array of exercises done by a student whose id has passed
     * @param solverId - the id of the student
     * @returns Exercise[] - array containing the result
     */
    private async findSolvedExercises(solverId :string) :Promise<Exercise[]>{
        var elements = await this.dbExerciseManager.elements();//returns a map<id,sentence> of all exercises in the db
        var toReturn = [];
        for (let entry of Array.from(elements.entries())) {
            let key = entry[0];

            let e = await this.dbExerciseManager.read(key);
            let s = await (<Exercise> e).getSolutions();

            for(let i in s){
                if(s[i].getSolverId()===solverId){
                    toReturn.push((<Exercise> e));
                }
            }
        }
        return toReturn;
    }

    /**
     * This method returns an array of JSON representing all the exercises inserted by a user whose id it is passed as parameter
     * @param authorId
     * @returns {JSON []} - an array of JSON representing all the exercises inserted by a user
     */
    public async findExercises(authorId :string) :Promise<any[]>{
        var elements = await this.dbExerciseManager.elements();//returns a map<id,sentence> of all exercises in the db
        var toReturn = [];
        for (let entry of Array.from(elements.entries())) {
            let key = entry[0];

            let e = await this.dbExerciseManager.read(key);
            if((<Exercise> e).getAuthorId()===authorId){
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
        let exercises = await this.findSolvedExercises(studentId);
        exercises.forEach((currentValue: Exercise, index: number) => {
            solutions=solutions.concat(currentValue.getSolutions().filter((sol) => sol.getSolverId() === studentId
                && sol.getValutations() && sol.getValutations()!.size > 0));
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

    public async updateSolution(exerciseId : string, solutionId : string, solution : any) : Promise<void> {

        await this.dbExerciseManager.update('data/sentences/'+exerciseId+'/solutions/'+solutionId+'/tags', solution.tags);
        await this.dbExerciseManager.update('data/sentences/'+exerciseId+'/solutions/'+solutionId+'/topics', solution.topics);
        await this.dbExerciseManager.update('data/sentences/'+exerciseId+'/solutions/'+solutionId+'/public', solution._public);
        await this.dbExerciseManager.update('data/sentences/'+exerciseId+'/solutions/'+solutionId+'/difficulty', solution.difficulty);

    }

}
export{ExerciseClient}
