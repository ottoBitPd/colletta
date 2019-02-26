const PageController = require("./PageController.js");
class ExercisePageController extends PageController{
    constructor(view, model, db){
        super();
        this.view=view;
        this.model=model;
        this.db=db;
        var Exercise = require('./Exercise.js');
        this.objExercise = new Exercise();



        var Adapter = require('./HunposAdapter.js');
        this.objAd = new Adapter();

        this.fs=require('fs');

    }
    update(app){
        app.post('/exercise', (request, response) => {

            this.objExercise.setSentence(request.body.sentence);

            console.log("sentence: "+this.objExercise.getSentence());

            //checking if the exercise sentence already exists in the database
            var key= this.db.checkIfExists(this.objExercise.getSentence());
            if(key>=0)
                this.objExercise.setKey(key);
            else
                this.objExercise.setKey(this.db.writeSentence(this.objExercise.getSentence()));
            //sending the sentence to hunpos which will provide a solution
            var hunposSolution = this.objAd.getHunposSolution(this.objExercise.getSentence());
            //creation of the array containing tags provided from hunpos solution
            var hunposTags = this.objExercise.extractTags(hunposSolution);
            //converting tags to italian
            var hunposIta = this.tagsToIta(hunposTags);
            /*var obj = this.buildJsonObj(objExercise.getSentence(),objExercise.getKey(),hunposIta,hunposTags);
            console.log("str:"+obj);*/
            console.log("view: "+JSON.stringify(this.view));
            this.view.setSentence(this.objExercise.getSentence());
            this.view.setKey(this.objExercise.getKey());
            this.view.setHunposIta(hunposIta);
            this.view.setHunposTags(hunposTags);
            response.send(this.view.getPage());
        });
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
        var content = this.fs.readFileSync("./js/controller/vocabolario2.json");
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
module.exports = ExercisePageController;