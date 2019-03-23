/**
 * PageController is an abstract class that represents the controller
 * for all the application pages
 */
class PageController{
    view;
    /**
     * PageController is an abstract class and it cannot have objects
     */
    constructor(view) {
        this.view=view;
        if (this.constructor === PageController) {
            throw new TypeError("Cannot construct abstract class");
        }
    }
    /**Abstract method **/
    update(app) {
        throw new TypeError("Cannot call abstract method");
    }
}

export {PageController};
