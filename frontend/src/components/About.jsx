
import React from 'react';
import awsLogo from '../aws_logo_black_transparent.png';
import { Terminal, Users, Cpu, ArrowUpRight } from 'lucide-react';

export default function About({ aboutRef, destinationRef, destinationActive }) {
  const pillars = [
    {
      number: '01',
      icon: <Terminal size={21} />,
      accent: 'text-purple-700',
      iconBg: 'bg-purple-50',
      border: 'hover:border-purple-200',
      title: 'Hands-on Engineering',
      desc: 'Moving beyond superficial slide decks. We construct real cloud backends, deploy distributed architectures, and run AI inference workloads.'
    },
    {
      number: '02',
      icon: <Users size={21} />,
      accent: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      border: 'hover:border-emerald-200',
      title: 'Tech & Creative Synergy',
      desc: 'A multidisciplinary space where software engineers, cloud architects, video editors, designers, and community leads collaborate on real initiatives.'
    },
    {
      number: '03',
      icon: <Cpu size={21} />,
      accent: 'text-awsOrange',
      iconBg: 'bg-orange-50',
      border: 'hover:border-orange-200',
      title: 'Industry Alignment',
      desc: 'Bridging the gap between academia and industry standards through AWS certification tracks and open technical challenges.'
    }
  ];

  return (
    <section
      ref={aboutRef}
      id="about"
      className="relative py-24 sm:py-28 bg-white border-t border-zinc-200 overflow-hidden"
    >

      {/* =====================================================
          SUBTLE BACKGROUND
      ===================================================== */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Very subtle accents */}
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-purple-100/20 blur-[100px] rounded-full" />

        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-100/20 blur-[100px] rounded-full" />

        {/* Technical grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(#18181b 1px, transparent 1px), linear-gradient(90deg, #18181b 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        />
      </div>


      <div className="relative z-10 w-full px-[5%] sm:px-[6%] lg:px-[7%]">

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}
        <div className="mb-16">

          <div className="max-w-5xl">

            <h2 className="text-[clamp(2.5rem,4.5vw,5.25rem)] font-extrabold tracking-[-0.04em] leading-[1.02] text-zinc-950">
              What is{' '}
              <span
                ref={destinationRef}
                className={`transition-colors duration-500 ${destinationActive ? 'text-purple-700' : 'text-zinc-950'}`}
              >
                AWS SBG
              </span>{' '}
              RMDSSOE?
            </h2>

            <p className="text-lg sm:text-xl text-zinc-500 mt-7 leading-8 max-w-3xl">
              A builder-first collective designed to nurture technical
              execution, cloud capability, and production discipline.
            </p>

          </div>

        </div>


        {/* =====================================================
            PILLARS
        ===================================================== */}
        <div className="grid md:grid-cols-3 gap-7 lg:gap-8">

          {pillars.map((item, index) => (
            <div
              key={index}
              className={`
                group relative p-8 sm:p-10
                rounded-2xl
                bg-white
                border border-zinc-200
                ${item.border}
                hover:-translate-y-1
                hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.18)]
                transition-all duration-300
              `}
            >

              {/* Number */}
              <div className="flex items-center justify-between mb-8">

                <span className="text-[11px] font-bold tracking-[0.2em] text-zinc-300">
                  {item.number}
                </span>

                <ArrowUpRight
                  size={17}
                  className="text-zinc-300 transition-all duration-300 group-hover:text-zinc-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />

              </div>


              {/* Icon */}
              <div
                className={`
                  w-14 h-14 rounded-xl
                  ${item.iconBg}
                  ${item.accent}
                  flex items-center justify-center
                  mb-6
                `}
              >
                {item.icon}
              </div>


              {/* Title */}
              <h3 className="text-2xl font-bold tracking-tight text-zinc-950 mb-4">
                {item.title}
              </h3>


              {/* Description */}
              <p className="text-base text-zinc-500 leading-7">
                {item.desc}
              </p>


              {/* Bottom accent */}
              <div className="absolute bottom-0 left-7 right-7 h-px bg-zinc-100 group-hover:bg-zinc-200 transition-colors" />

            </div>
          ))}

        </div>


        {/* =====================================================
            AWS IDENTITY STRIP
        ===================================================== */}
        <div className="mt-16 border-y border-zinc-200 py-6">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

            <div className="flex items-center gap-4">

              {/* AWS Logo */}
              <div className="flex items-center justify-center h-10 w-[72px] rounded-lg border border-zinc-200 bg-white">
                <img
                  src={awsLogo}
                  alt="Amazon Web Services"
                  className="w-[52px] h-auto object-contain"
                />
              </div>

              <div className="h-7 w-px bg-zinc-200 hidden sm:block" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  Our foundation
                </p>

                <p className="text-sm font-semibold text-zinc-800 mt-0.5">
                  Build with cloud. Learn through execution.
                </p>
              </div>

            </div>


            {/* Focus areas */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-2">

              <span className="px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-[11px] font-semibold text-zinc-500">
                Cloud
              </span>

              <span className="px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-[11px] font-semibold text-zinc-500">
                AI / ML
              </span>

              <span className="px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-[11px] font-semibold text-zinc-500">
                DevOps
              </span>

              <span className="px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-[11px] font-semibold text-zinc-500">
                Engineering
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
