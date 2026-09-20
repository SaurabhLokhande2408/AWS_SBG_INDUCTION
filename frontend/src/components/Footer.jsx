
import React from 'react';
import { BriefcaseBusiness, Camera, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#08070d] py-12 text-xs text-zinc-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">

        {/* SECTION SHORTCUTS */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-zinc-400">
          <a
            href="#about"
            className="transition-colors hover:text-white"
          >
            About
          </a>

          <a
            href="#roadmap"
            className="transition-colors hover:text-white"
          >
            Roadmap
          </a>

          <a
            href="#benefits"
            className="transition-colors hover:text-white"
          >
            Benefits
          </a>

          <a
            href="#lead"
            className="transition-colors hover:text-white"
          >
            Community Lead
          </a>
        </nav>

        {/* AWS SBG SOCIALS */}
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/company/145189292/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AWS SBG RMDSSOE on LinkedIn"
            className="text-zinc-500 transition-colors hover:text-white"
          >
            <BriefcaseBusiness size={18} />
          </a>

          <a
            href="https://www.instagram.com/aws.sbg.rmdssoe/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AWS SBG RMDSSOE on Instagram"
            className="text-zinc-500 transition-colors hover:text-white"
          >
            <Camera size={18} />
          </a>

          <a
            href="https://chat.whatsapp.com/LwAEdiaUoOw9U9qNM2b767?s=cl&p=a&mlu=4&ilr=4"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AWS SBG RMDSSOE on WhatsApp"
            className="text-zinc-500 transition-colors hover:text-white"
          >
            <MessageCircle size={18} />
          </a>
        </div>

        {/* CREDIT + COPYRIGHT */}
        <div className="flex w-full flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:gap-4">
          <p>
            © {new Date().getFullYear()} AWS SBG RMDSSOE. Built for builders.
          </p>

          <p>
            Developed by{' '}
            <a
              href="https://www.linkedin.com/in/saurabh-lokhande-111459376/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 underline underline-offset-2 transition-colors hover:text-white"
            >
              Saurabh Lokhande
            </a>
          </p>

          <p className="text-zinc-600">
            AWS Student Builder Group is an independent academic community initiative.
          </p>
        </div>

      </div>
    </footer>
  );
}
