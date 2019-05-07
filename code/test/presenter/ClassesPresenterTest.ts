import * as chai from 'chai';
import 'mocha';

var session = require('express-session');

import * as express from 'express';
//@ts-ignored
import * as chaiHttp from 'chai-http';
import {ClassesPresenter} from "../../src/ts/presenter/ClassesPresenter";
import {ClassesView} from "../../src/ts/view/ClassesView";
import {ClassClient} from "../../src/ts/model/Client/ClassClient";
import {UserClient} from "../../src/ts/model/Client/UserClient";
import {ExerciseClient} from "../../src/ts/model/Client/ExerciseClient";


// Configure chai
chai.use(chaiHttp);
chai.should();



describe('ClassesPresenter', function() {

    let test: ClassesPresenter;
    const app = express();
    app.use(require('body-parser').json());

    beforeEach(function () {

        test = new ClassesPresenter(new ClassesView(app));

        session.username = undefined;

        //@ts-ignored
        test.client = {

            getClassClient(): ClassClient | undefined {
                const tryclass = class extends ClassClient {

                    async getExercisesByAuthor(id: string): Promise<any> {
                        return true;
                    }

                    async getClassesByTeacher(teacherId: string): Promise<any> {
                        return true;
                    }
                    public async getStudents(classId:string): Promise<any>{
                        return true;
                    }
                };
                return new tryclass();
            },

            getUserClient(): UserClient | undefined {
                const tryclass = class extends UserClient {

                    async search(username: string): Promise<any> {
                        return true;
                    }

                    async isTeacher(username: string): Promise<boolean> {
                        return true;
                    }

                };
                return new tryclass();
            },

            getExerciseClient(): ExerciseClient | undefined {
                const tryclass = class extends ExerciseClient {
                    async getExercisesByAuthor(id :string) :Promise<any>{
                        return true;
                    }
                    getSplitSentence(sentence:string) : any{
                        return true;
                    }

                };
                return new tryclass();
            }
        };

    });

    describe('ClassesPresenter.update()', function () {
        it('should return update classes', async function () {
           await test.update(app);
        });
    });

    describe('ClassesPresenter.getClasses()', function () {
        it('should return classes', async function () {
          await  test.getClasses();
        });
    });

    describe('ClassesPresenter.getExercises()', function () {
        it('should return exercises', async function () {
            await  test.getExercises();
        });
    });

    describe('ClassesPresenter.getListType()', function () {
        it('should return list type', async function () {
            test.getListType();
        })
    });

    describe('ClassesPresenter.translateTag()', function () {
        it('should return a string containing the italian translation of the tag', async function () {
           test.translateTag("ciao");
        })
    });

    describe('ClassesPresenter.getStudentNumber()', function () {
        it('should return number of student', async function () {
            await test.getStudentNumber("11");
        })
    });

});