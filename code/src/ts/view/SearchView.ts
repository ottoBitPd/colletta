import {PageView} from "./PageView";

class SaveView extends PageView{
    constructor(){
        super();
    }

    getPage() {
        return this.fileSystem.readFileSync('./public/exerciseSaved.html').toString();
    }

}
export {SaveView};