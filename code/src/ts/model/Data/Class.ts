import {Data} from "./Data";

/**
*   Class to create and manage "Class" objects
*/
class Class implements Data {

    private id : string;
    private name : string;
    private description : string;
    private teacherId : string;
    private time : number | null;
    private students : string[];
    private exercises : string[];

    /**
     *   Initializes all attributes needed to Class object.
     */
    constructor(id:string, name : string, description : string, teacherID : string, students : string[], exercises : string[], time? : number){
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
    public getId() :string {
        return this.id;
    }

    /**
     * This method returns the name of a class.
     * @returns { string } returns the class name.
     */
    public getName() : string {
        return this.name;
    }

    /**
     * This method returns the description of a class.
     * @returns { string } returns the class description.
     */
    public getDescription() : string {
        return this.description;
    }

    /**
     * This method returns the Id of the teacher who created the class.
     * @returns { string } returns the class teacher Id.
     */
    public getTeacherID() : string {
        return this.teacherId;
    }

    /**
     * This method returns the student list of a class.
     * @returns { string[] } returns a list of students.
     */
    public getStudents() : string[] {
        return this.students;
    }

    /**
     * This method returns the exercise list assigned to a class.
     * @returns { string[] } returns a list of exercises.
     */
    public getExercises() : string[] {
        return this.exercises;
    }

    /**
     * This method returns the number of students signed up to a class.
     * @returns { number } returns the number of members.
     */
    public getNumberOfStudents() : number {
        return this.students.length;
    }

    /**
     * This method returns the date of the solution.
     * @returns { number | null } returns the solution date if exists.
     */
    public getTime(): number | null{
        return this.time;
    }

    /**
     * This method removes a student from the class student list.
     * @param student - the student to delete
     */
    public deleteStudent(student : string) : void {
        this.students = this.students.filter(s => s !== student);
    }

    /**
     * This method removes an exercise from the class exercise list.
     * @param exerKey - the key of the exercise to delete
     */
    public deleteExercise(exerKey : string) : void {
        this.exercises = this.exercises.filter(e => e !== exerKey);
    }

    /**
     * This method adds a student to the class student list.
     * @param student - the student to add
     */
    public addStudent(student : string) : void {
        this.students.push(student);
    }

    /**
     * This method adds an exercise to the class exercise list.
     * @param exercise - the exercise to add
     */
    public addExercise(exercise : string) : void {
        this.exercises.push(exercise);
    }

    /**
     * This method checks if a student is in the class student list.
     * @param student - the student to check
     * @returns { boolean } returns true if the student is signed up to the class.
     */
    public findStudent(student : string) : boolean {
        for(let i = 0; i<this.students.length; i++){
            if(this.students[i] === student)
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
    public toJSON() : any {
        return {
            "id" : this.id,
            "name": this.name,
            "description": this.description,
            "teacherID": this.teacherId,
            "students": this.students,
            "exercises": this.exercises,
            "time": this.time
        };
    }
}
export {Class};