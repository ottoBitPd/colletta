import {expect} from 'chai';
import 'mocha';
import * as sinon from "ts-sinon";

import {Class} from "../../../src/ts/model/Data/Class";

import {FirebaseClassManager} from "../../../src/ts/model/Firebase/FirebaseClassManager";

describe('DatabaseClassManager', function() {

    const stubObj= sinon.stubObject;

    describe('DatabaseClassManager.insert()', function () {
        it('should return the insert obj in database', async function() {

            let prova= new Class("1","Benedettolone","boh","111",["st1"],["es1"]);
            let test= new FirebaseClassManager();


            const testStub= stubObj<FirebaseClassManager>(test,{insert:'true'});

            expect( await testStub.insert(prova)).to.equal('true');


        });

    });

});
