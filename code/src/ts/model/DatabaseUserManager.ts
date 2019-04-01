import {DatabaseManager} from "./DatabaseManager";
import {Data} from "./Data";

class DatabaseUserManager implements DatabaseManager{
    constructor(){

    }
    insert(obj:Data) : string {
        return "1";
    }
    remove(id:string) : Promise<boolean> | null {
        return null;
    }
    read(id:string) : Promise<Data> | null;

    // @ts-ignore
    update(id:string) : void{

    }
}
export {DatabaseUserManager}