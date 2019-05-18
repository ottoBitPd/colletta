import {DatabaseManager} from "./DatabaseManager";
import {Data} from "../Data/Data";
import {FirebaseExerciseManager} from "../Firebase/FirebaseExerciseManager";

/**
 *   Class to manage exercises into the database
 *   @extends DatabaseManager
 */
class DatabaseExerciseManager extends DatabaseManager{

    constructor(){
        super(new FirebaseExerciseManager());
    }

    /**
     *   This method adds a new exercise into the database
     *   @param obj - the object to insert
     *   @returns { boolean } returns "true" if the operation is successful
     */
    async insert(obj:Data) : Promise<boolean> {
        return await this.getDatabase().insert(obj);
    }

    /**
     *   This method removes an exercise from the database
     *   @param id - the id of the exercise to remove
     *   @returns { boolean } returns "true" if the operation is successful
     */
     async remove(id:string) : Promise<boolean> {
        return await this.getDatabase().remove(id);
    }

    /**
     *   This method reads exercises informations from the database
     *   @param id - the id of the exercise to read
     *   @return {Data} returns the exercise with the corr
     */
    async read(id:string) : Promise<Data> {
        return await this.getDatabase().read(id);
    }

    /**
     *   This method looks for exercises into the database
     *   @param id - the id of the exercise to search
     *   @returns (string) - returns the exercise key if exists
     */
    async search(sentence: string):  Promise<string>{
        return await this.getDatabase().search(sentence);
    }

    /**
     *   This method modifies exercises into the database
     *   @param path - the path of the exercise to modify
     *   @param value - the new value to insert
     */
    async update(path:string, value:any): Promise<void>{

        return await this.getDatabase().update(path, value);
    }

    /**
     * This method looks for all the exercises into the database
     * @returns {Map<string, string>} a map key-sentence containing all the exercises saved into the database
     */
    async elements() : Promise<Map<string, string>> {
        return await this.getDatabase().elements();
    }
}
export {DatabaseExerciseManager}
