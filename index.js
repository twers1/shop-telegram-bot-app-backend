const TelegramBot = require('node-telegram-bot-api');
const express = require('express')
const cors = require('cors')

const token = '5679319822:AAEdpnGEsgaW1ofjFwbtj7h8NihRw9dn6RU';
const webAppUrl = 'https://heroic-empanada-97d0d5.netlify.app'
const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if(text === '/start'){
    await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
        reply_markup: {
            keyboard:[
                [{text: 'Заполнить форму ', web_app: {url: webAppUrl + '/form'}}]
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
  if(text === '/info'){
    await bot.sendMessage(chatId, 'Если у вас остались вопросы, то вам сюда -> @feedbackArmenianHomeBot', {
    })
  }

  if(msg?.web_app_data?.data) {
    try {
        const data = JSON.parse(msg?.web_app_data?.data)

        await bot.sendMessage(chatId,'Спасибо за обратную связь! ')
        await bot.sendMessage(chatId,'Ваше ФИО: ' + data?.fio);
        await bot.sendMessage(chatId,'Ваша улица: ' + data?.street);

        setTimeout(async () => {
            await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате ');

        }, 3000)
        
    } catch(e){
        conlose.log(e);
    }
    
  }
});

app.post('/web-data', async (req, res) => {
    const {queryId, products = [], totalPrice} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: {
                message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products.map(item => item.title).join(', ')}`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))