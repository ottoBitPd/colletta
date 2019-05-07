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
                let str = await test.getPage();
                var regex = new RegExp("<head>", "i");
                let res = regex.test(str);
                regex = new RegExp("</head>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<html lang=\"it\">", "i");
                res = res && regex.test(str);
                regex = new RegExp("</html>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<form method='post' action='/exercise'>", "i");
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
                let str = await test.getPage();
                var regex = new RegExp("<head>", "i");
                let res = regex.test(str);
                regex = new RegExp("</head>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<html lang=\"it\">", "i");
                res = res && regex.test(str);
                regex = new RegExp("</html>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<form method='post' action='/addexercise'>", "i");
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
            it('should return the html page for student Search', async function () {
                let str = await test.getPage();
                var regex = new RegExp("<head>", "i");
                let res = regex.test(str);
                regex = new RegExp("</head>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<html lang=\"it\">", "i");
                res = res && regex.test(str);
                regex = new RegExp("</html>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<form method='post' action='/addstudent'>", "i");
                res = res && regex.test(str);
                expect(res).to.be.true;
            });
        });
    });
});

