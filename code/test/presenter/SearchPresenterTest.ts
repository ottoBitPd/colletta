import * as chai from 'chai';
import 'mocha';

var session = require('express-session');

import * as express from 'express';
//@ts-ignored
import * as chaiHttp from 'chai-http';
import {SearchPresenter} from "../../src/ts/presenter/SearchPresenter";
import {SearchView} from "../../src/ts/view/SearchView";



// Configure chai
chai.use(chaiHttp);
chai.should();

describe('SearchPresenter', function() {

    let test:SearchPresenter;
    const app=express();
    app.use(require('body-parser').json());

    before( function () {

        test = new SearchPresenter(new SearchView(app));

        session.username=undefined;
    });

    describe('SearchPresenter.update()', function () {
        it('should return manage exercise search page user', async function () {
            test.update(app);
            session.username=undefined;
            chai.request(app)
                .get('/exercise/search').redirects(0)
                .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    return;
                })
        });

    /*    it('should return to manage exercise search user success', async function () {
            test.update(app);
            session.username=undefined;
            chai.request(app)
                .post('/searchexercise').redirects(0)
                .set('Content-Type', "application/json")
                .type("json")
                .send({
                    username:"ciao",
                    password:"ciao",
                    sentence:"ciao"
                })
                .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    return;
                })
        });*/

        it('should return to manage user search', async function () {
            test.update(app);
            session.username=undefined;
            chai.request(app)
                .post('/searchstudent').redirects(0)
                .set('Content-Type', "application/json")
                .type("json")
                .send({
                    sentence:"null"
                })
                .end((err:any, res:any) => {
                    res.should.have.status(307);
                    res.body.should.be.a('object');
                    return;
                })
        });

        it('should return to manage exercise search belong a class', async function () {
            test.update(app);
            session.username=undefined;
            chai.request(app)
                .post('/class/exercise/search')
                .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    return;
                })
        });
    });

    describe('SearchPresenter.setSearchType()', function () {
        it('should return set search type', async function () {
            //@ts-ignored
            test.setSearchType("uno");
        });
    });

    describe('SearchPresenter.setResults()', function () {
        it('should return set result', async function () {
            //@ts-ignored
            test.setResults("uno");
        });
    });

    describe('SearchPresenter.getSearchType()', function () {
        it('should return type search', async function () {
            test.getSearchType();
        });
    });

    describe('SearchPresenter.getResults()', function () {
        it('should return the results', async function () {
            test.getResults();
        });
    });

});
