import {POSManager} from '../POSManager/POSManager';
import {HunposManager} from "../POSManager/HunposManager";
import {Data} from "./Data";
import {Solution} from "./Solution";

/*
*   Class to create and manage "Exercise" objects
*/

class Exercise implements Data{
    private sentence: string;
    private authorId: string;
    private newSolution : Solution | null;
    private solutions : Solution [];
    private key: string;
    private hunpos: POSManager;

    /*
    *   Initializes all attributes needed to Exercise object.
    */

    constructor( sentence : string, authorId :string) {
        this.sentence = sentence;
        this.key = "-1";
        this.authorId = authorId;
        this.newSolution = null;
        this.solutions = [];
        this.hunpos = new HunposManager();
    }

    /*
    * This method returns the key of an exercise.
    * @returns { string } returns the exercise key.
    */
    getKey(): string {
        return this.key;
    }

    /*
    * This method returns the sentence of an exercise.
    * @returns { string } returns the exercise sentence.
    */
    getSentence(): string {
        return this.sentence;
    }

    /*
    * This method returns a new POSManager reference.
    * @returns { POSManager } returns the reference.
    */
    getPOSManager(): POSManager {
        return this.hunpos;
    }

    /*
    * This method returns the Id of the exercise author.
    * @returns { string } returns the author Id.
    */
    getAuthorId(): string {
        return this.authorId;
    }

    /*
    * This method modifies a new exercise key.
    * @param key - the new key
    */
    setKey(key: string): void {
        this.key=key;
    }

    /*
    * This method modifies a new exercise sentence.
    * @param sentence - the new sentence
    */
    setSentence(sentence: string): void {
        this.sentence=sentence;
    }

    /*
    * This method modifies an exercise solution.
    * @param solverId - the Id of the user who writes the solution
    * @param solutionTags - the list of solution tags
    * @param topics - the list of solution topics
    * @param difficulty - the grade of difficulty
    */
    setSolution(solverId: string, solutionTags: string[],topics : string[], difficulty : number) : void {
        this.newSolution = new Solution(undefined,solverId,solutionTags,topics,difficulty);
    }

    /*
    * This method add an exercise solution.
    * @param key - the solution key
    * @param solverId - the Id of the user who writes the solution
    * @param solutionTags - the list of solution tags
    * @param topics - the list of solution topics
    * @param difficulty - the grade of difficulty
    * @param valutations - the list of valutations (time and mark)
    * @param time - the date of the solution
    */
    addSolution(key : string, solverId: string, solutionTags: string[], topics: string[],
                difficulty: number, valutations : Map<string,number>,time : number): void {
        this.solutions.push(new Solution(key,solverId, solutionTags, topics, difficulty, valutations, time));
    }

    /*
    * This method returns the solution of the exercise.
    * @returns { Solution[] } returns the list of solution.
    */
    getSolutions() : Solution []{
        return this.solutions;
    }

    /*
    * This method adds a new valutation to an exercise.
    * @param teacherId - the Id of the teacher who evaluates the solution
    * @param mark - the valutation
    */
    addValutation(teacherID : string, mark : number) {
        if (this.newSolution)
            this.newSolution.addNewMark(teacherID,mark);
        else
            throw new Error("Nessuna soluzione proposta");
    }

    /*
    * This method returns the actual solution of the exercise.
    * @returns { Solution | null } returns the actual solution of the exercise if exists.
    */
    getNewSolution() : Solution | null{
        return this.newSolution;
    }

    /*
    * This method returns the automatic solution of the exercise.
    * @returns { any } returns the automatic (Hunpos) solution of the exercise.
    */
    autosolve(): any{
        return this.getPOSManager().getSolution(this.getSentence());
    };

    /*
    * This method returns the splitted sentence of the exercise.
    * @returns { string[] } returns the sentence of the exercise splitted.
    */
    getSplitSentence() : string []{
        //TODO splittare anche punteggiatura ma no apostrofo
        //creare un espressione regolare ed usarla per inserire uno spazio prima dei simboli e di punteggiatura dopo
        //gli apostrofi,
        //poi splittare in base allo spazio.
        return this.sentence.split(" ");
    }

    /*
    * This method evaluates the actual solution of the exercise comparing it to the one given by the teacher with that Id.
    * @returns { Snumber } returns the valutation.
    */
    //da un voto alla soluzione corrente(newSolution) rispetto a solution con quel teacherID
    evaluate(teacherID?: string) : number {
        if(this.newSolution===null){
            return -1;
        }
        else{
            let tags:string [] = [];
            if(teacherID!==undefined){
                const teacherSolution=this.solutions.find(function(element){
                    return element.getSolverId()===teacherID;
                });
                if(teacherSolution===undefined){
                    throw new Error("ID non trovato");
                }
                else{
                    tags=teacherSolution.getSolutionTags();
                }
            }
            else{
                const hunposSolution=this.autosolve();
                for (let i in hunposSolution.sentence) {
                    tags.push(hunposSolution.sentence[i].label);
                }
            }
            return this.newSolution.evaluateSolution(tags);
        }
    }

    toJSON() : any{
        //Do I have to add solutions too? - Perry15
        let exercise: any = {
            "sentence": this.sentence,
            "authorId" : this.authorId,
            "key" : this.key
        };
        return exercise;
    }

}
export {Exercise};
