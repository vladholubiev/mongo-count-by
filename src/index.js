import {MongoClient} from 'mongodb';

let db;

/**
 * Init MongoDB connection by Mongo URL
 * @param {String} url URL to connect to mongo
 */
export async function init(url) {
  db = await MongoClient.connect(url);
}

/**
 * Get object with counts of documents by field
 * @param {String} collectionName Name of collection to aggregate on
 * @param {String} field Field name to count by
 * @return {Promise.<Object>} Object with counts in fieldValue/count format
 */
export async function countBy(collectionName, field) {
  const collection = db.collection(collectionName);
  const pipeline = [
    {
      $group: {
        _id: `$${field}`,
        count: {$sum: 1}
      }
    },
    {
      $sort: {
        count: -1
      }
    }
  ];

  const results = await collection.aggregate(pipeline).toArray();

  return results.reduce((memo, value) => {
    memo[value._id] = value.count;
    return memo;
  }, {});
}
