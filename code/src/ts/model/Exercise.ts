import {POSManager} from './POSManager';
import {HunposManager} from "./HunposManager";
import {Data} from "./Data";

abstract class Exercise implements Data{
    private sentence: string;
    private topics: string [];
    private difficulty: number;
    private solutionTags: string [];
    private key: number;
    private hunpos: POSManager;

    constructor( sentence : string) {
        this.sentence = sentence;
        this.key = -1;
        this.solutionTags = [];
        this.topics = [];
        this.difficulty = 0;
        this.hunpos = new HunposManager();
    }

    getKey(): number {
        return this.key;
    }

    getSentence(): string {
        return this.sentence;
    }

    getPOSManager(): POSManager {
        return this.hunpos;
    }

    setKey(key: number): void {
        this.key=key;
    }

    setSentence(sentence: string): void {
        this.sentence=sentence;
    }

    setTopics(topics: string []): void {
        this.topics=topics;
    }

    setDifficulty(difficulty : number): void {
        this.difficulty=difficulty;
    }
    setSolutionTags(solutionTags : string []) : void{
        this.solutionTags=solutionTags;
    }
    getTopics(): string [] {
        return this.topics;
    }
    getDifficulty() : number{
        return this.difficulty;
    }
    getSolutionTags() : string []{
        return this.solutionTags;
    }

    abstract autosolve(): any;

    abstract evaluate(correctionID:number, solution:any) : number;

    abstract  toJSON() : any;
}
export {Exercise};