import {PagePresenter} from "./PagePresenter"
import {Client} from "../model/Client/Client";

var session = require('express-session');

class SearchPresenter extends PagePresenter {

    constructor(view: any) {
        super(view);
        this.client = (new Client.builder()).buildExerciseClient().build();
    }

    update(app: any) {
        app.get('/home', (request: any, response: any) => {
            session.invalidLogin = request.query.mess==="invalidLogin";
            let menuList :any;
            menuList= {
                0 :{"link":"link1","name":"name1"},
                1 :{"link":"link2","name":"name2"}
            }

            this.view.setTitle("Homepage");
            this.view.setMenuList(menuList);
            //this.viewProfile.setMainList(["class1","class2","class3","class4","class5","class6","class7","class8"]);
            response.send(this.view.getPage());
        });
        app.post('/searchExercise', async (request: any, response: any) => {
                //console.log("frase da cercare : "+request.body.sentence);
                let exerciseClient = this.client.getExerciseClient();
                if(exerciseClient) {
                    let map = await exerciseClient.searchExercise(request.body.sentence);//returns map<idEsercizio, sentence>
                    this.view.setResultList(map);
                    response.redirect("/home");
                }
        });
    }
    //@ts-ignore
    private async searchExercises(sentence: string) {
        let exerciseClient = this.client.getExerciseClient();
        if(exerciseClient) {
            await exerciseClient.searchExercise(sentence);
        }
    }
}
export {SearchPresenter};