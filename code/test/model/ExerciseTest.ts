import {Exercise} from '../../src/ts/model/Exercise';
import {expect} from 'chai';
//import {assert} from 'chai';
//import {HunposManager} from "../../src/ts/model/HunposManager";
import 'mocha';
import {FirebaseExerciseManager} from "../../src/ts/model/FirebaseExerciseManager";

describe('getKey()', function () {
    context("default key", function () {
        it('should return the key\'s default value', function() {
            const obj=new Exercise("sentence", "authorIdValue");
            expect(obj.getKey()).to.equal("-1");
        });
    });

    context("set a new key\'s value", function () {
        it('should return the key\'s set value', function() {
            const obj=new Exercise("sentence", "authorIdValue");
            obj.setKey("key");
            expect(obj.getKey()).to.equal("key");
        });
    });

    context("read a database's exercise's key", function () {
       it("should return the database's key" , async function () {
           let objDb=new FirebaseExerciseManager();
           let objKey= await objDb.search("sentence");
           let obj=await objDb.read(objKey);
           expect(obj.getKey()).to.equal(objKey);
       })
    })
});

describe('getSentence()', function () {
    context("input sentence", function () {
        it('should return the sentence', function() {
            const obj=new Exercise("sentence", "authorIdValue");
            expect(obj.getSentence()).to.equal("sentence");
        });
    });

    context("read a database's exercise's sentence", function () {
        it("should return the database's sentence" , async function () {
            let objDb=new FirebaseExerciseManager();
            let objKey= await objDb.search("sentence");
            let obj=await objDb.read(objKey);
            expect(obj.getSentence()).to.equal("sentence");
        })
    })
});

describe('getAuthorId()', function () {
    context('input AuthorID', function() {
        it('should return the authorID', function() {
            const obj=new Exercise("sentence", "authorIdValue");
            expect(obj.getAuthorId()).to.equal("authorIdValue");
        });
    });

    context("read a database's exercise's authorIdValue", function () {
        it("should return the database's sentence" , async function () {
            let objDb=new FirebaseExerciseManager();
            let objKey= await objDb.search("sentence");
            let obj=await objDb.read(objKey);
            expect(obj.getAuthorId()).to.equal("authorIdValue");
        })
    })

});


/*
describe('#getMethods', function() {
    const obj= new Exercise("sentence", "user");


    context('ExerciseTest.getAuthorID()', function() {
        it('should return the authorID', function() {
            expect(obj.getAuthorId()).to.equal("user");
        });
    });

    context('ExerciseTest.getPOSManager()', function() {
        it('should not return a new POS Manager', function() {
            let hunpos = new HunposManager();
            expect(obj.getPOSManager()).not.equal(hunpos);
        });
    });

    context('ExerciseTest.getSolutions()', function() {
        it('should return a empty Solution array', function() {
            expect(obj.getSolutions().length).to.equal(0);
        });
    });

    context('ExerciseTest.getNewSolution', function() {
        it('should return null', function() {
            expect(obj.getNewSolution()).to.equal(null);
        });
    });

    context('ExerciseTest.getSentenceSplitted', function() {
        it('should return an array with the split sentence', function() {

            expect(obj.getSenteceSplitted()).eql(obj.getSentence().split(" "));
            //expect(obj.getSenteceSplitted().every((snap)=>(obj.getSentence().split(" ")).indexOf(snap)!==-1));
        });
    });
});

describe('#setMethods', function() {
    let obj= new Exercise("sentence", "user");

    context('ExerciseTest.setSentence()', function() {
        it('should return a new sentence', function() {
            obj.setSentence("newSentence");
            expect(obj.getSentence()).to.equal("newSentence");
        });
    });

    context('ExerciseTest.setKey()', function() {
        it('should return a new key', function() {
            obj.setKey("-2");
            expect(obj.getKey()).to.equal("-2");
        });
    });

    context('ExerciseTest.setSolution()', function() {
        it('should return a no-null solution', function() {
            expect(obj.setSolution("solverId", ["tag"], ["topic"], 2)).not.equal(null);
        });
    });
});

describe("#propertyClassMethods", function () {
    const obj= new Exercise("sentence sentence", "user");
    context('ExerciseTest.autosolve()', function() {
        it('should return a no-null solution', function() {
            expect(obj.autosolve()).not.equal(null);
        });
    });

    context('ExerciseTest.evaluate()', function() {
        it('should return', function() {
            expect(obj.evaluate("teacherId")).not.equal(null);
        });
    });
});
*/
/*
context('ExerciseTest.', function() {
        it('should return', function() {
            expect(obj.()).to.equal();
        });
    });
*/