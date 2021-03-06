import {Solution} from "../../../src/ts/model/Data/Solution";
import {expect} from 'chai';
import 'mocha';

describe('Solution',function () {
    let solution : Solution;
    let solutionStudent : Solution;
    let solutionTeacher : Solution;
    let solution_1 : Solution;
    beforeEach(function () {
        solution = new Solution("0","s0",["a","b","c"],["t1","t2"],
            5,false,new Map<string,number>(),0);
        solutionStudent = new Solution("1","s1",["a","c","f","t"],["t1","t2"],
                undefined,false,new Map<string,number>(),10);
        solutionTeacher = new Solution("1","t0",["a","c","b","d"],["t1","t2"],
            1,false,new Map<string,number>(),40);
        solution_1 = new Solution("0","s0",["a","b","c"],["t1","t2"],
            5,false,new Map<string,number>(),24);
        solution.addNewMark("teacher1",10);
        solution.addNewMark("teacher2",5);
    });

    describe('Solution.getKey()', function () {
        it("should return the key",function () {
            expect(solution.getKey()).to.equals("0");
        })
    });

    describe('Solution.getSolverId()', function () {
        it("should return the solver's id",function () {
            expect(solution.getSolverId()).to.equals("s0");
        })
    });

    describe('Solution.getTopics()', function () {
        context('when the solution has topics', function(){
            it("should return the array of the topics",function () {
                expect(solution.getTopics()).to.eql(["t1","t2"]);
            });
        });

        let solutionNullTopics : Solution;
        beforeEach(function () {
            solutionNullTopics = new Solution("0","s0",["a","b","c"],undefined,
                5,false,new Map<string,number>(),0);
        });

        context('when the solution hasn\'t topics', function(){
            it("should return null",function () {
                expect(solutionNullTopics.getTopics()).to.be.null;
            });
        });
    });

    describe('Solution.getDifficulty()', function () {
        context('when the solution has the difficulty',function(){
            it("should return the assigned difficulty",function () {
                expect(solution.getDifficulty()).to.equals(5);
            });
        });

        let solutionNullDifficulty : Solution;
        beforeEach(function () {
            solutionNullDifficulty = new Solution("0","s0",["a","b","c"],["t1","t2"],
                undefined,false,new Map<string,number>(),0);
        });

        context('when the solution has the difficulty',function(){
            it("should return the assigned difficulty",function () {
                expect(solution.getDifficulty()).to.equals(5);
            });
        });

        context('when the solution hasn\'t the difficulty',function(){
            it("should return null",function () {
                expect(solutionNullDifficulty.getDifficulty()).to.be.null;
            });
        });
    });

    describe('Solution.getPublic()', function () {
        it("should return the public state of the solution",function () {
            expect(solution.getPublic()).to.eql(false);
        })
    });

    describe('Solution.setPublic()', function () {
        it("should return the public state of the solution changed to true",function () {
            solution.setPublic(true);
            expect(solution.getPublic()).to.eql(true);
        })
    });

    describe('Solution.getSolutionTags()', function () {
        it("should return the tags of the solution",function () {
            expect(solution.getSolutionTags()).to.eql(["a","b","c"]);
        })
    });

    describe('Solution.getValutations()', function () {
        it("should return the key",function () {
            let vals = new Map<string,number>();
            vals.set("teacher1",10);
            vals.set("teacher2",5);
            expect(solution.getValutations()).to.eql(vals);
        })
    });

    describe('Solution.addNewMark()', function () {
        it("should returns adds a new mark to solution",function () {
            let vals = new Map<string,number>();
            vals.set("teacher1",10);
            vals.set("teacher2",5);
            solutionTeacher.addNewMark("teacher10",4);
            expect(solution.getValutations()).to.eql(vals) &&
            expect(solutionTeacher.getValutations()).to.not.eql(vals);
        })
    });

    describe('Solution.JSONValutations()',function () {
        context('when the solution has some valutation', function () {
            it('should return a JSON representing the valutations', function () {
                let vals = {
                    "teacher1" : 10,
                    "teacher2" : 5
                };

                expect(solution.JSONValutations()).to.eql(vals);
            });
        });

        context('when the solution hasn\'t any valutation',function () {
            beforeEach(function () {
                solution = new Solution("0","s0",["a","b","c"],["t1","t2"],
                    5,false,new Map<string,number>(),0);
            });

            it('should return an empty JSON',function () {
                expect(solution.JSONValutations()).to.eql({});
            })
        });
    });

    describe('Solution.evaluateSolution()', function () {
        it("should returns a numeric valutation of the solution",function () {
            expect(solutionStudent.evaluateSolution(solutionTeacher.getSolutionTags())).to.equals(5) &&
            expect(solution.evaluateSolution(solutionTeacher.getSolutionTags())).to.not.equals(5) ;
        })
    });


    describe('Solution.getTime()',function () {
        context('when the time exist', function () {
           /* beforeEach(function () {
                solution_1 = new Solution("0","s0",["a","b","c"],["t1","t2"],
                    5,false,new Map<string,number>(),24);
            });*/
            it('should return the time', function () {
                expect(solution_1.getTime()).to.eql(24);
            });
        });

        context('when the time doesn\'t exist',function () {
            it('should return the time null',function () {
                expect(solution.getTime()).to.eql(null);
            })
        });
    });

    describe('Teacher.toJSON()', function () {
        it('should return a JSON representing the teacher', function () {
            let val = {
                "key" : "0",
                "solverId": "s0",
                "solutionTags" : ["a","b","c"],
                "topics" : ["t1","t2"],
                "difficulty" : 5,
                "valutations" : new Map<string,number>(),
                "time" : 24,
                "_public" : false
            };
            expect(solution_1.toJSON()).eql(val);
        });
    });


});