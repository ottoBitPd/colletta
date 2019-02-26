class Exercise {
    constructor(){
        this.sentence;
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
    setSentence(sentence){
        this.sentence=sentence;
    }
    extractTags(objSolution){
        for(var i in objSolution.sentence){
            this.tags.push(objSolution.sentence[i].label);
        }
        return this.tags;
    }
}

module.exports = Exercise;