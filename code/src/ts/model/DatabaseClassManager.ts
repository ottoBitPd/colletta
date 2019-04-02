import {DatabaseManager} from "./DatabaseManager";
import {Data} from "./Data";
import {FirebaseClassManager} from "./FirebaseClassManager";
import {Class} from "./Class";

class DatabaseClassManager implements DatabaseManager{
    private firebaseClassManager : FirebaseClassManager;
    constructor(){
        this.firebaseClassManager = new FirebaseClassManager();
    }
    insert(obj:Data) : Promise<boolean> {
        return this.firebaseClassManager.insert(obj);
    }
    async remove(id:string) : Promise<boolean> {
        return await this.firebaseClassManager.remove(id);
    }

    async read(id:string) : Promise<Class> {
        return await this.firebaseClassManager.read(id);
    }

    async update(path:string, value: any){//non so se sia giusto tutto perchè async ma in teoria void non so se ritorna qualcosa
        return await this.firebaseClassManager.update(path,value);
    }
}
export {DatabaseClassManager}
