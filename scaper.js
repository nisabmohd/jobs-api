const puppeteer = require('puppeteer');

const all=async (param) => {
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
    await page.goto(`https://remoteok.com/${param}`);
    const data = await page.evaluate(() => {
        const list = []
        const items = document.querySelectorAll("tr.job")
    
        for (const item of items) {
          list.push({
            company: item.querySelector(".company h3").innerHTML,
            position: item.querySelector(".company h2").innerHTML,
            link: "https://remoteok.io" + item.getAttribute("data-href"),
          })
        }
    
        return list
      })
    await browser.close();
    return data;
}
module.exports={all}
