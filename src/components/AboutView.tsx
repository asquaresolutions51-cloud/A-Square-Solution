import { motion } from 'motion/react';
import { Award, Compass, ShieldCheck, Heart, Sparkles, PhoneCall } from 'lucide-react';
import { OFFICE_CONTACT_INFO } from '../data';

interface AboutViewProps {
  onNavigate: (id: string) => void;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  const values = [
    {
      icon: Compass,
      title: 'Heritage Directional Cohesion',
      desc: 'We match modern carpet layouts with Rajasthani proportional grids and Vastu placements, ensuring balanced light and positive draft flows.',
    },
    {
      icon: ShieldCheck,
      title: 'In-House Material Honesty',
      desc: 'No sub-contractors or outsourced carpentry. Every cabinet, table pane, and fabric stitch is executed in our state-of-the-art Jaipur facilities.',
    },
    {
      icon: Heart,
      title: 'Empathetic Client Handholding',
      desc: 'We limit our active pipeline to 5 concurrent luxury villas, dedicating ourselves to hourly updates, 3D consensus, and physical swatch reviews.',
    },
    {
      icon: Award,
      title: 'Craftsman Guild Alliance',
      desc: 'Direct employment of heritage stone sculptors and premium teakwood polishers, transferring generations of art directly to your living media.',
    },
  ];

  const founders = [
    {
      name: 'Ayush Awasthi',
      role: 'Principal Architectural Designer & Founder',
      desc: 'With over 12 years of luxury residential execution under his belt, Ayush fuses Rajasthani temple geometry with sleek European functional architecture.',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Piyush Awasthi',
      role: 'Lead Project Executions Head & Co-Founder',
      desc: 'Piyush monitors the day-to-day carpentry, civil layout modification alignment, and ensures timeline delivery within our Mansarovar facility.',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="py-12 bg-brand-ivory" id="about-studio-page">
      {/* Intro Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold font-mono tracking-widest text-xs uppercase block mb-2">
              ESTD. 2014 • JAIPUR
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-brand-charcoal leading-tight mb-6">
              Refining Spaces. <br />
              <span className="text-brand-pink italic">Honoring Heritage.</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At <strong className="text-brand-charcoal">A Square Solution</strong>, we believe that your home should not look like an off-the-shelf catalog. True architectural luxury is found in custom visual dialogues, local material tactile confidence, and custom tailored utility.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              Founded in Mansarovar, Jaipur, we have transformed over 180 bare carpet spaces into high-end residences, premium offices, and curated retail fronts. By maintaining our own high-tech workshop facilities, we remove standard vendor margins, delivering direct premium quality with itemized, absolute pricing transparency.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 bg-brand-charcoal hover:bg-brand-gold text-brand-ivory font-medium transition-colors flex items-center gap-2 text-sm rounded shadow-sm hover:shadow-md cursor-pointer"
                id="about-cta-consult"
              >
                <PhoneCall className="w-4 h-4" />
                Book Consultation
              </button>
              <button
                onClick={() => onNavigate('portfolio')}
                className="px-6 py-3 border border-brand-charcoal hover:border-brand-gold text-brand-charcoal hover:text-brand-gold text-sm font-medium transition-colors rounded cursor-pointer"
                id="about-cta-portfolio"
              >
                Explore Selected Works
              </button>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-[4/5] object-cover bg-rose-50 rounded-lg overflow-hidden relative shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                alt="A Square Solution Workshop"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 via-transparent to-transparent" />
            </div>

            {/* Embedded Stat Card */}
            <div className="absolute -bottom-6 -left-6 bg-brand-terracotta text-brand-ivory p-6 rounded shadow-lg max-w-xs border border-brand-pink/20">
              <span className="text-3xl font-serif font-black block text-white">180+</span>
              <span className="text-xs font-mono tracking-wider uppercase opacity-90 block mt-1">
                Luxury Spaces Executed in Rajasthan
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Core Pillars / Values Section with subtle sandstone decor */}
      <div className="bg-gradient-to-b from-stone-100 to-brand-ivory py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-pink font-mono tracking-widest text-xs uppercase block mb-2">
              WHY ARCHITECTS WORK WITH US
            </span>
            <h2 className="text-3xl font-serif font-semibold text-brand-charcoal">
              Our Structural & Ethical Commitments
            </h2>
            <div className="h-1 w-20 bg-brand-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="bg-brand-ivory p-8 rounded border border-stone-200 h-full hover:border-brand-gold transition-all hover:-translate-y-1 shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                id={`value-pillar-${i}`}
              >
                <div className="w-12 h-12 bg-brand-pink/10 text-brand-terracotta flex items-center justify-center rounded mb-6">
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-brand-charcoal mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Meet the Visionaries */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-gold font-mono tracking-widest text-xs uppercase block mb-2">
            THE MINDS AT A SQUARE SOLUTION
          </span>
          <h2 className="text-3xl font-serif font-semibold text-brand-charcoal">
            The Founders & Lead Architects
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Active workspace designers guiding conceptualizations into physical keys.
          </p>
          <div className="h-1 w-20 bg-brand-pink mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              className="bg-white rounded-lg overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              id={`founder-card-${i}`}
            >
              <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                <img
                  src={f.img}
                  alt={f.name}
                  className="w-full h-full object-cover grayscale brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-brand-gold/90 text-brand-ivory text-xs font-mono uppercase tracking-widest px-3 py-1 rounded">
                  FOUNDING MEMBER
                </div>
              </div>
              <div className="p-8">
                <span className="text-brand-terracotta text-xs font-mono uppercase tracking-wider block mb-1">
                  {f.role}
                </span>
                <h3 className="text-xl font-serif font-bold text-brand-charcoal mb-4">
                  {f.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Craftsmanship Local Workshop Banner */}
      <div className="bg-brand-charcoal text-brand-ivory py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C97B72_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-8 h-8 text-brand-pink mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">
              Visiting Jaipur? Walk Into Our Workshop.
            </h3>
            <p className="text-stone-300 leading-relaxed text-sm md:text-base mb-8">
              Want to touch our seasoned solid teak beams, feel the heavy grain of marine plywood, or inspect fine brass inlays being polished? We have a persistent open-door workshop policy next to our studio.
            </p>
            <div className="inline-block p-4 bg-brand-terracotta/20 border border-brand-pink/30 rounded text-left">
              <span className="text-brand-gold font-bold text-xs uppercase font-mono tracking-widest block mb-1">
                STUDIO PHYSICAL LOCATION
              </span>
              <p className="text-xs text-stone-200">
                {OFFICE_CONTACT_INFO.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
