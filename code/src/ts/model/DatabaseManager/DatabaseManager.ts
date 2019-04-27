import {Data} from "../Data/Data";

import {FirebaseManager} from "../Firebase/FirebaseManager";

/**
 *   Class to manage the database.
 *   @abstract
 */
abstract class DatabaseManager{
    private firebaseManager : FirebaseManager;

    constructor(fm :FirebaseManager){
        this.firebaseManager=fm;
    }

    /**
     * This method returns a database reference.
     */
    protected getDatabase(){
        return this.firebaseManager;
    }

    /**
     *   This method adds a new object into the database
     *   @param obj - the object to insert
     *   @returns { boolean } returns "true" if the operation is successful
     */
    public abstract insert(obj:Data) : Promise<boolean>;

    /**
     *   This method removes an object from the database
     *   @param id - the id of the object to remove
     *   @returns { boolean } returns "true" if the operation is successful
     */
    public abstract remove(id:string) : Promise<boolean> | null;

    /**
     *   This method reads objects informations from the database
     *   @param id - the id of the object to read
     */
    public abstract read(id:string) : Promise<Data> | null;
    public abstract update(path:string, value: any) : void;
    public abstract elements() : Promise<Map<string, string>>;

    /**
     *   This method looks for data into the database
     *   @param id - the id of the user to search
     */
    public abstract search(dataName:string) : Promise<string>;
}
export {DatabaseManager};