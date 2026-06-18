import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_STEPS, SwatchOption, CUSTOM_FURNITURE_SWATCHES } from '../data';
import { CheckCircle, ArrowRight, ArrowLeft, RefreshCw, Sparkles, MessageSquare, PhoneCall, Gift, Check } from 'lucide-react';

interface StyleQuizViewProps {
  onNavigate: (id: string) => void;
}

export default function StyleQuizView({ onNavigate }: StyleQuizViewProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  
  // Form lead info states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [areaSqFt, setAreaSqFt] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const getQuizResultProfile = () => {
    const vibe = selectedAnswers['design-vibe'];
    const room = selectedAnswers['current-room'];
    const budget = selectedAnswers['budget-bracket'];

    if (vibe === 'heritage') {
      return {
        title: 'Jaipur Modern Heritage Fusion',
        tagline: 'Timeless Carvings, Deep ochres, & Contemporary Comfort',
        recommendation: 'Your profile perfectly aligns with a classical-modern merge. We recommend using solid seasoned teak wood structures, integrated stone lattices (Jalis) around the entries, combined with highly sleek minimalist modular kitchens clad in royal cobalt or ochre limewash boards.',
        colorMooard: ['#C97B72', '#B7955B', '#F7F1E8', '#24211E'],
        perfectSwatch: CUSTOM_FURNITURE_SWATCHES[0] // Seasoned teak
      };
    } else if (vibe === 'minimal') {
      return {
        title: 'Sleek Contemporary Minimalist',
        tagline: 'Quiet Luxury, Spatial optimization, & Solid Monochromes',
        recommendation: 'You prefer clean geometry, clutter-free desks, and functional linear task lighting. We recommend handles-free acrylic kitchen cabinets, ash wood sliding doors, and concealed magnetic wire tracks. This style maximizes your structural layout space.',
        colorMooard: ['#EFE9E1', '#D8C3A5', '#7A4B29', '#24211E'],
        perfectSwatch: CUSTOM_FURNITURE_SWATCHES[3] // Sheesham ash
      };
    } else if (vibe === 'opulent') {
      return {
        title: 'Avant-Garde Architectural Luxury',
        tagline: 'High-gloss marble panels, Gold profiles, and Home Automation',
        recommendation: 'You prioritize high-end materials, custom velvet sofa backings, motorized custom wardrobes with internal sensor illumination, and royal gold profiles. Your kitchen should feature premium touch-to-open blum systems with integrated double-column pantries.',
        colorMooard: ['#FFFFFF', '#B7955B', '#3E342B', '#111827'],
        perfectSwatch: CUSTOM_FURNITURE_SWATCHES[2] // Gold leaf brass
      };
    } else {
      return {
        title: 'Organic Terracotta Earth',
        tagline: 'Earthy textures, Jute elements, and Breathing Limewash',
        recommendation: 'Your focus is on organic well-being, abundant ventilation, and soft clay walls. We recommend mineral limewash coatings for major accent walls, sandstone potted indoor foliage, natural linens, and woven partitions helping light diffusion.',
        colorMooard: ['#D99873', '#59634A', '#F7F1E8', '#1F2937'],
        perfectSwatch: CUSTOM_FURNITURE_SWATCHES[1] // Ochre Terracotta
      };
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    const currentStepId = QUIZ_STEPS[currentStepIdx].id;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentStepId]: optionValue
    }));

    // Auto progress to next step
    if (currentStepIdx < QUIZ_STEPS.length - 1) {
      setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 300);
    } else {
      // Advance to visual contact-form collection step
      setCurrentStepIdx(QUIZ_STEPS.length);
    }
  };

  const handleBack = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please fill out Name and Phone number to generate your detailed report.');
      return;
    }

    // Save lead parameters locally in localstorage to show real integration
    const savedLeads = JSON.parse(localStorage.getItem('asquare_leads') || '[]');
    savedLeads.push({
      date: new Date().toISOString(),
      name,
      phone,
      email,
      areaSqFt,
      answers: selectedAnswers,
      profile: getQuizResultProfile().title
    });
    localStorage.setItem('asquare_leads', JSON.stringify(savedLeads));

    setFormSubmitted(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setCurrentStepIdx(0);
    setName('');
    setPhone('');
    setEmail('');
    setAreaSqFt('');
    setFormSubmitted(false);
  };

  return (
    <div className="py-12 bg-brand-ivory" id="style-quiz-panel-view">
      <div className="max-w-4xl mx-auto px-4">
        {/* Intro Banner */}
        <div className="text-center mb-10">
          <span className="text-brand-pink font-mono tracking-widest text-xs uppercase block mb-1">
            QUALIFY YOUR SPACE
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-black text-brand-charcoal">
            Design Vibe Style Quiz
          </h1>
          <p className="text-xs text-gray-500 mt-1 max-w-lg mx-auto">
            Answer a few quick questions to align your aesthetic coordinates and download a bespoke starting layout report with budget projections.
          </p>
          <div className="h-1 w-20 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Step Progress indicators */}
        {currentStepIdx <= QUIZ_STEPS.length ? (
          <div className="mb-8 max-w-md mx-auto">
            <div className="flex justify-between items-center text-xs font-mono text-gray-400 mb-2">
              <span>STEP {Math.min(currentStepIdx + 1, QUIZ_STEPS.length + 1)} OF {QUIZ_STEPS.length + 1}</span>
              <span>{Math.round((Math.min(currentStepIdx + 1, QUIZ_STEPS.length + 1) / (QUIZ_STEPS.length + 1)) * 100)}% COMPLETE</span>
            </div>
            <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-pink transition-all duration-300"
                style={{ width: `${((Math.min(currentStepIdx + 1, QUIZ_STEPS.length + 1)) / (QUIZ_STEPS.length + 1)) * 100}%` }}
              />
            </div>
          </div>
        ) : null}

        <div className="bg-white rounded-xl shadow-xl p-8 border border-stone-200">
          <AnimatePresence mode="wait">
            {/* Steps 1 to 4 - Interactive Question Cards */}
            {currentStepIdx < QUIZ_STEPS.length ? (
              <motion.div
                key={currentStepIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl md:text-2xl font-serif font-semibold text-brand-charcoal text-center mb-8">
                  {QUIZ_STEPS[currentStepIdx].question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {QUIZ_STEPS[currentStepIdx].options.map((opt) => {
                    const stepId = QUIZ_STEPS[currentStepIdx].id;
                    const isSelected = selectedAnswers[stepId] === opt.value;
                    return (
                      <div
                        key={opt.value}
                        onClick={() => handleOptionSelect(opt.value)}
                        className={`group border rounded-lg overflow-hidden cursor-pointer transition-all hover:border-brand-gold bg-stone-50 hover:bg-white flex flex-col justify-between ${
                          isSelected 
                            ? 'ring-2 ring-brand-terracotta border-transparent shadow shadow-brand-pink/20' 
                            : 'border-stone-200'
                        }`}
                        id={`quiz-option-${opt.value}`}
                      >
                        <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
                          <img 
                            src={opt.img} 
                            alt={opt.text}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="p-4 bg-white flex justify-between items-center border-t border-stone-100">
                          <span className="text-xs font-mono font-medium text-brand-charcoal uppercase group-hover:text-brand-terracotta transition-colors">
                            {opt.text}
                          </span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-brand-terracotta border-brand-terracotta text-white' : 'border-stone-300'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Back button alignment */}
                {currentStepIdx > 0 && (
                  <div className="mt-8 flex justify-start">
                    <button
                      onClick={handleBack}
                      className="px-4 py-2 border border-stone-300 rounded text-xs font-mono text-gray-500 hover:text-brand-charcoal hover:bg-stone-50 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      BACK
                    </button>
                  </div>
                )}
              </motion.div>
            ) : currentStepIdx === QUIZ_STEPS.length && !formSubmitted ? (
              /* Step 5: Lead capture form styling */
              <motion.div
                key="form-step"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-md mx-auto"
              >
                <div className="text-center mb-6">
                  <span className="text-3xl block">🎁</span>
                  <h3 className="text-xl font-serif font-black text-brand-charcoal mt-2 mb-1">
                    Calculate Design Projections
                  </h3>
                  <p className="text-xs text-gray-500">
                    We've matched your custom style profile! Enter your contact details below to instantly view your tailored blueprint.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Priyan Verma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 bg-brand-ivory/50 rounded border border-stone-300 text-sm focus:outline-none focus:border-brand-gold text-brand-charcoal"
                      id="quiz-form-name"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                      Telephone / WhatsApp *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. 8529664281"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 bg-brand-ivory/50 rounded border border-stone-300 text-sm focus:outline-none focus:border-brand-gold text-brand-charcoal"
                      id="quiz-form-phone"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                      Email address (For report PDF)
                    </label>
                    <input 
                      type="email" 
                      placeholder="e.g. priyan@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 bg-brand-ivory/50 rounded border border-stone-300 text-sm focus:outline-none focus:border-brand-gold text-brand-charcoal"
                      id="quiz-form-email"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                      Estimated Carpet Area (Sq.Ft.)
                    </label>
                    <input 
                      type="number" 
                      placeholder="e.g. 1800"
                      value={areaSqFt}
                      onChange={(e) => setAreaSqFt(e.target.value)}
                      className="w-full p-2.5 bg-brand-ivory/50 rounded border border-stone-300 text-sm focus:outline-none focus:border-brand-gold text-brand-charcoal"
                      id="quiz-form-area"
                    />
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2.5 border border-stone-300 rounded text-xs font-mono text-gray-500 hover:text-brand-charcoal transition-colors cursor-pointer"
                    >
                      BACK
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-brand-terracotta hover:bg-brand-gold text-white font-mono text-xs uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      id="quiz-form-submit"
                    >
                      <span>VIEW DETAILED RECOMMENDATIONS</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              /* Quiz Result Display view */
              <motion.div
                key="results-step"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-left"
              >
                <div className="text-center mb-8 bg-brand-pink/5 p-6 rounded-lg border border-brand-pink/15">
                  <div className="w-12 h-12 bg-brand-pink/10 text-brand-terracotta flex items-center justify-center rounded-full mx-auto mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-brand-pink font-mono text-[10px] uppercase font-bold block mb-1">
                    YOUR EXCLUSIVE STYLE PROFILE MATCH
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-black text-brand-charcoal">
                    {getQuizResultProfile().title}
                  </h3>
                  <p className="text-xs italic text-brand-terracotta mt-1">
                    "{getQuizResultProfile().tagline}"
                  </p>
                </div>

                <h4 className="text-[10px] font-mono tracking-wider font-bold text-gray-400 uppercase mb-2">
                  TAILORED CONCEPT ARCHITECTURE SUMMARY:
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  {getQuizResultProfile().recommendation}
                </p>

                {/* Swatches & Perfect Spec layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-5 bg-brand-ivory rounded border border-stone-200">
                    <span className="text-[10px] font-mono text-gray-400 block mb-3 uppercase">
                      MATCHED DESIGN MOODBOARD COLORS:
                    </span>
                    <div className="flex gap-2">
                      {getQuizResultProfile().colorMooard.map((col) => (
                        <div key={col} className="text-center">
                          <div 
                            className="w-8 h-8 rounded-full border border-stone-300" 
                            style={{ backgroundColor: col }}
                          />
                          <span className="text-[9px] font-mono block mt-1 uppercase text-gray-500">{col}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 bg-brand-ivory rounded border border-stone-200 flex items-center gap-4">
                    <div className="w-16 h-16 rounded overflow-hidden bg-stone-200 shrink-0 border border-stone-300">
                      <img 
                        src={getQuizResultProfile().perfectSwatch.imagePreview} 
                        alt="Perfect Timber swatch"
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-brand-pink font-bold block uppercase mb-0.5">
                        PEERLESS TIMBER SPEC:
                      </span>
                      <h5 className="font-serif font-black text-xs text-brand-charcoal">
                        {getQuizResultProfile().perfectSwatch.name}
                      </h5>
                      <span className="text-[10px] text-gray-500 font-sans block mt-1 leading-tight">
                        {getQuizResultProfile().perfectSwatch.textureName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Anxiety Busters regarding consultation prizes */}
                <div className="bg-brand-charcoal text-brand-ivory p-6 rounded-lg mb-8 md:flex items-center justify-between gap-6">
                  <div className="mb-4 md:mb-0">
                    <span className="text-[9px] font-mono text-brand-gold tracking-widest uppercase block mb-1">
                      EXCLUSIVE SURVEY GIFT UNLOCKED 🎁
                    </span>
                    <h5 className="text-sm font-serif text-white">
                      Complimentary 3D Space Planning Voucher
                    </h5>
                    <p className="text-[11px] text-stone-300 mt-1 max-w-sm">
                      We have tagged layout credentials on WhatsApp number: <strong>{phone}</strong>. Walk-in or book a call to claim custom layouts.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // Trigger direct call structure
                      window.location.href = `tel:${phone}`;
                    }}
                    className="px-4 py-2.5 bg-brand-pink text-brand-charcoal font-semibold text-xs rounded uppercase font-mono tracking-wider hover:bg-brand-gold h-fit transition-colors shrink-0"
                  >
                    Claim Free Voucher
                  </button>
                </div>

                <div className="flex gap-4 justify-between border-t border-stone-200 pt-6">
                  <button
                    onClick={resetQuiz}
                    className="px-4 py-2 border border-stone-300 rounded text-xs font-mono text-gray-500 hover:text-brand-charcoal transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 animate-spin-slow" />
                    RETAKE QUIZ
                  </button>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="px-5 py-2 bg-brand-terracotta hover:bg-brand-charcoal text-white text-xs font-mono tracking-widest uppercase transition-colors rounded cursor-pointer"
                  >
                    Consult With A Designer Now
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
