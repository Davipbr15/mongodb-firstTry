const { MongoClient } = require("mongodb");

const username = "davipbr15";
const password = "rbOyPt4XCHejTmvg";
 
// Replace the following with your Atlas connection string               
const url = "mongodb+srv://" + username + ":" + password + "@cluster0.asrju.mongodb.net";                                                                                                              
const url2 = "mongodb+srv://" + username + ":" + password + "@clustername.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "myFirstDatabase";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("peoples");

         // Construct a document                                                                                                                                                              
         let personDocument = {
             "name": { "first": "Davi", "last": "Fernandes" },
             "birth": new Date(2005, 1, 12), // JAN 12, 2005
             "likes": ['Programação',"a Maria Eduarda","Jogar"]                                                                                                                                 
         }

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);
