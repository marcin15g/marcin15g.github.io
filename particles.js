const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 2;
canvas.height = window.innerHeight * 4;

let particlesArray = [];

let mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

window.addEventListener('click', (e) => {
    const size = (Math.random() * 10 + 5)
    const x = e.x * 2;
    const y = e.y * 2 + window.scrollY;
    const dirX = (Math.random() * 5) - 3;
    const dirY = (Math.random() * 5) - 3;
    const color = 'rgb(255, 153, 0)';

    if(particlesArray.length > 250) particlesArray.shift()
    particlesArray.push(new Particle(x, y, dirX, dirY, size, color, true))
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 4;

    particlesArray = [];
    init();
})

class Particle {
    constructor(x, y, dirX, dirY, size, color, custom = false) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
        this.custom = custom;
    }

    //Draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    //Update particle
    update() {
        // Check if particle is within canvas
        if(this.x > canvas.width || this.x < 0) this.dirX *= -1;
        if(this.y > canvas.height || this.y < 0) this.dirY *= -1;

        this.x += this.dirX;
        this.y += this.dirY;
        this.draw();
    }
}

const init = () => {
    const numOfParticles = 150 //(canvas.width * canvas.height) / 15000;
    for(let i = 0; i < numOfParticles; i++) {
        const size = (Math.random() * 5 + 1)
        const x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        const y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        const dirX = (Math.random() * 5) - 3;
        const dirY = (Math.random() * 5) - 3;
        const color = '#fff';

        particlesArray.push(new Particle(x, y, dirX, dirY, size, color))
    }
}

const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => particle.update())
    connect();
}

const connect = () => {
    for(let a = 0; a < particlesArray.length; a++) {

        //Connect dots to each other
        for(let b = a; b < particlesArray.length; b++) {
            const distanceX = (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x);
            const distanceY = (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y);
            const distance = distanceX + distanceY;
            if(distance < ((canvas.width/7) * (canvas.height/7))) {
                const opacity = 1 - distance/((canvas.width/7) * (canvas.height/7));
                ctx.strokeStyle = particlesArray[a].custom === true && particlesArray[b].custom === true ? `rgba(255,153,0,${opacity})` : `rgba(255,255,255,${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }

        //Connect dots to mouse
        const distanceX = (particlesArray[a].x - mouse.x * 2) * (particlesArray[a].x - mouse.x * 2);
        const distanceY = (particlesArray[a].y - mouse.y * 2 - (window.scrollY)) * (particlesArray[a].y - mouse.y * 2 - (window.scrollY));
        const distance = distanceX + distanceY;

        if(distance < ((canvas.width/7) * (canvas.height/7))) {
            const opacity = 1 - distance/((canvas.width/7) * (canvas.height/7));
            ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x , particlesArray[a].y);
            ctx.lineTo(mouse.x * 2, mouse.y * 2 + (window.scrollY));
            ctx.stroke();
        }       
    }
}

init();
animate();