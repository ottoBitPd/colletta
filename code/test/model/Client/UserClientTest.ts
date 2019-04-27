import {expect} from 'chai';
import 'mocha';
import {UserClient} from "../../../src/ts/model/Client/UserClient";
import {Data} from "../../../src/ts/model/Data/Data";
import {Teacher} from "../../../src/ts/model/Data/Teacher";
import {Student} from "../../../src/ts/model/Data/Student";
const passwordHash = require('bcryptjs');

describe('UserClient', function() {
    let client : UserClient;

    beforeEach(function () {
        client = new UserClient();
        //@ts-ignore
        client.dbUserManager =
            {
                async insert(data): Promise<boolean> {
                    return true;
                },

                async remove(id: string): Promise<boolean> {
                    return true;
                },

                async read(id: string): Promise<Data> {
                    if (id == "0")
                        return new Teacher("0","0",passwordHash.hashSync("password"),"","","","","","");
                    if (id == "1")
                        return new Student("1","1",passwordHash.hashSync("password"),"","","","","");
                    return new Promise((resolve) => resolve(undefined));
                },

                async search(name: string): Promise<string> {
                    if (name == "0")
                        return await "0";
                    if (name == "1")
                        return await "1";
                    return await "false";
                },

                async update(path: string, value: any): Promise<void> {
                    return;
                },

                async elements(): Promise<Map<string, string>> {
                    let map = new Map<string, string>();
                    map.set("0", "0");
                    map.set("1", "1");
                    return map;
                }
            };
    });
    
    describe("UserClient.insertStudent()",function () {
        it('should return true', async function () {
            expect(await client.insertStudent("","","","","","",""))
                .to.be.true;
        });
    });

    describe("UserClient.insertTeacher()",function () {
        it('should return true', async function () {
            expect(await client.insertTeacher("","","","","","","",""))
                .to.be.true;
        });
    });

    describe("UserClient.verifyUser()",function () {
        context('with an inexistent username', function() {
            it('should return false', async function () {
                expect(await client.verifyUser("false", ""))
                    .to.be.false;
            });
        });

        context('with an existent username', function() {
            it('should return false with wrong password', async function () {
                expect(await client.verifyUser("0", "wrongpassword"))
                    .to.be.false;
            });

            it('should return true with correct password', async function () {
                expect(await client.verifyUser("0", "password"))
                    .to.be.true;
            });
        });
    });

    describe("UserClient.checkPassword()",function () {
        it('should return true', function () {
            expect(client.checkPassword("password",passwordHash.hashSync("password")))
                .to.be.true;
        });

        it('should return false', function () {
            expect(client.checkPassword("wrongpassword",passwordHash.hashSync("password")))
                .to.be.false;
        });
    });

    describe("UserClient.isTeacher()",function () {
        context("when the user exists",function () {
            it('should return true if is a teacher', async function () {
                expect(await client.isTeacher("0")).to.be.true;
            });

            it('should return false if is a student', async function () {
                expect(await client.isTeacher("1")).to.be.false;
            });
        });

        context("when the user doesn\'t exist",function () {
            it('should return false', async function () {
                expect(await client.isTeacher("nnn")).to.be.false;
            });
        });
    });

    describe("UserClient.teacherList()",function () {
        it('should return the list of all teachers', async function () {
            expect(await client.teacherList()).to.be.eql(["0"]);
        });
    });

    describe("UserClient.search()",function () {
        it('should return the id of the user searched', async function () {
            expect(await client.search("0")).to.be.equals("0");
        });
    });

    describe("UserClient.getUserData()",function () {
        it('should return the data related to the given id', async function () {
            let userData = await client.getUserData("0");
            expect(userData.username).to.be.equals("0") &&
            expect(userData.id).to.be.equals("0") &&
            expect(userData.name).to.be.equals("") &&
            expect(userData.lastname).to.be.equals("") &&
            expect(userData.city).to.be.equals("") &&
            expect(userData.school).to.be.equals("") &&
            expect(userData.email).to.be.equals("") &&
            expect(userData.inps).to.be.equals("") &&
            expect(passwordHash.compareSync("password",userData.password)).to.be.true;
        });
    });

    describe("UserClient.updateUser()",function () {
        it('should update the user data', async function () {
            expect(await client.updateUser("0",
                {
                    name: "",
                    lastname:"",
                    city:"",
                    school:"",
                    email:"",
                    username:"0",
                    password:"password",
                    inps:""
                }
            ));
        });
    });

    describe("UserClient.searchUser()",function () {
        it('should return the teacher with "0" in the username', async function () {
            let map = new Map<string,string>();
            map.set("0","0");
            expect(await client.searchUser("0",true)).to.be.eql(map);
        });

        it('should return the student with "1" in the username', async function () {
            let map = new Map<string,string>();
            map.set("1","1");
            expect(await client.searchUser("1",false)).to.be.eql(map);
        });
    });

    describe("UserClient.hashPassword()",function () {
        it('should return the hash of a given password', function () {
            expect(passwordHash.compareSync("password",client.hashPassword("password")))
                .to.be.true;
        });
    });
});