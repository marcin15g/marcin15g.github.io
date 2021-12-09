window.addEventListener('scroll', () => {
    const canvas = document.getElementById('main-canvas');
    const entryText = document.getElementById('entry-text');

    if(canvas && entryText) {
        // if(window.)
        canvas.style.transform = `translateY(${-window.scrollY / 2}px)`;
    }
})

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});