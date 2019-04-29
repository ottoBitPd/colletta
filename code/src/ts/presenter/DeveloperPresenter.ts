import {Client} from "../model/Client/Client";
import {PageView} from "../view/PageView";
import {PagePresenter} from "./PagePresenter";
//import { ExportToCsv } from 'export-to-csv';
var session = require('express-session');

/**
 * Class to manage developer's operations
 */
class DeveloperPresenter extends PagePresenter{
    //private client : any;
    private developer = "trave";
    private message : any;
    constructor(view : PageView) {
        super(view);
        this.client =(new Client.builder()).buildExerciseClient().buildUserClient().build();
    }
    update(app: any) {
        this.listenDeveloper(app);
        this.checkDeveloper(app);
        this.download(app);
    }

    /**
     *
     * @param app
     */
    private listenDeveloper(app : any) {
        app.get('/developer', async (request: any, response: any) => {
            this.view.setTitle("Developer");
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
            /*let annot= await this.getAllAnnotation("La macchina è rossa");
            let csvFile= this.createCsvFromAnnotations(annot);
            this.downloadCsv(csvFile);*/
            this.view.setTitle("Download");
            response.send(await this.view.getPage());


        });
    }
    // @ts-ignore
    async getAllAnnotation(sentence: string) : Promise<any>{
        let exerciseClient = this.client.getExerciseClient();
        if (exerciseClient) {
            let an= await exerciseClient.searchAllSolution(sentence);
            return an;
        }
    }

    /**
     *  This methods provides to return filtered annotations by date
     * @param annotations
     * @param date
     * @returns result
     */
    filterByDate(annotations : any[], date : Date) {
        let result=annotations;
        for (let sol of result) {
            if (sol.time < date.getTime()) {
                result.splice(result.indexOf(sol));
            }
        }
        return result;
    }

    /**
     *
     * @param annotations
     * @param id
     * @returns result - annotations filtered
     */
    filterByUser(annotations : any[], id : string) {
        let result=annotations;
        for (let sol of result) {
            if (sol.solverID !== id) {
                result.splice(result.indexOf(sol));
            }
        }
        return result;
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
     * This method provides to convert annotations in csv format
     * @param annotations
     * @returns csv
     */
    async createCsvFromAnnotations(annotations : any[]) {
        // @ts-ignore
        const replacer = (key, value) => value === null ? '' : value;
        const header = Object.keys(annotations[0]);
        let csv : any = annotations.map(row => header.map(fieldName =>
            JSON.stringify(row[fieldName], replacer)).join(';'));
        //csv.unshift(header.join(''));
        csv = csv.join('\r\n');
        return csv;
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
    public getMessage(){
        return this.message;
    }

    /**
     * This method returns a map with all the exercises
     */
    public async getResults(){
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
    }
}
export {DeveloperPresenter}