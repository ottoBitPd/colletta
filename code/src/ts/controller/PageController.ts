//import {PageView} from "../view/PageView";

abstract class PageController{
    protected view: any;
    constructor(view : any){
        this.view=view;
    }
    abstract update(app : any) : void;


}
export {PageController};