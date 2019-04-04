import {DatabaseManager} from "./DatabaseManager";
import {Data} from "./Data";
import {FirebaseExerciseManager} from "./FirebaseExerciseManager";
import {Exercise} from "./Exercise";

class DatabaseExerciseManager implements DatabaseManager{
    private firebaseExerciseManager : FirebaseExerciseManager;
    constructor(){
        this.firebaseExerciseManager= new FirebaseExerciseManager();
    }

    async insert(obj:Data) : Promise<boolean> {
        return await this.firebaseExerciseManager.insert(obj);
    }

    remove(id:string) : Promise<boolean> | null {
        return null;
    }

    async read(id:string) : Promise<Exercise> {
        return await this.firebaseExerciseManager.read(id);
    }

    async search(sentence: string){
        return await this.firebaseExerciseManager.search(sentence);
    }

    update(id:string) : void {

    }

    async elements() : Promise<Map<string, string>> {
        return await this.firebaseExerciseManager.elements();
    }
}
export {DatabaseExerciseManager}