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
const PagePresenter_1 = require("./PagePresenter");
const Client_1 = require("../model/Client/Client");
const fileSystem = require("fs");
const PageView_1 = require("../view/PageView");
var session = require('express-session');
const content = fileSystem.readFileSync("./src/ts/presenter/vocabolario.json");
/**
 *  Class to manage a single exercise
 */
class ExercisePresenter extends PagePresenter_1.PagePresenter {
    constructor(view) {
        super(view);
        this.client = (new Client_1.Client.builder()).buildExerciseClient().buildUserClient().build();
        this.userSolution = [];
        this.correction = null;
        this.updateState = false;
    }
    /**
     * This method returns user's solution
     */
    getUserSolution() {
        return this.userSolution;
    }
    /**
     * This method returns correction of exercise
     */
    getCorrection() {
        return this.correction;
    }
    /**
     * This method provides to manage the view urls.
     * @param app
     */
    update(app) {
        this.listenExercise(app);
        this.saveExercise(app);
        this.insertExercise(app);
        this.updateExercise(app);
    }
    /**
     * This method provides to add a new exercise
     * @param app
     */
    insertExercise(app) {
        app.post('/exercise/insert', (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.correction = null;
            let exerciseClient = this.client.getExerciseClient();
            if (exerciseClient) {
                //sending the sentence to hunpos which will provide a solution
                var posSolution = yield exerciseClient.autosolve(request.body.sentence, "authorIdValue");
                //converting tags to italian
                var posTranslation = this.translateTags(posSolution);
                this.view.setSentence(request.body.sentence);
                this.view.setPosTranslation(posTranslation);
                this.view.setPosTags(posSolution);
                this.view.setUserKind(PageView_1.UserKind.teacher);
                if (request.body.solutionKey !== "null") {
                    //update of an inserted solution
                    this.updateState = true;
                    this.view.setSentenceKey(request.body.exerciseKey);
                    this.view.setSolutionKey(request.body.solutionKey);
                    this.view.setTitle("Aggiorno Esercizio");
                    response.send(yield this.view.getPage());
                }
                else {
                    this.updateState = false;
                    this.view.setTitle("Esercizio");
                    response.send(yield this.view.getPage());
                }
            }
        }));
    }
    updateExercise(app) {
        app.post('/exercise/update', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let exerciseClient = this.client.getExerciseClient();
            if (exerciseClient && request.body.solutionKey !== "null" && request.body.sentenceKey !== "null") {
                let words = exerciseClient.getSplitSentence(request.body.sentence);
                let wordsnumber = words.length;
                //update di una vecchia soluzione
                let hunposTags = JSON.parse(request.body.hunposTags);
                let tagsCorrection = this.correctionToTags(wordsnumber, request.body);
                //building a array merging tags coming from user corrections and hunpos solution
                let finalTags = this.correctsPOS(hunposTags, tagsCorrection);
                let solution = {
                    tags: finalTags,
                    _public: request.body.public,
                    topics: this.splitTopics(request.body.topics),
                    difficulty: request.body.difficulty
                };
                yield exerciseClient.updateSolution(request.body.sentenceKey, request.body.solutionKey, solution);
            }
            response.redirect('/exercises');
        }));
    }
    listenExercise(app) {
        app.post('/exercise', (request, response) => __awaiter(this, void 0, void 0, function* () {
            this.correction = null;
            let exerciseClient = this.client.getExerciseClient();
            if (exerciseClient) {
                this.view.setTitle("Esercizio");
                this.view.setSentence(request.body.sentence);
                this.view.setPosTranslation(null);
                this.view.setCorrections(yield this.teacherSolutions(request.body.sentence));
                if (session.username !== undefined) {
                    this.view.setUserKind(PageView_1.UserKind.student);
                }
                else {
                    //not logged
                    this.view.setUserKind(PageView_1.UserKind.user);
                }
                response.send(yield this.view.getPage());
            }
        }));
    }
    /**
     * This method provides to save a new exercise
     * @param app
     */
    saveExercise(app) {
        app.post('/exercise/save', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let exerciseClient = this.client.getExerciseClient();
            let userClient = this.client.getUserClient();
            if (exerciseClient && userClient) {
                let words = exerciseClient.getSplitSentence(request.body.sentence);
                let ID = "-1";
                if (session.username)
                    ID = yield userClient.search(session.username);
                if (this.view.getUserKind() === PageView_1.UserKind.teacher) {
                    this.teacherInsert(request, words, ID);
                    response.redirect('/');
                }
                else {
                    yield this.userInsert(request, ID, words);
                    response.send(yield this.view.getPage());
                }
            }
        }));
    }
    /**
     * This method provides to save a new exercise when the user is a student or unknown
     * @param request HTTP request received
     * @param ID the user's ID
     * @param words the array of words composing the sentence
     */
    userInsert(request, ID, words) {
        return __awaiter(this, void 0, void 0, function* () {
            let corrections = [{ tags: [], difficulty: -1 }];
            let exerciseClient = this.client.getExerciseClient();
            if (exerciseClient) {
                if (request.body.correction !== "auto") {
                    corrections = yield this.teacherSolutions(request.body.sentence);
                    corrections = corrections.filter((value) => value.id === request.body.correction);
                }
                let solution = {
                    0: ID,
                    1: this.correctionToTags(words.length, request.body),
                    2: corrections[0].tags,
                    3: corrections[0].difficulty
                };
                let valutation = {
                    0: null,
                    1: yield exerciseClient.evaluate(solution["1"], "", [], request.body.sentence, -1)
                };
                this.userSolution = solution[1];
                if (request.body.correction === "auto") {
                    this.correction = {
                        "mark": valutation[1],
                        "tags": yield exerciseClient.autosolve(request.body.sentence, ID)
                    };
                    valutation = {};
                }
                else {
                    valutation[0] = corrections[0].userID;
                    valutation[1] = yield exerciseClient.evaluate(solution["1"], "", [], request.body.sentence, corrections[0].difficulty, corrections[0].userID);
                    this.correction = { "mark": valutation[1], "tags": corrections[0].tags };
                }
                exerciseClient.insertExercise(request.body.sentence, ID, solution, valutation);
            }
        });
    }
    /**
     * This method provides to save a new exercise when the user is a teacher who wants to insert a new correction
     * @param request HTTP request received
     * @param ID the user's ID
     * @param words the array of words composing the sentence
     */
    teacherInsert(request, words, ID) {
        let hunposTags = JSON.parse(request.body.hunposTags);
        let tagsCorrection = this.correctionToTags(words.length, request.body);
        //building a array merging tags coming from user corrections and hunpos solution
        let finalTags = this.correctsPOS(hunposTags, tagsCorrection);
        let solution = {
            0: ID,
            1: finalTags,
            2: this.splitTopics(request.body.topics),
            3: request.body.difficulty
        };
        let valutation = {
            0: ID,
            1: 10
        };
        this.userSolution = solution[1];
        this.correction = null;
        let exerciseClient = this.client.getExerciseClient();
        if (exerciseClient)
            exerciseClient.insertExercise(request.body.sentence, ID, solution, valutation, request.body.public);
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
        const jsonContent = JSON.parse(content.toString());
        let lowercase = tag.split(/[A-Z]{1,2}/).join(""); // lowercase part of the tag
        let uppercase = tag.split(/[a-z0-9]+/).join(""); // uppercase part of the tag
        let result = "";
        if (uppercase[0] !== 'V' && uppercase !== 'PE' && uppercase !== 'PC') {
            for (let i in jsonContent) {
                if (i === uppercase) {
                    result += jsonContent[i];
                }
                if (lowercase) {
                    if (i === lowercase) {
                        result += " ";
                        result += jsonContent[i];
                    }
                }
            }
            return result;
        }
        return jsonContent[tag];
    }
    /**
     * This method merges the hunpos's solution and the user's solution.
     * If the user lets some correction field unsetted means that the hunpos solution,
     * for that word, was correct.
     * @param posTags - array that contains the solution tags provided by hunpos
     * @param tagsCorrection - array that contains the solution tags provided by user
     * @returns {string[]} a string array containing the tags of the final solution.
     */
    correctsPOS(posTags, tagsCorrection) {
        let finalTags = [];
        for (let i in posTags) {
            if (tagsCorrection[i] === "-")
                finalTags[i] = posTags[i];
            else if (tagsCorrection[i] !== posTags[i])
                finalTags[i] = tagsCorrection[i];
            else
                finalTags[i] = posTags[i];
        }
        return finalTags;
    }
    /**
     * This method converts the solution, set by the user,
     * to the tags understandable for hunpos.
     * @param wordsnumber - the number of the words in the sentence
     * @param dataCorrection - a json object containing all the corrections suggested by the user
     * @returns {string[]} an array containing the tags of the solution suggested by the user
     */
    correctionToTags(wordsnumber, dataCorrection) {
        let result = [];
        for (let i = 0; i < wordsnumber; ++i) {
            dataCorrection["grammarclass" + i] = dataCorrection["grammarclass" + i].join("").replace(/\-/g, "");
            let tag;
            if (dataCorrection["grammarclass" + i] === "") {
                tag = dataCorrection["general" + i];
            }
            else {
                tag = dataCorrection["grammarclass" + i];
            }
            result.push(tag +
                dataCorrection["tempo" + i].replace("-", "") +
                dataCorrection["persona" + i].replace("-", "") +
                dataCorrection["genere" + i].replace("-", "") +
                dataCorrection["numero" + i].replace("-", ""));
        }
        return result;
    }
    /**
     * This method splits the topics by space and saves it in an array
     * @param topics - a string conattaining the topics
     * @returns {Array} an array containing the topics splitted by space
     */
    splitTopics(topics) {
        return topics.split(" ");
    }
    /**
     * This method returns all the public teacher solutions avaiable for an exercise
     * @param sentence - the sentence of the exercise
     * @returns any[] - an array of json containing the public teacher solutions of the exercise
     */
    teacherSolutions(sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            let exerciseClient = this.client.getExerciseClient();
            let userClient = this.client.getUserClient();
            if (userClient) {
                let teacherList = yield userClient.teacherList();
                for (let teacher of teacherList) {
                    if (exerciseClient) {
                        let solutions = yield exerciseClient.searchSolution(sentence, teacher);
                        for (let sol of solutions) {
                            if (sol._public === 'true') { //only if the teacher set solution as public
                                sol = {
                                    "id": sol.id,
                                    "userID": sol.userID,
                                    "username": (yield userClient.getUserData(sol.userID)).username,
                                    "tags": sol.tags,
                                    "time": sol.time,
                                    "difficulty": sol.difficulty,
                                    "topics": sol.topics
                                };
                                result.push(sol);
                            }
                        }
                    }
                }
            }
            return result;
        });
    }
    /**
     *  This method provides to return the solution of exercise
     * @param sentence
     * @param solverId
     * @param time
     * @returns Promise<any>
     */
    findSolution(sentence, solverId, time) {
        return __awaiter(this, void 0, void 0, function* () {
            let exerciseClient = this.client.getExerciseClient();
            if (exerciseClient) {
                let solutions = yield exerciseClient.searchSolution(sentence, solverId);
                return solutions.find((sol) => sol.time === time);
            }
            return null;
        });
    }
    getUpdateState() {
        return this.updateState;
    }
}
exports.ExercisePresenter = ExercisePresenter;
//# sourceMappingURL=ExercisePresenter.js.map