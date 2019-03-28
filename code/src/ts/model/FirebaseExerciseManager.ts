import {FirebaseManager} from "./FirebaseManager";
import {Data} from "./Data";
import {Exercise} from "./Exercise";
import {ItalianExercise} from "./ItalianExercise";
//import * as firebase from "firebase";
//import {Exercise} from "./Exercise";

class FirebaseExerciseManager extends FirebaseManager {

    public constructor() {
        super();
        FirebaseManager.registerInstance("FirebaseExerciseManager", this);
    }

    // @ts-ignore
    async insert(obj: Data): string {
        //guardo se esiste data in json e butto dentro in db
        let exercise = <Exercise> obj;
        let key : any;
        key = await this.search(exercise.getSentence());
        console.log("ritorna: "+key);
        if(key===undefined){
            key = this.writeSentence(exercise.getSentence());
        }
        this.writeSolution(exercise,key);
        return key;
    }

    /**
     * This method checks if a sentence already exists in the database.
     * @param sentence - the sentence to check.
     * @returns {number} the key of the sentence if sentence already exists, -1 otherwise.
     */


    public async search(sentence: string) {
        return new Promise(function (resolve) {
            FirebaseManager.database.ref('data/sentences/').orderByChild('sentence')
                .once("value", function(snapshot : any) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data: any) {
                            if (data.val().sentence.toLowerCase() === sentence.toLowerCase()) {
                                //console.log("esiste");
                                return resolve(data.key);
                            }
                            //console.log("non esiste");
                            return resolve(undefined);

                        });

                    }
                    //console.log("database vuoto");
                    return resolve(undefined);
                });
        });
    }

    /**
     * This method writes a sentence in the database.
     * @param sentence - the sentence to write
     * @returns {number} returns the key of the sentence written
     */

    private writeSentence(sentence: string) {
        let ref = FirebaseManager.database.ref('data/sentences/').push({sentence: sentence});
        let array = String (ref).split("/");
        //console.log("returno: "+array[array.length -1])
        return array[array.length -1];
    }

    /**
     * This method write the sentence solution on the database.
     * The sentence solution is composed of tags coming from hunpos and from user correction,
     * these tags are contained in finalTags parameter.
     * @param words - array containing the sentence words
     * @param finalTags - array containing the sentence tags
     * @param sentence - the sentence string
     * @param sentenceKey - key of the sentence in the database
     */
    private writeSolution(exercise : Exercise, sentenceKey: string) {
        // vecchi parametri words: string[], finalTags: string[], sentence: string, sentenceKey: number
        let words = exercise.getSentence().split(" ");//poi ci sarà una funzione split migliore in Exercise
        let finalTags = exercise.getSolutionTags();
        //let topics = exercise.getTopics();
        let solutionKey = 0;
        //console.log("sentenceKey: " + sentenceKey);
        FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions')
            .once("value", (snap : any) => {
            solutionKey = snap.numChildren();
            FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/' + String(solutionKey)).set({
                "difficulty": exercise.getDifficulty(),
                "topics": exercise.getTopics()
            });
            for (let wordSolutionKey = 0; wordSolutionKey < words.length; wordSolutionKey++) {
                FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/' + String(solutionKey)).child(String(wordSolutionKey)).set({
                    "word": words[wordSolutionKey],
                    "tag": finalTags[wordSolutionKey]
                });
            }
        });
    }
    // @ts-ignore
    public async read(id: string): Data {

        const ProData: Promise <Exercise> = this.getExerciseById(id);
        const readed = await ProData;
        return readed;
    }

    // @ts-ignore
    private async getExerciseById(id : string) : Promise<Exercise> {

        return new Promise<Exercise>(function (resolve) {
            FirebaseManager.database.ref("data/sentences/" + id)
                .once('value', function (snapshot : any) {
                if (snapshot.exists()) {
                    let readedData: Exercise;
                    readedData = new ItalianExercise(snapshot.val().sentence);
                    readedData.setKey(id);
                    readedData.setDifficulty(snapshot.val().difficulty);
                    readedData.setSolutionTags(snapshot.val().tag);
                    readedData.setTopics(snapshot.val().topics);
                    return resolve(readedData);
                }
                return resolve(undefined);
            });
        });
    }
    // @ts-ignore
    public async remove(id: string): boolean {
        const ProData: Promise<boolean> = this.removeFromId(id);
        const removed = await ProData;
        return removed;
    }

    private async removeFromId(id : string) {
        const ref=FirebaseManager.database.ref("data/sentences/" + id);
        // @ts-ignore
        return new Promise<boolean>(function (resolve) {
            ref.once('value',  function (snapshot: any) {
                if (snapshot.exists()) {
                    ref.remove();
                    // @ts-ignore
                    return resolve(true);
                }
                return resolve(false);
            });
        });
    }

    /*
    //TODO

    update(id: number): void;*/



}
export {FirebaseExerciseManager};