import {FirebaseManager} from "/FirebaseManager";
import {Data} from "./Data";


class FirebaseExerciseManager extends FirebaseManager {
    private sentences: number;
    private database: FirebaseManager;

    protected constructor() {
        super();
        this.database = super.getInstance();
        this.sentences = 0;
    }

    insert(obj: Data): number {
        //guardo se esiste data in json e butto dentro in db
        let key = this.checkIfExists(obj.getSentence());
        if (key === -1) {
            key = this.writeSentence(obj.getSentence());
        }
        this.writeSolution(obj.split(), obj.getSolutionTags(), obj.getSentence(), key);
    }

    /**
     * This method checks if a sentence already exists in the database.
     * @param sentence - the sentence to check.
     * @returns {number} the key of the sentence if sentence already exists, -1 otherwise.
     */
    private checkIfExists(sentence: string) {
        var equal = false;
        for (var sentenceKey = 0; sentenceKey < this.sentences; sentenceKey++) {
            this.database.ref('data/sentences/' + sentenceKey).on("value", snap => {
                // @ts-ignore
                if (sentence.toLowerCase() === snap.val().sentence.toLowerCase()) {
                    equal = true;
                }
            });
            if (equal) {
                return sentenceKey;
            }
        }
        return -1;
    }

    /**
     * This method writes a sentence in the database.
     * @param sentence - the sentence to write
     * @returns {number} returns the key of the sentence written
     */
    writeSentence(sentence: string) {
        this.database.ref('data/sentences/' + this.sentences).set({sentence: sentence});
        return this.sentences - 1;
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
    writeSolution(words: string[], finalTags: string[], sentence: string, sentenceKey: number) {
        let solutionKey = 0;
        console.log("sentenceKey: " + sentenceKey);
        this.database.ref('data/sentences/' + sentenceKey + '/solutions').once("value", snap => {
            // @ts-ignore
            solutionKey = snap.numChildren();
            console.log("solutionKey: " + solutionKey);
            for (let wordSolutionKey = 0; wordSolutionKey < words.length; wordSolutionKey++) {
                console.log("number: " + solutionKey);
                console.log("string: " + String(solutionKey));
                this.database.ref('data/sentences/' + sentenceKey + '/solutions').child(String(solutionKey)).child(String(wordSolutionKey)).set({
                    "word": words[wordSolutionKey],
                    "tag": finalTags[wordSolutionKey]
                });
            }
        });
    }

    remove(id: number): boolean;

    read(id: number): Data;

    update(id: number): void;

    static registerInstance(instanceName: string, instance: FirebaseManager): void;

    static getInstance(instanceName: string): FirebaseManager;

}
export {FirebaseManager};