import {DatabaseUserManager} from "./DatabaseUserManager";
import {User} from "./User";
import {Data} from "./Data";

class UserClient{
    private dbUserManager : DatabaseUserManager;
    constructor(){
        this.dbUserManager= new DatabaseUserManager();
    }

    /*getDbUserManager(): DatabaseUserManager {
        return this.dbUserManager;
    }*/

    insert(user : User) : string{
        return this.dbUserManager.insert(user);
    }
    async search(username : string) : Promise<string>{
        return await this.dbUserManager.search(username);
    }
    async read(id:string) : Promise<Data>{
        return await this.dbUserManager.read(id);
    }
}
export{UserClient}