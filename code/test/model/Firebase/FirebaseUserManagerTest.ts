import {expect} from 'chai';
import 'mocha';
import {Student} from "../../../src/ts/model/Data/Student";
import {FirebaseUserManager} from "../../../src/ts/model/Firebase/FirebaseUserManager";
import {User} from "../../../src/ts/model/Data/User";


describe('FirebaseUserManager', function() {

    let student:User;

    let test=new FirebaseUserManager() ;

    before(function () {
        student = new Student("1", "gioperry15", "ciao", "giovanni", "Peron", "Castelfranco", "Unipd","giov.anni@gmail.com");
    });

    describe('FirebaseUserManager.insert()', function () {
        it('should return the insert user in database', async function() {

            expect(await test.insert(student)).to.equal(true);

        });
    });

    describe('FirebaseUserManager.search()', function () {
        it('should return search obj in database', async function() {
            student.setID(await test.search("gioperry15"));
            console.log(student.getID());
            expect(student.getID()).to.be.not.equal("1");

        });
    });

    describe('FirebaseUserManager.read()', function () {
        it('should return read obj in database', async function() {
            console.log(student);

            const data = await test.read(student.getID());

                expect(data.getID()).to.equals(student.getID()) &&
                expect(data.getCity()).to.equals(student.getCity()) &&
                expect(data.getUsername()).to.equals(student.getUsername()) &&
                expect(data.getEmail()).to.equals(student.getEmail()) &&
                expect(data.getSchool()).to.equals(student.getSchool()) &&
                expect(data.getPassword()).to.equals(student.getPassword()) &&
                expect(data.getLastName()).to.equals(student.getLastName());

        });
    });

    describe('FirebaseUserManager.update()', function () {
        it('should return update database', async function() {
            expect(await test.update("/data/users/"+student.getID()+"/city","Ibiza")).to.be.not.eql(student.getCity());
        });
    });

    describe('FirebaseUserManager.elements()', function () {
        it('should return elements database', async function() {
            let now=await test.elements();
            expect(now.get(student.getID())).not.to.be.undefined;

        });
    });

   describe('FirebaseUserManager.remove()', function () {
        it('should return the remove obj in database', async function() {
            expect(await test.remove(student.getID())).to.equal(true);

        });
    });

});