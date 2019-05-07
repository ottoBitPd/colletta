import 'mocha';
import {ExerciseView} from "../../src/ts/view/ExerciseView";
import * as express from "express";
import {UserKind} from "../../src/ts/view/PageView";
import {expect} from "chai";

describe('ExerciseView', function() {
    let test : ExerciseView;
    context("showExerciseEvaluation", function() {
        describe('SearchViewTest.getPage()', function () {
            before(function () {
                const app = express();
                test = new ExerciseView(app);
                //@ts-ignore
                test.userKind = UserKind.teacher;
                //@ts-ignore
                test.exercisePresenter = {
                    update(_app) {
                        return;
                    },
                    getCorrection() {
                        return {mark: 0, tags: ['SWnn', 'Afs']};
                    },
                    getUserSolution() {
                        return ['U', 'U'];
                    },
                    getUpdate() {//it was need to understand if the user was updating a solution or making new another
                        return false;
                    },
                    translateTag(s: string) {
                        return "translation";
                    }
                }
                test.setSentence("La gatta");
                test.setPosTranslation(['G','G']);
                test.setPosTags(['I', 'I']);

            });
            it("should return valutation page", async function () {
                test.getPage();
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
                expect(res).to.be.true;
            });
        });
    });
    context("showExercise", function() {
        describe('SearchViewTest.getPage()', function () {
            before(function () {
                const app = express();
                test = new ExerciseView(app);
                //@ts-ignore
                test.userKind = UserKind.teacher;
                //@ts-ignore
                test.exercisePresenter = {
                    update(_app) {
                        return;
                    },
                    getCorrection() {
                        return null;
                    },
                    getUserSolution() {
                        return ['I', 'I'];
                    },
                    getUpdate() {//it was need to understand if the user was updating a solution or making new another
                        return false;
                    }/*,
                    translateTag(s: string) {
                        return "translation";
                    }*/
                }
                test.setSentence("La gatta");
                test.setPosTags(['I', 'I']);
                test.setPosTranslation(['G','G']);

            });
            it("should return teacher exercise page", async function () {
                test.getPage();
                //@ts-ignore
                //console.log("sentence: ",test.sentence);
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
                expect(res).to.be.true;
            });
        });
    });
});
