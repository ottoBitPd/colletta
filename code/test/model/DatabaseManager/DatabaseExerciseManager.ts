import {expect} from 'chai';
import 'mocha';
import {Class} from "../../../src/ts/model/Data/Class";
import {DatabaseExerciseManager} from "../../../src/ts/model/DatabaseManager/DatabaseExerciseManager";
import {Exercise} from "../../../src/ts/model/Data/Exercise";

describe('DatabaseExerciseManager', function() {

    let prova:any;
    let test1=new DatabaseExerciseManager();

    beforeEach(function () {
        prova= new Exercise("This is an example", "xxxxx");

        //@ts-ignore
        test1.firebaseManager={
            async insert(obj:Class):Promise<boolean>
            {
                return true;
            },

            async remove(obj:string):Promise<boolean>
            {
                return true;
            },
            async read(id:string):Promise<any>
            {
                return "classe"
            },
            async search(id:string):Promise<string>
            {
                return "key"
            },
            async update(path:string, value: any)
            {
                return true;
            },
            async elements() : Promise<Map<string, string>> {
                let now=new Map<string,string>();
                now.set("key","teacherID");
                console.log(now);
                return now;
            }

        }

    });


    describe('DatabaseExerciseManager.insert()', function () {
        it('should return the insert obj in database', async function() {

            expect(await test1.insert(prova)).to.equal(true);

        });
    });


});