import {DatabaseManager} from "./DatabaseManager";
import {Data} from "../Data/Data";
import {FirebaseClassManager} from "../Firebase/FirebaseClassManager";

/**
*   Class to manage classes into the database
 *   @extends DatabaseManager
*/
class DatabaseClassManager extends DatabaseManager{

    constructor(){
        super(new FirebaseClassManager());
    }

    /**
    *   This method adds a new class into the database
    *   @param obj - the object to insert
    *   @returns { boolean } returns "true" if the operation is successful
    */
    async insert(obj:Data) : Promise<boolean> {
        return await this.getDatabase().insert(obj);
    }

    /**
    *   This method removes a class from the database
    *   @param id - the id of the class to remove
    *   @returns { boolean } returns "true" if the operation is successful
    */
    async remove(id:string) : Promise<boolean> {
        return await this.getDatabase().remove(id);
    }

    /**
    *   This method reads class informations from the database
    *   @param id - the id of the class to read
    *   @returns { Data } returns the class object
    */
    async read(id:string) : Promise<Data> {
        return await this.getDatabase().read(id);
    }

    /**
    *   This method looks for classes into the database
    *   @param id - the id of the class to search
    *   @returns (string) - returns the class key if exists
    */
    async search(id:string) : Promise<string> {
        return await this.getDatabase().search(id);
    }

    /**
    *   This method modifies class informations into the database
    *   @param path - the path of the class to modify
    *   @param value - the new value
    */
    async update(path:string, value: any): Promise<void> {
        return await this.getDatabase().update(path,value);
    }
    async elements() : Promise<Map<string, string>> {
        return await this.getDatabase().elements();
    }
}
export {DatabaseClassManager}
