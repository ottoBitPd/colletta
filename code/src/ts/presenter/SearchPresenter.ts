import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";
import {UserKind} from "../view/PageView";

var session = require('express-session');

/**
 * Class provides to manage the search
 */
class SearchPresenter extends PagePresenter {
    private searchType : any;
    private results : any;
    constructor(view: any) {
        super(view);
        this.client = (new Client.builder()).buildExerciseClient().buildUserClient().build();
    }

    /**
     * This method provides to set search type
     * @param value
     */
    private setSearchType(value : string){
        //this.setResults(undefined);
        this.searchType=value;
    }

    /**
     * This method returns type search
     */
    public getSearchType(){
        return this.searchType;
    }
    update(app: any) {
        this.exerciseSearchPage(app);
        this.searchExercise(app);
        this.studentSearchPage(app);
        this.searchStudent(app);
        this.classExerciseSearchPage(app);
    }

    /**
     * This method provides to manage exercise search page
     * @param app
     */
    private exerciseSearchPage(app : any){
        app.get('/exercise/search', async (request: any, response: any) => {
            //console.log("sentence: ",request.body.sentence);
            let userClient = this.client.getUserClient();
            if (session.username !== undefined)
                if (userClient && await userClient.isTeacher(session.username)){
                    this.view.setUserKind(UserKind.teacher);
                } else {
                    this.view.setUserKind(UserKind.student);
                }
            else
                this.view.setUserKind(UserKind.user);

            if(request.query.s === undefined){
                let exerciseClient = this.client.getExerciseClient();
                if(exerciseClient){
                    let map= await exerciseClient.searchExercise("");
                    this.setResults(map);
                }
            }
            session.invalidLogin = request.query.mess==="invalidLogin";

            this.setSearchType("exercise");
            this.view.setTitle("Ricerca esercizio");
            //this.viewProfile.setMainList(["class1","class2","class3","class4","class5","class6","class7","class8"]);
            response.send(await this.view.getPage());
        });
    }

    /**
     * This method provides to manage exercise search
     * @param app
     */
    private searchExercise(app : any) {
        app.post('/searchexercise', async (request: any, response: any) => {
            //console.log("frase da cercare : "+request.body.sentence);
            let userClient = this.client.getUserClient();
            if (session.username !== undefined)
                if (userClient && await userClient.isTeacher(session.username)){
                    this.view.setUserKind(UserKind.teacher);
                } else {
                    this.view.setUserKind(UserKind.student);
                }
            else
                console.log("user");
                this.view.setUserKind(UserKind.user);

            let exerciseClient = this.client.getExerciseClient();

            if(exerciseClient) {
                let map = await exerciseClient.searchExercise(request.body.sentence);//returns map<idEsercizio, sentence>
                this.setResults(map);
                if(this.searchType==="exercise")
                    response.redirect("/exercise/search?s="+encodeURIComponent(request.body.sentence));
                if(this.searchType==="classExercise")
                    response.redirect(307,"/class/exercise/search?s="+encodeURIComponent(request.body.sentence));
            }
            else{
                this.setResults(new Map());
                if(this.searchType==="exercise")
                    response.redirect("/exercise/search");
                if(this.searchType==="classExercise")
                    response.redirect(307,"/class/exercise/search?s="+encodeURIComponent(request.body.sentence));
            }
        });
    }

    /**
     * This method provides to manage student search page
     * @param app
     */
    private studentSearchPage(app: any) {
        app.post('/student/insert', async (request: any, response: any) => {
            let userClient = this.client.getUserClient();
            if (session.username !== undefined)
                if (userClient && await userClient.isTeacher(session.username)){
                    this.view.setUserKind(UserKind.teacher);
                } else {
                    this.view.setUserKind(UserKind.student);
                }
            else
                this.view.setUserKind(UserKind.user);

            if(request.query.s === undefined){
                this.setResults([]);
            }
            this.setSearchType("student");
            this.view.setTitle("Ricerca studente");
            response.send(await this.view.getPage());
        });
    }

    /**
     *  This method provides to manage student search
     * @param app
     */
    private searchStudent(app: any) {
        app.post('/searchstudent', async (request: any, response: any) => {
            let userClient = this.client.getUserClient();
            if (session.username !== undefined)
                if (userClient && await userClient.isTeacher(session.username)){
                    this.view.setUserKind(UserKind.teacher);
                } else {
                    this.view.setUserKind(UserKind.student);
                }
            else
                this.view.setUserKind(UserKind.user);

            //console.log("frase da cercare : "+request.body.sentence);

            if(userClient) {
                let map = await userClient.searchUser(request.body.sentence, false);//returns map<idEsercizio, sentence>
                this.setResults(map);
                response.redirect(307,"/student/insert?s="+encodeURIComponent(request.body.sentence));
            }
            else{

                this.setResults(new Map());
                response.redirect(307,"/student/insert?s="+encodeURIComponent(request.body.sentence));
            }
        });
    }

    /**
     * This method provides to set the results
     * @param map
     */
    private setResults(map: any) {
        this.results=map;
    }

    /**
     * This method returns the results
     * @returns results
     */
    public getResults() {
        return this.results;
    }

    /**
     * This method provides to manage exercise search belong a class
     * @param app
     */
    private classExerciseSearchPage(app: any) {
        app.post('/class/exercise/search', async (request: any, response: any) => {
            if(request.query.s === undefined){
                this.setResults([]);
            }
            this.setSearchType("classExercise");
            response.send(await this.view.getPage());
        });
    }
}
export {SearchPresenter};