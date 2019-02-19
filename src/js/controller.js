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

            //inserisco nel db
            this.db.writeSent("frasi",request.body.frase);
            //leggo e confermo inserimento
            const sentence= this.db.readSent("frasi",(this.db.getCounter()-1));
            console.log("frase: "+sentence);
            //invia frase ad hunpos per corregerla
            var pathSolution = this.ad.correctSentence(sentence);
            console.log("path: "+pathSolution);
            var array = this.extractTags(pathSolution);
            var i;
            for(i=0;i<array.length;i++){
                console.log("array["+i+"]: "+array[i]);
            }
            //convertTagsToIta(array) che ritornerà un array di parole italiane al posto dei tags
            response.send("controlla");
            //response.send(this.v.getSalvafrase(sentence));
        });
    }
    savecorrection(app){
        app.post('/savecorrection', (request, response) => {
            const util = require('util');
            var wordsnumber = request.body.wordsnumber;
            var sentence = request.body.sentence;
            var post = request.body;
            //var html="wordsnumber: "+wordsnumber+"<br/>";
            //html="sentence: "+sentence+"<br/>";
            //html += util.inspect(request.body, {depth: null}) +"<br/><br/>>";
            var j=0, c=0;
            var tags = [];
            tags.length = wordsnumber;
            var actualTag="";
            for(var i in request.body) {
                //perchè in request.body c'è anche sentence e wordsnumber ma a me servono solo le chiavi per i tags
                if(i !== 'sentence' && i !== 'wordsnumber'){
                    if (request.body[i] !== '-') {//se è stato settato qualcosa
                        //questi tag non esistono o devono essere settati sulla seconda tendina
                        if(request.body[i]=='A' || (request.body[i]=='B' && i=='general') || (request.body[i]=='E' && i=='general') || (request.body[i]=='S' && i=='general') || (request.body[i]=='V' && i=='general')) {
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
            /*html+="<br/>";
            for(var x=0; x<tags.length; x++){
                html+=tags[x] +" | ";
            }*/
            //response.send(html);
            //RIMANE DA SCRIVERE L'ARRAY TAGS RELAZIONATO ALL'ARRAY WORDS NEL DB
        });
    }
    test(app){
        app.get('/test', (request, response) => {
            //response.send(this.v.getTest());
            response.send(this.v.getSalvafrase("Ciao come va"));
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
    convertTagsToIta(){

    }
}

module.exports = Controller;