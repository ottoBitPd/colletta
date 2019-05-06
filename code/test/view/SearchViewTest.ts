import 'mocha';
import {SearchView} from "../../src/ts/view/SearchView";
import {expect} from 'chai';
import * as express from "express";

describe('SearchViewTest', function() {
    let test : SearchView;

    before(function () {
        const app = express();
        test = new SearchView(app);
        //@ts-ignore
        test.searchPresenter = {
            update(_app){
                return;
            },
            getSearchType() {
                return "exercise";
            },
            getResults() {
                return new Map();
            }
        }
    });

    describe('SearchViewTest.getPage()', function () {
        it('should return the html page', async function () {
            //console.log("getPage(): ",test.getPage());
            let str=await test.getPage();
            console.log("str: ",str);
            var regex = new RegExp("<head>","i");
            console.log("<head>: ",regex.test(str));
            let r3 = regex.test(str);
            regex = new RegExp("</head>","i");
            console.log("</head>: ",regex.test(str));
            r3 = r3 && regex.test(str);
            regex = new RegExp("<html lang=\"it\">","i");
            console.log("<html lang=\"it\">: ",regex.test(str));
            r3 = r3 && regex.test(str);
            regex = new RegExp("</html>","i");
            console.log("</html>: ",regex.test(str));
            r3 = r3 && regex.test(str);
            expect(r3).to.be.true;
        });
    });
});