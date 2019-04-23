import {POSManager} from '../POSManager/POSManager';
import {HunposManager} from "../POSManager/HunposManager";
import {Data} from "./Data";
import {Solution} from "./Solution";

class Exercise implements Data{
    private sentence: string;
    private authorId: string;
    private newSolution : Solution | null;
    private solutions : Solution [];
    private key: string;
    private hunpos: POSManager;


    constructor( sentence : string, authorId :string) {
        this.sentence = sentence;
        this.key = "-1";
        this.authorId = authorId;
        this.newSolution = null;
        this.solutions = [];
        this.hunpos = new HunposManager();
    }

    getKey(): string {
        return this.key;
    }

    getSentence(): string {
        return this.sentence;
    }

    getPOSManager(): POSManager {
        return this.hunpos;
    }
    getAuthorId(): string {
        return this.authorId;
    }

    setKey(key: string): void {
        this.key=key;
    }

    setSentence(sentence: string): void {
        this.sentence=sentence;
    }

    setSolution(solverId: string, solutionTags: string[],topics : string[], difficulty : number) : void {
        this.newSolution = new Solution(undefined,solverId,solutionTags,topics,difficulty);
    }

    addSolution(key : string, solverId: string, solutionTags: string[], topics: string[],
                difficulty: number, valutations : Map<string,number>,time : number): void {
        this.solutions.push(new Solution(key,solverId, solutionTags, topics, difficulty, valutations, time));
    }

    getSolutions() : Solution []{
        return this.solutions;
    }

    addValutation(teacherID : string, mark : number) {
        if (this.newSolution)
            this.newSolution.addNewMark(teacherID,mark);
        else
            throw new Error("Nessuna soluzione proposta");
    }

    getNewSolution() : Solution | null{
        return this.newSolution;
    }

    autosolve(): any{
        return this.getPOSManager().getSolution(this.getSentence());
    };

    /**
     * This method splits a sentence on spaces and punctuation
     * @returns string [] - an array containing the split sentence
     */
    getSplitSentence() : string []{
        this.myReplace();//adding spaces to split punctation
        let arr = this.sentence.split(new RegExp(" |(?<=')"));
        arr = arr.filter(Boolean);//remove empty string like ''
        return arr;
    }

    /**
     * This method adds spaces to the exercise sentence before and after every punctation symbol
     * @param sentence - a string on which apply replace
     */
    private myReplace() {
        this.sentence = this.sentence.replace(/\-/g," - ");
        this.sentence = this.sentence.replace(/\!/g," ! ");
        this.sentence = this.sentence.replace(/\?/g," ? ");
        this.sentence = this.sentence.replace(/,/g," , ");
        this.sentence = this.sentence.replace(/:/g," : ");
        this.sentence = this.sentence.replace(/;/g," ; ");
        this.sentence = this.sentence.replace(/\//g," / ");
        this.sentence = this.sentence.replace(/\*/g," * ");
        this.sentence = this.sentence.replace(/\(/g," ( ");
        this.sentence = this.sentence.replace(/\)/g," ) ");
        this.sentence = this.sentence.replace(/\[/g," [ ");
        this.sentence = this.sentence.replace(/\]/g," ] ");
        this.sentence = this.sentence.replace(/{/g," { ");
        this.sentence = this.sentence.replace(/}/g," } ");
        this.sentence = this.sentence.replace(/_/g," _ ");
        this.sentence = this.sentence.replace(/`/g," ` ");
        this.sentence = this.sentence.replace(/‘/g," ‘ ");
        this.sentence = this.sentence.replace(/’/g," ’ ");
        this.sentence = this.sentence.replace(/\"/g," \" ");
        this.sentence = this.sentence.replace(/“/g," “ ");
        this.sentence = this.sentence.replace(/”/g," ” ");
        this.sentence = this.sentence.replace(/«/g," « ");
        this.sentence = this.sentence.replace(/»/g," » ");
        this.sentence  = this.sentence.replace(/\s+/g, ' ');//if there are multiple spaces
        this.sentence  = this.sentence.replace(/\s+'/g, '\'');//if there are spaces before '
        let arr = this.sentence.split("");
        for( let i=0; i<arr.length; i++){
            if(i <= arr.length-3 && arr[i]==="." && arr[i+1]==="." && arr[i+2]==="."){
                arr[i]=" ... ";
                arr[i+1]=arr[i+2]=" ";

            }
            else if(arr[i]==="."){
                arr[i] = " . ";
            }
        }
        this.sentence = arr.join("");
    }

    /**
     * This method provides a valutation to the current solution (newSolution) comparing the latter with
     * the solution of the teacherId passed
     * @param teacherID - the id of the teacher who provide the solution which will be compared the current solution
     */
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
