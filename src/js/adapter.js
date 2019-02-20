class Adapter {
    constructor(){
        this.fs = require('fs');
        this.shell = require('shelljs');
    }
    correctSentence(sentence){
        var words = sentence.split(" ");
        for(let i = 0; i < words.length; i++) {
            this.fs.appendFileSync('./js/input.txt', words[i] + "\n", (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
            /*if(i<(words.length-1)){
                fs.appendFileSync('input.txt', '\n', (err) => {    //controllo per non far mettere l'ultimo invio
                    if (err) throw err;
                });
            }*/
        }

        this.shell.exec('./js/hunpos-tag ./js/italian_model < ./js/input.txt > ./js/output.txt');

        var wordSolArray = this.fs.readFileSync('./js/output.txt').toString().split("\n");
        let obj = {
            sentence: []
        };
        let i=0;
        while(wordSolArray[i]!=""){
            var wordLab = wordSolArray[i].split("\t");
            obj.sentence.push({word: wordLab[0],label: wordLab[1]});
            i++;
        }
        var json = JSON.stringify(obj);
        this.fs.writeFileSync("./js/solution.json", json);
        this.fs.writeFileSync('./js/input.txt', "");
        return "./js/solution.json";
    }
}

module.exports = Adapter;