import {DatabaseUserManager} from "./DatabaseUserManager";
import {Data} from "./Data";
import {Teacher} from "./Teacher";
import {Student} from "./Student";

class UserClient{
    private dbUserManager : DatabaseUserManager;
    constructor(){
        this.dbUserManager= new DatabaseUserManager();
    }

    /*getDbUserManager(): DatabaseUserManager {
        return this.dbUserManager;
    }*/

    async insertStudent(username : string, password : string, name : string, surname : string, city : string, school : string) : Promise<boolean>{
        return await this.dbUserManager.insert(new Student(username, password, name, surname, city, school));
    }
    async insertTeacher(username : string, password : string, name : string, surname : string, city : string, school : string, inps:string) : Promise<boolean>{
        return await this.dbUserManager.insert(new Teacher(username, password, name, surname, city, school, inps));
    }

    async search(username : string) : Promise<string>{
        return await this.dbUserManager.search(username);
    }
    async read(id:string) : Promise<Data>{
        return await this.dbUserManager.read(id);
    }
}
export{UserClient}