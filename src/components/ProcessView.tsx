import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  PhoneCall, 
  Compass, 
  Palette, 
  Layers, 
  Wrench, 
  Key, 
  CheckSquare, 
  Clock, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { DESIGN_PROCESS_STEPS } from '../data';

interface ProcessViewProps {
  onNavigate: (id: string) => void;
}

export default function ProcessView({ onNavigate }: ProcessViewProps) {
  const [selectedStep, setSelectedStep] = useState<number>(3); // Concept & Moodboard active defaults

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'PhoneCall': return PhoneCall;
      case 'Compass': return Compass;
      case 'Palette': return Palette;
      case 'Layers': return Layers;
      case 'Wrench': return Wrench;
      case 'Key': return Key;
      default: return CheckSquare;
    }
  };

  const stepDetailsExtra: Record<number, { deliverables: string[]; anxietyBuster: string }> = {
    1: {
      deliverables: ['Itemized budget estimation range sheet', 'Concept moodboard board references', 'Spatial checklist document'],
      anxietyBuster: 'Zero cost or credit card commitment. This call simply filters technical feasibility and maps your primary carpet constraints.'
    },
    2: {
      deliverables: ['Laser precise internal digital architectural file (.dwg)', 'Structural beam clearance analysis report', 'Initial directional magnetic map'],
      anxietyBuster: 'Our engineers operate silently, keeping physical site interactions to less than 45 minutes using digital 3D scans instead of bulky tapes.'
    },
    3: {
      deliverables: ['Custom wood & fabric swatches delivered to your box', '2D flooring plan variants (usually 2 options)', '3D conceptual material pairing sheet'],
      anxietyBuster: 'You touch physical stone slices and scratch-test BWR timber slabs before signing off. Safe alignment of textures is fully guaranteed.'
    },
    4: {
      deliverables: ['Photorealistic 1080p high fidelity renderings', 'Full electrical plumbing routing layouts (Ready for workers)', 'Material bill with static transparent pricing tags'],
      anxietyBuster: 'What you see is exactly what was fabricated. The pricing tag signed at this step is the exact price you pay at final handover.'
    },
    5: {
      deliverables: ['Weekly video update logs (Shared via WhatsApp group)', 'Workshop raw carpentry proof photos', 'Dedicated supervisor on-site log'],
      anxietyBuster: ' Mansarovar workshop fabrication handles 90% of structural dust, so your residence remains dry, silent and clean during core weeks.'
    },
    6: {
      deliverables: ['Complete high-end physical sweep sanitization', 'Individual hardware manufacturer warranty physical keys', 'Maintenance instruction playbook'],
      anxietyBuster: 'A Square Solution provides a 5-Year continuous repair warranty, returning within 24 hours if any door hinge needs a tuning check.'
    }
  };

  return (
    <div className="py-12 bg-brand-ivory" id="design-process-journey">
      {/* Intro Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="text-brand-gold font-mono tracking-widest text-xs uppercase block mb-1">
          ANXIETY-FREE EXECUTION
        </span>
        <h1 className="text-4xl font-serif font-semibold text-brand-charcoal mb-4">
          Our Transparent 6-step Journey
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto text-sm">
          No vague estimations or chaotic carpenter delays. We operate on a strict milestone framework, keeping you informed at every single point.
        </p>
        <div className="h-1 w-20 bg-brand-pink mx-auto mt-4" />
      </div>

      {/* Main Timeline Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        
        {/* Step Cards Slider (Left) */}
        <div className="lg:col-span-7 space-y-4">
          {DESIGN_PROCESS_STEPS.map((item) => {
            const IconComponent = getStepIcon(item.icon);
            const isActive = selectedStep === item.step;
            return (
              <motion.div
                key={item.step}
                onClick={() => setSelectedStep(item.step)}
                className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer text-left relative flex items-start gap-4 ${
                  isActive
                    ? 'bg-white border-brand-gold shadow-md ring-1 ring-brand-gold/20'
                    : 'bg-white/60 hover:bg-white border-stone-200'
                }`}
                whileHover={{ x: isActive ? 0 : 4 }}
                id={`process-step-${item.step}`}
              >
                {/* Step indicator circle */}
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                  isActive
                    ? 'bg-brand-terracotta border-brand-terracotta text-brand-ivory text-white'
                    : 'bg-stone-100 border-stone-300 text-brand-charcoal'
                }`}>
                  0{item.step}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2 flex-wrap mb-1">
                    <h3 className="font-serif font-black text-brand-charcoal text-base">
                      {item.title}
                    </h3>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-brand-pink font-semibold bg-brand-pink/5 px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.timeline}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deliverables details layout (Right) */}
        <div className="lg:col-span-5">
          <div className="bg-brand-charcoal text-brand-ivory p-8 rounded-xl border border-stone-800 shadow-xl sticky top-28">
            <span className="text-brand-pink font-mono text-[10px] tracking-widest uppercase block mb-1">
              CURRENT MILESTONE FOCUS
            </span>
            <span className="text-3xl font-serif font-black text-brand-gold block mb-6">
              Step 0{selectedStep} Details
            </span>

            <h4 className="text-sm font-serif text-white font-semibold mb-1">
              {DESIGN_PROCESS_STEPS.find(s => s.step === selectedStep)?.title}
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed mb-6">
              {DESIGN_PROCESS_STEPS.find(s => s.step === selectedStep)?.description}
            </p>

            <div className="h-[1px] bg-stone-800 my-6" />

            <h5 className="text-[10px] font-mono tracking-wider font-bold text-brand-pink uppercase mb-4">
              CLIENT DELIVERABLES AT THIS STAGE:
            </h5>

            <ul className="space-y-3 mb-8">
              {stepDetailsExtra[selectedStep]?.deliverables.map((del, idx) => (
                <li key={idx} className="flex items-start text-xs text-stone-200">
                  <div className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-2.5 mt-2 shrink-0 animate-pulse" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-xs leading-relaxed text-stone-300 md:flex gap-3 items-start">
              <ShieldAlert className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block mb-0.5">Trust & Quality Assurance:</span>
                {stepDetailsExtra[selectedStep]?.anxietyBuster}
              </div>
            </div>

            {/* Custom consult CTA linking from steps */}
            <div className="mt-8">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-3 bg-brand-pink hover:bg-brand-gold text-brand-charcoal hover:text-white font-mono text-xs uppercase tracking-widest rounded transition-colors block cursor-pointer"
              >
                Book Discovery Consultation
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
