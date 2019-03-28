import {Exercise} from './Exercise'
import {POSManager} from "./POSManager";

class ItalianExercise extends Exercise{
    constructor(sentence : string){
        super(sentence);
    }
    getKey() : string{
        return super.getKey();
    }
    getSentence() : string{
        return super.getSentence();
    }
    getPOSManager(): POSManager {
        return super.getPOSManager();
    }
    setKey(key : string) : void{
        super.setKey(key);
    }
    setSentence(sentence : string) : void{
        super.setSentence(sentence);
    }

    autosolve() : any{
       return super.getPOSManager().getSolution(this.getSentence())
    }

    evaluate(correctionID:number, solution:any): number{
        //2 array di tags uno riferito alla soluzione di riferimento esatta

        //prendere la soluzione con quell'ID
        return 1;
    }

    /*
    //forse non serve
    toJSON(): any{
        //json = "1";
        return [];
    }*/
}
export {ItalianExercise};