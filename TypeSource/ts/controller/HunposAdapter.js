"use strict";
exports.__esModule = true;
/**
 * Class that provides the hunpos service to the application
 */
var HunposAdapter = /** @class */ (function () {
    /**
     * HunposAdapter constructor initializes all attributes needed to HunposAdapter object.
     */
    function HunposAdapter() {
        this.fileSystem = require('fs');
        this.shell = require('shelljs');
        this.shell.exec('./js/controller/hunpos/hunpos-train ./js/controller/hunpos/italian_model < ./js/controller/hunpos/train');
    }
    /**
     * This method provide the hunpos solution for a sentence passed as parameter
     * @param sentence - the sentence to correct
     * @returns {json} json object containing the hunpos solution for the sentence
     */
    HunposAdapter.prototype.getHunposSolution = function (sentence) {
        this.buildInputFile(sentence);
        this.shell.exec('./js/controller/hunpos/hunpos-tag ./js/controller/hunpos/italian_model ' +
            '< ./js/controller/hunpos/input.txt > ./js/controller/hunpos/output.txt');
        return this.buildSolution();
    };
    HunposAdapter.prototype.buildInputFile = function (sentence) {
        var words = sentence.split(" ");
        for (var i = 0; i < words.length; i++) {
            this.fileSystem.appendFileSync('./js/controller/hunpos/input.txt', words[i] + "\n", function (err) {
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
    };
    HunposAdapter.prototype.buildSolution = function () {
        var wordSolArray = this.fileSystem.readFileSync('./js/controller/hunpos/output.txt').toString().split("\n");
        var obj = {
            sentence: []
        };
        var i = 0;
        while (wordSolArray[i] !== "") {
            var wordLab = wordSolArray[i].split("\t");
            obj.sentence.push({ word: wordLab[0], label: wordLab[1] });
            i++;
        }
        this.fileSystem.writeFileSync('./js/controller/hunpos/input.txt', "");
        return obj;
    };
    return HunposAdapter;
}());
exports.HunposAdapter = HunposAdapter;
