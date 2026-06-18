import React, { useState } from 'react';
import { motion } from 'motion/react';
import { VASTU_ZONES_CONFIG, VastuZone } from '../data';
import { Compass, HelpCircle, Check, Sparkles, LayoutGrid, Info, ArrowUp } from 'lucide-react';

export default function VastuPlanning() {
  const [activeZone, setActiveZone] = useState<VastuZone>(VASTU_ZONES_CONFIG[0]);

  // Helper to calculate rotation degree based on direction
  const getRotationDegree = (direction: string) => {
    switch (direction) {
      case 'North': return 0;
      case 'East': return 90;
      case 'South-East': return 135;
      case 'South-West': return 225;
      default: return 0;
    }
  };

  return (
    <div className="py-12 bg-gradient-to-b from-brand-ivory to-stone-100" id="vastu-planner-view">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-pink font-mono tracking-widest text-xs uppercase block mb-1">
            EASTERN ARCHITECTURE SCIENCE
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-brand-charcoal">
            Interactive Vastu Spatial Planner
          </h2>
          <p className="text-gray-500 text-xs mt-2">
            Click on any cardinal directions on our dynamic compass or mock layout to reveal planetary rulers, elements, and critical modular planning guidelines.
          </p>
          <div className="h-1 w-20 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Dynamic Vastu Compass Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Compass & Hotspot Matrix (Left) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Visual Rotating Compass */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full bg-white border-4 border-brand-charcoal/80 flex items-center justify-center shadow-2xl mb-10 transition-all">
              
              {/* Ring Markings */}
              <div className="absolute inset-2 rounded-full border border-dashed border-stone-300" />
              <div className="absolute inset-8 rounded-full border border-stone-200" />

              {/* Directional labels */}
              <span className="absolute top-3 text-xs font-mono font-bold text-brand-terracotta">N (North)</span>
              <span className="absolute right-3 text-xs font-mono font-bold text-brand-charcoal">E (East)</span>
              <span className="absolute bottom-3 text-xs font-mono font-bold text-brand-charcoal">S (South)</span>
              <span className="absolute left-3 text-xs font-mono font-bold text-brand-charcoal">W (West)</span>

              {/* Rotating Compass Needle */}
              <motion.div 
                className="w-4 h-full relative flex flex-col justify-between"
                animate={{ rotate: getRotationDegree(activeZone.direction) }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              >
                {/* North needle tip colored in classical terracotta */}
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[90px] border-b-brand-terracotta mx-auto drop-shadow-md" />
                
                {/* Center Core dot */}
                <div className="w-5 h-5 rounded-full bg-brand-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white z-10 shadow" />
                
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[90px] border-t-stone-400 mx-auto drop-shadow-sm" />
              </motion.div>
            </div>

            {/* Simulated 2D Floor Plan Grid Hotspots */}
            <div className="w-full max-w-sm bg-white p-4 rounded-lg border border-stone-300 shadow">
              <span className="text-[10px] font-mono uppercase text-gray-400 block text-center mb-3">
                SIMULATED BEDROOM-KITCHEN CARPET SEGMENTS
              </span>
              <div className="grid grid-cols-2 gap-2 text-center" id="vastu-grid-hotspots">
                {VASTU_ZONES_CONFIG.map((zone) => {
                  const isActive = activeZone.direction === zone.direction;
                  return (
                    <button
                      key={zone.direction}
                      onClick={() => setActiveZone(zone)}
                      className={`p-4 rounded border text-left transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-brand-charcoal text-brand-ivory border-brand-gold shadow'
                          : 'bg-stone-50 hover:bg-stone-100 text-brand-charcoal border-stone-200'
                      }`}
                    >
                      <span className="text-xs font-mono uppercase block text-brand-pink font-semibold">
                        {zone.direction}
                      </span>
                      <span className="text-xs font-serif font-bold block mt-1">
                        {zone.idealRooms[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Guidelines Description (Right) */}
          <div className="lg:col-span-5">
            <motion.div
              key={activeZone.direction}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-8 rounded-xl border border-stone-200 shadow-xl"
              id="vastu-guidelines-box"
            >
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <span className="px-3 py-1 bg-brand-pink/10 text-brand-terracotta rounded-full text-xs font-mono font-bold uppercase tracking-widest">
                  {activeZone.direction} Segment Guide
                </span>
                <span className="text-xs font-mono text-gray-400">
                  Planet: <strong>{activeZone.rulingPlanet}</strong>
                </span>
              </div>

              <h3 className="text-2xl font-serif font-black text-brand-charcoal mb-4 flex items-center gap-2">
                <Compass className="w-6 h-6 text-brand-gold" />
                The {activeZone.element} Element
              </h3>

              <div className="h-[1px] bg-stone-200 my-4" />

              <h4 className="text-[10px] font-mono tracking-wider font-bold text-brand-charcoal uppercase mb-3">
                IDEAL ROOMS FOR THIS DIRECTION:
              </h4>

              <div className="flex flex-wrap gap-2 mb-6">
                {activeZone.idealRooms.map((room) => (
                  <span key={room} className="px-3 py-1 bg-stone-100 rounded text-xs font-medium text-brand-charcoal border border-stone-200">
                    {room}
                  </span>
                ))}
              </div>

              <div className="h-[1px] bg-stone-100 my-4" />

              <h4 className="text-[10px] font-mono tracking-wider font-bold text-brand-charcoal uppercase mb-3">
                CRITICAL PLANNING TIPS & CORRECTIONS:
              </h4>

              <ul className="space-y-3 mb-6">
                {activeZone.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start text-xs text-gray-700 leading-relaxed">
                    <Check className="w-4 h-4 text-brand-pink mr-2 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 bg-brand-pink/5 border border-brand-pink/15 rounded-lg text-xs md:flex items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block">RECOMMENDED SPACE COLORING</span>
                  <span className="text-brand-terracotta font-serif font-bold text-xs mt-0.5 block">{activeZone.colorTheme}</span>
                </div>
                <div 
                  className="w-10 h-10 rounded-full shadow border-2 border-white shrink-0 mt-2 md:mt-0" 
                  style={{ backgroundColor: activeZone.hexColor }}
                />
              </div>

            </motion.div>
          </div>

        </div>

        {/* General Disclaimer */}
        <div className="bg-brand-charcoal text-brand-ivory p-6 rounded text-left mt-16 max-w-4xl mx-auto text-xs opacity-90 md:flex gap-4 items-center">
          <Info className="w-6 h-6 text-brand-gold shrink-0 mt-1 md:mt-0" />
          <p className="leading-relaxed text-stone-300">
            <strong>Vastu Alignment with A Square:</strong> We avoid orthodox structural demolitions. Under the 'Jaipur Modern Heritage' principle, we correct direction anomalies using copper boundary wire matrices under wood overlays, organic minerals, and tailored light projections.
          </p>
        </div>

      </div>
    </div>
  );
}
