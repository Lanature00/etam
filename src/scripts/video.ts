const playButton = document.querySelector<HTMLButtonElement>('.film__play');

if (playButton) {
  playButton.addEventListener('click', () => {
    const container = playButton.closest<HTMLElement>('.film__video');
    if (!container) return;

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.tiktok.com/player/v1/${playButton.dataset.videoId}?autoplay=1`;
    iframe.title = "J'ETAM : La Tendresse";
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;

    container.replaceChildren(iframe);
  });
}