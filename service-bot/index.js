const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;
const webAppUrl = 'https://service-front.fenoty.ru/';
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     const text = msg.text;
//     if (text === "/ss") {
//         bot.sendMessage(chatId, bot.appWebViewResultUrl);
//     }
// });
// bot.on("message", async (msg) => {
//     const chatId = msg.chat.id;
//     const text = msg.text;

//     if (text === "/start") {
//         await bot.sendMessage(chatId, 'Ниже появится кнопка', {
//             reply_markup: {
//                 inline_keyboard: [
//                     [{text: 'Открыть сайт INLINE', web_app: {url: webAppUrl}}]
//                 ],
//             }
//         })
//         await bot.sendMessage(chatId, 'Ниже появится кнопка', {
//             reply_markup: {
//                 keyboard: [
//                     [{text: 'Открыть сайт', web_app: {url: webAppUrl}}]
//                 ]
//             }
//         })
//     }

//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, "Default message");
// });
