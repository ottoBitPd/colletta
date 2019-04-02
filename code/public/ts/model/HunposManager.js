"use strict";
//<reference path="POSManager.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
class HunposManager {
    constructor() {
        this.fileSystem = require('fs');
        this.shell = require('shelljs');
        //this.train();
        this.inputFilePath = 'src\\ts\\controller\\hunpos\\input.txt';
        this.outputFilePath = 'src\\ts\\controller\\hunpos\\output.txt';
        this.modelFilePath = 'src\\ts\\controller\\hunpos\\italian_model';
    }
    setModel(modelFilePath) {
        //this.modelFilePath=modelFilePath;
    }
    ;
    buildInputFile(sentence) {
        var words = sentence.split(" ");
        for (let i = 0; i < words.length; i++) {
            this.fileSystem.appendFileSync(this.inputFilePath, words[i] + "\n", (err) => {
                if (err)
                    throw err;
                console.log('The "data to append" was appended to file!');
            });
            /*if(i<(words.length-1)){
                fileSystem.appendFileSync('input.txt', '\n', (err) => {    //controllo per non far mettere l'ultimo invio
                    if (err) throw err;
                });
            }*/
        }
    }
    ;
    buildSolution() {
        var wordSolArray = this.fileSystem.readFileSync(this.outputFilePath).toString().split("\n");
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
        this.fileSystem.writeFileSync(this.inputFilePath, "");
        return obj;
    }
    ;
    getSolution(modelFilePath) {
        this.buildInputFile(modelFilePath);
        this.tag();
        return this.buildSolution();
    }
    ;
    train() {
        this.shell.exec('src\\ts\\controller\\hunpos\\hunpos-train ' + this.modelFilePath + '< src\\ts\\controller\\hunpos\\train');
    }
    ;
    tag() {
        this.shell.exec('src\\ts\\controller\\hunpos\\hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
    }
    ;
}
exports.HunposManager = HunposManager;
//# sourceMappingURL=HunposManager.js.map