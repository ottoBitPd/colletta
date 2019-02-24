/**
 * Class that provides the hunpos service to the application
 */
class Adapter {
    /**
     * Adapter constructor initializes all attributes needed to Adapter object.
     */
    constructor(){
        this.fs = require('fs');
        this.shell = require('shelljs');
    }

    /**
     * This method provide the hunpos solution for a sentence passed as parameter
     * @param sentence - the sentence to correct
     * @returns {json} json object containing the hunpos solution for the sentence
     */
    getHunposSolution(sentence){
        var words = sentence.split(" ");
        for(let i = 0; i < words.length; i++) {
            this.fs.appendFileSync('./js/hunpos/input.txt', words[i] + "\n", (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
            /*if(i<(words.length-1)){
                fs.appendFileSync('input.txt', '\n', (err) => {    //controllo per non far mettere l'ultimo invio
                    if (err) throw err;
                });
            }*/
        }

        this.shell.exec('./js/hunpos/hunpos-tag ./js/hunpos/italian_model < ./js/hunpos/input.txt > ./js/hunpos/output.txt');

        var wordSolArray = this.fs.readFileSync('./js/hunpos/output.txt').toString().split("\n");
        let obj = {
            sentence: []
        };
        let i=0;
        while(wordSolArray[i]!==""){
            var wordLab = wordSolArray[i].split("\t");
            obj.sentence.push({word: wordLab[0],label: wordLab[1]});
            i++;
        }
        this.fs.writeFileSync('./js/hunpos/input.txt', "");
        return obj;
    }
}

module.exports = Adapter;