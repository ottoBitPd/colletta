const PageView = require("./PageView.js");
const fs = require('fs');
class InsertPage extends PageView{
    constructor(model){
        super(model);
    }

    getPage() {
        return fs.readFileSync('./html/demo.html').toString();
    }
}
module.exports = InsertPage;