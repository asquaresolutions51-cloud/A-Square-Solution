// Data structure and content for A Square Solution (Jaipur Modern Heritage Interior Design)

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  materials: { name: string; desc: string }[];
  priceStart: string;
  faqs: { q: string; a: string }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  type: string;
  category: 'Living Room' | 'Bedroom' | 'Kitchen' | 'Villa' | 'Apartment' | 'Commercial' | 'Jaipuri Fusion' | 'Modern Minimal';
  location: string;
  clientBrief: string;
  challenge: string;
  concept: string;
  budgetRange: string;
  timeline: string;
  testimonial?: string;
  imageBefore: string;
  imageAfter: string; // Used for interactive transformation slider
  sketchImage: string;
  moodboardColors: string[];
  finalPhotos: string[];
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  description: string;
  suitability: string;
  featuresIncluded: string[];
  featuresExcluded: string[];
  timeline: string;
}

export interface SwatchOption {
  id: string;
  name: string;
  hex: string;
  textureName: string;
  textureDescription: string;
  imagePreview: string; // Live customizer image
}

export interface VastuZone {
  direction: 'North' | 'East' | 'South' | 'West' | 'North-East' | 'South-East' | 'South-West' | 'North-West';
  element: string;
  rulingPlanet: string;
  idealRooms: string[];
  tips: string[];
  colorTheme: string;
  hexColor: string;
}

export const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About Studio', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Process', id: 'process' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Design Quiz', id: 'quiz' },
  { label: 'Vastu Floorplan', id: 'vastu' },
  { label: 'Guides & Blog', id: 'blog' },
  { label: 'Contact', id: 'contact' },
];

export const TRUST_BAR_ITEMS = [
  { text: '100% In-House Execution', desc: 'Zero outsourcing, complete quality control.' },
  { text: 'Custom Furniture Studio', desc: 'Bespoke hand-crafted wood & metal joinery.' },
  { text: 'Vastu-Friendly Planning', desc: 'Syncing flow & layout with ancient science.' },
  { text: 'Transparent Pricing', desc: 'Itemized material billing. No hidden costs.' },
  { text: 'Photorealistic 3D Renders', desc: 'Visualize your heritage home before construction.' },
];

export const JAIPURI_AESTHETICS = {
  title: 'The Jaipur Modern Heritage Aesthetic',
  description: 'At A Square Solution, we blend the eternal architectural grammar of Rajasthan—its intricate stone Jalis, rhythmic Jharokha layouts, brass accents, and cooling lime-plasters—with clean, high-performance contemporary spaces.',
  elements: [
    {
      title: 'Structural Jalis & Arches',
      desc: 'Creating custom screens inspired by Jaipur palaces to filter raw sunlight into deep, poetic shadows while facilitating healthy air draft circulation.',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Terracotta & Sandstone Textures',
      desc: 'Utilizing warm hand-dressed sandstones and local limewashes to echo the iconic pink & rust-colored walls of the old walled city.',
      image: 'https://images.unsplash.com/photo-1598977123418-45f04b615a0e?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Modern Blue Pottery Accents',
      desc: 'Injecting cobalt blue & ivory ceramic tile-work into modern niches, vanity backsplashes, and modular kitchen backsplashes to reflect traditional motifs.',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80'
    }
  ]
};

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'turnkey',
    title: 'Turnkey Home Interiors',
    tagline: 'End-to-End Conceptualization, Project Management, and Execution',
    description: 'We take over bare structural brickwork to orchestrate high-luxury interior elements. From flooring layout, false-ceiling design and lighting architecture down to the final layer of custom soft-decor.',
    icon: 'Hammer',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Comprehensive 2D Layouts & 3D Visualizations',
      'Civil modifications, electrical planning, and HVAC alignment',
      'Premium false ceilings with customizable ambient profiles',
      'In-house modular cabinets and customized stone work',
      'Complete cleaning post-execution and handover'
    ],
    materials: [
      { name: 'Italian Marble & Indian Quartz', desc: 'Premium calacatta, local Makrana white marble, and customized scratch-free engineered quartzes.' },
      { name: 'Eco-certified BWR Plywood', desc: '100% Boiling Water Resistant Gurjan base plywood for structurally durable base framework.' }
    ],
    priceStart: '₹4.5 Lakhs+',
    faqs: [
      { q: 'What is turnkey service?', a: 'Turnkey means we manage everything: design, material selection, procurement, carpentry, civil mods, and execution. You get the key to a fully completed, liveable smart space.' },
      { q: 'How long does a turnkey project take?', a: 'Typically 45 days to 90 days depending on the size (e.g., 2BHK vs 4BHK structure) and client-approved mockups.' }
    ]
  },
  {
    id: 'modular-kitchen',
    title: 'Modular Kitchen Design',
    tagline: 'Engineered Ergonomics meets Sleek Jaipuri Craft',
    description: 'Bespoke anti-termite and moisture-resistant layouts planned for dry and wet Indian cooking. Equipped with advanced soft-close profiles, tailored height counters, and built-in heavy machinery cavities.',
    icon: 'ChefHat',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Moisture-resistant high density MDF and Marine Ply construction',
      'Premium Blum / Hettich soft-close tandem runners & lift-up systems',
      'Dedicated spice pullouts, oil-bottle trays, and corner carousel units',
      'Integrated quartz stone countertops and tile backsplashes with local blue accents',
      'Smart localized ventilation hoods and built-in microwave housings'
    ],
    materials: [
      { name: 'Acrylic & PU High Gloss Finishes', desc: 'Ultra-reflective surfaces that are easy to wipe off grease and resist yellowing over years.' },
      { name: 'Premium Ceramic & Quartz', desc: 'Durable, heat-resistant surfaces that withstand high culinary workloads.' }
    ],
    priceStart: '₹1.8 Lakhs+',
    faqs: [
      { q: 'Do you offer warranty on kitchens?', a: 'Yes, we provide up to a 10-Year Warranty structure on our marine timber cabinets and premium hardware mechanisms.' },
      { q: 'Can we utilize existing kitchen tiles?', a: 'Absolutely, we inspect existing plumbing and backsplashes to salvage structures where possible, keeping costs transparent.' }
    ]
  },
  {
    id: 'custom-furniture',
    title: 'Custom Luxury Furniture',
    tagline: 'In-House Seasoned Teak Wood & Modern Brass Joinery',
    description: 'Avoid standard pre-laminated modular compromises. Our direct high-end carpenters handcraft premium teak wood sofas, custom hydraulic beds, statement marble-topped dining sets, and intricate brass-gilded consoles.',
    icon: 'Armchair',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Tailor-made structural sizes according to strict carpet measurements',
      'High-grade solid teak wood, ash wood, and premium brass accents',
      'Individually pocketed springs with memory foam layers for premium seating comfort',
      'Over 200+ selected luxury fabrics including high-tensile bouclé and pure velvet options',
      'Customized hidden heavy-duty charging sockets and integrated lighting options'
    ],
    materials: [
      { name: 'Solid Teak & Ash Wood', desc: 'Natural local timber seasoned extensively to prevent structural warping in diverse climates.' },
      { name: 'Solid Brass & Antique Golds', desc: 'Pure brass profile trims and structural joints giving structural reinforcement and luxury shimmer.' }
    ],
    priceStart: '₹75,000+',
    faqs: [
      { q: 'Do you customize client designs from photos?', a: 'Yes! If you show us any editorial reference, our designers translate it into full scale blueprints to make it fit you perfectly.' },
      { q: 'Is the fabrication done at the residence or workshop?', a: '90% of our dusty and noisy solid wood carpentry is executed in our state-of-the-art Mansarovar workshop; only final fitting is done onsite.' }
    ]
  },
  {
    id: 'exterior-facade',
    title: 'Exterior & Facade Styling',
    tagline: 'Modern Grandeur balanced with Classic Jaipuri Jharokha detailing',
    description: 'Inject premium curb appeal using modern dry-cladding sandstones, Jali cut screens, sleek modern vertical landscaping profiles, and architectural mood lighting.',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    features: [
      'CNC routed metal and stone Jali screens for exterior structural elevations',
      'High-grade HPL paneling, local sandstone tiles, and louvers integrations',
      'Atmospheric security light maps and path illumination systems',
      'Sophisticated modern balconies and architectural planter columns'
    ],
    materials: [
      { name: 'HPL (High-Pressure Laminate)', desc: 'Weather-hardened facade elements that resist high Jaipur summer temperatures and rain.' },
      { name: 'Gwalior Mint & Jodhpur Sandstone', desc: 'Organic stone elements giving solid monumental presence with custom carved finishes.' }
    ],
    priceStart: '₹2.5 Lakhs+',
    faqs: [
      { q: 'Does shifting facade architecture require local permissions?', a: 'We design strictly within safe structural pillars and zoning regulations, helping you secure any cosmetic clearance with ease.' }
    ]
  },
  {
    id: 'commercial',
    title: 'Commercial & Retail Interiors',
    tagline: 'High-Impact Brand Presence & Functional Ergonomics',
    description: 'We craft high-luxury boutiques, flagship jewelry studios, and modern collaborative office spaces in C-Scheme and Malviya Nagar aimed at maximizing productivity and scaling conversion.',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Custom acoustical ceilings and targeted office linear task bars',
      'Sleek retail glass showcases with invisible high-rendering LEDs',
      'Ergonomic workstation setups and comfortable executive cabins',
      'Strategic visual customer flow maps planning entry and exit points'
    ],
    materials: [
      { name: 'Toughened Structural Glass', desc: 'Secure, clean partitions for visual transparency without acoustic leakage.' },
      { name: 'Powder-coated Custom Alloys', desc: 'Minimal industrial framing profiles for a sleek modern workspace look.' }
    ],
    priceStart: '₹3.5 Lakhs+',
    faqs: [
      { q: 'Do you design fire-safety layouts?', a: 'Yes, full commercial drawing packages include fire exit signage routes, localized fire sprinkler channels, and exhaust ducting.' }
    ]
  },
  {
    id: 'vastu-design',
    title: 'Vastu-Compliant Space Planning',
    tagline: 'Ancient Energy Principles Balanced with Avant-Garde Luxury',
    description: 'Aligning room placements, doorways, sleeping axes, and dynamic natural light paths to balance the elemental energies of earth, water, fire, wind, and ether without compromising on slick modern utility.',
    icon: 'Compass',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Comprehensive directional energy mapping by certified local consultants',
      'Optimized kitchen placement (South-East fire zone axis) and Master Bed (South-West)',
      'Constructive spatial color coordination matching basic element guidelines',
      'Correction tips for pre-constructed apartments using subtle metal and color grids'
    ],
    materials: [
      { name: 'Natural Copper & Brass Grids', desc: 'Used for subtle energy boundary corrections under the wooden flooring.' },
      { name: 'Vastu-Friendly Natural Limewashes', desc: 'Organic, metal-free mineral paints enhancing natural breathability and soothing light.' }
    ],
    priceStart: '₹45,000+',
    faqs: [
      { q: 'Can a fully modular modern layout remain strictly Vastu compliant?', a: 'Absolutely! Vastu is about geometry, materials, and elemental directions. We integrate electronic appliances, metal hardware, and sleek aesthetics seamlessly into the appropriate zones.' }
    ]
  }
];

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'malviya-villa',
    title: 'The Jali Heritage Villa',
    type: 'Luxury Villa',
    category: 'Jaipuri Fusion',
    location: 'Malviya Nagar, Jaipur',
    clientBrief: 'A sprawling multi-generational home seeking deep Rajasthani roots combined with sleek, clutter-free luxury features for foreign visual guests.',
    challenge: 'Addressing a deep central villa lobby with limited access to clean natural sunlight without losing core structural column support.',
    concept: 'Designing a dynamic double-height central light atrium surrounded by fine teakwood Jali screens and custom sandstone wall washes.',
    budgetRange: '₹35 - ₹45 Lakhs',
    timeline: '90 Days',
    testimonial: '"A Square Solution successfully preserved our ancient family memories by beautifully scaling carving aesthetics into comfortable, functional modern rooms." - Verma Family',
    imageBefore: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', // raw construction room
    imageAfter: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', // beautiful living room
    sketchImage: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=800&q=80', // design drawing concept
    moodboardColors: ['#C97B72', '#B7955B', '#F7F1E8', '#24211E'],
    finalPhotos: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'c-scheme-penthouse',
    title: 'Terracotta Minimalism Penthouse',
    type: 'Penthouse Apartment',
    category: 'Modern Minimal',
    location: 'C-Scheme, Jaipur',
    clientBrief: 'A young software executive couple requiring an eye-friendly remote work environment reflecting natural clays and deep green local vegetation.',
    challenge: 'Balancing a highly technical workstation setup with rich warm tones, keeping all cables hidden and profiles sleek.',
    concept: 'Frameless glass partitions paired with custom solid oakwood floating desks, integrated sand-textured microcement walls, and dusty terracotta planters.',
    budgetRange: '₹18 - ₹24 Lakhs',
    timeline: '60 Days',
    testimonial: '"Every single client call that I take from my home office receives immediate compliments on the clean textured sandstone background and soft lighting." - R. Sharma',
    imageBefore: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', // dusty floor
    imageAfter: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80', // modern clean room
    sketchImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80', // drafting sketch
    moodboardColors: ['#A65F3D', '#59634A', '#EFE9E1', '#33302C'],
    finalPhotos: [
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'vaishali-kitchen',
    title: 'The Brass Cobalt Kitchen',
    type: 'Modular Kitchen Project',
    category: 'Kitchen',
    location: 'Vaishali Nagar, Jaipur',
    clientBrief: 'A multi-burner heavy Indian kitchen requiring rigorous layout flow and highly scrubbable splashback zones, holding a premium editorial vibe.',
    challenge: 'An awkward L-shaped layout with bad structural pipe positions and poor local exhaust drafts.',
    concept: 'Re-routing plumbing into a concealed custom horizontal trench, installing high-capacity 1400m³/h suction hood, finished with royal cobalt blue pot-inspired matte acrylic drawers.',
    budgetRange: '₹3.5 - ₹5 Lakhs',
    timeline: '35 Days',
    testimonial: '"The custom Hettich drawers slide like absolute butter even with several kilograms of heavy-cast steel pans loaded in them!" - A. Singhal',
    imageBefore: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=800&q=80',
    imageAfter: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    sketchImage: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=800&q=80',
    moodboardColors: ['#1E3A8A', '#B7955B', '#FFFFFF', '#1F2937'],
    finalPhotos: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const DESIGN_PROCESS_STEPS = [
  {
    step: 1,
    title: 'Discovery & Consultation Call',
    icon: 'PhoneCall',
    description: 'We connect for a structured 30-minute brief detailing your carpet size, aesthetic alignments, and expected itemized budgets.',
    timeline: 'Day 1'
  },
  {
    step: 2,
    title: 'Laser Site Visit & Measurement',
    icon: 'Compass',
    description: 'Our in-house engineers conduct laser-guided digital floor measurements, inspect vertical clearances, and map core Vastu parameters.',
    timeline: 'Day 3 - 5'
  },
  {
    step: 3,
    title: 'Concept Narrative & Moodboard',
    icon: 'Palette',
    description: 'We draft initial layout options, material pairings (wood, stone, metal swatches), and render precise colors to build solid design consensus.',
    timeline: 'Day 7 - 12'
  },
  {
    step: 4,
    title: 'Photorealistic 3D Renders',
    icon: 'Layers',
    description: 'See every shadow, reflection, and light fixture in high-definition details before ordering raw materials. This eliminates late adjustments.',
    timeline: 'Day 15 - 25'
  },
  {
    step: 5,
    title: 'Precision Execution & Assembly',
    icon: 'Wrench',
    description: 'Carpentry at our Mansarovar facility combined with onsite construction supervised daily by a dedicated A Square Project Leader.',
    timeline: 'Day 30 - 75'
  },
  {
    step: 6,
    title: 'Grand Home Handover',
    icon: 'Key',
    description: 'A structural deep sweep and absolute final inspections. We walk you through every warranty manual, handing over your bespoke dream.',
    timeline: 'Day 80 - 90'
  }
];

export const PRICING_PACKAGES: { Apartment: PricingPackage[]; Villa: PricingPackage[]; Commercial: PricingPackage[] } = {
  Apartment: [
    {
      id: 'apt-standard',
      name: '2BHK Standard Essential',
      price: '₹3.8 - ₹4.5 Lakhs',
      subtitle: 'Premium Functional Living',
      description: 'Ideal for serious homeowners seeking modular kitchen efficiency, master bedroom storage, and standard false-ceilings without heavy civil modifications.',
      suitability: 'Cozy modern apartments targeting high material durability.',
      featuresIncluded: [
        'Premium high-density modular kitchen (Anti-termite base)',
        'Full heights master modular bedroom wardrobe (Sleek laminate)',
        'LED-aligned false ceilings in Living area',
        'In-house carpenter cabinet modifications',
        '3-Year full workmanship warranty'
      ],
      featuresExcluded: [
        'Luxury Italian marble flooring modifications',
        'Living room walnut solid wood consoles',
        'Complete bathroom sanitary restructuring'
      ],
      timeline: '45 Days'
    },
    {
      id: 'apt-premium',
      name: '3BHK Premium Heritage',
      price: '₹6.5 - ₹8.5 Lakhs',
      subtitle: 'A Square Crafted Living',
      description: 'Our most recommended layout. Introduces elegant Jaipuri fusion motifs, bespoke teak accents, and customized entry vestibules with Jali dividers.',
      suitability: 'Homeowners looking to blend historic motifs with premium utility.',
      featuresIncluded: [
        'L-shaped luxury acrylic modular kitchen with soft-pull runners',
        'Fully customized storage units for 2 bedrooms + customizable study console',
        'Custom geometric wooden Jali partitions at the entry foyer',
        'Textured limestone finish accent wall in Living room',
        'Integrated multi-point ambient lighting mapping',
        '5-Year structural warranty'
      ],
      featuresExcluded: [
        'HVAC central plant wiring integration',
        'Structural exterior balcony extension styling'
      ],
      timeline: '60 Days'
    },
    {
      id: 'apt-luxury',
      name: '4BHK Avant-Garde Luxury',
      price: '₹12.5 Lakhs+',
      subtitle: 'Opulent Custom Sanctuary',
      description: 'Zero design compromise. Features bespoke marble claddings, architectural profiles, fully motorized custom wardrobes, and high-performance kitchen automation layouts.',
      suitability: 'High-end duplex penthouses seeking bespoke master spaces.',
      featuresIncluded: [
        'Fully motorized touch-to-open premium glassware kitchen cabinetry',
        'Bespoke hand-tufted visual headboards for 3 master bedrooms',
        'Imported marble wall panelings in the formal lounge',
        'Motorized curtain runner systems and automated lighting integration',
        '10-Year premium structural warranty support'
      ],
      featuresExcluded: [
        'External building society structural facade permissions clearance fee'
      ],
      timeline: '80 Days'
    }
  ],
  Villa: [
    {
      id: 'villa-bespoke',
      name: 'Heritage Villa Mansion Package',
      price: '₹18 Lakhs+',
      subtitle: 'Grand Rajasthani Estate Revival',
      description: 'Custom estate layout utilizing Gwalior mint stones, hand-crafted teak woodwork, internal structural arches, customized water spouts, and large family lounges.',
      suitability: 'Unfinished grand standalone structural villas and bungalows.',
      featuresIncluded: [
        'Full layout visual styling including gorgeous indoor central glass columns',
        'Double height accent feature wall with hand-carved Jali profiles',
        'Bespoke luxury modular kitchens with heavy integrated pantries',
        'Multi-guest luxury dining bespoke custom tables (Antique gold gilding)',
        'Vastu energy corrections embedded structural copper plates'
      ],
      featuresExcluded: [
        'Swin pool structural concrete foundation pouring'
      ],
      timeline: '95 Days'
    }
  ],
  Commercial: [
    {
      id: 'comm-workspace',
      name: 'High-Impact Office Setup',
      price: '₹1,800 - ₹2,500 / SqFt',
      subtitle: 'High Output Collaborative Workspace',
      description: 'Aimed at optimizing employee light access, reducing acoustical noise echo, and maximizing premium visitor cabin trust.',
      suitability: 'BPO hubs, developer offices, premium law firms, corporate headquarters.',
      featuresIncluded: [
        'Linear acoustic panel suspended lighting bars',
        'Modular fire-resistant high comfort workstations',
        'Tempered glass room partitions with custom aluminum frames',
        'Sleek visual reception desk carrying dynamic stone accent textures'
      ],
      featuresExcluded: [
        'Structural heavy Server Rack physical mainframe hardware units'
      ],
      timeline: '45 Days'
    }
  ]
};

export const CUSTOM_FURNITURE_SWATCHES: SwatchOption[] = [
  {
    id: 'teak-grain',
    name: 'Seasoned Royal Teak Wood',
    hex: '#7A4B29',
    textureName: 'Satin Heritage Wax Polish',
    textureDescription: 'Rich, natural golden-brown grains showing premium timber knots. Offers outstanding termite decay resistance.',
    imagePreview: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sandstone-limewash',
    name: 'Jodhpur Ochre Terracotta',
    hex: '#D99873',
    textureName: 'Organic Earth Matte Wash',
    textureDescription: 'Infuses cozy desert sun warmth into accent cabinets, mimicking traditional sandstone masonry.',
    imagePreview: 'https://images.unsplash.com/photo-1598977123418-45f04b615a0e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'antique-gold-leaf',
    name: 'Antique Gold Gilded Brass',
    hex: '#C5A059',
    textureName: 'Brushed Royal Gloss',
    textureDescription: 'Fine premium hand-beaten gold detailing ideal for modern Jharokha framing, partition trims, and console legs.',
    imagePreview: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'charcoal-ash',
    name: 'Ashes of Sheesham',
    hex: '#3E342B',
    textureName: 'Deep Wire-Brushed Matte',
    textureDescription: 'Pre-seasoned dark elegant timber framing that highlights organic grain paths under modern warm spotlights.',
    imagePreview: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80'
  }
];

export const VASTU_ZONES_CONFIG: VastuZone[] = [
  {
    direction: 'North',
    element: 'Water (Wealth Flow)',
    rulingPlanet: 'Mercury',
    idealRooms: ['Home Office', 'Living Room Entrance', 'Wealth Locker Safe'],
    tips: [
      'Keep this direction light, airy, and highly uncluttered.',
      'Place rich green foliage plants or an organic indoor water ripple fountain here.',
      'Avoid placing heavy storage wardrobes or iron beds directly on the North wall.'
    ],
    colorTheme: 'Light Blue, Pastel Greens, and Silver trims',
    hexColor: '#3B82F6'
  },
  {
    direction: 'East',
    element: 'Air (Social Growth & Health)',
    rulingPlanet: 'Sun',
    idealRooms: ['Family Lounge', 'Study Room', 'Main Grand Entrance'],
    tips: [
      'Optimize windows to allow the morning rays of the sun to stream in.',
      'Excellent direction for light hand-carved wooden furniture and low seating layouts.',
      'Do not place trash bins or heavy power back-up batteries in this zone.'
    ],
    colorTheme: 'Warm Beige, Pale Greens, and Light Browns',
    hexColor: '#10B981'
  },
  {
    direction: 'South-East',
    element: 'Fire (Liquid Cash & Energy)',
    rulingPlanet: 'Venus',
    idealRooms: ['Sleek Modular Kitchen', 'Electrical Main DB Panel'],
    tips: [
      'The cooking hob/burner stove should ideally sit in this exact corner.',
      'The cook should face East while cooking to channel serene nourishment.',
      'Keep water dispensers, wash basins, and refrigerators in the South-West of the kitchen instead.'
    ],
    colorTheme: 'Dusty Pink, Terracotta, Coral, and subtle Crimson accents',
    hexColor: '#F43F5E'
  },
  {
    direction: 'South-West',
    element: 'Earth (Stability, Mastery & Relationships)',
    rulingPlanet: 'Rahu',
    idealRooms: ['Master Suite Bedroom', 'Heavy Solid Wardrobes', 'Structural Safety Vault'],
    tips: [
      'This zone should carry the highest weight in your entire floor plan layout.',
      'Position bed-head towards South so magnetic blood flow aligns perfectly during sleep.',
      'Place heavy seasoned solid wood consoles or carved stone accent headboards here.'
    ],
    colorTheme: 'Sandstone Grey, Ochre Yellows, and Golden Earth tones',
    hexColor: '#D97706'
  }
];

export const QUIZ_STEPS = [
  {
    id: 'current-room',
    question: 'Which area of your residence are we transforming?',
    options: [
      { text: 'Complete Turnkey Home', value: 'turnkey', img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=400&q=80' },
      { text: 'A Modern Culinary Kitchen', value: 'kitchen', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
      { text: 'My Master Bedroom Suite', value: 'bedroom', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=400&q=80' },
      { text: 'Boutique Office or Shop Front', value: 'commercial', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'design-vibe',
    question: 'Select your absolute favorite aesthetic vibe:',
    options: [
      { text: 'Jaipur Fusion (Jali Screens, Sandstone & Brass trims)', value: 'heritage', img: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=400&q=80' },
      { text: 'Sleek Modern Minimal (Clean lines, Monochromes & Wood)', value: 'minimal', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80' },
      { text: 'Avant-Garde Luxury (Rich Marble claddings, Gold & Motorized wardrobes)', value: 'opulent', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80' },
      { text: 'Organic Earth (Terracotta, Jutes, Limewash walls & Plants)', value: 'organic', img: 'https://images.unsplash.com/photo-1598977123418-45f04b615a0e?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'vastu-importance',
    question: 'How vital is Vastu Compliance to your household?',
    options: [
      { text: 'Extremely Vital (Must strictly align directions)', value: 'high', img: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=400&q=80' },
      { text: 'Moderate (Prefer key guidelines like Kitchen axis)', value: 'medium', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80' },
      { text: 'Aesthetic-First (No strict directional preference)', value: 'low', img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'budget-bracket',
    question: 'What budget range do you hold in mind?',
    options: [
      { text: '₹3 to ₹6 Lakhs (Focused quality essentials)', value: 'essential', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80' },
      { text: '₹6 to ₹12 Lakhs (Heritage fusion with rich details)', value: 'premium', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80' },
      { text: '₹12 Lakhs+ (Ultra signature materials & automation)', value: 'ultra', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80' }
    ]
  }
];

export const BLOG_POSTS = [
  {
    id: 'post-1',
    title: 'The Blueprint of Jaipur Modern Heritage: Combining Artisanship with Functional Lines',
    category: 'Interior Ideas',
    summary: 'Discover how we repurpose Rajasthani hand-beaten stone Jalis and warm pink limewashes into beautiful high-ceiling smart homes.',
    date: 'May 10, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'post-2',
    title: 'Vastu Shastra Demystified: 5 Key Directional Balancing Rules for Modern High-Rise Flats',
    category: 'Vastu Guides',
    summary: 'Living in a modern Jaipur apartment? Here is how to configure your hob and correct magnetic entry flow without demolition.',
    date: 'April 28, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'post-3',
    title: 'Planning a Modular Kitchen? 3 Mistakes That Lead to Cabinet Warping & Wet Cooking Odor',
    category: 'Modular Kitchen Tips',
    summary: 'Uncover the vital differences between BWR plywood base and MDF, and why localized cross-ventilation draft saves high gloss cabinets.',
    date: 'March 15, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80'
  }
];

export const OFFICE_CONTACT_INFO = {
  phoneNumbers: ['8529664281', '8824387494', '7240603458'],
  email: 'asquaresolutions51@gmail.com',
  address: 'Shop No. 51, Opp. Digamber Jain Mandir, Shopping Complex, Meera Marg, Mansarovar, Jaipur',
  hours: 'Mon - Sat: 10:00 AM - 8:00 PM, Sunday: Closed',
  mapCoordinatesEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.7151048601664!2d75.7621431!3d26.8490334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5fdf65e128b%3A0xe7f92025ed9ecebc!2sMeera%20Marg%2C%20Mansarovar%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1716228420000!5m2!1sen!2sin'
};
