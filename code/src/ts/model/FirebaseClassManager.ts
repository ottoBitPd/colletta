import {FirebaseManager} from "./FirebaseManager";
import {Data} from "./Data";
import {Class} from "./Class";

class FirebaseClassManager extends FirebaseManager {
    constructor() {
        super();
        FirebaseManager.registerInstance("FirebaseClassManager", this);
    }

    // @ts-ignore
    async insert(obj: Data): string {
        let _class = <Class>obj;
        let exists = await this.search(_class.getTeacherID(), _class.getName());
        if (exists === "false") {
            FirebaseManager.database.ref('data/classes').push({name: _class.getName(),
                description: _class.getDescription(), students: _class.getStudents(), teacherID: _class.getTeacherID(),
                exercises: _class.getExercises()
            });
            return "true";
        }
        else {
            return ("false");
        }
    }

    public async search(teacherID: string, name:string): Promise<string> {
        return new Promise(function (resolve) {
            FirebaseManager.database.ref('data/classes/')
                .once("value", function (snapshot: any) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data: any) {
                            if ((data.val().teacherID.toLowerCase()=== teacherID.toLowerCase()) &&
                                (data.val().name.toLowerCase() === name.toLowerCase())) {
                                //console.log("esiste");
                                return resolve(data.key);
                            }
                        });
                        //console.log("non esiste");
                        return resolve("false");
                    }
                    //console.log("database vuoto");
                    return resolve("false");
                });
        });
    }

    public async read(id: string): Promise<Data> {
        const ProData: Promise <Class> = this.getClassById(id);
        const readed = await ProData;
        return readed;
    }

    private async getClassById(id : string) : Promise<Class> {
        return new Promise<Class>(function (resolve) {
            FirebaseManager.database.ref("data/classes/" + id)
                .once('value', function (snapshot : any) {
                    if (snapshot.exists()) {
                        let readData: any = snapshot.val();
                        let _class = new Class(readData.name, readData.description, readData.teacherID,
                            readData.students, readData.exercises);
                        return resolve(_class);
                    }
                    return resolve(undefined);
                });
        });
    }

    public async remove(id: string): Promise<boolean> {
        const ProData: Promise<boolean> = this.removeFromId(id);
        const removed = await ProData;
        return removed;
    }

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

    public async update (path:string, value: any) {
        let splittedPath =path.split("/");
        let position : number = splittedPath.length -1;
        let field : string=splittedPath[position];
        console.log(field);
        switch (field) {
            case "exercises": await this.updateField(path, value); break;
            case "students": await this.updateField(path, value); break;
            default : console.log("field doesn't exists"); return;
        }
    }


    private async updateField(path : string, value:any) {
        const ref=FirebaseManager.database.ref(path);
        ref.once('value',function (snapshot:any) {
            if (snapshot.exists()) {
                ref.set(value);
            }
        });
    }


    //TODO
    /*


    // @ts-ignore

    update(path:string, value: any): void {}
    */
}

export{FirebaseClassManager};