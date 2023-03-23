const User = require("@libs/controllers/dataController");
const OpenAi = require("@libs/controllers/openai/handlerOpenAi");
const { message, metaData } = require("../../../config/settings");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["ai"],
  category: "private",
  description: "OpenAi Chatbot",
  cooldown: metaData.users.cooldowmCmdTime,
  callback: async ({ client, msg, args, fullArgs }) => {
    if (!args[0]) {
      return msg.reply(message.noQuery);
    }
    msg.react(metaData.reactEmote).then(async () => {
      await User.getUserData(msg.senderNumber).then(async (DataUser) => {
        if (!DataUser) {
          await OpenAi.createCompletion([
            {
              role: "user",
              content: fullArgs,
            },
          ])
            .then(async ({ answer, usage }) => {
              await User.createUserData(msg.senderNumber, msg.pushName, {
                prompt: fullArgs,
                answer,
              }).then(async ({ Form }) => {
                await User.updateUserToken(
                  msg.senderNumber,
                  Form.token - usage.completionTokens
                );
                await User.updateStatistics({
                  userNumber: msg.senderNumber,
                  userName: msg.pushName ? msg.pushName : "No Name",
                  tokenConsume: usage.totalTokens,
                });

                return client.sendMessage(msg.from, {
                  text: answer,
                  footer: message.chatFooter,
                  viewOnce: true,
                  mentions: [msg.sender],
                });
              });
            })
            .catch((e) => {
              console.error(new Error(e));
              return msg.reply(message.hasError);
            });
        } else if (DataUser) {
          /**
           * @constant { sessionChat: [ { role: string, content: string } ], token: number, totalUsage: number } DataUser
           */
          const { sessionChat, token, totalUsage } = DataUser;
          if (!sessionChat) {
            await OpenAi.createCompletion([
              {
                role: "user",
                content: fullArgs,
              },
            ])
              .then(async ({ answer, usage }) => {
                if (usage.completionTokens > token) {
                  return msg.reply(message.limitedTokens);
                } else {
                  await User.updateUserData(
                    msg.senderNumber,
                    {
                      prompt: fullArgs,
                      answer,
                    },
                    totalUsage + 1
                  ).then(async () => {
                    await User.updateUserToken(
                      msg.senderNumber,
                      token - usage.completionTokens
                    );
                    await User.updateStatistics({
                      userNumber: msg.senderNumber,
                      userName: msg.pushName ? msg.pushName : "No Name",
                      tokenConsume: usage.totalTokens,
                    });
                    return msg.reply(answer);
                  });
                }
              })
              .catch((e) => {
                console.error(new Error(e));
                return msg.reply(message.hasError);
              });
          } else if (sessionChat) {
            await OpenAi.createCompletion([
              ...sessionChat,
              { role: "user", content: fullArgs },
            ])
              .then(async ({ answer, usage }) => {
                if (usage.completionTokens > parseInt(token)) {
                  return msg.reply(message.limitedTokens);
                } else {
                  await User.updateUserData(
                    msg.senderNumber,
                    {
                      prompt: fullArgs,
                      answer,
                    },
                    totalUsage + 1
                  ).then(async () => {
                    await User.updateUserToken(
                      msg.senderNumber,
                      token - usage.completionTokens
                    );
                    await User.updateStatistics({
                      userNumber: msg.senderNumber,
                      userName: msg.pushName ? msg.pushName : "No Name",
                      tokenConsume: usage.totalTokens,
                    });
                    return msg.reply(answer);
                  });
                }
              })
              .catch((e) => {
                console.error(new Error(e));
                return msg.reply(message.hasError);
              });
          }
        }
      });
    });
  },
};
