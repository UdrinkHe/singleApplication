const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// 输入视频文件路径
const inputFilePath = path.resolve(__dirname, './assets/bocchi.mp4'); // 替换为你的MP4文件名
const outputDir = path.resolve(__dirname, './asset_son');

// 创建输出目录
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// 使用FFmpeg将MP4转换为HLS格式
app.get('/generate-hls', (req, res) => {
    exec(`ffmpeg -i "${inputFilePath}" -f hls -hls_time 10 -hls_list_size 0 -hls_segment_filename "${path.join(outputDir, 'output%03d.m4s')}" "${path.join(outputDir, 'playlist.m3u8')}"`, (error) => {
        if (error) {
            console.error(`转换失败: ${error.message}`);
            return res.status(500).send('Error generating HLS');
        }
        res.send('HLS generated successfully');
    });
});

// 提供HLS播放列表和视频片段
app.use('/asset_son', express.static(outputDir));

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 