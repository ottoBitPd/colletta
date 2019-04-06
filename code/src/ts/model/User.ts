import {Data} from "./Data";
import {Class} from "./Class";

abstract class User implements Data{

    private username : string;
    public databaseInfo : any;


    constructor(id : string, username : string, password: string, name : string, lastname:string, city:string, school : string) {
        this.username= username;
        this.databaseInfo= new this.DatabaseUserInfo(id, password, name, lastname, city, school);
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


    public getPassword() : string {
        return this.databaseInfo.password;
    }

    public samePassword(otherPassword : string) : boolean {
        if(otherPassword === this.databaseInfo.password)
            return true;
        return false;
    }

    public setID(id :string) {
        this.databaseInfo.id= id;
    }

    public isTeacher () {
        return false;
    }

    public abstract getClasses(classList : Class[]) : Class[];

    public getID() {
        return this.databaseInfo.id;
    }

    public toJSON() : any{
        return 1;
    }
}
export {User};