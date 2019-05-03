

import {expect} from 'chai';
import 'mocha';
import {FirebaseClassManager} from "../../../src/ts/model/Firebase/FirebaseClassManager";
import {Class} from "../../../src/ts/model/Data/Class";

describe('FirebaseClassManager', function() {

    let prova :Class;
    let prova_elements:Class;
    let test=new FirebaseClassManager();
    before(function () {
        prova= new Class("100","Benedetto","Ciao","111",["st1"],["es1"]);
        prova_elements= new Class("400","GianMarco","Ciaone","123",["st11"],["es11"]);
    });

    describe('FirebaseClassManager.insert()', function () {
        it('should return the insert user in database', async function() {

            expect(await test.insert(prova)).to.equal(true);
        });
        it('doesn\'t should return the insert user in database', async function() {

            expect(await test.insert(prova)).to.equal(false);
        });
    });

    describe('FirebaseClassManager.search()', function () {
        it('doesn\'t should return search obj in database', async function() {
            //@ts-ignored
            prova.id=await test.search('Benedettolone');
            expect(prova.getId()).to.be.equal("false");
        });

        it('should return search obj in database', async function() {
            //@ts-ignored
            prova.id=await test.search('Benedetto');
            expect(prova.getId()).to.be.not.equal("false");
        });

    });

    describe('FirebaseClassManager.read()', function () {
        it('should return read obj in database', async function() {
            let _class = await test.read(prova.getId());

            expect((<Class> _class).getId()).to.eql(prova.getId()) &&
            expect((<Class> _class).getName()).to.eql(prova.getName()) &&
            expect((<Class> _class).getDescription()).to.eql(prova.getDescription()) &&
            expect((<Class> _class).getTeacherID()).to.eql(prova.getTeacherID()) &&
            expect((<Class> _class).getExercises()).to.eql(prova.getExercises());
        });
        it('doesn\'t should return read obj in database', async function() {
            let _class = await test.read(prova.getId());

            expect((<Class> _class).getId()).to.not.eql(prova_elements.getId()) &&
            expect((<Class> _class).getName()).to.not.eql(prova_elements.getName()) &&
            expect((<Class> _class).getDescription()).to.not.eql(prova_elements.getDescription()) &&
            expect((<Class> _class).getTeacherID()).to.not.eql(prova_elements.getTeacherID()) &&
            expect((<Class> _class).getExercises()).to.not.eql(prova_elements.getExercises());
        });
        it('should return read obj in database void', async function() {
            let _class = await test.read(prova_elements.getId());
            expect(_class).to.be.undefined;
        });
    });

    describe('FirebaseClassManager.update()', function () {
        it('should return update database exercises', async function() {
            expect(await test.update("/data/classes/"+prova.getId()+"/exercises",["es3"])).to.be.not.eql(prova.getExercises());
        });
        it('should return update database student', async function() {
            expect(await test.update("/data/classes/"+prova.getId()+"/students",["st3"])).to.be.not.eql(prova.getStudents());
        });
        it('should doesn\'t update', async function() {
            let e =await test.update("/data/classes/"+prova.getId()+"/exercisesstudents",["es3","st3"]);
            expect( e ).to.be.undefined;
        });
    });

    describe('FirebaseClassManager.elements()', function () {
        it('should return elements database', async function() {
            let now=await test.elements();
            expect(now.get(prova.getId())).not.to.be.undefined;
            });

        it('doesn\'t should return elements database', async function() {
            let now=await test.elements();
            expect(now.get(prova_elements.getId())).to.be.undefined;
        });
    });

    describe('FirebaseClassManager.remove()', function () {
        it('should return the remove obj in database', async function() {
            expect(await test.remove(prova.getId())).to.equal(true);
        });
        it('doesn\'t should return the remove obj in database', async function() {
            expect(await test.remove(prova_elements.getId())).to.equal(false);
        });
    });

});

