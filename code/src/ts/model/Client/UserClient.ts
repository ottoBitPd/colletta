import {DatabaseUserManager} from "../DatabaseManager/DatabaseUserManager";
import {Data} from "../Data/Data";
import {Teacher} from "../Data/Teacher";
import {Student} from "../Data/Student";
import {User} from "../Data/User";

const passwordHash = require('bcryptjs');

/**
 * Class to use the user functionality exposed into the model
 */
class UserClient{
    private dbUserManager : DatabaseUserManager;
    constructor(){
        this.dbUserManager = new DatabaseUserManager();
    }

    /**
     * This method inserts a student into the database
     * @param username - the username of the student
     * @param password - the password of the student
     * @param name - the name of the student
     * @param surname - the surname of the student
     * @param city - the city of the student
     * @param school - the school of the student
     * @param email - the email of the student
     * @returns {boolean} returns "true" if the operation is successful
     */
    async insertStudent(username : string, password : string, name : string, surname : string, city : string, school : string, email : string) : Promise<boolean>{
        return await this.dbUserManager.insert(new Student("0",username, password, name, surname, city, school, email));
    }

    /**
     * This method inserts a teacher into the database
     * @param username - the username of the teacher
     * @param password - the password of the teacher
     * @param name - the name of the teacher
     * @param surname - the surname of the teacher
     * @param city - the city of the teacher
     * @param school - the school of the teacher
     * @param inps - the INPS code of the teacher
     * @param email - the email of the teacher
     * @returns {boolean} returns "true" if the operation is successful
     */
    async insertTeacher(username : string, password : string, name : string, surname : string, city : string, school : string, inps:string, email : string) : Promise<boolean>{
        return await this.dbUserManager.insert(new Teacher("0",username, password, name, surname, city, school, inps, email));
    }

    /**
     * This method verifies the user identity
     * @param username - the username of the user
     * @param insertedPassword - the password currently inserted by the user
     * @returns {boolean} returns "true" if the user has inserted correct data
     */
    async verifyUser(username: string, insertedPassword : string) : Promise<boolean>{
        const idUser = await this.dbUserManager.search(username);
        if(idUser!=="false") {
            const user: Data | null = await this.dbUserManager.read(idUser);

            if (user !== null) {
                const password = (<User>user).getPassword();
                return this.checkPassword(insertedPassword,password);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * This method verifies if the currently inserted password is the same saved into the database
     * @param insertedPassword - the currently inserted password
     * @param password - the saved password
     * @returns {boolean} returns "true" if the two passwords are matching
     */
    public checkPassword(insertedPassword:string,password:string) : boolean{
        if (passwordHash.compareSync(insertedPassword, password)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * This method returns checks if a user is a teacher.
     * @returns { boolean } returns "true" if the user is a teacher.
     */
    public async isTeacher(username:string) : Promise<boolean> {
        const id = await this.dbUserManager.search(username);
        const user = await this.dbUserManager.read(id);

        if (user !== undefined)
            return (<User>user).isTeacher();
        else
            return false;
    }

    /**
     * This method returns the list of teachers inserted into the database
     * @returns {string[]} the list of users
     */
    public async teacherList() : Promise<string[]> {
        let teacherMap = await this.dbUserManager.elements();
        let list : string[] = [];

        for (let teacher of teacherMap){
            let condition = await this.isTeacher(teacher[1]);
            if (condition)
                list.push(teacher[0]);
        }
        return list;
    }

    /**
     * This method looks for an user into the database
     * @param username - the username of the user we are looking for
     * @returns {string}
     */
    public async search(username:string) : Promise<string> {
        return await this.dbUserManager.search(username);
    }

    /**
     * This method returns user informations
     * @param id - the id of the user we are looking for
     * @returns {any} returns the user informations
     */
    public async getUserData(id:string) : Promise<any> {
        const user : Data = await this.dbUserManager.read(id);
        let userData = (<User> user).toJSON();
        if((<User> user).isTeacher()){
            userData.inps = (<Teacher> user).getINPS();
        }
        return userData;
    }

    /**
     * This method modifies user informations
     * @param username - the username of the user of which we want to change data
     * @param userUpdateData - the new informations
     */
    public async updateUser(username:string, userUpdateData : any){
        const id = await this.dbUserManager.search(username);
        await this.dbUserManager.update('data/users/'+id+'/name',userUpdateData.name);
        await this.dbUserManager.update('data/users/'+id+'/lastname',userUpdateData.lastname);
        await this.dbUserManager.update('data/users/'+id+'/city',userUpdateData.city);
        await this.dbUserManager.update('data/users/'+id+'/school',userUpdateData.school);
        await this.dbUserManager.update('data/users/'+id+'/email',userUpdateData.email);
        await this.dbUserManager.update('data/users/'+id+'/username',userUpdateData.username);
        await this.dbUserManager.update('data/users/'+id+'/password',userUpdateData.password);
        if(userUpdateData.inps !==undefined){
            await this.dbUserManager.update('data/users/'+id+'/INPScode',userUpdateData.inps);
        }
    }

    /**
     * This method looks for users into the database
     * @param substring - part of the username of the user
     * @param teacher - false if you want to search student only, true if you want to search teacher only
     * @returns {Map<string, string>} a map key-name of the search results
     */
    public async searchUser(substring : string, teacher : boolean) : Promise<Map<string, string>> {
        var regex = new RegExp(substring, "i");
        var elements = await this.dbUserManager.elements();//returns a map<id,username> of all users in the db
        var mapToReturn = new Map<string, string>();

        for (let entry of Array.from(elements.entries())) {
            let key = entry[0];
            let value = entry[1];
            let user: Data = await this.dbUserManager.read(key);
            if (teacher && (<User>user).isTeacher()) {
                if (value.search(regex) >= 0) {
                    mapToReturn.set(key, value);
                }
            } else if (!teacher && !(<User>user).isTeacher()){
                if (value.search(regex) >= 0) {
                    mapToReturn.set(key, value);
                }
            }
        }

        return mapToReturn;
    }

    /**
     * This method encrypts the user password
     * @param password - the password inserted by the user
     */
    public hashPassword(password :string) : string{
        return passwordHash.hashSync(password,10);
    }
}
export{UserClient}