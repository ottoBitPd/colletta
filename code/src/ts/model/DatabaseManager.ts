// import * as admin from "firebase-admin";
//
// abstract class DatabaseManager {
//     /**
//      * This method executes the connection with firebase database.
//      * @returns {admin.database.Database} reference to the database service.
//      */
//     abstract initDB() : admin.database.Database;
//
//     /**
//      * This method writes a sentence in the database.
//      * @param sentence - the sentence to write
//      * @returns {number} returns the key of the sentence written
//      */
//     abstract writeSentence(sentence : string) : number;
//
//     /**
//      * This method checks if a sentence already exists in the database.
//      * @param sentence - the sentence to check.
//      * @returns {number} the key of the sentence if sentence already exists, -1 otherwise.
//      */
//     abstract checkIfExists(sentence : string) : number;
//
//     /**
//      * This method write the sentence solution on the database.
//      * The sentence solution is composed of tags coming from hunpos and from user correction,
//      * these tags are contained in finalTags parameter.
//      * @param words - array containing the sentence words
//      * @param finalTags - array containing the sentence tags
//      * @param sentence - the sentence string
//      * @param sentenceKey - key of the sentence in the database
//      */
//     abstract writeSolution(words: string[], finalTags: string[], sentence: string, sentenceKey: number) : void;
//
//     /**
//      * This method reads a sentence from the database and returns it
//      * @param key - key of the sentence to read from the database
//      * @returns {string} the sentence read
//      */
//     abstract readSentence(key: number): string;
// }
// export {DatabaseManager};
import {Data} from "./Data";

interface DatabaseManager{
    insert(obj:Data) : string;
    remove(id:string) : Promise<boolean> | null;
    read(id:string) : Promise<Data> | null;
    update(path:string, value: any) : void;
}
export {DatabaseManager};