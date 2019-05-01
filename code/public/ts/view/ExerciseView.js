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
const PageView_1 = require("./PageView");
const ExercisePresenter_1 = require("../presenter/ExercisePresenter");
/**
 *   Class to display the exercise page
 *   @extends PageView
 */
class ExerciseView extends PageView_1.PageView {
    constructor(app) {
        super();
        this.sentence = null;
        this.posTranslation = null;
        this.posTags = null;
        this.exercisePresenter = new ExercisePresenter_1.ExercisePresenter(this);
        this.exercisePresenter.update(app);
        this.corrections = [];
    }
    /**
     * This method modifies the exercise sentence
     * @param value - the new exercise sentence
     */
    setSentence(value) {
        this.sentence = value;
    }
    /**
     * This method modifies the PosTranslation of an exercise sentence
     * @param value - the new Pos translation
     */
    setPosTranslation(value) {
        this.posTranslation = value;
    }
    /**
     * This method modifies the tags of the exercise sentence words
     * @param value - the new tags
     */
    setPosTags(value) {
        this.posTags = value;
    }
    /**
     * This method modifies the exercise correction
     * @param value - the new exercise correction
     */
    setCorrections(value) {
        this.corrections = value;
    }
    setSentenceKey(value) {
        this.sentenceKey = value;
    }
    setSolutionKey(value) {
        this.solutionKey = value;
    }
    /**
     * This method is used to display the page body structure
     * @return {string} the HTML source
     */
    getPage() {
        return __awaiter(this, void 0, void 0, function* () {
            const words = this.splitSentence();
            let ret = this.getHead(this.buildCss(words));
            ret += this.getMenu();
            ret += "\t\t<div class=\"container\">\n";
            if (this.exercisePresenter.getCorrection() === null)
                ret += this.showExercise(words);
            else
                ret += this.showExerciseEvaluation(words);
            ret += "\t\t</div>\n" +
                "\t</body>\n" +
                "\t<script>\n";
            ret += this.getScript();
            ret += "\t</script>\n" +
                "</html>";
            return ret;
        });
    }
    /**
     * This method is used to display the exercise form
     * @param words - the exercise sentence
     * @return {string} the HTML source
     */
    showExercise(words) {
        let page = "/exercise/save";
        if (this.exercisePresenter.getUpdate()) {
            page = "/exercise/update";
        }
        let ret = "\t\t\t<div class='text-center col-sm-12' id=\"esercizio\">\n" +
            "\t\t\t\t<form method=\"POST\" action=\"" + page + "\">\n";
        ret += this.buildTable(words);
        //si esegue un passaggio alla OttoBit (^o^)
        ret += "" +
            "\t\t\t\t\t<input type=\"hidden\" name=\"wordsnumber\" value=\"" + this.splitSentence().length + "\"/>\n" +
            "\t\t\t\t\t<input type=\"hidden\" name=\"sentenceKey\" value=\"" + this.sentenceKey + "\"/>\n" +
            "\t\t\t\t\t<input type=\"hidden\" name=\"solutionKey\" value=\"" + this.solutionKey + "\"/>\n" +
            "\t\t\t\t\t<input type=\"hidden\" name=\"sentence\" value=\"" + this.sentence + "\"/>\n";
        if (this.posTags) {
            ret += "\t\t\t\t\t<input type=\"hidden\" name=\"hunposTags\" value='" + JSON.stringify(this.posTags) + "'/>\n";
        }
        ret +=
            "\t\t\t\t\t<br/>\n";
        if (this.userKind === PageView_1.UserKind.teacher)
            ret +=
                "\t\t\t\t\t<select class='form-control' name=\"public\">\n" +
                    "\t\t\t\t\t\t<option value=\"true\" default>Soluzione pubblica</option>\n" +
                    "\t\t\t\t\t\t<option value=\"false\">Soluzione privata</option>\n" +
                    "\t\t\t\t\t</select>\n" +
                    "\t\t\t\t\t<input type=\"text\" class='form-control' name=\"topics\" placeholder=\"Argomenti dell'esercizio\"/>\n" +
                    "\t\t\t\t\t<select class='form-control' name=\"difficulty\">\n" +
                    "\t\t\t\t\t\t<option value=\"1\">Molto facile</option>\n" +
                    "\t\t\t\t\t\t<option value=\"2\">Facile</option>\n" +
                    "\t\t\t\t\t\t<option value=\"3\">Medio</option>\n" +
                    "\t\t\t\t\t\t<option value=\"4\">Difficile</option>\n" +
                    "\t\t\t\t\t\t<option value=\"5\">Molto difficile</option>\n" +
                    "\t\t\t\t\t</select>\n";
        if (this.userKind !== PageView_1.UserKind.teacher) {
            ret += "\t\t\t\t\t<p class='col-sm-12'>Scegli il professore per la correzione</p>\n" +
                "\t\t\t\t\t<select class='form-control' name='correction'>\n" +
                "\t\t\t\t\t\t<option value='auto'>Correzione generata automaticamente</option>\n";
            for (let i in this.corrections) {
                ret += "\t\t\t\t\t\t<option value='" + this.corrections[i].id + "'>" + this.corrections[i].username + "</option>\n";
            }
        }
        ret += "\t\t\t\t\t</select>\n" +
            "\t\t\t\t\t<button class='btn btn-primary my-2' id=\"submit\">Invia</button>\n" +
            "\t\t\t\t</form>\n" +
            "\t\t\t</div>\n";
        return ret;
    }
    /**
     * This method is used to display the exercise evaluation
     * @param words - the exercise sentence
     * @return {string} the HTML source
     */
    showExerciseEvaluation(words) {
        let ret = "<h1 class=\"text-center mb-4\">Valutazione</h1>\n" +
            "    <div id=\"esercizio\" class='text-center'>\n" +
            "        <ul class='list-group text-center'>\n" +
            "            <li class='list-group-item active'>\n" +
            "                <div class='row'>\n" +
            "                    <div class='col-sm-4 mx-auto'>FRASE</div>\n" +
            "                    <div class='col-sm-4 mx-auto'>LA TUA SOLUZIONE</div>\n" +
            "                    <div class='col-sm-4 mx-auto'>CORREZIONE</div>\n" +
            "                </div>\n" +
            "            </li>\n";
        let solution = this.exercisePresenter.getUserSolution();
        let correction = this.exercisePresenter.getCorrection();
        // console.log("tag soluzione user: ",solution);
        //console.log("TRADUZIONE tag soluzione user: ",this.exercisePresenter.translateTags(solution));
        if (correction) {
            for (let i = 0; i < words.length; ++i) {
                ret +=
                    "            <li class='list-group-item'>\n" +
                        "                <div class='row " + (solution[i] === correction.tags[i] ? "text-success" : "text-danger") + "'>\n" +
                        "                    <p class='col-sm-4 mx-auto'>" + words[i] + "</p>\n" +
                        "                    <p class='col-sm-4 mx-auto'>" + this.exercisePresenter.translateTag(solution[i]) + "</p>\n" +
                        "                    <p class='col-sm-4 mx-auto'>" + this.exercisePresenter.translateTag(correction.tags[i]) + "</p>\n " +
                        "                </div>\n" +
                        "            </li>\n";
            }
        }
        ret +=
            "       </ul>\n" +
                "       <div class='row py-3 mx-auto text-white " + (correction.mark > 5 ? "bg-success" : "bg-danger") + "'>" +
                (correction ? "<p class='col-sm-10 my-0 mx-auto'>Voto:  " + correction.mark + "</p>" : "") +
                "       </div>" +
                "       <a href='/' class='btn btn-primary my-2 px-4'>Torna alla home</a>\n" +
                "    </div>";
        return ret;
    }
    /**
     * This method is used to create an exercise table of results
     * @param words - the exercise sentence
     * @return {string} the HTML source
     */
    buildTable(words) {
        let n = (this.userKind == PageView_1.UserKind.teacher ? "4" : "6");
        let table = "" +
            "\t\t\t\t<ul class='list-group text-center'>\n" +
            "\t\t\t\t\t<li class='list-group-item active'>\n" +
            "\t\t\t\t\t\t<div class='row'>\n" +
            "\t\t\t\t\t\t\t<div class='col-sm-" + n + "'>" +
            "FRASE" +
            "</div>\n";
        if (this.userKind === PageView_1.UserKind.teacher) {
            table += "" +
                "\t\t\t\t\t\t\t<div class='col-sm-4'>" +
                "CORREZIONE AUTOGENERATA" +
                "</div>\n";
        }
        table += "\t\t\t\t\t\t\t<div class='col-sm-" + n + "'>" +
            "CORREZIONE" +
            "</div>\n" +
            "\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t</li>\n";
        for (let i = 0; i < words.length; i++) {
            table += "" +
                "\t\t\t\t\t<li class='list-group-item'>\n" +
                "\t\t\t\t\t\t<div class='row'>\n" +
                "\t\t\t\t\t\t\t<div class='col-sm-" + n + "'>" +
                words[i] +
                "</div>\n";
            if (this.userKind === PageView_1.UserKind.teacher) {
                table += "" +
                    "\t\t\t\t\t\t\t<div class='col-sm-4'>" +
                    this.posTranslation[i] +
                    "</div>\n";
            }
            table +=
                "\t\t\t\t\t\t\t<div class='col-sm-" + n + "'>\n" +
                    this.getSelect(i) +
                    "\t\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t</div>\n" + //div class row ? aggiunto
                    "\t\t\t\t\t</li>\n";
        }
        return table + "\t\t\t\t</ul>\n";
    }
    /**
     * This method applies the css style
     * @param value - the words of the sentence
     */
    buildCss(words) {
        let css = "\t\t<style>\n";
        for (let i = 0; i < words.length; i++) {
            css += this.getCss(i);
        }
        return css + "\t\t</style>\n";
    }
    /**
     * This method returns the right drop down menù value
     * @param index - the index of the right value
     */
    getSelect(index) {
        //const input =  this.fileSystem.readFileSync('./public/htmlSelect.html').toString();
        //return input.replace(/\*i\*/g,index);
        return "" +
            "<select class=\"form-control\" name=\"general" + index + "\" id=\"general" + index + "\" onchange=\"general(" + index + ")\">>\n" +
            " <option value=\"-\">Scegli una correzione</option>\n" +
            "    <option value=\"A\">Aggettivo</option>\n" +
            "    <option value=\"B\">Avverbio</option>\n" +
            "    <option value=\"C\">Congiunzione</option>\n" +
            "    <option value=\"E\">Preposizione</option>\n" +
            "    <option value=\"F\">Punteggiatura</option>\n" +
            "    <option value=\"I\">Interiezione</option>\n" +
            "    <option value=\"P\">Pronome</option>\n" +
            "    <option value=\"R\">Articolo</option>\n" +
            "    <option value=\"S\">Nome</option>\n" +
            "    <option value=\"V\">Verbo</option>\n" +
            "    <option value=\"X\">Altro</option>\n" +
            "</select>\n" +
            "<!--secondo liv aggettivo-->\n" +
            "<select class=\"form-control\" name=\"aggettivo" + index + "\" id=\"aggettivo" + index + "\" onchange=\"aggettivo(" + index + ")\">\n" +
            "    <option value=\"-\">Scegli un aggettivo specifico *</option>\n" +
            "    <option value=\"A\">Aggettivo qualificativo</option>\n" +
            "    <option value=\"AP\">Aggettivo d. possesivo</option>\n" +
            "    <option value=\"DD\">Aggettivo d. dimostrativo</option>\n" +
            "    <option value=\"DI\">Aggettivo d. indefinito</option>\n" +
            "    <option value=\"N\">Aggettivo d. numerale cardinale</option>\n" +
            "    <option value=\"NO\">Aggettivo d. numerale ordinale</option>\n" +
            "    <option value=\"DQ\">Aggettivo d. interrogativo</option>\n" +
            "    <option value=\"DE\">Aggettivo d. esclamativo</option>\n" +
            "    <!--DR Determinante Relativo non so cosa sia forse avverbio-->\n" +
            "</select>\n" +
            "<!--secondo liv avverbio-->\n" +
            "<select class=\"form-control\" name=\"avverbio" + index + "\" id=\"avverbio" + index + "\">\n" +
            "    <option value=\"-\">Scegli un avverbio specifico</option>\n" +
            "    <option value=\"N\">Avverbio di negazione</option>\n" +
            "</select>\n" +
            "<select class=\"form-control\" name=\"congiunzione" + index + "\" id=\"congiunzione" + index + "\">\n" +
            "    <option value=\"-\">Scegli una congiunzione specifica *</option>\n" +
            "    <option value=\"C\">Congiunzione coordinante</option>\n" +
            "    <option value=\"S\">Congiunzione subordinante</option>\n" +
            "    <!--non so se queste CS vanno a sostituire gli avverbi-->\n" +
            "</select>\n" +
            "<select class=\"form-control\" name=\"preposizione" + index + "\" id=\"preposizione" + index + "\">\n" +
            //"    <option value=\"-\">Scegli una correzione *</option>\n" +
            "    <option value=\"-\">Preposizione semplice</option>\n" +
            "    <option value=\"A\">Preposizione articolata</option>\n" +
            "\n" +
            "</select>\n" +
            "<select class=\"form-control\" name=\"punteggiatura" + index + "\" id=\"punteggiatura" + index + "\">\n" +
            "    <option value=\"-\">Scegli una punteggiatura specifica</option>\n" +
            "    <option value=\"S\">Punteggiatura generale</option>\n" +
            "    <option value=\"B\">Punteggiatura bilanciata</option>\n" +
            "    <option value=\"C\">Punteggiatura fine clausola</option>\n" +
            "    <option value=\"F\">Punteggiatura di fine frase</option>\n" +
            "\n" +
            "</select>\n" +
            "<!--secondo liv pronome-->\n" +
            "<select class=\"form-control\" name=\"pronome" + index + "\" id=\"pronome" + index + "\" onchange=\"pronome(" + index + ")\">\n" +
            "    <option value=\"-\">Scegli una correzione</option>\n" +
            "    <option value=\"PE\">Pronome personale</option>\n" +
            "    <option value=\"PP\">Pronome possessivo</option>\n" +
            "    <option value=\"PI\">Pronome indefinito</option>\n" +
            "    <option value=\"PR\">Pronome relativo</option>\n" +
            "    <option value=\"PD\">Pronome dimostrativo</option>\n" +
            "    <option value=\"PQ\">Pronome interrogativo</option>\n" +
            "    <option value=\"PC\">Particella pronominale</option>\n" +
            "    <!--\n" +
            "    PC clitic pronoun sta per particella pronominale credo ti ci vi mi\n" +
            "    Pronome numerale non abbiamo il tag\n" +
            "    mentre PQ Pronome interrogativo abbiamo il tag ma non so se esiste\n" +
            "    -->\n" +
            "</select>\n" +
            "<!--secondo liv articolo-->\n" +
            "<select class=\"form-control\" name=\"articolo" + index + "\" id=\"articolo" + index + "\">\n" +
            "    <option value=\"-\">Scegli un articolo specifico *</option>\n" +
            "    <option value=\"D\">Articolo determinativo</option>\n" +
            "    <option value=\"I\">Articolo indeterminativo</option>\n" +
            "</select>\n" +
            "<!--secondo liv nome-->\n" +
            "<select class=\"form-control\" name=\"nome" + index + "\" id=\"nome" + index + "\" onchange=\"nome(" + index + ")\">\n" +
            //"    <option value=\"-\">Scegli una correzione *</option>\n" +
            "    <option value=\"-\">Nome comune</option>\n" +
            "    <option value=\"P\">Nome proprio</option>\n" +
            "    <option value=\"A\">Abbreviazione</option>\n" +
            "    <!--ci potrebbe stare qui l'abbreviazione SA-->\n" +
            "</select>\n" +
            "\n" +
            "<select class=\"form-control\" name=\"verbo" + index + "\" id=\"verbo" + index + "\" onchange=\"verbo(" + index + ")\">\n" +
            "    <option value=\"-\">Scegli tipo verbo *</option>\n" +
            "    <option value=\"V\">principale</option>\n" +
            "    <option value=\"VA\">ausiliario</option>\n" +
            "    <option value=\"VM\">modale</option>\n" +
            "</select>\n" +
            "\n" +
            "<select class=\"form-control\" name=\"tempo" + index + "\" id=\"tempo" + index + "\" onchange=\"tempo(" + index + ")\">\n" +
            "    <option value=\"-\">Scegli tempo verbo</option>\n" +
            "    <option value=\"ip\">indicativo presente</option>\n" +
            "    <option value=\"ii\">indicativo imperfetto</option>\n" +
            "    <option value=\"is\">indicativo passato</option>\n" +
            "    <option value=\"if\">indicativo futuro</option>\n" +
            "    <option value=\"m\">imperativo</option>\n" +
            "    <option value=\"cp\">congiuntivo presente</option>\n" +
            "    <option value=\"ci\">congiuntivo imperfetto</option>\n" +
            "    <option value=\"d\">condizionale</option>\n" +
            "    <option value=\"f\">infinito</option>\n" +
            "    <option value=\"g\">gerundio</option>\n" +
            "    <option id=\"pp\" value=\"pp\">participio presente</option>\n" +
            "    <option value=\"ps\">participio passato</option>\n" +
            "</select>\n" +
            "<select class=\"form-control\" name=\"persona" + index + "\" id=\"persona" + index + "\">\n" +
            "    <option value=\"-\">Scegli persona</option>\n" +
            "    <option value=\"1\">prima</option>\n" +
            "    <option value=\"2\">seconda</option>\n" +
            "    <option value=\"3\">terza</option>\n" +
            "</select>\n" +
            "<select class=\"form-control\" name=\"genere" + index + "\" id=\"genere" + index + "\">\n" +
            "    <option value=\"-\">Scegli genere</option>\n" +
            "    <option value=\"m\">maschile</option>\n" +
            "    <option value=\"f\">femminile</option>\n" +
            "    <option value=\"n\">non specificato</option>\n" +
            "</select>\n" +
            "<select class=\"form-control\" name=\"numero" + index + "\" id=\"numero" + index + "\">\n" +
            "    <option value=\"-\">Scegli numero</option>\n" +
            "    <option value=\"s\">singolare</option>\n" +
            "    <option value=\"p\">plurale</option>\n" +
            "    <option value=\"n\">non specificato</option>\n" +
            "</select>\n";
    }
    /**
     * This method invokes all the scripts necessary to create the view
     */
    getScript() {
        //return this.fileSystem.readFileSync('./public/jsSelect.js').toString();
        return "" +
            "function show(idElement){\n" +
            "    document.getElementById(idElement).style.display = \"block\";\n" +
            "}\n" +
            "function hide(idElement){\n" +
            "    document.getElementById(idElement).style.display = \"none\";\n" +
            "}\n" +
            "function general(i){\n" +
            "   var x = document.getElementById(\"general\"+i).value;\n" +
            "    switch(x){\n" +
            "        case 'A':\n" +
            "            show(\"aggettivo\"+i);\n" +
            "            hide(\"avverbio\"+i);\n" +
            "            hide(\"congiunzione\"+i);\n" +
            "            hide(\"preposizione\"+i);\n" +
            "            hide(\"punteggiatura\"+i);\n" +
            "            hide(\"pronome\"+i);\n" +
            "            hide(\"articolo\"+i);\n" +
            "            hide(\"nome\"+i);\n" +
            "            hide(\"verbo\"+i);\n" +
            "            hide(\"tempo\"+i);\n" +
            "            hide(\"persona\"+i);\n" +
            "            hide(\"genere\"+i);\n" +
            "            hide(\"numero\"+i);\n" +
            "            break;\n" +
            "        case 'B':\n" +
            "            hide(\"aggettivo\"+i);\n" +
            "            show(\"avverbio\"+i);\n" +
            "            hide(\"congiunzione\"+i);\n" +
            "            hide(\"preposizione\"+i);\n" +
            "            hide(\"punteggiatura\"+i);\n" +
            "            hide(\"pronome\"+i);\n" +
            "            hide(\"articolo\"+i);\n" +
            "            hide(\"nome\"+i);\n" +
            "            hide(\"verbo\"+i);\n" +
            "            hide(\"tempo\"+i);\n" +
            "            hide(\"persona\"+i);\n" +
            "            hide(\"genere\"+i);\n" +
            "            hide(\"numero\"+i);\n" +
            "            break;\n" +
            "        case 'C':\n" +
            "            hide(\"aggettivo\"+i);\n" +
            "            hide(\"avverbio\"+i);\n" +
            "            show(\"congiunzione\"+i);\n" +
            "            hide(\"preposizione\"+i);\n" +
            "            hide(\"punteggiatura\"+i);\n" +
            "            hide(\"pronome\"+i);\n" +
            "            hide(\"articolo\"+i);\n" +
            "            hide(\"nome\"+i);\n" +
            "            hide(\"verbo\"+i);\n" +
            "            hide(\"tempo\"+i);\n" +
            "            hide(\"persona\"+i);\n" +
            "            hide(\"genere\"+i);\n" +
            "            hide(\"numero\"+i);\n" +
            "            break;\n" +
            "        case 'E':\n" +
            "            hide(\"aggettivo\"+i);\n" +
            "            hide(\"avverbio\"+i);\n" +
            "            hide(\"congiunzione\"+i);\n" +
            "            show(\"preposizione\"+i);\n" +
            "            hide(\"punteggiatura\"+i);\n" +
            "            hide(\"pronome\"+i);\n" +
            "            hide(\"articolo\"+i);\n" +
            "            hide(\"nome\"+i);\n" +
            "            hide(\"verbo\"+i);\n" +
            "            hide(\"tempo\"+i);\n" +
            "            hide(\"persona\"+i);\n" +
            "            hide(\"genere\"+i);\n" +
            "            hide(\"numero\"+i);\n" +
            "            break;\n" +
            "        case 'F':\n" +
            "            hide(\"aggettivo\"+i);\n" +
            "            hide(\"avverbio\"+i);\n" +
            "            hide(\"congiunzione\"+i);\n" +
            "            hide(\"preposizione\"+i);\n" +
            "            show(\"punteggiatura\"+i);\n" +
            "            hide(\"pronome\"+i);\n" +
            "            hide(\"articolo\"+i);\n" +
            "            hide(\"nome\"+i);\n" +
            "            hide(\"verbo\"+i);\n" +
            "            hide(\"tempo\"+i);\n" +
            "            hide(\"persona\"+i);\n" +
            "            hide(\"genere\"+i);\n" +
            "            hide(\"numero\"+i);\n" +
            "            break;\n" +
            "        case 'P':\n" +
            "            hide(\"aggettivo\"+i);\n" +
            "            hide(\"avverbio\"+i);\n" +
            "            hide(\"congiunzione\"+i);\n" +
            "            hide(\"preposizione\"+i);\n" +
            "            hide(\"punteggiatura\"+i);\n" +
            "            show(\"pronome\"+i);\n" +
            "            hide(\"articolo\"+i);\n" +
            "            hide(\"nome\"+i);\n" +
            "            hide(\"verbo\"+i);\n" +
            "            hide(\"tempo\"+i);\n" +
            "            hide(\"persona\"+i);\n" +
            "            hide(\"genere\"+i);\n" +
            "            hide(\"numero\"+i);\n" +
            "            break;\n" +
            "        case 'R':\n" +
            "            hide(\"aggettivo\"+i);\n" +
            "            hide(\"avverbio\"+i);\n" +
            "            hide(\"congiunzione\"+i);\n" +
            "            hide(\"preposizione\"+i);\n" +
            "            hide(\"punteggiatura\"+i);\n" +
            "            hide(\"pronome\"+i);\n" +
            "            show(\"articolo\"+i);\n" +
            "            hide(\"nome\"+i);\n" +
            "            hide(\"verbo\"+i);\n" +
            "            hide(\"tempo\"+i);\n" +
            "            hide(\"persona\"+i);\n" +
            "            show(\"genere\"+i);\n" +
            "            show(\"numero\"+i);\n" +
            "            break;\n" +
            "        case 'S':\n" +
            "            hide(\"aggettivo\"+i);\n" +
            "            hide(\"avverbio\"+i);\n" +
            "            hide(\"congiunzione\"+i);\n" +
            "            hide(\"preposizione\"+i);\n" +
            "            hide(\"punteggiatura\"+i);\n" +
            "            hide(\"pronome\"+i);\n" +
            "            hide(\"articolo\"+i);\n" +
            "            show(\"nome\"+i);\n" +
            "            hide(\"verbo\"+i);\n" +
            "            hide(\"tempo\"+i);\n" +
            "            hide(\"persona\"+i);\n" +
            "            show(\"genere\"+i);\n" +
            "            show(\"numero\"+i);\n" +
            "            break;\n" +
            "        case 'V':\n" +
            "            hide(\"aggettivo\"+i);\n" +
            "            hide(\"avverbio\"+i);\n" +
            "            hide(\"congiunzione\"+i);\n" +
            "            hide(\"preposizione\"+i);\n" +
            "            hide(\"punteggiatura\"+i);\n" +
            "            hide(\"pronome\"+i);\n" +
            "            hide(\"articolo\"+i);\n" +
            "            hide(\"nome\"+i);\n" +
            "            show(\"verbo\"+i);\n" +
            "            show(\"tempo\"+i);\n" +
            "            hide(\"persona\"+i);\n" +
            "            hide(\"genere\"+i);\n" +
            "            hide(\"numero\"+i);\n" +
            "            break;\n" +
            "        case 'X':\n" +
            "            hide(\"aggettivo\"+i);\n" +
            "            hide(\"avverbio\"+i);\n" +
            "            hide(\"congiunzione\"+i);\n" +
            "            hide(\"preposizione\"+i);\n" +
            "            hide(\"punteggiatura\"+i);\n" +
            "            hide(\"pronome\"+i);\n" +
            "            hide(\"articolo\"+i);\n" +
            "            hide(\"nome\"+i);\n" +
            "            hide(\"verbo\"+i);\n" +
            "            hide(\"tempo\"+i);\n" +
            "            hide(\"persona\"+i);\n" +
            "            hide(\"genere\"+i);\n" +
            "            hide(\"numero\"+i);\n" +
            "            break;\n" +
            "        default:\n" +
            "            hide(\"aggettivo\"+i);\n" +
            "            hide(\"avverbio\"+i);\n" +
            "            hide(\"congiunzione\"+i);\n" +
            "            hide(\"preposizione\"+i);\n" +
            "            hide(\"punteggiatura\"+i);\n" +
            "            hide(\"pronome\"+i);\n" +
            "            hide(\"articolo\"+i);\n" +
            "            hide(\"nome\"+i);\n" +
            "            hide(\"verbo\"+i);\n" +
            "            hide(\"tempo\"+i);\n" +
            "            hide(\"persona\"+i);\n" +
            "            hide(\"genere\"+i);\n" +
            "            hide(\"numero\"+i);\n" +
            "            break;\n" +
            "    }\n" +
            "}\n" +
            "function aggettivo(i){\n" +
            "    var x = document.getElementById(\"aggettivo\"+i).value;\n" +
            "    switch(x){\n" +
            "        case 'N':\n" +
            "            hide(\"genere\"+i);\n" +
            "            hide(\"numero\"+i);\n" +
            "            break;\n" +
            "        default:\n" +
            "            show(\"genere\"+i);\n" +
            "            show(\"numero\"+i);\n" +
            "            break;\n" +
            "    }\n" +
            "}\n" +
            "function preposizione(){\n" +
            "    var x = document.getElementById(\"preposizione\"+i).value;\n" +
            "    switch(x){\n" +
            "        case 'E':\n" +
            "            hide(\"genere\"+i);\n" +
            "            hide(\"numero\"+i);\n" +
            "            break;\n" +
            "        default:\n" +
            "            show(\"genere\"+i);\n" +
            "            show(\"numero\"+i);\n" +
            "            break;\n" +
            "    }\n" +
            "}\n" +
            "function pronome(i){\n" +
            "    var x = document.getElementById(\"pronome\"+i).value;\n" +
            "    switch(x){\n" +
            "        case 'PE':\n" +
            "            show(\"persona\"+i);\n" +
            "            show(\"genere\"+i);\n" +
            "            show(\"numero\"+i);\n" +
            "            break;\n" +
            "        case 'PC':\n" +
            "            show(\"persona\"+i);\n" +
            "            show(\"genere\"+i);\n" +
            "            show(\"numero\"+i);\n" +
            "            break;\n" +
            "        default:\n" +
            "            hide(\"persona\"+i);\n" +
            "            show(\"genere\"+i);\n" +
            "            show(\"numero\"+i);\n" +
            "            break;\n" +
            "    }\n" +
            "}\n" +
            "function nome(i){\n" +
            "    var x = document.getElementById(\"nome\"+i).value;\n" +
            "    switch(x){\n" +
            "        case '-':\n" +
            "            show(\"genere\"+i);\n" +
            "            show(\"numero\"+i);\n" +
            "            break;\n" +
            "        default:\n" +
            "            hide(\"genere\"+i);\n" +
            "            hide(\"numero\"+i);\n" +
            "            break;\n" +
            "    }\n" +
            "}\n" +
            "function verbo(i){\n" +
            "    var x = document.getElementById(\"verbo\"+i).value;\n" +
            "    switch(x){\n" +
            "        case 'VA':\n" +
            "            hide(\"pp\");\n" +
            "            document.getElementById(\"tempo\"+i).selectedIndex=0;\n" +
            "            break;\n" +
            "        case 'VM':\n" +
            "            hide(\"pp\");\n" +
            "            document.getElementById(\"tempo\"+i).selectedIndex=0;\n" +
            "            break;\n" +
            "        default:\n" +
            "            show(\"pp\");\n" +
            "            break;\n" +
            "    }\n" +
            "}\n" +
            "function tempo(i){\n" +
            "    var x = document.getElementById(\"tempo\"+i).value;\n" +
            "    switch(x){\n" +
            "        case 'f':\n" +
            "            hide(\"persona\"+i);\n" +
            "            hide(\"genere\"+i);\n" +
            "            hide(\"numero\"+i);\n" +
            "            break;\n" +
            "        case 'g':\n" +
            "            hide(\"persona\"+i);\n" +
            "            hide(\"genere\"+i);\n" +
            "            hide(\"numero\"+i);\n" +
            "            break;\n" +
            "        case 'pp':\n" +
            "            hide(\"persona\"+i);\n" +
            "            hide(\"genere\"+i);\n" +
            "            show(\"numero\"+i);\n" +
            "            break;\n" +
            "        case 'ps':\n" +
            "            hide(\"persona\"+i);\n" +
            "            show(\"genere\"+i);\n" +
            "            show(\"numero\"+i);\n" +
            "            break;\n" +
            "        default:\n" +
            "            show(\"persona\"+i);\n" +
            "            hide(\"genere\"+i);//modificato\n" +
            "            show(\"numero\"+i);\n" +
            "            break;\n" +
            "    }\n" +
            "}\n";
    }
    /**
     * This method is used to apply css
     * @param index -
     */
    getCss(index) {
        return "" +
            "\t\t\t#aggettivo" + index + ",\n" +
            "\t\t\t#avverbio" + index + ",\n" +
            "\t\t\t#congiunzione" + index + ",\n" +
            "\t\t\t#preposizione" + index + ",\n" +
            "\t\t\t#punteggiatura" + index + ",\n" +
            "\t\t\t#pronome" + index + ",\n" +
            "\t\t\t#articolo" + index + ",\n" +
            "\t\t\t#nome" + index + ",\n" +
            "\t\t\t#tempo" + index + ",\n" +
            "\t\t\t#verbo" + index + ",\n" +
            "\t\t\t#genere" + index + ",\n" +
            "\t\t\t#numero" + index + ",\n" +
            "\t\t\t#persona" + index + "\n" +
            "\t\t\t{\n" +
            "\t\t\t\tdisplay: none;\n" +
            "\t\t\t}\n";
    }
    /**
     * This method is used to display the page menù
     * @return {string} the HTML source
     */
    getMenu() {
        let ret = "\t\t<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">\n" +
            "\t\t\t<div class=\"navbar-brand\">Colletta</div>\n" +
            "\t\t\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">\n" +
            "\t\t\t\t<span class=\"navbar-toggler-icon\"></span>\n" +
            "\t\t\t</button>\n" +
            "\t\t\t<div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">\n" +
            "\t\t\t\t<ul class=\"navbar-nav mr-auto\">\n";
        for (let i in this.menuList) {
            ret += "" +
                "\t\t\t\t\t<li class=\"nav-item\">\n" +
                "\t\t\t\t\t\t<a class=\"nav-link\" href=\"" + this.menuList[i].link + "\">" + this.menuList[i].name + "</a>\n" +
                "\t\t\t\t\t</li>\n";
        }
        ret += "\t\t\t\t</ul>\n";
        //aggiungo login o logout
        ret += this.getLoginArea();
        ret += "\t\t\t</div>\n" +
            "\t\t</nav>\n";
        return ret;
    }
    /**
     * This method is used to display the page login area
     * @return {string} the HTML source
     */
    getLoginArea() {
        if (this.exercisePresenter.isLoggedIn()) {
            return "" +
                "\t\t\t\t<form class='form-inline my-2 my-lg-0' action='/logout'>\n" +
                "\t\t\t\t\t<div class=\"form-group\">" +
                "\t\t\t\t\t\t<a class=\"btn btn-default btn-circle btn-sm mr-4 pt-2\" href=\"/profile\" role=\"button\"><i class=\"fas fa-user-circle\" style=\"color: white; font-size:26px\"></i></a>\n" +
                "\t\t\t\t\t\t<button type=\"submit\" class=\"btn-sm btn-primary my-2 my-sm-0\">Logout</button>\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t</form>\n";
        }
        else {
            let ret = "";
            ret += "" +
                "\t\t\t\t<form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>\n" +
                "\t\t\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t\t\t<input type=\"text\" class=\"form-control mr-sm-2\" name='username' placeholder=\"Username\" required=\"required\">\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t\t\t<input type=\"password\" class=\"form-control mr-sm-2\" name='password' placeholder=\"Password\" required=\"required\">\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t\t\t<button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0 mr-2\">Accedi</button>\n" +
                "\t\t\t\t\t\t<a class=\"btn-sm btn btn-primary my-2 my-sm-0\" href=\"/registration\" role=\"button\">Registrati</a>\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t</form>\n";
            return ret;
        }
    }
    /**
     * This method splits a sentence on spaces and punctuation
     * @returns string [] - an array containing the split sentence
     */
    splitSentence() {
        this.sentence = this.sentence.replace(/\-/g, " - ");
        this.sentence = this.sentence.replace(/\!/g, " ! ");
        this.sentence = this.sentence.replace(/\?/g, " ? ");
        this.sentence = this.sentence.replace(/,/g, " , ");
        this.sentence = this.sentence.replace(/:/g, " : ");
        this.sentence = this.sentence.replace(/;/g, " ; ");
        this.sentence = this.sentence.replace(/\//g, " / ");
        this.sentence = this.sentence.replace(/\*/g, " * ");
        this.sentence = this.sentence.replace(/\(/g, " ( ");
        this.sentence = this.sentence.replace(/\)/g, " ) ");
        this.sentence = this.sentence.replace(/\[/g, " [ ");
        this.sentence = this.sentence.replace(/\]/g, " ] ");
        this.sentence = this.sentence.replace(/{/g, " { ");
        this.sentence = this.sentence.replace(/}/g, " } ");
        this.sentence = this.sentence.replace(/_/g, " _ ");
        this.sentence = this.sentence.replace(/`/g, " ` ");
        this.sentence = this.sentence.replace(/‘/g, " ‘ ");
        this.sentence = this.sentence.replace(/’/g, " ’ ");
        this.sentence = this.sentence.replace(/\"/g, " \" ");
        this.sentence = this.sentence.replace(/“/g, " “ ");
        this.sentence = this.sentence.replace(/”/g, " ” ");
        this.sentence = this.sentence.replace(/«/g, " « ");
        this.sentence = this.sentence.replace(/»/g, " » ");
        this.sentence = this.sentence.replace(/\s+/g, ' '); //if there are multiple spaces
        this.sentence = this.sentence.replace(/\s+'/g, '\''); //if there are spaces before '
        let arr = this.sentence.split("");
        for (let i = 0; i < arr.length; i++) {
            if (i <= arr.length - 3 && arr[i] === "." && arr[i + 1] === "." && arr[i + 2] === ".") {
                arr[i] = " ... ";
                arr[i + 1] = arr[i + 2] = " ";
            }
            else if (arr[i] === ".") {
                arr[i] = " . ";
            }
        }
        this.sentence = arr.join("");
        arr = this.sentence.split(new RegExp(" |(?<=')"));
        arr = arr.filter(Boolean); //remove empty string like ''
        return arr;
    }
}
exports.ExerciseView = ExerciseView;
//# sourceMappingURL=ExerciseView.js.map