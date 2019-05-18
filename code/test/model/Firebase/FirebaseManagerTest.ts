

import {expect} from 'chai';
import 'mocha';
import {FirebaseManager} from "../../../src/ts/model/Firebase/FirebaseManager";



describe('FirebaseManager', function() {

    describe('FirebaseManager.getInstance()', function () {
        it('should return a database instance', async function() {
            try {
                await FirebaseManager.getInstance("prova");
            }catch (e) {
                expect(e.message).to.equals('Error: Database non trovato');
            }
        });

    });

});

