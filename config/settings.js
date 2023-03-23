/**
 * **Message Handler**
 *
 * Available Language ["english", "indonesia"]
 *
 * example uses:
 * ```ts
 * const message = require("./messageLang").ID // for inonesian
 * // or
 * const message = require("./messageLang").ENG // for english
 * ```
 */
const message = require("./messageLang").ID;
/**
 * **Meta Data Chatbot**
 *
 * - `sessionName` merupakan folder session login WhatsApp
 * - `openAiApikey` isi dengan `APIKEY OpenAI` yang kamu miliki
 * - `superAdmin` merupakan Data Admin yang dapat memanipulasi Data User
 * - `developer` merupakan Data Developer yang membuat aplikasi ini
 * - `users.cooldownCmdTime` cooldown setiap perintah yang digunakan user
 * - `initialToken` token awal User saat memakai Chatbot ini
 */
const metaData = {
  sessionName: "chatbot-marketplace",
  openAiApikey: "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",
  superAdmin: {
    name: "Rizzzuky-san",
    number: "6281329585825",
  },
  developer: {
    number: "6281329585825",
  },
  users: {
    cooldowmCmdTime: 10000, // in miliseconds
    initialToken: 5000,
  },
  reactEmote: "👀",
};
/**
 * **MongoDB Configurations**
 *
 * Paste link `URI` dibawah, yang sudah termasuk `username` dan `password`. Tidak perlu setup, hanya link `URI` saja.
 * Contoh link `URI` `mongodb://username_kamu:password_kamu@ac-xtaqo4g-shard-00-00.w7oyxwa.mongodb.net...`
 *
 * Driver yang digunakan yaitu `NodeJS` API Version `v2.2.12`
 *
 * `DATABASE` & `COLLECTION` tidak perlu di setup/diganti, akan otomatis terbuat.
 */
const ATLAS = {
  URI: "mongodb://rizzzky:DEV@ac-xtaqo4g-shard-00-00.w7oyxwa.mongodb.net:27017,ac-xtaqo4g-shard-00-01.w7oyxwa.mongodb.net:27017,ac-xtaqo4g-shard-00-02.w7oyxwa.mongodb.net:27017/?ssl=true&replicaSet=atlas-yds57g-shard-0&authSource=admin&retryWrites=true&w=majority",
  DATABASE: "ChatGPT-Bot",
  COLLECTION: {
    CLIENT: "data-client",
    STATICTICS: "data-statistics",
  },
};

module.exports = { message, metaData, ATLAS };

/**
 * Script Aplikasi ini merupakan murni buatan sendiri, terkecuali Library yang dipakai: Baileys
 * dan Module template public Whatsapp Bot yang banyak ditemukan di platform Github
 */
