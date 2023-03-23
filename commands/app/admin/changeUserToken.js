const Admin = require("@libs/controllers/dataController");
const { message, metaData } = require("../../../config/settings");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["settoken"],
  category: "private",
  description: "OpenAi Chatbot",
  waitMessage: message.waitMessage,
  callback: async ({ msg, args }) => {
    if (!msg.senderNumber === metaData.superAdmin.number) {
      return msg.reply(message.notSuperAdmin);
    } else {
      if (!args[0] || !args[1]) {
        return msg.reply(message.noEntryID);
      } else if (args[0] && args[1]) {
        const userData = await Admin.getUserDataByID(args[0]);
        if (!userData) {
          return msg.reply(message.noValidID);
        } else if (userData) {
          await Admin.changeUserToken(args[0], parseInt(args[1].trim())).then(() => {
            return msg.reply(message.changeUserTokenSuccess);
          });
        }
      }
    }
  },
};
