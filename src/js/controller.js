
class Controller {
    /**
     * @constructor
     */
    constructor(){
        var View = require('./view.js');
        this.v = new View();
        var DbManager = require('./model/dbManager.js');
        this.db = new DbManager();
        var Adapter = require('./hunpos/adapter.js');
        this.ad = new Adapter();
        this.fs = require('fs');
    }

    /**
     * method start invokes methods to manage application pages
     * @param app - is a reference to
     * @returns {*} app modificata
     */
    start(app){
        this.home(app);
        this.demo(app);
        this.exercise(app);
        this.saveExercise(app);
        return app;
    }

    home(app){
        app.get('/', (request, response) => {
            response.send(this.v.getHome());
        });
    }

    demo(app){
        app.get('/demo', (request, response) => {
            response.send(this.v.getDemo());
        });
    }

    exercise(app){
        app.post('/exercise', (request, response) => {
            //creo un nuovo esercizio
            var Exercise = require('./model/exercise.js');
            var objExercise = new Exercise(request.body.sentence);
            //inserisco la frase del nuovo esercizio nel db
            objExercise.setKey(this.db.writeSentence(objExercise.getSentence()));
            //invia frase ad hunpos per corregerla
            var objSolution = this.ad.getHunposSolution(objExercise.getSentence());
            const util = require('util');
            console.log(util.inspect(objSolution,{depth:null}));
            //dalla risposta di hunpos calcola i tags, ovvero la soluzione dell'esercizio
            var tags = objExercise.extractTags(objSolution);
            //traforma i tags in italiano
            var hunposIta = this.convertToIta(tags);

            response.send(this.v.getExercise(objExercise.getSentence(),objExercise.getKey(),hunposIta));
        });
    }

    saveExercise(app){
        app.post('/saveExercise', (request, response) => {

            var wordsnumber = request.body.wordsnumber;
            var sentence = request.body.sentence;
            var key = request.body.key;
            var tagsCorrection = this.convertToTags(wordsnumber,request.body);


            //RIMANE DA SCRIVERE L'ARRAY TAGS RELAZIONATO ALL'ARRAY WORDS NEL DB
            this.db.writeSolution(sentence.split(" "), tagsCorrection, sentence, key);
            response.send("esercizio inviato");
        });
    }

    convertToTags(wordsnumber, dataCorrection){
        var j=0, c=0;//j contatore per l'indice delle tendine, c contatore parola della frase
        var tagsCorrection = [];
        tagsCorrection.length = wordsnumber;
        var actualTag="";
        for(var i in dataCorrection) {
            //perchè in dataCorrection c'è anche sentence e wordsnumber ma a me servono solo le chiavi per i tags
            if(i !== 'sentence' && i !== 'wordsnumber' && i!=='key'){
                if (dataCorrection[i] !== '-') {//se è stato settato qualcosa
                    //questi tag non esistono o devono essere settati sulla seconda tendina
                    if(dataCorrection[i]==='A' || (dataCorrection[i]==='B' && i===('general'+c)) || (dataCorrection[i]==='E' && i===('general'+c)) || (dataCorrection[i]==='S' && i===('general'+c)) || (dataCorrection[i]==='V' && i===('general'+c))) {
                        actualTag += "";
                    }
                    else{
                        actualTag += dataCorrection[i];
                    }
                }

                j++;
                if (j == 14) {
                    j = 0;
                    tagsCorrection[c]= actualTag;
                    c++
                    actualTag = "";
                }
            }
        }
        return tagsCorrection;
    }

    convertToIta(tags){
        var hunposIta = [];
        for(var i=0;i<tags.length;i++){
            hunposIta[i]=this.convertTagToIta(tags[i]);
        }
        return hunposIta;
    }

    convertTagToIta(tag){
        var content = this.fs.readFileSync("./js/vocabolario2.json");
        var jsonContent = JSON.parse(content);

        var lowercase=tag.split(/[A-Z]{1,2}/);
        var uppercase=tag.split(/[a-z0-9]+/);
        var result="";
        console.log("uppercase[0]: "+uppercase[0]);
        if(uppercase[0]!=='V' && uppercase[0]!=='PE' && uppercase[0]!=='PC'){
            for(var i in jsonContent){
                if(i===uppercase[0]){
                    result+=jsonContent[i];
                }
                if(lowercase[1]){
                    if(i===lowercase[1]){
                        result+=" ";
                        result+=jsonContent[i];
                    }
                }
            }
            return result;

        }
        for(var x in jsonContent){
            if(x===tag){
                result+=jsonContent[x];
            }
        }
        return result;
    }
}

module.exports = Controller;