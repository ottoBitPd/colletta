import {expect} from 'chai';
import 'mocha';
import {DatabaseUserManager} from "../../../src/ts/model/DatabaseManager/DatabaseUserManager";
import {Student} from "../../../src/ts/model/Data/Student";
import {Class} from "../../../src/ts/model/Data/Class";

describe('DatabaseUserManager', function() {

    let student :any;

    let test1=new DatabaseUserManager();

    beforeEach(function () {
        student = new Student("st1", "gioperry15", "ciao", "giovanni", "Peron", "Castelfranco", "Unipd","giov.anni@gmail.com");

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
                return "user"
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
                now.set("key","username");
                return now;
            }

        }

    });

    describe('DatabaseUserManager.insert()', function () {
        it('should return the insert user in database', async function() {

            expect(await test1.insert(student)).to.equal(true);

        });
    });

    describe('DatabaseUserManager.remove()', function () {
        it('should return the remove obj in database', async function() {

            expect(await test1.remove('ciao')).to.equal(true);

        });
    });

    describe('DatabaseUserManager.read()', function () {
        it('should return read obj in database', async function() {

            expect(await test1.read('ciao')).to.equal("user");

        });
    });

    describe('DatabaseUserManager.search()', function () {
        it('should return search obj in database', async function() {

            expect(await test1.search('genna')).to.equal("key");

        });
    });

    describe('DatabaseUserManager.update()', function () {
        it('should return update database', async function() {

            expect(await test1.update("/data/users/-LckWHuNmk_1uKGc9oPV/city","Ibiza")).to.equal(true);

        });
    });

    describe('DatabaseUserManager.elements()', function () {
        it('should return elements database', async function() {
            let now=new Map<string,string>();
            now.set("key","username");

            expect(await test1.elements()).eql(now);

        });
    });



});
