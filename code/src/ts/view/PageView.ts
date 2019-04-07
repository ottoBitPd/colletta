/**
 * PageView is an abstract class that represents the view
 * for all the application pages
 */
abstract class PageView {
    protected title : any;
    protected menuList: any;
    /**
     * PageView is an abstract class and it cannot have objects
     */
    constructor(){
        this.menuList = null;
        this.title = null;
    }


    setTitle(value: any) {
        this.title = value;
    }

    setMenuList(value: any) {
        this.menuList = value;
    }
    getHead(style? : string) : string {
        let ret = "<!DOCTYPE html>" +
        "<html lang=\"it\">\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <title>"+this.title+"</title>\n" +
        "    <link rel=\"stylesheet\" type=\"text/css\" href=\"/newStyle.css\">\n" +
        /*"    <link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\">\n"+*/
        "    <!--bootstrap-->" +
        "    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\">\n" +
        "    <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>\n" +
        "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\"></script>\n" +
        "    <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\"></script>\n";
            if(style!==undefined){ ret += style;}
        ret += "</head>\n" +
        "<body>\n";
        return ret;
    }
    getFoot(script : string) : string {
        return "</body>" +
            "<script>"+script+"</script>" +
        "</html>";
    }


    abstract getPage() : string;



}
export {PageView};