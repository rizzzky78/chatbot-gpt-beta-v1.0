"use-strict";

const collections = require("./Router");
const { IDMaker, DateMaker } = require("../functions/myFunc");
const { users } = require("../../config/settings").metaData;

/**
 * Create New User, instance for session chat
 * @param { string } userNumber
 * @param { string } userName
 * @param { { prompt: userPrompt, answer: openAIResponse } } dataChat
 * @returns
 */
const createUserData = async (userNumber, userName, dataChat) => {
  const { prompt, answer } = dataChat;
  const Form = {
    userID: IDMaker(5),
    userNumber,
    userName,
    token: users.initialToken,
    totalUsage: 1,
    created: DateMaker(),
    sessionChat: [
      {
        role: "user",
        content: prompt,
      },
      {
        role: "assistant",
        content: answer,
      },
    ],
    dataChat: [
      {
        key: IDMaker(7),
        user: prompt,
        assistant: answer,
        timeStamp: DateMaker(),
      },
    ],
  };
  const Data = await collections.userData.insertOne(Form);
  return { Data, Form };
};
/**
 * Update User Session Chat, and append Given Data to User History
 * @param { string } userNumber
 * @param { { prompt: userPrompt, answer: openAIResponse } } dataChat
 * @param { number } updateUsage
 * @returns
 */
const updateUserData = async (userNumber, dataChat, updateUsage) => {
  const { prompt, answer } = dataChat;
  const upsertData = await collections.userData.findOneAndUpdate(
    { userNumber },
    {
      $push: {
        sessionChat: {
          $each: [
            {
              role: "user",
              content: prompt,
            },
            {
              role: "assistant",
              content: answer,
            },
          ],
        },
        dataChat: {
          $each: [
            {
              key: IDMaker(7),
              user: prompt,
              assistant: answer,
              timeStamp: DateMaker(),
            },
          ],
        },
      },
      $set: {
        totalUsage: updateUsage,
      },
    }
  );

  return { upsertData, dataChat };
};
/**
 * Update / Change User Tokens
 * @param { string } userNumber
 * @param { number } tokenChanges
 */
const updateUserToken = async (userNumber, tokenChanges) => {
  return await collections.userData.findOneAndUpdate(
    { userNumber },
    { $set: { token: tokenChanges } }
  );
};
/**
 * Get the User Data
 * @param { string } userNumber
 * @returns Object
 * @example
 * // example return data
 * await getUserData("6281xxx") => Promise<{
 *  userID: string,
 *  userNumber: string,
 *  userName: string,
 *  token: number,
 *  totalUsage: number
 *  sessionChat: Array [
 *    { role: "user", content: string },
 *    { role: "assistant", content: string }.
 *    { ... }
 *  ],
 *  dataChat: Array [
 *    {
 *      key: string,
 *      user: prompt,
 *      assistant: answer,
 *      timeStamp: string
 *    },
 *    {
 *      ...
 *    }
 *  ]
 * }>
 */
const getUserData = async (userNumber) => {
  return await collections.userData.findOne({ userNumber });
};
/**
 *
 * @param { string } userID
 * @returns
 */
const getUserDataByID = async (userID) => {
  return await collections.userData.findOne({ userID: userID.trim() });
};
/**
 * Get All User Data
 * @returns Array
 * @example
 * // example return data
 * await getAllUserData() => Promise <{
 *  Array [
 *    Object {
 *      userID: string,
 *      userNumber: string,
 *      userName: string,
 *      token: number,
 *      totalUsage: number,
 *      created: string,
 *      sessionChat: Array [Object],
 *      dataChat: Array [Object]
 *    }
 *  ]
 * }>
 */
const getAllUserData = async () => {
  return await collections.userData.find().toArray();
};
/**
 * Clear User Session Chat, and start from scratch
 * @param { string } userNumber
 * @returns
 */
const clearUserDataSession = async (userNumber) => {
  return await collections.userData.findOneAndUpdate(
    { userNumber },
    {
      $set: {
        sessionChat: [],
      },
    }
  );
};
/**
 * Delete User History Data Chat
 * @param { string } userNumber
 * @returns
 */
const deleteUserDataHistory = async (userNumber) => {
  return await collections.userData.findOneAndUpdate(
    { userNumber },
    {
      $set: {
        dataChat: [],
      },
    }
  );
};
/**
 * Changes User Token By userID
 * @param { string } userID
 * @param { number } tokenToChange
 * @returns
 */
const changeUserToken = async (userID, tokenToChange) => {
  return await collections.userData.findOneAndUpdate(
    { userID: userID.trim() },
    {
      $set: { token: tokenToChange },
    }
  );
};
/**
 * Get User Specified Data Chat
 * @param { string } key
 * @param { [ { key: string, user: string, assistant: string, timeStamp: string } ] } dataChat
 * @returns Object
 * @example
 * // example usage & return data
 * const { dataChat } = await getUserData("user number")
 * await getHistoryChatByKey("key", DataChat) => <{
 *  Object {
 *   key: string,
 *   user: string,
 *   assistant: string,
 *   timeStamp: string
 *  }
 * }>
 */
const getHistoryChatByKey = (key, dataChat) => {
  return dataChat.find((selectChat) => selectChat.key === key.trim());
};
/**
 * Update Statistics
 * @param { { userNumber: string, userName: string, tokenConsume: number } } dataStatictics
 * @returns
 */
const updateStatistics = async (dataStatictics) => {
  const { userNumber, userName, tokenConsume } = dataStatictics;
  const Form = {
    userNumber,
    userName,
    tokenConsume,
    date: DateMaker(),
  };
  const Data = await collections.botStatistics.insertOne(Form);
  return { Data, Form };
};
const getStatisticsData = async () => {
  return await collections.botStatistics.find().toArray();
};

/**
 * ***User Data Controller***
 */
const User = {
  createUserData,
  updateUserData,
  clearUserDataSession,
  deleteUserDataHistory,
  getUserData,
  getUserDataByID,
  getAllUserData,
  getHistoryChatByKey,
  updateStatistics,
  getStatisticsData,
  updateUserToken,
  changeUserToken,
};

module.exports = User;
