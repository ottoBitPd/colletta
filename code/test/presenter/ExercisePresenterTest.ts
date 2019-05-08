import * as chai from 'chai';
import 'mocha';

var session = require('express-session');

import * as express from 'express';
//@ts-ignored
import * as chaiHttp from 'chai-http';
import {ExercisePresenter} from "../../src/ts/presenter/ExercisePresenter";
import {ExerciseView} from "../../src/ts/view/ExerciseView";
import {UserClient} from "../../src/ts/model/Client/UserClient";
import {ExerciseClient} from "../../src/ts/model/Client/ExerciseClient";



// Configure chai
chai.use(chaiHttp);
chai.should();


describe('ExercisePresenter', function() {

    let test:ExercisePresenter;
    const app=express();
    app.use(require('body-parser').json());

    before( function () {

        test = new ExercisePresenter(new ExerciseView(app));

        session.username=undefined;

        //@ts-ignored
        test.client = {

            getUserClient(): UserClient | undefined {
                const tryclass = class extends UserClient {

                    async search(username: string): Promise<any> {
                        return true;
                    }

                    async getUserData(id: string): Promise<any> {
                        return true;
                    }
                    public async isTeacher(username:string) : Promise<boolean> {
                        if (username==="teacher")
                            return true;
                        else return false;
                    }

                        async teacherList() : Promise<string[]> {
                        return ["ciao"];
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
                    async getExerciseData(id:string) : Promise<any> {
                        return true;
                    }

                    async searchSolution(sentence:string,solverID: string) : Promise<any>{
                        if (sentence==="ciao" && solverID==="111")
                      return [
                          {"id": "1",
                                "userID": "10",
                                "username": "Perry15",
                                "tags": ["RTL"],
                                "time": 1,
                                "difficulty": 1,
                                "topics": ["Adp"]}
                                ];
                    else return "";}
                };
                return new tryclass();
            }
        };

        //@ts-ignored
        test.view = {

            setError(error : string){
                return;
            },
            setSentence(sentence: string): void {

            },
            setPosTranslation(value : string[]): void {

            },
            setCorrections(value : any[]): void{

            },
            setUserKind(usr : any) {
            }
        };

    });

       describe('ExercisePresenter.update()', function () {
        it('should return exercise of user', async function () {
        test.update(app);
        session.username=undefined;
            chai.request(app)
                .post('/exercise')
                .set('Content-Type', "application/json")
                .type("json")
                .send({
                    sentence:"ciaoo",
                })
                .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.redirect;
                    return;
                })
        });

           it('should return exercise of student', async function () {
               test.update(app);
               session.username="ciao";
               chai.request(app)
                   .post('/exercise')
                   .set('Content-Type', "application/json")
                   .type("json")
                   .send({
                       sentence:"ciaoo",
                   })
                   .end((err:any, res:any) => {
                       res.should.have.status(200);
                       res.body.should.be.a('object');
                       res.redirect;
                       return;
                   })
           });

       /*    it('should return exercise save', async function () {
               test.update(app);
               session.username="ciao";
               chai.request(app)
                   .post('/exercise/save')
                   .set('Content-Type', "application/json")
                   .type("json")
                   .send({
                       sentence:"ciaoo",
                   })
                   .end((err:any, res:any) => {
                       res.should.have.status(200);
                       res.body.should.be.a('object');
                       res.redirect;
                       return;
                   })
           });*/

        /*   it('should return exercise insert', async function () {
               test.update(app);
               session.username="ciao";
               chai.request(app)
                   .post('/exercise/insert')
                   .set('Content-Type', "application/json")
                   .type("json")
                   .send({
                       sentence:"ciaoo",
                   })
                   .end((err:any, res:any) => {
                       res.should.have.status(200);
                       res.body.should.be.a('object');
                       res.redirect;
                       return;
                   })
           });*/
    });

    describe('ExercisePresenter.getUserSolution()', function () {
        it('should return user\'s solution', async function () {
            test.getUserSolution();
        });
    });

    describe('ExercisePresenter.getCorrection()', function () {
        it('should return correction of exercise', async function () {
            test.getCorrection();
        });
    });

    describe('ExercisePresenter.translateTag()', function () {
        it('should return the italian translation of the tag', async function () {
            test.translateTag("ciao");
        });
    });

    describe('ExercisePresenter.loggedTeacher()', function () {
        it('should return if the teacher is login', async function () {
            session.username="teacher";
            await test.loggedTeacher();
        });
        it('should return if the teacher doesn\'t login', async function () {
            session.username="null";
            await test.loggedTeacher();
        });
    });

    describe('ExercisePresenter.loggedStudent()', function () {
        it('should return if the student is login', async function () {
            session.username="student";
            await test.loggedStudent();
        });
        it('should doesn\'t return if the student is login', async function () {
            session.username=undefined;
            await test.loggedStudent();
        });
    });

    describe('ExercisePresenter.teacherSolutions()', function () {
        it('should return all the public teacher solutions avaiable for an exercise', async function () {
            await test.teacherSolutions("ciao");
        });
    });

    describe('ExercisePresenter.findSolution()', function () {
        it('should return a solution', async function () {
          await  test.findSolution("ciao","111",10);
        });
    });

    describe('ExercisePresenter.getUpdate()', function () {
        it('should return state update', async function () {
            test.getUpdate();
        });
    });


});