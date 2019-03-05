class CollettaObserver{
    constructor(){
        if(this.constructor === CollettaObserver){
            throw new TypeError("Cannot construct abstract class");
        }
    }
    update(){
        throw new TypeError("Cannot call abstract method");
    }
}
module.exports = CollettaObserver;