import {expect} from 'chai';
import 'mocha';
import {Data} from "../../../src/ts/model/Data/Data";
import {ExerciseClient} from "../../../src/ts/model/Client/ExerciseClient";
import {Exercise} from "../../../src/ts/model/Data/Exercise";

describe('ExerciseClient', function() {

    let test: ExerciseClient;
    //let database : DatabaseClassManager;

    beforeEach(function () {
        //database = new DatabaseClassManager();
        test = new ExerciseClient();
        //@ts-ignore
        test.dbExerciseManager =
            {
                async insert(data): Promise<boolean> {
                    return true;
                },

                async remove(id: string): Promise<boolean> {
                    return true;
                },

                async read(id: string): Promise<Data> {
                    return new Exercise("This is an example","0");
                },

                async search(name: string): Promise<string> {
                    return await "0";
                },

                async update(path: string, value: any): Promise<void> {
                    return;
                },

                async elements(): Promise<Map<string, string>> {
                    let map = new Map<string, string>();
                    map.set("0", "0");
                    map.set("1", "0");
                    return map;
                }
            };

    });

    describe('ExerciseClient.getSplitSentence()',function () {
        it('should return the sentence split in words', function () {
            expect(test.getSplitSentence("This is an example")).to.be.eql(["This","is","an","example"]);
        });
    });

    describe('ExerciseClient.insertExercise()',function () {
        it('should insert an exercise in the database', function() {
            expect(test.insertExercise("", "", ["", "", "", ""], ["", ""])).to.be.undefined;
        });
    });

    describe('ExerciseClient.searchExercise()',function () {
        it('should search an exercise in the database', async function() {
            let map = new Map<string,string>();
            map.set("0", "0");
            map.set("1", "0");
            expect(await test.searchExercise("0")).to.be.eql(map);
        });
    });

    describe('ExerciseClient.searchSolution()',function () {
        it('should search a solution in the database', async function() {
            //@ts-ignore
            test.dbExerciseManager.read = (id : string) => {
                let exercise = new Exercise("This is an example","0");
                exercise.addSolution("1","0",[],[],3,new Map<string,number>(),1);
                exercise.addSolution("2","0",[],[],3,new Map<string,number>(),2);
                exercise.addSolution("3","0",[],[],3,new Map<string,number>(),3);
                exercise.getSolutions()[0].addNewMark("",2);
                exercise.getSolutions()[1].addNewMark("",4);
                exercise.getSolutions()[2].addNewMark("",3);
                return exercise;
            };

            expect(await test.searchSolution("This is an example","0")).to.be.eql(
                [
                    {
                        "difficulty": 3,
                        "id": "1",
                        "tags": [],
                        "time": 1,
                        "topics": [],
                        "userID": "0",
                        "_public": false

                    },
                    {
                        "difficulty": 3,
                        "id": "2",
                        "tags": [],
                        "time": 2,
                        "topics": [],
                        "userID": "0",
                        "_public": false
                    },
                    {
                        "difficulty": 3,
                        "id": "3",
                        "tags": [],
                        "time": 3,
                        "topics": [],
                        "userID": "0",
                        "_public": false
                    }
                ]
            );
        });
    });

    describe('ExerciseClient.getSentence()',function () {
        it('should get a sentence in database', async function() {
            expect(await test.getSentence("0")).to.be.equals("This is an example");
        });
    });
/*  //TODO: needs Hunpos
    describe('ExerciseClient.evaluate()',function () {
        it('should throw an error', async function() {
            let error = new Error("");
            try {
                await test.evaluate([],"0",[],
                    "This is an example",2,"0");
            } catch (e) {
                error = e;
            }
            expect(error.message).to.be.equal("ID non trovato");
        });

        it('should throw an error', async function() {
            expect((await test.evaluate([],"0",[],
                "This is an example",2)))
                .to.not.be.equal(-1);
        });
    });
*/
    describe('ExerciseClient.getExerciseData()',function () {
        it('should return an exercise in JSON format', async function () {
            expect(await test.getExerciseData("0")).to.be.eql(
                {
                    sentence : "This is an example",
                    authorId : "0",
                    key : "-1",
                    solutions : []
                }
            );
        });
    });
    
    describe('ExerciseClient.getStudentAverage()',function () {
        it('should return an array of exercise done by a student', async function () {
            //@ts-ignore
            test.dbExerciseManager.read = (id : string) => {
                let exercise = new Exercise("This is an example","0");
                exercise.addSolution("1","0",[],[],3,new Map<string,number>(),1);
                exercise.addSolution("2","0",[],[],3,new Map<string,number>(),2);
                exercise.addSolution("3","0",[],[],3,new Map<string,number>(),3);
                exercise.getSolutions()[0].addNewMark("",2);
                exercise.getSolutions()[1].addNewMark("",4);
                exercise.getSolutions()[2].addNewMark("",3);
                return exercise;
            };

            let map = new Map<number,number>();
            map.set(1,2);
            map.set(2,3);
            map.set(3,3);
            expect(await test.getStudentAverage("0")).to.be.eql(map);
        });
    });

});