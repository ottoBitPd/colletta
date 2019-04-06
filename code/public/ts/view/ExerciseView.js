"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageView_1 = require("./PageView");
const ExercisePresenter_1 = require("../presenter/ExercisePresenter");
class ExerciseView extends PageView_1.PageView {
    constructor(app) {
        super();
        this.sentence = null;
        this.posTranslation = null;
        this.posTags = null;
        this.exerciseController = new ExercisePresenter_1.ExercisePresenter(this);
        this.exerciseController.update(app);
        this.fileSystem = require('fs');
    }
    setSentence(value) {
        this.sentence = value;
    }
    setPosTranslation(value) {
        this.posTranslation = value;
    }
    setPosTags(value) {
        this.posTags = value;
    }
    getPage() {
        const words = this.sentence.split(" ");
        let ret = "<!DOCTYPE html>" +
            "<html lang=\"it\">" +
            "    <head>" +
            "        <meta charset=\"UTF-8\">" +
            "        <title>Esercizio</title>" +
            "        <link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\">" +
            "        <style>";
        ret += this.buildCss(words);
        ret += "        </style>" +
            "    </head>" +
            "    <body>" +
            "    <div id=\"esercizio\">" +
            "        <form method=\"POST\" action=\"/saveExercise\">" +
            "            <ul>";
        ret += this.buildForm(words);
        ret += "            </ul>" +
            "            <input type=\"hidden\" name=\"wordsnumber\" value=\"*wordsnumber*\"/>" +
            "            <input type=\"hidden\" name=\"sentence\" value=\"" + this.sentence + "\"/>";
        if (this.posTags) {
            ret += "<input type=\"hidden\" name=\"hunposTags\" value='" + JSON.stringify(this.posTags) + "'/>";
        }
        ret += "   <br/>" +
            "            <input type=\"text\" name=\"topics\"/>" +
            "            <select name=\"difficulty\">" +
            "                <option value=\"1\">Molto facile</option>" +
            "                <option value=\"2\">Facile</option>" +
            "                <option value=\"3\">Medio</option>" +
            "                <option value=\"4\">Difficile</option>" +
            "                <option value=\"5\">Molto difficile</option>" +
            "            </select>" +
            "            <div id=\"submit\"><input type=\"submit\" value=\"Invia\"/></div>" +
            "        </form>" +
            "    </div>" +
            "    </body>" +
            "    <script>";
        ret += this.getScript();
        ret += "    </script>" +
            "</html>";
        return ret;
        // let data =  this.fileSystem.readFileSync('./public/exercise.html').toString();
        //
        // data=data.replace(/\*table\*/g, this.buildForm(words));
        // data=data.replace(/\*script\*/g, this.getScript());
        // data=data.replace(/\*css\*/g, this.buildCss(words));
        // //data=data.replace(/\*wordsnumber\*/g, words.length);
        // data=data.replace(/\*sentence\*/g, this.sentence);
        // data=data.replace(/\*hunposTags\*/g, JSON.stringify(this.hunposTags));
        // return data;
    }
    buildForm(words) {
        let table = "<ul><li class='first'>FRASE</li>";
        if (this.posTranslation) {
            table += "<li class=\"second\">CORREZIONE AUTOGENERATA</li>";
        }
        table += "<li id=\"thirdHeader\">CORREZIONE</li></ul>";
        for (let i = 0; i < words.length; i++) {
            table += "<li class='first'>" + words[i] + "</li>";
            if (this.posTranslation) {
                table += "<li class='second'>" + this.posTranslation[i] + "</li>";
            }
            table += "<li class='third'>" + this.getSelect(i) + "</li>\n";
        }
        return table;
    }
    buildCss(words) {
        let css = "";
        for (let i = 0; i < words.length; i++) {
            css += this.getCss(i);
        }
        return css;
    }
    getSelect(index) {
        const input = this.fileSystem.readFileSync('./public/htmlSelect.html').toString();
        return input.replace(/\*i\*/g, index);
    }
    getScript() {
        return this.fileSystem.readFileSync('./public/jsSelect.js').toString();
    }
    getCss(index) {
        const input = this.fileSystem.readFileSync('./public/cssSelect.css').toString();
        return input.replace(/\*i\*/g, index);
    }
}
exports.ExerciseView = ExerciseView;
//# sourceMappingURL=ExerciseView.js.map