import {Exercise} from './Exercise'
import {POSManager} from "./POSManager";

class ItalianExercise extends Exercise{
    constructor(key : number, sentence : string){
        super(key, sentence);
    }
    getKey() : number{
        return super.getKey();
    }
    getSentence() : string{
        return super.getSentence();
    }
    getPOSManager(): POSManager {
        return super.getPOSManager();
    }
    setKey(key : number) : void{
        super.setKey(key);
    }
    setSentence(sentence : string) : void{
        super.setSentence(sentence);
    }

    autosolve() : any{
       return super.getPOSManager().getSolution(this.getSentence())
    }

    evaluate(correctionID:number, solution:any): number{

        return 1;
    }

    toJSON(): any{
        return 1;
    }
}
export {ItalianExercise};