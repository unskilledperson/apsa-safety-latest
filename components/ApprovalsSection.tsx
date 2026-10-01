'use client';

import React from 'react';

export interface ApprovalItem {
  name: string;
  sub: string;
  accent: 'cyan' | 'purple';
  icon: React.ReactNode;
}

// Official Accreditations & Statutory Approval Bodies with Custom Vector Icons
const APPROVAL_ITEMS: ApprovalItem[] = [
  {
    name: 'EIAC ACCREDITED',
    sub: 'Inspection Body • CB-048-INSP',
    accent: 'cyan',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z" />
      </svg>
    ),
  },
];

/**
 * Modern Next.js Approvals Marquee Component (Clean Corporate Design)
 */
export default function ApprovalsSection() {
  const marqueeItems = [...APPROVAL_ITEMS, ...APPROVAL_ITEMS];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-28 text-white border-y border-slate-800/80">
      
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[650px] rounded-full bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 border border-cyan-500/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Accreditations &amp; Statutory Approvals
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Internationally Recognized &amp;{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
              Statutorily Approved
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Operating under rigorous statutory oversight from the Government of Dubai, Federal UAE ministries, and leading global accreditation bodies.
          </p>
        </div>

        {/* Infinite Scrolling Logo Marquee */}
        <div 
          className="relative"
          role="region"
          aria-label="Official Accreditations and Statutory Approvals Marquee"
          tabIndex={0}
        >
          
          {/* Edge Gradient Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 sm:w-28 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 sm:w-28 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent" />

          {/* Marquee Track Container (Hover pauses animation on desktop, touch scrolls natively on mobile) */}
          <div className="group flex overflow-x-auto sm:overflow-hidden select-none py-3 scrollbar-none touch-pan-x cursor-grab">
            {/* Track 1 */}
            <div className="flex shrink-0 animate-marquee sm:group-hover:[animation-play-state:paused] items-center gap-3.5 sm:gap-6">
              {marqueeItems.map((item, idx) => {
                const isPurple = item.accent === 'purple';
                return (
                  <div
                    key={`track-1-${idx}`}
                    className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-slate-800/90 bg-slate-900/75 px-3.5 py-2.5 sm:px-5 sm:py-3.5 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:bg-slate-800/90 hover:shadow-cyan-500/10 hover:shadow-xl"
                  >
                    {/* SVG Icon Box */}
                    <div
                      className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl border ${
                        isPurple
                          ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                          : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                      }`}
                    >
                      {item.icon}
                    </div>

                    {/* Authority Info */}
                    <div>
                      <div className="font-extrabold text-xs sm:text-sm text-white tracking-wide whitespace-nowrap">
                        {item.name}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-400 whitespace-nowrap mt-0.5 font-medium">
                        {item.sub}
                      </div>
                    </div>

                    {/* Verified Tick Badge */}
                    <div className="ml-1 sm:ml-2 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Track 2 for Seamless Loop */}
            <div
              aria-hidden="true"
              className="flex shrink-0 animate-marquee sm:group-hover:[animation-play-state:paused] items-center gap-3.5 sm:gap-6"
            >
              {marqueeItems.map((item, idx) => {
                const isPurple = item.accent === 'purple';
                return (
                  <div
                    key={`track-2-${idx}`}
                    className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-slate-800/90 bg-slate-900/75 px-3.5 py-2.5 sm:px-5 sm:py-3.5 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:bg-slate-800/90 hover:shadow-cyan-500/10 hover:shadow-xl"
                  >
                    <div
                      className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl border ${
                        isPurple
                          ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                          : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <div className="font-extrabold text-xs sm:text-sm text-white tracking-wide whitespace-nowrap">
                        {item.name}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-400 whitespace-nowrap mt-0.5 font-medium">
                        {item.sub}
                      </div>
                    </div>

                    <div className="ml-1 sm:ml-2 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Embedded Continuous CSS Marquee Animation with Mobile Optimization */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 34s linear infinite;
        }
        @media (max-width: 640px) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
