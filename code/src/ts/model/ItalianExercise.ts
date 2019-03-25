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

    autosolve() : any;

    evaluate(): any;

    protected toJSON(): any;

    /**
     * Converts solution tags to italian.
     * @param tags - array of tag coming from hunpos solution
     * @returns {Array} an array containing the italian translation for every tag
     */


}
export {ItalianExercise};