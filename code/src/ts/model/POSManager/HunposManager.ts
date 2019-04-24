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
        /*this.inputFilePath='src\\ts\\presenter\\hunpos\\input.txt';
        this.outputFilePath='src\\ts\\presenter\\hunpos\\output.txt';
        this.modelFilePath='src\\ts\\presenter\\hunpos\\italian_model';*/
    }

    setModel(modelFilePath:string):void{
        this.modelFilePath=modelFilePath;
    };

    private buildInputFile(sentence:string):void{
        var words = this.splitSentence(sentence);
        //console.log("words: ",words);
        fileSystem.writeFile(this.inputFilePath,'',() => console.log('done'));
        for(let i = 0; i < words.length; i++) {
            //console.log("scrivo: ",words[i]);
            fileSystem.appendFileSync( this.inputFilePath, words[i] + "\n");
            /*if(i<(words.length-1)){
                fileSystem.appendFileSync('input.txt', '\n', (err) => {    //controllo per non far mettere l'ultimo invio
                    if (err) throw err;
                });
            }*/
        }
    };

    private buildSolution():any{
        var wordSolArray = fileSystem.readFileSync(this.outputFilePath).toString().split("\n");
        //console.log("leggo: "+wordSolArray);
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
        //console.log("obj: ",obj);
        return obj;
    };

    getSolution(sentence:string):any{
        //console.log("sentenceHunpos: ",sentence);
        this.buildInputFile(sentence);
        //this.train();
        this.tag();
        return this.buildSolution();
    };

    train():void{
        const shell = require('shelljs');
        //scommentare per windows
        //shell.exec('src\\ts\\presenter\\hunpos\\hunpos-train ' + this.modelFilePath + '< src\\ts\\presenter\\hunpos\\train');
        //scommentare per mac/linux
        shell.exec('./src/ts/presenter/hunpos/hunpos-train ' + this.modelFilePath + '< ./src/ts/presenter/hunpos/train');
    };

    tag():void{
        const shell = require('shelljs');
        //scommentare per windows
        //shell.exec('src\\ts\\presenter\\hunpos\\hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
        //scommentare per mac/linux
        shell.exec('./src/ts/presenter/hunpos/hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
    };

    /**
     * This method splits a sentence on spaces and punctuation
     * @returns string [] - an array containing the split sentence
     */
    private splitSentence(sentence: string) : string []{
        let ret = sentence;
        ret = ret.replace(/\-/g," - ");
        ret = ret.replace(/\!/g," ! ");
        ret = ret.replace(/\?/g," ? ");
        ret = ret.replace(/,/g," , ");
        ret = ret.replace(/:/g," : ");
        ret = ret.replace(/;/g," ; ");
        ret = ret.replace(/\//g," / ");
        ret = ret.replace(/\*/g," * ");
        ret = ret.replace(/\(/g," ( ");
        ret = ret.replace(/\)/g," ) ");
        ret = ret.replace(/\[/g," [ ");
        ret = ret.replace(/\]/g," ] ");
        ret = ret.replace(/{/g," { ");
        ret = ret.replace(/}/g," } ");
        ret = ret.replace(/_/g," _ ");
        ret = ret.replace(/`/g," ` ");
        ret = ret.replace(/‘/g," ‘ ");
        ret = ret.replace(/’/g," ’ ");
        ret = ret.replace(/\"/g," \" ");
        ret = ret.replace(/“/g," “ ");
        ret = ret.replace(/”/g," ” ");
        ret = ret.replace(/«/g," « ");
        ret = ret.replace(/»/g," » ");
        ret = ret.replace(/\s+/g, ' ');//if there are multiple spaces
        ret = ret.replace(/\s+'/g, '\'');//if there are spaces before '
        let arr = ret.split("");
        for( let i=0; i<arr.length; i++){
            if(i <= arr.length-3 && arr[i]==="." && arr[i+1]==="." && arr[i+2]==="."){
                arr[i]=" ... ";
                arr[i+1]=arr[i+2]=" ";

            }
            else if(arr[i]==="."){
                arr[i] = " . ";
            }
        }
        ret = arr.join("");
        arr = ret.split(new RegExp(" |(?<=')"));
        arr = arr.filter(Boolean);//remove empty string like ''
        return arr;
    }

}

export {HunposManager};