import {expect} from 'chai';
import 'mocha';
import * as sinon from "ts-sinon";

import {Class} from "../../../src/ts/model/Data/Class";

import {FirebaseClassManager} from "../../../src/ts/model/Firebase/FirebaseClassManager";

describe('DatabaseClassManager', function() {

    let prova :any;
    let test:FirebaseClassManager;
    const stubObj= sinon.stubObject;

    beforeEach(function () {
         prova= new Class("1","Benedetto","Ciao","111",["st1"],["es1"]);
         test= new FirebaseClassManager();
    });

    describe('DatabaseClassManager.insert()', function () {
        it('should return the insert obj in database', async function() {

            const testStub= stubObj<FirebaseClassManager>(test,{insert:true});

            expect( await testStub.insert(prova)).to.equal(true);

        });
    });


    describe('DatabaseClassManager.remove()', function () {
        it('should return the remove obj in database', async function() {

            const testStub= stubObj<FirebaseClassManager>(test,{remove:true});

            expect(testStub.remove('ciao')).to.equal(true);

        });
    });


    describe('DatabaseClassManager.read()', function () {
        it('should return read obj in database', async function() {

            const testStub= stubObj<FirebaseClassManager>(test,{read:true});

            expect(testStub.read('ciao')).to.equal(true);

        });
    });

    describe('DatabaseClassManager.search()', function () {
        it('should return search obj in database', async function() {

            const testStub= stubObj<FirebaseClassManager>(test,{search:true});

            expect(testStub.search('ciao')).to.equal(true);

        });
    });

    describe('DatabaseClassManager.update()', function () {
        it('should return update database', async function() {

            const testStub= stubObj<FirebaseClassManager>(test,{update:true});

            expect(testStub.update("/data/classes/-Ld9ae0AXaB9_KbZ-sGJ/exercises/0","es3")).to.equal(true);

        });
    });

    describe('DatabaseClassManager.elements()', function () {
        it('should return elements database', async function() {

           const testStub= stubObj<FirebaseClassManager>(test,{elements:true});

            expect(testStub.elements()).to.equal(true);

        });
    });

});
