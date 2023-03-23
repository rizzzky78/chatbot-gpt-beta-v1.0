const User = require("@libs/controllers/dataController");
const { message, metaData } = require("../../../config/settings");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["clear"],
  category: "private",
  description: "Delete User chat sessions",
  callback: async ({ msg }) => {
    msg.react(metaData.reactEmote);
    const DataUser = await User.getUserData(msg.senderNumber);
    if (DataUser == null || !DataUser || !DataUser.sessionChat) {
      return msg.reply(message.noSession);
    } else if (DataUser) {
      await User.clearUserDataSession(msg.senderNumber).then(() => {
        return msg.reply(message.deleteSessionSuccess);
      });
    }
  },
};
