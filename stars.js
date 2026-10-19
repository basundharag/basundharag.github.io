// Gentle twinkling starfield behind the page header.
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const c = document.createElement('canvas');
  header.prepend(c);
  const ctx = c.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let stars = [], w, h, dpr;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = header.clientWidth; h = header.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round((w * h) / 2600);
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() < 0.08 ? 1.4 + Math.random() : 0.4 + Math.random() * 0.8,
      p: Math.random() * Math.PI * 2,
      s: 0.4 + Math.random() * 1.2
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      const a = reduce ? 0.7 : 0.45 + 0.4 * Math.sin(s.p + (t / 1000) * s.s);
      ctx.globalAlpha = a;
      ctx.fillStyle = '#f3ead2';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!reduce) requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
})();
