import {Exercise} from '../src/ts/model/Exercise';
import {HunposManager} from '../src/ts/model/HunposManager';
import {expect} from 'chai';

import 'mocha';

describe('#getSentence()', function() {
    context('sentence passed', function() {
        var obj= new Exercise('ciao amico','utente');
        obj.setSentence("ciao amicone");
        it('should return the sentence', function() {
            expect(obj.getSentence()).to.equal("ciao amicone")
        });
        it('should return the user', function() {
            expect(obj.getAuthorId()).to.equal("utente")
        })
    })
});

//test buildInputFile

describe('#buildInputFile()', function() {
    context('input file created', function() {
        const obj= new HunposManager();
        const input = require('fs');
        input.writeFileSync('./src/ts/controller/hunpos/input.txt', "");
        obj.buildInputFile("ciao amico");
        it('should write the sentence', function() {
            const st = input.readFileSync('./src/ts/controller/hunpos/input.txt');
            const sentence = st.toString();
            expect(sentence).to.equal("ciao\namico\n");
            input.writeFileSync('./src/ts/controller/hunpos/input.txt', "ciao\namico");
        })
    })
});

//test getSolution (buildSolution intrinseco)

describe('#getSolution()', function() {
    context('output file created', function() {
        it('should write the solution word-label', function() {
            const obj1= new HunposManager();
            const input1 = require('fs');
            input1.writeFileSync('./src/ts/controller/hunpos/input.txt', "");
            obj1.buildInputFile("ciao amico");
            obj1.tag();
            const rjson = obj1.buildSolution();
            const st1 = input1.readFileSync('./src/ts/controller/hunpos/output.txt');
            const sentence1 = st1.toString();
            expect(sentence1).to.equal(rjson.sentence[0].word+"\t"+rjson.sentence[0].label+"\t\n"+rjson.sentence[1].word+"\t"+rjson.sentence[1].label+"\t\n\n");
            input1.writeFileSync('./src/ts/controller/hunpos/input.txt', "");
        })
    })
});