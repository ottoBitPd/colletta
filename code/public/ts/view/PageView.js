"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PageView is an abstract class that represents the view
 * for all the application pages
 */
var UserKind;
(function (UserKind) {
    UserKind[UserKind["user"] = 0] = "user";
    UserKind[UserKind["student"] = 1] = "student";
    UserKind[UserKind["teacher"] = 2] = "teacher";
    UserKind[UserKind["developer"] = 3] = "developer";
})(UserKind || (UserKind = {}));
exports.UserKind = UserKind;
/**
 * Class to represent the view for all the application pages
 * @abstract
 */
class PageView {
    /**
     * PageView is an abstract class and it cannot have objects
     */
    constructor() {
        this.menuList = null;
        this.title = null;
        this.userKind = 0;
    }
    /**
     * This method modifies the page title
     * @param value - the new page title
     */
    setTitle(value) {
        this.title = value;
    }
    /**
     * This method modifies the page list
     * @param value - the new list value
     */
    setMenuList(value) {
        this.menuList = value;
    }
    /**
     * This method modifies the type of an user
     * @param user - the new user type
     */
    setUserKind(usr) {
        this.userKind = usr;
    }
    /**
     * This method returns the type of an user
     * @return { UserKind } the kind of the user
     */
    getUserKind() {
        return this.userKind;
    }
    /**
     * This method is used to display the page header
     * @return {string} the HTML source
     */
    getHead(style) {
        let ret = "<!DOCTYPE html>\n" +
            "<html lang=\"it\">\n" +
            "\t<head>\n" +
            "\t\t<meta charset=\"UTF-8\">\n" +
            "\t\t<title>" + this.title + "</title>\n" +
            "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\">\n" +
            "\t\t<!-- Resources -->\n" +
            "\t\t<script src=\"https://www.amcharts.com/lib/4/core.js\"></script>\n" +
            "\t\t<script src=\"https://www.amcharts.com/lib/4/charts.js\"></script>\n" +
            "\t\t<script src=\"https://www.amcharts.com/lib/4/themes/animated.js\"></script>\n" +
            "\t\t<!--bootstrap-->\n" +
            "\t\t<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\">\n" +
            "\t\t<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.7.0/css/all.css\" integrity=\"sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ\" crossorigin=\"anonymous\">\n" +
            "\t\t<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>\n" +
            "\t\t<script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\"></script>\n" +
            "\t\t<script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\"></script>\n";
        if (style !== undefined) {
            ret += style;
        }
        ret += "\t</head>\n" +
            "\t<body>\n";
        return ret;
    }
    /**
     * This method is used to display the page footer
     * @return {string} the HTML source
     */
    getFoot(script) {
        return "\t</body>\n" +
            "\t<script>\n" + script + "\t</script>\n" +
            "</html>";
    }
}
exports.PageView = PageView;
//# sourceMappingURL=PageView.js.map