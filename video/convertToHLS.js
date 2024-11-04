const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// 定义输入和输出路径
const inputFilePath = path.resolve(__dirname, './assets/bocchi.mp4'); // 替换为你的MP4文件名
const outputDir = path.resolve(__dirname, './asset_son');

// 创建输出目录
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// 使用FFmpeg命令将MP4转换为HLS格式
exec(`ffmpeg -i "${inputFilePath}" -f hls -hls_time 10 -hls_list_size 0 -hls_segment_filename "${path.join(outputDir, 'output%03d.m4s')}" "${path.join(outputDir, 'playlist.m3u8')}"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`转换失败: ${error.message}`);
        console.error(`FFmpeg stderr: ${stderr}`); // 输出FFmpeg的错误信息
    } else {
        console.log(`成功生成HLS文件`);
    }
}); 