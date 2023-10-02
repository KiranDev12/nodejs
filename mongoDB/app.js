const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const circulationRepo = require("./repos/circulationRepo");
const data = require("./circulation.json");

const url =
  "mongodb+srv://iamkirandev:9995@workspacecluster.c9dnrxy.mongodb.net/";
const dbName = "circulation";

async function main() {
  const client = new MongoClient(url);
  await client.connect();

  try {
    const results = await circulationRepo.loadData(data);
    assert.equal(data.length, results.insertedCount);

    // this returns the whole set of the data
    const getData = await circulationRepo.get();
    assert.equal(data.length, getData.length);

    // this filters the data by taking in the query as a parameter and it uses the same function get
    const filterData = await circulationRepo.get({
      Newspaper: getData[4].Newspaper,
    });
    //get always gonna return an array and hence filterData[0]
    assert.deepEqual(filterData[0], getData[4]);
    // here deepEqual compares the object contents

    const limitData = await circulationRepo.get({}, 3);
    assert.equal(limitData.length, 3);

    const id = getData[4]._id.toString(); //! Real world scenario in which the id passed is a string and not an object, but in MongoDB the _id with which this is gonna be compared is an object
    const byId = await circulationRepo.getById(id);
    assert.deepEqual(byId, getData[4]);

    const newItem = {
      Newspaper: "My paper",
      "Daily Circulation, 2004": 1,
      "Daily Circulation, 2013": 2,
      "Change in Daily Circulation, 2004-2013": 100,
      "Pulitzer Prize Winners and Finalists, 1990-2003": 0,
      "Pulitzer Prize Winners and Finalists, 2004-2014": 0,
      "Pulitzer Prize Winners and Finalists, 1990-2014": 0,
    };
    const addedItem = await circulationRepo.add(newItem);
    assert(addedItem._id); // assertion is through checking if _id is present or not 
    const addedItemQuery = await circulationRepo.getById(addedItem._id);
    assert.deepEqual(addedItemQuery, newItem);

    const updatedItem = await circulationRepo.update(addedItem._id, {
      Newspaper: "My new paper",
      "Daily Circulation, 2004": 1,
      "Daily Circulation, 2013": 2,
      "Change in Daily Circulation, 2004-2013": 100,
      "Pulitzer Prize Winners and Finalists, 1990-2003": 0,
      "Pulitzer Prize Winners and Finalists, 2004-2014": 0,
      "Pulitzer Prize Winners and Finalists, 1990-2014": 0,
    });
    assert.equal(updatedItem.Newspaper, "My new paper");

    const newAddedItemQuery = await circulationRepo.getById(addedItem._id);
    assert.equal(newAddedItemQuery.Newspaper, "My new paper");

    const removed = await circulationRepo.remove(addedItem._id);
    assert(removed);
    const deletedItem = await circulationRepo.getById(addedItem._id);
    assert.equal(deletedItem, null);

    const avgFinalists = await circulationRepo.averageFinalists();
    console.log("Average Finalists: " + avgFinalists);

    const avgByChange = await circulationRepo.averageFinalistsByChange();
    console.log(avgByChange);

    //! Output : 
    //! Average Finalists: 15.06
    //! [
    // !  { _id: 'negative', avgFinalists: 12.818181818181818 },
    //  ! { _id: 'positive', avgFinalists: 31.5 }
    //! ]

  } catch (error) {
    console.log(error);
  } finally {
    const admin = client.db(dbName).admin();

    await client.db(dbName).dropDatabase();
    // console.log(await admin.listDatabases());

    client.close();
  }
}

main();
