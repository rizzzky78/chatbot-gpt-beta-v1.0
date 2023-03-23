/**
 * ***Message Handler***
 */
const messageLangENG = {
  waitMessage: "Please wait...",
  hasError: "An Error occured, please try again in a few moment.",
  noQuery:
    "Please input some prompt\nExample: /ai Make a recipes from baked pork",
  noSession: "You do not have any sessions or chats history to show",
  noChatData: "There is no chat to show, probably you delete the Chats History",
  deleteSessionSuccess: "Your sessions has been cleared!",
  deleteHistorySuccess: "Your History has been deleted!",
  noEntryID: "There is no ID to be changed!",
  noValidID:
    "The ID is not valid!\nUse command */getuser* to get all user data\n\nExample: /settoken 123BC 5000",
  noUsers: "There is no Users right now",
  notSuperAdmin: "You are not super Admin!",
  changeUserTokenSuccess: "The user token was succesfully changed!",
  limitedTokens:
    "Yout tokens has limit!, please contact Admin to buy tokens\nType /admin to get the contact",
  greetingsDahsboard:
    "*Welcome to OpenAI Chat Dashboard!*\nIn here you can Chat as like in ChatGPT website, the Chatbot will remember of your context or previous chat!\nYou can train the models by given an prompt step-by-step to solve your problems!\n\nModels that are curently used is *gpt-3.5-turbo*\nThe response time is various based on your prompt length or your context.\n\nAnother Capabilities, you can also:\n- Clear the chat context to start new topics by using command */clear*\n- Access the Chat History by using command */history* it will give you:\n> Chat List\n> Command to *Clear Chat* and *Delete Chat History*\n\nTo start new chat, use command */ai Your Prompt*\nExample: /ai Does chatGPT human friendly?\n\nCheers!",
  chatFooter:
    'type: "/clear" to start new topics, "/history" to show your chats history',
  tryNowFoot: "Want to try it now?, click the button below",
  buttonTextcapability: "What you can do for Me?",
  assistantContentStart: "You are helpfull assistant",
  userContentStart:
    "Show me your capability, what you can do and what you cannot do",
  titleHistoryChat: "Chat History",
  subtleDeleteSession: "Delete My Session Chat",
  subtleDeleteHistory: "Delete My Chat History",
  descSubtleSession: "Delete and end your session chat to start new topics",
  descSubtleHistory: "Delete all of your history chat",

  /**
   *
   * @param {{pushName: string, totalUsage, chatLength, remainingToken, created}} dataForm
   * @returns
   */
  userInfoData: (dataForm) => {
    let { pushName, totalUsage, chatLength, remainingToken, created } =
      dataForm;
    return `Hello ${pushName}!\n\nTotal Usage:\n${totalUsage} times\n\nYour Total Chat History\n${chatLength} chats\n\nYour Remaining Tokens\n${remainingToken} tokens\n\nCreated:\n${created}\n`;
  },
  userRegularInfoData: (dataForm) => {
    let { pushName, dataChat, created } = dataForm;
    return `Hello ${pushName}!\n\nTotal Histori Chat Kamu\n${dataChat.length} chat\n\nDibuat:\n${created}\n`;
  },
  footerListHistory: "Click the button to open history chat",
};

/**
 * **Message Handler**
 */
const messageLangID = {
  waitMessage: "Mohon tunggu...",
  hasError: "Terjadi kesalahan, mohon coba lagi dalam beberapa saat.",
  noQuery:
    "Silakan masukkan prompt\nContoh: /ai Buat resep dari daging babi panggang",
  noSession: "Kamu tidak memiliki sesi atau riwayat chat untuk ditampilkan",
  noChatData:
    "Tidak ada chat yang ditampilkan, mungkin Kamu telah menghapus Riwayat Chat",
  deleteSessionSuccess: "Sesi Kamu telah dihapus!",
  deleteHistorySuccess: "Riwayat Kamu telah dihapus!",
  noEntryID: "Tidak ada ID yang akan diubah!",
  noValidID:
    "ID tidak valid!\nUntuk mendapatkan data user gunakan perintah */getuser*\n\nContoh: /settoken 123BC 5000",
  noUsers: "Tidak ada pengguna Chatbot",
  notSuperAdmin: "Kamu bukan super Admin!",
  changeUserTokenSuccess: "Token pengguna berhasil diubah!",
  limitedTokens:
    "Token Kamu memiliki batas!, silakan hubungi Admin untuk membeli token\nKetik */admin* untuk mendapatkan kontak",
  greetingsDahsboard:
    "*Selamat datang di Dashboard Chat OpenAI!*\n\nDi sini Kamu dapat melakukan chat seperti di situs ChatGPT, Chatbot akan mengingat konteks atau chat sebelumnya!\nKamu dapat melatih model dengan memberikan prompt langkah demi langkah untuk menyelesaikan masalah Kamu!\n\nModel yang saat ini digunakan adalah *gpt-3.5-turbo*\nWaktu respon bervariasi tergantung pada panjang prompt atau konteks Kamu.\n\nKemampuan lainnya, Kamu juga dapat:\n- Menghapus konteks chat untuk memulai topik baru dengan menggunakan perintah */clear*\n- Mengakses Riwayat Chat dengan menggunakan perintah */history* dan Kamu dapat mengakses:\n> Daftar Chat, pilih untuk mengakses data percakapan\n> Perintah untuk *Hapus Chat* dan *Hapus Riwayat Chat*\n\nUntuk memulai chat baru, gunakan perintah */ai Prompt Kamu*\nContoh: /ai Apakah chatGPT ramah pengguna?\n\nCheers!",
  chatFooter:
    'ketik: "/clear" untuk memulai topik baru, "/history" untuk melihat histori percakapan',
  tryNowFoot: "Ingin mencoba sekarang?, ketuk tombol dibawah",
  buttonTextcapability: "Apa yang bisa kamu lakukan untuk Saya?",
  assistantContentStart: "Kamu dalah asisten yang sangat membantu",
  userContentStart:
    "Apa kapabilitas kamu, apa saja yang dapat kamu lakukan dan tidak bisa kamu lakukan?",
  titleHistoryChat: "Riwayat Percakapan",
  subtleDeleteSession: "Bersihkan Sesi Percakapan Saya",
  subtleDeleteHistory: "Hapus Riwayat Percakapan Saya",
  descSubtleSession:
    "Hapus konteks chat sebelumnya dan mulai dengan topik baru",
  descSubtleHistory: "Hapus semua Histori Percakapan Kamu",

  /**
   *
   * @param {{pushName: string, totalUsage, chatLength, remainingToken, created}} dataForm
   * @returns
   */
  userInfoData: (dataForm) => {
    let { pushName, totalUsage, chatLength, remainingToken, created } =
      dataForm;
    return `Hello ${pushName}!\n\nTotal Penggunaan:\n${totalUsage} kali\n\nTotal Riwayat Chat Kamu\n${chatLength} chats\n\nSisa Token Kamu\n${remainingToken} tokens\n\nDibuat:\n${created}\n`;
  },
  userRegularInfoData: (dataForm) => {
    let { pushName, dataChat, created } = dataForm;
    return `Hello ${pushName}!\n\nTotal Histori Chat Kamu\n${dataChat.length} chat\n\nDibuat:\n${created}\n`;
  },
  footerListHistory: "Klik tombol dibawah untuk membuka riwayat percakapan",
};
const Lang = { ENG: messageLangENG, ID: messageLangID };

module.exports = Lang;
