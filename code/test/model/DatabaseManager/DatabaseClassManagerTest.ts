import {expect} from 'chai';
import 'mocha';

import {Class} from "../../../src/ts/model/Data/Class";

import {DatabaseClassManager} from "../../../src/ts/model/DatabaseManager/DatabaseClassManager";


describe('DatabaseClassManager', function() {

    let prova :any;

    let test1=new DatabaseClassManager();

    beforeEach(function () {
         prova= new Class("1","Benedetto","Ciao","111",["st1"],["es1"]);

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
                 return "classe"
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
                 now.set("key","teacherID");
                 console.log(now);
                 return now;
             }

         }

    });

    describe('DatabaseClassManager.insert()', function () {
        it('should return the insert obj in database', async function() {

            expect(await test1.insert(prova)).to.equal(true);

        });
    });


    describe('DatabaseClassManager.remove()', function () {
        it('should return the remove obj in database', async function() {

            expect(await test1.remove('ciao')).to.equal(true);

        });
    });


        describe('DatabaseClassManager.read()', function () {
            it('should return read obj in database', async function() {

                expect(await test1.read('ciao')).to.equal("classe");

            });
        });

            describe('DatabaseClassManager.search()', function () {
                it('should return search obj in database', async function() {

                    expect(await test1.search('ciao')).to.equal("key");


                });
            });

            describe('DatabaseClassManager.update()', function () {
                it('should return update database', async function() {

                    expect(await test1.update("/data/classes/-Ld9ae0AXaB9_KbZ-sGJ/exercises/0","es3")).to.equal(true);

                });
            });

            describe('DatabaseClassManager.elements()', function () {
                it('should return elements database', async function() {
                 let now=new Map<string,string>();
            now.set("key","teacherID");
                       expect(await test1.elements()).eql(now);

                });
            });

});
