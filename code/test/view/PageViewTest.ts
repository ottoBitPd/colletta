import 'mocha';
import {UserKind} from "../../src/ts/view/PageView";
import {expect} from "chai";
import {ProfileView} from "../../src/ts/view/ProfileView";
import * as express from "express";

describe('PageView', function() {
    let test : ProfileView;
    before(function () {
        const app = express();
        test = new ProfileView(app);
        //@ts-ignore
        test.userKind = UserKind.student;
        //@ts-ignore
        test.profileController = {
            update(_app) {
                return;
            },
            async getAverageInfo() : Promise<Map<number,number>>{
                return new Map();
            }
        }

    });
    describe('SearchViewTest.getHead()', function () {

        it("should return html of the head", async function () {
            let data = {
                username: 'Perry15',
                id: '1',
                password: 'ciccio',
                name: 'Giovanni',
                lastname: 'Peron',
                city: 'Camposampiero',
                school: 'Gio',
                email: 'gino@gino',
                inps: 'Gio'
            }
            test.setUserData(data);

            test.getMenu();
            let str = await test.getPage();
            //console.log("str: ", str);
            var regex = new RegExp("<head>", "i");
            let res = regex.test(str);
            regex = new RegExp("</head>", "i");
            res = res && regex.test(str);
            expect(res).to.be.true;
        });
    });
    describe('SearchViewTest.getMenu()', function () {
        it("should return html of the menu", async function () {
            //@ts-ignore
            test.userKind=UserKind.student;
            test.getMenu();
            let str = await test.getPage();
            //console.log("str: ", str);
            var regex = new RegExp("<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">", "i");
            let res = regex.test(str);
            regex = new RegExp("<a href= \"/classes\" class=\"nav-link\" >Le tue classi</a>", "i");
            res = res && regex.test(str);
            regex = new RegExp("<form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>", "i");
            res = regex.test(str);
            expect(res).to.be.true;
        });
    });
    describe('SearchViewTest.getFoot()', function () {
        it("should return html footer", async function () {
            //@ts-ignore
            test.userKind=UserKind.student;
            test.getFoot("ciccio");
            let str = await test.getPage();
            var regex = new RegExp("<script>", "i");
            let res = regex.test(str);
            regex = new RegExp("</script>", "i");
            res = regex.test(str);
            expect(res).to.be.true;
        });
    });
    describe('SearchViewTest.getUserKind()', function () {
        it("should return the user kind", async function () {
            //@ts-ignore
            test.userKind = UserKind.student;
            expect(test.getUserKind()).to.be.eql(UserKind.student);
        });
    });



});