const openAi = require("./connectOpenAi");

/**
 * ***OpenAi Create Text Completion***
 *
 * Input an Array to give GPT a context
 * @param { [ { role: "user", content: string }, null | { role: "assistant". content: string } ] } chatQuery
 * @returns
 */
const createCompletion = async (chatQuery) => {
  const Data = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: chatQuery,
  });
  console.info("Log Completions: " + JSON.stringify(Data.data.usage, null, 2));
  return {
    /** **Assistant Response** */
    answer: Data.data.choices[0].message.content.trim(),
    /** **CreateChatCompletionUsage** */
    usage: {
      /** Total Prompt Tokens */
      promptTokens: Data.data.usage.prompt_tokens,
      /** Total Completion Tokens */
      completionTokens: Data.data.usage.completion_tokens,
      /** Overall Total Tokens */
      totalTokens: Data.data.usage.total_tokens,
    },
  };
};
/**
 * ***OpenAI Generations***
 */
const OpenAi = {
  createCompletion,
};
module.exports = OpenAi;
