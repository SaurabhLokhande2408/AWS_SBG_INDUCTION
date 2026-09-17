import React from 'react';
import awsLogo from '../aws_logo.png';
import {
  MessageCircle,
  Camera,
  BriefcaseBusiness,
  ArrowRight,
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[720px] flex items-center overflow-hidden bg-white text-zinc-950">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Very subtle color accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-100/30 blur-[120px] rounded-full" />

        {/* Technical grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(#18181b 1px, transparent 1px), linear-gradient(90deg, #18181b 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28">

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">

          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}
          <div className="max-w-3xl">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Build beyond the classroom
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-extrabold tracking-[-0.045em] leading-[0.98] text-zinc-950">

              Learn.
              <br />

              Build.
              <br />

              <span className="text-purple-700">
                Connect.
              </span>{' '}
              Grow.

            </h1>

            {/* AWS-style accent */}
            <div className="mt-7 mb-7 flex items-center gap-3">
              <div className="h-[3px] w-12 bg-awsOrange rounded-full" />
              <div className="h-[3px] w-5 bg-emerald-500 rounded-full" />
              <div className="h-[3px] w-3 bg-purple-600 rounded-full" />
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-600 max-w-2xl leading-8">
              A hands-on student engineering ecosystem focused on AWS,
              cloud architecture, AI/ML, and production-grade software
              development.
            </p>

            <p className="mt-3 text-sm text-zinc-400 max-w-xl">
              Learn by building. Connect with people who build. Turn ideas
              into things that actually work.
            </p>

            {/* =====================================================
                SOCIAL / COMMUNITY BUTTONS
            ===================================================== */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              {/* WhatsApp */}
              <a
                href="https://chat.whatsapp.com/LwAEdiaUoOw9U9qNM2b767?s=cl&p=a&mlu=4&ilr=4"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 font-semibold text-base transition-all duration-200 shadow-sm hover:shadow-lg"
              >
                <MessageCircle
                  size={21}
                  strokeWidth={2.2}
                  className="transition-transform group-hover:scale-110"
                />

                <span>Join the Community</span>

                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/aws.sbg.rmdssoe/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-white text-zinc-900 border border-zinc-300 hover:border-zinc-500 hover:bg-zinc-50 font-semibold text-base transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Camera
                  size={21}
                  strokeWidth={2.2}
                  className="transition-transform group-hover:scale-110"
                />

                <span>Instagram</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/145189292"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-white text-zinc-900 border border-zinc-300 hover:border-zinc-500 hover:bg-zinc-50 font-semibold text-base transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <BriefcaseBusiness
                  size={21}
                  strokeWidth={2.2}
                  className="transition-transform group-hover:scale-110"
                />

                <span>LinkedIn</span>
              </a>

            </div>
          </div>


          {/* =====================================================
              RIGHT SIDE — AWS IDENTITY CARD
          ===================================================== */}
          <div className="relative hidden lg:flex items-center justify-center">

            {/* Main Card */}
            <div className="relative w-[390px] h-[430px] rounded-[28px] border border-zinc-200 bg-white shadow-[0_25px_80px_-25px_rgba(0,0,0,0.16)] overflow-hidden">

              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-awsOrange via-purple-600 to-emerald-500" />

              {/* Architectural lines */}
              <div className="absolute inset-0 opacity-[0.035] pointer-events-none">

                <div className="absolute top-20 left-[-40px] w-[480px] h-px bg-zinc-900 rotate-[18deg]" />

                <div className="absolute top-40 left-[-40px] w-[480px] h-px bg-zinc-900 rotate-[18deg]" />

                <div className="absolute top-60 left-[-40px] w-[480px] h-px bg-zinc-900 rotate-[18deg]" />

                <div className="absolute top-80 left-[-40px] w-[480px] h-px bg-zinc-900 rotate-[18deg]" />

              </div>

              <div className="relative h-full flex flex-col items-center justify-center px-10">

                {/* LARGE AWS LOGO */}
                <div className="flex items-center justify-center mb-10">
                  <img
                    src={awsLogo}
                    alt="Amazon Web Services"
                    className="w-[180px] h-auto object-contain"
                  />
                </div>

                {/* Divider */}
                <div className="w-16 h-px bg-zinc-200 mb-8" />

                {/* SBG */}
                <div className="text-center">

                  <p className="text-[11px] uppercase tracking-[0.28em] font-semibold text-zinc-400 mb-3">
                    Student Builder Group
                  </p>

                  <h2 className="text-3xl font-bold tracking-tight text-zinc-950">
                    RMDSSOE
                  </h2>

                  <p className="mt-2 text-sm text-zinc-500">
                    RMD Sinhgad School of Engineering
                  </p>

                </div>

                {/* Bottom metadata */}
                <div className="absolute bottom-7 left-8 right-8 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-zinc-400">

                  <span>
                    AWS • BUILD • LEARN
                  </span>

                  <span className="flex items-center gap-1.5">

                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                    Community

                  </span>

                </div>

              </div>
            </div>


            {/* Floating Status */}
            <div className="absolute -bottom-5 -left-8 px-5 py-3 rounded-xl bg-white border border-zinc-200 shadow-lg">

              <div className="flex items-center gap-2">

                <span className="w-2 h-2 rounded-full bg-emerald-500" />

                <span className="text-xs font-semibold text-zinc-700">
                  Build. Deploy. Scale.
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTTOM FOCUS STRIP
        ===================================================== */}
        <div className="mt-20 pt-7 border-t border-zinc-200">

          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">

            <span>AWS Cloud</span>

            <span className="text-zinc-300">•</span>

            <span>AI / ML</span>

            <span className="text-zinc-300">•</span>

            <span>DevOps</span>

            <span className="text-zinc-300">•</span>

            <span>Software Engineering</span>

            <span className="text-zinc-300">•</span>

            <span>Student Community</span>

          </div>

        </div>

      </div>
    </section>
  );
}