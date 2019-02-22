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
    test(app){
        app.get('/test', (request, response) => {
            //response.send(this.v.getTest());
            response.send("pagina per testare codice");
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