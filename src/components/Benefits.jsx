
import React from 'react';
import awsLogo from '../aws_logo.png';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function Benefits() {
  const perks = [
    'AWS Credit vouchers & workshop learning materials',
    'Hands-on exposure to cloud provisioning, microservices, and AI models',
    'Peer-to-peer code review and hackathon team matching',
    'Direct mentorship on building production portfolio applications',
    'Opportunities to lead technical sub-divisions and community ops',
    'Networking with developers, alumni, and industry engineers',
  ];

  return (
    <section
      id="benefits"
      className="relative py-24 sm:py-28 bg-white border-t border-zinc-200 overflow-hidden"
    >

      {/* =====================================================
          BACKGROUND
      ===================================================== */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-1/2 right-[-120px] -translate-y-1/2 w-[400px] h-[400px] bg-purple-100/20 blur-[110px] rounded-full" />

        <div className="absolute bottom-[-100px] left-[-100px] w-[350px] h-[350px] bg-emerald-100/20 blur-[110px] rounded-full" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(#18181b 1px, transparent 1px), linear-gradient(90deg, #18181b 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        />

      </div>


      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="grid lg:grid-cols-[0.65fr_1.35fr] gap-10 lg:gap-24 items-end mb-14">

          <div>

            <div className="flex items-center gap-3 mb-5">

              <span className="w-8 h-[2px] bg-emerald-500 rounded-full" />

              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-400">
                Why Get Involved
              </span>

            </div>

            <p className="text-sm font-medium text-zinc-400">
              Learn through execution.
              <br />
              Build through collaboration.
            </p>

          </div>


          <div className="max-w-3xl">

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] leading-[1.02] text-zinc-950">
              More than a{' '}
              <span className="text-purple-700">
                community.
              </span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-zinc-500 leading-8 max-w-2xl">
              Get access to resources, practical experience, mentorship,
              and opportunities designed to turn learning into work you
              can actually show.
            </p>

          </div>

        </div>


        {/* =====================================================
            BENEFITS PANEL
        ===================================================== */}
        <div className="relative rounded-[28px] border border-zinc-200 bg-zinc-50/60 overflow-hidden">

          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-awsOrange via-purple-600 to-emerald-500" />

          <div className="grid lg:grid-cols-[0.75fr_1.25fr]">

            {/* =================================================
                LEFT — STATEMENT
            ================================================= */}
            <div className="relative p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-zinc-200 bg-white">

              {/* AWS Logo */}
              <div className="flex items-center justify-center w-[82px] h-12 rounded-xl border border-zinc-200 bg-white shadow-sm mb-10">

                <img
                  src={awsLogo}
                  alt="Amazon Web Services"
                  className="w-[58px] h-auto object-contain"
                />

              </div>


              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400">
                Participant Benefits
              </span>


              <h3 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 leading-tight">
                Build skills that
                <br />
                <span className="text-zinc-400">
                  compound.
                </span>
              </h3>


              <p className="mt-6 text-sm text-zinc-500 leading-7 max-w-sm">
                Whether you're deploying your first container or exploring
                cloud architecture, the focus stays on practical learning,
                collaboration, and real technical work.
              </p>


              {/* Bottom marker */}
              <div className="mt-10 flex items-center gap-2">

                <span className="w-2 h-2 rounded-full bg-emerald-500" />

                <span className="text-xs font-semibold text-zinc-500">
                  Learn • Build • Connect
                </span>

              </div>

            </div>


            {/* =================================================
                RIGHT — BENEFIT LIST
            ================================================= */}
            <div className="p-8 sm:p-10 lg:p-12">

              <div className="grid sm:grid-cols-2 gap-x-10">

                {perks.map((perk, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-4 py-6 border-b border-zinc-200 first:pt-0 sm:[&:nth-child(2)]:pt-0"
                  >

                    {/* Number + Icon */}
                    <div className="shrink-0 flex flex-col items-center gap-2">

                      <span className="text-[10px] font-bold tracking-[0.15em] text-zinc-300">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <CheckCircle2
                        size={19}
                        className="text-emerald-600 transition-transform duration-300 group-hover:scale-110"
                      />

                    </div>


                    {/* Text */}
                    <p className="text-sm font-medium text-zinc-600 leading-6 group-hover:text-zinc-950 transition-colors">
                      {perk}
                    </p>

                  </div>
                ))}

              </div>


              {/* Bottom note */}
              <div className="mt-10 pt-6 border-t border-zinc-200 flex items-center justify-between gap-4">

                <span className="text-xs text-zinc-400">
                  Built for students who want to build.
                </span>

                <ArrowUpRight
                  size={17}
                  className="text-zinc-400"
                />

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
