"use-strict";

const collections = require("./Router");
const { IDMaker, DateMaker } = require("../functions/myFunc");

/**
 * Create New User, instance for session chat
 * @param { { userNumber: string, userName: string } } dataUser
 * @param { { prompt: userPrompt, answer: openAIResponse } } dataChat
 * @returns
 */
const createUserData = async (dataUser, dataChat) => {
  const { prompt, answer } = dataChat;
  const { userNumber, userName } = dataUser;
  const Form = {
    userNumber,
    userName,
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
 * @returns
 */
const updateUserData = async (userNumber, dataChat) => {
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
    }
  );

  return { upsertData, dataChat };
};
/**
 * Get the User Data
 * @param { string } userNumber
 * @returns Object
 * @example
 * // example return data
 * await getUserData("6281xxx") => Promise<{
 *  userNumber: string,
 *  userName: string,
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
 * Get All User Data
 * @returns Array
 * @example
 * // example return data
 * await getAllUserData() => Promise <{
 *  Array [
 *    Object {
 *      userNumber: string,
 *      userName: string,
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
 * Get User Specified Data Chat
 * @param { string } key
 * @param { [ { key: string, user: string, assistant: string, timeStamp: string } ] } dataChat
 * @returns Object
 * @example
 * // example usage & return data
 * const { dataChat } = await getUserData("user number")
 * getHistoryChatByKey("key", dataChat) => <{
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
 * ***User Data Controller***
 */
const User = {
  createUserData,
  updateUserData,
  clearUserDataSession,
  deleteUserDataHistory,
  getUserData,
  getAllUserData,
  getHistoryChatByKey,
};

module.exports = User;
