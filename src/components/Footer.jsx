import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 text-center text-xs text-zinc-500">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} AWS SBG RMDSSOE. Built for builders.</p>
        <p className="text-zinc-600">AWS Student Builder Group is an independent academic community initiative.</p>
      </div>
    </footer>
  );
}
