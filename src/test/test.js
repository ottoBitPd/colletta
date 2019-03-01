
var Exercise = require('../js/controller/Exercise.js');
var expect = require('chai').expect;

describe('#getSentence()', function() {


    context('sentence passed', function() {
        var obj= new Exercise();
        obj.setSentence("ciao amico");
        it('should return the sentence', function() {
            expect(obj.getSentence()).to.equal("ciao amico")
        })
    })
})



var obj = new Excercise();