const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const inputDir = path.join(__dirname, 'assets');
const outputDir = path.join(__dirname, 'server', 'src','video');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 获取assets目录中的所有MP4文件
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('无法读取目录:', err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file) === '.mp4') {
            const inputFilePath = path.join(inputDir, file);
            const outputFileName = path.basename(file, '.mp4');
            const outputFilePath = path.join(outputDir, `${outputFileName}.m3u8`);

            // 使用FFmpeg将MP4转换为HLS
            const command = `ffmpeg -i "${inputFilePath}" -c:v libx264 -c:a aac -strict -2 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls "${outputFilePath}"`;

            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`执行错误: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`FFmpeg 错误: ${stderr}`);
                    return;
                }
                console.log(`成功转换: ${file} -> ${outputFileName}.m3u8`);
            });
        }
    });
});