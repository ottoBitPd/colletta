import * as chai from 'chai';
import 'mocha';

var session = require('express-session');

import * as express from 'express';
//@ts-ignored
import * as chaiHttp from 'chai-http';
import {RegistrationPresenter} from "../../src/ts/presenter/RegistrationPresenter";
import {RegistrationView} from "../../src/ts/view/RegistrationView";
import {UserClient} from "../../src/ts/model/Client/UserClient";
var bodyParser = require('body-parser');
// Configure chai
chai.use(chaiHttp);
chai.should();

class tryclass extends UserClient {

    async search(username: string): Promise<any> {
        return true;
    }

    async isTeacher(username: string): Promise<boolean> {
        return true;
    }
    async getUserData(id:string) : Promise<any> {
        return true;
    }

    async  insertStudent(username : string, password : string, name : string, surname : string, city : string, school : string, email : string) : Promise<boolean>{
        return true;
    }
    async verifyUser(username: string, insertedPassword : string) : Promise<boolean>{
        return true;
    }
};

describe('RegistrationPresenter', function() {

    let test: RegistrationPresenter;
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    beforeEach(function () {

        test=new RegistrationPresenter(new RegistrationView(app));

        session.username=undefined;
        session.password=undefined;

        //@ts-ignored
        test.view = {

            setError(error : string){
                console.log("oiiweij");
            }
        };
        //@ts-ignored
        test.client = {

            getUserClient(): UserClient | undefined {
                return new tryclass();
            }
    };

    });

    describe('RegistrationPresenter.update()', function () {
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

        it('should return login success', async function () {
            test.update(app);
            session.username="Perry15";
            chai.request(app)
                .get('/profile')
                .end((err:any, res:any) => {
                  
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    return;
                })
        });
/*
        it('should return username o password invalidi', async function () {
            test.update(app);
            session.username="Perry15";
            chai.request(app)
                .get('/login?mess=invalidLogin').redirects(0)
                .end((err:any, res:any) => {
                    console.log(test);
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    return;
                })
        });*/

        it('should return invalid Login', async function () {
            test.update(app);
            chai.request(app)
                .post('/checklogin').redirects(0)
                .set('Content-Type', "application/json")
                .type("json")
                .send({
                    username:"ciao",
                    password:"ciao"
                })
                .end((err:any, res:any) => {
                    res.should.have.status(302);
                    res.body.should.be.a('object');
                    return;
                })
        });

        it('should return registration', async function () {
            test.update(app);
            chai.request(app)
                .get('/registration')
                .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    return;
                })
        });

      /*    it('should return check login', async function () {
            test.update(app);
            chai.request(app)
                .post('/saveuser').redirects(0)
                .set('Content-Type', "application/json")
                .type("json")
                .send({
                    username:"ciao",
                    role:"student",
                    name:"gio",
                    city:"Miami",
                    school:"unipd",
                    email:"e@gmail.com",
                    surname:"bergo"

                })
                .end((err:any, res:any) => {
                    res.should.have.status(302);
                    res.body.should.be.a('object');

                    return;
                })
        });*/

        it('should return Username wrong', async function () {
            test.update(app);
            chai.request(app)
                .post('/saveuser')
                .set('Content-Type', "application/json")
                .type("json")
                .send({
                    username:"admin",
                })
                .end((err:any, res:any) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.redirect;
                    return;
                })
        });



    });

    describe('RegistrationPresenter.isUsernameInvalid()', function () {
        it('should return true is username is invalid', async function () {
            test.isUsernameInvalid();
        });
    });

});