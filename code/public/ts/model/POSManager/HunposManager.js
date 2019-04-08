"use strict";
//<reference path="POSManager.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
const fileSystem = require("fs");
class HunposManager {
    constructor() {
        //this.train();
        //scommentare per mac/linux
        this.inputFilePath = 'src/ts/presenter/hunpos/input.txt';
        this.outputFilePath = 'src/ts/presenter/hunpos/output.txt';
        this.modelFilePath = 'src/ts/presenter/hunpos/italian_model';
        //scommentare per windows
        /*this.inputFilePath='src\\ts\\presenter\\hunpos\\input.txt';
        this.outputFilePath='src\\ts\\presenter\\hunpos\\output.txt';
        this.modelFilePath='src\\ts\\presenter\\hunpos\\italian_model';*/
    }
    setModel(modelFilePath) {
        //this.modelFilePath=modelFilePath;
    }
    ;
    buildInputFile(sentence) {
        var words = sentence.split(" ");
        fileSystem.writeFile(this.inputFilePath, '', () => console.log('done'));
        for (let i = 0; i < words.length; i++) {
            fileSystem.appendFileSync(this.inputFilePath, words[i] + "\n");
            /*if(i<(words.length-1)){
                fileSystem.appendFileSync('input.txt', '\n', (err) => {    //controllo per non far mettere l'ultimo invio
                    if (err) throw err;
                });
            }*/
        }
    }
    ;
    buildSolution() {
        var wordSolArray = fileSystem.readFileSync(this.outputFilePath).toString().split("\n");
        console.log("arr: " + wordSolArray);
        let obj = {
            sentence: []
        };
        let i = 0;
        while (wordSolArray[i] !== "") {
            var wordLab = wordSolArray[i].split("\t");
            obj.sentence.push({ word: wordLab[0], label: wordLab[1] });
            i++;
        }
        fileSystem.writeFileSync(this.inputFilePath, "");
        return obj;
    }
    ;
    getSolution(modelFilePath) {
        this.buildInputFile(modelFilePath);
        //this.train();
        this.tag();
        return this.buildSolution();
    }
    ;
    train() {
        const shell = require('shelljs');
        //scommentare per windows
        //shell.exec('src\\ts\\presenter\\hunpos\\hunpos-train ' + this.modelFilePath + '< src\\ts\\presenter\\hunpos\\train');
        //scommentare per mac/linux
        shell.exec('./src/ts/presenter/hunpos/hunpos-train ' + this.modelFilePath + '< ./src/ts/presenter/hunpos/train');
    }
    ;
    tag() {
        //scommentare per windows
        const shell = require('shelljs');
        //shell.exec('src\\ts\\presenter\\hunpos\\hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
        //scommentare per mac/linux
        shell.exec('./src/ts/presenter/hunpos/hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
    }
    ;
}
exports.HunposManager = HunposManager;
//# sourceMappingURL=HunposManager.js.map