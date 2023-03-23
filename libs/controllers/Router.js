const atlasConnect = require("../connection/mongodbDriver")
const { DATABASE, COLLECTION } = require("../../config/settings").ATLAS;

const Database = atlasConnect.db(DATABASE);

/**
 * **A collection from Databases**
 */
const collections = {
  userData: Database.collection(COLLECTION.CLIENT),
  botStatistics: Database.collection(COLLECTION.STATICTICS),
};

module.exports = collections;
