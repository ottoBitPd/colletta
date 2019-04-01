import {DatabaseManager} from "./DatabaseManager";
import {Data} from "./Data";

class DatabaseExerciseManager implements DatabaseManager{
    constructor(){

    }
    insert(obj:Data) : string {
        return "1";
    }
    remove(id:string) : Promise<boolean> | null {
        return null;
    }

    read(id:string) : Promise<Data> | null {
        return null;
    }

    update(id:string) {
        ;
    }
}
export {DatabaseExerciseManager}