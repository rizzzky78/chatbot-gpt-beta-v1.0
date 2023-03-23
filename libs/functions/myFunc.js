const moment = require("moment-timezone");
const axios = require("axios");
const BodyForm = require("form-data");
const lzString = require("lz-string");
const { existsSync, createReadStream } = require("fs");
const cryptoRandomString = require("crypto-random-string");

const Runtime = (seconds) => {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};
/**
 * @param {number} num
 * @returns Crypto Random String Upper Case
 * @example
 * IDMaker(5) => "7DE5X"
 */
const IDMaker = (num) => {
  return cryptoRandomString(num).toUpperCase();
};
/**
 * Date Maker
 * @returns String
 * @example
 * Format: "Day" + "Month" + "Year" + "Local Time"
 * DateMaker() => String<"Senin 13 Maret 2023, 19:45:05 WIB">
 */
const DateMaker = () => {
  let makeDate = moment()
    .tz("Asia/Jakarta")
    .locale("id")
    .format("dddd D MMMM YYYY, H:mm:ss");
  return makeDate + " " + "WIB";
};
/**
 * Trim specified length from String
 * @param {string} str
 * @param {number} maxLength
 */
const trimString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + "...";
  }
  return str;
};

module.exports = {
  Runtime,
  IDMaker,
  DateMaker,
  trimString,
};
