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
    writeSent(child,sent){
        let num=0;
        this.database.ref('data/frasi').on("value", snap => {num=snap.numChildren();});
        var equal=false;
        for(var i=0;i<num;i++){
            this.database.ref('data/frasi/'+i).on("value", snap => {
                if(sent===snap.val().frase){
                    //esiste già la frase ritorno la sua chiave
                    equal=true;
                }
            });
            if(equal)
                return i;
        }
        //se non esiste
        this.database.ref('data').child(child).child(this.counter).set({frase: sent});
        this.counter++;
        return this.counter-1;
    }
    test(){
        let k=0;
        const util = require('util');
        this.database.ref('data/frasi/'+key+'/soluzioni').on("value", snap => {
            k = "numchildren: "+snap.numChildren();
        });
        console.log("conta: "+k);
        return k;
    }
    writeSol(words, tags, sentence, key){
        console.log("words: "+words+" tags: "+tags+" sentence: "+sentence+" key: "+key);
        let c=0;
        this.database.ref('data/frasi/'+key+'/soluzioni').once("value", snap => {c=snap.numChildren();});
        console.log("c: "+c);
        for(var i=0;i<words.length;i++){
            console.log("parola: "+words[i]+", tag: "+tags[i]);
            console.log("inserisco parola: "+words[i]+", tag: "+tags[i]+"in data/frasi/"+key+"/soluzioni/"+c+"/"+i);
            this.database.ref('data/frasi/'+key+'/soluzioni').child(c).child(i).set({"word":words[i],"tag":tags[i]});

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