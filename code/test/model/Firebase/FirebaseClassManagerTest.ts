import {expect} from 'chai';
import 'mocha';
import {FirebaseClassManager} from "../../../src/ts/model/Firebase/FirebaseClassManager";
import {Class} from "../../../src/ts/model/Data/Class";

describe('FirebaseClassManager', function() {

    let prova :Class;

    let test=new FirebaseClassManager();

    before(function () {

        prova= new Class("1","Benedetto","Ciao","111",["st1"],["es1"]);
    });

    describe('FirebaseClassManager.insert()', function () {
        it('should return the insert user in database', async function() {

            expect(await test.insert(prova)).to.equal(true);

        });
    });

    describe('FirebaseClassManager.search()', function () {
        it('should return search obj in database', async function() {
            //@ts-ignored
            prova.id=await test.search('Benedetto');
            expect(prova.getId()).to.be.not.equal("false");
        });
    });

    describe('FirebaseClassManager.read()', function () {
        it('should return read obj in database', async function() {
            expect(await test.read(prova.getId())).to.eql(prova);
        });
    });

    describe('FirebaseClassManager.update()', function () {
        it('should return update database', async function() {
            expect(await test.update("/data/classes/"+prova.getId()+"/exercises",["es3"])).to.be.not.eql(prova.getExercises());
        });
    });

    describe('FirebaseClassManager.elements()', function () {
        it('should return elements database', async function() {
            let now=await test.elements();
            expect(now.get(prova.getId())).not.to.be.undefined;

        });
    });

    describe('FirebaseClassManager.remove()', function () {
        it('should return the remove obj in database', async function() {
            expect(await test.remove(prova.getId())).to.equal(true);

        });
    });

});