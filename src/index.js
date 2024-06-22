const express = require('express');
const config = require('config');
const cors = require('cors');
const path = require('path');

const { run } = require('./mongoDBConnection');
const bodyParser = require('body-parser');

///////
// const Tesseract = require('tesseract.js');
///////
const app = express();

const server = require('http').createServer(app);
// app.use(cors());

// app.use(
//     cors({
//         origin: ['http://localhost:3000', 'http://localhost:3001'], // Replace with your React app's URL
//         methods: ['GET', 'POST'],
//         credentials: true,
//     })
// );
app.use(cors());
////////////////
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

const PORT = process.env.PORT || config.get('port');

app.use('/public', express.static(path.join(__dirname, '../public')));

app.use('/paybis', require('./api/paybis.js'));

// const Tesseract = require('tesseract.js');

// async function extractTextFromImage(filePath) { 
//     try {
//         const {
//             data: { text },
//         } = await Tesseract.recognize(filePath, 'eng', {
//             logger: (m) => console.log(m),
//         });
//         console.log('Extracted Text:', text);
//         return text;
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// // Example usage with a local image file
// const path1 = path.join(__dirname, '../public/screenshot.png');

// const localImagePath = '../public/screenshot.png';
// extractTextFromImage(path1);

// // Example usage with an image URL
// const imageUrl = 'https://example.com/your-image.png';
// extractTextFromImageUrl(imageUrl);

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
