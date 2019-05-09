import {Client} from "../model/Client/Client";
import {PageView} from "../view/PageView";
import {PagePresenter} from "./PagePresenter";
import * as CryptoJS from "crypto-js";

var session = require('express-session');

/**
 * Class to manage developer's operations
 */
class DeveloperPresenter extends PagePresenter{

    private annotations : any[] = [];
    private developer = "developermaster";
    private message : string = "";

    constructor(view : PageView) {
        super(view);
        this.client =(new Client.builder()).buildExerciseClient().buildUserClient().build();

    }

    private async initializeAnnotations() : Promise<void>{
        this.annotations = await this.getAllAnnotation();
        this.encryptAnnotations();
    }
    /**
     * This method provides to manage the view urls.
     * @param app
     */
    update(app: any) {
        this.listenDeveloper(app);
        this.checkDeveloper(app);
        this.download(app);
        this.downloadModel(app);
    }

    /**
     * This method manages developer page url
     * @param app
     */
    private listenDeveloper(app : any) {
        app.get('/developer', async (request: any, response: any) => {
            this.view.setTitle("Developer");

            await this.initializeAnnotations();
            if (request.query)
                this.applyFilters(request.query.sentence, request.query.dateFrom, request.query.dateTo, request.query.user,
                    request.query.valutationFrom, request.query.valutationTo);

            response.send(await this.view.getPage());
        });
    }

    /**
     *
     * @param app
     */
    private checkDeveloper(app : any) {
        app.post('/checkdeveloper', async (request: any, response: any) => {
            //prendi password dal db e checkif equal to request.body.password
            let userClient = this.client.getUserClient();
            if (userClient) {

                if (request.body.password === this.developer) {

                    session.username= "developer";
                    response.redirect('/developer');
                }
                else {

                    this.setMessage("password non valida");
                    response.redirect('/developer');
                }
            }

        });
    }

    /**
     *  This method provides to manage the download of the data
     * @param app
     */
    private async download(app : any) {
        app.get('/download', async (request: any, response: any) => {
            this.view.setTitle("Download");
            response.send(await this.view.getPage());


        });
    }

    private downloadModel(app : any) {
        app.get('/download%model', (request : any, response : any) => {
            response.download('src/ts/presenter/hunpos/italian_model', "italian_model")
        });
    }

    private applyFilters(sentence : string | undefined, dateFrom : number | undefined, dateTo : number| undefined,
                         user : string| undefined, valutationFrom : number| undefined, valutationTo : number | undefined) : void {
        if (sentence)
            this.filterBySentence(sentence);
        if (dateFrom) {
            if (dateTo)
                this.filterByDate(new Date(dateFrom), new Date((new Date(dateTo)).getTime() + 86400000));
            else
                this.filterByDate(new Date(dateFrom), new Date(Date.now()));
        } else if (!dateFrom && dateTo)
            this.filterByDate(new Date(0), new Date((new Date(dateTo)).getTime() + 86400000));
        if (user)
            this.filterByUser(user);
        if (valutationFrom) {
            if (valutationTo)
                this.filterByValutation(valutationFrom, valutationTo);
            else
                this.filterByValutation(valutationFrom, 10);
        }
        else if (!valutationFrom && valutationTo)
                this.filterByValutation(0, valutationTo);
    }

    getAnnotations() : any[]{
        return this.annotations;
    }

    /**
     *
     * @param s
     */
    private setMessage( s: string){
        this.message=s;
    }

    /**
     *
     */
    public getMessage() : string {
        return this.message;
    }

    public async getAllAnnotation() : Promise<any[]> {
        let exerciseClient = this.client.getExerciseClient();
        let annotations : any[] = [];
        if (exerciseClient) {
            annotations = await exerciseClient.searchAllSolution();
        }

        for (let annotation of annotations){
            annotation.teacher = (await this.isTeacher(annotation.solverID) ? "I" : "A");
        }

        return annotations;
    }

    public filterBySentence(sentence : string) : void {
        var regex= new RegExp(sentence, "i");
        this.annotations =(this.annotations).filter((entry: any)=>entry.sentence.search(regex) >= 0);
    }

    public filterByValutation(valutationFrom : number, valutationTo : number) : void {
        this.annotations= this.annotations.filter((val : any)=>(val.valutations[1] >= valutationFrom)
            && (val.valutations[1]<= valutationTo));
    }

    /**
     *  This method provides to return filtered annotations by date
     * @param dateFrom
     * @param dateTo
     */
    public filterByDate(dateFrom : Date, dateTo : Date) : void {
        this.annotations= this.annotations.filter((sol:any)=>(sol.time>=dateFrom.getTime())
            && (sol.time<=dateTo.getTime()));
    }

    /**
     *  This method provides to return filtered annotations by user id
     * @param id
     */
    public filterByUser(id : string) : void {
        this.annotations=this.annotations.filter((sol:any)=>CryptoJS.MD5(sol.solverID).toString()===id);
    }

    private encryptAnnotations() : void{
        for (let annotation of this.annotations){
            annotation.id = CryptoJS.MD5(annotation.id).toString();
            annotation.solverID = CryptoJS.MD5(annotation.solverID).toString();
            annotation.valutations = [CryptoJS.MD5(annotation.valutations[0]).toString(),annotation.valutations[1]];
        }
    }

    /**
     * This method provides to convert annotations in csv format
     * @returns csv
     */
    public async createCsvFromAnnotations() : Promise<string>{
        if ((this.annotations.length) !== 0) {
            const replacer = (key: any, value: any) => value === null ? '' : value;
            const header = Object.keys(this.annotations[0]);
            let csv: string[] = this.annotations.map((row: any) => header.map(fieldName =>
                JSON.stringify(row[fieldName], replacer)).join(';'));

            return csv.join('\r\n');
        } else
            return "";
    }

    public async createTxtFromAnnotations() : Promise<string>{
        if ((this.annotations.length) !== 0) {
            const replacer = (key :any, value :any) => value === null ? '' : value;
            const header = Object.keys(this.annotations[0]);
            let txt: any = this.annotations.map((row: any) => header.map(fieldName =>
                JSON.stringify(row[fieldName], replacer)).join('\t'));
            return txt.join('\r\n');
        } else
            return "";
    }

    public async isTeacher(solverID: string) : Promise<boolean>{
        let userClient = this.client.getUserClient();
        if(userClient){
            let json = await userClient.getUserData(solverID);
            return json.inps !== undefined;
        }
        return false;
    }
}
export {DeveloperPresenter}