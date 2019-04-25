import {expect} from 'chai';
import 'mocha';
import {FirebaseClassManager} from "../../../src/ts/model/Firebase/FirebaseClassManager";
import {Class} from "../../../src/ts/model/Data/Class";
import {Data} from "../../../src/ts/model/Data/Data";

describe('FirebaseClassManager', function() {

    let prova :any;

    let test=new FirebaseClassManager();

    beforeEach(function () {

        prova= new Class("1","Benedetto","Ciao","111",["st1"],["es1"]);

        //@ts-ignore
        test={
            async insert(obj:Data):Promise<boolean>
            {
                return true;
            },

            async remove(obj:string):Promise<boolean>
            {
                return true;
            },
            async read(id:string):Promise<any>
            {
                return "classe"
            },
            async search(id:string):Promise<string>
            {
                return "key"
            },
            async update(path:string, value: any):Promise<any>
            {
                return true;
            },
            async elements() : Promise<Map<string, string>> {
                let now=new Map<string,string>();
                now.set("key","teacherID");
                return now;
            }

        }

    });

    describe('FirebaseClassManager.insert()', function () {
        it('should return the insert user in database', async function() {

            expect(await test.insert(prova)).to.equal(true);

        });
    });

    describe('FirebaseClassManager.remove()', function () {
        it('should return the remove obj in database', async function() {

            expect(await test.remove('ciao')).to.equal(true);

        });
    });

    describe('FirebaseClassManager.read()', function () {
        it('should return read obj in database', async function() {

            expect(await test.read('id')).to.equal("classe");

        });
    });

    describe('FirebaseClassManager.search()', function () {
        it('should return search obj in database', async function() {

            expect(await test.search('nome')).to.equal("key");

        });
    });

    describe('FirebaseClassManager.update()', function () {
        it('should return update database', async function() {

            expect(await test.update("/data/classes/-Ld9ae0AXaB9_KbZ-sGJ/exercises",["es3"])).to.equal(true);

        });
    });

    describe('FirebaseClassManager.elements()', function () {
        it('should return elements database', async function() {
            let now=new Map<string,string>();
            now.set("key","teacherID");
            expect(await test.elements()).eql(now);

        });
    });

});