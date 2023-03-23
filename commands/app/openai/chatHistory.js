const User = require("@libs/controllers/dataController");
const { trimString } = require("@libs/functions/myFunc");
const { message, metaData } = require("../../../config/settings");

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["mychat", "history", "history"],
  category: "private",
  description: "Get an User history chat",
  callback: async ({ client, msg, prefix }) => {
    msg.react(metaData.reactEmote);
    const DataUser = await User.getUserData(msg.senderNumber);
    if (DataUser == null || !DataUser || !DataUser.dataChat) {
      return msg.reply(message.noSession);
    } else if (DataUser) {
      const { dataChat, created, token, totalUsage } = DataUser;
      if (!dataChat || dataChat.length < 1) {
        return msg.reply(message.noSession);
      } else {
        let sections = [
          {
            title: message.titleHistoryChat,
            rows: [],
          },
          {
            title: "Quick Actions",
            rows: [
              {
                title: message.subtleDeleteSession,
                rowId: prefix + "clear",
                description: message.descSubtleSession,
              },
              {
                title: message.subtleDeleteHistory,
                rowId: prefix + "delete-my-history",
                description: message.descSubtleHistory,
              },
              {
                title: "Contact Admin",
                rowId: prefix + "getadmin",
                description: "Get Admin Contact",
              },
            ],
          },
        ];
        const historyChatData = dataChat.map(
          (val) => ({
            title: trimString(val.user, 80),
            rowId: prefix + "getchat" + " " + val.key,
            description: val.timeStamp,
          }),
          {}
        );
        sections[0].rows.push(...historyChatData);

        return client
          .sendMessage(msg.from, {
            title: "OpenAi Chat History",
            text: message.userInfoData({
              pushName: msg.pushName,
              totalUsage,
              chatLength: dataChat.length,
              remainingToken: token,
              created,
            }),
            footer: message.footerListHistory,
            buttonText: "OpenAi Chat History",
            sections,
            viewOnce: true,
            mentions: [msg.sender],
          })
          .catch((e) => {
            console.error(e);
            return msg.reply(message.hasError);
          });
      }
    }
  },
};
