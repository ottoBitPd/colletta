import {User} from "./User";
import {Class} from "./Class";
/*import {Exercise} from "./Exercise";
import {Solution} from "./Solution";*/

/**
 *   Class to create and manage "Student" objects
 *   @extends User
 */
class Student extends User {
    /**
     *   Initializes all attributes needed to Student object.
     */
    constructor (id : string, username : string, password: string, name : string, lastname:string, city:string, school : string, email : string, classId? :string){
        super(id, username, password, name, lastname, city, school, email);
    }


    /**
     * This method returns the iist of classes in which the student is signed up.
     * @param classList - the list of all the available classes
     * @returns { Class[]} returns the list of classes.
     */
    public getClasses(classList: Class[]): Class[] {
        let list : Class[] =[];
        classList.forEach((_class) => {
            if (_class.getStudents().indexOf(this.getID()) !== -1){
                list.push(_class);
            }
        });

        return list;
    }


    /**
     * This method checks if a user is a student.
     * @returns { boolean } returns "true" if the user is a student.
     */
    public isStudent(): boolean {
        return true;
    }

}
export {Student}