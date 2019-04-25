import {expect} from 'chai';
import 'mocha';
import {Student} from "../../../src/ts/model/Data/Student";
import {Data} from "../../../src/ts/model/Data/Data";
import {FirebaseUserManager} from "../../../src/ts/model/Firebase/FirebaseUserManager";

describe('FirebaseUserManager', function() {

    let student:any;

    let test=new FirebaseUserManager() ;

    beforeEach(function () {

        student = new Student("st1", "gioperry15", "ciao", "giovanni", "Peron", "Castelfranco", "Unipd","giov.anni@gmail.com");

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
                return "user"
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
                now.set("key","username");
                return now;
            }
        }

    });

    describe('FirebaseUserManager.insert()', function () {
        it('should return the insert user in database', async function() {

            expect(await test.insert(student)).to.equal(true);

        });
    });


    describe('FirebaseUserManager.remove()', function () {
        it('should return the remove obj in database', async function() {

            expect(await test.remove('key')).to.equal(true);

        });
    });

    describe('FirebaseUserManager.read()', function () {
        it('should return read obj in database', async function() {

            expect(await test.read('key')).to.equal("user");

        });
    });

    describe('FirebaseUserManager.search()', function () {
        it('should return search obj in database', async function() {

            expect(await test.search('genna')).to.equal("key");

        });
    });

    describe('FirebaseUserManager.update()', function () {
        it('should return update database', async function() {

            expect(await test.update("/data/users/-LckWHuNmk_1uKGc9oPV/city","Ibiza")).to.equal(true);

        });
    });

    describe('FirebaseUserManager.elements()', function () {
        it('should return elements database', async function() {
            let now=new Map<string,string>();
            now.set("key","username");

            expect(await test.elements()).eql(now);

        });
    });
    
});