const axios = require('axios');
const cheerio = require('cheerio');

// 要爬取的网页URL
const url = 'https://example.com'; // 替换为你要爬取的网页

// 爬虫函数
const scrapeWebsite = async () => {
    try {
        // 发送HTTP请求
        const { data } = await axios.get(url);
        
        // 使用cheerio加载HTML
        const $ = cheerio.load(data);
        
        // 提取特定信息，例如所有的标题
        $('h1, h2, h3').each((index, element) => {
            const title = $(element).text();
            console.log(`标题 ${index + 1}: ${title}`);
        });
        
        // 你可以根据需要提取其他信息
        // 例如提取所有链接
        $('a').each((index, element) => {
            const link = $(element).attr('href');
            console.log(`链接 ${index + 1}: ${link}`);
        });
        
    } catch (error) {
        console.error(`爬取失败: ${error.message}`);
    }
};

// 执行爬虫
scrapeWebsite(); 