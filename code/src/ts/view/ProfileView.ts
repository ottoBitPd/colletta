import {PageView, UserKind} from "./PageView";
import {ProfilePresenter} from "../presenter/ProfilePresenter";

/**
 *   Class to display the users's profile page
 *   @extends PageView
 */
class ProfileView extends PageView{
    private userData : any;
    private profileController :ProfilePresenter;
    private error : any;
    constructor(app : any){
        super();
        this.profileController= new ProfilePresenter(this);
        this.profileController.update(app);
        this.userData=undefined;
        this.error=undefined;
    }

    /**
     * This method modifies user data
     * @param obj - data to modify
     */
    public setUserData(obj : any){
        this.userData=obj;
    }
    public setError(error : string){
        this.error=error;
    }

    /**
     * This method is used to display the page body structure
     * @return {string} the HTML source
     */
    public async getPage() {
        let ret = this.getHead();
        ret += await this.getMenu();
        ret += "\t\t<div class=\"container\">" +
            "\t\t\t<h1 class ='text-center mb-5'>Informazioni profilo:</h1>\n";
            if (this.error !== undefined){
            ret += "\t\t\t<p class ='text-center h5 text-danger'>" + this.error + "</p>\n";
            }
        if(this.userKind!==UserKind.developer) {
            ret += "\t\t\t<ul class=\"list-group\">\n" +
                "\t\t\t\t<li class=\"list-group-item\">\n" +
                "\t\t\t\t\t<form method='post' action='/update'>" +
                "\t\t\t\t\t\t<div class= \"row\">\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<p class= \"font-weight-bold\"> Nome: " + this.userData.name + "</p> \n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<input class=\"form-control\" name='name'/>\n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t<div class= \"row\">\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<p class= \"font-weight-bold\"> Cognome: " + this.userData.lastname + "</p> \n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<input class=\"form-control\" name='lastname'/>\n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t<div class= \"row\">\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<p class= \"font-weight-bold\"> Città: " + this.userData.city + "</p> \n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<input class=\"form-control\" name='city'/>\n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t<div class= \"row\">\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<p class= \"font-weight-bold\"> Scuola: " + this.userData.school + "</p> \n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<input class=\"form-control\" name='school'/>\n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t</div>\n";
            if (this.userKind == UserKind.teacher) {
                ret += "\t\t\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                    "\t\t\t\t\t\t\t\t<p class= \" font-weight-bold\"> Matricola INPS: " + this.userData.inps + "</p> \n" +
                    "\t\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                    "\t\t\t\t\t\t\t\t<input class=\"form-control\" name='inps'/>\n" +
                    "\t\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t</div>";
            }
            ret += "\t\t\t\t\t\t<div class= \"row\">\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<p class= \"font-weight-bold\"> Email: " + this.userData.email + "</p> \n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<input class=\"form-control\" type='email' name='email'/>\n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t<div class= \"row\">\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<p class= \"font-weight-bold\"> Username: " + this.userData.username + "</p> \n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<input class=\"form-control\" name='username'/>\n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t<div class= \"row\">\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<p class= \"font-weight-bold\"> Vecchia password: </p> \n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<input class=\"form-control\" type='password' name='oldpassword'/>\n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t<div class= \"row\">\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<p class= \"font-weight-bold\"> Nuova password: </p> \n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t\t\t\t\t<input class=\"form-control\" type='password' name='password'/>\n" +
                "\t\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t\t</div>\n";

            ret += "" +
                "\t\t\t\t\t\t<div class = \"col-sm-12 text-center mt-3\">\n" +
                "\t\t\t\t\t\t\t<button class='btn btn-primary btn-sm' id='btnsubmit' type='submit'>Modifica</button> \n" +
                "\t\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t</form>" +
                "\t\t\t\t</li>\n" +
                "\t\t\t</ul>\n";
            if (this.userKind === UserKind.student) {
                let result = await this.profileController.getAverageInfo();
                if (result.size > 0) {
                    let n = result.size;
                    ret += "\t\t\t<div class=\"row\" style=\"margin-top: 15%; margin-bottom:10%\">\n" +
                        "\t\t\t\t<div id= \"progress\" class = \" anchor col-sm-10 mx-auto\">\n" +
                        "\t\t\t\t\t<h1 class ='text-center mb-5'>I tuoi progressi:</h1>\n" +
                        "\t\t\t\t\t<ul class=\"list-group\">\n" +
                        "\t\t\t\t\t\t<li class=\"list-group-item\">\n" +
                        "\t\t\t\t\t\t\t<div class= \"row\">\n" +
                        "\t\t\t\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                        "\t\t\t\t\t\t\t\t\t<p class= \"font-weight-bold\"> Esercizi svolti:</p> \n" +
                        "\t\t\t\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                        "\t\t\t\t\t\t\t\t\t<p class=\"font-weight-light\">" + n + "</p> \n" +
                        "\t\t\t\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t\t\t<div class= \"row\">\n" +
                        "\t\t\t\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                        "\t\t\t\t\t\t\t\t\t<p class= \"font-weight-bold\"> Media valutazioni:</p> \n" +
                        "\t\t\t\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                        "\t\t\t\t\t\t\t\t\t<p class=\"font-weight-light\">" + result.get(Math.max.apply(null, Array.from(result.keys()))) + "</p> \n" +
                        "\t\t\t\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t\t\t\t\t<div class=\"mt-2\" id=\"chartdiv\" style=\"width: 100%; height: 400px; background-color: #FFFFFF;\" ></div>\n" +
                        "\t\t\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t\t</li>\n" +
                        "\t\t\t\t\t</ul>\n" +
                        "\t\t\t\t</div>\n";
                }
            }
        }
        else {//if he is developer
            ret+="\t\t\t\t<a class=\"btn-sm btn btn-primary my-2 my-sm-0\" href=\"/download\" role=\"button\">Registrati</a>\n";
        }
        ret+="\t\t\t</div>\n\t\t</div>\n";

        ret+=this.getFoot(await this.insertChartScript());
        return ret;
    }

    /**
     * This method is used to display the page menù
     * @return {string} the HTML source
     */
    private async getMenu() : Promise<string> {
        let ret =""+
            "<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
            "\t<div class=\"navbar-brand\">Colletta</div>" +
            "\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
            "\t\t<span class=\"navbar-toggler-icon\"></span>" +
            "\t</button>" +
            "\t<div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">"+
            "\t\t<ul class=\"navbar-nav mr-auto\">"+
            "\t\t\t<li class=\"nav-item\">\n" +
            "\t\t\t\t<a id=\"toProgress\" href= \"/\" class=\"nav-link\" >Homepage</a>\n" +
            "\t\t\t</li>\n"+
            "\t\t\t<li class=\"nav-item\">\n" +
            "\t\t\t\t<a id=\"toProgress\" href= \"/exercise/search\" class=\"nav-link\" >Ricerca esercizio</a>\n" +
            "\t\t\t</li>\n";
            if(this.userKind===UserKind.student) {
                ret += ""+
                    "\t\t\t<li class=\"nav-item\">\n" +
                    "\t\t\t\t<a id=\"toProgress\" href= \"#progress\" class=\"nav-link\" >I tuoi progressi</a>\n" +
                    "\t\t\t</li>\n";
                    ret += "\t\t\t<li class=\"nav-item\">\n" +
                    "\t\t\t\t<a href= \"/classes\" class=\"nav-link\" >Le tue classi</a>\n" +
                    "\t\t\t</li>\n";
            }
            else{//teacher
                ret += ""+
                    "\t\t\t<li class=\"nav-item\">\n" +
                    "\t\t\t\t<a href= \"/classes\" class=\"nav-link\" >Area classi</a>\n" +
                    "\t\t\t</li>\n"+
                    "<li class=\"nav-item\">\n" +
                    "\t\t\t\t<a href= \"#\" class=\"nav-link\" onclick='document.getElementById(\"insertExerciseForm\").classList.toggle(\"d-none\")'>Crea esercizio</a>\n" +
                    "\t\t\t</li>\n"+
                    "\t\t\t<li class=\"nav-item\">\n" +
                    "\t\t\t\t<a href= \"/exercises\" class=\"nav-link\" >I tuoi esercizi</a>\n" +
                    "\t\t\t</li>\n";

            }
        ret+="\t\t</ul>";
        //aggiungo login o logout
        ret+=this.getLoginArea();
        ret+="\t</div>" +
            "</nav>";
        ret +=
            "<form method='post' action='/exercise/insert' id='insertExerciseForm' class='d-none'>" +
            "   <div class=\"input-group col-sm-4 py-2 bg-dark\">" +
            "       <input type=\"text\" name=\"sentence\" class=\"form-control\">" +
            "       <button type=\"submit\" class=\"btn btn-primary\">Invia</button>" +
            "   </div>" +
            "</form>";
        return ret;
    }

    /**
     * This method is used to display the page login area
     * @return {string} the HTML source
     */
    private getLoginArea() : string {

        if(this.profileController.isLoggedIn()){
            return "" +
                "        <form class='form-inline' action='/logout'>" +
                "           <div class=\"form-group\">" +
                "               <button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0\">Logout</button>" +
                "           </div>" +
                "        </form>";
        }
        else{
            let ret ="";
            ret += "" +
                "\t\t<form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>\n";
            if(this.profileController.isLoginInvalid()){
                ret+="\t\t\t<p class='text-danger m-1 p-1'>username o password invalidi</p>\n";
            }
            ret+="\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t<input type=\"text\" class=\"form-control mr-sm-2\" name='username' placeholder=\"Username\" required=\"required\">\n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t<input type=\"password\" class=\"form-control mr-sm-2\" name='password' placeholder=\"Password\" required=\"required\">\n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class=\"form-group\">\n" +
                "\t\t\t\t<button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0 mr-2\">Accedi</button>\n" +
                "\t\t\t\t<a class=\"btn-sm btn btn-primary my-2 my-sm-0\" href=\"/registration\" role=\"button\">Registrati</a>\n"+
                "\t\t\t</div>\n" +
                "\t\t</form>\n";
            return ret;
        }
    }

    /**
     * This method returns the javascript code to show the average chart
     */
    private async insertChartScript(){
        let ret="";
        ret+="" +
            "am4core.ready(function() {\n" +
            "\n" +
            "// Themes begin\n" +
            "am4core.useTheme(am4themes_animated);\n" +
            "// Themes end\n" +
            "\n" +
            "// Create chart instance\n" +
            "var chart = am4core.create(\"chartdiv\", am4charts.XYChart);\n" +
            "\n" +
            "var title = chart.titles.create();\n" +
            "title.text = \"Media nel tempo\";\n" +
            "title.fontSize = 25;\n" +
            "title.marginBottom = 30;" +
            "// Add data\n" +
            "chart.data = [";
        let result = await this.profileController.getAverageInfo();
        if(result.size>0) {
            let i=0;
            for (let entry of Array.from(result.entries())) {
                let datetime = new Date(entry[0]);
                let date = datetime.getDate()+"-"+(datetime.getMonth()+1)+"-"+datetime.getFullYear()+", "+datetime.getHours()+":"+datetime.getMinutes();
                let mark = entry[1];
                ret+="{\n" +
                    "  \"date\": \""+date+"\",\n" +
                    "  \"value\": "+mark+"\n" +
                    "}";
                if(i!==result.size-1){
                    ret+=",\n";
                }
                else{
                    ret+="\n";
                }
                i++;
            }
        }
         ret+="];\n" +
            "\n" +
            "// Set input format for the dates\n" +
            "chart.dateFormatter.inputDateFormat = \"dd-MM-yyyy, HH:mm\";\n" +
            "\n" +
            "// Create axes\n" +
            "var dateAxis = chart.xAxes.push(new am4charts.DateAxis());\n" +
            "dateAxis.baseInterval = {\n" +
            "  \"timeUnit\": \"minute\",\n" +
            "  \"count\": 1\n" +
            "};" +
            "dateAxis.skipEmptyPeriods = true;\n" +
            "dateAxis.tooltipDateFormat = \"HH:mm, d MMMM\";\n" +
            "var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());\n" +
            "\n" +
            "// Create series\n" +
            "var series = chart.series.push(new am4charts.LineSeries());\n" +
            "series.dataFields.valueY = \"value\";\n" +
            "series.dataFields.dateX = \"date\";\n" +
            "series.tooltipText = \"{value}\"\n" +
            "series.strokeWidth = 2;\n" +
            "series.minBulletDistance = 15;\n" +
            "\n" +
            "// Drop-shaped tooltips\n" +
            "series.tooltip.background.cornerRadius = 20;\n" +
            "series.tooltip.background.strokeOpacity = 0;\n" +
            "series.tooltip.pointerOrientation = \"vertical\";\n" +
            "series.tooltip.label.minWidth = 40;\n" +
            "series.tooltip.label.minHeight = 40;\n" +
            "series.tooltip.label.textAlign = \"middle\";\n" +
            "series.tooltip.label.textValign = \"middle\";\n" +
            "\n" +
            "// Make bullets grow on hover\n" +
            "var bullet = series.bullets.push(new am4charts.CircleBullet());\n" +
            "bullet.circle.strokeWidth = 2;\n" +
            "bullet.circle.radius = 4;\n" +
            "bullet.circle.fill = am4core.color(\"#fff\");\n" +
            "\n" +
            "var bullethover = bullet.states.create(\"hover\");\n" +
            "bullethover.properties.scale = 1.3;\n" +
            "\n" +
            "// Make a panning cursor\n" +
            "chart.cursor = new am4charts.XYCursor();\n" +
            "chart.cursor.behavior = \"panXY\";\n" +
            "chart.cursor.xAxis = dateAxis;\n" +
            "chart.cursor.snapToSeries = series;\n" +
            "\n" +
            "// Create vertical scrollbar and place it before the value axis\n" +
            "chart.scrollbarY = new am4core.Scrollbar();\n" +
            "chart.scrollbarY.parent = chart.leftAxesContainer;\n" +
            "chart.scrollbarY.toBack();\n" +
            "\n" +
            "// Create a horizontal scrollbar with previe and place it underneath the date axis\n" +
            "chart.scrollbarX = new am4charts.XYChartScrollbar();\n" +
            "chart.scrollbarX.series.push(series);\n" +
            "chart.scrollbarX.parent = chart.bottomAxesContainer;\n" +
            "\n" +
            "chart.events.on(\"ready\", function () {\n" +
            "  dateAxis.zoom({start:0.79, end:1});\n" +
            "});\n" +
            "\n" +
            "}); // end am4core.ready()";
        return ret;
    }

}
export {ProfileView};