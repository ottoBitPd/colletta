interface POSManager {
    inputFilePath: string;
    outputFilePath: string;


    setModel():void;
    train():void;
    tag():void;
    getSolutions(sentence: string): any;

}

