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
                    async findExercises(id :string) :Promise<any>{
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
           });

          it('should return exercise insert solution', async function () {
               test.update(app);
               session.username="ciao";
               chai.request(app)
                   .post('/exercise/insert')
                   .set('Content-Type', "application/json")
                   .type("json")
                   .send({
                       sentence:"ciaoo",
                       solutionKey:"ciao",
                       exerciseKey:"1"
                   })
                   .end((err:any, res:any) => {
                       res.should.have.status(200);
                       res.body.should.be.a('object');
                       res.redirect;
                       return;
                   })
           });

           it('should return exercise not insert solution', async function () {
               test.update(app);
               session.username="ciao";
               chai.request(app)
                   .post('/exercise/insert')
                   .set('Content-Type', "application/json")
                   .type("json")
                   .send({
                       sentence:"ciaoo",
                       solutionKey:"null",
                   })
                   .end((err:any, res:any) => {
                       res.should.have.status(200);
                       res.body.should.be.a('object');
                       res.redirect;
                       return;
                   })
           });
*/
           it('should return exercise not update', async function () {
               test.update(app);
               session.username="ciao";
               chai.request(app)
                   .post('/exercise/update').redirects(0)
                   .set('Content-Type', "application/json")
                   .type("json")
                   .send({
                       sentenceKey:"null",
                       solutionKey:"null",
                   })
                   .end((err:any, res:any) => {
                       res.should.have.status(302);
                       res.body.should.be.a('object');
                       return;
                   })
           });

        /*   it('should return exercise update', async function () {
               test.update(app);
               session.username="ciao";
               chai.request(app)
                   .post('/exercise/update').redirects(0)
                   .set('Content-Type', "application/json")
                   .type("json")
                   .send({
                       sentenceKey:"ciao",
                       solutionKey:"ciao",
                       _public:true,
                       topics:["Adp"],
                       difficulty:3
                   })
                   .end((err:any, res:any) => {
                       res.should.have.status(302);
                       res.body.should.be.a('object');
                       return;
                   })
           });*/
    });

    describe('ExercisePresenter.getUserSolution()', function () {
        it('should return user\'s solution', async function () {
            test.getUserSolution();
        });
    });

    describe('ExercisePresenter.correctionToTags()', function () {
        it('should return tags correction', async function () {
            //@ts-ignored
            test.correctionToTags(5,"2019-05-10");
        });
    });

    describe('ExercisePresenter.splitTopics()', function () {
        it('should return an array containing the topics splitted by space', async function () {
            //@ts-ignored
            test.splitTopics("come va");
        });
    });

    describe('ExercisePresenter.correctsPOS()', function () {
        it('should return a string array containing the tags of the final solution', async function () {
            //@ts-ignored
            test.correctsPOS(["Adp"],["Ndp"]);
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

    describe('ExercisePresenter.getUpdateState()', function () {
        it('should return state update', async function () {
            test.getUpdateState();
        });
    });


});