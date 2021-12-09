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

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 4;

    particlesArray = [];
    init();
})

class Particle {
    constructor(x, y, dirX, dirY, size, color) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
    }

    //Draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "#fff";
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
    const numOfParticles = 100//(canvas.width * canvas.height) / 15000;
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
        for(let b = a; b < particlesArray.length; b++) {
            const distanceX = (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x);
            const distanceY = (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y);
            const distance = distanceX + distanceY;
            if(distance < ((canvas.width/7) * (canvas.height/7))) {
                const opacity = 1 - distance/((canvas.width/7) * (canvas.height/7));
                ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x + 0.5, particlesArray[a].y + 0.5);
                ctx.lineTo(particlesArray[b].x + 0.5, particlesArray[b].y + 0.5);
                ctx.stroke();
            }
        }
    }
}

init();
animate();