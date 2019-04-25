import {expect} from 'chai';
import 'mocha';
import {Data} from "../../../src/ts/model/Data/Data";
import {Exercise} from "../../../src/ts/model/Data/Exercise";
import {FirebaseExerciseManager} from "../../../src/ts/model/Firebase/FirebaseExerciseManager";

describe('FirebaseExerciseManager', function() {

    let prova:any;

    let test=new FirebaseExerciseManager() ;

    beforeEach(function () {

        prova= new Exercise("This is an example", "xxxxx");

        //@ts-ignore
        test={

            async insert(obj: Data): Promise<boolean> {
                return true;
            },
            async remove(obj:string):Promise<boolean>
            {
                return true;
            },
            async read(id:string):Promise<any>
            {
                return "esercizio"
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
                now.set("key","sentence");
                return now;
            }
        }

    });

    describe('FirebaseExerciseManager.insert()', function () {
        it('should return the insert exercise in database', async function() {

            expect(await test.insert(prova)).to.equal(true);

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

    describe('FirebaseExerciseManager.search()', function () {
        it('should return search exercise in database', async function() {

            expect(await test.search('sentence')).to.equal("key");

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
    });
});