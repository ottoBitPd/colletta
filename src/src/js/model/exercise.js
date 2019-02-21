class Exercise {
    constructor(sentence){
        this.sentence=sentence;
        this.key;
        this.tags=[];
    }
    getSentence(){
        return this.sentence;
    }
    getKey(){
        return this.key;
    }
    getTags(){
        return this.tags;
    }
    setKey(key){
        this.key=key;
    }

    extractTags(objSolution){
        for(var i in objSolution.sentence){
            this.tags.push(objSolution.sentence[i].label);
        }
        return this.tags;
    }
}

module.exports = Exercise;