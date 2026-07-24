import React from 'react';
import { FileSearch, Sparkles, MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden animate-fade-in-up">
      {/* Background Neo-brutalist pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0B0E14 2px, transparent 2px)', backgroundSize: '32px 32px' }} />

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-12">
        {/* Left Column: Text Content */}
        <div className="max-w-[620px] mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="font-space text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold text-void tracking-tight leading-[1.1] uppercase mb-6">
            MATCHWISE
            <br />
            <span className="relative inline-block mt-7">
              <span className="relative z-10 bg-signal px-4 py-2 border-4 border-void shadow-[6px_6px_0_#0B0E14] rotate-1 inline-block text-2xl md:text-3xl lg:text-4xl normal-case leading-normal">Decode Your Match Rate</span>
            </span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-graphite font-mono leading-relaxed border-l-4 border-void pl-4 bg-white p-4 shadow-neo transform rotate-1 inline-block text-left w-full">
            Stop guessing why you were rejected. Upload your resume and the job description, and get a semantic breakdown of exactly what's missing.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-stretch justify-center lg:justify-start gap-4 w-full">
            <button onClick={() => navigate('/analyze')} className="btn-primary group w-full sm:w-auto text-base px-6 h-12 flex items-center justify-center">
              Analyze My Resume
              <MoveRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs font-mono text-graphite/80 bg-white border-2 border-void px-4 h-12 shadow-neo-sm transform -rotate-1 w-full sm:w-auto">
              <FileSearch className="w-3 h-3 shrink-0" />
              <span className="whitespace-nowrap">No account required</span>
            </div>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="flex justify-center mt-8 lg:mt-0">
          <img 
            src="/hero-image.png" 
            alt="Neo Brutalist Analysis" 
            className="w-full max-w-[280px] md:max-w-[360px] lg:max-w-[420px] xl:max-w-[500px] h-auto object-contain border-4 border-void shadow-[12px_12px_0_#0B0E14] transform -rotate-2 hover:rotate-1 transition-transform duration-300" 
          />
        </div>
      </div>
    </section>
  );
}
