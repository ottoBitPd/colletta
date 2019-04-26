import {PageView} from "./PageView";

/**
 *   Class to display the savings page
 *   @extends PageView
 */
class SaveView extends PageView{
    private fileSystem : any;
    constructor(app : any){
        super();
        this.fileSystem=require('fs');
    }

    /**
     * This method is used to display the page body structure
     * @return {string} the HTML source
     */
    getPage() {
        return this.fileSystem.readFileSync('./public/exerciseSaved.html').toString();
    }

}
export {SaveView};