import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Roadmap from './components/Roadmap';
import Benefits from './components/Benefits';
import LeadIntro from './components/LeadIntro';
import Footer from './components/Footer';

export default function App() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const logoRef = useRef(null);
  const destinationRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const [destinationActive, setDestinationActive] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = null;
    let lastDestinationState = false;

    const updateConnector = () => {
      frameId = null;

      if (!heroRef.current || !aboutRef.current || !logoRef.current || !destinationRef.current || !svgRef.current || !pathRef.current) {
        return;
      }

      const heroRect = heroRef.current.getBoundingClientRect();
      const aboutRect = aboutRef.current.getBoundingClientRect();
      const logoRect = logoRef.current.getBoundingClientRect();
      const destinationRect = destinationRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      svgRef.current.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
      const sectionStart = heroRect.top + scrollY;
      const sectionEnd = aboutRect.top + scrollY - window.innerHeight * 0.2;
      const progress = mediaQuery.matches
        ? 1
        : Math.min(1, Math.max(0, (scrollY - sectionStart) / Math.max(1, sectionEnd - sectionStart)));
      const lineCompletion = 0.9;
      const drawProgress = Math.min(1, progress / lineCompletion);
      const fadeProgress = Math.min(1, Math.max(0, (progress - lineCompletion) / (1 - lineCompletion)));

      const startX = logoRect.left + logoRect.width * 0.72;
      const startY = logoRect.top + logoRect.height * 0.78;
      const endX = destinationRect.left + destinationRect.width / 2;
      const endY = destinationRect.top + destinationRect.height / 2;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const distance = Math.max(1, Math.hypot(deltaX, deltaY));
      const normalX = -deltaY / distance;
      const normalY = deltaX / distance;
      const wave = Math.min(120, Math.max(52, window.innerWidth * 0.07));
      const offsets = [0, wave, -wave, wave * 0.7, 0];
      const points = offsets.map((offset, index) => {
        const progress = index / (offsets.length - 1);
        return {
          x: startX + deltaX * progress + normalX * offset,
          y: startY + deltaY * progress + normalY * offset,
        };
      });
      const tangents = points.map((point, index) => {
        if (index === 0) {
          return { x: points[1].x - point.x, y: points[1].y - point.y };
        }
        if (index === points.length - 1) {
          return { x: point.x - points[index - 1].x, y: point.y - points[index - 1].y };
        }
        return {
          x: (points[index + 1].x - points[index - 1].x) / 2,
          y: (points[index + 1].y - points[index - 1].y) / 2,
        };
      });
      let pathData = `M ${points[0].x} ${points[0].y}`;
      for (let index = 0; index < points.length - 1; index += 1) {
        const current = points[index];
        const next = points[index + 1];
        const currentTangent = tangents[index];
        const nextTangent = tangents[index + 1];
        pathData += ` C ${current.x + currentTangent.x * 0.35} ${current.y + currentTangent.y * 0.35}, ${next.x - nextTangent.x * 0.35} ${next.y - nextTangent.y * 0.35}, ${next.x} ${next.y}`;
      }

      pathRef.current.setAttribute('d', pathData);

      const pathLength = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = pathLength;
      pathRef.current.style.strokeDashoffset = pathLength * (1 - drawProgress);
      pathRef.current.style.opacity = 1 - fadeProgress;

      const nextDestinationState = progress >= lineCompletion;
      if (nextDestinationState !== lastDestinationState) {
        lastDestinationState = nextDestinationState;
        setDestinationActive(nextDestinationState);
      }
    };

    const scheduleUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateConnector);
      }
    };

    const handleMotionPreferenceChange = () => scheduleUpdate();
    const resizeObserver = new ResizeObserver(scheduleUpdate);

    resizeObserver.observe(heroRef.current);
    resizeObserver.observe(aboutRef.current);
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      resizeObserver.disconnect();
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08070d] text-zinc-100 flex flex-col">
      <Navbar />
      <svg
        ref={svgRef}
        className="fixed inset-0 z-20 h-full w-full pointer-events-none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          className="aws-scroll-connector"
          fill="none"
          stroke="rgb(124 58 237)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <main className="flex-grow">
        <Hero heroRef={heroRef} logoRef={logoRef} />
        <About aboutRef={aboutRef} destinationRef={destinationRef} destinationActive={destinationActive} />
        <Roadmap />
        <Benefits />
        <LeadIntro />
      </main>
      <Footer />
    </div>
  );
}
