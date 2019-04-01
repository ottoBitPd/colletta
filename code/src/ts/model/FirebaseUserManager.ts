import {FirebaseManager} from "./FirebaseManager";
import {Data} from "./Data";
import {User} from "./User";

class FirebaseUserManager extends FirebaseManager {
    constructor() {
        super();
        FirebaseManager.registerInstance("FirebaseUserManager", this);
    }

    // @ts-ignore
    async insert(obj: Data): string {
        let user = <User>obj;
        let exist  = await this.search(user.getUsername());
        if (exist==="false") {
            FirebaseManager.database.ref('data/users/').push({name: user.getName(),
                password: user.getPassword(), lastname: user.getLastName(), username: user.getUsername(),
                city: user.getCity(), school: user.getSchool()});

            return user.getID();
        }
        else {
            return (exist);
        }
    }


    public async read(id: string): Promise<Data> {
        const ProData: Promise <User> = this.getUserById(id);
        const read = await ProData;
        return read;
    }

    private async getUserById(id : string) : Promise<User> {
        return new Promise<User>(function (resolve) {
            FirebaseManager.database.ref("data/users/" + id)
                .once('value', function (snapshot : any) {
                    if (snapshot.exists()) {
                        // @ts-ignore
                        let readData: any = snapshot.val()

                        //----TODO: CONTROLLO SE USER è ALLIEVO O INSEGNANTE

                            //let user = new User(readData.username, readData.password, readData.name,
                            //readData.lastname, readData.city, readData.school);

                        //return resolve(user);

                    }

                    return resolve(undefined);
                });
        });
    }

    public async search(username : string) : Promise<string>{
        return new Promise(function (resolve) {
            FirebaseManager.database.ref('data/users/').orderByChild('username')
                .once("value", function (snapshot: any) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data: any) {
                            if (data.val().username.toLowerCase() === username.toLowerCase()) {
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


    public async remove(id: string): Promise<boolean> {
        const ProData: Promise<boolean> = this.removeFromId(id);
        const removed = await ProData;
        return removed;
    }

    private async removeFromId(id : string) {
        const ref=FirebaseManager.database.ref("data/users/" + id);
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
            case "password": await this.updateField(path, value); break;
            case "name": await this.updateField(path, value); break;
            case "lastname":await this.updateField(path, value); break;
            case "city": await this.updateField(path, value); break;
            case "school": await this.updateField(path, value); break;
            case "username": await this.updateField(path, value); break;

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
}

export {FirebaseUserManager}