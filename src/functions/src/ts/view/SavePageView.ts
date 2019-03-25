import {PageView} from "./PageView";

class SavePageView extends PageView{
    constructor(){
        super();
    }

    getPage() {
        return this.fileSystem.readFileSync('./public/exerciseSaved.html').toString();
    }

}
export {SavePageView};