class Controller {

    constructor(){
        var View = require('./view.js');
        this.v = new View();
        var DbManager = require('./dbManager.js');
        this.db = new DbManager();
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
            const sent= this.db.readSent("frasi",(this.db.getCounter()-1));
            //invia frase ad hunpos per corregerla
            response.send(this.v.getSalvafrase(sent));
        });
    }
    test(app){
        app.get('/test', (request, response) => {
            //response.send(this.v.getTest());
            response.send("pagina per testare codice");
        });
    }
}

module.exports = Controller;