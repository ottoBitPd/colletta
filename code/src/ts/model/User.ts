import {Data} from "./Data";
import {Class} from "./Class";

abstract class User implements Data{

    private username : string;
    public databaseInfo : any;


    constructor(username : string, password: string, name : string, lastname:string, city:string, school : string) {
        this.username= username;
        this.databaseInfo= new this.DatabaseUserInfo("0", password, name, lastname, city, school);
    }

    public DatabaseUserInfo = class {
        public id : string;
        public password : string;
        public name : string;
        public lastName : string;
        public city : string;
        public school : string;

        constructor(id : string, psw : string, name : string, lN : string, city : string, sc : string){
            this.id = id;
            this.password = psw;
            this.name = name;
            this.lastName = lN;
            this.city = city;
            this.school = sc;
        }
    };

    public getUsername() : string {
        return this.username;
    }

    public getName() : string {
        return this.databaseInfo.name;
    }

    public getLastName() : string {
        return this.databaseInfo.lastName;
    }

    public getCity() : string {
        return this.databaseInfo.city;
    }

    public getSchool() : string {
        return this.databaseInfo.school;
    }

    public samePassword(otherPassword : string) : boolean {
        if(otherPassword == this.databaseInfo.password)
            return true;
        return false;
    }

    public abstract getClasses(classList : Class[]) : Class[];

    public getID() : string {
        return this.databaseInfo.id;
    }

    public toJSON() : any{
        return 1;
    }
}
export {User};