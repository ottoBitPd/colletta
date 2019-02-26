class CollettaSubject{
    constructor(){
        this.observers = [];
    }
    notify(){
        throw new TypeError("Cannot call abstract method");
    }
    attach(observer){
        throw new TypeError("Cannot call abstract method");
    }
    detach(observer){
        throw new TypeError("Cannot call abstract method");
    }
}
module.exports = CollettaSubject;