import React, { useEffect, useRef, useState } from 'react';
import {
  Code2,
  Trophy,
  Mic2,
  CloudSun,
  ArrowRight,
  Check,
  Terminal,
} from 'lucide-react';

export default function Roadmap() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  /* =========================================================
     ROADMAP DATA
  ========================================================= */

  const roadmap = [
    {
      number: '01',
      phase: 'FOUNDATION',
      title: 'Cloud Fundamentals to Dev',
      desc:
        'Zero-to-One foundational cohorts covering AWS IAM, EC2, S3, Docker, and API deployment. Learn and teach together.',
      icon: <CloudSun size={26} />,
      accent: '#9333ea',
      points: [
        'AWS fundamentals',
        'IAM & EC2',
        'S3 & storage',
        'Docker',
        'API deployment',
      ],
    },
    {
      number: '02',
      phase: 'BUILD',
      title: 'Hands-on Architecture Labs',
      desc:
        'Intensive build sessions covering serverless architectures with AWS Lambda, DynamoDB pipelines, and full-stack integration.',
      icon: <Code2 size={26} />,
      accent: '#059669',
      points: [
        'AWS Lambda',
        'DynamoDB',
        'Serverless systems',
        'Full-stack integration',
        'Architecture labs',
      ],
    },
    {
      number: '03',
      phase: 'CONNECT',
      title: 'Guest Lectures & Cloud Days',
      desc:
        'Inviting industry-experienced Solutions Architects, DevOps leads, and AWS Community Builders for AMAs, discussions, and real project audits.',
      icon: <Mic2 size={26} />,
      accent: '#d97706',
      points: [
        'Industry speakers',
        'Solutions Architects',
        'DevOps leaders',
        'Technical AMAs',
        'Project audits',
      ],
    },
    {
      number: '04',
      phase: 'SHIP',
      title: 'Flagship Cloud Hackathon',
      desc:
        'A 24-hour sprint focused on solving real-world challenges using scalable cloud infrastructure and serverless solutions.',
      icon: <Trophy size={26} />,
      accent: '#7c3aed',
      points: [
        '24-hour sprint',
        'Real-world problems',
        'Cloud architecture',
        'Serverless solutions',
        'Team execution',
      ],
    },
  ];

  /* =========================================================
     SCROLL PROGRESS
  ========================================================= */

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = sectionRef.current.offsetHeight - window.innerHeight;
      const current = Math.max(0, -rect.top);
      const value = Math.min(1, Math.max(0, current / Math.max(total, 1)));

      setProgress(value);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  /* =========================================================
     HELPERS & TIMINGS
  ========================================================= */

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const ease = (value) => {
    const t = clamp(value);
    return t * t * (3 - 2 * t);
  };
  const lerp = (a, b, t) => a + (b - a) * t;

  const environmentProgress = ease(clamp(progress / 0.45));
  const cardsProgress = ease(clamp((progress - 0.42) / 0.58));

  /* =========================================================
     BACKGROUND COLOR (Pure White -> Rich Dark Charcoal/Black)
  ========================================================= */

  const getBackground = () => {
    const p = environmentProgress;
    const stops = [
      { p: 0, r: 255, g: 255, b: 255 },
      { p: 0.2, r: 245, g: 245, b: 247 },
      { p: 0.4, r: 180, g: 180, b: 185 },
      { p: 0.6, r: 60, g: 60, b: 65 },
      { p: 1, r: 9, g: 9, b: 11 },
    ];

    let first = stops[0];
    let second = stops[stops.length - 1];

    for (let i = 0; i < stops.length - 1; i++) {
      if (p >= stops[i].p && p <= stops[i + 1].p) {
        first = stops[i];
        second = stops[i + 1];
        break;
      }
    }

    const local = (p - first.p) / Math.max(second.p - first.p, 0.0001);
    const t = ease(local);

    return `rgb(${Math.round(lerp(first.r, second.r, t))}, ${Math.round(
      lerp(first.g, second.g, t)
    )}, ${Math.round(lerp(first.b, second.b, t))})`;
  };

  const darkProgress = ease(clamp((environmentProgress - 0.35) / 0.65));
  const isDark = darkProgress > 0.5;
  const cardTrackX = lerp(115, -205, cardsProgress);

  /* =========================================================
     DYNAMIC ROCKET COORDINATES (Enters the final card at the end)
  ========================================================= */
  const getRocketStyle = () => {
    if (cardsProgress === 0) {
      const leftPos = -15 + environmentProgress * 115;
      const topPos = 50 + Math.sin(environmentProgress * Math.PI * 6) * 15;
      const angle = 15 + Math.sin(environmentProgress * Math.PI * 6) * 10;
      return { left: `${leftPos}%`, top: `${topPos}%`, angle, insideCard: false };
    } else {
      const p = cardsProgress;
      // If scroll is near the end, steer directly into the final card coordinates
      if (p > 0.85) {
        const entryProgress = (p - 0.85) / 0.15;
        // Coordinates corresponding precisely to the final destination card center
        const targetLeft = lerp(45, 82, entryProgress);
        const targetTop = lerp(40, 50, entryProgress);
        const angle = lerp(25, 0, entryProgress);
        return { left: `${targetLeft}%`, top: `${targetTop}%`, angle, insideCard: entryProgress > 0.6 };
      }

      const leftPos = 20 + Math.sin(p * Math.PI * 3) * 35;
      const topPos = 30 + Math.cos(p * Math.PI * 4) * 25;
      const angle = Math.sin(p * Math.PI * 4) * 45;
      return { left: `${leftPos}%`, top: `${topPos}%`, angle, insideCard: false };
    }
  };

  const rocketState = getRocketStyle();

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className="relative h-[440vh]"
      style={{ backgroundColor: getBackground() }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* =====================================================
            BACKGROUND ENVIRONMENT & HIGH-CONTRAST DARK ASTEROIDS
        ===================================================== */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          
          {/* Light Grid */}
          <div
            className="absolute inset-0"
            style={{
              opacity: (0.055 - environmentProgress * 0.04) * (1 - darkProgress),
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)
              `,
              backgroundSize: '64px 64px',
            }}
          />

          {/* Dark Grid */}
          <div
            className="absolute inset-0"
            style={{
              opacity: darkProgress * 0.08,
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)
              `,
              backgroundSize: '64px 64px',
            }}
          />

          {/* Atmospheres */}
          <div
            className="absolute -left-[20%] top-[10%] h-[65vh] w-[65vh] rounded-full blur-[150px]"
            style={{
              background: 'rgba(147, 51, 234, 0.25)',
              opacity: environmentProgress * 0.9,
            }}
          />
          <div
            className="absolute -right-[20%] bottom-[5%] h-[60vh] w-[60vh] rounded-full blur-[150px]"
            style={{
              background: 'rgba(5, 150, 105, 0.2)',
              opacity: environmentProgress * 0.9,
            }}
          />

          {/* Star Field */}
          {[
            [8, 18], [17, 73], [29, 28], [39, 82], [51, 17],
            [63, 68], [76, 31], [87, 79], [94, 21], [71, 87],
            [44, 48], [12, 43], [85, 40], [22, 90], [54, 30], [33, 60]
          ].map(([left, top], index) => (
            <div
              key={index}
              className="absolute h-1 w-1 rounded-full bg-white"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                opacity: darkProgress * (0.4 + (index % 3) * 0.3),
                boxShadow: '0 0 12px rgba(255,255,255,0.9)',
              }}
            />
          ))}

          {/* ===================================================
              DARK, VISIBLE ASTEROIDS
          ================================================== */}
          {[
            { x: 15, y: 25, size: 55, speed: 1.3, label: 'AST-01' },
            { x: 45, y: 75, size: 75, speed: 0.8, label: 'ROCK-9' },
            { x: 75, y: 18, size: 65, speed: 1.6, label: 'DEBRIS' },
            { x: 30, y: 85, size: 50, speed: 1.0, label: 'METEOR' },
            { x: 85, y: 65, size: 70, speed: 1.2, label: 'SECTOR-X' },
          ].map((ast, i) => {
            const parallax = (progress * 150 * ast.speed) % 140 - 10;
            return (
              <div
                key={i}
                className="absolute rounded-2xl border-2 border-zinc-800 bg-zinc-950/95 backdrop-blur-md flex flex-col items-center justify-center font-mono text-[10px] font-black text-zinc-300 shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
                style={{
                  left: `${ast.x - parallax * 0.15}%`,
                  top: `${ast.y + Math.sin(progress * Math.PI * 5 + i) * 12}%`,
                  width: `${ast.size}px`,
                  height: `${ast.size}px`,
                  transform: `rotate(${progress * 220 * (i + 1)}deg)`,
                }}
              >
                <div className="w-2 h-2 rounded-full bg-zinc-600 mb-1" />
                <span className="tracking-widest">{ast.label}</span>
              </div>
            );
          })}
        </div>

        {/* =====================================================
            PHASE 1 — TRANSITION HEADINGS
        ===================================================== */}
        <div
          className="absolute left-1/2 top-1/2 z-30 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 px-6 text-center transition-opacity duration-300"
          style={{
            opacity: Math.max(0, 1 - cardsProgress * 2.5),
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Heading 1: Launch Sequence */}
          <div
            className="transition-all duration-500 rounded-3xl p-8 sm:p-12 bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-200"
            style={{
              opacity: environmentProgress < 0.25 ? 1 : 0,
              transform: `translateY(${environmentProgress < 0.25 ? 0 : -20}px)`,
              pointerEvents: environmentProgress < 0.25 ? 'auto' : 'none',
              position: 'absolute',
              left: 0,
              right: 0,
              margin: '0 auto',
              width: '90%',
              maxWidth: '750px',
            }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-[11px] font-black uppercase tracking-[0.3em] text-purple-700 mb-3">
              Stage 01 • Ignition
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-tight">
              From idea <span className="text-purple-600 underline decoration-purple-300">to impact.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-zinc-700 font-medium leading-relaxed">
              A structured roadmap of learning, building, collaborating, and launching your cloud engineering potential.
            </p>
          </div>

          {/* Heading 2: Breaking Atmosphere */}
          <div
            className="transition-all duration-500 rounded-3xl p-8 sm:p-12 bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-zinc-200"
            style={{
              opacity: environmentProgress >= 0.25 && environmentProgress < 0.5 ? 1 : 0,
              transform: `translateY(${environmentProgress >= 0.25 && environmentProgress < 0.5 ? 0 : -20}px)`,
              pointerEvents: environmentProgress >= 0.25 && environmentProgress < 0.5 ? 'auto' : 'none',
              position: 'absolute',
              left: 0,
              right: 0,
              margin: '0 auto',
              width: '90%',
              maxWidth: '750px',
            }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-[11px] font-black uppercase tracking-[0.3em] text-purple-700 mb-3">
              Stage 02 • Ascent
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-tight">
              Breaking <span className="text-purple-600">Barriers.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-zinc-700 font-medium leading-relaxed">
              Leaving conventional limits behind. Accelerating through foundational cloud architectures.
            </p>
          </div>

          {/* Heading 3: Deep Space Orbit */}
          <div
            className="transition-all duration-500 rounded-3xl p-8 sm:p-12 bg-zinc-900/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-800"
            style={{
              opacity: environmentProgress >= 0.5 && environmentProgress < 0.75 ? 1 : 0,
              transform: `translateY(${environmentProgress >= 0.5 && environmentProgress < 0.75 ? 0 : -20}px)`,
              pointerEvents: environmentProgress >= 0.5 && environmentProgress < 0.75 ? 'auto' : 'none',
              position: 'absolute',
              left: 0,
              right: 0,
              margin: '0 auto',
              width: '90%',
              maxWidth: '750px',
            }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-purple-950 text-[11px] font-black uppercase tracking-[0.3em] text-purple-300 mb-3 border border-purple-800/50">
              Stage 03 • Deep Orbit
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Scaling <span className="text-emerald-400">New Heights.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-zinc-300 font-medium leading-relaxed">
              Engines primed. Navigating through infrastructure layers toward full execution.
            </p>
          </div>

          {/* Heading 4: Approach Vector */}
          <div
            className="transition-all duration-500 rounded-3xl p-8 sm:p-12 bg-zinc-900/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-800"
            style={{
              opacity: environmentProgress >= 0.75 ? 1 : 0,
              transform: `translateY(${environmentProgress >= 0.75 ? 0 : -20}px)`,
              pointerEvents: environmentProgress >= 0.75 ? 'auto' : 'none',
              position: 'absolute',
              left: 0,
              right: 0,
              margin: '0 auto',
              width: '90%',
              maxWidth: '750px',
            }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-950 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-300 mb-3 border border-emerald-800/50">
              Stage 04 • Final Approach
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Ready for <span className="text-purple-400">Deployment.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-zinc-300 font-medium leading-relaxed">
              Systems stable. Locking coordinates onto the deployment timeline below.
            </p>
          </div>
        </div>

        {/* =====================================================
            DETAILED ROCKET SVG
        ===================================================== */}
        <div
          className="absolute z-[60] pointer-events-none transition-all duration-75 ease-out"
          style={{
            left: rocketState.left,
            top: rocketState.top,
            transform: `translate(-50%, -50%) rotate(${rocketState.angle}deg)`,
            opacity: rocketState.insideCard ? 0 : 1,
            scale: rocketState.insideCard ? '0.2' : '1',
          }}
        >
          {/* Exhaust Flame & Particle Trail */}
          <div className="absolute -left-36 top-1/2 -translate-y-1/2 flex items-center">
            <div className="h-6 w-36 bg-gradient-to-r from-transparent via-amber-500/60 to-purple-600/90 blur-sm rounded-full animate-pulse" />
            <div className="absolute left-0 w-8 h-3 bg-white rounded-full blur-md animate-ping" />
          </div>

          {/* Custom Rocket SVG Body */}
          <div className="relative flex h-24 w-24 items-center justify-center filter drop-shadow-[0_0_25px_rgba(147,51,234,0.8)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-16 h-16 text-purple-300 transform rotate-45"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#111113"
                d="M4.5 16.5c-1.5 1.26-2 3-2 3s1.74-.5 3-2c.5-.55.9-1.2 1.2-1.9m10.8-10.8C16.8 2.8 14.3 2 12 2s-4.8.8-5.7 1.8c-.9.9-1.7 3.4-1.7 5.7s.8 4.8 1.8 5.7c.9.9 3.4 1.7 5.7 1.7s4.8-.8 5.7-1.7c.9-.9 1.8-3.4 1.8-5.7s-.9-4.8-1.8-5.7z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" fill="#9333ea" d="M12 15l3-3-6-6-3 3 6 6z" />
              <circle cx="12" cy="10" r="1.5" fill="#34d399" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l3-3M21 3l-3 3" />
            </svg>
          </div>
        </div>

        {/* =====================================================
            ROADMAP CARDS (Solid Opaque Panels, Bold Typography, No Quarters)
        ===================================================== */}
        <div
          className="absolute left-0 top-1/2 z-50 flex items-center gap-[8vw] pl-[12vw]"
          style={{
            transform: `translateY(-42%) translateX(${cardTrackX}vw)`,
            opacity: cardsProgress,
          }}
        >
          {roadmap.map((item, index) => (
            <div
              key={item.number}
              className="relative w-[82vw] shrink-0 sm:w-[64vw] lg:w-[52vw] xl:w-[47vw]"
            >
              {/* Connector */}
              {index > 0 && (
                <div
                  className="absolute -left-[8vw] top-1/2 h-px w-[8vw]"
                  style={{ background: 'rgba(255,255,255,0.3)' }}
                />
              )}

              {/* CARD CONTAINER */}
              <div
                className="relative overflow-hidden rounded-[36px] border-2 border-zinc-700 bg-zinc-900 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.9)] sm:p-10 lg:p-12 text-white"
                style={{
                  transform: `translateY(${index % 2 === 0 ? 0 : 35}px)`,
                  opacity: ease(clamp((cardsProgress - index * 0.1) / 0.3)),
                }}
              >
                {/* Subtle Accent Glow */}
                <div
                  className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full blur-[110px]"
                  style={{ background: item.accent, opacity: 0.18 }}
                />

                <div className="relative z-10">
                  {/* Top Bar (Quarters removed completely as requested) */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-700 shadow-xl"
                        style={{
                          background: `${item.accent}30`,
                          color: item.accent,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p
                          className="text-xs font-black uppercase tracking-[0.3em]"
                          style={{ color: item.accent }}
                        >
                          {item.phase}
                        </p>
                        <p className="mt-1 text-sm font-extrabold text-white tracking-wider">
                          STAGE {item.number}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-6xl font-black text-zinc-700">
                      {item.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-9 max-w-2xl text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl leading-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-100 sm:text-base font-semibold">
                    {item.desc}
                  </p>

                  {/* Points / Badges */}
                  <div className="mt-8 flex flex-wrap gap-2.5">
                    {item.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-2.5 rounded-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 shadow-md"
                      >
                        <Check size={14} style={{ color: item.accent }} />
                        <span className="text-xs font-bold text-white tracking-wide">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Card Bottom Footer */}
                  <div className="mt-10 flex items-center justify-between border-t border-zinc-800 pt-6">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">
                        Community focus
                      </p>
                      <p className="mt-1 text-xs font-bold text-white">
                        Learn through execution
                      </p>
                    </div>
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 shadow-md"
                      style={{
                        background: `${item.accent}30`,
                        color: item.accent,
                      }}
                    >
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Final Destination Card ("Build. Ship. Repeat.") where the rocket docks inside */}
          <div className="flex w-[45vw] shrink-0 items-center justify-center">
            <div className="relative text-center bg-zinc-900 p-10 rounded-[36px] border-2 border-zinc-700 shadow-2xl text-white overflow-hidden">
              
              {/* Rocket docked inside appearance when progress is at the end */}
              {rocketState.insideCard && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-md transition-opacity duration-500">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600/30 border border-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.6)] animate-bounce mb-3">
                    <Trophy size={32} className="text-purple-400" />
                  </div>
                  <span className="font-mono text-xs font-black uppercase tracking-[0.3em] text-purple-300">
                    MISSION ACCOMPLISHED
                  </span>
                  <p className="mt-2 text-sm font-bold text-white">Rocket Docked Successfully</p>
                </div>
              )}

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-purple-500/30 bg-purple-950/50 shadow-inner">
                <Trophy size={28} className="text-purple-400" />
              </div>
              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                THE DESTINATION
              </p>
              <h3 className="mt-3 text-4xl font-black tracking-tight text-white leading-snug">
                Build.
                <br />
                Ship.
                <br />
                Repeat.
              </h3>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM PROGRESS BAR
        ===================================================== */}
        <div className="absolute bottom-8 left-6 right-6 z-[80] flex items-center justify-between sm:left-10 sm:right-10">
          <div className="flex items-center gap-3">
            <Terminal
              size={13}
              style={{ color: isDark ? '#a1a1aa' : '#52525b' }}
            />
            <span
              className="text-[9px] font-bold uppercase tracking-[0.25em]"
              style={{ color: isDark ? '#a1a1aa' : '#52525b' }}
            >
              Scroll to explore
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span
              className="font-mono text-[9px]"
              style={{ color: isDark ? '#a1a1aa' : '#52525b' }}
            >
              ROADMAP
            </span>
            <div
              className="h-px w-20"
              style={{
                background: isDark
                  ? 'rgba(255,255,255,0.2)'
                  : 'rgba(0,0,0,0.2)',
              }}
            >
              <div
                className="h-full bg-purple-600"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}