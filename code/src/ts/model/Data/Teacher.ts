import {User} from "./User";
import {Class} from "./Class";

/**
 *   Class to create and manage "Teacher" objects
 *   @extends User
 */
class Teacher extends User {

    private INPS : string;

    constructor (id:string, username : string, password: string, name : string, lastname:string, city:string, school : string, inps : string, email : string){
        super(id,username, password, name, lastname, city, school, email);
        this.INPS = inps;
    }

    /**
     * This method returns the iist of classes created by a specific teacher.
     * @param classList - the list of all the available classes
     * @returns { Class[]} returns the list of classes.
     */
    public getClasses(classList: Class[]): Class[] {
        let lista : Class[] =[];
        classList.forEach((_class) => {
            if (_class.getTeacherID() === this.getID())
                lista.push(_class);
        });

        return lista;
    }

    /**
     * This method returns the teacher INPS code.
     * @returns { string } returns the INPS code.
     */
    public getINPS() : string {
            return this.INPS;
    }

    /**
     * This method  checks if a user is a teacher.
     * @returns { boolean } returns "true" if the user is a teacher.
     */
    public isTeacher(): boolean {
        return true;
    }
}
export {Teacher}