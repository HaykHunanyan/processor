const express = require('express');
const config = require('config');
const cors = require('cors');
const path = require('path');

const { run } = require('./mongoDBConnection');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);
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

const PORT = process.env.PORT || config.get('port');
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/paybis', require('./api/paybis.js'));
app.use('/',(req,res)=> res.send({ success: false, message: 'Server Error!' }))

async function start() {
    try {
        await run().catch(console.dir);
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
