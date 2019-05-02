import {Client} from "../model/Client/Client";
import {PageView} from "../view/PageView";
import {PagePresenter} from "./PagePresenter";
import * as CryptoJS from "crypto-js";

//import { ExportToCsv } from 'export-to-csv';
var session = require('express-session');

/**
 * Class to manage developer's operations
 */
class DeveloperPresenter extends PagePresenter{
    //private client : any
    private annotations : any[] = [];
    private developer = "trave";
    private message : any;
    constructor(view : PageView) {
        super(view);
        this.client =(new Client.builder()).buildExerciseClient().buildUserClient().build();

    }

    async initializeAnnotations() : Promise<void>{
        this.annotations = await this.getAllAnnotation();
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
                         user : string| undefined, valutationFrom : number| undefined, valutationTo : number | undefined) {
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

    getAnnotations() {
        return this.annotations;
    }
    /*
    downloadCsv(csv:any) {
        let link  = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
        link.setAttribute('download', "annotazioni");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    */


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
    public getMessage(){
        return this.message;
    }

     async getAllAnnotation() : Promise<any[]> {
        let exerciseClient = this.client.getExerciseClient();
        let an : any[] = [];
        if (exerciseClient) {
             an = await exerciseClient.searchAllSolution();
        }
        //console.log("an: ",an);
        return an;
    }
        /*
        let exerciseClient = this.client.getExerciseClient();
        let ret = [];
        if(exerciseClient) {
            let map = await exerciseClient.searchExercise("");//returns map<idEsercizio, sentence>
            //console.log("map: ",map);
            for(let entry of Array.from(map.entries())) {
                let key = entry[0];
                let exercise = await exerciseClient.getExerciseData(key);
                //console.log("exercise: ",exercise);
                ret.push(exercise);

            }
            return ret;
        }
        return [];
        */

    filterBySentence(sentence : string) {
        var regex= new RegExp(sentence, "i");
        this.annotations =(this.annotations).filter((entry: any)=>entry.sentence.search(regex) >= 0);
    }

    filterByValutation(valutationFrom : number, valutationTo : number) {
        this.annotations= this.annotations.filter((val : any)=>(val.valutations[1] >= valutationFrom)
            && (val.valutations[1]<= valutationTo));
    }

    /**
     *  This methods provides to return filtered annotations by date
     * @param annotations
     * @param date
     * @returns result
     */
    filterByDate(dateFrom : Date, dateTo : Date) {
        this.annotations= this.annotations.filter((sol:any)=>(sol.time>=dateFrom.getTime())
            && (sol.time<=dateTo.getTime()));
    }

    filterByUser(id : string) {
        this.annotations=this.annotations.filter((sol:any)=>CryptoJS.MD5(sol.solverID).toString()===id);
    }


    /**
     * This method provides to convert annotations in csv format
     * @param annotations
     * @returns csv
     */
    async createCsvFromAnnotations() {
        if ((this.annotations.length) !== 0) {
            const replacer = (key: any, value: any) => value === null ? '' : value;
            const header = Object.keys(this.annotations[0]);
            let csv: any = this.annotations.map((row: any) => header.map(fieldName =>
                JSON.stringify(row[fieldName], replacer)).join(';'));
            //csv.unshift(header.join(''));
            csv = csv.join('\r\n');
            return csv;
        }
        else
            return [];
    }

    async createTxtFromAnnotations() {
        // @ts-ignore
        const replacer = (key, value) => value === null ? '' : value;
        const header = Object.keys(this.annotations[0]);
        let csv : any = this.annotations.map((row:any) => header.map(fieldName =>
            JSON.stringify(row[fieldName], replacer)).join('\t'));
        //csv.unshift(header.join(''));
        csv = csv.join('\r\n');
        return csv;
    }

    async isTeacher(solverID: string) : Promise<boolean>{
        let userClient = this.client.getUserClient();
        if(userClient){
            let json = await userClient.getUserData(solverID);
            return json.inps !== undefined;
        }
        return false;
    }
}
export {DeveloperPresenter}