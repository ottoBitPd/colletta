import {DatabaseUserManager} from "./DatabaseUserManager";
import {User} from "./User";

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
}
export{UserClient}