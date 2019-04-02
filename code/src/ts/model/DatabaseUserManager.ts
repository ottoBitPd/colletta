import {DatabaseManager} from "./DatabaseManager";
import {Data} from "./Data";
import {FirebaseUserManager} from "./FirebaseUserManager";
import {User} from "./User";

class DatabaseUserManager implements DatabaseManager{
    private firebaseUserManager : FirebaseUserManager;
    constructor(){
        this.firebaseUserManager = new FirebaseUserManager();
    }
    insert(obj:Data) : string {
        return this.firebaseUserManager.insert(obj);
    }
    async remove(id:string) : Promise<boolean> {
        return await this.firebaseUserManager.remove(id);
    }
    async read(id:string) : Promise<User>{//non dovrebbe tornare Promise<User> tornava Data?
        return await this.firebaseUserManager.read(id);
    }

    async update(path:string, value: any){//non so se sia giusto tutto perchè async ma in teoria void non so se ritorna qualcosa
        return await this.firebaseUserManager.update(path,value);
    }
    async search(username:string) : Promise<string>{
        return await this.firebaseUserManager.search(username);
    }
}
export {DatabaseUserManager}