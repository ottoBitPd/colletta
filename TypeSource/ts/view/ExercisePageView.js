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
var PageView = require("./PageView.js");
var ExercisePageView = /** @class */ (function (_super) {
    __extends(ExercisePageView, _super);
    function ExercisePageView() {
        var _this = _super.call(this) || this;
        _this.sentence = null;
        _this.key = null;
        _this.hunposTranslation = null;
        _this.hunposTags = null;
        return _this;
    }
    ExercisePageView.prototype.setSentence = function (value) {
        this.sentence = value;
    };
    ExercisePageView.prototype.setKey = function (value) {
        this.key = value;
    };
    ExercisePageView.prototype.setHunposTranslation = function (value) {
        this.hunposTranslation = value;
    };
    ExercisePageView.prototype.setHunposTags = function (value) {
        this.hunposTags = value;
    };
    ExercisePageView.prototype.getPage = function () {
        var data = this.fileSystem.readFileSync('./public/exercise.html').toString();
        var words = this.sentence.split(" ");
        data = data.replace(/\*table\*/g, this.buildForm(words));
        data = data.replace(/\*script\*/g, this.getScript());
        data = data.replace(/\*css\*/g, this.buildCss(words));
        data = data.replace(/\*wordsnumber\*/g, words.length);
        data = data.replace(/\*sentence\*/g, this.sentence);
        data = data.replace(/\*key\*/g, this.key);
        data = data.replace(/\*hunposTags\*/g, JSON.stringify(this.hunposTags));
        return data;
    };
    ExercisePageView.prototype.buildForm = function (words) {
        var table = "";
        for (var i = 0; i < words.length; i++) {
            table += "<li class='first'>" + words[i] + "</li><li class='second'>" + this.hunposTranslation[i] + "</li><li class='third'>" + this.getSelect(i) + "</li>\n";
        }
        return table;
    };
    ExercisePageView.prototype.buildCss = function (words) {
        var css = "";
        for (var i = 0; i < words.length; i++) {
            css += this.getCss(i);
        }
        return css;
    };
    ExercisePageView.prototype.getSelect = function (index) {
        var input = this.fileSystem.readFileSync('./public/htmlSelect.html').toString();
        return input.replace(/\*i\*/g, index);
    };
    ExercisePageView.prototype.getScript = function () {
        return this.fileSystem.readFileSync('./public/jsSelect.js').toString();
    };
    ExercisePageView.prototype.getCss = function (index) {
        var input = this.fileSystem.readFileSync('./public/cssSelect.css').toString();
        return input.replace(/\*i\*/g, index);
    };
    return ExercisePageView;
}(PageView));
exports.ExercisePageView = ExercisePageView;
