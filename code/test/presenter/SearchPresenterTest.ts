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
