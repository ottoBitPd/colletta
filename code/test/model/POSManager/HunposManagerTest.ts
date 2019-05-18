/*import {HunposManager} from "../../../src/ts/model/POSManager/HunposManager";
import * as fileSystem from 'fs';
import * as chai from 'chai';
import 'mocha';


describe('HunposManager', function () {

    let hunposManager : HunposManager;
    beforeEach(function () {
        hunposManager = new HunposManager();
    });

    describe('HunposManager.setModel()', function () {
        it('should set the model', function () {
            hunposManager.setModel("src/ts/presenter/hunpos/other_model");
            chai.expect(hunposManager).have.property("modelFilePath","src/ts/presenter/hunpos/other_model");
        });
    });
/*
    describe('HunposManager.getSolution()', function () {
        it('should return the solution after postagging', async function () {
            let solution = await hunposManager.getSolution("ciao a tutti");

            chai.expect(solution.sentence[0].word).to.be.equals("ciao") &&
            chai.expect(solution.sentence[1].word).to.be.equals("a") &&
            chai.expect(solution.sentence[2].word).to.be.equals("tutti");
        });
    });


    // Integrazione?
    describe('HunposManager.train()', function () {
        it('should train the ML software', function () {
            let file = fileSystem.readFileSync("src/ts/presenter/hunpos/italian_model");
            hunposManager.train();
            chai.expect(file).to.be.eql(fileSystem.readFileSync("src/ts/presenter/hunpos/italian_model"));
        });
    });

    describe('HunposManager.tag()', function () {
        it('should return the sentence with relative tags', async function () {
            let result = await hunposManager.tag("this\nis\nan\nexample\n\n");
            chai.expect(result).to.match(/^this\t\w{1,5}\t\nis\t\w{1,5}\t\nan\t\w{1,5}\t\nexample\t\w{1,5}\t\n\n$/);
        });
    });
});
*/