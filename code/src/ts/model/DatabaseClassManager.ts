import {DatabaseManager} from "./DatabaseManager";
import {Data} from "./Data";

class DatabaseClassManager implements DatabaseManager{
    constructor(){

    }
    insert(obj:Data) : string {
        return "1";
    }
    remove(id:string) : boolean{
        return true;
    }
    read(id:string) : Data | null{
        return null;
    }
    update(id:string) : void{

    }
}
export {DatabaseClassManager}