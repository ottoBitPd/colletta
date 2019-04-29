import {expect} from 'chai';
import 'mocha';

import {InsertPresenter} from "../../src/ts/presenter/InsertPresenter";

describe('InsertPresenter', function() {

    let test:InsertPresenter;

   beforeEach(function () {

test=new InsertPresenter(test);
//@ts-ignored

       test.view={
           setUserKind(numero:any){
                    return true;
                    },

           async getPage(): Promise<string>{
               return "Page";
           }

       };

    //@ts-ignored
    test.client={
        getUserClient():any{
            return {
                async insertStudent(username : string, password : string, name : string, surname : string, city : string, school : string, email : string) : Promise<any>{
                    return true;
                },

                async insertTeacher(username : string, password : string, name : string, surname : string, city : string, school : string, inps:string, email : string) : Promise<any>{
                    return true;
                },

                async verifyUser(username: string, insertedPassword : string) : Promise<any>{
                   return true;
                },

                 checkPassword(insertedPassword:string,password:string) : any{
                return true;
            },

         async isTeacher(username:string) : Promise<any> {
                    if ("Gian"===username)
                        return true;
                    else return false;
        },

            async teacherList() : Promise<string[]> {
                return["Perry"];
        },

            async search(username:string) : Promise<string> {
            return "id";
        },

         async getUserData(id:string) : Promise<any> {
                    return "inps";
        },

         async updateUser(username:string, userUpdateData : any){
return true;
            },
         async searchUser(substring : string, teacher : boolean) : Promise<Map<string, string>> {

                    let now= new Map<string,string>();
                    now.set("id","valore");
                    return now;
        },

         hashPassword(plain :string){
                    return true;
            }
            }
        }

        }

   });




    describe('InsertPresenter.isLoggedIn()', function () {
        it('should return user', async function () {

            expect(test.isLoggedIn()).to.equal(false);
        });
    });


});