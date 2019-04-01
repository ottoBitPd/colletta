import {DatabaseClassManager} from "./DatabaseClassManager";

class ClassClient{
    private dbClassManager : DatabaseClassManager;
    constructor(){
        this.dbClassManager= new DatabaseClassManager();
    }

    getDbClassManager(): DatabaseClassManager {
        return this.dbClassManager;
    }
}
export{ClassClient}