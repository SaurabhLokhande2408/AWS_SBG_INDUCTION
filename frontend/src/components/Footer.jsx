import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-14 border-t border-white/5 text-center text-sm text-zinc-500">
      <div className="w-full px-[5%] sm:px-[6%] lg:px-[7%] flex flex-col sm:flex-row items-center justify-between gap-5">
        <p>© {new Date().getFullYear()} AWS SBG RMDSSOE. Built for builders.</p>
        <p className="text-zinc-600">AWS Student Builder Group is an independent academic community initiative.</p>
      </div>
    </footer>
  );
}
