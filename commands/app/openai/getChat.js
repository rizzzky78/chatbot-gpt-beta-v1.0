const User = require("@libs/controllers/dataController");
const { message, metaData } = require("../../../config/settings");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["get-my-chat"],
  category: "private",
  description: "Get users data chat",
  waitMessage: message.waitMessage,
  callback: async ({ msg, args }) => {
    msg.react(metaData.reactEmote);
    const DataUser = await User.getUserData(msg.senderNumber);
    if (DataUser == null || !DataUser || !DataUser.sessionChat) {
      return msg.reply(message.noSession);
    } else if (DataUser) {
      const { dataChat } = DataUser;
      if (!dataChat || dataChat.length < 1) {
        return msg.reply(message.noSession);
      } else {
        const DataChat = User.getHistoryChatByKey(args[0], dataChat);
        if (!DataChat) {
          return msg.reply(message.noChatData);
        } else if (DataChat) {
          const { user, assistant, timeStamp } = DataChat;
          return msg.reply(
            `*Pertanyaan*\n${user.trim()}\n\n*Jawaban*\n${assistant.trim()}\n\n_Created: ${timeStamp}_`
          );
        }
      }
    }
  },
};
