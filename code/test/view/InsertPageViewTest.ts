import 'mocha';
import {expect} from "chai";
import {InsertPageView} from "../../src/ts/view/InsertPageView";
import * as express from "express";


describe('InsertPageView', function() {
    let test : InsertPageView;
    before(function () {
        const app = express();
        test = new InsertPageView(app);
        // @ts-ignore
        test.exercisePresenter = {
            update(app){
                return;
            },
        };
    });
    describe ("InsertPageView.getPage()", function () {
        it('should return the html page', async function () {
            let str=await test.getPage();
            var regex = new RegExp("<head>","i");
            let res = regex.test(str);
            regex = new RegExp("</head>","i");
            res = res && regex.test(str);
            regex = new RegExp("<html lang=\"it\">","i");
            res = res && regex.test(str);
            regex = new RegExp("</html>","i");
            res = res && regex.test(str);
            regex = new RegExp("<h1 class ='text-center mb-5'>Inserisci frase</h1>", "i");
            res= res && regex.test(str);
            regex = new RegExp("<input type=\"text\" class=\"form-control\" id='sentence' name='sentence' placeholder=\"Inserisci una frase\" required=\"required\">", "i");
            res= res && regex.test(str);
            regex = new RegExp("<button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0 w-25\">Invia</button>", "i");
            res= res && regex.test(str);

            expect(res).to.be.true;
        });
    });
});
