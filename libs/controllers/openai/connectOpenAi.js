const { openAiApikey } = require("../../../config/settings").metaData;
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: openAiApikey,
});
/**
 * ***OpenAI API Configurations***
 */
const openAi = new OpenAIApi(configuration);

module.exports = openAi;
