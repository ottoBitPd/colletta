import {ClassesView} from "../../src/ts/view/ClassesView";
import {expect} from 'chai';
import * as express from "express";
import 'mocha';
//import {ListPresenter} from "../../src/ts/presenter/ListPresenter";

describe('ClassesView', function() {
    let test : ClassesView;
    context("classes", function () {
        describe("ClassesView.getPage()", function () {
            before(function () {

                const app = express();
                test = new ClassesView(app);
                // @ts-ignore
                test.classesPresenter = {
                    update(_app: any) {
                        return;
                    },
                    getListType() {
                        return "classes";
                    },
                    async getClasses() {
                        return [];
                    },
                    async getExercises() {
                        return [];
                    },
                    async getStudentNumber(classId: string) {
                        return 0;
                    }
                };
            });

            it('should return the html page', async function () {
                let str = await test.getPage();
                var regex = new RegExp("<head>", "i");
                let r3 = regex.test(str);
                regex = new RegExp("</head>", "i");
                r3 = r3 && regex.test(str);
                regex = new RegExp("<html lang=\"it\">", "i");
                r3 = r3 && regex.test(str);
                regex = new RegExp("</html>", "i");
                r3 = r3 && regex.test(str);
                expect(r3).to.be.true;
            });
        });
    });

    context("two classes", function() {
        describe("ClassesView.getPage()", function () {
            before(function () {

                const app = express();
                test = new ClassesView(app);
                // @ts-ignore
                test.classPresenter = {
                    update(_app: any) {
                        return;
                    },
                    getListType() {
                        return "classes";
                    },
                    async getClasses() {
                        return [{
                            id: '1',
                            name: '4^B',
                            description: 'Itis camposampiero',
                            teacherID: '1',
                            students: ['1'],
                            exercises: ['1'],
                            time: 1556893974812
                        },
                            {
                                id: '2',
                                name: '4^B',
                                description: 'Itis camposampiero',
                                teacherID: '2',
                                students: ['2'],
                                exercises: ['2'],
                                time: 1556893974812
                            }];

                    },
                    async getExercises() {
                        return [];
                    },
                    async getStudentNumber(classId: string) {
                        return 0;
                    }
                };
                // @ts-ignore
                test.userKind = 2;
            });

            it('should return the html page', async function () {
                let str = await test.getPage();
                let regex = new RegExp("<div class='col-sm-3 mx-auto text-center'>\n" +
                    "Itis camposampiero</div>\n" +
                    "<div class='col-sm-3 mx-auto text-center'>\n" +
                    "3/5/2019</div>\n" +
                    "<div class='col-sm-2 mx-auto text-center'>\n" +
                    "0</div>\n" +
                    "<div class='col-sm-2 mx-auto text-center'>");
                let res = regex.test(str);
                expect(res).to.be.true;
            });
        });
    });

    context("exercises", function () {
        describe("ClassesView.getPage()", function () {
            before(function () {
                const app = express();
                test = new ClassesView(app);
                // @ts-ignore
                test.classPresenter = {
                    update(_app: any) {
                        return;
                    },
                    getListType() {
                        return "exercises";
                    },
                    async getClasses() {
                        return [];
                    },
                    async getExercises() {
                        return [{
                            "sentence": "Le rose sono rosse",
                            "authorId": "2",
                            "key": "2",
                            "solutions": [
                                {
                                    "key": "2",
                                    "solverId": "2",
                                    "solutionTags": [
                                        "RDfp",
                                        "Sfp",
                                        "Vip3p",
                                        "Afp"
                                    ],
                                    "topics": [
                                        "Aggettivi",
                                        "Nomi",
                                        "Articoli",
                                        "Verbi"
                                    ],
                                    "difficulty": "1",
                                    "valutations": {},
                                    "time": 1556198967856,
                                    "_public": "true",
                                    "itaTags": [
                                        "Articolo determinativo femminile plurale",
                                        "Nome comune femminile plurale",
                                        "Verbo principale indicativo presente terza persona plurale",
                                        "Aggettivo femminile plurale"
                                    ]
                                },
                                {
                                    "key": "2",
                                    "solverId": "2",
                                    "solutionTags": [
                                        "PC3fn",
                                        "Sfs",
                                        "VAip1s",
                                        "Afp"
                                    ],
                                    "topics": [
                                        "giandui",
                                        "otto"
                                    ],
                                    "difficulty": "2",
                                    "valutations": {},
                                    "time": 1556530829795,
                                    "_public": "false",
                                    "itaTags": [
                                        "Particella pronominale terza persona maschile non specificato",
                                        "Nome comune femminile singolare",
                                        "Verbo ausiliare indicativo presente prima persona singolare",
                                        "Aggettivo femminile plurale"
                                    ]
                                }
                            ],
                            "words": [
                                "Le",
                                "rose",
                                "sono",
                                "rosse"
                            ]
                        }];
                        },
                    async getStudentNumber(classId: string) {
                        return 0;
                    }
                }
                // @ts-ignore
                test.userKind = 2;
            });

            it('should return the html page', async function () {
                let str = await test.getPage();
                let regex = new RegExp("Le</div>\n" +
                    "<div class='col-sm-9 mx-auto text-left'>\n" +
                    "Articolo determinativo femminile plurale</div>\n" +
                    "<div class='col-sm-3 mx-auto text-left'>\n" +
                    "rose</div>\n" +
                    "<div class='col-sm-9 mx-auto text-left'>\n" +
                    "Nome comune femminile plurale</div>\n" +
                    "<div class='col-sm-3 mx-auto text-left'>\n" +
                    "sono</div>\n" +
                    "<div class='col-sm-9 mx-auto text-left'>\n" +
                    "Verbo principale indicativo presente terza persona plurale</div>\n" +
                    "<div class='col-sm-3 mx-auto text-left'>\n" +
                    "rosse</div>\n" +
                    "<div class='col-sm-9 mx-auto text-left'>\n" +
                    "Aggettivo femminile plurale</div>");
                let res = regex.test(str);
                expect(res).to.be.true;
            });
        });
    });
});