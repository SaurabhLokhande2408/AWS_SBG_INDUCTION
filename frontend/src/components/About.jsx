import React, { useEffect, useRef, useState } from 'react';
import awsLogo from '../aws_logo.png';

import {
  Terminal,
  Users,
  Cpu,
  Rocket,
  Cloud,
  Code2,
  Network,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export default function About() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  /* =========================================================
     SCROLL PROGRESS
     
     ONLY controls the content/card animation.
     The background network animation is completely
     independent and handled by CSS.
  ========================================================= */

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();

      const totalScroll =
        sectionRef.current.offsetHeight - window.innerHeight;

      const currentScroll = Math.max(0, -rect.top);

      const value = Math.min(
        1,
        Math.max(
          0,
          currentScroll / Math.max(totalScroll, 1)
        )
      );

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

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);


  /* =========================================================
     HELPERS
  ========================================================= */

  const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

  const ease = (value) => {
    const t = clamp(value);
    return t * t * (3 - 2 * t);
  };

  const lerp = (a, b, t) => a + (b - a) * t;


  /* =========================================================
     PILLARS
  ========================================================= */

  const pillars = [
    {
      number: '01',
      eyebrow: 'BUILD',
      title: 'Hands-on Engineering',
      text:
        'Build real cloud backends, APIs, applications and automation instead of stopping at tutorials.',
      icon: <Terminal size={22} />,
      color: '#8b5cf6',
    },

    {
      number: '02',
      eyebrow: 'CONNECT',
      title: 'Community & Collaboration',
      text:
        'Developers, designers, creators and technical minds working together on meaningful initiatives.',
      icon: <Users size={22} />,
      color: '#10b981',
    },

    {
      number: '03',
      eyebrow: 'SHIP',
      title: 'Projects & Challenges',
      text:
        'Turn ideas into working products through projects, hackathons and technical challenges.',
      icon: <Rocket size={22} />,
      color: '#f97316',
    },

    {
      number: '04',
      eyebrow: 'GROW',
      title: 'Industry Readiness',
      text:
        'Develop practical cloud knowledge, engineering discipline and confidence beyond the classroom.',
      icon: <ShieldCheck size={22} />,
      color: '#3b82f6',
    },
  ];


  /* =========================================================
     FOCUS AREAS
  ========================================================= */

  const focusAreas = [
    {
      title: 'Cloud',
      text: 'AWS infrastructure, architecture and deployment.',
      icon: <Cloud size={20} />,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },

    {
      title: 'AI / ML',
      text: 'Machine learning systems and intelligent applications.',
      icon: <Cpu size={20} />,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
    },

    {
      title: 'Software',
      text: 'Modern development, APIs and real products.',
      icon: <Code2 size={20} />,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },

    {
      title: 'DevOps',
      text: 'Automation, CI/CD and scalable workflows.',
      icon: <Network size={20} />,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
  ];


  /* =========================================================
     CARD POSITIONS
     
     Cards slowly rearrange as the user scrolls.
     Once they reach their final position, they stay there.
  ========================================================= */

  const getCard = (index) => {
    const start = [
      [-31, 13, -4, 0.9],
      [0, 5, 0, 0.94],
      [31, 13, 4, 0.9],
      [0, 39, 0, 0.76],
    ][index];

    const arrange = [
      [-25, 7, -7, 0.84],
      [25, 3, 7, 0.88],
      [-22, 37, 5, 0.82],
      [22, 37, -5, 0.82],
    ][index];

    const spread = [
      [-28, 1, -9, 0.76],
      [28, 1, 9, 0.76],
      [-27, 38, 8, 0.74],
      [27, 38, -8, 0.74],
    ][index];

    const edges = [
      [-43, -12, -12, 0.66],
      [43, -12, 12, 0.66],
      [-41, 51, 12, 0.64],
      [41, 51, -12, 0.64],
    ][index];


    /* -------------------------------------------------------
       INTRO
    ------------------------------------------------------- */

    if (progress < 0.25) {
      return start;
    }


    /* -------------------------------------------------------
       REARRANGE
    ------------------------------------------------------- */

    if (progress < 0.48) {
      const t = ease(
        (progress - 0.25) / 0.23
      );

      return start.map((value, i) =>
        lerp(value, arrange[i], t)
      );
    }


    /* -------------------------------------------------------
       SPREAD
    ------------------------------------------------------- */

    if (progress < 0.68) {
      const t = ease(
        (progress - 0.48) / 0.2
      );

      return arrange.map((value, i) =>
        lerp(value, spread[i], t)
      );
    }


    /* -------------------------------------------------------
       MOVE OUTWARD
    ------------------------------------------------------- */

    if (progress < 0.78) {
      const t = ease(
        (progress - 0.68) / 0.1
      );

      return spread.map((value, i) =>
        lerp(value, edges[i], t)
      );
    }


    /* -------------------------------------------------------
       FINAL POSITION

       Cards stay visible.
    ------------------------------------------------------- */

    return edges;
  };


  /* =========================================================
     SECTION PHASES
  ========================================================= */

  const introOpacity =
    1 - ease(clamp(progress / 0.22));

  const centerOpacity = ease(
    clamp((progress - 0.5) / 0.16)
  );

  const finalInfoProgress = ease(
    clamp((progress - 0.68) / 0.18)
  );


  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-white"
    >

      {/* =====================================================
          ENTIRE ABOUT EXPERIENCE

          The long scroll space makes sure the complete
          animation finishes before the next section.
      ===================================================== */}

      <div className="relative h-[220vh]">

        <div className="sticky top-0 h-screen overflow-hidden">


          {/* =================================================
              BACKGROUND
              
              WHITE + SUBTLE GRID + MANY INDEPENDENT
              MOVING NETWORK LINES.
              
              IMPORTANT:
              None of these lines use `progress`.
              They animate continuously with CSS.
          ================================================= */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">


            {/* =================================================
                BASE TECHNICAL GRID
            ================================================= */}

            <div
              className="absolute inset-0 opacity-[0.045]"
              style={{
                backgroundImage: `
                  linear-gradient(
                    rgba(24,24,27,0.7) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(24,24,27,0.7) 1px,
                    transparent 1px
                  )
                `,
                backgroundSize: '64px 64px',
              }}
            />


            {/* =================================================
                MICRO GRID
            ================================================= */}

            <div
              className="absolute inset-0 opacity-[0.018]"
              style={{
                backgroundImage: `
                  linear-gradient(
                    rgba(124,58,237,0.8) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(124,58,237,0.8) 1px,
                    transparent 1px
                  )
                `,
                backgroundSize: '16px 16px',
              }}
            />


            {/* =================================================
                HORIZONTAL MOVING LINES
            ================================================= */}

            {/* 01 — Purple */}

            <div
              className="network-line-horizontal"
              style={{
                top: '7%',
                width: '260px',
                background:
                  'linear-gradient(90deg, transparent, #8b5cf6, transparent)',
                animationDuration: '8s',
                animationDelay: '-2s',
                opacity: 0.58,
              }}
            />


            {/* 02 — Blue */}

            <div
              className="network-line-horizontal"
              style={{
                top: '13%',
                width: '180px',
                background:
                  'linear-gradient(90deg, transparent, #3b82f6, transparent)',
                animationDuration: '11s',
                animationDelay: '-7s',
                opacity: 0.5,
              }}
            />


            {/* 03 — Orange */}

            <div
              className="network-line-horizontal reverse"
              style={{
                top: '20%',
                width: '320px',
                background:
                  'linear-gradient(90deg, transparent, #f97316, transparent)',
                animationDuration: '13s',
                animationDelay: '-4s',
                opacity: 0.52,
              }}
            />


            {/* 04 — Green */}

            <div
              className="network-line-horizontal"
              style={{
                top: '27%',
                width: '220px',
                background:
                  'linear-gradient(90deg, transparent, #10b981, transparent)',
                animationDuration: '9s',
                animationDelay: '-6s',
                opacity: 0.48,
              }}
            />


            {/* 05 — Purple */}

            <div
              className="network-line-horizontal reverse"
              style={{
                top: '34%',
                width: '280px',
                background:
                  'linear-gradient(90deg, transparent, #8b5cf6, transparent)',
                animationDuration: '15s',
                animationDelay: '-9s',
                opacity: 0.48,
              }}
            />


            {/* 06 — Blue */}

            <div
              className="network-line-horizontal"
              style={{
                top: '41%',
                width: '190px',
                background:
                  'linear-gradient(90deg, transparent, #2563eb, transparent)',
                animationDuration: '7s',
                animationDelay: '-3s',
                opacity: 0.55,
              }}
            />


            {/* 07 — Orange */}

            <div
              className="network-line-horizontal reverse"
              style={{
                top: '48%',
                width: '350px',
                background:
                  'linear-gradient(90deg, transparent, #f97316, transparent)',
                animationDuration: '12s',
                animationDelay: '-10s',
                opacity: 0.5,
              }}
            />


            {/* 08 — Green */}

            <div
              className="network-line-horizontal"
              style={{
                top: '55%',
                width: '210px',
                background:
                  'linear-gradient(90deg, transparent, #10b981, transparent)',
                animationDuration: '10s',
                animationDelay: '-5s',
                opacity: 0.46,
              }}
            />


            {/* 09 — Purple */}

            <div
              className="network-line-horizontal reverse"
              style={{
                top: '62%',
                width: '270px',
                background:
                  'linear-gradient(90deg, transparent, #8b5cf6, transparent)',
                animationDuration: '14s',
                animationDelay: '-8s',
                opacity: 0.52,
              }}
            />


            {/* 10 — Blue */}

            <div
              className="network-line-horizontal"
              style={{
                top: '69%',
                width: '180px',
                background:
                  'linear-gradient(90deg, transparent, #3b82f6, transparent)',
                animationDuration: '8.5s',
                animationDelay: '-1s',
                opacity: 0.5,
              }}
            />


            {/* 11 — Orange */}

            <div
              className="network-line-horizontal reverse"
              style={{
                top: '76%',
                width: '330px',
                background:
                  'linear-gradient(90deg, transparent, #f97316, transparent)',
                animationDuration: '16s',
                animationDelay: '-11s',
                opacity: 0.46,
              }}
            />


            {/* 12 — Green */}

            <div
              className="network-line-horizontal"
              style={{
                top: '83%',
                width: '230px',
                background:
                  'linear-gradient(90deg, transparent, #10b981, transparent)',
                animationDuration: '10.5s',
                animationDelay: '-4s',
                opacity: 0.48,
              }}
            />


            {/* 13 — Purple */}

            <div
              className="network-line-horizontal reverse"
              style={{
                top: '90%',
                width: '290px',
                background:
                  'linear-gradient(90deg, transparent, #8b5cf6, transparent)',
                animationDuration: '13.5s',
                animationDelay: '-7s',
                opacity: 0.45,
              }}
            />


            {/* 14 — Blue */}

            <div
              className="network-line-horizontal"
              style={{
                top: '96%',
                width: '210px',
                background:
                  'linear-gradient(90deg, transparent, #3b82f6, transparent)',
                animationDuration: '9.5s',
                animationDelay: '-2s',
                opacity: 0.44,
              }}
            />


            {/* =================================================
                VERTICAL MOVING LINES
            ================================================= */}

            {/* 01 */}

            <div
              className="network-line-vertical"
              style={{
                left: '6%',
                height: '190px',
                background:
                  'linear-gradient(180deg, transparent, #8b5cf6, transparent)',
                animationDuration: '9s',
                animationDelay: '-4s',
                opacity: 0.5,
              }}
            />


            {/* 02 */}

            <div
              className="network-line-vertical reverse"
              style={{
                left: '14%',
                height: '250px',
                background:
                  'linear-gradient(180deg, transparent, #3b82f6, transparent)',
                animationDuration: '13s',
                animationDelay: '-8s',
                opacity: 0.44,
              }}
            />


            {/* 03 */}

            <div
              className="network-line-vertical"
              style={{
                left: '22%',
                height: '160px',
                background:
                  'linear-gradient(180deg, transparent, #f97316, transparent)',
                animationDuration: '10s',
                animationDelay: '-5s',
                opacity: 0.48,
              }}
            />


            {/* 04 */}

            <div
              className="network-line-vertical reverse"
              style={{
                left: '30%',
                height: '220px',
                background:
                  'linear-gradient(180deg, transparent, #10b981, transparent)',
                animationDuration: '14s',
                animationDelay: '-10s',
                opacity: 0.44,
              }}
            />


            {/* 05 */}

            <div
              className="network-line-vertical"
              style={{
                left: '39%',
                height: '180px',
                background:
                  'linear-gradient(180deg, transparent, #8b5cf6, transparent)',
                animationDuration: '8s',
                animationDelay: '-3s',
                opacity: 0.48,
              }}
            />


            {/* 06 */}

            <div
              className="network-line-vertical reverse"
              style={{
                left: '48%',
                height: '260px',
                background:
                  'linear-gradient(180deg, transparent, #3b82f6, transparent)',
                animationDuration: '15s',
                animationDelay: '-12s',
                opacity: 0.42,
              }}
            />


            {/* 07 */}

            <div
              className="network-line-vertical"
              style={{
                left: '58%',
                height: '190px',
                background:
                  'linear-gradient(180deg, transparent, #f97316, transparent)',
                animationDuration: '11s',
                animationDelay: '-6s',
                opacity: 0.5,
              }}
            />


            {/* 08 */}

            <div
              className="network-line-vertical reverse"
              style={{
                left: '67%',
                height: '230px',
                background:
                  'linear-gradient(180deg, transparent, #10b981, transparent)',
                animationDuration: '12s',
                animationDelay: '-9s',
                opacity: 0.44,
              }}
            />


            {/* 09 */}

            <div
              className="network-line-vertical"
              style={{
                left: '76%',
                height: '170px',
                background:
                  'linear-gradient(180deg, transparent, #8b5cf6, transparent)',
                animationDuration: '9.5s',
                animationDelay: '-2s',
                opacity: 0.5,
              }}
            />


            {/* 10 */}

            <div
              className="network-line-vertical reverse"
              style={{
                left: '86%',
                height: '250px',
                background:
                  'linear-gradient(180deg, transparent, #3b82f6, transparent)',
                animationDuration: '14.5s',
                animationDelay: '-11s',
                opacity: 0.44,
              }}
            />


            {/* 11 */}

            <div
              className="network-line-vertical"
              style={{
                left: '94%',
                height: '180px',
                background:
                  'linear-gradient(180deg, transparent, #f97316, transparent)',
                animationDuration: '10.5s',
                animationDelay: '-5s',
                opacity: 0.48,
              }}
            />


            {/* =================================================
                MOVING NETWORK NODES
            ================================================= */}

            <div
              className="network-node purple-node"
              style={{
                left: '18%',
                top: '21%',
                animationDuration: '5s',
              }}
            />

            <div
              className="network-node blue-node"
              style={{
                left: '47%',
                top: '39%',
                animationDuration: '6.5s',
                animationDelay: '-2s',
              }}
            />

            <div
              className="network-node orange-node"
              style={{
                left: '72%',
                top: '63%',
                animationDuration: '5.5s',
                animationDelay: '-3s',
              }}
            />

            <div
              className="network-node green-node"
              style={{
                left: '31%',
                top: '80%',
                animationDuration: '7s',
                animationDelay: '-4s',
              }}
            />

            <div
              className="network-node purple-node"
              style={{
                left: '83%',
                top: '27%',
                animationDuration: '6s',
                animationDelay: '-1s',
              }}
            />

            <div
              className="network-node blue-node"
              style={{
                left: '11%',
                top: '70%',
                animationDuration: '7.5s',
                animationDelay: '-5s',
              }}
            />


            {/* =================================================
                ATMOSPHERIC LIGHT
            ================================================= */}

            <div
              className="absolute -left-[18%] top-[5%] h-[65vh] w-[65vh] rounded-full bg-purple-100/30 blur-[150px]"
            />

            <div
              className="absolute -right-[18%] bottom-[5%] h-[65vh] w-[65vh] rounded-full bg-orange-100/25 blur-[150px]"
            />

            <div className="absolute left-1/2 top-1/2 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-50/40 blur-[140px]" />


            {/* =================================================
                ORBIT
            ================================================= */}

            <div
              className="absolute left-1/2 top-1/2 h-[72vh] w-[72vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-200/25"
              style={{
                animation:
                  'aboutOrbit 24s linear infinite',
              }}
            >

              <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-purple-400/50" />

              <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-orange-400/50" />

            </div>


            <div
              className="absolute left-1/2 top-1/2 h-[46vh] w-[46vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-200/20"
              style={{
                animation:
                  'aboutOrbitReverse 18s linear infinite',
              }}
            />

          </div>


          {/* =================================================
              INTRO
          ================================================= */}

          <div
            className="absolute left-1/2 top-[13%] z-40 w-full max-w-5xl -translate-x-1/2 px-6 text-center"
            style={{
              opacity: introOpacity,
              transform: `
                translateX(-50%)
                translateY(${-progress * 70}px)
              `,
            }}
          >

            <div className="mb-5 flex items-center justify-center gap-3">

              <span className="h-[2px] w-8 rounded-full bg-orange-500" />

              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                Identity & Philosophy
              </span>

              <span className="h-[2px] w-8 rounded-full bg-orange-500" />

            </div>


            <h2 className="text-5xl font-black leading-none tracking-[-0.065em] text-zinc-950 sm:text-6xl lg:text-8xl">

              More than a

              <span className="text-purple-700">
                {' '}student club.
              </span>

            </h2>


            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-zinc-500 sm:text-lg">
              A builder-first community at RMDSSOE
              where students learn technology by
              actually creating with it.
            </p>

          </div>


          {/* =================================================
              FLOATING CARDS
              
              SOLID BLACK.
          ================================================= */}

          {pillars.map((item, index) => {

            const [x, y, rotate, scale] =
              getCard(index);

            return (
              <div
                key={item.number}
                className="absolute left-1/2 top-[53%] w-[290px] sm:w-[330px] lg:w-[380px]"
                style={{
                  transform: `
                    translate(-50%, -50%)
                    translateX(${x}vw)
                    translateY(${y}vh)
                    rotate(${rotate}deg)
                    scale(${scale})
                  `,
                  zIndex: 10 + index,
                }}
              >

                <div className="relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#080808] p-8 shadow-[0_35px_90px_-25px_rgba(0,0,0,0.55)]">

                  {/* Internal glow */}

                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-[65px]"
                    style={{
                      background: item.color,
                      opacity: 0.08,
                    }}
                  />


                  {/* Internal grid */}

                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.025]"
                    style={{
                      backgroundImage: `
                        linear-gradient(
                          rgba(255,255,255,0.8) 1px,
                          transparent 1px
                        ),
                        linear-gradient(
                          90deg,
                          rgba(255,255,255,0.8) 1px,
                          transparent 1px
                        )
                      `,
                      backgroundSize: '32px 32px',
                    }}
                  />


                  <div className="relative z-10">

                    <div className="flex justify-between">

                      <span
                        className="text-xs font-black tracking-[0.25em]"
                        style={{
                          color: item.color,
                        }}
                      >
                        {item.number}
                      </span>

                      <ArrowUpRight
                        size={20}
                        className="text-zinc-600"
                      />

                    </div>


                    <div
                      className="mt-6 flex h-14 w-14 items-center justify-center rounded-xl"
                      style={{
                        background: `${item.color}16`,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </div>


                    <p
                      className="mt-5 text-[11px] font-black tracking-[0.25em]"
                      style={{
                        color: item.color,
                      }}
                    >
                      {item.eyebrow}
                    </p>


                    <h3 className="mt-2 text-2xl font-black tracking-tight text-white">
                      {item.title}
                    </h3>


                    <p className="mt-3 text-sm font-semibold leading-relaxed text-zinc-300">
                      {item.text}
                    </p>


                    <div
                      className="mt-5 h-px w-full"
                      style={{
                        background: `linear-gradient(
                          90deg,
                          ${item.color},
                          transparent
                        )`,
                        opacity: 0.45,
                      }}
                    />

                  </div>

                </div>

              </div>
            );
          })}


          {/* =================================================
              CENTER MESSAGE
          ================================================= */}

          <div
            className="absolute left-1/2 top-[48%] z-20 w-full max-w-2xl -translate-x-1/2 px-6 text-center"
            style={{
              opacity: centerOpacity,
              transform: `
                translateX(-50%)
                translateY(${(1 - centerOpacity) * 50}px)
              `,
            }}
          >

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white shadow-lg">

              <Sparkles
                size={21}
                className="text-purple-600"
              />

            </div>


            <p className="mt-6 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
              The SBG mindset
            </p>


            <h3 className="mt-3 text-4xl font-black tracking-[-0.06em] sm:text-6xl">

              <span className="text-zinc-950">
                Learn.
              </span>

              <span className="text-purple-700">
                {' '}Build.
              </span>

              <span className="text-blue-600">
                {' '}Ship.
              </span>

              <span className="text-orange-600">
                {' '}Grow.
              </span>

            </h3>

          </div>


          {/* =================================================
              FINAL ABOUT CARD
          ================================================= */}

          <div
            className="absolute left-1/2 top-[51%] z-50 w-full max-w-5xl -translate-x-1/2 px-6"
            style={{
              opacity: finalInfoProgress,
              transform: `
                translateX(-50%)
                translateY(${(1 - finalInfoProgress) * 60}px)
              `,
            }}
          >

            <div className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#080808] p-8 shadow-[0_40px_110px_-30px_rgba(0,0,0,0.6)] sm:p-12">


              {/* =================================================
                  INTERNAL CARD ATMOSPHERE
              ================================================= */}

              <div className="pointer-events-none absolute inset-0 overflow-hidden">

                <div className="absolute -left-32 -top-32 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px]" />

                <div className="absolute -bottom-32 -right-32 h-[300px] w-[300px] rounded-full bg-orange-500/10 blur-[100px]" />

                <div
                  className="absolute inset-0 opacity-[0.025]"
                  style={{
                    backgroundImage: `
                      linear-gradient(
                        rgba(255,255,255,0.8) 1px,
                        transparent 1px
                      ),
                      linear-gradient(
                        90deg,
                        rgba(255,255,255,0.8) 1px,
                        transparent 1px
                      )
                    `,
                    backgroundSize: '36px 36px',
                  }}
                />

              </div>


              {/* =================================================
                  CARD CONTENT
              ================================================= */}

              <div className="relative z-10">

                <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">


                  {/* LEFT */}

                  <div>

                    <div className="flex items-center gap-3">

                      <span className="h-[2px] w-7 rounded-full bg-orange-500" />

                      <span className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
                        About AWS SBG
                      </span>

                    </div>


                    <h3 className="mt-5 text-4xl font-black leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl">

                      Curiosity is the

                      <span className="block text-purple-500">
                        starting point.
                      </span>

                    </h3>

                  </div>


                  {/* RIGHT */}

                  <div>

                    <p className="text-base font-semibold leading-relaxed text-zinc-300 sm:text-lg">
                      AWS Student Builder Group at RMDSSOE
                      is a student-led technical community
                      focused on learning through experimentation,
                      building through projects and growing
                      through collaboration.
                    </p>


                    <p className="mt-4 text-base font-semibold leading-relaxed text-zinc-300 sm:text-lg">
                      Students can explore cloud computing,
                      AI/ML, software engineering and DevOps
                      while developing the practical mindset
                      needed to move an idea from concept
                      to implementation.
                    </p>


                    <p className="mt-4 text-base font-semibold leading-relaxed text-zinc-300 sm:text-lg">
                      Technical sessions, projects, hackathons,
                      challenges and community initiatives all
                      contribute to one goal — becoming capable
                      builders.
                    </p>

                  </div>

                </div>


                {/* =================================================
                    FOCUS AREAS
                ================================================= */}

                <div className="mt-9 grid grid-cols-2 gap-3 lg:grid-cols-4">

                  {focusAreas.map((item) => (

                    <div
                      key={item.title}
                      className="group rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-5 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-[#111111]"
                    >

                      <div
                        className={`
                          flex h-11 w-11 items-center justify-center
                          rounded-lg
                          ${item.bg}
                          ${item.color}
                        `}
                      >
                        {item.icon}
                      </div>


                      <p className="mt-4 text-base font-black text-white">
                        {item.title}
                      </p>


                      <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-400">
                        {item.text}
                      </p>

                    </div>

                  ))}

                </div>


                {/* =================================================
                    AWS FOUNDATION
                ================================================= */}

                <div className="mt-7 flex flex-col gap-5 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-[76px] items-center justify-center rounded-xl border border-zinc-800 bg-white">

                      <img
                        src={awsLogo}
                        alt="Amazon Web Services"
                        className="w-[52px] object-contain"
                      />

                    </div>


                    <div>

                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                        Our foundation
                      </p>

                      <p className="mt-1 text-sm font-bold text-white">
                        Build with cloud. Learn through execution.
                      </p>

                    </div>

                  </div>


                  <div className="flex flex-wrap gap-2">

                    {[
                      'Cloud',
                      'AI / ML',
                      'Software',
                      'DevOps',
                      'Community',
                    ].map((tag) => (

                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-bold text-zinc-300"
                      >
                        {tag}
                      </span>

                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              PROGRESS
          ================================================= */}

          <div className="absolute bottom-7 right-8 z-[60]">

            <span className="font-mono text-[10px] font-bold text-zinc-400">
              {String(
                Math.round(progress * 100)
              ).padStart(2, '0')}
              %
            </span>

          </div>


          {/* =================================================
              SCROLL INDICATOR
          ================================================= */}

          <div
            className="absolute bottom-7 left-1/2 z-[60] -translate-x-1/2"
            style={{
              opacity:
                progress > 0.8
                  ? 0
                  : 1,
            }}
          >

            <div className="flex flex-col items-center gap-2">

              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400">
                Scroll to explore
              </span>

              <div className="h-8 w-px bg-zinc-200">

                <div
                  className="w-full bg-zinc-900"
                  style={{
                    height: `${Math.min(
                      progress * 130,
                      100
                    )}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          LOCAL CSS

          The network animation is TIME based.

          It does NOT depend on scroll.
      ===================================================== */}

      <style>{`

        /* =====================================================
           HORIZONTAL LINES
        ===================================================== */

        .network-line-horizontal {
          position: absolute;
          left: 0;
          height: 1px;
          transform: translateX(-30vw);
          animation-name: networkHorizontal;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .network-line-horizontal.reverse {
          animation-name: networkHorizontalReverse;
        }


        /* =====================================================
           VERTICAL LINES
        ===================================================== */

        .network-line-vertical {
          position: absolute;
          top: 0;
          width: 1px;
          transform: translateY(-30vh);
          animation-name: networkVertical;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .network-line-vertical.reverse {
          animation-name: networkVerticalReverse;
        }


        /* =====================================================
           HORIZONTAL MOVEMENT
        ===================================================== */

        @keyframes networkHorizontal {

          0% {
            transform: translateX(-35vw);
          }

          100% {
            transform: translateX(135vw);
          }

        }


        @keyframes networkHorizontalReverse {

          0% {
            transform: translateX(135vw);
          }

          100% {
            transform: translateX(-35vw);
          }

        }


        /* =====================================================
           VERTICAL MOVEMENT
        ===================================================== */

        @keyframes networkVertical {

          0% {
            transform: translateY(-35vh);
          }

          100% {
            transform: translateY(135vh);
          }

        }


        @keyframes networkVerticalReverse {

          0% {
            transform: translateY(135vh);
          }

          100% {
            transform: translateY(-35vh);
          }

        }


        /* =====================================================
           NETWORK NODES
        ===================================================== */

        .network-node {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 999px;

          animation-name: networkNodePulse;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;

          will-change: transform, opacity;
        }


        .purple-node {
          background: #8b5cf6;
          box-shadow:
            0 0 6px rgba(139, 92, 246, 0.65),
            0 0 18px rgba(139, 92, 246, 0.3);
        }


        .blue-node {
          background: #3b82f6;
          box-shadow:
            0 0 6px rgba(59, 130, 246, 0.65),
            0 0 18px rgba(59, 130, 246, 0.3);
        }


        .orange-node {
          background: #f97316;
          box-shadow:
            0 0 6px rgba(249, 115, 22, 0.65),
            0 0 18px rgba(249, 115, 22, 0.3);
        }


        .green-node {
          background: #10b981;
          box-shadow:
            0 0 6px rgba(16, 185, 129, 0.65),
            0 0 18px rgba(16, 185, 129, 0.3);
        }


        @keyframes networkNodePulse {

          0%,
          100% {
            transform: scale(0.65);
            opacity: 0.35;
          }

          50% {
            transform: scale(1.35);
            opacity: 1;
          }

        }


        /* =====================================================
           ORBITS
        ===================================================== */

        @keyframes aboutOrbit {

          from {
            transform:
              translate(-50%, -50%)
              rotate(0deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(360deg);
          }

        }


        @keyframes aboutOrbitReverse {

          from {
            transform:
              translate(-50%, -50%)
              rotate(360deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(0deg);
          }

        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .network-line-horizontal,
          .network-line-vertical,
          .network-node {
            animation: none !important;
          }

        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 640px) {

          .network-line-horizontal {
            opacity: 0.32 !important;
          }

          .network-line-vertical {
            opacity: 0.28 !important;
          }

          .network-node {
            transform: scale(0.75);
          }

        }

      `}</style>

    </section>
  );
}