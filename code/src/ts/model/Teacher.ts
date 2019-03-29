import {User} from "./User";
import {Class} from "./Class";
import {Exercise} from "./Exercise";

class Teacher extends User {

    private INPS : number;

    constructor (username : string, inps : number){
        super(username);
        this.INPS = inps;
    }

    public getClasses(classList: Class[]): Class[] {
        let lista : Class[] =[];
        classList.forEach((_class) => {
            if (_class.getTeacherID() == this.getID())
                lista.push(_class);
        });

        return lista;
    }
}