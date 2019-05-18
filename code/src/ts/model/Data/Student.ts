import {User} from "./User";
import {Class} from "./Class";
import {Exercise} from "./Exercise";
import {Solution} from "./Solution";

/**
*   Class to create and manage "Student" objects
*   @extends User
*/
class Student extends User {
    /**
    *   Initializes all attributes needed to Student object.
    */
    constructor (id : string, username : string, password: string, name : string, lastname:string, city:string, school : string, email : string){
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
    * This method returns the valutations map of a student.
    * @param exercises - the list of all the exercises available
    * @returns { Map<number, number> } returns the valutations map.
    */
    public getAverage(exercises : Exercise[]) : Map<number,number> {
        let averageMap = new Map<number, number>();
        let solutions: Solution[] = [];

        exercises.forEach((currentValue: Exercise, index: number) => {

            solutions=solutions.concat(currentValue.getSolutions().filter((sol) => sol.getSolverId() === this.getID()));

        });
        let  sumTotal = 0; var i = 0;
        solutions.forEach((currentValue: Solution, index: number) => {
              let sumSingleSolution = 0;

            currentValue.getValutations()!.forEach((value: number,key: string) => {

                sumSingleSolution+=value;
                i++;
                });

            sumTotal+=sumSingleSolution;
            let media=sumTotal/i;

            averageMap.set(currentValue.getTime()!, media);
            });

        return averageMap;
    }
}
export {Student}