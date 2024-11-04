const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const inputFilePath = path.join(__dirname, 'assets', 'bocchi.mp4');
const outputDir = path.join(__dirname, 'server', 'src', 'video');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 输出文件名
const outputFileName = 'output.mpd';
const outputFilePath = path.join(outputDir, outputFileName);

// 使用FFmpeg将MP4转换为MPEG-DASH
const command = `ffmpeg -i "${inputFilePath}" -c:v libx264 -c:a aac -f dash "${outputFilePath}"`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`执行错误: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`FFmpeg 错误: ${stderr}`);
        return;
    }
    console.log(`成功转换: ${inputFilePath} -> ${outputFilePath}`);
});