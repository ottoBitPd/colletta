import {DatabaseManager} from "./DatabaseManager";
import {Data} from "../Data/Data";
import {FirebaseUserManager} from "../Firebase/FirebaseUserManager";


/**
 *   Class to manage users into the database
 *   @extends DatabaseManager
 */
class DatabaseUserManager extends DatabaseManager{

    constructor(){
        super(new FirebaseUserManager());
    }

    /**
     *   This method adds a new user into the database
     *   @param obj - the object to insert
     *   @returns { boolean } returns "true" if the operation is successful
     */
    async insert(obj:Data) : Promise<boolean> {
        return await this.getDatabase().insert(obj);
    }

    /**
     *   This method removes an user from the database
     *   @param id - the id of the user to remove
     *   @returns { boolean } returns "true" if the operation is successful
     */
    async remove(id:string) : Promise<boolean> {
        return await this.getDatabase().remove(id);
    }

    /**
     *   This method reads user informations from the database
     *   @param id - the id of the user to read
     */
    async read(id:string) : Promise<Data>{
        return await this.getDatabase().read(id);
    }

    async update(path:string, value: any): Promise<void>{
        return await this.getDatabase().update(path,value);
    }

    /**
     *   This method looks for users into the database
     *   @param id - the id of the user to search
     *   @returns (string) - the user's username if exists
     */
    async search(username:string) : Promise<string>{
        return await this.getDatabase().search(username);
    }
    async elements() : Promise<Map<string, string>> {
        return await this.getDatabase().elements();
    }
    /*
    //TODO:
    async readDeveloper() : Promise<string> {
        return await this.getDatabase().readDeveloper();
    }
    */
}
export {DatabaseUserManager}
