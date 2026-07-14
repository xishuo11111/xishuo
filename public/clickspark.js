/**
 * ClickSpark - Click spark effect (adapted from React Bits)
 * Vanilla JS version - no dependencies
 */

export function initClickSpark(opts = {}) {
  const {
    sparkColor = '#0F172A',
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 400,
    easing = 'ease-out',
    extraScale = 1.0
  } = opts;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;display:block;pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const sparks = [];
  let animId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const easeFn = (t) => {
    switch (easing) {
      case 'linear': return t;
      case 'ease-in': return t * t;
      case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default: return t * (2 - t);
    }
  };

  function handleClick(e) {
    const now = performance.now();
    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        x: e.clientX, y: e.clientY,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now
      });
    }
  }
  document.addEventListener('click', handleClick);

  function draw(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      const elapsed = timestamp - s.startTime;
      if (elapsed >= duration) { sparks.splice(i, 1); continue; }
      const p = elapsed / duration;
      const e = easeFn(p);
      const dist = e * sparkRadius * extraScale;
      const len = sparkSize * (1 - e);
      const x1 = s.x + dist * Math.cos(s.angle);
      const y1 = s.y + dist * Math.sin(s.angle);
      const x2 = s.x + (dist + len) * Math.cos(s.angle);
      const y2 = s.y + (dist + len) * Math.sin(s.angle);
      ctx.strokeStyle = sparkColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    animId = requestAnimationFrame(draw);
  }
  animId = requestAnimationFrame(draw);

  return function destroy() {
    cancelAnimationFrame(animId);
    document.removeEventListener('click', handleClick);
    window.removeEventListener('resize', resize);
    if (canvas.parentElement) canvas.parentElement.removeChild(canvas);
  };
}
