const CollettaObserver = require("../CollettaObserver.js");
const CollettaSubject = require("../CollettaSubject.js");
class PageView extends CollettaObserver{
    constructor(){
        super();
        this.collettaSubject= null;//dovremmo dargli un modello
        this.fs = require('fs');
    }
    update(){
        throw new TypeError("Cannot call abstract method");
    }
    attach(observer){
        this.observers.push(observer);
    }
    detach(observer){
        this.observers.splice( this.observers.indexOf(observer), 1 );
    }
    notify(){
        for(var i in this.observers)
            i.update();
    }
    getModel(){
        return this.model;
    }
    getPage(){
        throw new TypeError("Cannot call abstract method");
    }
}
module.exports = PageView;