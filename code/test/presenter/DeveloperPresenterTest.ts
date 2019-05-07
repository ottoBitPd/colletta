import * as chai from 'chai';
import 'mocha';

var session = require('express-session');

import * as express from 'express';
//@ts-ignored
import * as chaiHttp from 'chai-http';
import {DeveloperPresenter} from "../../src/ts/presenter/DeveloperPresenter";
import {DeveloperView} from "../../src/ts/view/DeveloperView";
import {UserClient} from "../../src/ts/model/Client/UserClient";



// Configure chai
chai.use(chaiHttp);
chai.should();


describe('DeveloperPresenter', function() {

    let test:DeveloperPresenter;
    const app=express();
    app.use(require('body-parser').json());

    beforeEach( function () {

        test = new DeveloperPresenter(new DeveloperView(app));

        session.username=undefined;
        //@ts-ignored
        test.client = {
            getUserClient(): UserClient | undefined {

                const tryclass = class extends UserClient {
                    async getUserData(id: string): Promise<any> {
                        return true;
                    }
                };

                return new tryclass();
            }
        };
    });

    describe('DeveloperPresenter.getAnnotations()', function () {
        it('should return annotations', async function () {
            test.getAnnotations();
        });
    });

    describe('DeveloperPresenter.getMessage()', function () {
        it('should return Message', async function () {
            test.getMessage();
        });
    });

    describe('DeveloperPresenter.getAllAnnotation()', function () {
        it('should return all annotation', async function () {
             test.getAllAnnotation()
        });
    });

    describe('DeveloperPresenter.filterBySentence()', function () {
        it('should return filter by sentence', async function () {
            test.filterBySentence("ciao");
        });
    });

    describe('DeveloperPresenter.filterByValutation()', function () {
        it('should return filter by valutation', async function () {
            test.filterByValutation(2,6);
        });
    });

    describe('DeveloperPresenter.filterByDate()', function () {
        it('should return filter by date', async function () {
            test.filterByDate(new Date(2015, 0, 1, 9, 30),new Date(2015, 0, 4, 5, 10));
        });
    });

    describe('DeveloperPresenter.filterByUser()', function () {
        it('should return filter by user', async function () {
            test.filterByUser("Perry15");
        });
    });

    describe('DeveloperPresenter.createCsvFromAnnotations()', function () {
        it('should return Csv from Annotations', async function () {
            test.createCsvFromAnnotations();
        });
    });

   /* describe('DeveloperPresenter.createTxtFromAnnotations()', function () {
        it('should return text from Annotations', async function () {
            test.createTxtFromAnnotations();
        });
    });*/

    describe('DeveloperPresenter.isTeacher()', function () {
        it('should return if is teacher', async function () {
            test.isTeacher("111");
        });
    });

});
