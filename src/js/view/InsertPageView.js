const PageView = require("./PageView.js");

class InsertPageView extends PageView{
    constructor(model){
        super();
        this.model=model;
    }

    getPage() {
        return this.fs.readFileSync('./public/insert.html').toString();
    }
}
module.exports = InsertPageView;