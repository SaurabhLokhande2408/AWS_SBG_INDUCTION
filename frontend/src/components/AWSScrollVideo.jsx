import { useEffect, useRef } from 'react';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export default function AWSScrollVideo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let target = 0;
    let current = 0;
    let raf = null;
    let sectionTop = 0;
    let scrollDistance = 0;

    const measure = () => {
      sectionTop = section.getBoundingClientRect().top + window.scrollY;
      scrollDistance = section.offsetHeight - window.innerHeight;
    };

    const tick = () => {
      const diff = target - current;

      if (Math.abs(diff) < 0.0005) {
        current = target;
        video.currentTime = current;
        raf = null;
        return;
      }

      current += diff * 0.1; // lower = smoother/slower catch-up
      if (!video.seeking) video.currentTime = current;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!video.duration || scrollDistance <= 0) return;
      const progress = clamp((window.scrollY - sectionTop) / scrollDistance, 0, 1);
      target = progress * (video.duration - 0.05);
      start();
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    const onReady = () => {
      video.pause();
      measure();
      onScroll();
    };

    // Helps iOS/Safari actually decode frames for scrubbing
    video.play().then(() => video.pause()).catch(() => {});

    video.addEventListener('loadedmetadata', onReady);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    if (video.readyState >= 1) onReady();

    return () => {
      video.removeEventListener('loadedmetadata', onReady);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // NO overflow-hidden here, or sticky breaks
    <section ref={sectionRef} className="relative h-[400vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/Cinematic_second_isometric_a.mp4"
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}