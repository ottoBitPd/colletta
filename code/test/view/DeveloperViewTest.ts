import 'mocha';
import {expect} from "chai";
import {DeveloperView} from "../../src/ts/view/DeveloperView";
import * as express from "express";

describe('DeveloperView', function() {
    let test: DeveloperView;
    context("with a logged-in developer", function () {
        describe ("DeveloperView.getPage()", function () {
            before(function () {
                const app = express();
                test = new DeveloperView(app);
                // @ts-ignore
                test.devPresenter = {
                    update(app) {
                        return;
                    },
                    isLoggedIn(): boolean {
                        return true;
                    },
                    async createCsvFromAnnotations() {
                        return [];
                    },
                    async createTxtFromAnnotations() {
                        return [];
                    },
                    getAnnotations() {
                        let annot = {
                            id: 'annotID',
                            sentence: 'sentence',
                            solverID: 'solver',
                            tags: ['1'],
                            time: 1111,
                            difficulty: '1',
                            topics: ['1'],
                            valutations: ['valutation', 1]
                        };
                        let array : Array<any> = new Array();
                        array.push(annot);
                        return array;
                    },
                    async isTeacher(solverID: string) {
                        return true;
                    }

                }
            });
            it ("should return the html page for a logged-in developer", async function () {
                let str = await test.getPage();
                var regex = new RegExp("<input type=\"text\" class='form-control my-2' name=\"sentence\" placeholder=\"Inserisci una frase\"/>", "i");
                var res = regex.test(str);
                regex = new RegExp("<input type=\"number\" class='form-control my-2' id= \"valutationTo\" name=\"valutationTo\" placeholder=\"Scegli una valutazione massima \" min='1' max='10'/>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<input class=\"form-control\" type=\"date\" name=\"dateFrom\" id=\"date\">", "i");
                res = res && regex.test(str);
                regex = new RegExp("<input class=\"form-control\" type=\"date\" name=\"dateTo\" id=\"date\">", "i");
                res = res && regex.test(str);
                regex = new RegExp("<input type=\"text\" class='form-control' name=\"user\" placeholder=\"Inserisci un user\"/>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<button type=\"submit\" class=\"btn btn-primary my-2 w-25\">Filtra</button>", "i");
                res = res && regex.test(str);
                expect(res).to.be.true;
            });
            it ("should return the login area for a logged-in developer", function () {
                let str = test.getLoginArea();
                var regex = new RegExp("<button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0\">Logout</button>", "i");
                var res = regex.test(str);
                expect(res).to.be.true;
            });
        });
    });
    context("with a no logged-in developer", function () {
        describe ("DeveloperView.getPage()", function () {
            before(function () {
                const app = express();
                test = new DeveloperView(app);
                //@ts-ignore
                test.devPresenter = {
                    update(app) {
                        return;
                    },
                    getMessage() {
                        return "message";
                    },
                    isLoggedIn(): boolean {
                        return false;
                    }
                }
            });
            it ("should return a test-danger for a no logged-in developer", async function () {
                let str = await test.getPage();
                var regex = new RegExp("<p class='text-danger'>Password inserita non corretta</p>", "i");
                var res = regex.test(str);
                expect(res).to.be.true;
            });
        });
    });
});
