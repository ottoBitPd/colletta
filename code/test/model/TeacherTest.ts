import {expect} from 'chai';
import 'mocha';
import {Teacher} from "../../src/ts/model/Teacher";
import {Class} from "../../src/ts/model/Class";
import {User} from "../../src/ts/model/User";




describe('#getMethods', function() {

    let learn = new Teacher("Bortolone", "ciao", "Michele", "Bortone", "Scorze", "Venezia", "A110");

    context('StudentTest.getUsername()', function () {
        it('should return the username', function () {
            expect(learn.getUsername()).to.equal("Bortolone");
        });
    });

    context('StudentTest.getName()', function () {
        it('should return the username', function () {
            expect(learn.getName()).to.equal("Michele");
        });
    });

    context('StudentTest.getLastName()', function () {
        it('should return the last name', function () {
            expect(learn.getLastName()).to.equal("Bortone");
        });
    });

    context('StudentTest.getCity()', function () {
        it('should return the city', function () {
            expect(learn.getCity()).to.equal("Scorze");
        });
    });

    context('StudentTest.getSchool()', function () {
        it('should return the school', function () {
            expect(learn.getSchool()).to.equal("Venezia");
        });
    });

    context('StudentTest.getPassword()', function () {
        it('should return the password', function () {
            expect(learn.getPassword()).to.equal("ciao");
        });
    });

    context('StudentTest.getINPS()', function () {
        it('should return the code inps', function () {
            expect(learn.getINPS()).to.equal("A110");
        });
    });

    context('StudentTest.isTeacher()', function () {
        it('should return is teacher', function () {

            expect(learn.isTeacher()).to.equal(true);
        });
    });

  /*  context('StudentTest.getClasses()', function () {
        it('should return classes', function () {

            var teacher1=new Teacher("Bortolone", "ciao", "Michele", "Bortone", "Scorze", "Venezia", "A110");
           // var teache2=new Teacher("Bortolone", "ciao", "gianni", "Bortone", "Scorze", "Venezia", "A111");
            let uno= new Class("name", "description","A110",["st1", "st2"],["es1", "es2"]);
           //let due= new Class("name", "description","A110",["st1", "st2"],["es1", "es2"]);

            let prova= new teacher1.DatabaseUserInfo("A110","ciao","gianni","Bortone","Scorze","Venezia");

            console.log(prova.id);

            expect(teacher1.getClasses([uno]));
        });
    });*/


});
