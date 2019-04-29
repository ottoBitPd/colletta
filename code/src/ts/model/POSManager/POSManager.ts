interface POSManager {

    /**
     * This method sets the model to use
     * @param modelFilePath - the model path
     */
    setModel(modelFilePath:string):void;

    /**
     * This method create a model based on the actual data
     */
    train():void;

    /**
     * This method assigns tags to the sentence words
     * @param input - the sentence to tag
     * @return {string} the reworked sentence with the Hunpos tags
     */
    tag(input : string): Promise<string>;

    /**
     * This method returns the solution for a sentence
     * @param sentence - the sentence to solve
     */
    getSolution(sentence: string): any;

}

export {POSManager};