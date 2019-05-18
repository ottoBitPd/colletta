import {Data} from "./Data";
import {Class} from "./Class";

/**

 *   Class to create and manage "User" objects
 *   @abstract
 */

abstract class User implements Data{

    private username : string;
    public databaseInfo : any;

    /**
     *   Initializes all attributes needed to User object.
     */
    constructor(id : string, username : string, password: string, name : string, lastname:string, city:string, school : string, email : string) {
        this.username= username;
        this.databaseInfo= new this.DatabaseUserInfo(id, password, name, lastname, city, school, email);
    }

    /**
     *   Class to create and manage a database user instance
     */
    public DatabaseUserInfo = class {
        public id : string;
        public password : string;
        public name : string;
        public lastName : string;
        public city : string;
        public school : string;
        public email : string;

        /**
         *   Initializes all attributes needed to DatabaseUserInfo object.
         */
        constructor(id : string, psw : string, name : string, lN : string, city : string, sc : string, email : string){
            this.id = id;
            this.password = psw;
            this.name = name;
            this.lastName = lN;
            this.city = city;
            this.school = sc;
            this.email = email;
        }
    };

    /**
     * This method returns the username of the user.
     * @returns { string } returns the user username.
     */
    public getUsername() : string {
        return this.username;
    }

    /**
     * This method returns the name of the user.
     * @returns { string } returns the user name.
     */
    public getName() : string {
        return this.databaseInfo.name;
    }

    /**
     * This method returns the last name of the user.
     * @returns { string } returns the user last name.
     */
    public getLastName() : string {
        return this.databaseInfo.lastName;
    }

    /**
     * This method returns the city of the user.
     * @returns { string } returns the user city.
     */
    public getCity() : string {
        return this.databaseInfo.city;
    }

    /**
     * This method returns the school of the user.
     * @returns { string } returns the user school.
     */
    public getSchool() : string {
        return this.databaseInfo.school;
    }

    /**
     * This method returns the password of the user.
     * @returns { string } returns the user password.
     */
    public getPassword() : string {
        return this.databaseInfo.password;
    }

    /**
     * This method returns the email of the user.
     * @returns { string } returns the user email.
     */
    public getEmail() : string {
        return this.databaseInfo.email;
    }

    /**
     * This method checks if the two passwords entered by the user are the same (in registration).
     * @param otherPassword - the password to check
     * @returns { boolean } returns "true" if the passwords are the same.
     */
    public samePassword(otherPassword : string) : boolean {
        return (otherPassword === this.databaseInfo.password);
    }

    /**
     * This method modifies an user Id.
     * @param id - the new Id
     */
    public setID(id :string) {
        this.databaseInfo.id= id;
    }

    /**
     * This method returns checks if a user is a teacher.
     * @returns { boolean } returns "true" if the user is a teacher.
     */
    public isTeacher () :boolean {
        return false;
    }

    /**
     * This method returns checks if a user is a student.
     * @returns { boolean } returns "true" if the user is a student.
     */
    public isStudent() :boolean {
        return false;
    }

    /**
     * This method returns the iist of classes of a user.
     * @param classList - the list of all the available classes
     * @returns { Class[]} returns the list of classes.
     */
    public abstract getClasses(classList : Class[]) : Class[];

    /**
     * This method returns the Id of the user.
     * @returns { string } returns the user iD.
     */
    public getID() {
        return this.databaseInfo.id;
    }

    /**
     * This method returns a JSON file containing all the user informations
     * @return {any} the JSON file made like:
     *                  username    [the user username]
     *                  id          [the user id]
     *                  password    [the user password]
     *                  name        [the user first name]
     *                  lastname    [the user surname]
     *                  city        [the user cisty]
     *                  school      [the user school]
     *                  email       [the user email]
     */
    public toJSON() : any{
        return {
            "username": this.username,
            "id" : this.databaseInfo.id,
            "password" : this.databaseInfo.password,
            "name" : this.databaseInfo.name,
            "lastname" : this.databaseInfo.lastName,
            "city" : this.databaseInfo.city,
            "school" : this.databaseInfo.school,
            "email" : this.databaseInfo.email
        };
    }
}
export {User};