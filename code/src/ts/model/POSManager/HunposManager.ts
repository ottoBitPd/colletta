//<reference path="POSManager.ts"/>

import {POSManager} from "./POSManager";
import {spawn} from 'child_process';

/**
 * Class to manage sentences with Hunpos
 */
class HunposManager implements POSManager{
    private modelFilePath:string;

    constructor() {
        //this.train();

        //scommentare per mac/linux
        this.modelFilePath='src/ts/presenter/hunpos/italian_model';
        //scommentare per windows
        //this.modelFilePath='src\\ts\\presenter\\hunpos\\italian_model';
    }

    /**
     * This method sets the model to use
     * @param modelFilePath - the model path
     */
    setModel(modelFilePath:string):void{
        this.modelFilePath=modelFilePath;
    };

    /**
     * This method create an input for Hunpos based on a sentence
     * @param sentence - the sentence to solve
     * @return {string} the reworked input sentence
     */
    private buildInput(sentence:string):string{
        //console.log(`sentence: ${sentence}`);
        let words = this.splitSentence(sentence);
        let result = "";
        for (let word of words)
            result += word + "\n";
        //console.log(`hunposInput: ${result}`);
        return result + "\n";
    };

    /**
     * This method create a solution for Hunpos based on a sentence
     * @param sentence - the sentence to solve
     * @return {string} the reworked solution for the sentence
     */
    private buildSolution(posOutput : string):any{
        var wordSolArray = posOutput.split("\n");
        //console.log("hunposOutput: " + wordSolArray);
        let obj : any= {
            sentence: []
        };
        let i=0;
        while(wordSolArray[i]!==""){
            var wordLab = wordSolArray[i].split("\t");
            obj.sentence.push({word: wordLab[0], label: wordLab[1]});
            i++;
        }
        //console.log("obj: ",obj);
        return obj;
    };

    /**
     * This method returns the solution for a sentence
     * @param sentence - the sentence to solve
     */
    async getSolution(sentence:string):Promise<any>{
        //console.log("sentenceHunpos: ",sentence);
        //this.train();
        return this.buildSolution(await this.tag(this.buildInput(sentence)));

    };

    /**
     * This method create a model based on the actual data
     */
    train():void{
        const shell = require('shelljs');
        //scommentare per windows
        //shell.exec('src\\ts\\presenter\\hunpos\\hunpos-train ' + this.modelFilePath + '< src\\ts\\presenter\\hunpos\\train');
        //scommentare per mac/linux
        shell.exec('./src/ts/presenter/hunpos/hunpos-train ' + this.modelFilePath + '< ./src/ts/presenter/hunpos/train');
    };

    /**
     * This method assigns tags to the sentence words
     * @param input - the sentence to tag
     * @return {string} the reworked sentence with the Hunpos tags
     */
    public async tag(input : string): Promise<string>{
        //scommentare per windows
        //const hunpos = spawn('src\\ts\\presenter\\hunpos\\hunpos-tag', [this.modelFilePath]);
        //scommentare per mac/linux
        const hunpos = spawn('./src/ts/presenter/hunpos/hunpos-tag', [this.modelFilePath]);

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