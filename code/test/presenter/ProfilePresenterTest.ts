import * as chai from 'chai';
import 'mocha';
import {InsertPresenter} from "../../src/ts/presenter/InsertPresenter";
import {InsertPageView} from "../../src/ts/view/InsertPageView";
import * as express from "express";
var session = require('express-session');

//@ts-ignored
import * as chaiHttp from 'chai-http';
import {ProfilePresenter} from "../../src/ts/presenter/ProfilePresenter";
import {ProfileView} from "../../src/ts/view/ProfileView";

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('ProfilePresenter', function() {

    let test:ProfilePresenter;
    const app=express();

    beforeEach(function () {

        test=new ProfilePresenter(new ProfileView(app));

        session.username=undefined;

        //@ts-ignored
        test.view={
            setUserKind(numero: any) {
                return true;
            },
            setUserData(obj : any){
                return true;
            },
            setTitle(value: any) {
                return true;
            },
            setError(error : string) {
                return true;
                }
        }
    });

});