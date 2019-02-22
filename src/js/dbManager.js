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
        this.database.ref('data').child(child).child(this.counter).set({frase: sent});
        this.counter++;
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