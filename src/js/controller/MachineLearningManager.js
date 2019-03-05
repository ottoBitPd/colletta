class MachineLearningManager{
    constructor(){
        if(this.constructor === MachineLearningManager){
            throw new TypeError("Cannot construct abstract class");
        }
    }

    /**
     * This method provide the hunpos solution for a sentence passed as parameter
     * @param sentence - the sentence to correct
     * @returns {json} json object containing the hunpos solution for the sentence
     */
    getHunposSolution(sentence){
        throw new TypeError("Cannot call abstract method");
    }
}
module.exports=MachineLearningManager;