"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
*   Class to create and manage "Class" objects
*/
class Class {
    /**
     *   Initializes all attributes needed to Class object.
     */
    constructor(id, name, description, teacherID, students, exercises, time) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.teacherId = teacherID;
        this.students = students;
        this.exercises = exercises;
        this.time = time || null;
    }
    /**
     * This method returns the Id of a class.
     * @returns { string } returns the class Id.
     */
    getId() {
        return this.id;
    }
    /**
     * This method returns the name of a class.
     * @returns { string } returns the class name.
     */
    getName() {
        return this.name;
    }
    /**
     * This method returns the description of a class.
     * @returns { string } returns the class description.
     */
    getDescription() {
        return this.description;
    }
    /**
     * This method returns the Id of the teacher who created the class.
     * @returns { string } returns the class teacher Id.
     */
    getTeacherID() {
        return this.teacherId;
    }
    /**
     * This method returns the student list of a class.
     * @returns { string[] } returns a list of students.
     */
    getStudents() {
        return this.students;
    }
    /**
     * This method returns the exercise list assigned to a class.
     * @returns { string[] } returns a list of exercises.
     */
    getExercises() {
        return this.exercises;
    }
    /**
     * This method returns the number of students signed up to a class.
     * @returns { number } returns the number of members.
     */
    getNumberOfStudents() {
        return this.students.length;
    }
    /**
     * This method returns the date of the solution.
     * @returns { number | null } returns the solution date if exists.
     */
    getTime() {
        return this.time;
    }
    /**
     * This method removes a student from the class student list.
     * @param student - the student to delete
     */
    deleteStudent(student) {
        this.students = this.students.filter(s => s !== student);
    }
    /**
     * This method removes an exercise from the class exercise list.
     * @param exerKey - the key of the exercise to delete
     */
    deleteExercise(exerKey) {
        this.exercises = this.exercises.filter(e => e !== exerKey);
    }
    /**
     * This method adds a student to the class student list.
     * @param student - the student to add
     */
    addStudent(student) {
        this.students.push(student);
    }
    /**
     * This method adds an exercise to the class exercise list.
     * @param exercise - the exercise to add
     */
    addExercise(exercise) {
        this.exercises.push(exercise);
    }
    /**
     * This method checks if a student is in the class student list.
     * @param student - the student to check
     * @returns { boolean } returns true if the student is signed up to the class.
     */
    findStudent(student) {
        for (let i = 0; i < this.students.length; i++) {
            if (this.students[i] === student)
                return true;
        }
        return false;
    }
    /**
     * This method returns a JSON file containing all the class informations
     * @return {any} the JSON file made like:
     *                  id          [the class Id]
     *                  name        [the class name]
     *                  description [the class description]
     *                  students    [the class student list]
     *                  exercises   [the class exercise list]
     *                  time        [the class creation date]
     */
    toJSON() {
        return {
            "id": this.id,
            "name": this.name,
            "description": this.description,
            "teacherID": this.teacherId,
            "students": this.students,
            "exercises": this.exercises,
            "time": this.time
        };
    }
}
exports.Class = Class;
//# sourceMappingURL=Class.js.map