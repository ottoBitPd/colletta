enum Difficulty {
    veryeasy =1,
    easy = 2,
    normal = 3,
    hard = 4,
    veryhard = 5,
}

/*
*   Class to create and manage "Solution" objects
*/
class Solution {
    private key : string | null; // chiave univoca della soluzione
    private solverId : string;//id dell'autore della soluzione
    private solutionTags: string [];//soluzione proposta
    private topics: string [] | null;//gli argomenti della soluzione
    private difficulty: Difficulty | null;//la difficoltà dell'esercizio
    private valutations : Map<string,number> | null; // coppie di valutazioni con chiave insegnante e valore la valutazione ottenuta
    private time : number | null;

    /*
    *   Initializes all attributes needed to Solution object.
    */
    // @ts-ignore
    constructor(key? : string, solverId: string, solutionTags: string[], topics? : string[], difficulty? : Difficulty, valutations? : Map<string,number>, time? : number) {
        this.key = key || null;
        this.solverId = solverId;
        this.solutionTags = solutionTags;
        this.topics = topics || null;
        this.difficulty = difficulty|| null;
        this.valutations = valutations|| null;
        this.time = time || null;
    }
    // @ts-ignore
    constructor();
    /*constructor() {
        this.solverId = "-1";
        this.solutionTags = [];
        this.correctionTags = [];
        this.teacherId = "-1";
        this.topics = [];
        this.difficulty = 1;
    }*/

    /*
    * This method returns the key of a solution.
    * @returns { string | null } returns the solution key if exists.
    */
    getKey(): string | null{
        return this.key;
    }

    /*
    * This method returns the Id of the solution author.
    * @returns { string } returns the solver Id.
    */
    getSolverId(): string {
        return this.solverId;
    }

    /*
    * This method returns the topics of the solution.
    * @returns { string[] } returns the solution topics list.
    */
    getTopics(): string[] | null {
        return this.topics;
    }

    /*
    * This method returns the difficulty grade of the solution.
    * @returns { number | null } returns the solution grade of difficulty if exists.
    */
    getDifficulty() : number | null{
        return this.difficulty;
    }

    /*
    * This method returns the tags of the solution.
    * @returns { string[] } returns the solution tags list.
    */
    getSolutionTags() : string []{
        return this.solutionTags;
    }

    /*
    * This method returns the valutations of the solution.
    * @returns { Map<string, number> | null } returns the solution valutations if exist.
    */
    getValutations(): Map<string, number> | null {
        return this.valutations;
    }

    JSONValutations() : any {
        let result = "{";
        if (this.valutations){
            this.valutations.forEach((value, key) => {
                result += '"' + key +'" : '+value+",";
            });
         }
        if (result !== "{")
            result = result.substr(0,result.length-1);
        result += "}";
        return JSON.parse(result);
    }

    /*
    * This method returns the date of the solution.
    * @returns { number | null } returns the solution date if exists.
    */
    getTime(): number | null{
        return this.time;
    }

    /*
    * This method returns adds a new mark to solution.
    * @param teacherID - the Id of the teacher who assigns the valutation
    * @param mark - the valutation to add
    */
    addNewMark(teacherID : string, mark : number) {
        if (!this.valutations)
            this.valutations = new Map<string, number>();
        this.valutations.set(teacherID,mark);
    }

    /*
    * This method returns a numeric valutation of the solution.
    * @param tags - the tag list of the solution to evaluate
    * @returns { number } returns the valutation.
    */
    evaluateSolution(tags: string []):number{
        var rightTagsNumber=0;
        let mySolutionTags=this.getSolutionTags();
        for(let j =0; j<mySolutionTags.length;j++){
            if(mySolutionTags[j]===tags[j]){
                rightTagsNumber++;
            }
        }
        return ((rightTagsNumber*10)/mySolutionTags.length);
    }
}
export {Solution};