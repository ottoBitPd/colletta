/*

import {expect} from 'chai';
import 'mocha';
import {Student} from "../../../src/ts/model/Data/Student";
import {FirebaseUserManager} from "../../../src/ts/model/Firebase/FirebaseUserManager";
import {User} from "../../../src/ts/model/Data/User";
import {Teacher} from "../../../src/ts/model/Data/Teacher";


describe('FirebaseUserManager', function() {

    let student:User;
    let teacher:Teacher;

    let test=new FirebaseUserManager() ;

    before(function () {
        student = new Student("1", "gioperry15", "ciao", "giovanni", "Peron", "Castelfranco", "Unipd","giov.anni@gmail.com");
        teacher=new Teacher("1","Bortolone", "ciao", "Michele", "Bortone", "Scorze", "Venezia", "A110", "borto.lone@gmail.com");
    });

    describe('FirebaseUserManager.insert()', function () {
        it('should return the insert student in database', async function() {
            expect(await test.insert(student)).to.equal(true);
        });
        it('should return false beacause doesn\'t  insert student in database', async function() {
            expect(await test.insert(student)).to.equal(false);
        });
        it('should return the insert teacher in database', async function() {
            expect(await test.insert(teacher)).to.equal(true);
        });
    });

    describe('FirebaseUserManager.search()', function () {
        it('should return search student in database', async function() {
            student.setID(await test.search("gioperry15"));
            expect(student.getID()).to.be.not.equal("1");
        });
        it('should return search obj in database', async function() {
            teacher.setID(await test.search("Bortolone"));
            expect(teacher.getID()).to.be.not.equal("1");
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
            expect(await test.update("/data/users/"+student.getID()+"/city","Ibiza")).to.be.not.eql(student.getCity()) &&
            expect(await test.update("/data/users/"+student.getID()+"/password","Ciaone")).to.be.not.eql(student.getPassword()) &&
            expect(await test.update("/data/users/"+student.getID()+"/name","Alberto")).to.be.not.eql(student.getName()) &&
            expect(await test.update("/data/users/"+student.getID()+"/lastname","Zennaro")).to.be.not.eql(student.getLastName()) &&
            expect(await test.update("/data/users/"+student.getID()+"/school","Adria")).to.be.not.eql(student.getSchool()) &&
            expect(await test.update("/data/users/"+student.getID()+"/username","gioperry155")).to.be.not.eql(student.getUsername()) &&
            expect(await test.update("/data/users/"+teacher.getID()+"/INPScode","A001")).to.be.not.eql(teacher.getINPS()) &&
            expect(await test.update("/data/users/"+student.getID()+"/email","alb.zenna@gmail.com")).to.be.not.eql(student.getEmail()) &&
            expect(await test.update("/data/users/"+student.getID()+"/emailschool","albertozennaro@unipd.it")).to.be.undefined;
        });
    });

    describe('FirebaseUserManager.elements()', function () {
        it('should return elements database', async function() {
            let now=await test.elements();
            expect(now.get(student.getID())).not.to.be.undefined;

        });
    });

   describe('FirebaseUserManager.remove()', function () {
        it('should return the remove student in database', async function() {
            expect(await test.remove(student.getID())).to.equal(true);
        });
       it('should return the remove teacher in database', async function() {
           expect(await test.remove(teacher.getID())).to.equal(true);
       });
       it('should return false because student doesn\'t exist', async function() {
           expect(await test.remove(student.getID())).to.equal(false);
       });
    });

});

*/