import {Exercise} from '../src/ts/controller/Exercise';
import {expect} from 'chai';
import 'mocha';

describe('#getSentence()', function() {
    context('sentence passed', function() {
        var obj= new Exercise();
        obj.setSentence("ciao amico");
        it('should return the sentence', function() {
            expect(obj.getSentence()).to.equal("ciao amico")
        })
    })
})