const { MongoClient, ServerApiVersion } = require("mongodb");
const { URI } = require("../../config/settings").ATLAS;

const atlasConnect = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = atlasConnect;
