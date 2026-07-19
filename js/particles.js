const canvas = document.querySelector(".particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const particles = [];
  const resize = () => {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  };
  const seed = () => {
    particles.length = 0;
    const count = Math.min(80, Math.floor(innerWidth / 18));
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * innerWidth,
        y: Math.random() * Math.max(canvas.offsetHeight, 500),
        vx: (Math.random() - .5) * .35,
        vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.8 + .7
      });
    }
  };
  const draw = () => {
    ctx.clearRect(0, 0, innerWidth, canvas.offsetHeight);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(6, 182, 212, .55)";
      ctx.fill();
      for (let j = i + 1; j < particles.length; j += 1) {
        const q = particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 120) {
          ctx.strokeStyle = `rgba(59, 130, 246, ${.12 * (1 - d / 120)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  };
  addEventListener("resize", () => { resize(); seed(); });
  resize();
  seed();
  draw();
}
