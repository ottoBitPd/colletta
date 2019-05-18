"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const os_1 = require("os");
/**
 * Class to manage sentences with Hunpos
 */
class HunposManager {
    constructor() {
        this.modelFilePath = 'src/ts/presenter/hunpos/italian_model';
    }
    /**
     * This method sets the model to use
     * @param path - the model path
     */
    setModel(path) {
        this.modelFilePath = path;
    }
    ;
    /**
     * This method create an input for Hunpos based on a sentence
     * @param sentence - the sentence to solve (WORD1 WORD2 WORD3 ...)
     * @return {string} the input sentence having the following format:
     *                  WORD1\nWORD2\nWORD3\n...\n\n
     */
    buildInput(sentence) {
        let words = this.splitSentence(sentence);
        let result = "";
        for (let word of words)
            result += word + "\n";
        return result + "\n";
    }
    ;
    /**
     * This method create a solution for Hunpos based on a sentence
     * @param posOutput - the Hunpos output (WORD1\tTAG1\t\nWORD2\tTAG2\t\nWORD3\tTAG3\t\n...\t\n\n)
     * @return {any} a JSON having with a property "sentence" which is an array containing JSON object
     *               having the following format:
     *                  {word: WORD1, label: TAG1}
     */
    buildSolution(posOutput) {
        var wordSolArray = posOutput.split("\n");
        let obj = {
            sentence: []
        };
        let i = 0;
        while (wordSolArray[i] !== "") {
            var wordLab = wordSolArray[i].split("\t");
            obj.sentence.push({ word: wordLab[0], label: wordLab[1] });
            i++;
        }
        return obj;
    }
    ;
    /**
     * This method returns the solution for a sentence
     * @param sentence - the sentence to solve (WORD1 WORD2 WORD3 ...)
     * @return {any} an array containing JSON object having the following format:
     *                  {word: WORDn, label: TAGn}
     */
    getSolution(sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.buildSolution(yield this.tag(this.buildInput(sentence)));
        });
    }
    ;
    /**
     * This method create a model based on the actual data
     */
    train() {
        const shell = require('shelljs');
        let command = 'src/ts/presenter/hunpos/hunpos-train ' + this.modelFilePath + '< ./src/ts/presenter/hunpos/train';
        if (os_1.platform() === "win32")
            command = command.replace("/", "\\");
        shell.exec(command);
    }
    ;
    /**
     * This method assigns tags to the sentence words
     * @param input - the sentence to tag in the following format:
     *                  WORD1\nWORD2\nWORD3\n...\n\n
     * @return {string} the input sentence with each word associated to the relative Hunpos tag
     *                  with the following format:
     *                  WORD1\tTAG1\t\nWORD2\tTAG2\t\nWORD3\tTAG3\t\n...\t\n\n
     */
    tag(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let hunpos;
            let command = "src/ts/presenter/hunpos/hunpos-tag";
            if (os_1.platform() === "win32")
                command = command.replace("/", "\\");
            hunpos = child_process_1.spawn(command, [this.modelFilePath]);
            process.stdin.pipe(hunpos.stdin);
            let hunposOutput = new Promise(function (resolve) {
                hunpos.stdout.on('data', function (data) {
                    return resolve(data);
                });
            });
            hunpos.stdin.write(input);
            return (yield hunposOutput).toString();
        });
    }
    ;
    /**
     * This method splits a sentence on spaces and punctuation
     * @returns string [] - an array containing the split sentence
     */
    splitSentence(sentence) {
        let ret = sentence;
        ret = ret.replace(/\-/g, " - ");
        ret = ret.replace(/\!/g, " ! ");
        ret = ret.replace(/\?/g, " ? ");
        ret = ret.replace(/,/g, " , ");
        ret = ret.replace(/:/g, " : ");
        ret = ret.replace(/;/g, " ; ");
        ret = ret.replace(/\//g, " / ");
        ret = ret.replace(/\*/g, " * ");
        ret = ret.replace(/\(/g, " ( ");
        ret = ret.replace(/\)/g, " ) ");
        ret = ret.replace(/\[/g, " [ ");
        ret = ret.replace(/\]/g, " ] ");
        ret = ret.replace(/{/g, " { ");
        ret = ret.replace(/}/g, " } ");
        ret = ret.replace(/_/g, " _ ");
        ret = ret.replace(/`/g, " ` ");
        ret = ret.replace(/‘/g, " ‘ ");
        ret = ret.replace(/’/g, " ’ ");
        ret = ret.replace(/\"/g, " \" ");
        ret = ret.replace(/“/g, " “ ");
        ret = ret.replace(/”/g, " ” ");
        ret = ret.replace(/«/g, " « ");
        ret = ret.replace(/»/g, " » ");
        ret = ret.replace(/\s+/g, ' '); //if there are multiple spaces
        ret = ret.replace(/\s+'/g, '\''); //if there are spaces before '
        let arr = ret.split("");
        for (let i = 0; i < arr.length; i++) {
            if (i <= arr.length - 3 && arr[i] === "." && arr[i + 1] === "." && arr[i + 2] === ".") {
                arr[i] = " ... ";
                arr[i + 1] = arr[i + 2] = " ";
            }
            else if (arr[i] === ".") {
                arr[i] = " . ";
            }
        }
        ret = arr.join("");
        arr = ret.split(new RegExp(" |(?<=')"));
        arr = arr.filter(Boolean); //remove empty string like ''
        return arr;
    }
}
exports.HunposManager = HunposManager;
//# sourceMappingURL=HunposManager.js.map