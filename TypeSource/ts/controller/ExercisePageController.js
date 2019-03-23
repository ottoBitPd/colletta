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
var PageController_1 = require("./PageController");
var Exercise_1 = require("./Exercise");
var HunposAdapter_1 = require("./HunposAdapter");
var ExercisePageController = /** @class */ (function (_super) {
    __extends(ExercisePageController, _super);
    function ExercisePageController(view, model) {
        var _this = _super.call(this, view) || this;
        _this.model = model;
        _this.exercise = new Exercise_1.Exercise();
        _this.hunpos = new HunposAdapter_1.HunposAdapter();
        //declare function require(name:string);
        _this.fileSystem = require('fs');
        return _this;
    }
    ExercisePageController.prototype.update = function (app) {
        var _this = this;
        app.post('/exercise', function (request, response) {
            _this.exercise.setSentence(request.body.sentence);
            //checking if the exercise sentence already exists in the database
            var key = _this.model.checkIfExists(_this.exercise.getSentence());
            if (key >= 0)
                _this.exercise.setKey(key);
            else
                _this.exercise.setKey(_this.model.writeSentence(_this.exercise.getSentence()));
            //sending the sentence to hunpos which will provide a solution
            var hunposSolution = _this.hunpos.getHunposSolution(_this.exercise.getSentence());
            //creation of the array containing tags provided from hunpos solution
            var hunposTags = _this.exercise.extractTags(hunposSolution);
            //converting tags to italian
            var hunposTranslation = _this.translateTags(hunposTags);
            //console.log("view: "+JSON.stringify(this.view));
            _this.view.setSentence(_this.exercise.getSentence());
            _this.view.setKey(_this.exercise.getKey());
            _this.view.setHunposTranslation(hunposTranslation);
            _this.view.setHunposTags(hunposTags);
            response.send(_this.view.getPage());
        });
    };
    /**
     * Converts solution tags to italian.
     * @param tags - array of tag coming from hunpos solution
     * @returns {Array} an array containing the italian translation for every tag
     */
    ExercisePageController.prototype.translateTags = function (tags) {
        var hunposTranslation = [];
        for (var i = 0; i < tags.length; i++) {
            hunposTranslation[i] = this.translateTag(tags[i]);
        }
        return hunposTranslation;
    };
    /**
     * Converts a single tag to an italian string representing it
     * @param tag - a string containg the tag to convert
     * @returns {string} a string containing the italian translation of the tag
     */
    ExercisePageController.prototype.translateTag = function (tag) {
        var content = this.fileSystem.readFileSync("./ts/controller/vocabolario.json");
        var jsonContent = JSON.parse(content);
        var lowercase = tag.split(/[A-Z]{1,2}/);
        var uppercase = tag.split(/[a-z0-9]+/);
        var result = "";
        //console.log("uppercase[0]: "+uppercase[0]);
        if (uppercase[0] !== 'V' && uppercase[0] !== 'PE' && uppercase[0] !== 'PC') {
            for (var i in jsonContent) {
                if (i === uppercase[0]) {
                    result += jsonContent[i];
                }
                if (lowercase[1]) {
                    if (i === lowercase[1]) {
                        result += " ";
                        result += jsonContent[i];
                    }
                }
            }
            return result;
        }
        for (var x in jsonContent) {
            if (x === tag) {
                result += jsonContent[x];
            }
        }
        return result;
    };
    return ExercisePageController;
}(PageController_1.PageController));
exports.ExercisePageController = ExercisePageController;
