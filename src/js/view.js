class View{
    constructor() {
        this.fs = require('fs');
    }

    /*getTest(){

    }*/

    getHome(){
        return this.fs.readFileSync('./html/benvenuto.html').toString();
    }

    getDemo(){
        return this.fs.readFileSync('./html/demo.html').toString();
    }

    getSalvafrase(sentence){
        var data =  this.fs.readFileSync('./html/esercizio.html').toString();
        var words = sentence.split(" ");
        data=data.replace(/\*table\*/g, this.buildForm(words));
        data=data.replace(/\*script\*/g, this.buildScript(words));
        data=data.replace(/\*css\*/g, this.buildCss(words));
        data=data.replace(/\*wordsnumber\*/g, words.length);
        data=data.replace(/\*sentence\*/g, sentence);
        return data;
    }
    buildForm(words){

        var table="";
        for(var i=0;i < words.length;i++){
            table += "<tr><td>" + words[i] + "</td><td>*hunpos" + i + "*</td><td>"+this.getInputAnalisi(i)+"</td></tr>\n";
        }
        //console.log("table: \n"+table);
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