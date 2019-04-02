import {Exercise} from '../../src/ts/model/Exercise';
import {expect} from 'chai';
import 'mocha';

describe('#getKey()', function() {
    context('key passed', function() {
        var obj= new Exercise("sentence", "user");
        it('should return the key = -1', function() {
            expect(obj.getKey()).to.equal("-1");
        });
    })
});



