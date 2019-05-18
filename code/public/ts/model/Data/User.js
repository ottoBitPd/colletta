"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**

 *   Class to create and manage "User" objects
 *   @abstract
 */
class User {
    /**
     *   Initializes all attributes needed to User object.
     */
    constructor(id, username, password, name, lastname, city, school, email) {
        /**
         *   Class to create and manage a database user instance
         */
        this.DatabaseUserInfo = class {
            /**
             *   Initializes all attributes needed to DatabaseUserInfo object.
             */
            constructor(id, psw, name, lN, city, sc, email) {
                this.id = id;
                this.password = psw;
                this.name = name;
                this.lastName = lN;
                this.city = city;
                this.school = sc;
                this.email = email;
            }
        };
        this.username = username;
        this.databaseInfo = new this.DatabaseUserInfo(id, password, name, lastname, city, school, email);
    }
    /**
     * This method returns the username of the user.
     * @returns { string } returns the user username.
     */
    getUsername() {
        return this.username;
    }
    /**
     * This method returns the name of the user.
     * @returns { string } returns the user name.
     */
    getName() {
        return this.databaseInfo.name;
    }
    /**
     * This method returns the last name of the user.
     * @returns { string } returns the user last name.
     */
    getLastName() {
        return this.databaseInfo.lastName;
    }
    /**
     * This method returns the city of the user.
     * @returns { string } returns the user city.
     */
    getCity() {
        return this.databaseInfo.city;
    }
    /**
     * This method returns the school of the user.
     * @returns { string } returns the user school.
     */
    getSchool() {
        return this.databaseInfo.school;
    }
    /**
     * This method returns the password of the user.
     * @returns { string } returns the user password.
     */
    getPassword() {
        return this.databaseInfo.password;
    }
    /**
     * This method returns the email of the user.
     * @returns { string } returns the user email.
     */
    getEmail() {
        return this.databaseInfo.email;
    }
    /**
     * This method checks if the two passwords entered by the user are the same (in registration).
     * @param otherPassword - the password to check
     * @returns { boolean } returns "true" if the passwords are the same.
     */
    samePassword(otherPassword) {
        return (otherPassword === this.databaseInfo.password);
    }
    /**
     * This method modifies an user Id.
     * @param id - the new Id
     */
    setID(id) {
        this.databaseInfo.id = id;
    }
    /**
     * This method returns checks if a user is a teacher.
     * @returns { boolean } returns "true" if the user is a teacher.
     */
    isTeacher() {
        return false;
    }
    /**
     * This method returns checks if a user is a student.
     * @returns { boolean } returns "true" if the user is a student.
     */
    isStudent() {
        return false;
    }
    /**
     * This method returns the Id of the user.
     * @returns { string } returns the user iD.
     */
    getID() {
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
    toJSON() {
        return {
            "username": this.username,
            "id": this.databaseInfo.id,
            "password": this.databaseInfo.password,
            "name": this.databaseInfo.name,
            "lastname": this.databaseInfo.lastName,
            "city": this.databaseInfo.city,
            "school": this.databaseInfo.school,
            "email": this.databaseInfo.email
        };
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map