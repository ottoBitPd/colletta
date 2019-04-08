//<reference path="POSManager.ts"/>

import {POSManager} from "./POSManager";
import * as fileSystem from "fs";


class HunposManager implements POSManager{
    private modelFilePath:string;
    private inputFilePath:string;
    private outputFilePath:string;

    constructor() {
        //this.train();

        //scommentare per mac/linux
        this.inputFilePath='src/ts/presenter/hunpos/input.txt';
        this.outputFilePath='src/ts/presenter/hunpos/output.txt';
        this.modelFilePath='src/ts/presenter/hunpos/italian_model';
        //scommentare per windows
<<<<<<< HEAD
      /*  this.inputFilePath='src\\ts\\presenter\\hunpos\\input.txt';
=======
        /*this.inputFilePath='src\\ts\\presenter\\hunpos\\input.txt';
>>>>>>> f28381dfeb4ddc14f787e13250c03586e939354a
        this.outputFilePath='src\\ts\\presenter\\hunpos\\output.txt';
        this.modelFilePath='src\\ts\\presenter\\hunpos\\italian_model';*/
    }

    setModel(modelFilePath:string):void{
        //this.modelFilePath=modelFilePath;
    };

    buildInputFile(sentence:string):void{
        var words = sentence.split(" ");

        fileSystem.writeFile(this.inputFilePath,'',() => console.log('done'));
        for(let i = 0; i < words.length; i++) {
            fileSystem.appendFileSync( this.inputFilePath, words[i] + "\n");
            /*if(i<(words.length-1)){
                fileSystem.appendFileSync('input.txt', '\n', (err) => {    //controllo per non far mettere l'ultimo invio
                    if (err) throw err;
                });
            }*/
        }
    };

    buildSolution():any{
        var wordSolArray = fileSystem.readFileSync(this.outputFilePath).toString().split("\n");
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
        fileSystem.writeFileSync(this.inputFilePath, "");
        return obj;
    };

    getSolution(modelFilePath:string):any{
        this.buildInputFile(modelFilePath);
        //this.train();
        this.tag();
        return this.buildSolution();
    };

     train():void{
         const shell = require('shelljs');
         //scommentare per windows

      //   this.shell.exec('src\\ts\\presenter\\hunpos\\hunpos-train ' + this.modelFilePath + '< src\\ts\\presenter\\hunpos\\train');
         //scommentare per mac/linux
         this.shell.exec('./src/ts/presenter/hunpos/hunpos-train ' + this.modelFilePath + '< ./src/ts/presenter/hunpos/train');
     };
     tag():void{
         //scommentare per windows
         //this.shell.exec('src\\ts\\presenter\\hunpos\\hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
         //scommentare per mac/linux
         this.shell.exec('./src/ts/presenter/hunpos/hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);

     };
}

export {HunposManager};