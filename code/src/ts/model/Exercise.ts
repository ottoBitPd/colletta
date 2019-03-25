import {POSManager} from './POSManager';

abstract class Exercise {
    private sentence: string;
    private key: number;
    private hunpos: POSManager;

    constructor(key : number, sentence : string) {
        this.sentence = sentence;
        this.key = key;
        this.hunpos = new POSManager();
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

    abstract autosolve(): any;

    abstract evaluate() : any;

    protected toJSON() : any;


}
export {Exercise};