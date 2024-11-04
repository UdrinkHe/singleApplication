const video = document.getElementById('videoPlayer');
const playPauseButton = document.getElementById('playPause');

if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource('http://localhost:3000/video/bocchi.m3u8');
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('Manifest parsed successfully');
        video.muted = true; // 初始静音
        video.play().then(() => {
            video.muted = false; // 自动取消静音
        }).catch(error => {
            console.error('自动播放失败:', error);
        });
    });

    hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
            switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                    console.error('Network error encountered:', data);
                    break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                    console.error('Media error encountered:', data);
                    break;
                default:
                    console.error('An unrecoverable error occurred:', data);
                    hls.destroy();
                    break;
            }
        }
    });
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = 'http://localhost:3000/video/bocchi.m3u8';
    video.addEventListener('loadedmetadata', () => {
        console.log('Video metadata loaded');
        video.muted = true; // 初始静音
        video.play().then(() => {
            video.muted = false; // 自动取消静音
        }).catch(error => {
            console.error('自动播放失败:', error);
        });
    });
} else {
    console.error('当前浏览器不支持 HLS');
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
