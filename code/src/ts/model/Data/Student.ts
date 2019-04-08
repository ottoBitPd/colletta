import {User} from "./User";
import {Class} from "./Class";
import {Exercise} from "./Exercise";
import {Solution} from "./Solution";

class Student extends User {

    constructor (id : string, username : string, password: string, name : string, lastname:string, city:string, school : string){
        super(id, username, password, name, lastname, city, school);
    }

    public getClasses(classList: Class[]): Class[] {
        let lista : Class[] =[];
        classList.forEach((_class) => {
            if (_class.getStudents().indexOf(this.getID()) !== -1){
                lista.push(_class);
            }
        });

        return lista;
    }


    public getAverage(exercises : Exercise[]) : Map<number,number> {
        let averageMap = new Map<number, number>();
        let solutions: Solution[] = [];

        exercises.forEach((currentValue: Exercise, index: number) => {

            solutions=solutions.concat(currentValue.getSolutions().filter((sol) => sol.getSolverId() === this.getID()));

        });
        let  sommaVoti = 0; var i = 0;
        solutions.forEach((currentValue: Solution, index: number) => {
              let sommUnaSoluzione = 0;

            currentValue.getValutations()!.forEach((value: number,key: string) => {

                sommUnaSoluzione+=value;
                i++;
                });

            sommaVoti+=sommUnaSoluzione;
            let media=sommaVoti/i;

            averageMap.set(currentValue.getTime()!, media);
            });

        return averageMap;
    }
}
export {Student}