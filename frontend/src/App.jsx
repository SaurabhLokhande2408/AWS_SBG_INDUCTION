import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Roadmap from './components/Roadmap';
import Benefits from './components/Benefits';
import LeadIntro from './components/LeadIntro';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#08070d] text-zinc-100 flex flex-col overflow-x-clip">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Roadmap />
        <Benefits />
        <LeadIntro />
      </main>

    </div>
  );
}
