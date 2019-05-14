import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";
import * as fileSystem from "fs";
import {PageView, UserKind} from "../view/PageView";

var session = require('express-session');
const content = fileSystem.readFileSync("./src/ts/presenter/vocabolario.json");

/**
 *  Class to manage a single exercise
 */
class ExercisePresenter extends PagePresenter{

    private userSolution : string[];
    private correction : any | null;
    private updateState : boolean;

    constructor(view : PageView){
        super(view);
        this.client =(new Client.builder()).buildExerciseClient().buildUserClient().build();
        this.userSolution=[];
        this.correction=null;
        this.updateState=false;
    }

    /**
     * This method returns user's solution
     */
    getUserSolution() : string[]{
        return this.userSolution;
    }

    /**
     * This method returns correction of exercise
     */
    getCorrection() : any | null {
        return this.correction;
    }
    /**
     * This method provides to manage the view urls.
     * @param app
     */
    update(app : any){
        this.listenExercise(app);
        this.saveExercise(app);
        this.insertExercise(app);
        this.updateExercise(app);
    }

    /**
     * This method provides to add a new exercise
     * @param app
     */
    private insertExercise(app : any) : void {
        app.post('/exercise/insert', async (request: any, response: any) => {
            this.correction = null;
            let exerciseClient = this.client.getExerciseClient();
            if(exerciseClient) {
                //sending the sentence to hunpos which will provide a solution
                var posSolution = await exerciseClient.autosolve(request.body.sentence, "authorIdValue");
                //converting tags to italian
                var posTranslation = this.translateTags(posSolution);
                this.view.setSentence(request.body.sentence);
                this.view.setPosTranslation(posTranslation);
                this.view.setPosTags(posSolution);
                this.view.setUserKind(UserKind.teacher);
                if (request.body.solutionKey !== "null") {
                    //update of an inserted solution
                    this.updateState = true;
                    this.view.setSentenceKey(request.body.exerciseKey);
                    this.view.setSolutionKey(request.body.solutionKey);
                    this.view.setTitle("Aggiorno Esercizio");
                    response.send(await this.view.getPage());
                }
                else {
                    this.updateState = false;
                    this.view.setTitle("Esercizio");
                    response.send(await this.view.getPage());
                }
            }
        });
    }

    private updateExercise(app : any) : void {
        app.post('/exercise/update', async (request: any, response: any) => {
            let exerciseClient = this.client.getExerciseClient();
            if(exerciseClient && request.body.solutionKey!=="null" && request.body.sentenceKey!=="null"){
                let words = exerciseClient.getSplitSentence(request.body.sentence);
                let wordsnumber = words.length;
                //update di una vecchia soluzione
                let hunposTags = JSON.parse(request.body.hunposTags);
                let tagsCorrection = this.correctionToTags(wordsnumber, request.body);
                //building a array merging tags coming from user corrections and hunpos solution
                let finalTags = this.correctsPOS(hunposTags, tagsCorrection);
                let solution = {
                    tags :finalTags,
                    _public: request.body.public,
                    topics: this.splitTopics(request.body.topics),
                    difficulty: request.body.difficulty
                };
                await exerciseClient.updateSolution(request.body.sentenceKey,request.body.solutionKey,solution);
            }
            response.redirect('/exercises');
        });
    }

    private listenExercise(app :any) : void {
        app.post('/exercise', async (request: any, response: any) => {
            this.correction = null;
            let exerciseClient = this.client.getExerciseClient();
            if(exerciseClient){
                this.view.setTitle("Esercizio");
                this.view.setSentence(request.body.sentence);
                this.view.setPosTranslation(null);
                this.view.setCorrections(await this.teacherSolutions(request.body.sentence));
                if(session.username !== undefined){
                    this.view.setUserKind(UserKind.student);
                } else {
                    //not logged
                    this.view.setUserKind(UserKind.user);
                }
                response.send(await this.view.getPage());
            }
        });
    }

    /**
     * This method provides to save a new exercise
     * @param app
     */
    private saveExercise(app : any){
        app.post('/exercise/save', async (request : any, response : any) => {
            let exerciseClient = this.client.getExerciseClient();
            let userClient = this.client.getUserClient();
            if (exerciseClient && userClient) {
                let words = exerciseClient.getSplitSentence(request.body.sentence);

                let ID : string = "-1";
                if (session.username)
                    ID = await userClient.search(session.username);

                if (this.view.getUserKind() === UserKind.teacher){
                    this.teacherInsert(request, words, ID);
                    response.redirect('/');
                } else {
                    await this.userInsert(request, ID, words);
                    response.send(await this.view.getPage());
                }
            }
        });
    }

    /**
     * This method provides to save a new exercise when the user is a student or unknown
     * @param request HTTP request received
     * @param ID the user's ID
     * @param words the array of words composing the sentence
     */
    private async userInsert(request: any, ID: string, words:string[]) : Promise<void> {
        let corrections: any[] = [{tags: [], difficulty: -1}];
        let exerciseClient = this.client.getExerciseClient();

        if (exerciseClient){
            if (request.body.correction !== "auto") {
                corrections = await this.teacherSolutions(request.body.sentence);
                corrections = corrections.filter((value) => value.id === request.body.correction);
            }

            let solution: any = {
                0: ID,
                1: this.correctionToTags(words.length, request.body),
                2: corrections[0].tags,
                3: corrections[0].difficulty
            };

            let valutation: any = {
                0: null,
                1: await exerciseClient.evaluate(solution["1"], "", [], request.body.sentence, -1)
            };

            this.userSolution = solution[1];

            if (request.body.correction === "auto") {
                this.correction = {
                    "mark": valutation[1],
                    "tags": await exerciseClient.autosolve(request.body.sentence, ID)
                };
                valutation = {};
            } else {
                valutation[0] = corrections[0].userID;
                valutation[1] = await exerciseClient.evaluate(solution["1"], "", [],
                    request.body.sentence, corrections[0].difficulty, corrections[0].userID);
                this.correction = {"mark": valutation[1], "tags": corrections[0].tags};
            }

            exerciseClient.insertExercise(request.body.sentence, ID, solution, valutation);
        }
    }

    /**
     * This method provides to save a new exercise when the user is a teacher who wants to insert a new correction
     * @param request HTTP request received
     * @param ID the user's ID
     * @param words the array of words composing the sentence
     */
    private teacherInsert(request: any, words : string[], ID: string) : void {
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
    public translateTags(tags : string []) : string[]{//rimettere private
        var hunposTranslation = [];
        for(var i=0;i<tags.length;i++){
            hunposTranslation[i]=this.translateTag(tags[i]);
        }
        return hunposTranslation;
    }

    /**
     * Converts a single tag to an italian string representing it
     * @param tag - a string containg the tag to convert
     * @returns {string} a string containing the italian translation of the tag
     */
    public translateTag(tag : string){
        const jsonContent = JSON.parse(content.toString());

        let lowercase=tag.split(/[A-Z]{1,2}/).join(""); // lowercase part of the tag
        let uppercase=tag.split(/[a-z0-9]+/).join(""); // uppercase part of the tag
        let result="";

        if(uppercase[0] !== 'V' && uppercase!=='PE' && uppercase!=='PC'){
            for(let i in jsonContent){
                if(i===uppercase){
                    result+=jsonContent[i];
                }
                if(lowercase){
                    if(i===lowercase){
                        result+=" ";
                        result+=jsonContent[i];
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
    private correctsPOS(posTags : string [] ,tagsCorrection : string []) : string[] {
        let finalTags : string []=[];

        for(let i in posTags){
            if(tagsCorrection[i]==="-")
                finalTags[i]=posTags[i];
            else if(tagsCorrection[i]!==posTags[i])
                finalTags[i]=tagsCorrection[i];
            else
                finalTags[i]=posTags[i];
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
    private correctionToTags(wordsnumber : number, dataCorrection : any) : string []{
        let result = [];
        for (let i = 0; i < wordsnumber; ++i){
            dataCorrection["grammarclass"+i] = dataCorrection["grammarclass"+i].join("").replace(/\-/g, "");

            let tag : string;
            if (dataCorrection["grammarclass"+i] === ""){
                tag = dataCorrection["general"+i];
            } else {
                tag = dataCorrection["grammarclass"+i];
            }

            result.push(tag +
                dataCorrection["tempo"+i].replace("-","") +
                dataCorrection["persona"+i].replace("-","")+
                dataCorrection["genere"+i].replace("-","")+
                dataCorrection["numero"+i].replace("-",""));
        }
        return result;
    }

    /**
     * This method splits the topics by space and saves it in an array
     * @param topics - a string conattaining the topics
     * @returns {Array} an array containing the topics splitted by space
     */
    private splitTopics(topics : string) : string[]{
        return topics.split(" ");
    }

    /**
     * This method returns all the public teacher solutions avaiable for an exercise
     * @param sentence - the sentence of the exercise
     * @returns any[] - an array of json containing the public teacher solutions of the exercise
     */
    public async teacherSolutions(sentence : string) : Promise<any[]> {
        let result : any[] = [];
        let exerciseClient = this.client.getExerciseClient();
        let userClient = this.client.getUserClient();
        if (userClient){
            let teacherList = await userClient.teacherList();
            for (let teacher of teacherList) {
                if (exerciseClient){
                    let solutions = await exerciseClient.searchSolution(sentence,teacher);
                    for (let sol of solutions){
                        if(sol._public==='true') {//only if the teacher set solution as public
                            sol = {
                                "id": sol.id,
                                "userID": sol.userID,
                                "username": (await userClient.getUserData(sol.userID)).username,
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
    }

    /**
     *  This method provides to return the solution of exercise
     * @param sentence
     * @param solverId
     * @param time
     * @returns Promise<any>
     */
    public async findSolution(sentence : string, solverId : string, time : number) : Promise<any> {
        let exerciseClient = this.client.getExerciseClient();
        if (exerciseClient){
            let solutions = await exerciseClient.searchSolution(sentence,solverId);
            return solutions.find((sol) => sol.time === time);
        }
        return null;
    }


    public getUpdateState() : boolean {
        return this.updateState;
    }
}

export {ExercisePresenter};