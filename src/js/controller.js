/**
 * Class that represents the controller of all information
 * flows between view and model of the application and the hunpos component.
 **/
class Controller {
    /**
     * controller constructor initializes all attributes needed to controller object.
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
     * This method invokes all the methods needed to manage application pages.
     * @param app - the express application
     * @returns {*} reference to the express app
     */
    start(app){
        this.home(app);
        this.demo(app);
        this.exercise(app);
        this.saveExercise(app);
        return app;
    }

    /**
     * The home method provides the app homepage, received from the View.
     * @param app - the express application
     */
    home(app){
        app.get('/', (request, response) => {
            response.send(this.v.getHome());
        });
    }
    /**
     * The demo method provides the page where the demo starts, asking user to insert a sentence.
     * @param app - the express application
     */
    demo(app){
        app.get('/demo', (request, response) => {
            response.send(this.v.getDemo());
        });
    }

    /**
     * The exercise method provides the page where the user can see the hunpos solution
     * and correcting it if needed.
     * @param app - the express application
     */
    exercise(app){
        app.post('/exercise', (request, response) => {
            //creation of an exercise
            var Exercise = require('./model/exercise.js');
            var objExercise = new Exercise(request.body.sentence);
            //checking if the exercise sentence already exists in the database
            var key= this.db.checkIfExists(objExercise.getSentence());
            if(key>=0)
                objExercise.setKey(key);
            else
                objExercise.setKey(this.db.writeSentence(objExercise.getSentence()));
            //sending the sentence to hunpos which will provide a solution
            var hunposSolution = this.ad.getHunposSolution(objExercise.getSentence());
            //creation of the array containing tags provided from hunpos solution
            var hunposTags = objExercise.extractTags(hunposSolution);
            //converting tags to italian
            var hunposIta = this.tagsToIta(hunposTags);
            /*var obj = this.buildJsonObj(objExercise.getSentence(),objExercise.getKey(),hunposIta,hunposTags);
            console.log("str:"+obj);*/
            response.send(this.v.getExercise(objExercise.getSentence(),objExercise.getKey(),hunposIta,hunposTags));
        });
    }

    buildJsonObj(sentence,key,hunposIta,hunposTags){
        var s="{id:1,sentence:\""+sentence+"\",id:2,key:\""+key+"\",id:3,hunposIta:[";
        for(var i=0;i<hunposIta.length;i++){

            if(i===hunposIta.length-1){
                s+="\""+hunposIta[i]+"\"],";
            }
            else{
                s+="\""+hunposIta[i]+"\",";
            }
        }
        s+="id:4,hunposTags:["
        for(var i=0;i<hunposTags.length;i++){

            if(i===hunposTags.length-1){
                s+="\""+hunposTags[i]+"\"]";
            }
            else{
                s+="\""+hunposTags[i]+"\",";
            }
        }
        return s+"}";
    }
    /**
     * This method manage all information about the exercise performed by user,
     * saves them on the database, finally redirects the user to the demo page
     * so he can trains with another sentence.
     * @param app - the express application
     */
    saveExercise(app){
        app.post('/saveExercise', (request, response) => {

            var wordsnumber = request.body.wordsnumber;
            var sentence = request.body.sentence;
            var key = request.body.key;
            var hunposTags = JSON.parse(request.body.hunposTags);
            var tagsCorrection = this.correctionToTags(wordsnumber,request.body);

            //preparo un array di tags fondendo correzioni e soluzione di hunpos
            var finalTags = this.correctsHunpos(hunposTags,tagsCorrection);
            //salvo nel database la soluzione con eventuali correzioni
            this.db.writeSolution(sentence.split(" "), finalTags, sentence, key);
            response.redirect('/demo');
        });
    }

    /**
     * This method merges the hunpos's solution and the user's solution.
     * If the user lets some correction field unsetted means that the hunpos solution,
     * for that word, was correct.
     * @param hunposTags - array that contains the solution tags provided by hunpos
     * @param tagsCorrection - array that contains the solution tags provided by user
     * @returns {Array} a string array containing the tags of the final solution.
     */
    correctsHunpos(hunposTags,tagsCorrection){
        var finalTags=[];
        for(var i in hunposTags){
            if(tagsCorrection[i]==="")
                finalTags[i]=hunposTags[i];
            else if(tagsCorrection[i]!==hunposTags[i])
                finalTags[i]=tagsCorrection[i];
            else
                finalTags[i]=hunposTags[i];
        }
        return finalTags;
    }

    /**
     * This method converts the italian solution, set by the user,
     * to the tags understandable for hunpos.
     * @param wordsnumber - the number of the words in the sentence
     * @param dataCorrection - a json object containing all the corrections suggested by the user
     * @returns {Array} an array containing the tags of the solution suggested by the user
     */
    correctionToTags(wordsnumber, dataCorrection){
        var optionsIndex=0, wordIndex=0;//optionsIndex counter for options of the first select input field
        var tagsCorrection = [];
        tagsCorrection.length = wordsnumber;
        var actualTag="";
        for(var i in dataCorrection) {
            //avoiding the hidden input field received with the others data correction
            if(i !== 'sentence' && i !== 'wordsnumber' && i!=='key' && i!=='hunposTags'){
                if (dataCorrection[i] !== '-') {//se è stato settato qualcosa
                    //invalid tags or tags that must be set in the second input field
                    if(dataCorrection[i]==='A' || (dataCorrection[i]==='B' && i===('general'+ wordIndex)) || (dataCorrection[i]==='E' && i===('general'+ wordIndex)) || (dataCorrection[i]==='S' && i===('general'+ wordIndex)) || (dataCorrection[i]==='V' && i===('general'+ wordIndex))) {
                        actualTag += "";
                    }
                    else{
                        actualTag += dataCorrection[i];
                    }
                }

                optionsIndex++;
                if (optionsIndex == 14) {
                    optionsIndex = 0;
                    tagsCorrection[wordIndex]= actualTag;
                    wordIndex++
                    actualTag = "";
                }
            }
        }
        return tagsCorrection;
    }

    /**
     * Converts solution tags to italian.
     * @param tags - array of tag coming from hunpos solution
     * @returns {Array} an array containing the italian translation for every tag
     */
    tagsToIta(tags){
        var hunposIta = [];
        for(var i=0;i<tags.length;i++){
            hunposIta[i]=this.tagToIta(tags[i]);
        }
        return hunposIta;
    }

    /**
     * Converts a single tag to an italian string representing it
     * @param tag - a string containg the tag to convert
     * @returns {string} a string containing the italian translation of the tag
     */
    tagToIta(tag){
        var content = this.fs.readFileSync("./js/vocabolario2.json");
        var jsonContent = JSON.parse(content);

        var lowercase=tag.split(/[A-Z]{1,2}/);
        var uppercase=tag.split(/[a-z0-9]+/);
        var result="";
        //console.log("uppercase[0]: "+uppercase[0]);
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