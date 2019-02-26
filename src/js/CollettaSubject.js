class CollettaSubject{
    constructor(){
        if(this.constructor === CollettaSubject){
            throw new TypeError("Cannot construct abstract class");
        }
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