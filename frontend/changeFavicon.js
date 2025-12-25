function changeFavicon() {
    const favicon = document.querySelector('link[rel="shortcut icon"]');

    document.addEventListener('visibilitychange', () => {
        favicon.href = document.hidden ? '/job-2.png' : '/job-1.png';
    });
}
changeFavicon();
