class UrlManager{
    constructor(){
        this.fs = require('fs');
        const DbManager = require('./dbManager.js');
        this.db = new DbManager();
    }

    start(app){
        this.test(app)
        this.home(app);
        this.demo(app);
        this.salvafrase(app);
        return app;
    }



    test(app){
        app.get('/test', (request, response) => {
            /*this.fs.readFile('./html/esercizio.html',"utf8", (err, data) => {
                if (err) {
                    response.send('Error esercizio.html not found');
                    throw err;
                }
                else{
                    response.send(data.replace(/\*table\/g,()=>{return this.build("ciao come va");}));
                }
            });*/
            var data =  this.fs.readFileSync('./html/esercizio.html').toString();
            var words = "ciao come va".split(" ");
            data=data.replace(/\*table\*/g, this.buildForm(words));
            data=data.replace(/\*script\*/g, this.buildScript(words));
            data=data.replace(/\*css\*/g, this.buildCss(words));
            response.send(data);
        });
    }



    home(app){
        app.get('/', (request, response) => {
            //il percorso è relativo alla cartella functions,
            //la cartella del file dove viene creato l'oggetto urlManager?
            this.fs.readFile('./html/benvenuto.html',"utf8", (err, data) => {
                if (err) {
                    response.send('Error benvenuto.html not found');
                    throw err;
                }
                else{
                    response.send(data);
                }
            });
        });
    }

    demo(app){
        app.get('/demo', (request, response) => {
            //il percorso è relativo alla cartella functions
            this.fs.readFile('./html/demo.html',"utf8", (err, data) => {
                if (err) {
                    response.send('Error demo.html not found');
                    throw err;
                }
                else{
                    response.send(data);
                }
            });
        });
    }

    salvafrase(app){
        app.post('/salvafrase', (request, response) => {
            //inserisco nel db
            this.db.writeSent("frasi",request.body.frase);
            //leggo e confermo inserimento
            const sent= this.db.readSent("frasi",(this.db.getCounter()-1));
            /*this.fs.readFile('./html/esercizio.html',"utf8", (err, data) => {
                if (err) {
                    response.send('Error esercizio.html not found');
                    throw err;
                }
                else{
                    response.send(data.replace(/\*table\/g,()=>{return this.build(sent);}));
                }
            });*/
            var data =  this.fs.readFileSync('./html/esercizio.html').toString();
            var words = sent.split(" ");
            data=data.replace(/\*table\*/g, this.buildForm(words));
            data=data.replace(/\*script\*/g, this.buildScript(words));
            data=data.replace(/\*css\*/g, this.buildCss(words));
            response.send(data);
        });
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

module.exports = UrlManager;