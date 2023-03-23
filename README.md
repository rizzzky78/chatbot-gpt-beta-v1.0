<div align="center">
<img src="https://i.ibb.co/gFwRBkd/lolhuman.png" width="150" height="150" border="0" alt="PFP">

# Chatbot Marketplace

<p align="center">

</p>

## [![JavaScript](https://img.shields.io/badge/JavaScript-d6cc0f?style=for-the-badge&logo=javascript&logoColor=white)](https://www.javascript.com) [![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![MongoDB](https://img.shields.io/badge/MongoDB-43853D?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)

Lightweight WhatsApp Bot - For Production Use

</div>

## 📑 Highlights

-   Using Plugin, easy to maintenance without retarting apps (hot reload)

-   Lightweight Module

-   Organized Module Tree

---

## Requirements

- [Node.js](https://nodejs.org/en/)

- [Git](https://git-scm.com/downloads)

---

## 📌 Install Dependencies

-   Via NPM

```cmd
$ npm install
```

-   Intsall PM2 Module

```cmd
$ npm install pm2 - g
```

---

## 📕 Setup Databse

-   Visit [MongoDB website](https://www.mongodb.com/) to get URI

-   Make an account if not have, folow step-by-step

-   In Main Page, `connect your application`, the driver used is `Node.js` version `v2.2.12`

-   Example URI Link `mongodb://USERNAME_KAMU:PASSWORD_KAMU@ac-xtaqo4g-shard-00-00.w7oyxwa.mongodb.net:27017,ac-xtaqo4g-shard-00-01.w7oyxwa.mongodb.net:27017,ac-xtaqo4g-shard-00-02.w7oyxwa.mongodb.net:27017/?ssl=true&replicaSet=atlas-yds57g-shard-0&authSource=admin&retryWrites=true&w=majority`

-   Open folder `./config/settings.js`

-   Edit value `ATLAS.URI`, Paste the URI (included Username & Password)

---

## 📗 Setup PM2

-   Login or register new account [PM2](pm2.io)

-   Connect, get APIKEY PM2

-   Integrate APIKEY PM2 to server 

```cmd
$ pm2 link YOUR_APIKEY_1 YOUR_APIKEY_2
```

-   If all set, go to `RUN`

---

## ▶️ Run

-   Production mode (Restart otomatis setiap 5 jam sekali)

```cmd
$ npm start
```

-   PM2 Mode

```cmd
$ pm2 start index.js
```

-   Regular / Development Mode (with Nodemon)

```cmd
$ node index
```

-   Develelopment Mode (without Nodemon)

```cmd
$ npm i -g nodemon
$ nodemon
```

---

## 💪 Contributing

Hello, im Rizky
Im solo programmer, my stack only in NodeJS app (typeScript and javaScript)
My Majority is on Chatbot or Automation

Literaly this project is my second-project
And I barely completed it by myself, there is no help from anyone (except the internet :3)

Feel Free to Modificate or Continue this Project!

---

## 🙏 Special Thanks To

-   Allah SWT
