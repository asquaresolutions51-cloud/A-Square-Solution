import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PRICING_PACKAGES, PricingPackage } from '../data';
import { Check, X, ShieldAlert, Sparkles, Building, Landmark, Sofa, HelpCircle, DollarSign, CornerDownRight } from 'lucide-react';

interface PricingViewProps {
  onNavigate: (id: string) => void;
}

export default function PricingView({ onNavigate }: PricingViewProps) {
  const [activeTab, setActiveTab] = useState<'Apartment' | 'Villa' | 'Commercial'>('Apartment');
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  const currentPackages = PRICING_PACKAGES[activeTab];

  const milestones = [
    { title: '10% Commitment Booking', desc: 'Secure direct in-house slot. Initiates laser digital 3D space scanning and architectural layouts.' },
    { title: '40% Material Procurement', desc: 'Released upon 3D rendering signoff. Sets direct timber/quartz procurement at our Mansarovar facility.' },
    { title: '40% Intermediate Assembly', desc: 'Released upon physical arrival of raw cabinets at site. Triggers direct final polish & veneer.' },
    { title: '10% Final Satisfied Handover', desc: 'Released after final deep clean, snagging check review, and warranty physical key handover.' }
  ];

  return (
    <div className="py-12 bg-brand-ivory" id="pricing-packages-page">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="text-brand-pink font-mono tracking-widest text-xs uppercase block mb-1">
          FINANCIAL TRANSPARENCY
        </span>
        <h1 className="text-4xl font-serif font-semibold text-brand-charcoal mb-4">
          Indicative Packages & Milestones
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto text-sm">
          No generic lumpsum quotes. We align our bills with precise carpet measurements so you only pay for actual material ounces.
        </p>
        <div className="h-1 w-20 bg-brand-gold mx-auto mt-4" />
      </div>

      {/* Property Type Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-center">
        <div className="bg-white p-1.5 rounded-lg border border-stone-200 inline-flex flex-wrap shadow-sm">
          <button
            onClick={() => {
              setActiveTab('Apartment');
              setSelectedPackage('');
            }}
            className={`px-5 py-2.5 rounded text-xs font-mono tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'Apartment'
                ? 'bg-brand-charcoal text-white shadow'
                : 'text-brand-charcoal hover:bg-stone-100'
            }`}
          >
            <Sofa className="w-4 h-4 text-brand-pink" />
            APARTMENTS IN JAIPUR
          </button>
          <button
            onClick={() => {
              setActiveTab('Villa');
              setSelectedPackage('');
            }}
            className={`px-5 py-2.5 rounded text-xs font-mono tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'Villa'
                ? 'bg-brand-charcoal text-white shadow'
                : 'text-brand-charcoal hover:bg-stone-100'
            }`}
          >
            <Landmark className="w-4 h-4 text-brand-gold" />
            LUXURY VILLAS
          </button>
          <button
            onClick={() => {
              setActiveTab('Commercial');
              setSelectedPackage('');
            }}
            className={`px-5 py-2.5 rounded text-xs font-mono tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'Commercial'
                ? 'bg-brand-charcoal text-white shadow'
                : 'text-brand-charcoal hover:bg-stone-100'
            }`}
          >
            <Building className="w-4 h-4 text-brand-terracotta" />
            COMMERCIAL / OFFICES
          </button>
        </div>
      </div>

      {/* Package Render Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center max-w-6xl mx-auto">
          {currentPackages.map((pack) => {
            const isSelected = selectedPackage === pack.id;
            return (
              <motion.div
                key={pack.id}
                className={`bg-white rounded-xl border p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  isSelected 
                    ? 'ring-2 ring-brand-gold border-transparent shadow-lg' 
                    : 'border-stone-200 hover:border-brand-pink/50 shadow-sm'
                }`}
                id={`package-box-${pack.id}`}
              >
                {/* Visual Accent for luxury */}
                {pack.name.includes('Premium') || pack.name.includes('Bespoke') ? (
                  <div className="absolute top-0 right-0 bg-brand-pink text-brand-ivory text-[9px] font-mono uppercase tracking-widest px-3 py-1 font-bold rounded-bl">
                    Most Popular Choice
                  </div>
                ) : null}

                <div>
                  <span className="text-brand-terracotta font-mono text-[10px] tracking-widest uppercase block mb-1">
                    {pack.subtitle}
                  </span>
                  <h3 className="text-xl font-serif font-black text-brand-charcoal mb-4">
                    {pack.name}
                  </h3>
                  
                  <div className="flex items-baseline mb-4 bg-brand-ivory/50 p-4 rounded border border-stone-200">
                    <span className="text-2xl font-serif font-semibold text-brand-charcoal">{pack.price}</span>
                    <span className="text-[10px] font-mono text-gray-400 ml-1">/ EST. TOTAL</span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed mb-6 italic">
                    {pack.description}
                  </p>

                  <div className="h-[1px] bg-stone-100 my-4" />

                  <h4 className="text-[10px] font-mono tracking-wider font-bold text-brand-charcoal uppercase mb-3">
                    WHAT IS FULLY COVERED:
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {pack.featuresIncluded.map((inc, i) => (
                      <li key={i} className="flex items-start text-xs text-gray-700">
                        <Check className="w-3.5 h-3.5 text-brand-pink mr-1.5 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="h-[1px] bg-stone-100 my-4" />

                  <h4 className="text-[10px] font-mono tracking-wider font-bold text-gray-400 uppercase mb-3">
                    WHAT IS TYPICALLY EXCLUDED:
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {pack.featuresExcluded.map((exc, i) => (
                      <li key={i} className="flex items-start text-[11px] text-gray-400 line-through">
                        <X className="w-3.5 h-3.5 text-gray-300 mr-1.5 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-stone-100">
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-4">
                    <span>TIMELINE TO HANDOVER</span>
                    <span className="text-brand-charcoal font-bold">{pack.timeline}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPackage(pack.id);
                      onNavigate('contact');
                    }}
                    className="w-full py-3 bg-brand-charcoal hover:bg-brand-terracotta text-brand-ivory text-xs font-mono tracking-widest uppercase transition-colors rounded cursor-pointer"
                  >
                    Select & Customize Package
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Payment Milestone Structure Breakdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-brand-charcoal text-brand-ivory p-8 md:p-12 rounded-xl max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center md:text-left md:flex justify-between items-center mb-10 border-b border-stone-800 pb-6">
            <div>
              <span className="text-brand-pink font-mono text-[10px] tracking-widest uppercase block mb-1">
                STRUCTURED FINANCIAL MILESTONES
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-white">
                Indicative Split-Payment Schedule
              </h3>
            </div>
            <div className="text-xs font-mono text-stone-400 mt-2 md:mt-0 max-w-xs leading-relaxed">
              We charge strictly according to production milestones. No advance visual blockages or front-loaded expenses.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((ms, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-lg text-left hover:border-brand-gold/30 transition-colors">
                <span className="text-3xl font-serif font-black text-brand-pink block mb-2">0{idx+1}</span>
                <h4 className="text-xs font-mono tracking-wider font-bold text-brand-gold uppercase block mb-1.5">
                  {ms.title}
                </h4>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  {ms.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center text-[10px] text-stone-400 items-start gap-2 max-w-xl mx-auto bg-stone-900/40 p-4 rounded border border-stone-800">
            <HelpCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
            <p className="leading-relaxed italic">
              * Final package values scale according to absolute carpet area sizes, custom material choices, and total solid furniture count.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
