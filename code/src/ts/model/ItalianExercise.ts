import {Exercise} from './Exercise'

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
    setKey(key : number) : void{
        super.setKey(key);
    }
    setSentence(sentence : string) : void{
        super.setSentence(sentence);
    }

    autosolve() : any{
       return 1;
    }

    evaluate(): any{
        return 1;
    }

    toJSON(): any{
        return 1;
    }

    /**
     * Converts solution tags to italian.
     * @param tags - array of tag coming from hunpos solution
     * @returns {Array} an array containing the italian translation for every tag
     */


}
export {ItalianExercise};