class DbManager{
    constructor() {
        this.database = this.initDB();
        this.counter=0;
        //per tornare quante frasi ci sono
        //this.database.ref('data/frasi').on("value", snap => {this.counter=snap.numChildren();});
    }

    initDB(){
        const firebase = require("firebase-admin");
        const admin = require("firebase-admin");
        const serviceAccount = require("./myproject-bd9d0-firebase-adminsdk-8ktts-3dbc739c06.json");
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://myproject-bd9d0.firebaseio.com"
        });
        return firebase.database();
    }
    writeSentence(sentence){
        let num=0;
        this.database.ref('data/sentences').on("value", snap => {num=snap.numChildren();});
        var equal=false;
        for(var i=0;i<num;i++){
            this.database.ref('data/sentences/'+i).on("value", snap => {
                if(sentence===snap.val().sentence){
                    //esiste già la frase ritorno la sua chiave
                    equal=true;
                }
            });
            if(equal)
                return i;
        }
        //se non esiste
        this.database.ref('data/sentences/'+this.counter).set({sentence: sentence});
        this.counter++;
        return this.counter-1;
    }

    writeSolution(words, tagsCorrection, sentence, key){
        console.log("words: "+words+" tags: "+tagsCorrection+" sentence: "+sentence+" key: "+key);
        let c=0;
        this.database.ref('data/sentences/'+key+'/solutions').once("value", snap => {c=snap.numChildren();});
        console.log("c: "+c);
        for(var i=0;i<words.length;i++){
            //console.log("parola: "+words[i]+", tag: "+tags[i]);
            //console.log("inserisco parola: "+words[i]+", tag: "+tags[i]+"in data/sentences/"+key+"/solutions/"+c+"/"+i);
            this.database.ref('data/sentences/'+key+'/solutions').child(c).child(i).set({"word":words[i],"tag":tagsCorrection[i]});

        }
    }
    readSent(child,key){
        var ret;
        this.database.ref("data/"+child+"/"+key).on("value", snap => {ret = snap.val().frase;});
        return ret;
    }
    getCounter(){
        return this.counter;
    }
}

module.exports = DbManager;