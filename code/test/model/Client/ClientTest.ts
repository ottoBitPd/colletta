import {Client} from "../../../src/ts/model/Client/Client";
import {expect} from 'chai';
import 'mocha';
import {UserClient} from "../../../src/ts/model/Client/UserClient";
import {ClassClient} from "../../../src/ts/model/Client/ClassClient";
import {ExerciseClient} from "../../../src/ts/model/Client/ExerciseClient";

describe('Client.ClientBuilder',function () {
    let builder = new Client.builder();
    beforeEach(function () {
        builder = new Client.builder();
    });

    describe('Client.ClientBuilder.buildClassClient()',function () {
        let builder = new Client.builder();
        it('should return itself with a ClassClient',function () {
            let b = builder.buildClassClient();
            expect(b).to.haveOwnProperty("dbClassManager").not.undefined &&
            expect(b).to.be.equal(builder);
       });
    });

    describe('Client.ClientBuilder.buildUserClient()',function () {
        it('should return itself with a UserClient',function () {
            let b = builder.buildUserClient();
            expect(b).to.haveOwnProperty("dbUserManager").not.undefined &&
            expect(b).to.be.equal(builder);
        });
    });

    describe('Client.ClientBuilder.buildExerciseClient()',function () {
        it('should return itself with a ExerciseClient',function () {
            let b = builder.buildExerciseClient();
            expect(b).to.haveOwnProperty("dbExerciseManager").not.undefined &&
            expect(b).to.be.equal(builder);
        });
    });

    describe('Client.ClientBuilder.build()',function () {
        it('should return a Client', function () {
            let client = builder.build();
            expect(client).to.be.not.null && expect(client).to.be.not.undefined;
        });
    });
});

describe('Client',function () {
    let client : Client;

    context('with attributes undefined', function () {
        before(function () {
            client = (new Client.builder()).build()
        });

        describe('Client.getUserClient()', function () {
            it('should return undefined', function() {
                expect(client.getUserClient()).to.be.undefined;
            });
        });

        describe('Client.getClassClient()', function () {
            it('should return undefined', function() {
                expect(client.getClassClient()).to.be.undefined;
            });
        });

        describe('Client.getExerciseClient()', function () {
            it('should return undefined', function() {
                expect(client.getExerciseClient()).to.be.undefined;
            });
        });
    });

    context('with attributes defined', function () {
        before(function () {
            client = (new Client.builder())
                .buildClassClient()
                .buildExerciseClient()
                .buildUserClient()
                .build()
        });

        describe('Client.getUserClient()', function () {
            it('should return undefined', function () {
                expect(client.getUserClient()).to.be.instanceof(UserClient);
            });
        });

        describe('Client.getClassClient()', function () {
            it('should return undefined', function () {
                expect(client.getClassClient()).to.be.instanceof(ClassClient);
            });
        });

        describe('Client.getExerciseClient()', function () {
            it('should return an ExerciseClient', function () {
                expect(client.getExerciseClient()).to.be.instanceof(ExerciseClient);
            });
        });
    });
});