const TelegramBot = require('node-telegram-bot-api');
const express = require('express')
const cors = require('cors')


const token = 'yourTOKEN';
const webAppUrl = 'https://heroic-empanada-97d0d5.netlify.app'
const drinks = 'https://symphonious-sherbet-5e11cb.netlify.app'
const cannedVeg = 'https://incredible-souffle-19427e.netlify.app'
const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if(text === '/start'){
    await bot.sendMessage(chatId, 'Добро пожаловать в наш уютный виртуальный магазин!\nТут вы сможете посмотреть все продукты, не выходя из дома\nЗадать интересующиеся вопросы в обратной связи\nТакже заполнить форму, чтобы оформить вам доставку на дом!')
    
    await bot.sendMessage(chatId, 'Тут находятся все продукты из нашей базы данных: ', {
        reply_markup: {
            inline_keyboard:[
                [{text: 'Посмотреть ', web_app:{url: webAppUrl}}]
            ]
        }
    })
    setTimeout(async () => {
        await bot.sendMessage(chatId, 'Для ознакомления всех команд, которые есть в боте - /commands', {
        })
    },1000)
    
  }

  if(text === '/info'){
    await bot.sendMessage(chatId, 'Если у вас остались вопросы, то вам сюда -> @feedbackArmenianHomeBot', {
    })
  }

  if(text === '/products'){
    await bot.sendMessage(chatId, 'Здесь представлен весь ассортимент продуктов', {
        reply_markup:  {
            inline_keyboard:[
                [{text: 'Напитки / Компоты / Вода', web_app:{url: drinks}},
                {text: 'Овощная консервация',  web_app:{url: cannedVeg}},]
            ]
        }
    })
    setTimeout(async () => {
        await bot.sendMessage(chatId, 'Сыры и бастурма', {
            reply_markup:  {
                inline_keyboard:[
                    [{text: 'Сыры',  web_app:{url: drinks}},
                    {text: 'Колбаса / Бастурма / Суджух', web_app:{url: drinks}},]
                ]
            }
        })
    }, 2000)

    setTimeout(async () => {
        await bot.sendMessage(chatId, 'Замороженные продукты и мороженое', {
            reply_markup:  {
                inline_keyboard:[
                    [{text: 'Замороженные продукты',  web_app:{url: drinks}},
                    {text: 'Мороженое',  web_app:{url: drinks}},]
                ]
            }
        })
    }, 3000)
   
    setTimeout(async () => {
        await bot.sendMessage(chatId, 'Кофе, чаи и конфеты', {
            reply_markup:  {
                inline_keyboard:[
                    [{text: 'Чаи / Кофе',  web_app:{url: drinks}},
                    {text: 'Конфеты',  web_app:{url: drinks}}]
                ]
            }
        })
    }, 4000)

    setTimeout(async () => {
        await bot.sendMessage(chatId, 'Сухофрукты и аксессуары', {
            reply_markup:  {
                inline_keyboard:[
                    [{text: 'Аксессуары', web_app:{url: drinks}},
                    {text: 'Сухофрукты',  web_app:{url: drinks}}]
                ]
            }
        })
    },5000)
    
    setTimeout(async () => {
        await bot.sendMessage(chatId, 'Джемы и варенья', {
            reply_markup:  {
                inline_keyboard:[
                    [{text: 'Джемы / Варенья', web_app:{url: drinks}},
                    {text: '.',  web_app:{url: drinks}}]
                ]
            }
        })
    }, 6000)
    

    setTimeout(async () => {
        await bot.sendMessage(chatId, 'Не забывайте, что можете сделать заказ прямо здесь. Для этого заполни форму: ', {
            reply_markup: {
                keyboard:[
                    [{text: 'Заполнить форму ', web_app: {url: webAppUrl + '/form'}}]
                ]
            }
        })
    }, 7000)
    
  }

  if(text === "/commands"){
    await bot.sendMessage(chatId, 'Команды: \n /start - запустить бота\n /info - получить информацию об обратной связи\n /products - получить все продукты')
  }
  
  if(msg?.web_app_data?.data) {
    try {
        const data = JSON.parse(msg?.web_app_data?.data)

        await bot.sendMessage(chatId,'Спасибо за обратную связь! ')
        await bot.sendMessage(chatId,'Ваше ФИО: ' + data?.fio);
        await bot.sendMessage(chatId,'Ваша улица: ' + data?.street);

        setTimeout(async () => {
            await bot.sendMessage(chatId, 'Всю информацию вы получите в личных сообщениях ');

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
