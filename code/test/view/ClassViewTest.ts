import 'mocha';
import {expect} from "chai";
import {ClassView} from "../../src/ts/view/ClassView";
import * as express from "express";
import {UserKind} from "../../src/ts/view/PageView";

describe('ClassView', function() {
    let test: ClassView;
    beforeEach(function() {
        // @ts-ignore
        test.classPresenter = {
            update(app) {
                return;
            },
            async getClass(): Promise<any> {
                let _class = {
                    id: 'classID',
                    name: '4^B',
                    description: 'description',
                    teacherID:'teacherID',
                    students: ['A', 'B'],
                    exercises: ['1'],
                    time: 1111
                };
                return(_class);
            },
            async getStudentNumber(): Promise<number | number | number> {
                return 2;
            },
            async getStudents() {
                return (['A', 'B']);
            },
            async getExercises(){
                return (['1']);
            },
            getClassId() : string {
                return 'classID';
            }
        };
    });
    context("with a teacher user", function () {
        describe("ClassView.getPage()", function() {
            before(function () {
                const app = express();
                test = new ClassView(app);
                // @ts-ignore
                test.userKind = UserKind.teacher;
            });
            it('should return html page for a teacher user', async function () {
                let str = await test.getPage();
                var regex = new RegExp("<h1 class=\"text-center mt-5\">Studenti di questa classe</h1>", "i");
                var res = regex.test(str);
                regex = new RegExp("<button class='btn btn-primary my-3' name='key' value='\classID' type='submit'>Aggiungi uno studente</button>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<h1 class=\"text-center mt-5\">Esercizi assegnati alla classe</h1>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<button class='btn btn-primary my-3' name='key' value='classID' type='submit'>Assegna un nuovo esercizio</button>", "i");
                res = res && regex.test(str);
                expect(res).to.be.true;
            });
        });
    });
    context("with an another user", function() {
        describe("ClassView.getPage()", function() {
            before(function () {
                const app = express();
                test = new ClassView(app);
                // @ts-ignore
                test.userKind=UserKind.student;

            });
            it('should return html page for a student user', async function () {
                let str = await test.getPage();
                var regex = new RegExp("<h1 class=\"text-center mt-5\">Esercizi assegnati alla classe</h1>", "i");
                var res = regex.test(str);
                expect(res).to.be.true;
            });
        });
    });
});