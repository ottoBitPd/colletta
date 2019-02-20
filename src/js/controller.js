class Controller {

    constructor(){
        var View = require('./view.js');
        this.v = new View();
        var DbManager = require('./dbManager.js');
        this.db = new DbManager();
        var Adapter = require('./adapter.js');
        this.ad = new Adapter();
        this.fs = require('fs');
    }

    start(app){
        this.test (app)
        this.home(app);
        this.demo(app);
        this.salvafrase(app);
        this.savecorrection(app);
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
    salvafrase(app){
        app.post('/salvafrase', (request, response) => {
            //controllo su request.body.frase correttezza frase
            //controllo esistenza nel database
            console.log("sentence: "+request.body.frase);
            //inserisco nel db
            var key = this.db.writeSent("frasi",request.body.frase);
            //leggo e confermo inserimento
            const sentence= this.db.readSent("frasi",key);
            //invia frase ad hunpos per corregerla
            var pathSolution = this.ad.correctSentence(sentence);
            console.log("path: "+pathSolution);
            var tags = this.extractTags(pathSolution);
            /*
            //stampo tags di hunpos
            for(var i=0;i<tags.length;i++){
                console.log("tag["+i+"]: "+tags[i]);
            }*/
            var hunposIta = [];
            //for per convertire i tag in array di italiano
            for(var i=0;i<tags.length;i++){
                hunposIta[i]=this.convertTagsToIta(tags[i]);
                //stampo traduzione in ita tags hunpos
                //console.log("hunposIta["+i+"]: "+hunposIta[i]);
            }
            response.send(this.v.getSalvafrase(sentence,key,hunposIta));
        });
    }
    savecorrection(app){
        app.post('/savecorrection', (request, response) => {
            const util = require('util');
            var wordsnumber = request.body.wordsnumber;
            var sentence = request.body.sentence;
            var key = request.body.key;

            var j=0, c=0;//j contatore per l'indice delle tendine, c contatore parola della frase
            var tags = [];
            tags.length = wordsnumber;
            var actualTag="";
            for(var i in request.body) {
                //perchè in request.body c'è anche sentence e wordsnumber ma a me servono solo le chiavi per i tags
                if(i !== 'sentence' && i !== 'wordsnumber' && i!=='key'){
                    if (request.body[i] !== '-') {//se è stato settato qualcosa
                        //questi tag non esistono o devono essere settati sulla seconda tendina
                        if(request.body[i]==='A' || (request.body[i]==='B' && i===('general'+c)) || (request.body[i]==='E' && i===('general'+c)) || (request.body[i]==='S' && i===('general'+c)) || (request.body[i]==='V' && i===('general'+c))) {
                            actualTag += "";
                        }
                        else{
                            actualTag += request.body[i];
                        }
                    }

                    j++;
                    if (j == 14) {
                        j = 0;
                        tags[c]= actualTag;
                        c++
                        actualTag = "";
                    }
                }
            }
            for(var x=0; x<tags.length; x++){
                console.log(tags[x] +" | ");
            }
            //RIMANE DA SCRIVERE L'ARRAY TAGS RELAZIONATO ALL'ARRAY WORDS NEL DB
            this.db.writeSol(sentence.split(" "), tags, sentence, key);
            response.send("esercizio inviato");
        });
    }
    test(app){
        app.get('/test', (request, response) => {
            response.send(this.db.test());
        });
    }
    extractTags(pathSolution){
        var content = this.fs.readFileSync(pathSolution);
        var jsonContent = JSON.parse(content);
        var array = [];

        for(var i in jsonContent.sentence){
            array.push(jsonContent.sentence[i].label);
        }
        return array;
    }
    convertTagsToIta(tag){

        var content = this.fs.readFileSync("./js/vocabolario2.json");
        var jsonContent = JSON.parse(content);


        var lowercase=tag.split(/[A-Z]{1,2}/);
        var uppercase=tag.split(/[a-z0-9]+/);
        var result="";
        console.log("uppercase[0]: "+uppercase[0]);
        if(uppercase[0]!='V' && uppercase[0]!='PE' && uppercase[0]!='PC'){
            for(var i in jsonContent){
                if(i==uppercase[0]){
                    result+=jsonContent[i];
                }
                if(lowercase[1]){
                    if(i==lowercase[1]){
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