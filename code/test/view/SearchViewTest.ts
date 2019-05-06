import 'mocha';
import {SearchView} from "../../src/ts/view/SearchView";
import {expect} from 'chai';
import * as express from "express";

describe('SearchViewTest', function() {
    let test : SearchView;
    context("exercise", function() {
        describe('SearchViewTest.getPage()', function () {
            before(function () {
                const app = express();
                test = new SearchView(app);
                //@ts-ignore
                test.searchPresenter = {
                    update(_app) {
                        return;
                    },
                    getSearchType() {
                        return "exercise";
                    },
                    getResults() {
                        let m = new Map();
                        m.set('1', 'Le rose sono rosse');
                        m.set('2', 'La macchina è verde');
                        return m;
                    }
                }
            });
            it('should return the html page for exercise Search', async function () {
                //console.log("getPage(): ",test.getPage());
                let str = await test.getPage();
                //console.log("str: ", str);
                var regex = new RegExp("<head>", "i");
                //console.log("<head>: ", regex.test(str));
                let res = regex.test(str);
                regex = new RegExp("</head>", "i");
                //console.log("</head>: ", regex.test(str));
                res = res && regex.test(str);
                regex = new RegExp("<html lang=\"it\">", "i");
                //console.log("<html lang=\"it\">: ", regex.test(str));
                res = res && regex.test(str);
                regex = new RegExp("</html>", "i");
                //console.log("</html>: ", regex.test(str));
                res = res && regex.test(str);
                regex = new RegExp("<form method='post' action='/exercise'>", "i");
                //console.log("<form method='post' action='/exercise'>: ", regex.test(str));
                res = res && regex.test(str);
                expect(res).to.be.true;
            });
        });
    });

    context("classExercise", function() {
        describe('SearchViewTest.getPage()', function () {
            before(function () {
                const app = express();
                test = new SearchView(app);
                //@ts-ignore
                test.searchPresenter = {
                    update(_app) {
                        return;
                    },
                    getSearchType() {
                        return "classExercise";
                    },
                    getResults() {
                        let m = new Map();
                        m.set('1', 'Le rose sono rosse');
                        m.set('2', 'La macchina è verde');
                        return m;
                    }
                }
            });
            it('should return the html page for classExercise Search', async function () {
                //console.log("getPage(): ",test.getPage());
                let str = await test.getPage();
                //console.log("str: ", str);
                var regex = new RegExp("<head>", "i");
                //console.log("<head>: ", regex.test(str));
                let res = regex.test(str);
                regex = new RegExp("</head>", "i");
                //console.log("</head>: ", regex.test(str));
                res = res && regex.test(str);
                regex = new RegExp("<html lang=\"it\">", "i");
                //console.log("<html lang=\"it\">: ", regex.test(str));
                res = res && regex.test(str);
                regex = new RegExp("</html>", "i");
                //console.log("</html>: ", regex.test(str));
                res = res && regex.test(str);
                regex = new RegExp("<form method='post' action='/addexercise'>", "i");
                //console.log("<form method='post' action='/addexercise'>: ", regex.test(str));
                res = res && regex.test(str);
                expect(res).to.be.true;
            });
        });
    });
    context("student", function() {
        describe('SearchViewTest.getPage()', function () {
            before(function () {
                const app = express();
                test = new SearchView(app);
                //@ts-ignore
                test.searchPresenter = {
                    update(_app) {
                        return;
                    },
                    getSearchType() {
                        return "student";
                    },
                    getResults() {
                        let m = new Map();
                        m.set('1', 'Le rose sono rosse');
                        m.set('2', 'La macchina è verde');
                        return m;
                    }
                }
            });
            it('should return the html page for classExercise student', async function () {
                //console.log("getPage(): ",test.getPage());
                let str = await test.getPage();
                //console.log("str: ", str);
                var regex = new RegExp("<head>", "i");
                //console.log("<head>: ", regex.test(str));
                let res = regex.test(str);
                regex = new RegExp("</head>", "i");
                //console.log("</head>: ", regex.test(str));
                res = res && regex.test(str);
                regex = new RegExp("<html lang=\"it\">", "i");
                //console.log("<html lang=\"it\">: ", regex.test(str));
                res = res && regex.test(str);
                regex = new RegExp("</html>", "i");
                //console.log("</html>: ", regex.test(str));
                res = res && regex.test(str);
                regex = new RegExp("<form method='post' action='/addstudent'>", "i");
                //console.log("<form method='post' action='/addstudent'>: ", regex.test(str));
                res = res && regex.test(str);
                expect(res).to.be.true;
            });
        });
    });
});

