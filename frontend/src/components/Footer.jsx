import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#08070d] py-12 text-center text-xs text-zinc-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p>© {new Date().getFullYear()} AWS SBG RMDSSOE. Built for builders.</p>
        <p className="text-zinc-600">AWS Student Builder Group is an independent academic community initiative.</p>
      </div>
    </footer>
  );
}
