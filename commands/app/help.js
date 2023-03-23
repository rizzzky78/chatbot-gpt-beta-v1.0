const OpenAi = require("@libs/controllers/openai/handlerOpenAi");
const { message } = require("../../config/settings");

const { readFileSync } = require("fs");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["help", "bantuan", "panel"],
  category: "private",
  description: "OpenAi Chatbot",
  waitMessage: message.waitMessage,
  callback: async ({ client, msg, args, prefix }) => {
    if (!args[0]) {
      return client.sendMessage(msg.from, {
        caption: `*Hi ${msg.pushName}!*\n${message.greetingsDahsboard}\n`,
        footer: message.tryNowFoot,
        video: readFileSync("./store/images/dashboard-panel.mp4"),
        gifPlayback: true,
        templateButtons: [
          {
            index: 1,
            quickReplyButton: {
              displayText: message.buttonTextcapability,
              id: prefix + "help tour",
            },
          },
        ],
        viewOnce: true,
        mentions: [msg.sender],
      });
    } else if (args[0] === "tour") {
      await OpenAi.createCompletion([
        {
          role: "assistant",
          content: message.assistantContentStart,
        },
        {
          role: "user",
          content: message.userContentStart,
        },
      ])
        .then(({ answer }) => {
          return msg.reply(answer)
        })
        .catch((e) => {
          console.error(new Error(e));
          return msg.reply(message.hasError);
        });
    }
  },
};
