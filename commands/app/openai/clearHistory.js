const User = require("@libs/controllers/dataController");
const { message, metaData } = require("../../../config/settings");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["delete-my-history"],
  category: "private",
  description: "Delete User chat sessions",
  waitMessage: message.waitMessage,
  callback: async ({ msg }) => {
    msg.react(metaData.reactEmote);
    const DataUser = await User.getUserData(msg.senderNumber);
    if (DataUser == null || !DataUser || !DataUser.sessionChat) {
      return msg.reply(message.noSession);
    } else if (DataUser) {
      const { dataChat } = DataUser;
      if (dataChat.length < 1) {
        return msg.reply(message.noSession);
      } else {
        await User.deleteUserDataHistory(msg.senderNumber).then((res) => {
          console.log(res);
          return msg.reply(message.deleteHistorySuccess);
        });
      }
    }
  },
};
