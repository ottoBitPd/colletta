import {expect} from 'chai';
import 'mocha';
import {Exercise} from "../../../src/ts/model/Data/Exercise";
import {FirebaseExerciseManager} from "../../../src/ts/model/Firebase/FirebaseExerciseManager";

describe('FirebaseExerciseManager', function() {

    let prova:Exercise;

    let test=new FirebaseExerciseManager() ;

    before(function () {

        prova= new Exercise("This is an example", "xxxxx");
        let now_=new Map<string,number>();
        now_.set(prova.getAuthorId(),6);
        prova.addSolution(prova.getKey(),prova.getAuthorId(),["RTL","SWnn","Sms","SWnn"],["This","example"],1,now_,124);

    });

    describe('FirebaseExerciseManager.insert()', function () {
        it('should return the insert exercise in database', async function() {
            expect(await test.insert(prova)).to.equal(false);

        });
    });
/*
    describe('FirebaseExerciseManager.search()', function () {
        it('should return search exercise in database', async function() {
            //@ts-ignored
            prova.id=await test.search('This is an example');
            expect(prova).to.be.not.equal("false");
        });
    });

    describe('FirebaseExerciseManager.remove()', function () {
        it('should return the remove exercise in database', async function() {

            expect(await test.remove('id')).to.equal(true);

        });
    });

    describe('FirebaseExerciseManager.read()', function () {
        it('should return read exercise in database', async function() {

            expect(await test.read('id')).to.equal("esercizio");

        });
    });

    describe('FirebaseExerciseManager.update()', function () {
        it('should return update database', async function() {

            expect(await test.update("/data/sentences/-LdARKQF3qrbhXacKH0J/solutions/-LdARKQLQqOQDeHS_vMU/tags",["RTL","Agg"])).to.equal(true);

        });
    });

    describe('FirebaseExerciseManager.elements()', function () {
        it('should return elements database', async function() {
            let now=new Map<string,string>();
            now.set("key","sentence");
            expect(await test.elements()).eql(now);

        });
    });*/
});