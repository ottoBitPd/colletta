import 'mocha';
import {expect} from "chai";
import {RegistrationView} from "../../src/ts/view/RegistrationView";
import * as express from "express";


describe('RegistrationView', function() {
    let test: RegistrationView;
    context("with a valid username", function () {
        describe ("RegistrationView.getPage()", function () {
            before(function () {
                const app = express();
                test = new RegistrationView(app);
                // @ts-ignore
                test.authPresenter = {
                    update(app) {
                        return;
                    },
                    isUsernameInvalid() {
                        return false;
                    },
                };
            });
            it('should return the html page for a valid username', async function () {
                let str = await test.getPage();
                var regex = new RegExp("<head>", "i");
                let res = regex.test(str);
                regex = new RegExp("</head>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<html lang=\"it\">", "i");
                res = res && regex.test(str);
                regex = new RegExp("</html>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<h1 class='h2'>Registrazione</h1>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<label class='h5' for=\"sentence\">Inserisci i tuoi dati</label>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<input type=\"text\" class=\"form-control my-2\" id=\"name\" name=\"name\" placeholder=\"Inserisci il tuo nome\" required/>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<input type=\"text\" class=\"form-control my-2\" id=\"surname\" name=\"surname\" placeholder=\"Inserisci il tuo cognome\" required/>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<input type=\"text\" class=\"form-control my-2\" id=\"city\" name=\"city\" placeholder=\"Inserisci la tua città\" required/>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<input type=\"text\" class=\"form-control my-2\" id=\"school\" name=\"school\" placeholder=\"Inserisci la tua scuola\" required/>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<option value=\"student\">Allievo</option>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<option value=\"teacher\">Insegnante</option>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<input type=\"text\" class='form-control my-2' style=\"display: none;\" id=\"inps\" name=\"inps\" value=\"\" placeholder=\"Inserisci il tuo codice inps\" required/>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<input type=\"text\" class='form-control my-2' id=\"email\" name=\"email\" placeholder=\"Inserisci la tua email\" required/>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<input type=\"text\" class='form-control my-2' id=\"username\" name=\"username\" placeholder=\"Inserisci la tua username\" required/>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<input type=\"password\" class='form-control my-2' id=\"password\" name=\"password\" placeholder=\"Inserisci la tua password\" required/>", "i");
                res = res && regex.test(str);
                regex = new RegExp("<button type=\"submit\" id='btnsubmit' class=\"btn btn-primary my-2 my-sm-0 w-25\">Invia</button>", "i");
                res = res && regex.test(str);
                expect(res).to.be.true;
            });
        });
    });
    context("with a invalid username", function () {
        describe("RegistrationView.getPage()", function () {
            before(function () {
                const app = express();
                test = new RegistrationView(app);
                // @ts-ignore
                test.authPresenter = {
                    update(app) {
                        return;
                    },
                    isUsernameInvalid() {
                        return true;
                    }
                };
            });
            it('should return a text-danger for a invalid username', async function () {
                let str = await test.getPage();
                var regex = new RegExp("<p class='text-danger'>username già utilizzata, scegli un'altra username</p>", "i");
                var res = regex.test(str);
                expect(res).to.be.true;
            });
        });
    });
});


/*
regex = new RegExp("", "i");
res = res && regex.test(str);
*/