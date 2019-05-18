"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserClient_1 = require("./UserClient");
const ExerciseClient_1 = require("./ExerciseClient");
const ClassClient_1 = require("./ClassClient");
/**
 * Class to use the functionality exposed into the model
 */
class Client {
    constructor(userClient, exerciseClient, classClient) {
        this.userClient = userClient;
        this.exerciseClient = exerciseClient;
        this.classClient = classClient;
    }
    /**
     * This method returns an UserClient instance if exists
     */
    getUserClient() {
        return this.userClient;
    }
    /**
     * This method returns an ExerciseClient instance if exists
     */
    getExerciseClient() {
        return this.exerciseClient;
    }
    /**
     * This method returns a ClassClient instance if exists
     */
    getClassClient() {
        return this.classClient;
    }
}
Client.builder = class ClientBuilder {
    /**
     * This method create a new instance of ClassClient
     * @returns {ClassBuilder} a new instance of CLassBuilder
     */
    buildClassClient() {
        this.dbClassManager = new ClassClient_1.ClassClient();
        return this;
    }
    /**
     * This method create a new instance of ExerciseClient
     * @returns {ClassBuilder} a new instance of CLassBuilder
     */
    buildExerciseClient() {
        this.dbExerciseManager = new ExerciseClient_1.ExerciseClient();
        return this;
    }
    /**
     * This method create a new instance of UserClient
     * @returns {ClassBuilder} a new instance of CLassBuilder
     */
    buildUserClient() {
        this.dbUserManager = new UserClient_1.UserClient();
        return this;
    }
    /**
     * This method create a new instance of Client
     * @returns {ClassBuilder} a new instance of CLassBuilder
     */
    build() {
        return new Client(this.dbUserManager, this.dbExerciseManager, this.dbClassManager);
    }
};
exports.Client = Client;
//# sourceMappingURL=Client.js.map