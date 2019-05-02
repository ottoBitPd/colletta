import * as chai from 'chai';
import 'mocha';
import {InsertPresenter} from "../../src/ts/presenter/InsertPresenter";
import {InsertPageView} from "../../src/ts/view/InsertPageView";
import * as express from "express";
var session = require('express-session');

//@ts-ignored
import * as chaiHttp from 'chai-http';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('InsertPresenter', function() {

    let test:InsertPresenter;
    const app=express();

    beforeEach(function () {

        session.username=undefined;
       test = new InsertPresenter(new InsertPageView(app));

       //@ts-ignored
       test.view = {
           setUserKind(numero: any) {
               return true;
           },

           async getPage(): Promise<string> {
               return "Page";
           }
       };

       //@ts-ignored
       test.client = {
           getUserClient(): any {
               return {
                   async isTeacher(username: string): Promise<any> {
                       if ("Gian" === username)
                           return true;
                       else return false;
                   }
               }
           }

       };

    });

    describe('InsertPresenter.isLoggedIn()', function () {
        it('should return user', async function () {
            chai.expect(test.isLoggedIn()).to.equal(false);
        });
    });

    describe('InsertPresenter.update()', function () {
        it('should return update insertExercise teacher', async function () {
            test.update(app);
            session.username = "Perry15";
            chai.request(app)
                .get('/')
                .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    return new Promise(()=>{});
                });
        });

        it('should return update insertExercise student', async function () {
            test.update(app);
            session.username = "Pino";
            chai.request(app)
                .get('/')
                .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    return new Promise(()=>{});
                });
        });

        it('should return update insertExercise developer', async function () {
            test.update(app);
            chai.request(app)
                .get('/')
                .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    return new Promise(()=>{});
                });
        });
    });

});