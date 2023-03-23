const superAdmin = require("@libs/controllers/dataController");
const { message, metaData } = require("../../../config/settings");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["getuser"],
  category: "private",
  description: "OpenAi Chatbot",
  waitMessage: message.waitMessage,
  callback: async ({ msg }) => {
    if (!msg.senderNumber === metaData.superAdmin.number) {
      return msg.reply(message.notSuperAdmin);
    } else {
      msg.react(metaData.reactEmote);
      await superAdmin
        .getAllUserData()
        .then(async (userData) => {
          if (!userData || userData.length < 1) {
            return msg.reply(message.noUsers);
          } else {
            const totalHit = await superAdmin.getStatisticsData();
            return msg.reply(
              "*Usage And List User*\n\n" +
                `Total Global Usage: ${totalHit.length}\n\n` +
                "*List All User Data*\n\n" +
                userData
                  .map(
                    (val, index) =>
                      `No ${index + 1}\nUserID: ${val.userID}\nUsernumber: ${
                        val.userNumber
                      }\nUsername: ${val.userName}\nRemaining Token: ${
                        val.token
                      }\nUsage: ${val.totalUsage} times\n`
                  )
                  .join("\n")
            );
          }
        })
        .catch((e) => {
          console.error(new Error(e));
          return msg.reply(message.hasError);
        });
    }
  },
};
