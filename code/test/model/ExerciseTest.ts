/*import {Exercise} from '../../src/ts/model/Exercise';
import {expect} from 'chai';
//import {assert} from 'chai';
import {HunposManager} from "../../src/ts/model/HunposManager";
import 'mocha';
*/ /*
describe('#getMethods', function() {
    const obj= new Exercise("sentence sentence", "user");

    context('ExerciseTest.getKey()', function() {
        it('should return the key', function() {
            expect(obj.getKey()).to.equal("-1");
        });
    });

    context('ExerciseTest.getSentence()', function() {
        it('should return the sentence', function() {
            expect(obj.getSentence()).to.equal("sentence");
        });
    });

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
        it('should return', function() {

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

context('ExerciseTest.', function() {
        it('should return', function() {
            expect(obj.()).to.equal();
        });
    });



*/
