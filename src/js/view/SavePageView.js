const PageView = require("./PageView.js");

class SavePageView extends PageView{
    constructor(model){
        super(model);
    }

    getPage() {
        return this.fs.readFileSync('./public/exerciseSaved.html').toString();
    }

}
module.exports = SavePageView;