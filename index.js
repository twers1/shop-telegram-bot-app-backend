const TelegramBot = require('node-telegram-bot-api');

const token = '5679319822:AAEdpnGEsgaW1ofjFwbtj7h8NihRw9dn6RU';
const webAppUrl = 'https://heroic-empanada-97d0d5.netlify.app'
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if(text === '/start'){
    await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
        reply_markup: {
            keyboard:[
                [{text: 'Заполнить форму '}]
            ]
        }
    })
    await bot.sendMessage(chatId, 'Заходи на наш сайт', {
        reply_markup: {
            inline_keyboard:[
                [{text: 'Сделать заказ ', web_app:{url: webAppUrl}}]
            ]
        }
    })
  }

  
  bot.sendMessage(chatId, 'Received your message');
});