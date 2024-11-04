const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 静态文件服务
app.use(express.static('public'));

// 处理WebSocket连接
wss.on('connection', (ws) => {

        // 监听消息
        ws.on('message', (message) => {
            console.log(message);

            // const response = {
            //     type: 'chat',
            //     content: message,
            // };

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    //client.send(JSON.stringify(response));
                    client.send('臭小子')
                }
            });
        });

        ws.on('close', () => {
            console.log(`已断开连接`);
        });
    });

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`服务器正在运行在 http://localhost:${PORT}`);
}); 