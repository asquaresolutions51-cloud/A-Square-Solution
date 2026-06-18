import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CUSTOM_FURNITURE_SWATCHES, SwatchOption, OFFICE_CONTACT_INFO } from '../data';
import { Armchair, Check, DollarSign, SwatchBook, CornerDownRight, Tag, Info, AlertCircle } from 'lucide-react';

interface FurnitureItem {
  id: string;
  name: string;
  category: string;
  basePrice: string;
  images: Record<string, string>; // Maps swatch ID to specific beautiful photo
  specs: string[];
}

export default function CustomFurnitureCustomizer() {
  const [selectedFurniture, setSelectedFurniture] = useState<string>('sofa-royal');
  const [selectedSwatch, setSelectedSwatch] = useState<SwatchOption>(CUSTOM_FURNITURE_SWATCHES[0]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [customQuoteStatus, setCustomQuoteStatus] = useState<string>('');

  const furnitureCatalog: FurnitureItem[] = [
    {
      id: 'sofa-royal',
      name: 'The Imperial Teak Sofa Set',
      category: 'Living Room Seating',
      basePrice: '₹1.1L - ₹1.5L',
      images: {
        'teak-grain': 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80',
        'sandstone-limewash': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        'antique-gold-leaf': 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=600&q=80',
        'charcoal-ash': 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80'
      },
      specs: ['100% Solid Seasoned Teak wood framework base', 'Premium pocketed springs + high density orthopaedic foam layer', 'Removable double-stitched fabric wash cases', 'Customizable layout structures (3+2+1 or L-shape)']
    },
    {
      id: 'bed-jharokha',
      name: 'The Jharokha Carved Hydraulic Bed',
      category: 'Bedroom Framework',
      basePrice: '₹1.4L - ₹1.8L',
      images: {
        'teak-grain': 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
        'sandstone-limewash': 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80',
        'antique-gold-leaf': 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=600&q=80',
        'charcoal-ash': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=600&q=80'
      },
      specs: ['Extensive hand-carved Jali pattern bed-head panels', 'Hidden German heavy-duty gas hydraulic storage lifts', 'Anti-mildew moisture resistant commercial internal drawers', 'Satin smooth anti-allergy beeswax coat finish']
    },
    {
      id: 'console-brass',
      name: 'The Heritage Gilded Console Credenza',
      category: 'Accent Dining / Entrance Lobby',
      basePrice: '₹65,000 - ₹85,000',
      images: {
        'teak-grain': 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
        'sandstone-limewash': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        'antique-gold-leaf': 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=600&q=80',
        'charcoal-ash': 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80'
      },
      specs: ['Pure brass leaf inlay patterns across central cabinet doors', 'Bevelled premium quartzite stone tops (easy spill wipe)', 'Soft close silent slam-proof cabinet hinges', 'Adjustable internal wood dividers']
    }
  ];

  const activeFurn = furnitureCatalog.find(f => f.id === selectedFurniture) || furnitureCatalog[0];

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomQuoteStatus('success');
    setTimeout(() => {
      setCustomQuoteStatus('');
      setShowQuoteForm(false);
    }, 4000);
  };

  return (
    <div className="py-12 bg-white" id="furniture-customizer-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-pink font-mono tracking-widest text-xs uppercase block mb-1">
            WORKSHOP DIRECT EXTRAS
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-brand-charcoal">
            Custom Furniture Workshop Preview
          </h2>
          <p className="text-gray-500 text-xs mt-2">
            Select a bespoke furniture element and click any direct wood/finish swatch below to update the live render casing, material texture summary, and estimated quotes.
          </p>
          <div className="h-1 w-20 bg-brand-pink mx-auto mt-4" />
        </div>

        {/* Customization Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="configurator-box-interactive">
          
          {/* Live Render & Spec Casing (Left) */}
          <div className="lg:col-span-7">
            <div className="bg-brand-ivory p-6 rounded-2xl border border-stone-200 shadow-lg overflow-hidden">
              
              {/* Product render visual wrapper */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative border border-stone-300 bg-white mb-6">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${selectedFurniture}-${selectedSwatch.id}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    src={activeFurn.images[selectedSwatch.id] || activeFurn.images['teak-grain']}
                    alt={activeFurn.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Tags */}
                <div className="absolute top-3 left-3 bg-brand-charcoal/95 text-white text-[10px] uppercase tracking-wider font-mono px-3 py-1.5 rounded">
                  {activeFurn.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-brand-gold text-brand-charcoal text-xs font-mono font-bold px-3 py-1.5 rounded flex items-center shadow-md">
                  Est: {activeFurn.basePrice}
                </div>
              </div>

              {/* Technical deliverables list */}
              <h4 className="text-[10px] font-mono tracking-wider font-bold text-brand-charcoal uppercase mb-3 text-left">
                TECHNICAL DRAWING SPECIFICS:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left mb-2">
                {activeFurn.specs.map((spec, i) => (
                  <li key={i} className="flex items-start text-xs text-gray-600 leading-relaxed">
                    <CornerDownRight className="w-3.5 h-3.5 text-brand-pink mr-1.5 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>

            </div>
          </div>

          {/* Configurator selectors (Right) */}
          <div className="lg:col-span-5 text-left space-y-8">
            
            {/* Step 1: Element selector tabs */}
            <div>
              <span className="text-gray-400 font-mono text-[10px] uppercase font-bold tracking-wider block mb-3">
                STEP 1: SELECT COLLECTION DESIGN
              </span>
              <div className="space-y-3">
                {furnitureCatalog.map((item) => {
                  const isSelected = selectedFurniture === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedFurniture(item.id)}
                      className={`w-full p-4 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-brand-charcoal text-brand-ivory border-brand-pink shadow'
                          : 'bg-stone-50 hover:bg-stone-100 text-brand-charcoal border-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Armchair className={`w-5 h-5 ${isSelected ? 'text-brand-pink' : 'text-brand-gold'}`} />
                        <div>
                          <h4 className="font-serif font-black text-xs uppercase tracking-wide">
                            {item.name}
                          </h4>
                          <span className={`text-[10px] ${isSelected ? 'text-stone-300' : 'text-gray-400'}`}>
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold">{item.basePrice}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Material Timber & Finish Swatches */}
            <div>
              <span className="text-gray-400 font-mono text-[10px] uppercase font-bold tracking-wider block mb-3 flex items-center gap-1">
                <SwatchBook className="w-4 h-4 text-brand-pink" />
                STEP 2: SELECT RAW TIMBER / FINISH SWATCH
              </span>
              
              <div className="grid grid-cols-4 gap-3 mb-6">
                {CUSTOM_FURNITURE_SWATCHES.map((swatch) => {
                  const isSelected = selectedSwatch.id === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      onClick={() => setSelectedSwatch(swatch)}
                      className={`p-1 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                        isSelected ? 'border-brand-terracotta scale-105' : 'border-transparent hover:border-stone-200'
                      }`}
                      title={swatch.name}
                    >
                      <div 
                        className="w-10 h-10 rounded-full shadow"
                        style={{ backgroundColor: swatch.hex }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Matched swatch details block */}
              <div className="p-5 bg-brand-ivory rounded-lg border border-stone-200 text-left">
                <span className="text-[10px] font-mono text-brand-pink block mb-1 uppercase font-bold">
                  ACTIVE MATERIAL PROPERTIES
                </span>
                <h5 className="font-serif font-bold text-brand-charcoal text-sm">
                  {selectedSwatch.name}
                </h5>
                <span className="text-[11px] text-brand-terracotta font-mono uppercase block mt-1.5 font-bold">
                  Finishing: {selectedSwatch.textureName}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed mt-2 italic">
                  "{selectedSwatch.textureDescription}"
                </p>
              </div>
            </div>

            {/* Quotation buttons */}
            <div className="pt-4 border-t border-stone-200 text-left">
              {!showQuoteForm ? (
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="px-6 py-3 bg-brand-terracotta hover:bg-brand-charcoal text-white font-mono text-xs uppercase tracking-widest rounded transition-colors w-full text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  Request Customization Quote
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 bg-stone-50 rounded border border-stone-300"
                >
                  <h4 className="text-xs font-mono tracking-wider font-bold text-brand-charcoal uppercase mb-3">
                    ENTER CUSTOM MEASUREMENTS FOR {activeFurn.name.toUpperCase()}
                  </h4>
                  <form onSubmit={handleQuoteSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        required
                        placeholder="Expected Width (Ft)"
                        className="p-2 bg-white rounded border border-stone-300 text-xs text-brand-charcoal outline-none focus:border-brand-gold"
                      />
                      <input 
                        type="text" 
                        required
                        placeholder="Wood Fabric Trim color"
                        className="p-2 bg-white rounded border border-stone-300 text-xs text-brand-charcoal outline-none focus:border-brand-gold"
                      />
                    </div>
                    <input 
                      type="tel" 
                      required
                      placeholder="WhatsApp Mobile Number"
                      className="p-2 w-full bg-white rounded border border-stone-300 text-xs text-brand-charcoal outline-none focus:border-brand-gold"
                    />

                    {customQuoteStatus === 'success' ? (
                      <div className="p-3 bg-green-50 text-green-700 text-xs font-semibold rounded flex items-center gap-2 border border-green-200">
                        <Check className="w-4 h-4 shrink-0" />
                        Quotation compiled successfully! Sending to WhatsApp...
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setShowQuoteForm(false)}
                          className="px-3 py-2 border border-stone-300 hover:bg-stone-100 rounded text-[11px] font-mono text-gray-500 cursor-pointer"
                        >
                          CANCEL
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2 bg-brand-charcoal hover:bg-brand-gold text-brand-ivory text-xs font-mono uppercase tracking-wider rounded cursor-pointer transition-colors"
                        >
                          SUBMIT MEASUREMENTS
                        </button>
                      </div>
                    )}
                  </form>
                </motion.div>
              )}
            </div>

          </div>

        </div>

        {/* Warning caution under wood seasonally seasoned */}
        <div className="mt-16 bg-red-50 text-red-700 text-xs p-4 rounded border border-red-200 flex gap-2 items-start text-left">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Jaipur seasonal timber expands & contracts:</strong> Local high humidity during monsoons followed by sand scorched 44°C summers can warp cheap pre-laminated modular boards. A Square Solution seasons raw teak timbers for over 18 weeks inside dedicated convection bays, completely guaranteeing structural immunity against splitting.
          </p>
        </div>

      </div>
    </div>
  );
}
