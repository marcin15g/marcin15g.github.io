window.addEventListener('scroll', () => {
    const canvas = document.getElementById('main-canvas');
    const entryText = document.getElementById('entry-text');

    if(canvas) canvas.style.transform = `translateY(${-window.scrollY / 3}px)`;
    // if(entryText) entryText.style.transform = `translateY(${-window.scrollY / 3}px)`;
})