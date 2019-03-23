"use strict";
exports.__esModule = true;
var Exercise = /** @class */ (function () {
    function Exercise() {
        this.sentence;
        this.key;
    }
    Exercise.prototype.getSentence = function () {
        return this.sentence;
    };
    Exercise.prototype.getKey = function () {
        return this.key;
    };
    Exercise.prototype.setKey = function (key) {
        this.key = key;
    };
    Exercise.prototype.setSentence = function (sentence) {
        this.sentence = sentence;
    };
    Exercise.prototype.extractTags = function (objSolution) {
        var tags = [];
        for (var i in objSolution.sentence) {
            tags.push(objSolution.sentence[i].label);
        }
        return tags;
    };
    return Exercise;
}());
exports.Exercise = Exercise;
