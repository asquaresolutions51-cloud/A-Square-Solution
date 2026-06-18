# JAIPUR MODERN HERITAGE DESIGN SYSTEM

**Version 1.0**  
*A Square Solution — Bespoke Luxury Interiors Rooted in Heritage*

---

# 1. DESIGN PHILOSOPHY

The "Jaipur Modern Heritage" design system blends the rich, ornate architectural history of Jaipur with the clean lines, functionality, and minimalism of sleek modern living. 

## Core Principles

### 1. Cultural Resonance
Incorporate traditional Rajasthani elements—such as Jali (stone lattice) carvings, arched niches (jharokhas), and seasoned solid timber—without cluttering the spatial flow.

### 2. Turnkey Honesty
Structure layouts, pricing lists, and item details with absolute transparency. Design decisions should correspond directly to modular units, materials, and functional layouts.

### 3. Tactile Warmth
Use rich, textured mineral finishes (limewash, ochre plaster, textured brass) contrasted with sleek, smooth, and modern surfaces (polished stone, quartz, handles-free acrylic panels).

### 4. Directional Well-being (Vastu)
Aesthetic layout and furniture positioning should align with Vastu Shastra principles to maintain natural circulation, light path optimization, and geometric flow.

---

# 2. COLOR SYSTEM

The color palette is derived directly from the landscape, royal heritage, and traditional building materials of the Pink City.

## Palette Configuration

```json
{
  "brand-ivory": "#F7F1E8",
  "brand-charcoal": "#24211E",
  "brand-pink": "#C97B72",
  "brand-terracotta": "#A65F3D",
  "brand-gold": "#B7955B",
  "brand-beige": "#D8C3A5",
  "brand-olive": "#59634A"
}
```

### Color Roles & Implementation

*   **Ivory (`#F7F1E8`):** The primary canvas. Evokes natural lime-plaster (Chuna) walls. Used for page backgrounds and large surface areas.
*   **Charcoal (`#24211E`):** High-contrast structural color. Used for typography, dark buttons, primary borders, and sleek ironwork elements.
*   **Pink (`#C97B72`):** The cultural signature. Derived from Jaipur's terracotta sandstone. Used for key active highlights, secondary buttons, and premium accent text.
*   **Terracotta (`#A65F3D`):** Warm action color. Highlights interactive quiz elements, CTA links, and customizer selections.
*   **Gold (`#B7955B`):** Luxury and refinement. Represents brass fittings, gold-leafing, and warm marigolds. Used for visual borders, badges, stars, and decorative lines.
*   **Beige (`#D8C3A5`):** Soft structural separators. Used for thin page borders and gridlines.
*   **Olive (`#59634A`):** Organic balance. Evokes foliage and stone pots. Used for natural accents.

---

# 3. TYPOGRAPHY SYSTEM

Typography is configured to contrast classical elegance with contemporary legibility.

## Font Stacks

*   **Serif (Display & Headings):** `"Cormorant Garamond", Georgia, serif`
    *   *Role:* Evokes historical literature, royal heritage, and hand-carved stone. Used for headings, quotes, and display text.
*   **Sans-Serif (Body & UI):** `"Manrope", ui-sans-serif, system-ui, sans-serif`
    *   *Role:* Ultra-readable geometric sans-serif. Used for body text, form labels, navigation links, and standard buttons.
*   **Mono (Technical & Metrics):** `"JetBrains Mono", monospace`
    *   *Role:* Structure, taglines, steps, and technical numbers. Used for stats, badges, and layout coordinates.

## Typography Scale

| Token | Family | Weight | Size | Line Height |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | Serif | 900 (Black) | 5xl to 7xl | 0.95 |
| **Section Title** | Serif | 900 (Black) | 3xl to 4xl | 1.1 |
| **Card Title** | Serif | 900 (Black) | lg to xl | 1.2 |
| **Section Tagline**| Mono | 700 (Bold) | xs (10px) | 1.5 |
| **Body Large** | Sans | 300 (Light) | md (16px) | 1.6 |
| **Body Regular** | Sans | 300 (Light) | sm (14px) | 1.5 |
| **UI labels** | Mono | 700 (Bold) | xs (10px) | 1.4 |

---

# 4. GRID & SPACING

We apply an 8px modular spacing scale to represent spatial layouts consistently.

```json
{
  "space-1": "4px",
  "space-2": "8px",
  "space-3": "12px",
  "space-4": "16px",
  "space-5": "20px",
  "space-6": "24px",
  "space-8": "32px",
  "space-10": "40px",
  "space-12": "48px",
  "space-16": "64px",
  "space-20": "80px",
  "space-24": "96px"
}
```

---

# 5. CORE INTERACTIVE COMPONENTS

### 1. Sticky Navigation Header
*   **Aesthetics:** White semi-translucent backdrop (`rgba(255, 255, 255, 0.5)`) with a `backdrop-blur-sm` filter. Separated by a thin `brand-beige` border.
*   **Layout:** Left-aligned monogram logo (`A²` in a black box with gold borders) and right-aligned uppercase monospace navigation buttons.

### 2. Custom Furniture Customizer
*   **Aesthetics:** Left-aligned selection panels (timber types, metal hardware accents, upholstery fabrics) facing a right-aligned live rendering frame.
*   **Visual feedback:** Gold border highlighted cards and active status text.

### 3. Design Vibe Style Quiz
*   **Aesthetics:** Clean white cards with a progress tracker showing progress bar.
*   **Flow:** Step-based question cards leading to a contact submission form, unlocking a tailored interior report.

### 4. Vastu Planning Layout
*   **Aesthetics:** A circular cardinal coordinate selector mapping traditional room placement (e.g. Northeast for water, Southwest for master bedroom).
*   **Layout:** Central grid layout mapping active directional sectors with descriptions of Vastu-appropriate interior layouts.

---

# 6. MOTION & MICRO-ANIMATIONS

We utilize `motion` (Framer Motion) to enrich client interactions, mirroring physical transitions.

*   **Page Transitions:** Easing `opacity` and `y` coordinates (`duration: 0.7s`, `ease: "easeOut"`) to introduce page sections.
*   **Card Hover Effects:** Subtle scale lifts (`scale: 1.02`, `translateY: -4px`) with custom transition shadows.
*   **Quiz Slide-outs:** Standard direction shifts (`x: 20` to `x: 0` on entrance, `x: -20` on exit) to signify step-by-step progress.
