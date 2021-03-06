import {FirebaseManager} from "./FirebaseManager";
import {Data} from "../Data/Data";
import {Class} from "../Data/Class";

/**
 *   Class to manage classes into the database
 *   @extends FirebaseManager
 */
class FirebaseClassManager extends FirebaseManager {
    constructor() {
        super();
        FirebaseManager.registerInstance("FirebaseClassManager", this);
    }

    /**
     *   This method adds a new class into the database
     *   @param obj - the class to insert
     *   @returns { boolean } returns "true" if the operation is successful
     */
    public async insert(obj: Data): Promise<boolean> {
        const _class = <Class>obj;
        const exists : string = await this.search(_class.getName());
        return new Promise(async function (resolve) {
            if (exists === "false") {
                FirebaseManager.database.ref('data/classes').push({
                    name: _class.getName(),
                    description: _class.getDescription(),
                    students: _class.getStudents(),
                    teacherID: _class.getTeacherID(),
                    exercises: _class.getExercises(),
                    time: Date.now()
                });
                return resolve(true);
            } 
            else {
                return resolve(false);
            }
        });
    }

    /**
     *   This method looks for classes into the database
     *   @param name - the name of the class to search
     *   @returns (string) - returns the class key if exists
     */
    public async search(name:string): Promise<string> {
        return new Promise(function (resolve) {
            FirebaseManager.database.ref('data/classes/')
                .once("value", function (snapshot: any) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data: any) {
                            if (data.val().name.toLowerCase() === name.toLowerCase()) {
                                return resolve(data.key);
                            }
                        });
                        return resolve("false");
                    }
                    return resolve("false");
                });
        });
    }

    /**
     * This method looks for all the classes into the database
     * @returns {Map<string, string>} a map class key-teacher id containing all the classes saved into the database
     */
    public async elements () : Promise<Map<string, string>> {
        let container = new Map<string, string>();
        return new Promise(function (resolve) {
            FirebaseManager.database.ref('data/classes')
                .once("value", function (snapshot: any) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data: any) {
                            container.set(data.key, data.val().teacherID);
                        });
                        return resolve(container);
                    }
                    else {
                        return resolve(container);
                    }
                });
        });
    }

    /**
     *   This method reads class informations from the database
     *   @param id - the id of the class to read
     *   @returns { Data } returns the class object
     */
    public async read(id: string): Promise<Data> {
        const ProData: Promise <Class> = this.getClassById(id);
        const readed = await ProData;
        return readed;
    }

    /**
     *   This method returns an class from the database
     *   @param id - the id of the class to return
     *   @returns { Class } the Class object
     */
    private async getClassById(id : string) : Promise<Class> {
        return new Promise<Class>(function (resolve) {
            FirebaseManager.database.ref("data/classes/" + id)
                .once('value', function (snapshot : any) {
                    if (snapshot.exists()) {
                        const readData: any = snapshot.val();
                        const _class = new Class(id,readData.name, readData.description, readData.teacherID,
                            readData.students, readData.exercises, readData.time);
                        return resolve(_class);
                    }
                    else {
                        return resolve(undefined);
                    }
                });
        });
    }

    /**
     *   This method removes a class from the database
     *   @param id - the id of the class to remove
     *   @returns { boolean } returns "true" if the operation is successful
     */
    public async remove(id: string): Promise<boolean> {
        const ProData: Promise<boolean> = this.removeFromId(id);
        const removed = await ProData;
        return removed;
    }

    /**
     *   This method removes a class from the database
     *   @param id - the id of the class to remove
     *   @returns { boolean } returns "true" if the operation is successful
     */
    private async removeFromId(id : string) {
        const ref=FirebaseManager.database.ref("data/classes/" + id);
        return new Promise<boolean>(function (resolve) {
            ref.once('value',  function (snapshot: any) {
                if (snapshot.exists()) {
                    ref.remove();
                    // @ts-ignore
                    return resolve(true);
                }
                return resolve(false);
            });
        });
    }

    /**
     *   This method modifies class informations into the database
     *   @param path - the path of the class to modify
     *   @param value - the new value
     */
    public async update (path:string, value: any) {
        const splittedPath =path.split("/");
        const position : number = splittedPath.length -1;
        const field : string=splittedPath[position];
        switch (field) {
            case "exercises": await this.updateField(path, value); break;
            case "students": await this.updateField(path, value); break;
            default : console.log("field doesn't exists"); return;
        }
        await this.updateTime(path);
    }
    /**
     *   This method sets the exercise time at now
     *   @param path - the path of the exercise to modify
     */
    private async updateTime(path: string)  {
        // @ts-ignore
        let ref=FirebaseManager.database.ref(path).parent.child("time");
        ref.once('value',function (snapshot:any) {
            if (snapshot.exists()) {
                ref.set(Date.now());
            }
        });
    }

    /**
     *   This method modifies class informations into the database
     *   @param path - the path of the class to modify
     *   @param value - the new value
     */
    private async updateField(path : string, value:any) {
        const ref=FirebaseManager.database.ref(path);
        ref.once('value',function (snapshot:any) {
            if (snapshot.exists()) {
                ref.set(value);
            }
        });
    }

}

export{FirebaseClassManager};
