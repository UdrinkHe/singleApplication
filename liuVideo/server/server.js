const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// 提供静态文件
app.use(express.static(path.join(__dirname, 'src', 'client')));

// 提供视频文件
app.use('/video', express.static(path.join(__dirname, 'src', 'video')));

app.listen(PORT, () => {
    console.log(`服务器正在运行在 http://localhost:${PORT}`);
});
