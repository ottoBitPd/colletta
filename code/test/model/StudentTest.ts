import {expect} from 'chai';
import 'mocha';

import {Student} from "../../src/ts/model/Data/Student";
import {Exercise} from "../../src/ts/model/Data/Exercise";
import {Class} from "../../src/ts/model/Data/Class";

describe('Student',function() {

    let obj : Student;
    let test : Student;
    beforeEach(function() {
        obj = new Student("11", "gioperry15", "ciao", "giovanni", "Peron", "Castelfranco", "Unipd");
        test = new Student("3", "gioperry15", "ciao", "giovanni", "Peron", "Castelfranco", "Unipd");
    });

    describe('getUsername()', function () {
        it('should return the username', function () {
            expect(obj.getUsername()).to.equal("gioperry15");
        });
    });

    describe('StudentTest.getName()', function () {
        it('should return the username', function () {
            expect(obj.getName()).to.equal("giovanni");
        });
    });

    describe('StudentTest.getLastName()', function () {
        it('should return the last name', function () {
            expect(obj.getLastName()).to.equal("Peron");
        });
    });

    describe('StudentTest.getCity()', function () {
        it('should return the city', function () {
            expect(obj.getCity()).to.equal("Castelfranco");
        });
    });

    describe('StudentTest.getSchool()', function () {
        it('should return the school', function () {
            expect(obj.getSchool()).to.equal("Unipd");
        });
    });

    describe('StudentTest.getPassword()', function () {
        it('should return the password', function () {
            expect(obj.getPassword()).to.equal("ciao");
        });
    });

    describe('StudentTest.samePassword()', function () {
        it('should return the same password', function () {
            expect(obj.samePassword("ciao")).to.equal(true);
        });
    });

    describe('StudentTest.getID()', function () {
        it('should return id', function () {
            expect(test.getID()).to.equal("3");
        });
    });

    describe('StudentTest.setID()', function () {
        it('should return set id', function () {
            let student = new test.DatabaseUserInfo("15", "gioperry15", "giovanni", "Peron", "Castelfranco"," Unipd");
            test.setID("15");
            expect(test.getID()).to.equal(student.id);
        });
    });

    describe('StudentTest.isTeacher()', function () {
        it('should return is teacher', function () {

            expect(obj.isTeacher()).to.equal(false);
        });
    });

    describe('StudentTest.getClasses()', function () {
        it('should return classes of student', function () {
            const clase = new Class("name", "description","1234",["st1","st2"],["es1", "es2"]);
            let student= new Student("1","gian","gianni","Gianmarco","Pettenuzzo","Castelfranco","Unipd");

            const clase1 = new Class("carlo", "bo","1111",["st3"],["es5"]);

            expect(obj.getClasses([clase])).eql(student.getClasses([clase1]));
        });
    });

    describe('StudentTest.getAverage()', function () {
        it('should return average', function () {

            let student= new Student("1","gian","gianni","Gianmarco","Pettenuzzo","Castelfranco","Unipd");
            const take= new Exercise("Ciao", "1");

            let valutations=new Map<string,number>();
            valutations.set("1",10);

            take.addSolution("1","1",["F"],["uno"],3,valutations,1);

            student.getAverage([take]);

            //let valori=student.getAverage([take]).size;
            //console.log( student.getAverage([take]).values());
            //console.log(valori);


            expect(obj.getAverage([take]));
            //expect(obj);
        });
    });

});