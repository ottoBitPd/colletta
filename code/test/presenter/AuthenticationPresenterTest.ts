import * as chai from 'chai';
import 'mocha';

var session = require('express-session');

import * as express from 'express';
//@ts-ignored
import * as chaiHttp from 'chai-http';
import {AuthenticationPresenter} from "../../src/ts/presenter/AuthenticationPresenter";
import {RegistrationView} from "../../src/ts/view/RegistrationView";

// Configure chai
chai.use(chaiHttp);
chai.should();


describe('AuthenticationPresenter', function() {

    let test: AuthenticationPresenter;
    const app = express();


    beforeEach(function () {

        test=new AuthenticationPresenter(new RegistrationView(app));

        session.username=undefined;
        session.password=undefined;

    });

    describe('AuthenticationPresenter.update()', function () {
        it('should return home', async function () {
            test.update(app);
            session.username="P";
            session.password="P";

            chai.request(app)
                .get('/logout').redirects(0)
                .end((err:any, res:any) => {
                    res.should.have.status(302);
                    res.body.should.be.a('object');
                    return;
                })
        });
    });

    describe('AuthenticationPresenter.isUsernameInvalid()', function () {
        it('should return true is username is invalid', async function () {
            test.isUsernameInvalid();
        });
    });

});