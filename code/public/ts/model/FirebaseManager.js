"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FirebaseManager {
    constructor() {
    }
    /**
     * This method executes the connection with firebase database.
     * @returns {admin.database.Database} reference to the database service.
     */
    static initDB() {
        const admin = require("firebase-admin");
        /*
        //altro metodo
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: 'project-af138',
                clientEmail: 'firebase-adminsdk-k34e2@project-af138.iam.gserviceaccount.com',
                privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDzeipKFQW70tnT\nYSP2MrtJmQdSq/j7Yn/7el5ntbtpPWNsADogw/YpAWcrLnifw4Tffce7dqAGmoWU\nxCNIIznQD2A8Og0jQXIYgUkbQlgZnTD1hRDWPCYqbfm+Ahplw/xoOsMVFSGno2mr\nW3glFfCTXeVmGtJnBg/U8S2cSpyzk3juERztmRv7DiZdYmr2g1iaBzaC5ae/1ee9\nyraiMS367Lq4n8cujQmaUvu8ng4hWu2t32PzaufD+BtvNleAT4MYnS88GwEyMS/m\nc4AVjii0oF/utILcMCdPhMrBWi3xa6MWsQxoA2JNEJz4DrucP0IP0nXtayiRWVNo\n+hQESHpPAgMBAAECggEAHNvmF1HWlCSx3PQupwfsWxTgYVQw9tr+AHjIp9JKnHbC\nShLc0PVpQAMCj4O6mHU8UqE+A2JUJXQ7UR7Ob8Z9G8Q2y+y1kfA37d+lIq4Cc0bG\nftN+42XNwEm4yGTHbDiGunP8m4sdqhkcdUsqOnsXQOBoSGn1dnCpf7v2hAfz+vTM\nuTEIR2niXXxz5Pt1rc/Nb061+R1bEMV2ISNhAzh+zo0DjkMF44lr0nb1dUAGTN8Y\nqKU2f2DQnH9XVBuyMUc5knU38HdTWdZLL6laJjRHS4CXj4n6C9882qDpwcavawv9\n3nV1bhZBSm5jagrLIi3w24POAHVAvJ87F4seeDblwQKBgQD7CdNacb/HJ7l4iJqH\nJwaq9ULrbJxVBvIJGT1mFhjBdmhtzJU+6Tq/ET0+q56HZvB6aLtpgjW3oyvtPKcw\nxhwpG13meeBN6aaubqdAghs4k27IYDPGW49Ng1FDFyxqMcPLGN70hwYEI7lFYDr5\nPZNjTswU4UMUYTV6ncu9etH18wKBgQD4ShUcG8+EkO5Wx+IqsHW3bYc3lUEDKbaP\nEWNS91l6Qjc/GsDWnvvWI8DY38eEMatjdbiz5cMHnYDqU63KSZPAffI4fS2n6IUR\nOOaNoTXayBXO6v3qcpzfRdDIK1nBDhwU0BmtP8feRUxXDTVmuIoF/T8DUBHkq4b8\nsJybgJX1NQKBgB8fZ7mV0p3hOehMn0PUPcpiH8rKK1OLSeSA4ZDPeoA5qta5/2LO\nTX80pvAnHL9SrsuuQlXhU8GRlDeURnIQjZs3DlwtjfZ62jRT+Z5QwwkvlhN3gdO8\ntDZ66k80B0ifJNQAIFwWhVNsDmMgfA88aBJuyXRpPQTAzH2IJKM4H+GrAoGBALAi\n/e6+2+xTVIFDs3JNVHUXwkDwJPq1cMj1sNx+lH9i0gZ2WC7pAgbbvkccGVHyWn9o\nV+tnJ4ATgAy76CIFKEf6EQd55hWjoiKhlw0KPEZEgxQTKKZVQGwz/vTBrB6Ef+9T\n4aNCB+vqhUmMGUIRz/iHu1gCSW9LL6u7Lp4yDi+xAoGAc5q/9ihIISfjTRzYM0sx\nxmRU7TPBV9vpRGSQI/Homsm40JREPZ9ux3OTYEv8Uld3eI92H8sZ/lfslYQmXDl6\n4e20ahJJSb+NDAwS8IHYFmvTP49mgJaTPsjj5fBCFJ9OOoFCak8+7lilOWtYHtx1\nvxMOR/bNpTMyJqbqY+uyX+A=\n-----END PRIVATE KEY-----\n"
            }),
            databaseURL: "https://project-af138.firebaseio.com"
        });*/
        var serviceAccount = require('./colletta-3e789-firebase-adminsdk-e5uh6-c5f75d36ee.json');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://colletta-3e789.firebaseio.com"
        });
        return admin.database();
    }
    static lookup(istanceName) {
        if (FirebaseManager.registry.has(istanceName))
            return FirebaseManager.registry.get(istanceName);
        return null;
    }
    insert(obj) { return -1; }
    remove(id) { return false; }
    read(id) { return null; }
    update(id) { }
    static registerInstance(instanceName, instance) {
        FirebaseManager.registry.set(instanceName, instance);
    }
    static getInstance(instanceName) {
        let dbInstance = FirebaseManager.lookup(instanceName);
        if (dbInstance === null || dbInstance === undefined)
            throw new Error('Error: Database non trovato');
        return dbInstance;
    }
}
FirebaseManager.registry = new Map();
FirebaseManager.database = FirebaseManager.initDB();
exports.FirebaseManager = FirebaseManager;
//# sourceMappingURL=FirebaseManager.js.map