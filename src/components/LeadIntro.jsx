import React from 'react';
import profileImage from '../WhatsApp Image 2026-08-15 at 6.34.05 PM.jpeg';
import {
  Camera,
  GitBranch,
  BriefcaseBusiness,
  ArrowUpRight,
} from 'lucide-react';

export default function LeadIntro() {
  return (
    <section
      id="lead"
      className="py-24 sm:py-28 bg-white border-t border-zinc-200 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

        <div className="rounded-[28px] border border-zinc-200 bg-zinc-50/60 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.12)] p-7 sm:p-9 lg:p-11 flex flex-col md:flex-row items-center gap-9">

          {/* =====================================================
              PROFILE IMAGE
          ===================================================== */}
          <div className="shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-[22px] border border-zinc-200 bg-white shadow-sm overflow-hidden">

            <img
              src={profileImage}
              alt="Saurabh Lokhande"
              className="w-full h-full object-cover"
            />

          </div>


          {/* =====================================================
              CONTENT
          ===================================================== */}
          <div className="flex-1 text-center md:text-left">

            {/* Label */}
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-awsOrange" />
              About the Lead
            </span>


            {/* Name */}
            <h3 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              Saurabh Lokhande
            </h3>


            {/* Role */}
            <p className="mt-2 text-sm font-semibold text-purple-700">
              AWS Student Builder Group Lead · RMDSSOE
            </p>


            {/* Short Intro */}
            <p className="mt-4 text-sm text-zinc-600 leading-6 max-w-2xl">
              A computer science engineering student who enjoys building,
              experimenting, and turning ideas into things that actually work.
            </p>


            {/* About Points */}
            <div className="mt-5 space-y-2.5 text-sm text-zinc-600">

              <div className="flex items-start gap-3 justify-center md:justify-start">
                <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-awsOrange" />
                <span>
                  Interested in cloud, AI, and software engineering.
                </span>
              </div>

              <div className="flex items-start gap-3 justify-center md:justify-start">
                <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-purple-600" />
                <span>
                  Learn by building, experimenting, and shipping real projects.
                </span>
              </div>

              <div className="flex items-start gap-3 justify-center md:justify-start">
                <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>
                  Building a community where students learn, collaborate, and grow together.
                </span>
              </div>

            </div>


            {/* =====================================================
                SOCIAL BUTTONS
            ===================================================== */}
            <div className="mt-7 flex flex-wrap items-center justify-center md:justify-start gap-3">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/saurabh_lokhande664/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Camera
                  size={18}
                  strokeWidth={2}
                  className="transition-transform group-hover:scale-110"
                />

                <span className="text-sm font-semibold">
                  Instagram
                </span>

                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>


              {/* GitHub */}
              <a
                href="https://github.com/SaurabhLokhande2408"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white text-zinc-800 border border-zinc-300 hover:border-zinc-500 hover:bg-zinc-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <GitBranch
                  size={18}
                  strokeWidth={2}
                  className="transition-transform group-hover:scale-110"
                />

                <span className="text-sm font-semibold">
                  GitHub
                </span>

                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>


              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white text-zinc-800 border border-zinc-300 hover:border-zinc-500 hover:bg-zinc-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <BriefcaseBusiness
                  size={18}
                  strokeWidth={2}
                  className="transition-transform group-hover:scale-110"
                />

                <span className="text-sm font-semibold">
                  LinkedIn
                </span>

                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}