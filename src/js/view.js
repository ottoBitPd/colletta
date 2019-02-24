class View{
    constructor() {
        this.fs = require('fs');
    }

    getHome(){
        return this.fs.readFileSync('./html/benvenuto.html').toString();
    }

    getDemo(){
        return this.fs.readFileSync('./html/demo.html').toString();
    }

    getExercise(sentence,key,hunposIta,hunposTags){
        var data =  this.fs.readFileSync('./html/exercise.html').toString();
        var words = sentence.split(" ");
        data=data.replace(/\*table\*/g, this.buildForm(words,hunposIta));
        data=data.replace(/\*script\*/g, this.buildScript(words));
        data=data.replace(/\*css\*/g, this.buildCss(words));
        data=data.replace(/\*wordsnumber\*/g, words.length);
        data=data.replace(/\*sentence\*/g, sentence);
        data=data.replace(/\*key\*/g, key);
        data=data.replace(/\*hunposTags\*/g, JSON.stringify(hunposTags));
        return data;
    }
    buildForm(words,hunposIta){
        var table="";
        for(var i=0;i < words.length;i++){
            table += "<li class='first'>" + words[i] + "</li><li class='second'>"+hunposIta[i]+"</li><li class='third'>"+this.getInputAnalisi(i)+"</li>\n";
        }
        return table;
    }

    buildScript(words){
        var script="";
        for(var i=0;i < words.length;i++){
            script += this.getScript(i);
        }
        return script;
    }
    buildCss(words){
        var css="";
        for(var i=0;i < words.length;i++){
            css += this.getCss(i);
        }
        return css;
    }

    getInputAnalisi(i){
        var input =  this.fs.readFileSync('./html/htmlSelect.html').toString();
        return input.replace(/\*i\*/g,i);
    }
    getScript(i){
        var input =  this.fs.readFileSync('./html/jsSelect.js').toString();
        return input.replace(/\*i\*/g,i);
    }
    getCss(i){
        var input =  this.fs.readFileSync('./html/cssSelect.css').toString();
        return input.replace(/\*i\*/g,i);
    }

}

module.exports = View;