interface POSManager {

    setModel(modelFilePath:string):void;
    train():void;
    tag(input : string): Promise<string>;
    getSolution(sentence: string): any;

}

export {POSManager};