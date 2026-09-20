import React, { useEffect, useRef, useState } from 'react';

export default function Benefits() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

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

  const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

  /* =========================================================
     IRON MAN
  ========================================================= */

  const pitchOpacity =
    1 - clamp(progress / 0.10);

  const ironManScale =
    1 + clamp(progress / 0.35) * 30;

  const ironManOpacity =
    1 - clamp(
      (progress - 0.20) / 0.15
    );

  /* =========================================================
     BENEFITS REVEAL
  ========================================================= */

  const gridRevealProgress =
    clamp(
      (progress - 0.30) / 0.20
    );

  const gridTranslateY =
    40 - gridRevealProgress * 40;

  const gridOpacity =
    gridRevealProgress;

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="relative min-h-[140vh] bg-black"
    >

      <div className="sticky top-0 min-h-screen w-full overflow-visible bg-black">

        {/* =====================================================
            IRON MAN
        ===================================================== */}

        <div
          className="
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            pointer-events-none
            bg-black
          "
          style={{
            opacity: ironManOpacity,
          }}
        >

          <div
            className="
              absolute
              w-[800px]
              h-[800px]
              bg-no-repeat
              bg-center
              will-change-transform
            "
            style={{
              backgroundImage:
                `url('/images/ironman.png')`,
              backgroundSize: 'contain',
              transformOrigin: '22% 34%',
              transform:
                `scale(${ironManScale})`,
            }}
          />

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-black/40
              px-4
            "
            style={{
              opacity: pitchOpacity,
            }}
          >

            <h2
              className="
                text-6xl
                md:text-8xl
                font-black
                text-white
                text-center
                tracking-[-0.065em]
                leading-[0.9]
              "
            >
              So what benefits
              <br />
              do students get?
            </h2>

          </div>

        </div>


        {/* =====================================================
            SIMPLE INFORMATION PAGE
        ===================================================== */}

        <div
          className="
            absolute
            inset-0
            z-20
            flex
            items-start
            justify-center
            overflow-visible
          "
          style={{
            opacity: gridOpacity,
            transform:
              `translateY(${gridTranslateY}px)`,
            pointerEvents:
              progress > 0.35
                ? 'auto'
                : 'none',
          }}
        >

          <div
            className="
              w-full
              max-w-[1180px]
              px-6
              md:px-0
              pt-[105px]
              pb-16
              min-h-screen
              flex
              flex-col
            "
          >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
              className="
                flex
                flex-col
                md:flex-row
                md:items-end
                md:justify-between
                shrink-0
                mb-8
              "
            >

              <div>

                <p
                  className="
                    text-[11px]
                    font-mono
                    tracking-[0.16em]
                    uppercase
                    text-white/45
                    mb-4
                  "
                >
                  AWS Student Builder Group
                </p>

                <h3
                  className="
                    text-white
                    text-5xl
                    md:text-6xl
                    lg:text-7xl
                    font-black
                    tracking-[-0.065em]
                    leading-[0.9]
                  "
                >
                  What students get.
                </h3>

              </div>


              {/* TOTAL VALUE */}

              <div
                className="
                  mt-6
                  md:mt-0
                  md:text-right
                "
              >

                <p
                  className="
                    text-white
                    text-5xl
                    md:text-6xl
                    font-black
                    tracking-[-0.06em]
                    leading-none
                  "
                >
                  $579
                </p>

                <p
                  className="
                    mt-2
                    text-[11px]
                    font-mono
                    uppercase
                    tracking-[0.14em]
                    text-white/45
                  "
                >
                  Total included value
                </p>

              </div>

            </div>


            {/* =================================================
                BENEFIT 01
            ================================================= */}

            <div
              className="
                border-t
                border-white/15
                py-6
                md:py-7
              "
            >

              <div
                className="
                  grid
                  grid-cols-12
                  gap-5
                  md:gap-6
                  items-start
                "
              >

                {/* NUMBER */}

                <div className="col-span-1">

                  <span
                    className="
                      text-sm
                      font-mono
                      text-white/40
                    "
                  >
                    01
                  </span>

                </div>


                {/* CONTENT */}

                <div
                  className="
                    col-span-8
                    md:col-span-8
                  "
                >

                  <p
                    className="
                      text-[11px]
                      font-mono
                      uppercase
                      tracking-[0.16em]
                      text-white/40
                      mb-2
                    "
                  >
                    Learn by building
                  </p>

                  <h4
                    className="
                      text-2xl
                      md:text-3xl
                      font-bold
                      tracking-[-0.025em]
                      text-white
                      leading-tight
                    "
                  >
                    Premium Skill Builder Access
                  </h4>

                  <p
                    className="
                      mt-3
                      text-[15px]
                      md:text-[16px]
                      text-white/55
                      leading-[1.55]
                      max-w-[720px]
                    "
                  >
                    Get 12 months of AWS Skill Builder with
                    hands-on labs, guided learning, and practical
                    cloud scenarios. Build your understanding by
                    actually working with AWS technologies.
                  </p>

                </div>


                {/* VALUE */}

                <div
                  className="
                    col-span-3
                    text-right
                  "
                >

                  <p
                    className="
                      text-4xl
                      md:text-5xl
                      font-black
                      tracking-[-0.04em]
                      text-white
                    "
                  >
                    $449
                  </p>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      font-mono
                      uppercase
                      tracking-[0.12em]
                      text-white/40
                    "
                  >
                    Included value
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                BENEFIT 02
            ================================================= */}

            <div
              className="
                border-t
                border-white/15
                py-6
                md:py-7
              "
            >

              <div
                className="
                  grid
                  grid-cols-12
                  gap-5
                  md:gap-6
                  items-start
                "
              >

                {/* NUMBER */}

                <div className="col-span-1">

                  <span
                    className="
                      text-sm
                      font-mono
                      text-white/40
                    "
                  >
                    02
                  </span>

                </div>


                {/* CONTENT */}

                <div
                  className="
                    col-span-11
                    md:col-span-11
                  "
                >

                  <p
                    className="
                      text-[11px]
                      font-mono
                      uppercase
                      tracking-[0.16em]
                      text-white/40
                      mb-2
                    "
                  >
                    Learn with peers
                  </p>

                  <h4
                    className="
                      text-2xl
                      md:text-3xl
                      font-bold
                      tracking-[-0.025em]
                      text-white
                      leading-tight
                    "
                  >
                    Hands-on Workshops & Community
                  </h4>

                  <p
                    className="
                      mt-3
                      text-[15px]
                      md:text-[16px]
                      text-white/55
                      leading-[1.55]
                      max-w-[900px]
                    "
                  >
                    Learn alongside fellow builders through
                    hands-on workshops, collaborative sessions,
                    peer discussions, and knowledge sharing.
                    Ask questions, build together, and learn from
                    how others approach technical problems.
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                BENEFIT 03
            ================================================= */}

            <div
              className="
                border-t
                border-white/15
                py-6
                md:py-7
              "
            >

              <div
                className="
                  grid
                  grid-cols-12
                  gap-5
                  md:gap-6
                  items-start
                "
              >

                {/* NUMBER */}

                <div className="col-span-1">

                  <span
                    className="
                      text-sm
                      font-mono
                      text-white/40
                    "
                  >
                    03
                  </span>

                </div>


                {/* CONTENT */}

                <div
                  className="
                    col-span-11
                    md:col-span-11
                  "
                >

                  <p
                    className="
                      text-[11px]
                      font-mono
                      uppercase
                      tracking-[0.16em]
                      text-white/40
                      mb-2
                    "
                  >
                    Build experience
                  </p>

                  <h4
                    className="
                      text-2xl
                      md:text-3xl
                      font-bold
                      tracking-[-0.025em]
                      text-white
                      leading-tight
                    "
                  >
                    Projects, Events & Opportunities
                  </h4>

                  <p
                    className="
                      mt-3
                      text-[15px]
                      md:text-[16px]
                      text-white/55
                      leading-[1.55]
                      max-w-[900px]
                    "
                  >
                    Turn what you learn into experience through
                    projects, hackathons, technical events, and
                    community activities. Collaborate with other
                    students, build your portfolio, and grow as
                    a builder.
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                REWARDS
            ================================================= */}

            <div
              className="
                border-t
                border-white/15
                pt-5
                mt-auto
                shrink-0
              "
            >

              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-4
                "
              >

                {/* LEFT */}

                <div>

                  <p
                    className="
                      text-[11px]
                      font-mono
                      uppercase
                      tracking-[0.15em]
                      text-white/35
                    "
                  >
                    And as you progress
                  </p>

                  <p
                    className="
                      mt-1
                      text-[14px]
                      md:text-[15px]
                      text-white/55
                    "
                  >
                    Earn AWS credits and certification rewards.
                  </p>

                </div>


                {/* REWARDS */}

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-x-7
                    gap-y-3
                  "
                >

                  {/* AWS CREDITS */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <span
                      className="
                        text-2xl
                        font-black
                        text-white
                      "
                    >
                      $30
                    </span>

                    <span
                      className="
                        text-[10px]
                        font-mono
                        uppercase
                        tracking-[0.1em]
                        text-white/40
                      "
                    >
                      AWS Credits
                    </span>

                  </div>


                  <span
                    className="
                      hidden
                      md:block
                      h-5
                      w-px
                      bg-white/15
                    "
                  />


                  {/* VOUCHER */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <span
                      className="
                        text-2xl
                        font-black
                        text-white
                      "
                    >
                      $100
                    </span>

                    <span
                      className="
                        text-[10px]
                        font-mono
                        uppercase
                        tracking-[0.1em]
                        text-white/40
                      "
                    >
                      Exam Voucher
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}