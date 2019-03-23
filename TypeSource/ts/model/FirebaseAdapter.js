"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var DatabaseManager_1 = require("./DatabaseManager");
/** Class to manage database. */
var FirebaseAdapter = /** @class */ (function (_super) {
    __extends(FirebaseAdapter, _super);
    function FirebaseAdapter() {
        var _this = _super.call(this) || this;
        _this.database = _this.initDB();
        _this.sentences = 0;
        _this.database.ref('data/sentences').on("value", function (snap) {
            _this.sentences = snap.numChildren();
            //console.log("inizio key: "+this.sentences);
        });
        return _this;
    }
    /**
     * This method executes the connection with firebase database.
     * @returns {admin.database.Database} reference to the database service.
     */
    FirebaseAdapter.prototype.initDB = function () {
        var admin = require("firebase-admin");
        var serviceAccount = require("./colletta-3e789-firebase-adminsdk-e5uh6-e2795ef617.json");
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://colletta-3e789.firebaseio.com"
        });
        return admin.database();
    };
    /**
     * This method writes a sentence in the database.
     * @param sentence - the sentence to write
     * @returns {number} returns the key of the sentence written
     */
    FirebaseAdapter.prototype.writeSentence = function (sentence) {
        this.database.ref('data/sentences/' + this.sentences).set({ sentence: sentence });
        return this.sentences - 1;
    };
    /**
     * This method checks if a sentence already exists in the database.
     * @param sentence - the sentence to check.
     * @returns {number} the key of the sentence if sentence already exists, -1 otherwise.
     */
    FirebaseAdapter.prototype.checkIfExists = function (sentence) {
        var equal = false;
        for (var sentenceKey = 0; sentenceKey < this.sentences; sentenceKey++) {
            this.database.ref('data/sentences/' + sentenceKey).on("value", function (snap) {
                if (sentence.toLowerCase() === snap.val().sentence.toLowerCase()) {
                    equal = true;
                }
            });
            if (equal) {
                return sentenceKey;
            }
        }
        return -1;
    };
    /**
     * This method write the sentence solution on the database.
     * The sentence solution is composed of tags coming from hunpos and from user correction,
     * these tags are contained in finalTags parameter.
     * @param words - array containing the sentence words
     * @param finalTags - array containing the sentence tags
     * @param sentence - the sentence string
     * @param sentenceKey - key of the sentence in the database
     */
    FirebaseAdapter.prototype.writeSolution = function (words, finalTags, sentence, sentenceKey) {
        var solutionKey = 0;
        this.database.ref('data/sentences/' + sentenceKey + '/solutions').once("value", function (snap) { solutionKey = snap.numChildren(); });
        for (var wordSolutionKey = 0; wordSolutionKey < words.length; wordSolutionKey++) {
            this.database.ref('data/sentences/' + sentenceKey + '/solutions').child(solutionKey).child(wordSolutionKey).set({ "word": words[wordSolutionKey], "tag": finalTags[wordSolutionKey] });
        }
    };
    /**
     * This method reads a sentence from the database and returns it
     * @param key - key of the sentence to read from the database
     * @returns {string} the sentence read
     */
    FirebaseAdapter.prototype.readSentence = function (key) {
        var ret = "";
        this.database.ref("data/sentences/" + key).on("value", function (snap) { ret = snap.val().sentence; });
        return ret;
    };
    return FirebaseAdapter;
}(DatabaseManager_1.DatabaseManager));
exports.FirebaseAdapter = FirebaseAdapter;
