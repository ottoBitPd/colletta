import 'mocha';
import {ProfileView} from "../../src/ts/view/ProfileView";
import * as express from "express";
import {UserKind} from "../../src/ts/view/PageView";
import {expect} from "chai";

describe('ProfileView', function() {
    let test : ProfileView;
    context("teacher", function() {
        describe('SearchViewTest.getPage()', function () {
            before(function () {
                const app = express();
                test = new ProfileView(app);
                //@ts-ignore
                test.userKind = UserKind.teacher;
                //@ts-ignore
                test.profileController = {
                    update(_app) {
                        return;
                    },
                    async getAverageInfo() : Promise<Map<number,number>>{
                        return new Map();
                    }
                }

            });
            it("should return teacher profile page", async function () {
                let data = {
                    username: 'Perry15',
                    id: '1',
                    password: 'ciccio',
                    name: 'Giovanni',
                    lastname: 'Peron',
                    city: 'Camposampiero',
                    school: 'Gio',
                    email: 'gino@gino',
                    inps: 'Gio'
                }
                test.setUserData(data);
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
                regex = new RegExp("<p class= \"font-weight-bold\"> Nome: Giovanni</p> ", "i");
                res = res && regex.test(str);
                regex = new RegExp("<input class=\"form-control\" name='inps'/>", "i");
                res = res && regex.test(str);
                expect(res).to.be.true;
            });
        });
    });
    context("student", function() {
        describe('SearchViewTest.getPage()', function () {
            before(function () {
                const app = express();
                test = new ProfileView(app);
                //@ts-ignore
                test.userKind = UserKind.student;
                //@ts-ignore
                test.profileController = {
                    update(_app) {
                        return;
                    },
                    async getAverageInfo() : Promise<Map<number,number>>{
                        let m = new Map();
                        m.set(1556200020460, 10);
                        m.set(1556283892382, 5 );
                        return m;
                    }
                }

            });
            it("should return student profile page", async function () {
                let data = { username: 'Pino',
                    id: '1',
                    password: 'Pino',
                    name: 'Pino',
                    lastname: 'Pino',
                    city: 'Varese',
                    school: 'Liceo Cavour',
                    email: 'Pino.Pino@Pino.Pino'
                }

                test.setUserData(data);
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
                regex = new RegExp("<p class= \"font-weight-bold\"> Nome: Pino</p> ", "i");
                res = res && regex.test(str);
                regex = new RegExp("<p class= \"font-weight-bold\"> Media valutazioni:</p>", "i");
                res = res && regex.test(str);
                expect(res).to.be.true;
            });
        });
    });
});