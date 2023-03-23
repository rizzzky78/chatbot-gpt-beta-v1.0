const { superAdmin, reactEmote } = require("../../../config/settings").metaData;

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ["admin"],
  description: "Admin OpenAi Chatbot",
  callback: async ({ client, msg }) => {
    const vcard =
      "BEGIN:VCARD\n" +
      "VERSION:3.0\n" +
      `FN:${superAdmin.name}\n` +
      `ORG:Admin Service Platform OpenAi Chat;\n` +
      `TEL;type=CELL;type=VOICE;waid=${superAdmin.number}:+${superAdmin.number}\n` +
      "END:VCARD";
    return client.sendMessage(msg.from, {
      contacts: {
        displayName: superAdmin.name,
        contacts: [{ vcard }],
      },
    });
  },
};
