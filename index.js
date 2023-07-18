const TelegramBot = require('node-telegram-bot-api');
const express = require('express')
const cors = require('cors')
require('dotenv').config();


const token = process.env.BOT_TOKEN;
const webAppUrl = 'https://heroic-empanada-97d0d5.netlify.app'
const drinks = 'https://symphonious-sherbet-5e11cb.netlify.app'
const cannedVeg = 'https://incredible-souffle-19427e.netlify.app'
const djems = 'https://flourishing-sawine-f7c560.netlify.app'
const sausages = 'https://leafy-kringle-76b0bf.netlify.app'
const cheeses = 'https://jade-lolly-e873f3.netlify.app'
const frozenFoods = 'https://jade-lolly-e873f3.netlify.app'
const teaCofeCandy = 'https://deft-souffle-2cae09.netlify.app'
const driedFruits = 'https://jade-lolly-e873f3.netlify.app'
const groats = 'https://superb-trifle-ee0f53.netlify.app'

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if(text === '/start'){
    await bot.sendMessage(chatId, '🏠Добро пожаловать в наш уютный виртуальный магазин!\n🍏Тут вы сможете посмотреть все продукты, не выходя из дома\n✔️Задать интересующиеся вопросы можно обратной связи\n🚚Также заполнить форму, чтобы оформить вам доставку на дом!')
    
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
    setTimeout(async () => {
        const me = '<a href="https://github.com/twers1">разработчику</a>'
        const message = `Бот в тестовом режиме. Если у вас будут вопросы пожалуйста обратитесь к ${me}`
        await bot.sendMessage(chatId, message,{parse_mode: 'HTML'}, {
        })
    },3000)
    
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
                    [{text: 'Сыры / Молочные продукты',  web_app:{url: cheeses}},
                    {text: 'Колбаса / Бастурма / Суджух', web_app:{url: sausages}},]
                ]
            }
        })
    }, 2000)
    setTimeout(async () => {
        await bot.sendMessage(chatId, 'Замороженные продукты и чай, кофе, конфеты', {
            reply_markup:  {
                inline_keyboard:[
                    [{text: 'Замороженные продукты / Мороженое',  web_app:{url: frozenFoods}},
                    {text: 'Чай / Кофе / Конфеты',  web_app:{url: teaCofeCandy}},]
                ]
            }
        })
    }, 3000)
   
    setTimeout(async () => {
        await bot.sendMessage(chatId, 'Джемы, варенья и сухофрукты', {
            reply_markup:  {
                inline_keyboard:[
                    [{text: 'Джемы / Варенья', web_app:{url: djems}},
                    {text: 'Сухофрукты',  web_app:{url: driedFruits}}]
                ]
            }
        })
    }, 4000)

    setTimeout(async () => {
        await bot.sendMessage(chatId, 'Крупы и акксессуары', {
            reply_markup:  {
                inline_keyboard:[
                    [{text: 'Крупы', web_app:{url: groats}},
                    {text: 'Акксессуары',  web_app:{url: drinks}}]
                ]
            }
        })
    }, 5000)
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
    await bot.sendMessage(chatId, 'Команды: \n/start - запустить бота\n/info - получить информацию об обратной связи\n/products - получить все продукты\n/socials - наши контакты')
  }

  if(text ==="/socials"){
    const vkontakteLink = '<a href="https://vk.com/armenianhomenn">Вконтакте</a>';
    const instagramLink = '<a href="https://instagram.com/armenianhome?igshid=NTc4MTIwNjQ2YQ==">Инстаграм</a>'
    const yandexLink = '<a href="https://yandex.ru/maps/org/armyanskiy_dom/98158241338/?ll=43.865124%2C56.345758&z=13">Яндекс</a>'
    const googleLink = '<a href="https://www.google.com/maps/place/Армянский+Дом/@56.3458083,43.8653642,15z/data=!4m6!3m5!1s0x4151d7b1379f5eab:0x5bbe873a011b4cb7!8m2!3d56.3458083!4d43.8653642!16s%2Fg%2F11s7vn1tyn?hl=ru">Гугл</a>'
    const message = `🌐Наши социальные сети:\n${vkontakteLink} \n${instagramLink} \n🗺️Мы в картах: \n${yandexLink} \n${googleLink}`;
    await bot.sendMessage(chatId, message, {parse_mode: 'HTML'})
  }
  
  if(msg?.web_app_data?.data) {
    try {
        const data = JSON.parse(msg?.web_app_data?.data)

        await bot.sendMessage(chatId,'Спасибо за обратную связь! ')
        await bot.sendMessage(chatId,`Ваше ФИО:  + ${data?.fio}\nВаша улица: ${data?.street}\nВаш номер телефона: ${data?.phone}\nВаш юзернейм: ${data?.usernameTg}`);

        setTimeout(async () => {
            await bot.sendMessage(chatId, 'Всю информацию вы получите в личных сообщениях ');

        }, 2000)
        
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
