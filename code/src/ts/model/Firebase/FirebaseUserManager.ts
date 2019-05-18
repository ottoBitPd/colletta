import {FirebaseManager} from "./FirebaseManager";
import {Data} from "../Data/Data";
import {User} from "../Data/User";
import {Student} from "../Data/Student";
import {Teacher} from "../Data/Teacher";

/**
 *   Class to manage users into the database
 *   @extends FirebaseManager
 */
class FirebaseUserManager extends FirebaseManager {
    constructor() {
        super();
        FirebaseManager.registerInstance("FirebaseUserManager", this);
    }

    /**
     *   This method adds a new user into the database
     *   @param obj - the object to insert
     *   @returns { boolean } returns "true" if the operation is successful
     */
    public async insert(obj: Data): Promise<boolean> {
        const user = <User>obj;
        const exist : string = await this.search(user.getUsername());
        return new Promise(async function (resolve) {
            if (exist==="false") {
                if (user.isTeacher()===true) {
                    const teacher= <Teacher>obj;
                    FirebaseManager.database.ref('data/users').push({name: teacher.getName(),
                        password: teacher.getPassword(), lastname: teacher.getLastName(), username: teacher.getUsername(),
                        city: teacher.getCity(), school: teacher.getSchool(), INPScode: teacher.getINPS(),
                        email: teacher.getEmail()
                    });
                }
                else if (user.isStudent()===true){
                    const student= <Student>obj;
                    FirebaseManager.database.ref('data/users').push({
                        //let student= <Student>obj;
                        name: student.getName(), password: student.getPassword(), lastname: student.getLastName(),
                        username: student.getUsername(), city: student.getCity(), school: student.getSchool(),
                        email: student.getEmail()
                    });
                }
                return resolve(true);
            }
            else {
                return resolve(false);
            }
        });
    }

    /**
     *   This method looks for users into the database
     *   @param username - the id of the user to search
     *   @returns (string) - the user's username if exists
     */
    public async search(username : string) : Promise<string>{

        return new Promise(function (resolve) {
            FirebaseManager.database.ref('data/users/').orderByChild('username')
                .once("value", function (snapshot: any) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data: any) {

                            if (data.val().username.toLowerCase() === username.toLowerCase()) {
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
     * This method looks for all the users into the database
     * @returns {Map<string, string>} a map key-username of all the users
     */
    public async elements () : Promise<Map<string, string>> {
        let container = new Map<string, string>();
        return new Promise(function (resolve) {
            FirebaseManager.database.ref('data/users')
                .once("value", function (snapshot: any) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data: any) {
                            container.set(data.key, data.val().username);
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
     *   This method reads user informations from the database
     *   @param id - the id of the user to read
     */
    public async read(id: string): Promise<User> {
        const ProData: Promise <User> = this.getUserById(id);
        const read = await ProData;
        return read;
    }

    /**
     *   This method returns an user from the database
     *   @param id - the id of the user to return
     *   @returns { User } the User object
     */
    private async getUserById(id : string) : Promise<User> {
        return new Promise<User>(function (resolve) {
            FirebaseManager.database.ref("data/users/" + id)
                .once('value', function (snapshot : any) {
                    if (snapshot.exists()) {
                        let readData: any = snapshot.val();
                        let user;
                        if (readData.INPScode) {
                             user = new Teacher(id,readData.username, readData.password, readData.name,
                                readData.lastname, readData.city, readData.school, readData.INPScode, readData.email);
                        }
                        else {
                             user = new Student(id,readData.username, readData.password, readData.name,
                                readData.lastname, readData.city, readData.school, readData.email, readData.classId);
                        }
                        resolve(user);
                    }
                    return resolve(undefined);
                });
        });
    }

    /**
     *   This method removes an user from the database
     *   @param id - the id of the user to remove
     *   @returns { boolean } returns "true" if the operation is successful
     */
    public async remove(id: string): Promise<boolean> {
        const ProData: Promise<boolean> = this.removeFromId(id);
        const removed = await ProData;
        return removed;
    }

    /**
     *   This method removes an user from the database
     *   @param id - the id of the user to remove
     *   @returns { boolean } returns "true" if the operation is successful
     */
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

    /**
     *   This method modifies user informations into the database
     *   @param path - the path of the user to modify
     *   @param value - the new value
     */
    public async update (path:string, value: any) {
        let splittedPath =path.split("/");
        let position : number = splittedPath.length-1;
        let field : string = splittedPath[position];
        switch (field) {
            case "password": await this.updateField(path, value); break;
            case "name": await this.updateField(path, value); break;
            case "lastname":await this.updateField(path, value); break;
            case "city": await this.updateField(path, value); break;
            case "school": await this.updateField(path, value); break;
            case "username": await this.updateField(path, value); break;
            case "INPScode": await this.updateField(path, value); break;
            case "email": await this.updateField(path, value); break;
            default : console.log("field doesn't exists"); return;
        }
    }

    /**
     *   This method modifies user informations into the database
     *   @param path - the path of the user to modify
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
    /*
    TODO:
    public async readDeveloper() : Promise<string> {
        const ref = FirebaseManager.database.ref("data/developer");
        return new Promise<string>(function (resolve) {
            ref.once('value', function (snapshot: any) {
                if (snapshot.exists()) {
                    let readedData = snapshot.val();
                    return resolve(readedData);
                }
            })
        })
    }
    */
}

export {FirebaseUserManager}