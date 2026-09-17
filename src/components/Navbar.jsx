
import React from 'react';
import awsLogo from '../aws_logo.png';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-zinc-200/80">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-[72px] flex items-center justify-between">

        {/* =====================================================
            BRAND
        ===================================================== */}
        <a
          href="#"
          className="flex items-center gap-3.5 group"
        >

          {/* AWS Logo */}
          <div className="flex items-center justify-center h-10 w-[72px] rounded-lg border border-zinc-200 bg-white shadow-sm">
            <img
              src={awsLogo}
              alt="Amazon Web Services"
              className="w-[52px] h-auto object-contain"
            />
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-7 w-px bg-zinc-200" />

          {/* Name */}
          <div className="hidden sm:flex flex-col leading-none">

            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-zinc-400 mb-1">
              Student Builder Group
            </span>

            <span className="text-sm font-bold tracking-tight text-zinc-900">
              RMDSSOE
            </span>

          </div>

        </a>


        {/* =====================================================
            NAVIGATION
        ===================================================== */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">

          <a
            href="#about"
            className="relative text-zinc-500 hover:text-zinc-950 transition-colors group"
          >
            About
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-purple-600 rounded-full transition-all group-hover:w-full" />
          </a>

          <a
            href="#roadmap"
            className="relative text-zinc-500 hover:text-zinc-950 transition-colors group"
          >
            Roadmap
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-emerald-500 rounded-full transition-all group-hover:w-full" />
          </a>

          <a
            href="#benefits"
            className="relative text-zinc-500 hover:text-zinc-950 transition-colors group"
          >
            Benefits
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-awsOrange rounded-full transition-all group-hover:w-full" />
          </a>

          <a
            href="#lead"
            className="relative text-zinc-500 hover:text-zinc-950 transition-colors group"
          >
            Community Lead
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-purple-600 rounded-full transition-all group-hover:w-full" />
          </a>

        </div>


        {/* =====================================================
            CTA
        ===================================================== */}
        <a
          href="https://chat.whatsapp.com/LwAEdiaUoOw9U9qNM2b767?s=cl&p=a&mlu=4&ilr=4"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-950 text-white text-xs sm:text-sm font-semibold hover:bg-zinc-800 transition-all shadow-sm"
        >

          <span className="hidden sm:inline">
            Join Community
          </span>

          <span className="sm:hidden">
            Join
          </span>

          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />

        </a>

      </div>

    </nav>
  );
}

