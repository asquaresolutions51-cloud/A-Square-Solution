import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hammer, 
  ChefHat, 
  Armchair, 
  Home as HomeIcon, 
  Briefcase, 
  Compass, 
  ChevronRight, 
  CheckCircle2, 
  X, 
  DollarSign, 
  BookOpen, 
  ArrowRight,
  Info
} from 'lucide-react';
import { SERVICES_CATALOG, ServiceItem } from '../data';

interface ServicesViewProps {
  onNavigate: (id: string) => void;
  selectedServiceId?: string;
}

export default function ServicesView({ onNavigate, selectedServiceId }: ServicesViewProps) {
  const [activeService, setActiveService] = useState<ServiceItem | null>(
    SERVICES_CATALOG.find(s => s.id === selectedServiceId) || null
  );

  // Helper to map icon names to actual Lucide component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Hammer': return Hammer;
      case 'ChefHat': return ChefHat;
      case 'Armchair': return Armchair;
      case 'Home': return HomeIcon;
      case 'Briefcase': return Briefcase;
      case 'Compass': return Compass;
      default: return Hammer;
    }
  };

  const handleCardClick = (service: ServiceItem) => {
    setActiveService(service);
    // Smooth scroll to details
    const el = document.getElementById('service-deep-details-anchor');
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="py-12 bg-brand-ivory" id="services-page">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="text-brand-pink font-mono tracking-widest text-xs uppercase block mb-2">
          TAILORED SOLUTIONS
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-brand-charcoal mb-4">
          Bespoke Design & execution
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base">
          From full masonry shell transformations down to premium modular joints and Vastu directional styling, we provide complete, transparent execution.
        </p>
        <div className="h-1 w-20 bg-brand-gold mx-auto mt-6" />
      </div>

      {/* Grid of Service Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_CATALOG.map((service, index) => {
            const IconComp = getIconComponent(service.icon);
            const isSelected = activeService?.id === service.id;
            return (
              <motion.div
                key={service.id}
                className={`bg-white rounded-lg p-8 border hover:border-brand-gold transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between cursor-pointer group ${
                  isSelected ? 'ring-2 ring-brand-gold border-transparent' : 'border-stone-200'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => handleCardClick(service)}
                id={`service-card-${service.id}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-brand-ivory text-brand-terracotta flex items-center justify-center rounded transition-colors group-hover:bg-brand-pink/10">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-gold bg-brand-ivory hover:bg-white tracking-wide px-2 py-1 rounded">
                      STARTS AT {service.priceStart}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-brand-charcoal mb-2 group-hover:text-brand-terracotta transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-brand-pink font-medium tracking-wide block mb-3">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center text-xs font-mono text-brand-terracotta font-semibold mt-4 group-hover:text-brand-gold transition-colors">
                  <span>EXPAND DETAILED SPECS</span>
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div id="service-deep-details-anchor" className="scroll-mt-24" />

      {/* Interactive Detail Section */}
      <AnimatePresence mode="wait">
        {activeService ? (
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="bg-white rounded-xl border border-stone-200 shadow-xl overflow-hidden">
              {/* Service Hero Banner */}
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden bg-stone-100">
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/30 to-transparent" />
                  <button 
                    onClick={() => setActiveService(null)}
                    className="absolute top-4 right-4 bg-brand-charcoal/95 text-white p-2 rounded-full cursor-pointer hover:bg-brand-pink transition-colors"
                    title="Close specs"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-brand-pink/15 text-brand-terracotta rounded-full text-xs font-mono tracking-widest uppercase">
                        Active Selection Speeds
                      </span>
                      <span className="px-3 py-1 bg-brand-gold/15 text-brand-gold rounded-full text-xs font-mono tracking-wide">
                        Starting: {activeService.priceStart}
                      </span>
                    </div>

                    <h2 className="text-3xl font-serif font-black text-brand-charcoal mb-2">
                      {activeService.title}
                    </h2>
                    <p className="text-md text-brand-terracotta font-serif italic mb-6">
                      "{activeService.tagline}"
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {activeService.description}
                    </p>

                    <div className="h-[1px] bg-stone-200 my-6" />

                    <h4 className="text-xs font-mono tracking-widest text-brand-charcoal uppercase mb-4 font-bold">
                      WHAT IS FULLY INCLUDED:
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                      {activeService.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-brand-pink mr-2 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-stone-100">
                    <div>
                      <span className="text-xs text-gray-400 block uppercase font-mono">ESTIMATED LAUNCH TIMELINE</span>
                      <span className="text-sm font-sans font-bold text-brand-charcoal">Usually 45 to 90 Days</span>
                    </div>
                    <button 
                      onClick={() => onNavigate('contact')}
                      className="px-6 py-3 bg-brand-terracotta hover:bg-brand-gold text-white font-mono text-xs rounded transition-colors tracking-widest uppercase flex items-center gap-2 cursor-pointer"
                    >
                      <span>Inquire for {activeService.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Material specifications & FAQs inside deep dive tab */}
              <div className="bg-brand-ivory/50 p-8 lg:p-12 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-sm font-mono tracking-widest text-brand-charcoal uppercase mb-6 font-bold flex items-center gap-2">
                    <Info className="w-4 h-4 text-brand-gold" />
                    Premium Raw Material Specifications
                  </h4>
                  <div className="space-y-6">
                    {activeService.materials.map((mat, idx) => (
                      <div key={idx} className="bg-white p-4 rounded border border-stone-200/80">
                        <span className="text-brand-terracotta font-serif font-black text-sm block mb-1">
                          {mat.name}
                        </span>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {mat.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Trust warning regarding material source */}
                  <div className="mt-6 p-4 bg-brand-pink/5 border border-brand-pink/15 rounded text-xs text-brand-charcoal/80 italic">
                    * Note: All raw ply timbers carry lifetime certificates of anti-termite resistance directly transferable to home title heirs.
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-mono tracking-widest text-brand-charcoal uppercase mb-6 font-bold flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand-pink" />
                    Service Specific Consultation FAQs
                  </h4>
                  <div className="space-y-6">
                    {activeService.faqs.map((faq, idx) => (
                      <div key={idx} className="border-b border-stone-200 pb-4 last:border-0 last:pb-0">
                        <h5 className="font-sans font-bold text-xs text-brand-charcoal mb-2">
                          Q: {faq.q}
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400 py-6 italic">
            * Select a service card above to expand full material specs, detailed starting quotes, and technical blueprints *
          </div>
        )}
      </AnimatePresence>

      {/* Lead capture prompt */}
      <div className="mt-20 max-w-5xl mx-auto px-4">
        <div className="bg-brand-charcoal p-8 md:p-12 rounded-xl text-brand-ivory text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/10 rounded-full blur-2xl" />
          <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-3">
            Not sure which package fits your bare brick layout?
          </h3>
          <p className="text-sm text-stone-300 max-w-xl mx-auto mb-8">
            Tell us about your space. Take our fast visual 90-second Design Style Quiz to receive itemized recommendations and basic pricing projections.
          </p>
          <button 
            onClick={() => onNavigate('quiz')}
            className="px-6 py-3 bg-brand-pink hover:bg-brand-gold text-brand-charcoal hover:text-brand-ivory font-mono text-xs rounded transition-colors tracking-widest uppercase cursor-pointer"
          >
            Launch Visual Style Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
