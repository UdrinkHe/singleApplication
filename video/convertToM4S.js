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

// 获取视频时长并分割视频
exec(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${inputFilePath}"`, (error, stdout) => {
    if (error) {
        console.error(`获取视频时长失败: ${error.message}`);
        return;
    }

    const duration = parseFloat(stdout); // 获取视频时长（秒）
    const segmentDuration = 15; // 每段15秒
    const segments = Math.ceil(duration / segmentDuration); // 计算分段数量

    // 使用for循环逐个分割视频
    for (let i = 0; i < segments; i++) {
        const start = i * segmentDuration; // 计算每段的开始时间
        const outputFilePath = path.join(outputDir, `output${i}.m4s`); // 生成输出文件路径

        // 使用FFmpeg���令分割视频为M4S格式
        exec(`ffmpeg -i "${inputFilePath}" -ss ${start} -t ${segmentDuration} -f m4s -c copy "${outputFilePath}"`, (error) => {
            if (error) {
                console.error(`分割视频失败: ${error.message}`);
            } else {
                console.log(`成功生成: ${outputFilePath}`);
            }
        });
    }
}); 