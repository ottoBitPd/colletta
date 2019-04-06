import {expect} from 'chai';
import 'mocha';
import {Student} from "../../src/ts/model/Data/Student";
import {Class} from "../../src/ts/model/Data/Class";
import {Exercise} from "../../src/ts/model/Data/Exercise";



describe('#getMethods', function() {
   let obj= new Student("1","gioperry15","ciao","giovanni","Peron","Castelfranco","Unipd");
   let test= new Student("3","gioperry15","ciao","giovanni","Peron","Castelfranco","Unipd");



    context('StudentTest.getUsername()', function () {
        it('should return the username', function () {
            expect(obj.getUsername()).to.equal("gioperry15");
        });
    });

    context('StudentTest.getName()', function () {
        it('should return the username', function () {
            expect(obj.getName()).to.equal("giovanni");
        });
    });

    context('StudentTest.getLastName()', function () {
        it('should return the last name', function () {
            expect(obj.getLastName()).to.equal("Peron");
        });
    });

    context('StudentTest.getCity()', function () {
        it('should return the city', function () {
            expect(obj.getCity()).to.equal("Castelfranco");
        });
    });

    context('StudentTest.getSchool()', function () {
        it('should return the school', function () {
            expect(obj.getSchool()).to.equal("Unipd");
        });
    });

    context('StudentTest.getPassword()', function () {
        it('should return the password', function () {
            expect(obj.getPassword()).to.equal("ciao");
        });
    });

    context('StudentTest.samePassword()', function () {
        it('should return the same password', function () {
            expect(obj.samePassword("ciao")).to.equal(true);
        });
    });

    context('StudentTest.getID()', function () {
        it('should return id', function () {
            let student = new test.DatabaseUserInfo("0", "gioperry15", "giovanni", "Peron", "Castelfranco"," Unipd");
            expect(test.getID()).to.equal(student.id);
        });
    });

    context('StudentTest.setID()', function () {
        it('should return set id', function () {
            let student = new test.DatabaseUserInfo("15", "gioperry15", "giovanni", "Peron", "Castelfranco"," Unipd");
            test.setID("15");
            expect(test.getID()).to.equal(student.id);
        });
    });

    context('StudentTest.isTeacher()', function () {
        it('should return is teacher', function () {

            expect(obj.isTeacher()).to.equal(false);
        });
    });

    context('StudentTest.getClasses()', function () {
        it('should return classes of student', function () {
            const clase = new Class("name", "description","1234",["st1","st2"],["es1", "es2"]);
            let student= new Student("1","gian","gianni","Gianmarco","Pettenuzzo","Castelfranco","Unipd");

            const clase1 = new Class("carlo", "bo","1111",["st3"],["es5"]);

            expect(obj.getClasses([clase])).eql(student.getClasses([clase1]));
        });
    });

    context('StudentTest.getAverage()', function () {
        it('should return avarage', function () {
            const take= new Exercise("sentence sentence", "user");
            let student= new Student("1","gian","gianni","Gianmarco","Pettenuzzo","Castelfranco","Unipd");
            const take1= new Exercise("sentence ", "11");
            const take2= new Exercise("ewfre ", "1wed1");

            expect(obj.getAverage([take,take1])).eql(student.getAverage([take2]));
        });
    });

});