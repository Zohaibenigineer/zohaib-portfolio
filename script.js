const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Simple gear shape drawer
function drawGear(x, y, radius, teeth, rotation, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * Math.PI * 2;
        const outerR = radius;
        const innerR = radius * 0.75;
        const a1 = angle;
        const a2 = angle + (Math.PI / teeth);
        ctx.lineTo(Math.cos(a1) * outerR, Math.sin(a1) * outerR);
        ctx.lineTo(Math.cos(a2) * innerR, Math.sin(a2) * innerR);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

const gears = [
    { x: 0.15, y: 0.3, r: 60, teeth: 10, rot: 0, speed: 0.005 },
    { x: 0.85, y: 0.25, r: 40, teeth: 8, rot: 0, speed: -0.008 },
    { x: 0.1, y: 0.75, r: 50, teeth: 9, rot: 0, speed: -0.006 },
    { x: 0.9, y: 0.7, r: 70, teeth: 12, rot: 0, speed: 0.004 },
    { x: 0.5, y: 0.1, r: 35, teeth: 7, rot: 0, speed: 0.009 },
];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gears.forEach(g => {
        g.rot += g.speed;
        drawGear(g.x * canvas.width, g.y * canvas.height, g.r, g.teeth, g.rot, 0.25);
    });
    requestAnimationFrame(animate);
}
animate();