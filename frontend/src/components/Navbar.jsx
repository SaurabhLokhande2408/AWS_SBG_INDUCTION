import React from 'react';
import awsLogo from '../aws_logo.png';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-5 left-0 z-[60] w-full px-4 sm:px-6">
      <div className="mx-auto max-w-[1380px]">

        {/* =====================================================
            MAIN GLASS NAVBAR
        ===================================================== */}
        <div
          className="
            group
            relative

            flex
            h-[74px]
            w-full
            items-center
            justify-between

            px-4
            sm:px-6
            lg:px-7

            rounded-[24px]

            border
            border-white/[0.15]

            bg-[#08080d]/[0.48]

            backdrop-blur-[28px]
            backdrop-saturate-[180%]

            shadow-[0_12px_50px_rgba(0,0,0,0.28)]

            transition-all
            duration-500

            hover:border-white/[0.22]
            hover:bg-[#08080d]/[0.56]
            hover:shadow-[0_18px_60px_rgba(0,0,0,0.38)]

            overflow-hidden
          "
        >

          {/* =================================================
              TOP GLASS REFLECTION
          ================================================= */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/50
              to-transparent
            "
          />

          {/* =================================================
              SOFT GLASS GLOW
          ================================================= */}
          <div
            className="
              pointer-events-none
              absolute
              -top-24
              left-[25%]
              h-40
              w-72
              rounded-full
              bg-purple-500/[0.06]
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              right-[20%]
              h-40
              w-72
              rounded-full
              bg-amber-500/[0.04]
              blur-3xl
            "
          />


          {/* =================================================
              BRAND
          ================================================= */}
          <a
            href="#"
            className="
              relative
              z-10
              flex
              shrink-0
              items-center
              gap-3.5
              group/brand
            "
          >

            {/* AWS LOGO */}
            <div
              className="
                flex
                h-[46px]
                w-[72px]
                shrink-0
                items-center
                justify-center

                rounded-[14px]

                border
                border-white/[0.12]

                bg-black/[0.28]

                backdrop-blur-xl

                shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]

                transition-all
                duration-300

                group-hover/brand:border-white/[0.22]
                group-hover/brand:bg-black/[0.38]
                group-hover/brand:shadow-[0_8px_25px_rgba(0,0,0,0.25)]
              "
            >
              <img
                src={awsLogo}
                alt="Amazon Web Services"
                className="
                  block
                  h-auto
                  w-[52px]
                  max-h-[30px]
                  object-contain
                  object-center
                  drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]

                  transition-transform
                  duration-300

                  group-hover/brand:scale-[1.04]
                "
              />
            </div>


            {/* DIVIDER */}
            <div
              className="
                hidden
                h-8
                w-px
                bg-gradient-to-b
                from-transparent
                via-white/[0.20]
                to-transparent
                sm:block
              "
            />


            {/* SBG BRANDING */}
            <div
              className="
                hidden
                flex-col
                justify-center
                leading-none
                sm:flex
              "
            >
              <span
                className="
                  mb-1.5
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-white/45
                "
              >
                Student Builder Group
              </span>

              <span
                className="
                  text-[15px]
                  font-semibold
                  tracking-[-0.01em]
                  text-white/90
                "
              >
                RMDSSOE
              </span>
            </div>

          </a>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}
          <div
            className="
              relative
              z-10

              hidden
              items-center
              gap-1

              rounded-[17px]

              border
              border-white/[0.09]

              bg-black/[0.16]

              p-1.5

              shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]

              backdrop-blur-xl

              md:flex
            "
          >

            {/* =================================================
                ABOUT — PURPLE
            ================================================= */}
            <a
              href="#about"
              className="
                group/about
                relative
                overflow-hidden

                rounded-[12px]

                px-5
                py-2.5

                text-[13px]
                font-medium
                text-white/55

                transition-all
                duration-300

                hover:-translate-y-[1px]
                hover:bg-purple-500/[0.14]
                hover:text-purple-200
                hover:shadow-[0_0_22px_rgba(168,85,247,0.18)]
              "
            >
              <span className="relative z-10">
                About
              </span>

              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-[2px]
                  w-0
                  -translate-x-1/2
                  rounded-full
                  bg-purple-400
                  shadow-[0_0_12px_rgba(168,85,247,0.9)]
                  transition-all
                  duration-300
                  group-hover/about:w-8
                "
              />
            </a>


            {/* =================================================
                ROADMAP — AMBER
            ================================================= */}
            <a
              href="#roadmap"
              className="
                group/roadmap
                relative
                overflow-hidden

                rounded-[12px]

                px-5
                py-2.5

                text-[13px]
                font-medium
                text-white/55

                transition-all
                duration-300

                hover:-translate-y-[1px]
                hover:bg-amber-500/[0.14]
                hover:text-amber-200
                hover:shadow-[0_0_22px_rgba(245,158,11,0.18)]
              "
            >
              <span className="relative z-10">
                Roadmap
              </span>

              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-[2px]
                  w-0
                  -translate-x-1/2
                  rounded-full
                  bg-amber-400
                  shadow-[0_0_12px_rgba(245,158,11,0.9)]
                  transition-all
                  duration-300
                  group-hover/roadmap:w-8
                "
              />
            </a>


            {/* =================================================
                BENEFITS — EMERALD
            ================================================= */}
            <a
              href="#benefits"
              className="
                group/benefits
                relative
                overflow-hidden

                rounded-[12px]

                px-5
                py-2.5

                text-[13px]
                font-medium
                text-white/55

                transition-all
                duration-300

                hover:-translate-y-[1px]
                hover:bg-emerald-500/[0.14]
                hover:text-emerald-200
                hover:shadow-[0_0_22px_rgba(16,185,129,0.18)]
              "
            >
              <span className="relative z-10">
                Benefits
              </span>

              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-[2px]
                  w-0
                  -translate-x-1/2
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_12px_rgba(16,185,129,0.9)]
                  transition-all
                  duration-300
                  group-hover/benefits:w-8
                "
              />
            </a>


            {/* =================================================
                COMMUNITY LEAD — BLUE
            ================================================= */}
            <a
              href="#lead"
              className="
                group/lead
                relative
                overflow-hidden

                rounded-[12px]

                px-5
                py-2.5

                text-[13px]
                font-medium
                text-white/55

                transition-all
                duration-300

                hover:-translate-y-[1px]
                hover:bg-blue-500/[0.14]
                hover:text-blue-200
                hover:shadow-[0_0_22px_rgba(59,130,246,0.18)]
              "
            >
              <span className="relative z-10">
                Community Lead
              </span>

              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-[2px]
                  w-0
                  -translate-x-1/2
                  rounded-full
                  bg-blue-400
                  shadow-[0_0_12px_rgba(59,130,246,0.9)]
                  transition-all
                  duration-300
                  group-hover/lead:w-10
                "
              />
            </a>

          </div>


          {/* =================================================
              JOIN COMMUNITY CTA
          ================================================= */}
          <a
            href="https://chat.whatsapp.com/LwAEdiaUoOw9U9qNM2b767?s=cl&p=a&mlu=4&ilr=4"
            target="_blank"
            rel="noreferrer"
            className="
              relative
              z-10
              group/cta

              flex
              shrink-0
              items-center
              gap-2

              rounded-[14px]

              border
              border-white/[0.16]

              bg-white/[0.09]

              px-4
              py-2.5

              text-xs
              font-semibold
              text-white

              backdrop-blur-xl

              shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]

              transition-all
              duration-300

              hover:-translate-y-[1px]
              hover:border-emerald-400/40
              hover:bg-emerald-500/[0.12]
              hover:text-emerald-100
              hover:shadow-[0_10px_30px_rgba(16,185,129,0.16)]

              sm:px-5
              sm:text-sm
            "
          >

            <span className="hidden sm:inline">
              Join Community
            </span>

            <span className="sm:hidden">
              Join
            </span>

            <ArrowUpRight
              size={16}
              strokeWidth={2}
              className="
                text-white/65

                transition-all
                duration-300

                group-hover/cta:-translate-y-0.5
                group-hover/cta:translate-x-0.5
                group-hover/cta:text-emerald-300
              "
            />

          </a>

        </div>

      </div>
    </nav>
  );
}