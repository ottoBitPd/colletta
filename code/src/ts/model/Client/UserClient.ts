import {DatabaseUserManager} from "../DatabaseManager/DatabaseUserManager";
import {Data} from "../Data/Data";
import {Teacher} from "../Data/Teacher";
import {Student} from "../Data/Student";
import {User} from "../Data/User";

class UserClient{
    private dbUserManager : DatabaseUserManager;
    private passwordHash = require('bcryptjs');
    constructor(){
        this.dbUserManager = new DatabaseUserManager();
    }

    async insertStudent(username : string, password : string, name : string, surname : string, city : string, school : string, email : string) : Promise<boolean>{
        return await this.dbUserManager.insert(new Student("0",username, password, name, surname, city, school, email));
    }
    async insertTeacher(username : string, password : string, name : string, surname : string, city : string, school : string, inps:string, email : string) : Promise<boolean>{
        return await this.dbUserManager.insert(new Teacher("0",username, password, name, surname, city, school, inps, email));
    }
    async verifyUser(username: string, insertedPassword : string) : Promise<boolean>{
        const idUser = await this.dbUserManager.search(username);
        if(idUser!=="false") {
            const user: Data | null = await this.dbUserManager.read(idUser);
            if (user !== null) {
                const password = (<User>user).getPassword();
                return this.checkPassword(insertedPassword,password);
            } else {
                //console.log("password dont match")
                return false;
            }
        }
        else{
            return false;
        }

    }
    public checkPassword(insertedPassword:string,password:string) : boolean{
        if (this.passwordHash.compareSync(insertedPassword, password)) {
            //console.log("password match");
            return true;
        } else {
            //console.log("password dont match")
            return false;
        }
    }

    async isTeacher(username:string) : Promise<boolean> {
        const id = await this.dbUserManager.search(username);
        const user = await this.dbUserManager.read(id);
        //console.log((<User>user));
        //console.log((<User>user).getUsername());
        if (user !== undefined)
            return (<User>user).isTeacher();
        else
            return false;
    }

    async teacherList() : Promise<string[]> {
        const teacherMap = await this.dbUserManager.elements();
        console.log(teacherMap);
        let list : string[] = [];

        teacherMap.forEach(async (value, key) => {
            const condition = await this.isTeacher(value);
            if (condition){
                list.push(key);
            }
        });

        console.log(list);
        return list;
    }

    async search(username:string) : Promise<string> {
        return await this.dbUserManager.search(username);
    }

    public async getUserData(id:string) : Promise<any> {
        const user : Data = await this.dbUserManager.read(id);
        let userData = (<User> user).toJSON();
        if((<User> user).isTeacher()){
            userData.inps = (<Teacher> user).getINPS();
        }
        return userData;
    }
    public async updateUser(username:string, userUpdateData : any){
        const id = await this.dbUserManager.search(username);
        this.dbUserManager.update('data/users/'+id+'/name',userUpdateData.name);
        this.dbUserManager.update('data/users/'+id+'/lastname',userUpdateData.lastname);
        this.dbUserManager.update('data/users/'+id+'/city',userUpdateData.city);
        this.dbUserManager.update('data/users/'+id+'/school',userUpdateData.school);
        this.dbUserManager.update('data/users/'+id+'/email',userUpdateData.email);
        this.dbUserManager.update('data/users/'+id+'/username',userUpdateData.username);
        this.dbUserManager.update('data/users/'+id+'/password',userUpdateData.password);
        if(userUpdateData.inps !==undefined){
            this.dbUserManager.update('data/users/'+id+'/INPScode',userUpdateData.inps);
        }
    }
    public hashPassword(plain :string){
        return this.passwordHash.hashSync(plain,10);
    }
}
export{UserClient}