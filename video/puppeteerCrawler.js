const puppeteer = require('puppeteer');

const url = 'https://example.com'; // 替换为你要爬取的网页

const scrapeWebsite = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // 提取信息
    const titles = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('h1, h2, h3')).map(element => element.innerText);
    });

    console.log(titles);

    await browser.close();
};

scrapeWebsite(); 