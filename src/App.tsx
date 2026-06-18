"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Compass, 
  Hammer, 
  ChefHat, 
  Armchair, 
  ChevronRight, 
  Menu, 
  X, 
  Send, 
  Check, 
  MessageSquare,
  Sparkles,
  Award,
  ChevronLeft,
  ArrowRight,
  Map,
  FileSpreadsheet,
  Home,
  Briefcase
} from 'lucide-react';

// Import datasets
import { 
  NAV_ITEMS, 
  TRUST_BAR_ITEMS, 
  JAIPURI_AESTHETICS, 
  SERVICES_CATALOG, 
  PORTFOLIO_PROJECTS, 
  BLOG_POSTS, 
  OFFICE_CONTACT_INFO 
} from './data';

// Import sub-views
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import PortfolioView from './components/PortfolioView';
import ProcessView from './components/ProcessView';
import PricingView from './components/PricingView';
import StyleQuizView from './components/StyleQuizView';
import VastuPlanning from './components/VastuPlanning';
import CustomFurnitureCustomizer from './components/CustomFurnitureCustomizer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactArea, setContactArea] = useState('');
  const [contactBudget, setContactBudget] = useState('6-12L');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState<string>('');

  // Exit intent popup state
  const [showExitPopup, setShowExitPopup] = useState<boolean>(false);
  const [popupEmail, setPopupEmail] = useState<string>('');
  const [popupSubmitted, setPopupSubmitted] = useState<boolean>(false);

  // Carousel testimonial reviews indices
  const [testimonialIdx, setTestimonialIdx] = useState<number>(0);

  const testimonials = [
    {
      name: 'Dr. Ramesh Meena',
      location: 'C-Scheme, Jaipur',
      project: 'Heritage 4BHK Villa',
      quote: '"A Square Solution changed our perception of interior designers. Everything from the wooden Jali ceiling down to the quartz modular pantry was itemized beforehand. There was zero variance in the final bill."',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Richa Sharma',
      location: 'Vaishali Nagar, Jaipur',
      project: 'Sleek Modular Kitchen',
      quote: '"We ordered a modular kitchen under their 10-year warranty pattern. During Jaipur monsoons, modular wood usually catches moisture, but our boiling-water-resistant timber cabinets are structurally pristine and highly reliable."',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Sunil Verma',
      location: 'Mansarovar, Jaipur',
      project: 'Boutique Clinic Setup',
      quote: '"We required an eye-friendly, acoustical workspace setup for outpatients. Amit & Siddharth planned directional zones matching Vastu earth axis. Patients often comment on the extremely calm atmosphere of our cabins."',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80'
    }
  ];

  // Simple exit-intent logic simulation
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves out of top viewport
      if (e.clientY < 30) {
        const dismissed = sessionStorage.getItem('dismissed_asquare_popup');
        if (!dismissed) {
          setShowExitPopup(true);
        }
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleDismissPopup = () => {
    setShowExitPopup(false);
    sessionStorage.setItem('dismissed_asquare_popup', 'true');
  };

  const handlePopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!popupEmail) return;

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: popupEmail,
          source: 'Exit Intent Popup Newsletter'
        })
      });
    } catch (err) {
      console.error('Failed to submit popup email', err);
    }

    setPopupSubmitted(true);
    setTimeout(() => {
      handleDismissPopup();
    }, 3000);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) {
      alert('Please fill out Name and Phone number to register your enquiry.');
      return;
    }

    setContactStatus('loading');

    const payload = {
      name: contactName,
      phone: contactPhone,
      email: contactEmail,
      area: contactArea,
      budget: contactBudget,
      message: contactMessage,
      source: 'Contact Form (Main)'
    };

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error('Error submitting form data to API', err);
    }

    // Save client lead inside localstorage
    const savedEnquiries = JSON.parse(localStorage.getItem('asquare_enquiries') || '[]');
    savedEnquiries.push({
      date: new Date().toISOString(),
      ...payload
    });
    localStorage.setItem('asquare_enquiries', JSON.stringify(savedEnquiries));

    setContactStatus('success');
    // Reset inputs
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setContactArea('');
    setContactMessage('');
  };

  const handleNavigate = (pageId: string, serviceId?: string) => {
    setCurrentPage(pageId);
    setSelectedServiceId(serviceId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextTestimonial = () => {
    setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-charcoal font-sans antialiased overflow-x-hidden relative flex flex-col justify-between">
      
      {/* Dynamic Top Announcement Bar */}
      <div className="bg-brand-charcoal text-brand-ivory py-2.5 px-4 text-center text-xs font-mono tracking-wider flex items-center justify-center gap-2 border-b border-stone-800">
        <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-bounce" />
        <span>LIMITED SLOTS: Crafting only 5 concurrent luxury villas in Jaipur. Book your consultation today.</span>
      </div>

      {/* Sticky Header Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/50 backdrop-blur-sm border-b border-brand-beige h-20 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="flex items-center justify-between">
            
            {/* Logo/Identity */}
            <div 
              onClick={() => handleNavigate('home')} 
              className="flex items-center cursor-pointer select-none"
            >
              <img 
                src="/Asquaresolutionlogo.svg" 
                alt="A Square Solution Logo" 
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[10px] xl:text-[11px] font-semibold uppercase tracking-widest">
              <button
                onClick={() => handleNavigate('home')}
                className={`py-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  currentPage === 'home' 
                    ? 'text-brand-pink border-b border-brand-pink' 
                    : 'text-brand-charcoal/80 hover:text-brand-pink'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavigate('about')}
                className={`py-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  currentPage === 'about' 
                    ? 'text-brand-pink border-b border-brand-pink' 
                    : 'text-brand-charcoal/80 hover:text-brand-pink'
                }`}
              >
                About Studio
              </button>

              {/* Design Services Mega Menu */}
              <div className="relative group/mega py-5">
                <button className="flex items-center gap-1 py-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap text-brand-charcoal/80 hover:text-brand-pink">
                  <span>Design Services</span>
                  <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                </button>

                {/* Full Width Mega Menu Panel */}
                <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl bg-white/95 backdrop-blur-md shadow-2xl border border-brand-beige p-8 transition-all duration-300 opacity-0 invisible group-hover/mega:opacity-100 group-hover/mega:visible pointer-events-none group-hover/mega:pointer-events-auto z-50 grid grid-cols-12 gap-8 text-left rounded-none">
                  {/* Left Side: Highlighted Theme Card */}
                  <div className="col-span-4 bg-brand-charcoal text-brand-ivory p-6 border-l-4 border-brand-gold relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=400&q=80')" }} />
                    <div className="relative z-10">
                      <span className="text-[9px] font-mono text-brand-gold tracking-widest uppercase block mb-1">SIGNATURE STYLE</span>
                      <h4 className="font-serif font-black text-lg text-white mb-2 leading-tight">Jaipur Modern Heritage</h4>
                      <p className="text-[11px] text-stone-300 leading-relaxed font-light">
                        Integrating classical Rajasthani spatial geometry, sandstone textures, and Jali partitions into clean contemporary layouts.
                      </p>
                    </div>
                    <button 
                      onClick={() => handleNavigate('portfolio')}
                      className="relative z-10 text-[10px] font-mono font-bold text-brand-gold hover:text-brand-pink transition-colors uppercase tracking-wider text-left mt-6 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Case Studies</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Right Side: Grid of 6 Services */}
                  <div className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-6">
                    {SERVICES_CATALOG.map((service) => {
                      let IconComponent = Hammer;
                      if (service.icon === 'ChefHat') IconComponent = ChefHat;
                      else if (service.icon === 'Armchair') IconComponent = Armchair;
                      else if (service.icon === 'Home') IconComponent = Home;
                      else if (service.icon === 'Briefcase') IconComponent = Briefcase;
                      else if (service.icon === 'Compass') IconComponent = Compass;

                      return (
                        <div 
                          key={service.id}
                          onClick={() => handleNavigate('services', service.id)}
                          className="flex items-start gap-4 cursor-pointer group/item hover:translate-x-0.5 transition-transform"
                        >
                          <div className="w-10 h-10 bg-brand-ivory text-brand-terracotta flex items-center justify-center shrink-0 border border-brand-beige group-hover/item:bg-brand-pink/10 group-hover/item:text-brand-pink transition-colors">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-serif font-black text-sm text-brand-charcoal group-hover/item:text-brand-terracotta transition-colors leading-tight mb-1">
                              {service.title}
                            </h5>
                            <p className="text-[11px] text-gray-500 font-light leading-snug">
                              {service.description.substring(0, 70)}...
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Interactive Tools Dropdown */}
              <div className="relative group/tools py-5">
                <button className="flex items-center gap-1 py-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap text-brand-charcoal/80 hover:text-brand-pink">
                  <span>Interactive Tools</span>
                  <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                </button>

                {/* Floating Dropdown Card */}
                <div className="absolute top-[60px] left-0 w-72 bg-white/95 backdrop-blur-md shadow-2xl border border-brand-beige p-5 transition-all duration-300 opacity-0 invisible group-hover/tools:opacity-100 group-hover/tools:visible pointer-events-none group-hover/tools:pointer-events-auto z-50 flex flex-col gap-4 text-left">
                  <div 
                    onClick={() => handleNavigate('quiz')}
                    className="flex items-start gap-3.5 cursor-pointer group/tool hover:translate-x-0.5 transition-transform"
                  >
                    <div className="w-8 h-8 bg-brand-pink/10 text-brand-pink flex items-center justify-center shrink-0 border border-brand-pink/15">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-sans font-bold text-xs text-brand-charcoal group-hover/tool:text-brand-pink transition-colors uppercase tracking-wider mb-0.5">
                        Design Style Quiz
                      </h5>
                      <p className="text-[10px] text-gray-500 leading-normal font-light">
                        Find your heritage blueprint & budget projections in 90s.
                      </p>
                    </div>
                  </div>

                  <div 
                    onClick={() => handleNavigate('vastu')}
                    className="flex items-start gap-3.5 cursor-pointer group/tool hover:translate-x-0.5 transition-transform"
                  >
                    <div className="w-8 h-8 bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/15">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-sans font-bold text-xs text-brand-charcoal group-hover/tool:text-brand-gold transition-colors uppercase tracking-wider mb-0.5">
                        Vastu Floorplan
                      </h5>
                      <p className="text-[10px] text-gray-500 leading-normal font-light">
                        Interactive compass zones and layout alignment guidelines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleNavigate('portfolio')}
                className={`py-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  currentPage === 'portfolio' 
                    ? 'text-brand-pink border-b border-brand-pink' 
                    : 'text-brand-charcoal/80 hover:text-brand-pink'
                }`}
              >
                Portfolio
              </button>

              <button
                onClick={() => handleNavigate('process')}
                className={`py-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  currentPage === 'process' 
                    ? 'text-brand-pink border-b border-brand-pink' 
                    : 'text-brand-charcoal/80 hover:text-brand-pink'
                }`}
              >
                Process
              </button>

              <button
                onClick={() => handleNavigate('pricing')}
                className={`py-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  currentPage === 'pricing' 
                    ? 'text-brand-pink border-b border-brand-pink' 
                    : 'text-brand-charcoal/80 hover:text-brand-pink'
                }`}
              >
                Pricing
              </button>

              <button
                onClick={() => handleNavigate('blog')}
                className={`py-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  currentPage === 'blog' 
                    ? 'text-brand-pink border-b border-brand-pink' 
                    : 'text-brand-charcoal/80 hover:text-brand-pink'
                }`}
              >
                Guides & Blog
              </button>
            </nav>

            {/* Action Consult Button desktop */}
            <div className="hidden lg:block">
              <button
                onClick={() => handleNavigate('contact')}
                className="px-5 py-2.5 bg-brand-charcoal text-white hover:bg-brand-pink text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 rounded-none shadow-sm cursor-pointer whitespace-nowrap"
                id="header-action-button"
              >
                Book consultation
              </button>
            </div>

            {/* Mobile hamburger menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-brand-charcoal hover:text-brand-pink transition-colors cursor-pointer"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu Slide Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-stone-200 shadow-xl overflow-hidden absolute top-28 left-0 right-0 z-30"
          >
            <div className="px-4 py-6 space-y-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full block text-left p-3 rounded font-mono text-xs tracking-wider transition-colors cursor-pointer ${
                    currentPage === item.id 
                      ? 'bg-brand-pink/15 text-brand-terracotta font-bold' 
                      : 'text-brand-charcoal hover:bg-brand-ivory/80'
                  }`}
                >
                  {item.label.toUpperCase()}
                </button>
              ))}
              <div className="pt-4 border-t border-stone-100">
                <button
                  onClick={() => handleNavigate('contact')}
                  className="w-full py-3 bg-brand-charcoal text-brand-ivory font-mono text-center text-xs uppercase tracking-widest rounded"
                >
                  BOOK FREE CONSULTATION
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Area Switching router container */}
      <main className="flex-grow">
        
        {/* VIEW: HOME VIEW */}
        {currentPage === 'home' && (
          <div id="home-view-landing">
            
            {/* HER0 SECTION */}
            <section className="relative bg-brand-ivory border-b border-brand-beige overflow-hidden py-16 md:py-24" id="home-hero-header">
              {/* Artistic Grid Decorative Accents */}
              <div className="absolute top-12 left-12 w-24 h-24 border border-brand-gold opacity-20 rotate-12 pointer-events-none hidden md:block"></div>
              <div className="absolute top-1/2 right-12 w-32 h-32 border border-brand-pink opacity-10 -rotate-45 pointer-events-none hidden md:block"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Hero copywriting */}
                  <div className="lg:col-span-6 text-left relative">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-brand-gold" />
                          <div className="w-1.5 h-1.5 bg-brand-pink" />
                        </div>
                        <span className="text-brand-gold font-mono tracking-[0.2em] text-[10px] uppercase block font-bold">
                          A SQUARE SOLUTION • JAIPUR ARTISANS
                        </span>
                      </div>

                      <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-black text-brand-charcoal leading-[0.95] tracking-tight mb-6 italic">
                        Bespoke <br />
                        Interiors <br />
                        <span className="text-brand-gold not-italic font-sans font-black block my-2 uppercase tracking-[0.1em] text-4xl sm:text-5xl">Rooted</span> In <br />
                        <span className="text-brand-pink not-italic">Heritage.</span>
                      </h1>

                      <div className="flex items-center gap-3 my-6">
                        <div className="w-12 h-px bg-brand-gold" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-brand-terracotta">ESTD. 2014 • JAIPUR</span>
                      </div>

                      <p className="text-gray-700 font-sans text-sm md:text-base leading-relaxed mb-8 max-w-lg font-light">
                        Turnkey interiors, custom seasoned furniture, Vastu-aligned direction planning, and direct in-house workshop execution for modern living.
                      </p>

                      <div className="flex flex-wrap gap-4">
                        <button
                          onClick={() => handleNavigate('quiz')}
                          className="px-6 py-3.5 bg-brand-terracotta hover:bg-brand-charcoal text-brand-ivory text-[10px] font-mono tracking-widest font-black uppercase rounded-none shadow transition-all duration-300 cursor-pointer"
                        >
                          Launch Vibe Quiz
                        </button>
                        <button
                          onClick={() => handleNavigate('portfolio')}
                          className="px-6 py-3.5 border-2 border-brand-charcoal hover:border-brand-gold hover:text-brand-gold text-brand-charcoal text-[10px] font-mono tracking-widest font-black uppercase rounded-none transition-all duration-300 cursor-pointer"
                        >
                          View Case Studies
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Hero Cinematic Image Frame */}
                  <div className="lg:col-span-6 relative">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="aspect-[4/3] rounded-none overflow-hidden shadow-2xl relative border-4 border-brand-gold bg-slate-100"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80"
                        alt="Jaipur Heritage Fusion Living room designed by A Square Solution"
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/30 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Floating overlay chip details */}
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-none shadow-lg max-w-xs border border-brand-beige">
                        <span className="text-[9px] font-mono text-brand-gold font-bold block uppercase tracking-wider">
                          STUDIO SIGNATURE MASTERROOM
                        </span>
                        <h4 className="text-xs font-serif font-bold text-brand-charcoal mt-1">
                          "Ochre Lime-plaster living room with modern Jali screen accents."
                        </h4>
                      </div>
                    </motion.div>
                  </div>

                </div>
              </div>
            </section>

            {/* TRUST BAR TIMELINE STATS */}
            <section className="bg-white border-b border-brand-beige py-10" id="trustbar-stats">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {TRUST_BAR_ITEMS.map((stat, idx) => (
                    <div 
                      key={idx} 
                      className="text-left border-l-2 border-brand-gold pl-4 py-2 hover:border-brand-pink transition-colors duration-300"
                    >
                      <h4 className="text-xs font-mono font-black text-brand-terracotta uppercase">
                        {stat.text}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-sans mt-1 leading-snug font-light">
                        {stat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* JAIPURI DESIGN AESTHETICS HIGHLIGHT */}
            <section className="py-20 bg-brand-ivory border-b border-brand-beige" id="jaipur-aesthetic-fusion">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-brand-pink font-mono tracking-widest text-xs uppercase block mb-1">
                    CULTURAL RESONANCE
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-charcoal">
                    {JAIPURI_AESTHETICS.title}
                  </h2>
                  <div className="flex gap-1 justify-center my-4">
                    <div className="w-1.5 h-1.5 bg-brand-gold" />
                    <div className="w-1.5 h-1.5 bg-brand-pink mt-1" />
                    <div className="w-1.5 h-1.5 bg-brand-gold" />
                  </div>
                  <p className="text-sm text-gray-700 font-light mt-3 leading-relaxed">
                    {JAIPURI_AESTHETICS.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {JAIPURI_AESTHETICS.elements.map((elem, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white rounded-none overflow-hidden border border-brand-beige shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative border-b border-brand-beige">
                        <img 
                          src={elem.image} 
                          alt={elem.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-6 text-left relative">
                        {/* Decorative background visual tag */}
                        <span className="absolute top-4 right-4 text-xs font-mono text-brand-gold/40">0{idx + 1}</span>
                        <h3 className="text-lg font-serif font-black text-brand-charcoal mb-2">
                          {elem.title}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed font-light">
                          {elem.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* INTERACTIVE CUSTOM FURNITURE TEASER */}
            <div className="border-b border-brand-beige">
              <CustomFurnitureCustomizer />
            </div>

            {/* HIGH-FIDELITY TESTIMONIALS CAROUSEL */}
            <section className="py-20 bg-gradient-to-b from-stone-50 to-brand-ivory border-b border-brand-beige" id="testimonials-reviews">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
                <span className="text-brand-gold font-mono tracking-widest text-xs uppercase block mb-1">
                  VERIFIED CLIENT FEEDBACK
                </span>
                <h2 className="text-3xl font-serif font-black text-brand-charcoal mb-12">
                  What Homeowners Say About A Square
                </h2>

                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-none shadow-xl border-4 border-brand-gold relative">
                  
                  {/* Quotes marks */}
                  <span className="absolute top-4 left-6 text-7xl font-serif text-brand-pink/15 pointer-events-none select-none">“</span>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={testimonialIdx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="text-center"
                    >
                      <p className="text-sm md:text-base text-brand-charcoal leading-relaxed italic mb-8 relative z-10 font-light">
                        {testimonials[testimonialIdx].quote}
                      </p>

                      <div className="flex items-center justify-center gap-4 text-left">
                        <img 
                          src={testimonials[testimonialIdx].avatar} 
                          alt={testimonials[testimonialIdx].name}
                          className="w-12 h-12 rounded-none border border-brand-beige"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xs font-mono font-bold text-brand-charcoal uppercase block">
                            {testimonials[testimonialIdx].name}
                          </h4>
                          <span className="text-[10px] text-gray-500 font-sans block">
                            {testimonials[testimonialIdx].project} — {testimonials[testimonialIdx].location}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Manual Arrow navigation */}
                  <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-brand-beige">
                    <button 
                      onClick={prevTestimonial}
                      className="p-2 px-4 border border-brand-charcoal rounded-none hover:bg-brand-gold hover:text-brand-charcoal text-brand-charcoal transition-colors cursor-pointer"
                      title="Previous review"
                    >
                      <ChevronLeft className="w-4 h-4 focus:outline-none" />
                    </button>
                    <button 
                      onClick={nextTestimonial}
                      className="p-2 px-4 border border-brand-charcoal rounded-none hover:bg-brand-gold hover:text-brand-charcoal text-brand-charcoal transition-colors cursor-pointer"
                      title="Next review"
                    >
                      <ChevronRight className="w-4 h-4 focus:outline-none" />
                    </button>
                  </div>

                </div>
              </div>
            </section>

            {/* CALL TO ACTION LEAD DRAWER SECTION */}
            <section className="bg-brand-charcoal text-brand-ivory py-20 text-center relative overflow-hidden border-t-2 border-brand-gold" id="cta-contact-block">
              {/* Background architectural geometric patterns */}
              <div className="absolute top-10 left-10 w-20 h-20 border border-white/5 opacity-10 rotate-12 pointer-events-none"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 border border-white/5 opacity-5 -rotate-12 pointer-events-none"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <div className="max-w-2xl mx-auto">
                  <span className="text-brand-pink font-mono tracking-[0.3em] text-[10px] uppercase font-bold block mb-4">
                    RESERVE YOUR SLOT NOW
                  </span>
                  
                  <h3 className="text-4xl sm:text-5xl font-serif text-white mb-6 italic leading-tight">
                    Ready to build your <br/>
                    <span className="text-brand-gold not-italic font-sans font-black">dream heritage</span> space?
                  </h3>

                  <div className="flex gap-1 justify-center my-6">
                    <div className="w-1.5 h-1.5 bg-brand-gold" />
                    <div className="w-1.5 h-1.5 bg-brand-pink" />
                    <div className="w-1.5 h-1.5 bg-brand-gold" />
                  </div>

                  <p className="text-sm text-stone-300 leading-relaxed mb-10 font-light max-w-lg mx-auto">
                    Contact Siddharth and Amit Verma directly to book a site measurement in Vaishali Nagar, Mansarovar, C-Scheme, or Malviya Nagar. We'll lock down static pricing estimates free of cost.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-6">
                    <button
                      onClick={() => handleNavigate('contact')}
                      className="px-8 py-4 bg-brand-pink text-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-[10px] font-mono tracking-[0.2em] font-black uppercase rounded-none transition-all duration-300 cursor-pointer shadow-lg"
                    >
                      Book Free Consultation
                    </button>
                    <a
                      href={`https://wa.me/918529664281`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-mono tracking-[0.2em] font-black uppercase rounded-none transition-all duration-300 flex items-center gap-2 shadow-lg"
                    >
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* VIEW: ABOUT STUDIO PAGE */}
        {currentPage === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {/* VIEW: SERVICES DETAILED CATALOG */}
        {currentPage === 'services' && (
          <ServicesView onNavigate={handleNavigate} selectedServiceId={selectedServiceId} />
        )}

        {/* VIEW: PORTFOLIO SHOWCASE */}
        {currentPage === 'portfolio' && (
          <PortfolioView onNavigate={handleNavigate} />
        )}

        {/* VIEW: 6-STEP PROCESS */}
        {currentPage === 'process' && (
          <ProcessView onNavigate={handleNavigate} />
        )}

        {/* VIEW: PACKAGES & TIMELINES */}
        {currentPage === 'pricing' && (
          <PricingView onNavigate={handleNavigate} />
        )}

        {/* VIEW: DESIGN VIBE STYLE QUIZ */}
        {currentPage === 'quiz' && (
          <StyleQuizView onNavigate={handleNavigate} />
        )}

        {/* VIEW: INTERACTIVE VASTU FLOORPLAN SCHEMES */}
        {currentPage === 'vastu' && (
          <VastuPlanning />
        )}

        {/* VIEW: GUIDES AND BLOG ENTRIES */}
        {currentPage === 'blog' && (
          <div className="py-12 bg-brand-ivory" id="blog-guides-page">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-brand-pink font-mono tracking-widest text-xs uppercase block mb-1">
                  KNOWLEDGE BASE
                </span>
                <h1 className="text-3xl md:text-4xl font-serif font-semibold text-brand-charcoal">
                  Our Interior Design Guides
                </h1>
                <p className="text-xs text-gray-500 mt-2">
                  Hand-written articles helping you understand material grades, modular design flaws, and classical Rajasthani spatial configurations.
                </p>
                <div className="h-1 w-20 bg-brand-gold mx-auto mt-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BLOG_POSTS.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1 flex flex-col justify-between">
                    <div>
                      <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-3 left-3 bg-brand-charcoal hover:bg-brand-gold text-brand-ivory text-[10px] font-mono tracking-wider px-2 py-1 rounded">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-6 text-left">
                        <span className="text-[10px] font-mono text-gray-400 block mb-1">
                          {post.date} • {post.readTime}
                        </span>
                        <h3 className="font-serif font-black text-brand-charcoal text-base mb-3 leading-snug hover:text-brand-pink transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-stone-100">
                      <button 
                        onClick={() => handleNavigate('contact')}
                        className="text-xs text-brand-terracotta hover:text-brand-gold font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-pointer mt-4"
                      >
                        <span>Download Complete Guide</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* VIEW: DIRECT ENQUIRY AND CONTACT PANEL */}
        {currentPage === 'contact' && (
          <div className="py-12 bg-brand-ivory" id="contact-enquiries-page">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-brand-pink font-mono tracking-widest text-xs uppercase block mb-1">
                  DIRECT CHANNELS
                </span>
                <h1 className="text-3xl md:text-4xl font-serif font-black text-brand-charcoal">
                  Book Free Design Consultation
                </h1>
                <p className="text-xs text-gray-500 mt-2">
                  Drop us an entry. Tell us about your carpet scale, preferred timelines, and budget limit. amit & Siddharth Verma will call back within 12 hours.
                </p>
                <div className="h-1 w-20 bg-brand-gold mx-auto mt-4" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-central-grid">
                
                {/* Contact coordinates details (Left) */}
                <div className="lg:col-span-4 space-y-6 text-left">
                  <div className="bg-white p-6 rounded-lg border border-stone-200">
                    <span className="text-[10px] font-mono text-brand-pink block mb-3 uppercase font-bold">
                      STUDIO OFFICE CHANNELS
                    </span>

                    <div className="space-y-4">
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-mono tracking-wider font-bold text-brand-charcoal uppercase">
                            STUDIO ADDRESS
                          </h4>
                          <p className="text-xs text-gray-600 leading-relaxed mt-1">
                            {OFFICE_CONTACT_INFO.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-brand-terracotta shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-mono tracking-wider font-bold text-brand-charcoal uppercase">
                            MOBILE WHATSAPP CALLS
                          </h4>
                          <div className="space-y-1 mt-1 text-xs text-gray-600 font-mono">
                            {OFFICE_CONTACT_INFO.phoneNumbers.map((num) => (
                              <a key={num} href={`tel:${num}`} className="block hover:text-brand-pink">
                                +91-{num}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-mono tracking-wider font-bold text-brand-charcoal uppercase">
                            EMAIL DISPATCH
                          </h4>
                          <a href={`mailto:${OFFICE_CONTACT_INFO.email}`} className="text-xs font-mono text-gray-600 hover:text-brand-pink block mt-1">
                            {OFFICE_CONTACT_INFO.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-mono tracking-wider font-bold text-brand-charcoal uppercase">
                            BUSINESS TIMINGS
                          </h4>
                          <p className="text-xs text-gray-600 leading-relaxed mt-1">
                            {OFFICE_CONTACT_INFO.hours}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Micro list saved leads local validation for users */}
                  <div className="bg-stone-50 p-6 rounded-lg text-xs leading-relaxed border border-stone-200 text-gray-500">
                    <span className="text-brand-charcoal font-bold block mb-1">Jaipur Heritage Coverage:</span>
                    We actively deploy carpenters, site leads and material deliveries across C-Scheme, Vaishali Nagar, Mansarovar, Malviya Nagar, Raja Park, and surrounding premium segments.
                  </div>
                </div>

                {/* Secure Forms Box (Center) */}
                <div className="lg:col-span-8">
                  <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-xl text-left">
                    <span className="text-[10px] font-mono text-brand-pink block mb-2 uppercase font-bold">
                      SECURE ENTRY ENQUIRY ENGINE
                    </span>
                    <h3 className="text-2xl font-serif font-black text-brand-charcoal mb-6">
                      Tell Us About Your Raw Space
                    </h3>

                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-mono text-gray-400 block mb-1">
                            YOUR NAME *
                          </label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Priyan Sharma"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="p-3 w-full bg-brand-ivory/40 rounded border border-stone-300 text-xs text-brand-charcoal outline-none focus:border-brand-gold"
                            id="contact-form-name"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-gray-400 block mb-1">
                            TELEPHONE / MOBILE *
                          </label>
                          <input 
                            type="tel" 
                            required
                            placeholder="e.g. 8824387494"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            className="p-3 w-full bg-brand-ivory/40 rounded border border-stone-300 text-xs text-brand-charcoal outline-none focus:border-brand-gold"
                            id="contact-form-phone"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-mono text-gray-400 block mb-1">
                            EMAIL ADDRESS
                          </label>
                          <input 
                            type="email" 
                            placeholder="e.g. priyan.sharma@gmail.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="p-3 w-full bg-brand-ivory/40 rounded border border-stone-300 text-xs text-brand-charcoal outline-none focus:border-brand-gold"
                            id="contact-form-email"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-gray-400 block mb-1">
                            TOTAL SPACE CLOUD SCALE (SqFt)
                          </label>
                          <input 
                            type="number" 
                            placeholder="e.g. 2400"
                            value={contactArea}
                            onChange={(e) => setContactArea(e.target.value)}
                            className="p-3 w-full bg-brand-ivory/40 rounded border border-stone-300 text-xs text-brand-charcoal outline-none focus:border-brand-gold"
                            id="contact-form-area"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-gray-400 block mb-1">
                          EXPECTED BUDGET BRACKET
                        </label>
                        <select
                          value={contactBudget}
                          onChange={(e) => setContactBudget(e.target.value)}
                          className="p-3 w-full bg-brand-ivory/40 rounded border border-stone-300 text-xs text-brand-charcoal outline-none focus:border-brand-gold"
                          id="contact-form-budget"
                        >
                          <option value="Under 3L">Under ₹3 Lakhs (Bespoke furniture/modifications)</option>
                          <option value="3-6L">₹3 to ₹6 Lakhs (Essentials modular apartment)</option>
                          <option value="6-12L">₹6 to ₹12 Lakhs (Complete premium home setup)</option>
                          <option value="12L+">₹12 Lakhs+ (Luxury custom villa / bungalow)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-gray-400 block mb-1">
                          EXPLAIN DESIRED REQUIREMENTS IN DETAILS
                        </label>
                        <textarea
                          placeholder="Tell us about room placements, Vastu concerns or Modular Kitchen styles required."
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          rows={4}
                          className="p-3 w-full bg-brand-ivory/40 rounded border border-stone-300 text-xs text-brand-charcoal outline-none focus:border-brand-gold"
                          id="contact-form-message"
                        />
                      </div>

                      <div className="pt-4">
                        {contactStatus === 'loading' ? (
                          <div className="flex items-center justify-center p-3 text-brand-charcoal bg-stone-100 text-xs font-mono gap-2 rounded">
                            <span className="w-4 h-4 border-2 border-brand-pink border-t-transparent rounded-full animate-spin" />
                            SECURE DISPATCH IN PROGRESS...
                          </div>
                        ) : contactStatus === 'success' ? (
                          <div className="p-3 text-green-800 bg-green-50 border border-green-200 text-xs font-mono font-semibold rounded flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-600 font-bold" />
                            Success! Your details are stored safely.amit Verma will call back.
                          </div>
                        ) : (
                          <button
                            type="submit"
                            className="px-6 py-3.5 bg-brand-terracotta hover:bg-brand-gold text-white font-mono text-xs uppercase tracking-widest rounded transition-colors w-full flex items-center justify-center gap-2 cursor-pointer shadow-md"
                            id="contact-form-send"
                          >
                            <Send className="w-4 h-4" />
                            <span>Confirm Design Consultation Slot</span>
                          </button>
                        )}
                      </div>

                    </form>
                  </div>
                </div>

              </div>

              {/* Embedded Google Map Locator Section */}
              <div className="mt-16 bg-white p-4 rounded-xl border border-stone-200 shadow-lg">
                <span className="text-[10px] font-mono text-gray-400 block text-left mb-3 uppercase font-bold flex items-center gap-1.5">
                  <Map className="w-4 h-4 text-brand-gold" />
                  PHYSICAL STUDIO GOOGLE MAP COORDINATES LOCATOR
                </span>
                <div className="aspect-[21/9] w-full rounded overflow-hidden bg-stone-100 border border-stone-200">
                  <iframe 
                    src={OFFICE_CONTACT_INFO.mapCoordinatesEmbedUrl} 
                    title="A Square Solution Location Map, Mansarovar Jaipur"
                    className="w-full h-full border-0" 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* LUXURY COMPREHENSIVE FOOTER */}
      <footer className="bg-brand-charcoal text-brand-ivory pt-20 pb-12 border-t-2 border-brand-gold relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Identity column */}
            <div className="space-y-4">
              <div 
                onClick={() => handleNavigate('home')}
                className="flex items-center cursor-pointer mb-2"
              >
                <img 
                  src="/Asquaresolutionlogo.svg" 
                  alt="A Square Solution Logo" 
                  className="h-9 w-auto object-contain"
                  style={{ filter: 'invert(1)' }}
                />
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Handcrafting premium residential and boutique workspaces in Jaipur based on the traditional "Jaipur Modern Heritage" geometry pattern.
              </p>
              
              <div className="flex gap-1.5 pt-1">
                <div className="w-1.5 h-1.5 bg-brand-gold"></div>
                <div className="w-1.5 h-1.5 bg-brand-pink"></div>
                <div className="w-1.5 h-1.5 bg-brand-gold"></div>
              </div>

              <div className="text-xs font-mono block">
                <a href={`mailto:${OFFICE_CONTACT_INFO.email}`} className="text-stone-300 hover:text-brand-pink transition-colors">
                  {OFFICE_CONTACT_INFO.email}
                </a>
              </div>
            </div>

            {/* Sitemap Quick Links */}
            <div>
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-brand-gold mb-6 opacity-85">
                EXPLORE SITEMAP
              </h4>
              <ul className="text-xs space-y-2.5 text-stone-400">
                {NAV_ITEMS.slice(0, 5).map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => handleNavigate(item.id)} 
                      className="hover:text-brand-pink transition-colors cursor-pointer text-left text-[11px] font-mono uppercase tracking-wider"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specialty layouts */}
            <div>
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-brand-gold mb-6 opacity-85">
                SPECIALTY SEGMENTS
              </h4>
              <ul className="text-xs space-y-2.5 text-stone-400">
                {NAV_ITEMS.slice(5).map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => handleNavigate(item.id)} 
                      className="hover:text-brand-pink transition-colors cursor-pointer text-left text-[11px] font-mono uppercase tracking-wider"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Studio coordinates */}
            <div>
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-brand-gold mb-6 opacity-85">
                STUDIO HEADQUARTERS
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed mb-3">
                {OFFICE_CONTACT_INFO.address}
              </p>
              <div className="space-y-1 text-xs text-stone-300 font-mono">
                {OFFICE_CONTACT_INFO.phoneNumbers.slice(0, 2).map((num) => (
                  <a key={num} href={`tel:${num}`} className="block hover:text-brand-pink">
                    Ph: +91-{num}
                  </a>
                ))}
              </div>
            </div>

          </div>

          <div className="h-[1px] bg-stone-800 my-8" />

          {/* Real-time copyright status bar */}
          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-stone-500 font-mono tracking-wider gap-4">
            <div>
              © 2026 A Square Solution. All Rights Reserved. Created by Jaipur Design Guild.
            </div>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer" onClick={() => handleNavigate('contact')}>Terms & Milestones</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer" onClick={() => handleNavigate('vastu')}>Vastu Blueprint Corrections</span>
            </div>
          </div>

        </div>
      </footer>

      {/* PERSISTENT FLOATING WHATSAPP CTA WIDGET */}
      <div className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-3.5 shadow-2xl hover:scale-105 transition-transform flex items-center justify-center cursor-pointer">
        <a 
          href={`https://wa.me/918529664281?text=Hello%20A%20Square%20Solution,%20I'd%20like%20to%20book%20a%20site%20visit%20consultation.`}
          target="_blank" 
          rel="noopener noreferrer"
          title="Direct WhatsApp chat"
        >
          <MessageSquare className="w-7 h-7 font-black text-white" />
        </a>
      </div>

      {/* EXIT INTENT PROMO FORM BACKDROP */}
      <AnimatePresence>
        {showExitPopup && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-brand-ivory text-brand-charcoal max-w-md w-full p-8 rounded-xl relative border border-stone-200 shadow-2xl text-center"
              id="exit-intent-lead-popup"
            >
              <button 
                onClick={handleDismissPopup}
                className="absolute top-3 right-3 text-gray-400 hover:text-brand-charcoal p-1 cursor-pointer"
                title="Dismiss"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-4xl">🏛️</span>
              <span className="text-brand-pink font-mono text-[9px] tracking-widest font-black uppercase mt-4 block">
                SPECIAL EXIT INTENT COMPLIMENT
              </span>
              <h3 className="text-xl font-serif font-black text-brand-charcoal mt-1 mb-2">
                Download Jaipur Spatial Vastu Blueprint Guide PDF (Free)
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Enter your email address down below to download our exclusive premium handbook: <em>"Designing Heritage Villas inside modern C-Scheme apartments."</em>
              </p>

              {popupSubmitted ? (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-xs font-mono font-bold rounded flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 font-bold" />
                  Sent successfully! Check your inbox in 2 minutes.
                </div>
              ) : (
                <form onSubmit={handlePopupSubmit} className="space-y-3">
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your email address"
                    value={popupEmail}
                    onChange={(e) => setPopupEmail(e.target.value)}
                    className="p-3 w-full bg-white rounded border border-stone-300 text-xs text-brand-charcoal outline-none focus:border-brand-gold text-center"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-terracotta hover:bg-brand-charcoal text-white font-mono text-xs uppercase tracking-widest rounded transition-colors cursor-pointer"
                  >
                    Send PDF Blueprint
                  </button>
                </form>
              )}

              <button 
                onClick={handleDismissPopup}
                className="text-[10px] text-gray-400 font-mono tracking-wider block mx-auto mt-6 hover:text-brand-charcoal"
              >
                NO THANKS, I PREFER DECOR NOTIFICATION WARPING
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
