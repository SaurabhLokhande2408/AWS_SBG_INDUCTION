import React from 'react';
import profileImage from '../WhatsApp Image 2026-08-15 at 6.34.05 PM.jpeg';
import awsLogo from '../aws_logo.png';
import {
  Camera,
  GitBranch,
  BriefcaseBusiness,
  ArrowUpRight,
} from 'lucide-react';

export default function LeadIntro() {
  return (
    <section id="lead" className="relative bg-white py-24 sm:py-32">
      
      <div className="mx-auto w-full max-w-5xl px-6">
        
        {/* =================================================
            MAIN CARD (Exact Theme Match)
        ================================================= */}
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
                    About The Lead
                  </span>
                </div>

                <h3 className="mt-5 text-4xl font-black leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl">
                  Saurabh
                  <span className="block text-purple-500">
                    Lokhande.
                  </span>
                </h3>

                <div className="mt-8 h-32 w-32 overflow-hidden rounded-2xl border border-white/[0.08] sm:h-40 sm:w-40">
                  <img
                    src={profileImage}
                    alt="Saurabh Lokhande"
                    className="h-full w-full object-cover filter contrast-[1.1]"
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col justify-center">
                <p className="text-base font-semibold leading-relaxed text-zinc-300 sm:text-lg">
                  2nd-year Computer Science Engineering student at RMDSSOE.
                </p>

                <p className="mt-4 text-base font-semibold leading-relaxed text-zinc-300 sm:text-lg">
                  Full-stack developer passionate about building real-world products. Currently diving deep into AI/ML, with the goal of becoming an AI/ML Engineer.
                </p>

                <p className="mt-4 text-base font-semibold leading-relaxed text-zinc-300 sm:text-lg">
                  AWS Student Builder Group Lead at RMDSSOE, working to build a strong student community around cloud, development, and emerging technologies.
                </p>
              </div>

            </div>

            {/* =================================================
                SOCIALS (Styled like Focus Areas)
            ================================================= */}
            <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
              
              {/* Instagram */}
              <a
                href="https://www.instagram.com/saurabh_lokhande664/"
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-5 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-[#111111]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
                  <Camera size={20} />
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-base font-black text-white">Instagram</p>
                  <ArrowUpRight size={16} className="text-zinc-600 transition-colors group-hover:text-pink-400" />
                </div>
                
                <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-400">
                  Just chilling
                </p>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/SaurabhLokhande2408"
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-5 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-[#111111]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-500/10 text-zinc-300">
                  <GitBranch size={20} />
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-base font-black text-white">GitHub</p>
                  <ArrowUpRight size={16} className="text-zinc-600 transition-colors group-hover:text-white" />
                </div>
                
                <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-400">
                  Projects & Code
                </p>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-5 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-[#111111]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <BriefcaseBusiness size={20} />
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-base font-black text-white">LinkedIn</p>
                  <ArrowUpRight size={16} className="text-zinc-600 transition-colors group-hover:text-blue-400" />
                </div>
                
                <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-400">
                  Professional Network
                </p>
              </a>

            </div>

            {/* =================================================
                FOUNDATION / TAGS
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
                    Community Role
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">
                    AWS Student Builder Group Lead
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  'Full-Stack',
                  'AI / ML',
                  'Engineering',
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
    </section>
  );
}