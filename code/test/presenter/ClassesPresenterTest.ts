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
import {UserKind} from "../../src/ts/view/PageView";
var bodyParser = require('body-parser');

// Configure chai
chai.use(chaiHttp);
chai.should();



describe('ClassesPresenter', function() {

    let test: ClassesPresenter;
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    beforeEach(function () {

        test = new ClassesPresenter(new ClassesView(app));

        session.username = undefined;

        //@ts-ignored
        test.view = {

            setTitle(value: any) {
                return;
            },
            setUserKind(usr : UserKind) {
               return;
            }
        };

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
                        if (username!=="admin")
                            return true;
                    }

                    async isTeacher(username: string): Promise<boolean> {
                        return (username==="teacher");
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
        it('should return null class because username is the developer', async function () {
            test.update(app);
            session.username="developer";
            chai.request(app)
                .get('/classes')
                .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    return;
                })
        });

     /*   it('should return null exercise because username is the developer', async function () {
            test.update(app);
            session.username="developer";
            chai.request(app)
                .get('/exercises')
                .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    return;
                })
        });*/

  /*    it('should return nobody insert class', async function () {
            test.update(app);
           session.username="ciaooo";
            chai.request(app)
                .post('/insertclass')
                .set('Content-Type', "application/json")
                .type("json")
                .send({
                    username:"ciaooo",
                })
                .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    return;
                })
        });*/

        it('should return nobody delete class', async function () {
            test.update(app);
            session.username="admin";
            chai.request(app)
                .post('/deleteclass').redirects(0)
                .set('Content-Type', "application/json")
                .type("json")
                .send({
                    key:"1111"
                })
                .end((err:any, res:any) => {
                    res.should.have.status(302);
                    res.body.should.be.a('object');
                    return;
                })
        });
    });

    describe('ClassesPresenter.getClasses()', function () {
        it('should return classes', async function () {
            test.getClasses();
        });
    });

    describe('ClassesPresenter.getExercises()', function () {
        it('should return exercises', async function () {
              test.getExercises();
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
             test.getStudentNumber("11");
        })
    });

});