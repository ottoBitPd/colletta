import {Class} from "../../src/ts/model/Class";
import {expect} from 'chai';
import 'mocha';



describe('#getMethods', function() {
    let obj= new Class("name", "description","1234",["st1", "st2"],["es1, es2"]);

    context('ClassTest.getName()', function() {
        it('should return the name', function() {
            expect(obj.getName()).to.equal("name");
        });
    });

  context('ClassTest.getDescription()', function() {
    it('should return the description', function() {
        expect(obj.getDescription()).to.equal("description");
    });
});

    context('ClassTest.getTeacherID()', function() {
        it('should return the teacherID', function() {
            expect(obj.getTeacherID()).to.equal("1234");
        });
    });

    context('ClassTest.getStudents()', function() {
        it('should return the student', function() {
            expect(obj.getStudents().every((snap)=> (["st1","st2"].indexOf(snap)!==-1)));
        });
    });

    context('ClassTest.getExercises()', function() {
        it('should return the exercise', function() {
            expect(obj.getExercises().every((snap)=> (["es1, es2"].indexOf(snap)!==-1)));
        });
    });

    context('ClassTest.getNumberOfStudents()', function() {
        it('should return the numbers of students', function() {
            expect(obj.getNumberOfStudents()).to.equal(2);
        });
    });

    context('ClassTest.deleteStudent()', function() {
        it('should return delete students', function() {
            const array=obj.getStudents();
            obj.deleteStudent("st1");
         expect(!array.every((snap)=> (obj.getStudents().indexOf(snap)!==-1)));

        });
    });

    context('ClassTest.deleteExercise()', function() {
        it('should return delete exercise', function() {
            const array=obj.getExercises();
            obj.deleteExercise("es1");
            expect(!array.every((snap)=> (obj.getExercises().indexOf(snap)!==-1)));

        });
    });

    context('ClassTest.addStudent()', function() {
        it('should return add Student', function() {
            const array=obj.getStudents();
            obj.addStudent("st3");
            expect(array);

        });
    });

});