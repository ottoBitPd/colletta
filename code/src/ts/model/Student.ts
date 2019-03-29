import {User} from "./User";
import {Class} from "./Class";
import {Exercise} from "./Exercise";

class Student extends User {

    constructor (username : string){
        super(username);
    }

    public getClasses(classList: Class[]): Class[] {
        let lista : Class[] =[];
        classList.forEach((_class) => {
            if (_class.getStudents().find(this.getID()) !== null){
                lista.push(_class);
            }
        });

        return lista;
    }


    public getAverage(exercises : Exercise[]) : Map<number,number> {
        let media : Map<number,number>;

        return media;
    }
}