import {ClassClient} from "../../../src/ts/model/Client/ClassClient";
import {expect} from 'chai';
import 'mocha';
import {Data} from "../../../src/ts/model/Data/Data";
import {Class} from "../../../src/ts/model/Data/Class";

describe('ClassClient', function() {

    let test : ClassClient;
    //let database : DatabaseClassManager;

    before(function () {
        //database = new DatabaseClassManager();
        test = new ClassClient();
        //@ts-ignore
        test.dbClassManager =
            {
                async insert(_class) : Promise<boolean>{
                    return true;
                },

                async remove(id:string) : Promise<boolean> {
                    return true;
                },

                async read(id:string) : Promise<Data> {
                    if (id==="")
                    {return new Class(id,"ciao","ciao","0",[],[]);}
                    else
                        if (id!=="n") {return new Class(id,"ciao","ciao","0",["st1"],["es1"]);}
                        else
                        {return new Class(id,"ciao","ciao","0",["n"],["n"]);}
                },

                async search(name:string) : Promise<string> {
                    return await "0000";
                },

                async update(path:string, value: any): Promise<void> {
                    return;
                },

                async elements() : Promise<Map<string, string>> {
                    let map = new Map<string,string>();
                    map.set("0","0");
                    map.set("1","0");
                    return map;
                }
            };
    });

    describe('ClassClientTest.getDbClassManager()', function () {
        it('should return database class', function () {
            expect(test.getDbClassManager()).to.be.not.null &&
            expect(test.getDbClassManager()).to.be.not.undefined;
        });
    });

    describe('ClassClientTest.deleteClass()', function () {
        it('should delete a class', async function () {
            expect(await test.deleteClass("")).to.be.true;
        });
    });

    describe('ClassClientTest.deleteClass()', function () {
        it('should delete a class', async function () {
            expect(await test.deleteClass("")).to.be.true;
        });
    });

    describe('ClassClientTest.deleteStudent()', function () {
        it('should remove a student from a class', async function () {
            expect(await test.deleteStudent("","")).to.be.undefined;
        });
        it('should remove the last student from a class', async function () {
            expect(await test.deleteStudent("st1","st1"));
        });
    });

    describe('ClassClientTest.deleteExercise()', function () {
        it('should remove an exercise from a class', async function () {
            expect(await test.deleteExercise("","")).to.be.undefined;
        });
        it('should remove the last exercise from a class', async function () {
            expect(await test.deleteExercise("es1","es1"));
        });
    });

    describe('ClassClientTest.addStudent()', function () {
        it('should add a student to a class', async function () {
            expect(await test.addStudent("","")).to.be.undefined;
        });
        it('should add the first student to a class', async function () {
            expect(await test.addStudent("n","n"));
        });
    });

    describe('ClassClientTest.addClass()', function () {
        it('should add a class', async function () {
            expect(await test.addClass("ciao","ciao","ciao")).to.be.true;
        });
    });

    describe('ClassClientTest.addExercise()', function () {
        it('should add an exercise to a class', async function () {
            expect(await test.addExercise("","")).to.be.undefined;

        });
        it('should add first exercise to a class', async function () {
            expect(await test.addExercise("n","n"));
        });

    });

    describe('ClassClientTest.getStudents()', function () {
        it('should get the students subscribed to a class', async function () {
            expect(await test.getStudents("")).to.be.eql([]);
        });
    });

    describe('ClassClientTest.getExercises()', function () {
        it('should get the exercises assigned to a class', async function () {
            expect(await test.getExercises("")).to.be.eql([]);
        });
    });

    describe('ClassClientTest.getClassesByTeacher()', function () {
        it('should get the classes with a specific teacher', async function () {
            expect((await test.getClassesByTeacher("0")).length).to.be.equal(2);
        });
    });

    describe('ClassClientTest.getClassData()', function () {
        it('should get a class\' information', async function () {
            expect(await test.getClassData("0")).to.be.eql({
                "id" : "0",
                "name" : "ciao",
                "description" : "ciao",
                "teacherID" : "0",
                "students" : ["st1"],
                "exercises" : ["es1"],
                "time" : null
            });
        });
    });

    describe('ClassClientTest.getClassesByStudent()', function () {
        it('should get the classes with a specific student', async function () {
            expect((await test.getClassesByStudent("st1")).length).to.be.equal(2);
        });
    });
});