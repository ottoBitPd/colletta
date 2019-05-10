//<reference path="POSManager.ts"/>
import {POSManager} from "./POSManager";
import {ChildProcess, spawn} from 'child_process';
import {platform} from 'os';

/**
 * Class to manage sentences with Hunpos
 */
class HunposManager implements POSManager{
    private modelFilePath:string;

    constructor() {
        this.modelFilePath='src/ts/presenter/hunpos/italian_model';
    }

    /**
     * This method sets the model to use
     * @param path - the model path
     */
    setModel(path:string):void{
        this.modelFilePath=path;
    };

    /**
     * This method create an input for Hunpos based on a sentence
     * @param sentence - the sentence to solve (WORD1 WORD2 WORD3 ...)
     * @return {string} the input sentence having the following format:
     *                  WORD1\nWORD2\nWORD3\n...\n\n
     */
    private buildInput(sentence:string):string{
        let words = this.splitSentence(sentence);
        let result = "";
        for (let word of words)
            result += word + "\n";
        return result + "\n";
    };

    /**
     * This method create a solution for Hunpos based on a sentence
     * @param posOutput - the Hunpos output (WORD1\tTAG1\t\nWORD2\tTAG2\t\nWORD3\tTAG3\t\n...\t\n\n)
     * @return {any} a JSON having with a property "sentence" which is an array containing JSON object
     *               having the following format:
     *                  {word: WORD1, label: TAG1}
     */
    private buildSolution(posOutput : string) : any {
        var wordSolArray = posOutput.split("\n");

        let obj : any= {
            sentence: []
        };

        let i=0;
        while(wordSolArray[i]!==""){
            var wordLab = wordSolArray[i].split("\t");
            obj.sentence.push({word: wordLab[0], label: wordLab[1]});
            i++;
        }

        return obj;
    };

    /**
     * This method returns the solution for a sentence
     * @param sentence - the sentence to solve (WORD1 WORD2 WORD3 ...)
     * @return {any} an array containing JSON object having the following format:
     *                  {word: WORDn, label: TAGn}
     */
    public async getSolution(sentence:string) : Promise<any>{
        return this.buildSolution(await this.tag(this.buildInput(sentence)));
    };

    /**
     * This method create a model based on the actual data
     */
    train():void{
        const shell = require('shelljs');
        let command = 'src/ts/presenter/hunpos/hunpos-train ' + this.modelFilePath + '< ./src/ts/presenter/hunpos/train'

        if (platform() === "win32")
            command = command.replace("/","\\");

        shell.exec(command);
    };

    /**
     * This method assigns tags to the sentence words
     * @param input - the sentence to tag in the following format:
     *                  WORD1\nWORD2\nWORD3\n...\n\n
     * @return {string} the input sentence with each word associated to the relative Hunpos tag
     *                  with the following format:
     *                  WORD1\tTAG1\t\nWORD2\tTAG2\t\nWORD3\tTAG3\t\n...\t\n\n
     */
    public async tag(input : string): Promise<string>{
        let hunpos : ChildProcess;

        let command = "src/ts/presenter/hunpos/hunpos-tag";
        if (platform() === "win32")
            command = command.replace("/","\\");

        hunpos = spawn(command, [this.modelFilePath]);

        process.stdin.pipe(hunpos.stdin);

        let hunposOutput = new Promise( function(resolve) {
            hunpos.stdout.on('data', function(data : any) {
                return resolve(data);
            });
        });

        hunpos.stdin.write(input);

        return (await hunposOutput).toString();
    };

    /**
     * This method splits a sentence on spaces and punctuation
     * @returns string [] - an array containing the split sentence
     */
    private splitSentence(sentence: string) : string[] {
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