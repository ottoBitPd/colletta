/**
 * Class that provides the hunpos service to the application
 */
class HunposAdapter{
    private fileSystem : any;
    private shell : any;
    /**
     * HunposAdapter constructor initializes all attributes needed to HunposAdapter object.
     */
    constructor(){
        this.fileSystem = require('fs');
        this.shell = require('shelljs');
        this.shell.exec('src\\ts\\controller\\hunpos\\hunpos-train src\\ts\\controller\\hunpos\\italian_model < src\\ts\\controller\\hunpos\\train');
    }

    /**
     * This method provide the hunpos solution for a sentence passed as parameter
     * @param sentence - the sentence to correct
     * @returns {json} json object containing the hunpos solution for the sentence
     */
    getHunposSolution(sentence : string){

        this.buildInputFile(sentence);
        this.shell.exec('src\\ts\\controller\\hunpos\\hunpos-tag src\\ts\\controller\\hunpos\\italian_model < src\\ts\\controller\\hunpos\\input.txt > src\\ts\\controller\\hunpos\\output.txt');
        return this.buildSolution();

    }



    buildInputFile(sentence : string){
        var words = sentence.split(" ");
        for(let i = 0; i < words.length; i++) {
            this.fileSystem.appendFileSync('./src/ts/controller/hunpos/input.txt', words[i] + "\n");
            /*if(i<(words.length-1)){
                fileSystem.appendFileSync('input.txt', '\n', (err) => {    //controllo per non far mettere l'ultimo invio
                    if (err) throw err;
                });
            }*/
        }
    }
    buildSolution(){
        let wordSolArray = this.fileSystem.readFileSync('./src/ts/controller/hunpos/output.txt').toString().split("\n");
        let obj : any = {//added : any
            sentence: []
        };
        let i=0;
        while(wordSolArray[i]!==""){
            var wordLab = wordSolArray[i].split("\t");
            obj.sentence.push({word: wordLab[0],label: wordLab[1]});
            i++;
        }
        this.fileSystem.writeFileSync('./src/ts/controller/hunpos/input.txt', "");
        return obj;
    }
}
export {HunposAdapter};