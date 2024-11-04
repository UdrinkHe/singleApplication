const video = document.getElementById('videoPlayer');
const playPauseButton = document.getElementById('playPause');

try {
    const player = dashjs.MediaPlayer().create();
    player.initialize(video, 'http://localhost:3000/video/output.mpd', true);

    // 添加错误事件监听器
    player.on(dashjs.MediaPlayer.events.ERROR, (e) => {
        const errorData = e.error;
        console.error('DASH.js 播放器错误:', errorData);
        alert(`播放错误: ${errorData.message || '未知错误'}`);
    });

    // 添加其他事件监听器（可选）
    player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
        console.log('流初始化成功');
    });

    player.on(dashjs.MediaPlayer.events.PLAYBACK_STARTED, () => {
        console.log('播放已开始');
    });

} catch (error) {
    console.error('初始化 DASH.js 播放器失败:', error);
}

playPauseButton.addEventListener('click', () => {
    if (video.paused) {
        video.play().catch(error => {
            console.error('播放失败:', error);
        });
    } else {
        video.pause();
    }
}); 