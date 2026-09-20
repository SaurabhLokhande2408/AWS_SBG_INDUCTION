import React, { useEffect, useRef } from 'react';
import {
  ArrowRight,
  Cloud,
  Cpu,
  ShieldCheck,
} from 'lucide-react';

const FRAME_COUNT = 240;

const frameSrc = (i) =>
  `/frames/frame_${String(i).padStart(4, '0')}.webp`;

const clamp = (v, min, max) =>
  Math.min(max, Math.max(min, v));

export default function Hero() {
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

    let target = 0;
    let current = 0;
    let lastDrawn = -1;

    let sectionTop = 0;
    let scrollDistance = 0;

    let w = 0;
    let h = 0;

    const draw = (index) => {
      let img = images[index];

      if (!img) {
        for (let d = 1; d < FRAME_COUNT; d++) {
          img = images[index - d] || images[index + d];

          if (img) break;
        }
      }

      if (!img) return;

      const scale = Math.max(
        w / img.naturalWidth,
        h / img.naturalHeight
      );

      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;

      ctx.clearRect(0, 0, w, h);

      ctx.drawImage(
        img,
        (w - dw) / 2,
        (h - dh) / 2,
        dw,
        dh
      );

      lastDrawn = index;
    };

    const measure = () => {
      sectionTop =
        section.getBoundingClientRect().top +
        window.scrollY;

      scrollDistance =
        section.offsetHeight -
        window.innerHeight;
    };

    const resizeCanvas = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      const parent = canvas.parentElement;

      if (!parent) return;

      w = parent.clientWidth;
      h = parent.clientHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      ctx.imageSmoothingQuality = 'high';

      measure();
      draw(Math.round(current));
    };

    const tick = () => {
      const diff = target - current;

      if (Math.abs(diff) < 0.02) {
        current = target;

        const idx = Math.round(current);

        if (idx !== lastDrawn) {
          draw(idx);
        }

        raf = null;
        return;
      }

      current += diff * 0.14;

      const idx = Math.round(current);

      if (idx !== lastDrawn) {
        draw(idx);
      }

      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      measure();

      if (scrollDistance <= 0) return;

      const progress = clamp(
        (window.scrollY - sectionTop) /
          scrollDistance,
        0,
        1
      );

      target =
        progress * (FRAME_COUNT - 1);

      if (raf === null) {
        raf = requestAnimationFrame(tick);
      }
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

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      resizeCanvas,
      { passive: true }
    );

    resizeCanvas();

    return () => {
      cancelled = true;

      window.removeEventListener(
        'scroll',
        onScroll
      );

      window.removeEventListener(
        'resize',
        resizeCanvas
      );

      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        h-[220vh]
        bg-[#050509]
      "
    >

      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          overflow-hidden
        "
      >

        {/* =====================================================
            BACKGROUND
        ===================================================== */}
        <div className="absolute inset-0">

          <canvas
            ref={canvasRef}
            className="
              absolute
              inset-0
              block
              w-full
              h-full
              object-cover
              opacity-100
              brightness-[1.12]
              contrast-[1.05]
              saturate-[1.12]
            "
          />

          {/* Left readability */}
          <div
            className="
              absolute
              inset-0
              pointer-events-none
              bg-gradient-to-r
              from-[#030308]/70
              via-[#030308]/35
              via-45%
              to-transparent
            "
          />

          {/* Bottom fade */}
          <div
            className="
              absolute
              inset-0
              pointer-events-none
              bg-gradient-to-t
              from-[#050509]/60
              via-transparent
              to-transparent
            "
          />

          {/* Purple atmosphere */}
          <div
            className="
              absolute
              inset-0
              pointer-events-none
              bg-purple-900/[0.06]
              mix-blend-screen
            "
          />

          {/* Warm atmosphere */}
          <div
            className="
              absolute
              inset-0
              pointer-events-none
              bg-gradient-to-br
              from-transparent
              via-transparent
              to-amber-500/[0.05]
              mix-blend-screen
            "
          />

          {/* Technical grid */}
          <div
            className="
              absolute
              inset-0
              pointer-events-none
              opacity-[0.035]
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(255,255,255,.5) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,.5) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: '80px 80px',
            }}
          />

          {/* Soft vignette */}
          <div
            className="
              absolute
              inset-0
              pointer-events-none
              bg-[radial-gradient(circle_at_65%_45%,transparent_15%,rgba(5,5,9,0.2)_100%)]
            "
          />

        </div>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}
        <div
          className="
            relative
            z-20
            flex
            h-full
            w-full
            items-center
          "
        >

          <div
            className="
              mx-auto
              w-full
              max-w-[1400px]
              px-6
              sm:px-10
              lg:px-16
            "
          >

            <div className="max-w-3xl">

              {/* EYEBROW */}
              <div
                className="
                  mb-7
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/15
                  bg-black/35
                  px-4
                  py-2
                  backdrop-blur-xl
                  shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                "
              >

                <span className="relative flex h-2.5 w-2.5">

                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-emerald-400
                      opacity-60
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-emerald-400
                      shadow-[0_0_15px_rgba(52,211,153,.8)]
                    "
                  />

                </span>

                <span
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.24em]
                    text-white
                    drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
                  "
                >
                  RMDSSOE Student Builder Group
                </span>

              </div>


              {/* HEADING */}
              <h1
                className="
                  max-w-4xl
                  text-5xl
                  sm:text-6xl
                  md:text-7xl
                  lg:text-[82px]
                  font-black
                  leading-[0.92]
                  tracking-[-0.05em]
                  text-white
                  drop-shadow-[0_6px_25px_rgba(0,0,0,0.55)]
                "
              >

                Learn. Build.
                <br />

                <span
                  className="
                    bg-gradient-to-r
                    from-white
                    via-purple-100
                    to-amber-200
                    bg-clip-text
                    text-transparent
                  "
                >
                  Connect.
                </span>

                {' '}

                <span
                  className="
                    text-white
                    drop-shadow-[0_6px_25px_rgba(0,0,0,0.6)]
                  "
                >
                  Grow.
                </span>

              </h1>


              {/* ACCENT */}
              <div className="mt-8 flex items-center gap-2">

                <div
                  className="
                    h-[3px]
                    w-16
                    rounded-full
                    bg-amber-400
                    shadow-[0_0_18px_rgba(251,191,36,.8)]
                  "
                />

                <div
                  className="
                    h-[3px]
                    w-8
                    rounded-full
                    bg-purple-500
                    shadow-[0_0_18px_rgba(168,85,247,.8)]
                  "
                />

                <div
                  className="
                    h-[3px]
                    w-3
                    rounded-full
                    bg-emerald-400
                    shadow-[0_0_18px_rgba(52,211,153,.8)]
                  "
                />

              </div>


              {/* DESCRIPTION */}
              <p
                className="
                  mt-7
                  max-w-2xl
                  text-base
                  sm:text-lg
                  font-medium
                  leading-[1.75]
                  tracking-[-0.01em]
                  text-white
                  drop-shadow-[0_3px_14px_rgba(0,0,0,0.85)]
                "
              >
                An elite hands-on engineering community
                focused on{' '}

                <span className="font-bold text-white">
                  AWS cloud architecture
                </span>

                , AI/ML workflows, and production-grade
                software development.
              </p>


              {/* =================================================
                  FEATURE PILLS
              ================================================= */}
              <div className="mt-7 flex flex-wrap gap-3">

                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                    rounded-xl
                    border
                    border-white/15
                    bg-black/35
                    px-4
                    py-2.5
                    backdrop-blur-xl
                    shadow-[0_8px_25px_rgba(0,0,0,0.2)]
                    transition-all
                    duration-300
                    hover:border-amber-400/40
                    hover:bg-black/45
                  "
                >

                  <Cloud
                    size={15}
                    className="text-amber-400"
                  />

                  <span className="text-xs font-semibold text-white">
                    AWS Cloud
                  </span>

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                    rounded-xl
                    border
                    border-white/15
                    bg-black/35
                    px-4
                    py-2.5
                    backdrop-blur-xl
                    shadow-[0_8px_25px_rgba(0,0,0,0.2)]
                    transition-all
                    duration-300
                    hover:border-purple-400/40
                    hover:bg-black/45
                  "
                >

                  <Cpu
                    size={15}
                    className="text-purple-400"
                  />

                  <span className="text-xs font-semibold text-white">
                    AI / ML Systems
                  </span>

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                    rounded-xl
                    border
                    border-white/15
                    bg-black/35
                    px-4
                    py-2.5
                    backdrop-blur-xl
                    shadow-[0_8px_25px_rgba(0,0,0,0.2)]
                    transition-all
                    duration-300
                    hover:border-emerald-400/40
                    hover:bg-black/45
                  "
                >

                  <ShieldCheck
                    size={15}
                    className="text-emerald-400"
                  />

                  <span className="text-xs font-semibold text-white">
                    DevOps & Scale
                  </span>

                </div>

              </div>


              {/* =================================================
                  SOCIAL / CTA BUTTONS
              ================================================= */}
              <div className="mt-9 flex flex-wrap items-center gap-3">

                {/* WHATSAPP */}
                <a
                  href="https://chat.whatsapp.com/LwAEdiaUoOw9U9qNM2b767?s=cl&p=a&mlu=4&ilr=4"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    bg-white
                    px-6
                    py-3.5
                    text-sm
                    font-bold
                    text-black
                    shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-zinc-100
                  "
                >

                  {/* WhatsApp */}
                  <svg
                    viewBox="0 0 24 24"
                    className="
                      h-[20px]
                      w-[20px]
                      text-[#25D366]
                    "
                    fill="currentColor"
                  >
                    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.48 0 .14 5.34.14 11.9c0 2.1.55 4.15 1.6 5.96L.04 24l6.28-1.65a11.9 11.9 0 0 0 5.71 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.42-8.43ZM12.04 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.88 9.88 0 1 1 8.36 4.62Zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                  </svg>

                  <span>
                    Join Community
                  </span>

                  <ArrowRight
                    size={17}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />

                </a>


                {/* INSTAGRAM */}
                <a
                  href="https://www.instagram.com/aws.sbg.rmdssoe/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="
                    group
                    flex
                    h-[50px]
                    w-[50px]
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/15
                    bg-black/35
                    backdrop-blur-xl
                    text-white
                    shadow-[0_8px_25px_rgba(0,0,0,0.2)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-pink-400/50
                    hover:bg-pink-500/15
                  "
                >

                  <svg
                    viewBox="0 0 24 24"
                    className="
                      h-[21px]
                      w-[21px]
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect
                      x="2.5"
                      y="2.5"
                      width="19"
                      height="19"
                      rx="5"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="4.2"
                    />

                    <circle
                      cx="17.7"
                      cy="6.4"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>

                </a>


                {/* LINKEDIN */}
                <a
                  href="https://www.linkedin.com/company/145189292"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="
                    group
                    flex
                    h-[50px]
                    w-[50px]
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/15
                    bg-black/35
                    backdrop-blur-xl
                    text-white
                    shadow-[0_8px_25px_rgba(0,0,0,0.2)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-blue-400/50
                    hover:bg-blue-500/15
                  "
                >

                  <svg
                    viewBox="0 0 24 24"
                    className="
                      h-[21px]
                      w-[21px]
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                    fill="currentColor"
                  >
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.54 20.45H7.1V9H3.54v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
                  </svg>

                </a>

              </div>


              {/* BOTTOM STATEMENT */}
              <div
                className="
                  mt-7
                  flex
                  items-center
                  gap-3
                  text-xs
                  font-medium
                  text-white/75
                  drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
                "
              >

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-400
                    shadow-[0_0_10px_rgba(52,211,153,.9)]
                  "
                />

                <span>
                  Turn engineering ideas into
                  production-ready reality.
                </span>

              </div>

            </div>

          </div>
        </div>


        {/* =====================================================
            FLOATING FULL-IMAGE LOGO CARD
        ===================================================== */}
        <a
          href="https://www.instagram.com/aws.sbg.rmdssoe/"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit AWS SBG RMDSSOE on Instagram"
          className="
            group
            pointer-events-auto
            absolute
            right-6
            bottom-6
            z-30
            block
            w-[190px]
            h-[230px]
            overflow-hidden
            rounded-[28px]
            border
            border-white/[0.14]
            bg-[#090811]
            shadow-[0_20px_70px_rgba(0,0,0,0.55)]
            transition-all
            duration-500
            ease-out
            hover:-translate-y-4
            hover:rotate-[1deg]
            hover:scale-[1.035]
            hover:border-white/[0.30]
            hover:shadow-[0_35px_100px_rgba(0,0,0,0.75)]
            cursor-pointer
          "
        >

          {/* Full-card image */}
          <div className="absolute inset-0 overflow-hidden rounded-[28px]">
            <img
              src="/images/logo_card.png"
              alt="AWS SBG"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.06]
              "
            />

            {/* Subtle cinematic overlay */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/30
                via-transparent
                to-black/10
                transition-all
                duration-500
                group-hover:from-black/10
              "
            />
          </div>

          {/* Top glass highlight */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              z-20
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/60
              to-transparent
              opacity-70
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
          />

          {/* Purple ambient glow */}
          <div
            className="
              pointer-events-none
              absolute
              -top-20
              -right-20
              z-10
              h-40
              w-40
              rounded-full
              bg-purple-500/[0.10]
              blur-3xl
              transition-all
              duration-700
              group-hover:scale-125
              group-hover:bg-purple-500/[0.18]
            "
          />

          {/* Orange ambient glow */}
          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              -left-20
              z-10
              h-40
              w-40
              rounded-full
              bg-orange-500/[0.08]
              blur-3xl
              transition-all
              duration-700
              group-hover:scale-125
              group-hover:bg-orange-500/[0.15]
            "
          />

          {/* Inner glass border */}
          <div
            className="
              pointer-events-none
              absolute
              inset-[1px]
              z-30
              rounded-[27px]
              border
              border-white/[0.05]
              transition-all
              duration-500
              group-hover:border-white/[0.12]
            "
          />

          {/* Bottom accent */}
          <div
            className="
              pointer-events-none
              absolute
              bottom-6
              left-6
              z-30
              h-[2px]
              w-10
              rounded-full
              bg-gradient-to-r
              from-purple-400
              to-amber-400
              opacity-70
              transition-all
              duration-500
              group-hover:w-16
              group-hover:opacity-100
            "
          />

          {/* Hover shine */}
          <div
            className="
              pointer-events-none
              absolute
              -left-[120%]
              top-0
              z-40
              h-full
              w-[70%]
              rotate-[20deg]
              bg-gradient-to-r
              from-transparent
              via-white/[0.12]
              to-transparent
              transition-all
              duration-1000
              group-hover:left-[140%]
            "
          />

        </a>


        {/* =====================================================
            SCROLL INDICATOR
        ===================================================== */}
        <div
          className="
            absolute
            bottom-10
            right-14
            z-40

            hidden
            flex-col
            items-center
            gap-3

            md:flex
          "
        >

          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-white/60
              [writing-mode:vertical-rl]
            "
          >
            Scroll
          </span>

          <div
            className="
              h-12
              w-px
              overflow-hidden
              bg-white/20
            "
          >

            <div
              className="
                h-1/2
                w-full
                animate-pulse
                bg-gradient-to-b
                from-purple-400
                to-transparent
              "
            />

          </div>

        </div>

      </div>
    </section>
  );
}