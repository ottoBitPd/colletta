//import {PageView} from "../view/PageView";

abstract class PageController{
    protected view: any;
    constructor(view : any){
        this.view=view;
    }
    abstract update(app : any) : void;
    /*
    //forse è un idea
    setView(view:any) : void{
        this.view=view;
    }*/

}
export {PageController};