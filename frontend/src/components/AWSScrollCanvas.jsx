import { useEffect, useRef } from 'react';

const FRAME_COUNT = 240;
const frameSrc = (i) => `/frames/frame_${String(i).padStart(4, '0')}.webp`;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export default function AWSScrollCanvas() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext('2d');
    const images = new Array(FRAME_COUNT);
    let cancelled = false;
    let raf = null;

    let target = 0; // frame index we want (float)
    let current = 0; // frame index being shown (float, eased)
    let lastDrawn = -1;
    let sectionTop = 0;
    let scrollDistance = 0;
    let w = 0;
    let h = 0;

    // ---------- drawing ----------
    const draw = (index) => {
      // fall back to nearest loaded frame so we never flash blank
      let img = images[index];
      if (!img) {
        for (let d = 1; d < FRAME_COUNT; d++) {
          img = images[index - d] || images[index + d];
          if (img) break;
        }
      }
      if (!img) return;

      // object-cover behaviour
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      lastDrawn = index;
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingQuality = 'high';
      measure();
      draw(Math.round(current));
    };

    const measure = () => {
      sectionTop = section.getBoundingClientRect().top + window.scrollY;
      scrollDistance = section.offsetHeight - window.innerHeight;
    };

    // ---------- scroll -> target frame ----------
    const onScroll = () => {
      if (scrollDistance <= 0) return;
      const progress = clamp((window.scrollY - sectionTop) / scrollDistance, 0, 1);
      target = progress * (FRAME_COUNT - 1);
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    // ---------- easing loop (runs only while catching up) ----------
    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.02) {
        current = target;
        const idx = Math.round(current);
        if (idx !== lastDrawn) draw(idx);
        raf = null;
        return;
      }
      current += diff * 0.14; // lower = floatier, higher = snappier
      const idx = Math.round(current);
      if (idx !== lastDrawn) draw(idx);
      raf = requestAnimationFrame(tick);
    };

    const load = (i) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        images[i] = img;
        if (Math.round(current) === i) {
          draw(i);
        }
      };
      img.onerror = () => {};
      img.src = frameSrc(i + 1);
    };

    for (let i = 0; i < FRAME_COUNT; i += 1) {
      if (cancelled) return;
      load(i);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    return () => {
      cancelled = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resizeCanvas);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // NO overflow-hidden on the section (it breaks position: sticky)
    <section ref={sectionRef} className="relative h-[400vh] w-full bg-[#08070d]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
    </section>
  );
}
