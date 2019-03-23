"use strict";
exports.__esModule = true;
var DatabaseManager = /** @class */ (function () {
    function DatabaseManager() {
        if (this.constructor === DatabaseManager) {
            throw new TypeError("Cannot construct abstract class");
        }
    }
    /**
     * This method executes the connection with firebase database.
     * @returns {admin.database.Database} reference to the database service.
     */
    DatabaseManager.prototype.initDB = function () {
        throw new TypeError("Cannot call abstract method");
    };
    /**
     * This method writes a sentence in the database.
     * @param sentence - the sentence to write
     * @returns {number} returns the key of the sentence written
     */
    DatabaseManager.prototype.writeSentence = function (sentence) {
        throw new TypeError("Cannot call abstract method");
    };
    /**
     * This method checks if a sentence already exists in the database.
     * @param sentence - the sentence to check.
     * @returns {number} the key of the sentence if sentence already exists, -1 otherwise.
     */
    DatabaseManager.prototype.checkIfExists = function (sentence) {
        throw new TypeError("Cannot call abstract method");
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
    DatabaseManager.prototype.writeSolution = function (words, finalTags, sentence, sentenceKey) {
        throw new TypeError("Cannot call abstract method");
    };
    /**
     * This method reads a sentence from the database and returns it
     * @param key - key of the sentence to read from the database
     * @returns {string} the sentence read
     */
    DatabaseManager.prototype.readSentence = function (key) {
        throw new TypeError("Cannot call abstract method");
    };
    return DatabaseManager;
}());
exports.DatabaseManager = DatabaseManager;
