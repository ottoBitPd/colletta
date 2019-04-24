import {expect} from 'chai';
import 'mocha';
import {Data} from "../../../src/ts/model/Data/Data";
import {Class} from "../../../src/ts/model/Data/Class";
import {ExerciseClient} from "../../../src/ts/model/Client/ExerciseClient";

describe('ClassClient', function() {

    let test: ExerciseClient;
    //let database : DatabaseClassManager;

    before(function () {
        //database = new DatabaseClassManager();
        test = new ExerciseClient();
        //@ts-ignore
        test.dbExerciseManager =
            {
                async insert(_class): Promise<boolean> {
                    return true;
                },

                async remove(id: string): Promise<boolean> {
                    return true;
                },

                async read(id: string): Promise<Data> {
                    return new Class(id, "ciao", "ciao", "0", [], []);
                },

                async search(name: string): Promise<string> {
                    return await "0000";
                },

                async update(path: string, value: any): Promise<void> {
                    return;
                },

                async elements(): Promise<Map<string, string>> {
                    let map = new Map<string, string>();
                    map.set("0", "0");
                    map.set("1", "0");
                    console.log(map);
                    return map;
                }
            };

    });
});