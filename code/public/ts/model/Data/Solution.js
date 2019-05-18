"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Difficulty;
(function (Difficulty) {
    Difficulty[Difficulty["veryeasy"] = 1] = "veryeasy";
    Difficulty[Difficulty["easy"] = 2] = "easy";
    Difficulty[Difficulty["normal"] = 3] = "normal";
    Difficulty[Difficulty["hard"] = 4] = "hard";
    Difficulty[Difficulty["veryhard"] = 5] = "veryhard";
})(Difficulty || (Difficulty = {}));
/*
*   Class to create and manage "Solution" objects
*/
class Solution {
    /*
    *   Initializes all attributes needed to Solution object.
    */
    // @ts-ignore
    constructor(key, solverId, solutionTags, topics, difficulty, valutations, time) {
        this.key = key || null;
        this.solverId = solverId;
        this.solutionTags = solutionTags;
        this.topics = topics || null;
        this.difficulty = difficulty || null;
        this.valutations = valutations || null;
        this.time = time || null;
    }
    /*constructor() {
        this.solverId = "-1";
        this.solutionTags = [];
        this.correctionTags = [];
        this.teacherId = "-1";
        this.topics = [];
        this.difficulty = 1;
    }*/
    /*
    * This method returns the key of a solution.
    * @returns { string | null } returns the solution key if exists.
    */
    getKey() {
        return this.key;
    }
    /*
    * This method returns the Id of the solution author.
    * @returns { string } returns the solver Id.
    */
    getSolverId() {
        return this.solverId;
    }
    /*
    * This method returns the topics of the solution.
    * @returns { string[] } returns the solution topics list.
    */
    getTopics() {
        return this.topics;
    }
    /*
    * This method returns the difficulty grade of the solution.
    * @returns { number | null } returns the solution grade of difficulty if exists.
    */
    getDifficulty() {
        return this.difficulty;
    }
    /*
    * This method returns the tags of the solution.
    * @returns { string[] } returns the solution tags list.
    */
    getSolutionTags() {
        return this.solutionTags;
    }
    /*
    * This method returns the valutations of the solution.
    * @returns { Map<string, number> | null } returns the solution valutations if exist.
    */
    getValutations() {
        return this.valutations;
    }
    JSONValutations() {
        let result = "{";
        if (this.valutations) {
            this.valutations.forEach((value, key) => {
                result += '"' + key + '" : ' + value + ",";
            });
        }
        if (result !== "{")
            result = result.substr(0, result.length - 1);
        result += "}";
        return JSON.parse(result);
    }
    /*
    * This method returns the date of the solution.
    * @returns { number | null } returns the solution date if exists.
    */
    getTime() {
        return this.time;
    }
    /*
    * This method returns adds a new mark to solution.
    * @param teacherID - the Id of the teacher who assigns the valutation
    * @param mark - the valutation to add
    */
    addNewMark(teacherID, mark) {
        if (!this.valutations)
            this.valutations = new Map();
        this.valutations.set(teacherID, mark);
    }
    /*
    * This method returns a numeric valutation of the solution.
    * @param tags - the tag list of the solution to evaluate
    * @returns { number } returns the valutation.
    */
    evaluateSolution(tags) {
        var rightTagsNumber = 0;
        let mySolutionTags = this.getSolutionTags();
        for (let j = 0; j < mySolutionTags.length; j++) {
            if (mySolutionTags[j] === tags[j]) {
                rightTagsNumber++;
            }
        }
        return ((rightTagsNumber * 10) / mySolutionTags.length);
    }
}
exports.Solution = Solution;
//# sourceMappingURL=Solution.js.map