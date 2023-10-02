const { MongoClient } = require("mongodb");
// const MongoClient = require("mongodb/lib/mongo_client");

function circulationRepo() {
  const url =
    "mongodb+srv://iamkirandev:9995@workspacecluster.c9dnrxy.mongodb.net/";
  const dbName = "circulation";

  function loadData(data) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);

        results = await db.collection("newspapers").insertMany(data);
        resolve(results);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function get() {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);

        const items = db.collection("newspapers").find(); // returns the cursor

		resolve(await items.toArray());
		client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  return { loadData, get };
}

module.exports = circulationRepo();
