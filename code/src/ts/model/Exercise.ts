import {POSManager} from './POSManager';
import {HunposManager} from "./HunposManager";
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

    addSolution(key : number, solverId: string, solutionTags: string[], topics: string[],
                difficulty: number, valutations : Map<string,number>,time : Date): void {
        this.solutions.push(new Solution(key,solverId, solutionTags, topics, difficulty, valutations,time));
    }
    getSolutions() : Solution []{
        return this.solutions;
    }
    addValutation(teacherID : string, mark : number) {
        if (this.newSolution)
            this.newSolution.addNewMark(teacherID,mark);
    }
    getNewSolution() : Solution | null{
        return this.newSolution;
    }

    autosolve(): any{
        return this.getPOSManager().getSolution(this.getSentence());
    };

    evaluate() : number {return 1;};

    toJSON() : any{
        return 1;
    }
}
export {Exercise};
