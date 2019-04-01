import {DatabaseUserManager} from "./DatabaseUserManager";

class UserClient{
    private dbUserManager : DatabaseUserManager;
    constructor(){
        this.dbUserManager= new DatabaseUserManager();
    }

    getDbUserManager(): DatabaseUserManager {
        return this.dbUserManager;
    }
}
export{UserClient}