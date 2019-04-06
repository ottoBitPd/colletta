//<reference path="POSManager.ts"/>

import {POSManager} from "./POSManager";
class HunposManager implements POSManager{
    private fileSystem : any;
    private shell:any;
    private modelFilePath:string;
    private inputFilePath:string;
    private outputFilePath:string;

    constructor() {
        this.fileSystem = require('fs');
        this.shell = require('shelljs');
        //this.train();

        //scommentare per mac/linux
        //this.inputFilePath='src/ts/controller/hunpos/input.txt';
        //this.outputFilePath='src/ts/controller/hunpos/output.txt';
        //this.modelFilePath='src/ts/controller/hunpos/italian_model';
        //scommentare per windows
        this.inputFilePath='src\\ts\\controller\\hunpos\\input.txt';
        this.outputFilePath='src\\ts\\controller\\hunpos\\output.txt';
        this.modelFilePath='src\\ts\\controller\\hunpos\\italian_model';
    }

    setModel(modelFilePath:string):void{
        //this.modelFilePath=modelFilePath;
    };

    buildInputFile(sentence:string):void{
        var words = sentence.split(" ");
        this.fileSystem.writeFile(this.inputFilePath,'',() => console.log('done'));
        for(let i = 0; i < words.length; i++) {
            this.fileSystem.appendFileSync( this.inputFilePath, words[i] + "\n", (err:any) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
            /*if(i<(words.length-1)){
                fileSystem.appendFileSync('input.txt', '\n', (err) => {    //controllo per non far mettere l'ultimo invio
                    if (err) throw err;
                });
            }*/
        }
    };

    buildSolution():any{
        var wordSolArray = this.fileSystem.readFileSync(this.outputFilePath).toString().split("\n");
        console.log("arr: "+wordSolArray);
        let obj : any= {
            sentence: []
        };
        let i=0;
        while(wordSolArray[i]!==""){
            var wordLab = wordSolArray[i].split("\t");
            obj.sentence.push({word: wordLab[0], label: wordLab[1]});
            i++;
        }
        this.fileSystem.writeFileSync(this.inputFilePath, "");
        return obj;
    };

    getSolution(modelFilePath:string):any{
        this.buildInputFile(modelFilePath);
        //this.train();
        this.tag();
        return this.buildSolution();
    };

     train():void{
         //scommentare per windows
         this.shell.exec('src\\ts\\controller\\hunpos\\hunpos-train ' + this.modelFilePath + '< src\\ts\\controller\\hunpos\\train');
         //scommentare per mac/linux
         //this.shell.exec('./src/ts/controller/hunpos/hunpos-train ' + this.modelFilePath + '< ./src/ts/controller/hunpos/train');
     };
     tag():void{
         //scommentare per windows
         this.shell.exec('src\\ts\\controller\\hunpos\\hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
         //scommentare per mac/linux
         //this.shell.exec('./src/ts/controller/hunpos/hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
     };
}

export {HunposManager};