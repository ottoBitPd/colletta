"use strict";
//<reference path="POSManager.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
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
=======
class HunposManager {
    constructor() {
        this.fileSystem = require('fs');
        this.shell = require('shelljs');
        //this.train();
        //scommentare per mac/linux
        /*this.inputFilePath='src/ts/presenter/hunpos/input.txt';
        this.outputFilePath='src/ts/presenter/hunpos/output.txt';
        this.modelFilePath='src/ts/presenter/hunpos/italian_model';*/
        //scommentare per windows
        this.inputFilePath = 'src\\ts\\presenter\\hunpos\\input.txt';
        this.outputFilePath = 'src\\ts\\presenter\\hunpos\\output.txt';
        this.modelFilePath = 'src\\ts\\presenter\\hunpos\\italian_model';
>>>>>>> feature/ManualeSviluppatore
    }
    setModel(modelFilePath) {
        //this.modelFilePath=modelFilePath;
    }
    ;
    buildInputFile(sentence) {
        var words = sentence.split(" ");
<<<<<<< HEAD
        fileSystem.writeFile(this.inputFilePath, '', () => console.log('done'));
        for (let i = 0; i < words.length; i++) {
            fileSystem.appendFileSync(this.inputFilePath, words[i] + "\n");
=======
        this.fileSystem.writeFile(this.inputFilePath, '', () => console.log('done'));
        for (let i = 0; i < words.length; i++) {
            this.fileSystem.appendFileSync(this.inputFilePath, words[i] + "\n", (err) => {
                if (err)
                    throw err;
                console.log('The "data to append" was appended to file!');
            });
>>>>>>> feature/ManualeSviluppatore
            /*if(i<(words.length-1)){
                fileSystem.appendFileSync('input.txt', '\n', (err) => {    //controllo per non far mettere l'ultimo invio
                    if (err) throw err;
                });
            }*/
        }
    }
    ;
    buildSolution() {
<<<<<<< HEAD
        var wordSolArray = fileSystem.readFileSync(this.outputFilePath).toString().split("\n");
=======
        var wordSolArray = this.fileSystem.readFileSync(this.outputFilePath).toString().split("\n");
>>>>>>> feature/ManualeSviluppatore
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
<<<<<<< HEAD
        fileSystem.writeFileSync(this.inputFilePath, "");
=======
        this.fileSystem.writeFileSync(this.inputFilePath, "");
>>>>>>> feature/ManualeSviluppatore
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
<<<<<<< HEAD
        const shell = require('shelljs');
        //scommentare per windows
        //shell.exec('src\\ts\\presenter\\hunpos\\hunpos-train ' + this.modelFilePath + '< src\\ts\\presenter\\hunpos\\train');
        //scommentare per mac/linux
        shell.exec('./src/ts/presenter/hunpos/hunpos-train ' + this.modelFilePath + '< ./src/ts/presenter/hunpos/train');
=======
        //scommentare per windows
        this.shell.exec('src\\ts\\presenter\\hunpos\\hunpos-train ' + this.modelFilePath + '< src\\ts\\presenter\\hunpos\\train');
        //scommentare per mac/linux
        //this.shell.exec('./src/ts/presenter/hunpos/hunpos-train ' + this.modelFilePath + '< ./src/ts/presenter/hunpos/train');
>>>>>>> feature/ManualeSviluppatore
    }
    ;
    tag() {
        //scommentare per windows
<<<<<<< HEAD
        const shell = require('shelljs');
        //shell.exec('src\\ts\\presenter\\hunpos\\hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
        //scommentare per mac/linux
        shell.exec('./src/ts/presenter/hunpos/hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
=======
        this.shell.exec('src\\ts\\presenter\\hunpos\\hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
        //scommentare per mac/linux
        //this.shell.exec('./src/ts/presenter/hunpos/hunpos-tag ' + this.modelFilePath + '< ' + this.inputFilePath + '>' + this.outputFilePath);
>>>>>>> feature/ManualeSviluppatore
    }
    ;
}
exports.HunposManager = HunposManager;
//# sourceMappingURL=HunposManager.js.map