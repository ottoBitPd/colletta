class Exercise {
    private sentence : any;
    private key : any;
    constructor(){
        this.sentence=null;
        this.key=null;
    }
    getSentence(){
        return this.sentence;
    }
    getKey(){
        return this.key;
    }
    setKey(key : number){
        this.key=key;
    }
    setSentence(sentence : string){
        this.sentence=sentence;
    }
    extractTags(objSolution : any){
        let tags =[];
        for(let i in objSolution.sentence){
            tags.push(objSolution.sentence[i].label);
        }
        return tags;
    }
}
export {Exercise};