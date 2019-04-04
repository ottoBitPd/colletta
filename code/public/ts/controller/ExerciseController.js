"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PageController_1 = require("./PageController");
//import {ExerciseView} from "../view/ExerciseView";
const Client_1 = require("../model/Client");
//import {HunposManager} from "../model/HunposManager";
class ExerciseController extends PageController_1.PageController {
    constructor(viewExercise, viewSave) {
        super(null);
        this.viewExercise = viewExercise;
        this.viewSave = viewSave;
        this.exerciseClient = (new Client_1.Client.builder()).buildExerciseClient().build().getExerciseClient();
        this.fileSystem = require('fs');
    }
    update(app) {
        app.post('/exercise', (request, response) => __awaiter(this, void 0, void 0, function* () {
            if (this.exerciseClient) {
                let key = yield this.exerciseClient.insertExercise(request.body.sentence, "authorIdValue");
                //sending the sentence to hunpos which will provide a solution
                var hunposSolution = yield this.exerciseClient.autosolve(request.body.sentence, "authorIdValue");
                //creation of the array containing tags provided from hunpos solution
                var hunposTags = this.extractTags(hunposSolution);
                //converting tags to italian
                var hunposTranslation = this.translateTags(hunposTags);
                //console.log("view: "+JSON.stringify(this.view));
                this.viewExercise.setSentence(request.body.sentence);
                this.viewExercise.setKey(key);
                this.viewExercise.setHunposTranslation(hunposTranslation);
                this.viewExercise.setHunposTags(hunposTags);
                response.send(this.viewExercise.getPage());
            }
        }));
        app.post('/saveExercise', (request, response) => {
            if (this.exerciseClient) {
                console.log("post: ", request.body);
                var words = this.exerciseClient.getSplittedSentence(request.body.sentence);
                var wordsnumber = words.length;
                var hunposTags = JSON.parse(request.body.hunposTags);
                var tagsCorrection = this.correctionToTags(wordsnumber, request.body);
                //building a array merging tags coming from user corrections and hunpos solution
                var finalTags = this.correctsHunpos(hunposTags, tagsCorrection);
                //console.log("finalTags: "+finalTags);
                //solverId ha un valore di Prova
                this.exerciseClient.setSolution(request.body.sentence, "sessionAuthorId", "solverID", finalTags, this.convertTopics(request.body.topics), request.body.difficulty);
                this.exerciseClient.addValutation(request.body.sentence, "sessionauthorId", "teacherIdValue", 10); //valori di prova
                //saving in the database the final solution for the exercise
                //this.model.writeSolution(sentence.split(" "), finalTags, sentence, key);
                response.send(this.viewSave.getPage());
            }
        });
    }
    extractTags(objSolution) {
        let tags = [];
        for (let i in objSolution.sentence) {
            tags.push(objSolution.sentence[i].label);
        }
        return tags;
    }
    /**
     * Converts solution tags to italian.
     * @param tags - array of tag coming from hunpos solution
     * @returns {Array} an array containing the italian translation for every tag
     */
    translateTags(tags) {
        var hunposTranslation = [];
        for (var i = 0; i < tags.length; i++) {
            hunposTranslation[i] = this.translateTag(tags[i]);
        }
        return hunposTranslation;
    }
    /**
     * Converts a single tag to an italian string representing it
     * @param tag - a string containg the tag to convert
     * @returns {string} a string containing the italian translation of the tag
     */
    translateTag(tag) {
        var content = this.fileSystem.readFileSync("./src/ts/controller/vocabolario.json");
        var jsonContent = JSON.parse(content);
        var lowercase = tag.split(/[A-Z]{1,2}/);
        var uppercase = tag.split(/[a-z0-9]+/);
        var result = "";
        //console.log("uppercase[0]: "+uppercase[0]);
        if (uppercase[0] !== 'V' && uppercase[0] !== 'PE' && uppercase[0] !== 'PC') {
            for (var i in jsonContent) {
                if (i === uppercase[0]) {
                    result += jsonContent[i];
                }
                if (lowercase[1]) {
                    if (i === lowercase[1]) {
                        result += " ";
                        result += jsonContent[i];
                    }
                }
            }
            return result;
        }
        for (var x in jsonContent) {
            if (x === tag) {
                result += jsonContent[x];
            }
        }
        return result;
    }
    /**
     * This method merges the hunpos's solution and the user's solution.
     * If the user lets some correction field unsetted means that the hunpos solution,
     * for that word, was correct.
     * @param hunposTags - array that contains the solution tags provided by hunpos
     * @param tagsCorrection - array that contains the solution tags provided by user
     * @returns {Array} a string array containing the tags of the final solution.
     */
    correctsHunpos(hunposTags, tagsCorrection) {
        let finalTags = [];
        //console.log("hunpos: "+hunposTags);
        //console.log("user: "+tagsCorrection);
        for (let i in hunposTags) {
            if (tagsCorrection[i] === "")
                finalTags[i] = hunposTags[i];
            else if (tagsCorrection[i] !== hunposTags[i])
                finalTags[i] = tagsCorrection[i];
            else
                finalTags[i] = hunposTags[i];
        }
        //console.log("Final: "+finalTags);
        return finalTags;
    }
    /**
     * This method converts the italian solution, set by the user,
     * to the tags understandable for hunpos.
     * @param wordsnumber - the number of the words in the sentence
     * @param dataCorrection - a json object containing all the corrections suggested by the user
     * @returns {Array} an array containing the tags of the solution suggested by the user
     */
    correctionToTags(wordsnumber, dataCorrection) {
        //console.log("dataCorrection: "+require('util').inspect(dataCorrection));
        let optionsIndex = 0, wordIndex = 0; //optionsIndex counter for options of the first select input field
        let tagsCorrection = [];
        tagsCorrection.length = wordsnumber;
        let actualTag = "";
        for (let i in dataCorrection) {
            //avoiding the hidden input field received with the others data correction
            if (i !== 'sentence' && i !== 'wordsnumber' && i !== 'key' && i !== 'hunposTags') {
                if (dataCorrection[i] !== '-') { //se è stato settato qualcosa
                    //invalid tags or tags that must be set in the second input field
                    if (dataCorrection[i] === 'A' || (dataCorrection[i] === 'B' && i === ('general' + wordIndex)) || (dataCorrection[i] === 'E' && i === ('general' + wordIndex)) || (dataCorrection[i] === 'S' && i === ('general' + wordIndex)) || (dataCorrection[i] === 'V' && i === ('general' + wordIndex))) {
                        actualTag += "";
                    }
                    else {
                        actualTag += dataCorrection[i];
                    }
                }
                optionsIndex++;
                if (optionsIndex == 14) {
                    optionsIndex = 0;
                    tagsCorrection[wordIndex] = actualTag;
                    wordIndex++;
                    actualTag = "";
                }
            }
        }
        return tagsCorrection;
    }
    /**
     * This method splits the topics by space and saves it in an array
     * @param topics - a string conattaining the topics
     * @returns {Array} an array containing the topics splitted by space
     */
    convertTopics(topics) {
        return topics.split(" ");
    }
}
exports.ExerciseController = ExerciseController;
//# sourceMappingURL=ExerciseController.js.map