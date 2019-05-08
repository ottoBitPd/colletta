import * as chai from 'chai';
import 'mocha';

var session = require('express-session');

import * as express from 'express';
//@ts-ignored
import * as chaiHttp from 'chai-http';
import {ClassPresenter} from "../../src/ts/presenter/ClassPresenter";
import {ClassView} from "../../src/ts/view/ClassView";
import {ExerciseClient} from "../../src/ts/model/Client/ExerciseClient";
import {ClassClient} from "../../src/ts/model/Client/ClassClient";
import {UserClient} from "../../src/ts/model/Client/UserClient";
var bodyParser = require('body-parser');


// Configure chai
chai.use(chaiHttp);
chai.should();


describe('ClassPresenter', function() {

    let test: ClassPresenter;
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    beforeEach(function () {

        test = new ClassPresenter(new ClassView(app));

        session.username = undefined;

        //@ts-ignored
        test.view = {
            setUserKind(numero: any) {
                return;
            },

            async getPage(): Promise<string> {
                return "Page";
            },
            setTitle(value: any) {
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
                    async getExerciseData(id:string) : Promise<any> {
                        return true;
                    }
                    async getExercises(classId:string):Promise<string[]>{
                        return ["ciao"];
                    }
                    async getClassData(id:string) : Promise<any> {
                        return true;
                    }
                    async deleteStudent(classId:string, studentId:string){
                        return ;
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
                        return (username==="teacher");

                    }
                    async getUserData(id:string) : Promise<any> {
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
                    async getExerciseData(id:string) : Promise<any> {
                        return true;
                    }

                };
                return new tryclass();
            }
        };

    });

    describe('ClassPresenter.update()', function () {
  /*      it('should return updata class', async function () {
            test.update(app);
            session.username="teacher";

            chai.request(app)
                .get('/class').redirects(0)
                .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    return ;
                });
        });*/

     /*   it('should return delete student', async function () {
            test.update(app);
            session.username="teacher";

            chai.request(app)
                .post('/deletestudent').redirects(0)
                .set('Content-Type', "application/json")
                .type("json")
                .send({
                    classId:"io",
                    studentId:"ciao"
                })
                .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    return ;
                });
        });*/

    /*    it('should return add student', async function () {
            test.update(app);
            chai.request(app)
                .post('/addstudent').redirects(0)
                .set('Content-Type', "application/json")
                .type("json")
                .send({
                    studentId:"ciao"
                })
                .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    return ;
                });
        });*/

    });

    describe('ClassPresenter.getClassId()', function () {
        it('should return class id', async function () {
            test.getClassId();
        });
    });

    describe('ClassPresenter.getStudents()', function () {
        it('should return the students of the class', async function () {
           await test.getStudents();
        });
    });

    describe('ClassPresenter.getExercises()', function () {
        it('should return the the exercises of the class', async function () {
          await  test.getExercises();
        });
    });

    describe('ClassPresenter.getClass()', function () {
        it('should return a class', async function () {
          await test.getClass();
        });
    });

    describe('ClassPresenter.getStudentNumber()', function () {
        it('should return number of students belong to a class', async function () {
          await  test.getStudentNumber();
        });
    });

    describe('ClassPresenter.getClasses()', function () {
        it('should return number of classes belong to a teacher', async function () {
          await test.getClasses();
        });
    });
});
