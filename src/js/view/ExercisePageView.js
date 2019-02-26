const PageView = require("./PageView.js");

class ExercisePageView extends PageView{
    constructor(model){
        super(model);
        this.sentence=null;
        this.key=null;
        this.hunposIta=null;
        this.hunposTags=null;
    }

    setSentence(value) {
        this.sentence = value;
    }

    setKey(value) {
        this.key = value;
    }

    setHunposIta(value) {
        this.hunposIta = value;
    }

    setHunposTags(value) {
        this.hunposTags = value;
    }

    getPage() {
        var data =  this.fs.readFileSync('./public/exercise.html').toString();
        var words = this.sentence.split(" ");
        data=data.replace(/\*table\*/g, this.buildForm(words,this.hunposIta));
        data=data.replace(/\*script\*/g, this.buildScript(words));
        data=data.replace(/\*css\*/g, this.buildCss(words));
        data=data.replace(/\*wordsnumber\*/g, words.length);
        data=data.replace(/\*sentence\*/g, this.sentence);
        data=data.replace(/\*key\*/g, this.key);
        data=data.replace(/\*hunposTags\*/g, JSON.stringify(this.hunposTags));
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
        var input =  this.fs.readFileSync('./public/htmlSelect.html').toString();
        return input.replace(/\*i\*/g,i);
    }

    getScript(i){
        var input =  this.fs.readFileSync('./public/jsSelect.js').toString();
        return input.replace(/\*i\*/g,i);
    }

    getCss(i){
        var input =  this.fs.readFileSync('./public/cssSelect.css').toString();
        return input.replace(/\*i\*/g,i);
    }
}
module.exports = ExercisePageView;