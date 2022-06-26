const puppeteer = require('puppeteer')
const app = require('express')
async function snapScreenshot() {
    try {
        const URL = 'https://github.com/nisabmohd/DS-Implementations/commits/master'
        const browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true,
            args: [`--window-size=1920,1080`],
            defaultViewport: {
                width: 1920,
                height: 1080
            }
        })
        const page = await browser.newPage()

        await page.goto(URL)
        await page.screenshot({ path: 'screenshot.png' })

        await browser.close()
    } catch (error) {
        console.error(error)
    }
}

snapScreenshot()
//Link--primary text-bold js-navigation-open markdown-title

async function login() {
    try {
        const URL = 'https://tweeter-kohl.vercel.app/'
        const browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true,
            args: [`--window-size=1920,1080`],
            defaultViewport: {
                width: 1920,
                height: 1080
            }
        })
        const page = await browser.newPage()

        await page.goto(URL)

        await page.type('.MuiOutlinedInput-input', 'nisabmohd@gmail.com')
        await page.type('input[type=password]', 'nisab123')

        await Promise.all([
            page.click('input[type=button]'),
            page.waitForNavigation(),

        ]);
        page.screenshot({ path: 'screenshot.png' })

        await browser.close()

    } catch (error) {
        console.error(error)
    }
}

// login()


(async function scrape() {
    const browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
        args: [`--window-size=1920,1080`],
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    });

    const page = await browser.newPage();
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');

    await page.waitForSelector('.vector-search-box-input');
    await page.type('.vector-search-box-input', 'Spiderman');

    await page.click('.searchButton')

    await page.waitForNavigation()


    await page.waitForSelector('.mw-parser-output');

    // extracting information from code
    let quotes = await page.evaluate(() => {

        let quotesElement = document.body.querySelectorAll('.mw-parser-output');

        console.log(quotesElement);

    });

    // logging results
    console.log(quotes);
    await browser.close();

})();
