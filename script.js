// Add parallax effect to canvas
window.addEventListener('scroll', () => {
    const canvas = document.getElementById('main-canvas');
    const topScroll = window.scrollY;

    if(canvas && topScroll < window.innerHeight) {
        window.canvasTop = -window.scrollY / 2
        canvas.style.transform = `translateY(${window.canvasTop}px)`;
    }
})

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: "center"
        });
    });
});


//TO BE REMOVED!
const projects = document.getElementById('my-projects');
for(let i=0; i<6; i++) {
    const div = document.createElement('div');
    div.classList.add('fade-delay');
    div.classList.add("fadeup")
    div.classList.add('fadeup-move')
    projects.appendChild(div);
}

//Fade up effect
const observerOptions = {
    root: null,
    threshold: 0.4,
    // rootMargin: '0px 0px -500px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

window.addEventListener('DOMContentLoaded', (event) => { 
    const sections = Array.from(document.getElementsByTagName('section'));
    for (let section of sections) {
    const fadeups = section.getElementsByClassName('fade-delay');
    console.log(fadeups);
      for (let count = 0; count < fadeups.length; count++) {
         fadeups[count].setAttribute('style', 'transition-delay: ' + count * 0.3 + 's');
     }
        observer.observe(section);
    }
});