import {DatabaseManager} from "./DatabaseManager";
import {Data} from "./Data";
import {FirebaseUserManager} from "./FirebaseUserManager";

class DatabaseUserManager implements DatabaseManager{
    private firebaseUserManager : FirebaseUserManager;
    constructor(){
        this.firebaseUserManager = new FirebaseUserManager();
    }
    insert(obj:Data) : string {
        return this.firebaseUserManager.insert(obj);
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