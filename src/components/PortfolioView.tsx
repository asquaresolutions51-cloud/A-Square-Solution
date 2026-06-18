import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ProjectItem, 
  PORTFOLIO_PROJECTS 
} from '../data';
import { 
  Filter, 
  MapPin, 
  Calendar, 
  Tag, 
  Sparkles, 
  ChevronRight, 
  Layers, 
  X, 
  Eye, 
  ArrowLeftRight,
  Workflow
} from 'lucide-react';

interface PortfolioViewProps {
  onNavigate: (id: string) => void;
}

export default function PortfolioView({ onNavigate }: PortfolioViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100 for before/after
  const sliderRef = useRef<HTMLDivElement>(null);

  const filterOptions = [
    'All',
    'Jaipuri Fusion',
    'Modern Minimal',
    'Kitchen',
    'Villa',
    'Apartment'
  ];

  const filteredProjects = selectedFilter === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedFilter || p.type === selectedFilter || p.type.includes(selectedFilter));

  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left mouse button dragged
      handleSliderMove(e.clientX);
    }
  };

  return (
    <div className="py-12 bg-brand-ivory" id="portfolio-projects-page">
      {/* Search & Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center md:text-left md:flex justify-between items-end gap-6 mb-8">
          <div>
            <span className="text-brand-pink font-mono tracking-widest text-xs uppercase block mb-1">
              PHYSICAL REALITIES
            </span>
            <h1 className="text-4xl font-serif font-semibold text-brand-charcoal">
              Completed Case Studies
            </h1>
            <p className="text-gray-500 text-sm mt-2 max-w-xl">
              Scroll through completed residences in Malviya Nagar, C-Scheme, and Vaishali Nagar. Click any card to explore moodboards, raw sketches, and budget breakdowns.
            </p>
          </div>

          {/* Filter count indicator */}
          <div className="mt-4 md:mt-0 bg-brand-charcoal inline-block text-brand-ivory text-xs font-mono py-2 px-4 rounded tracking-wider">
            SHOWING {filteredProjects.length} PORTFOLIO PIECES
          </div>
        </div>

        {/* Filter Navigation Chips */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-stone-200">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setSelectedFilter(opt);
                // Reset slide position
                setSliderPosition(50);
              }}
              className={`px-4 py-2 text-xs font-mono tracking-wider rounded transition-all cursor-pointer ${
                selectedFilter === opt
                  ? 'bg-brand-terracotta text-white shadow'
                  : 'bg-white hover:bg-brand-pink/10 text-brand-charcoal border border-stone-200'
              }`}
            >
              {opt.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              layout
              key={proj.id}
              className="bg-white rounded-lg overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg group cursor-pointer transition-transform duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => {
                setActiveProject(proj);
                setSliderPosition(50);
              }}
              id={`portfolio-item-${proj.id}`}
            >
              <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                <img
                  src={proj.imageAfter}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-4 left-4 text-xs font-mono text-white bg-brand-terracotta/90 tracking-wider px-2 py-1 rounded">
                  {proj.category}
                </span>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <span className="bg-white/95 text-brand-charcoal text-xs font-mono uppercase tracking-widest px-4 py-2.5 rounded shadow-md flex items-center gap-2">
                    <Eye className="w-4 h-4 text-brand-pink" />
                    Read Story
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs text-brand-gold font-mono uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{proj.location}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-charcoal mb-2 group-hover:text-brand-terracotta transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-gray-500 font-sans line-clamp-2 mb-4">
                  {proj.clientBrief}
                </p>
                <div className="flex justify-between items-center bg-brand-ivory p-3 rounded text-xs font-mono">
                  <div>
                    <span className="text-gray-400 block uppercase">TIMELINE</span>
                    <span className="text-brand-charcoal font-bold">{proj.timeline}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 block uppercase">BUDGET</span>
                    <span className="text-brand-terracotta font-bold">{proj.budgetRange}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Deep Dive Dialog */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-start py-8 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-brand-ivory max-w-5xl w-full rounded-2xl border border-stone-100 shadow-2xl overflow-hidden relative"
              id="case-study-dialog-modal"
            >
              {/* Close Button top */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 z-20 bg-brand-charcoal/90 text-white hover:bg-brand-pink p-2.5 rounded-full transition-colors cursor-pointer shadow-md"
                title="Return to general portfolio"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Case Study Header Banner */}
              <div className="bg-brand-charcoal text-brand-ivory p-8 md:p-12">
                <span className="text-brand-pink font-mono tracking-widest text-xs uppercase block mb-1">
                  DETAILED CASE STUDY • {activeProject.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-black text-white mb-2">
                  {activeProject.title}
                </h2>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-stone-300 mt-4">
                  <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{activeProject.location}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded">
                    <Calendar className="w-3.5 h-3.5 text-brand-pink" />
                    <span>{activeProject.timeline}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded">
                    <Tag className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Budget: {activeProject.budgetRange}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Transformation Slider */}
              <div className="p-6 md:p-10 border-b border-stone-200">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-4">
                    <span className="text-brand-terracotta font-mono font-bold text-xs uppercase block">
                      DRAGGABLE TRANSFORMATION SLIDER
                    </span>
                    <span className="text-xs text-gray-500">
                      Drag left-to-right to see raw brick site vs. final luxury execution
                    </span>
                  </div>

                  <div 
                    ref={sliderRef}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-lg border border-stone-300 cursor-ew-resize select-none bg-stone-900"
                    id="before-after-interaction-slider"
                  >
                    {/* Before Image (Left State) */}
                    <img 
                      src={activeProject.imageBefore} 
                      alt="Raw construct site layout"
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-brand-charcoal/95 text-white/90 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded">
                      Site Start (Before)
                    </div>

                    {/* After Image (Right clipped state) */}
                    <div 
                      className="absolute inset-y-0 right-0 overflow-hidden"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <img 
                        src={activeProject.imageAfter} 
                        alt="Final luxury finish layout"
                        className="absolute inset-0 object-cover"
                        style={{ 
                          width: sliderRef.current?.offsetWidth || '800px',
                          maxWidth: 'none',
                          height: '100%',
                          right: 0,
                          left: `-${sliderPosition}%` 
                        }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3 bg-brand-gold/95 text-brand-charcoal text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded">
                        Luxury Finish (After)
                      </div>
                    </div>

                    {/* Draggable vertical bar handle */}
                    <div 
                      className="absolute inset-y-0 w-1 bg-brand-gold cursor-ew-resize"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-gold text-brand-charcoal flex items-center justify-center shadow-lg border-2 border-white">
                        <ArrowLeftRight className="w-4 h-4 font-bold" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Narratives: Brief, Solution, Sketches & Palette */}
              <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-brand-charcoal uppercase font-bold mb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-brand-pink" />
                      Original Designer Brief
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {activeProject.clientBrief}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-brand-charcoal uppercase font-bold mb-2 flex items-center gap-2">
                      <Workflow className="w-4 h-4 text-brand-gold" />
                      Execution Hurdle (The Challenge)
                    </h4>
                    <p className="text-sm text-stone-600 leading-relaxed italic border-l-2 border-brand-gold pl-3">
                      {activeProject.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-brand-charcoal uppercase font-bold mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-pink" />
                      Bespoke Design Concept Solution
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {activeProject.concept}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-6 bg-brand-ivory/60 p-6 rounded-lg border border-stone-200">
                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-brand-charcoal uppercase font-bold mb-3">
                      MATERIAL SWATCHES PALETTE
                    </h4>
                    <div className="flex gap-3">
                      {activeProject.moodboardColors.map((col) => (
                        <div key={col} className="text-center">
                          <div 
                            className="w-10 h-10 rounded-full border border-stone-300 shadow" 
                            style={{ backgroundColor: col }}
                          />
                          <span className="text-[10px] font-mono uppercase block mt-1.5 text-gray-500">
                            {col}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-brand-charcoal uppercase font-bold mb-3">
                      ARCHITECTURAL LINE DRAFT
                    </h4>
                    <div className="rounded overflow-hidden border border-stone-300 aspect-video relative">
                      <img 
                        src={activeProject.sketchImage} 
                        alt="Bespoke drafting plan sketch"
                        className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-300 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                        <span className="text-[10px] font-mono bg-brand-charcoal/90 text-stone-300 py-1 px-2 rounded">
                          BLUEPRINT LAYOUT 01
                        </span>
                      </div>
                    </div>
                  </div>

                  {activeProject.testimonial && (
                    <div className="pt-4 border-t border-stone-300">
                      <h4 className="text-[10px] font-mono tracking-widest text-brand-terracotta uppercase font-bold mb-2">
                        CLIENT VERIFIED SENTIMENT
                      </h4>
                      <p className="text-xs italic text-gray-600 leading-relaxed">
                        {activeProject.testimonial}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Photo Reel Gallery */}
              <div className="p-6 md:p-10 bg-stone-50 border-t border-stone-200">
                <h4 className="text-xs font-mono tracking-widest text-brand-charcoal uppercase font-bold mb-6">
                  PORTFOLIO PHOTO REEL EXTRAS
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {activeProject.finalPhotos.map((ph, idx) => (
                    <div key={idx} className="aspect-[4/3] rounded overflow-hidden border border-stone-200 shadow-sm relative group/reel bg-stone-200">
                      <img 
                        src={ph} 
                        alt={`Finishing detail ${idx}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/reel:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Consult Action inside Case study */}
              <div className="bg-brand-charcoal p-6 text-center text-brand-ivory flex justify-between items-center flex-wrap gap-4 border-t border-brand-pink/10">
                <span className="text-xs font-mono text-stone-400">
                  Ready to craft a similar layout in Jaipur?
                </span>
                <button
                  onClick={() => {
                    setActiveProject(null);
                    onNavigate('contact');
                  }}
                  className="px-5 py-2.5 bg-brand-pink hover:bg-brand-gold text-brand-charcoal hover:text-white font-mono text-xs rounded transition-colors tracking-widest uppercase cursor-pointer"
                >
                  Book Free Concept Consult
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
