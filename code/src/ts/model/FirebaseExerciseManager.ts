import {FirebaseManager} from "./FirebaseManager";
import {Data} from "./Data";
import {Exercise} from "./Exercise";
import {ItalianExercise} from "./ItalianExercise";
import {Solution} from "./Solution";

class FirebaseExerciseManager extends FirebaseManager {

    public constructor() {
        super();
        FirebaseManager.registerInstance("FirebaseExerciseManager", this);
    }

    // @ts-ignore
    async insert(obj: Data): string {
        //guardo se esiste data in json e butto dentro in db
        let exercise = <Exercise>obj;
        let key: any;
        key = await this.search(exercise.getSentence());
        console.log("ritorna: " + key);
        if (key === undefined) {//exercise does not exist in the db
            console.log("inserting sentence");
            key = this.writeSentence(exercise.getSentence(), exercise.getAuthorId());
        }

        let solution = exercise.getNewSolution();
        if ( solution !== null){
            console.log("inserting solution");
            this.writeSolution(solution, key);
        }

        return key;
    }

    /**
     * This method checks if a sentence already exists in the database.
     * @param sentence - the sentence to check.
     * @returns {number} the key of the sentence if sentence already exists, -1 otherwise.
     */


    public async search(sentence: string): Promise<string> {
        return new Promise(function (resolve) {
            FirebaseManager.database.ref('data/sentences/').orderByChild('sentence')
                .once("value", function (snapshot: any) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data: any) {
                            if (data.val().sentence.toLowerCase() === sentence.toLowerCase()) {
                                //console.log("esiste");
                                return resolve(data.key);
                            }
                        });
                        //console.log("non esiste");
                        return resolve(undefined);
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

    public writeSentence(sentence: string, authorId: string) {
        let ref = FirebaseManager.database.ref('data/sentences/').push({sentence: sentence, authorId: authorId});
        let array = String(ref).split("/");
        //console.log("returno: "+array[array.length -1])
        return array[array.length - 1];
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
    private writeSolution(solution: Solution, sentenceKey: string) : void {
        if (solution.getValutations() !== null){
            FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/').push({
                "solverId": solution.getSolverId(),
                "tags": solution.getSolutionTags(),
                "topics": solution.getTopics(),
                "difficulty": solution.getDifficulty(),
                "valutations" : solution.JSONValutations(),
                "time" : Date.now()
            });
        }
            //FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/' + String(solutionKey)).child(String(wordSolutionKey)).set({
        // vecchi parametri words: string[], finalTags: string[], sentence: string, sentenceKey: number
        //let words = exercise.getSentence().split(" ");//poi ci sarà una funzione split migliore in Exercise

        //let topics = exercise.getTopics();
        //let solutionKey = 0;
        //console.log("sentenceKey: " + sentenceKey);
        /*FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions')
            .once("value", (snap : any) => {
            solutionKey = snap.numChildren();
            FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/' + String(solutionKey)).set({
                "difficulty": exercise.getSolution().getDifficulty(),
                "solverId": exercise.getSolution().getSolverId(),
                "topics": exercise.getSolution().getTopics()
            });
            for (let wordSolutionKey = 0; wordSolutionKey < words.length; wordSolutionKey++) {
                FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/' + String(solutionKey)).child(String(wordSolutionKey)).set({
                    "word": words[wordSolutionKey],
                    "tag": finalTags[wordSolutionKey]
                });
            }
            this.writeValutation(exercise , sentenceKey, solutionKey );
        });*/
    }

    /*
    private writeValutation(exercise : Exercise, sentenceKey : string, solutionKey : number) {
        FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/'+solutionKey+'/valutations')
            .once("value", (snap : any) => {
                let valutationKey = snap.numChildren();
                FirebaseManager.database.ref('data/sentences/' + sentenceKey + '/solutions/' + String(solutionKey)).child(String(valutationKey)).set({
                    "teacherId": "id del teacher che ha inserito la valutazione scelta",
                    "valutation": "10 se session=teacher, else risultato evaluate()"
                });

            });
    }
    */

    // @ts-ignore
    public async read(id: string): Promise<Data> {

        const ProData: Promise <Exercise> = this.getExerciseById(id);
        const readed = await ProData;
        return readed;
    }

    private async getExerciseById(id : string) : Promise<Exercise> {

        return new Promise<Exercise>(function (resolve) {
            FirebaseManager.database.ref("data/sentences/" + id)
                .once('value', function (snapshot : any) {
                if (snapshot.exists()) {
                    let readData: any = snapshot.val();
                    let exercise = new ItalianExercise(readData.sentence,readData.authorID);
                    exercise.setKey(id);
                    for (let sol in readData.solutions){
                        let vals = new Map<string,number>();

                        for (let val in readData.solutions[sol].valutations) {
                            vals.set(val, readData.solutions[sol].valutations[val]);
                        }

                        exercise.addSolution(
                            readData.solutions[sol].key,readData.solutions[sol].solverID,readData.solutions[sol].tags,
                            readData.solutions[sol].topics,readData.solutions[sol].difficulty,vals,readData.solutions[sol].time);
                    }


                    return resolve(exercise);
                }
                return resolve(undefined);
            });
        });
    }

    public async remove(id: string): Promise<boolean> {
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

    public async update (path:string, value: any) {
        let splittedPath =path.split("/");
        let position : number = splittedPath.length -1;
        let field : string=splittedPath[position];
        console.log(field);
        switch (field) {
            case "difficulty": await this.updateField(path, value); break;
            case "tags": await this.updateField(path, value); break;
            case "topics":await this.updateField(path, value); break;
            default : await console.log("field doesn't exists"); return;
        }
        await this.updateTime(path);
    }


    private async updateField(path : string, value:any) {
        const ref=FirebaseManager.database.ref(path);
        ref.once('value',function (snapshot:any) {
            if (snapshot.exists()) {
                ref.set(value);
            }
        });
    }

    private async updateTime(path: string)  {
        // @ts-ignore
        let ref=FirebaseManager.database.ref(path).parent.child("time");
        ref.once('value',function (snapshot:any) {
            if (snapshot.exists()) {
                ref.set(Date.now());
            }
        });
    }
}
export {FirebaseExerciseManager};