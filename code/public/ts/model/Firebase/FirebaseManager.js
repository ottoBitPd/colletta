"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *   Class to manage the database.
 *   @abstract
 */
class FirebaseManager {
    constructor() { }
    /**
     * This method executes the connection with firebase database.
     * @returns {admin.database.Database} reference to the database service.
     */
    static initDB() {
        const admin = require("firebase-admin");
        let serviceAccount;
        try {
            serviceAccount = require('../../../../src/ts/model/Firebase/colletta-3e789-firebase-adminsdk-e5uh6-1be19838f7.json');
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://colletta-3e789.firebaseio.com"
            });
            return admin.database();
        }
        catch (e) {
            console.log(e.message);
        }
    }
    /**
     *   This method checks if the instance exists into the database
     *   @param instanceName - the name of the instance
     *   @return {FirebaseManager} the instance if exists
     */
    static lookup(instanceName) {
        if (FirebaseManager.registry.has(instanceName))
            return FirebaseManager.registry.get(instanceName);
        return null;
    }
    /**
     *   This method adds a new instance into the database
     *   @param instanceName - the name of the instance
     *   @param instance - the one to register
     */
    static registerInstance(instanceName, instance) {
        FirebaseManager.registry.set(instanceName, instance);
    }
    /**
     *   This method returns a database instance
     *   @param instanceName - the name of the instance to look for
     */
    static getInstance(instanceName) {
        const dbInstance = FirebaseManager.lookup(instanceName);
        if (dbInstance === null || dbInstance === undefined)
            throw new Error('Error: Database non trovato');
        return dbInstance;
    }
}
FirebaseManager.registry = new Map();
FirebaseManager.database = FirebaseManager.initDB();
exports.FirebaseManager = FirebaseManager;
//# sourceMappingURL=FirebaseManager.js.map