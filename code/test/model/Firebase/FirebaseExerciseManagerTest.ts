

import {expect} from 'chai';
import 'mocha';
import {Exercise} from "../../../src/ts/model/Data/Exercise";
import {FirebaseExerciseManager} from "../../../src/ts/model/Firebase/FirebaseExerciseManager";

describe('FirebaseExerciseManager', function() {

    let prova:Exercise;
    let prova_elements:Exercise;

    let test=new FirebaseExerciseManager() ;

    before(function () {
        prova= new Exercise("This is an example", "xxxxx");
        prova_elements= new Exercise("This is un example", "1111");
    });

    describe('FirebaseExerciseManager.insert()', function () {
        it('should return database void', async function() {

            expect(await test.insert(prova)).to.equal(false);
        });
        it('should return the insert exercise in database', async function() {

            prova.setSolution("1",["RTL"],["RTL"],1,true);
            prova.addValutation("xxxxx",1);
            expect(await test.insert(prova)).to.equal(true);
            });
        it('should return the exercise exists in database', async function() {

            prova.setSolution("1",["RTL"],["RTL"],1,true);
            prova.addValutation("xxxxx",1);
            expect(await test.insert(prova)).to.equal(true);
        });

    });

    describe('FirebaseExerciseManager.search()', function () {
        it('should return search exercise in database', async function() {

            prova.setKey(await test.search("This is an example"));
            expect(prova.getKey()).to.be.not.equal("false");
        });
    });

    describe('FirebaseExerciseManager.read()', function () {
        it('should return read exercise in database', async function() {

            expect(await test.read(prova.getKey())).to.be.not.eql(prova);
            });
        it('should return read exercise in database', async function() {

            expect(await test.read(prova_elements.getKey())).to.be.undefined;
            });
    });

    describe('FirebaseExerciseManager.update()', function () {
        it('should return update topics database', async function() {
            const exercise = await test.read(prova.getKey());
            await test.update("/data/sentences/"+prova.getKey()+"/solutions/"+(exercise.getSolutions()[0]).getKey()+"/topics",["Aggettivo","Nome","Verbo","Aggettivo"]);
            expect(prova).to.be.not.undefined;
        });
        it('should return update difficulty database', async function() {
            const exercise = await test.read(prova.getKey());
            await test.update("/data/sentences/"+prova.getKey()+"/solutions/"+(exercise.getSolutions()[0]).getKey()+"/difficulty",3);
            expect(prova).to.be.not.undefined;
        });
        it('should return update tags database', async function() {
            const exercise = await test.read(prova.getKey());
            await test.update("/data/sentences/"+prova.getKey()+"/solutions/"+(exercise.getSolutions()[0]).getKey()+"/tags",["Agv","PEm"]);
            expect(prova).to.be.not.undefined;
        });
        it('should return update public database', async function() {
            const exercise = await test.read(prova.getKey());
            await test.update("/data/sentences/"+prova.getKey()+"/solutions/"+(exercise.getSolutions()[0]).getKey()+"/public",false);
            expect(prova).to.be.not.undefined;
        });
        it('should doesn\'t update', async function() {
            const exercise = await test.read(prova.getKey());
            await test.update("/data/sentences/"+prova.getKey()+"/solutions/"+(exercise.getSolutions()[0]).getKey()+"/publicoex",false);
            expect(prova).to.be.not.undefined;
        });
    });

    describe('FirebaseExerciseManager.elements()', function () {
        it('should return elements database', async function() {
            expect(await test.elements()).not.to.be.undefined;
        });
    });

    describe('FirebaseExerciseManager.remove()', function () {
        it('should return the remove exercise in database', async function() {
            expect(await test.remove(prova.getKey())).to.equal(true);
        });
    });


});

