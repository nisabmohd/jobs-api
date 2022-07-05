const puppeteer = require('puppeteer');

const all = async (param) => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  const page = await browser.newPage();
  await page.goto(`https://remoteok.com/${param}`);
  const data = await page.evaluate(() => {
    const list = []
    const items = document.querySelectorAll("tr.job")
    const timestamp = Date.now()
    for (const item of items) {
      
      list.push({
        company: item.querySelector(".company h3").innerHTML.substring(1),
        position: item.querySelector(".company h2").innerHTML.substring(1, item.querySelector(".company h2").innerHTML.length - 1),
        link: "https://remoteok.io" + item.getAttribute("data-href"),
        timestamp: timestamp
      })
    }

    return list
  })
  await browser.close();
  return data
}
module.exports = { all }

