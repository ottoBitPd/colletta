import {Class} from "../../src/ts/model/Class";
import {expect} from 'chai';
import 'mocha';



describe('#getMethods', function() {
    let obj= new Class("name", "description","1234",["st1", "st2"],["es1", "es2"]);
    let student= new Class("name", "description","1234",["st1", "st2"],["es1", "es2"]);
    let exercise= new Class("name", "description","1234",["st1", "st2"],["es1", "es2"]);

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
            const array=["st2","st1"];
            array.pop();
            obj.deleteStudent("st1");
            expect(obj.getStudents()).eql(array.filter(e => e !== "st1"));

        });
    });

    context('ClassTest.deleteExercise()', function() {
        it('should return delete exercise', function() {
            const array = ["es1", "es2"];
            obj.deleteExercise("es1");
            expect(obj.getExercises()).eql(array.filter(e => e !== "es1"));

        });
    });

    context('ClassTest.addStudent()', function() {
        it('should return add Student', function() {
            const array=["st1","st2"];
            array.push("st3");
            student.addStudent("st3");
            expect(student.getStudents()).eql(array);

        });
    });

    context('ClassTest.addExercise()', function() {
        it('should return add exercise', function() {
            const array=["es1","es2"];
            array.push("es3");
            exercise.addExercise("es3");
            expect(exercise.getExercises()).eql(array);

        });
    });

    context('ClassTest.findStudent()', function() {
        it('should return find student', function() {
            expect(student.findStudent("st2")).to.equal(true);

        });
    });


});