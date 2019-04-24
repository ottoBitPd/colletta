import {expect} from 'chai';
import 'mocha';
import {DatabaseExerciseManager} from "../../../src/ts/model/DatabaseManager/DatabaseExerciseManager";
import {Exercise} from "../../../src/ts/model/Data/Exercise";
import {Class} from "../../../src/ts/model/Data/Class";

describe('DatabaseExerciseManager', function() {

     let prova:any;
    let test1=new DatabaseExerciseManager();

    beforeEach(function () {
        prova= new Exercise("This is an example", "xxxxx");

        //@ts-ignore
        test1.firebaseManager={
            async insert(obj:Class):Promise<boolean>
            {
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
            async update(path:string, value: any)
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


    describe('DatabaseExerciseManager.insert()', function () {
        it('should return the insert exercise in database', async function() {

            expect(await test1.insert(prova)).to.equal(true);

        });
    });

    describe('DatabaseExerciseManager.remove()', function () {
        it('should return the remove exercise in database', async function() {

            expect(await test1.remove('ciao')).to.equal(true);

        });
    });

    describe('DatabaseExerciseManager.read()', function () {
        it('should return read exercise in database', async function() {

            expect(await test1.read('ciao')).to.equal("esercizio");

        });
    });

    describe('DatabaseExerciseManager.search()', function () {
        it('should return search exercise in database', async function() {

            expect(await test1.search('ciao')).to.equal("key");


        });
    });

    describe('DatabaseExerciseManager.update()', function () {
        it('should return update database', async function() {

            expect(await test1.update("/data/sentences/-LdARKQF3qrbhXacKH0J/solutions/-LdARKQLQqOQDeHS_vMU/tags/0","RTL")).to.equal(true);

        });
    });

    describe('DatabaseExerciseManager.elements()', function () {
        it('should return elements database', async function() {
            let now=new Map<string,string>();
            now.set("key","sentence");
            expect(await test1.elements()).eql(now);

        });
    });
});