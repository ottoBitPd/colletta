/**
 * PageView is an abstract class that represents the view
 * for all the application pages
 */
abstract class PageView {
    protected fileSystem : any;
    /**
     * PageView is an abstract class and it cannot have objects
     */
    constructor(){
        this.fileSystem = require('fs');
    }

    abstract getPage() : string;


}
export {PageView};