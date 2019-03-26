import {POSManager} from './POSManager';
import {HunposManager} from "./HunposManager";

abstract class Exercise /*extends Data*/{
    private sentence: string;
    private topics: string [];
    private difficulty: number;
    private key: number;
    private hunpos: POSManager;

    constructor(key : number, sentence : string) {
        this.sentence = sentence;
        this.key = key;
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

    getTopics(): string [] {
        return this.topics;
    }
    getDifficulty() : number{
        return this.difficulty;
    }

    abstract autosolve(): any;

    abstract evaluate(correctionID:number, solution:any) : number;

    abstract  toJSON() : any;
}
export {Exercise};