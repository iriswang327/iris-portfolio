# Museum of Iris — Complete Design Guidelines
# Iris Wang Portfolio
# Version 3.0 — Final

---

## Site Identity
- Name: "Museum of Iris"
- Concept: a curated collection of work, thought,
  and life — displayed like a museum
- Tagline: "Working at the edges of law, tech, and people."
- Routes: Dreams · Experience · About

---

## Stance
Clean, minimal, editorial. Soft watercolor atmosphere
meets precise typographic restraint. Every element
earns its space. Inspired by liumichelle.com structurally
but unmistakably Iris in voice, color, and concept.

Watercolor splashes appear throughout the site —
not just in the hero. Subtle gradient washes bleed
into section backgrounds, behind text, around cards.
Always using the IHWN gradient palette.
Never overwhelming — always felt, not seen.

---

## Typography
- Primary: Geist Sans (download: vercel.com/font)
- Fallback: -apple-system, BlinkMacSystemFont,
  system-ui, sans-serif
- NO serif fonts anywhere. Geist Sans only.

Scale:
- Hero name: 52px / weight 200 / tracking -0.028em
- Page titles: 40px / weight 200 / tracking -0.025em
- Section headers: 28px / weight 300
- Body: 13px / weight 300 / line-height 1.65
- Section labels: 10px / uppercase / tracking 0.16em
- Captions: 11px / weight 300 / italic
- Micro: 9px / uppercase / tracking 0.08em

---

## Color System

### Base (all pages except dark mode)
- Page background: #FAF9FF (barely-there lavender white)
- Foreground: #1A1625 (deep purple-black)
- Muted text: rgba(26,22,37,0.4)
- Labels/captions: rgba(26,22,37,0.27)
- Status green: #4ade80

### IHWN Brand Gradient (accent + watercolor splashes)
#F0ABFC → #A78BFA → #7DD3FC at 135°
Used on: logo, active nav, tags, action links,
watercolor splash overlays throughout site
Never as full background fill — accent and wash only

### Watercolor Hero Wash (all page heroes)
Soft layered radial gradients — NOT hard linear:
- Lavender blob: rgba(196,181,253,0.4) top-left
- Blush blob: rgba(251,207,232,0.35) top-right
- Periwinkle blob: rgba(165,180,252,0.3) center
Fades to white at bottom. Organic, not geometric.

### Watercolor Splashes Throughout Site
Beyond just the hero — soft gradient washes appear:
- Behind section labels (very subtle, 8% opacity)
- Corner washes on about page sections
- Soft bleed behind the name on every page
- Around passion project cards (lavender tint)
- Subtle wash behind philosophy quotes
Always IHWN gradient colors, always organic shapes,
always low opacity (8-20%), never hard edges

### Watercolor Name Splash (every page hero)
- Blush #FCE8F8 center, 40% opacity
- Bleeding into lavender #F0EEFF outward
- Tiny sky blue #7DD3FC accent far edge
- Organic uneven shape, not a circle
- Localized to name area only

### Dark Mode (Ready for Bed emotion only)
- Background: #0A0A0A (stays dark, no gradient)
- Foreground: #F5F0E8
- Cards: #1A1A1A
- Muted: rgba(245,240,232,0.4)
- Nav: rgba(10,10,10,0.85) + blur(24px)
- Watercolor splashes: IHWN gradient at lower opacity
  (still present but softer on dark background)
- Background remains #0A0A0A — no watercolor wash
  on background itself in dark mode

---

## Emotion Picker System

### Emotions (5 total)
Each emotion = specific color + loading message + behavior

Happy (yellow #FDE68A):
- Loading message: "i'm happy you are here too! 🌻"
- Site: normal light mode

Calm (sage green #A7C4A0):
- Loading message: "building a zen portfolio..."
- Site: normal light mode

Curious (pale blue #BAD6F0):
- Loading message: "you're in the right place! 🔍"
- Site: normal light mode

Frustrated (light-medium red #F4A0A0):
- Loading message: "sending positive vibes to you... 🤍"
- Site: normal light mode

Ready for Bed (black #1A1A1A, white text):
- Loading message: "let's switch to dark mode. 🌙"
- Site: SWITCHES TO FULL DARK MODE
- Only emotion that changes site colors
- Dark mode persists until user changes emotion

### Emotion Picker Screen

Background: RICH watercolor gradient wash — more saturated
than the rest of the site, more color, more presence
Layered radial gradients, more vivid:
- Lavender blob: rgba(196,181,253,0.7) top-left, very large
- Blush blob: rgba(251,207,232,0.65) top-right, large
- Periwinkle blob: rgba(165,180,252,0.6) center
- Additional warm pink blob: rgba(244,143,177,0.3) bottom-left
- Sky blue blob: rgba(125,211,252,0.3) bottom-right
Overall effect: rich, dreamy, painterly — more color than
the rest of the site. Feels like stepping into a painting.

Movement (Framer Motion in Cursor):
Opening animation sequence:
1. Page starts pure white
2. Watercolor ink drop falls from top center
3. Spreads outward organically in gradient colors —
   lavender bleeding into blush bleeding into periwinkle
   like ink dropped into water, very organic edges
4. As color settles, iris wang logo fades/draws in
5. Question text fades in
6. Pills appear staggered from bottom
Total animation: ~3 seconds, very slow and dreamy

3 soft radial gradient blobs continue drifting slowly
after the ink drop animation settles
Annotation: "ink drop + drifting blobs — Framer Motion"

iris wang logo mark:
- File: /public/images/lotus-logo.png
- This is the hand-drawn Procreate watercolor lotus
- Use next/image, display at 80px tall on emotion picker
- Gentle float after appearing:
  translateY 0 → -4px → 0, 4s infinite ease
- Never generate SVG — always use this PNG file

Question text:
"hi, how are you?"
Geist Sans 26px weight 200 #1A1625
Letter-spacing: -0.02em
Fade in after lotus appears, 0.5s delay

Emotion pills — FILLED soft pastel style
(match Figma exactly):
- Border-radius: 999px (fully rounded pill)
- Background: emotion color at 70-80% opacity (soft fill)
- No border needed — filled is the style
- Text: Geist Sans 12px weight 400 #1A1625 lowercase
- Padding: 8px 20px
- Hover: scale(1.03), darken slightly, 150ms ease
- Layout: horizontal row, 12px gaps
- Pills match exactly what's in Figma:
  happy (soft yellow) · calm (sage green) ·
  curious (pale blue) · frustrated (soft pink/red) ·
  ready for bed (near black with white text)

Subtitle below pills:
"your choice colors the experience"
9px uppercase #BBBBBB letter-spacing 0.1em

"SKIP FOR NOW →" below: 10px uppercase #BBBBBB

Overall feeling:
Rich, dreamy, painterly — most colorful moment on the site
Like stepping into a painting before entering the gallery

### Loading Transition Screen (after emotion selection)
1. Emotion color fills screen smoothly (0.4s ease)
2. Loading message appears centered:
   Geist Sans 15px weight 300
   #1A1625 on light emotions, #F5F0E8 on dark
3. Small pulsing dots below message
4. Total duration: 2.5s
5. Smooth fade into homepage (0.6s)

### Emotion Color Dot in Nav
- Small colored circle top-right of nav, 8px
- Tooltip: "change your mood"
- Click: returns to emotion picker
- Smooth color transition

---

## Navigation
- Height: 56px
- Background: transparent — no background, no blur, no border
- Dark mode: transparent
- Nav floats over the hero gradient
- Logo: NOT in nav — footer only
- Emotion dot: removed from nav

Right-aligned: DREAMS · EXPERIENCE · ABOUT
- 13px weight 300 #1A1625
- Active: IHWN gradient underline (1px)
- 28px gap between links
- 24px padding-right
- NO logo, NO emotion dot, NO contact button, NO hamburger on desktop

---

## Layout
- Hero content max-width: 680px left-aligned
- Cards max-width: full viewport, 24px side padding only
- Hero padding top: 180px
- Hero padding left: 24px
- Section gaps: 80px standard / 96px large
- NOT centered — left-aligned content

---

## Components

### Frosted Pill
- Background: rgba(255,255,255,0.12)
- Backdrop-filter: blur(20px)
- Border: rgba(255,255,255,0.18) 1px
- Border-radius: 999px
- Font: Geist Sans 11px weight 400
- Dark variant: rgba(0,0,0,0.55) bg, #FFFFFF text

### Card Hover Behavior
1. Scale down to 0.97 (spring easing)
2. Description fades in BELOW card (outside, not overlay)
3. Pill stays inside card, does not move
4. Transition: 300ms cubic-bezier(0.34,1.56,0.64,1)
5. Reverses smoothly on mouse leave

### Modal Structure
White card, 20px radius, 580px wide
Backdrop: blur(20px) + rgba(0,0,0,0.35)
Padding: 36px

- Company logo circle (44px)
- Company name: 26px weight 200
- Type: 12px weight 300 #888888
- Metadata: Timeline | Role | Type | With
  Labels: 10px uppercase #BBBBBB
  Values: 13px weight 400 #1A1A1A
- Hairline divider
- PROJECT 01, 02 with title + description + thumbnail
- Close ×: top-right, 32px circle
- Expand ↗: top-left (goes full page)

### Footer (all pages)
Border-top: 0.5px solid rgba(0,0,0,0.07)
Padding: 36px 32px
3-column grid:

Left:
- iris wang logo (20px) + "iris wang" 14px weight 400
- "🕐 Austin, TX" — 11px weight 300 #BBBBBB
- "Built with Next.js & americanos ☕"
  10px weight 300 #CCCCCC

Center:
- Dreams · Experience · About
- 13px weight 300 #999999

Right:
- "Let's talk!" — 12px #BBBBBB
- iriswang32@gmail.com — 13px weight 400
- ig · li · ✦ socials

Bottom: "CHANGELOG: [date]" 10px uppercase #DDDDDD

---

## Pages

### / → Dreams (Homepage)

Hero (left-aligned, watercolor wash):
- Padding top: 120px, sides: 64px
- Status line: green dot + "open to summer 2026 internships · anywhere" 12px weight 300 #888888, sits 16px above name
- "iris wang": 36px weight 200 tracking -0.02em + watercolor splash behind
- Rotating text (ONE LINE, 18px weight 300):
  "Product [designer/thinker/innovator/lover] for [humans/AI startups/dog lovers/friends/the future]"
  Fixed words in #1A1625, rotating words in IHWN gradient
  Each word rotates INDEPENDENTLY on different timers:
  Role word rotates every 4s
  Audience word rotates every 2.5s
  Framer Motion AnimatePresence — exits up, enters from below
- Gap between name and rotating text: 6px
- "Working at the edges of law, tech, and people." 14px weight 300 #888888, margin-top 20px
- "UT Austin · Advertising + CS · 2027" 12px weight 300 #BBBBBB, margin-top 6px
- Gap before MOCK PROJECTS section: 80px

Section label: "MOCK PROJECTS"

2-column card grid:
- Card height: 340px
- Card border-radius: 20px
- Grid gap: 16px
- Cards support optional videoUrl prop:
  if videoUrl → show looping muted autoplay video
  if no videoUrl → show gradient background

Apple:
- Gradient: linear-gradient(148deg, #B4B1FD 0%, #909BE6 48%, #748ADB 100%)
- Logo ghosted center 8% opacity
- Pill: "Apple · Product Design"
- Hover desc: "Rethinking how Maps connects people to context."

Spotify:
- Gradient: linear-gradient(148deg, #1E5537 0%, #0C2C1B 100%)
- Pill: "Spotify · Product Design"
- Hover desc: "Discover what local businesses are listening to."

Meta:
- Gradient: linear-gradient(148deg, #1B2C5B 0%, #090F2E 100%)
- Pill: "Meta · Product Design"
- Hover desc: "A social-first approach to everyday wellness."

Gemini:
- Gradient: linear-gradient(148deg, #1E1030 0%, #0B0718 100%)
- Pill: "Gemini · Product Design" — dark pill
- Hover desc: "Contextual crypto news in the trading experience."

Section label: "DREAMS"

3-column passion row (soft purple tint cards):
rgba(167,139,250,0.06) bg, rgba(167,139,250,0.15) border
14px radius, 18px padding

The Booth:
- Title: "The Booth"
- Desc: "vintage film photobooth — drop a photo, get a strip"
- Tag: "try it out ↗"

Coffee Order:
- Title: "What's Your Order?"
- Desc: "build your coffee · submit the order"
- Tag: "place an order ↗"

Museum of Art:
- Title: "Museum of Art"
- Desc: "illustrations, oils, watercolors"
- Tag: "view gallery ↗"

---

### /experience → Experience Page

Hero (watercolor wash):
- Label: "REAL PROJECTS, REAL TEAM, REAL IMPACT" 10px uppercase #BBBBBB
- Title: "experience" — 32px weight 200 (matches new type scale)
- Subtitle: "Advertising. Business. Design. Law.
  One through-line: making complex things human." 14px weight 300 #888888

NO Giving Back section — removed entirely.
Those orgs live on About page community section only.

2-column card grid:

1. Tower & Bridge
   Gradient: #FDF6E8 → #F5E6C8
   Pill: "Tower & Bridge · Analytics Strategy"
   Desc: "Student agency — real clients · 2025–Present"

2. Texas Convergent / Ripple
   Gradient: #EEEAFF → #DDD8FF
   Pill: "Texas Convergent · Product Design"
   Desc: "Built Ripple solo — Best Presentation · Fall 2024"

3. Integrated Design Thinking
   Gradient: #FCE8F0 → #F8E0EC
   Pill: "Integrated Design · UX Research"
   Desc: "Full UX research for unhoused community · Fall 2025"

4. Risk Radar
   Gradient: #0A0A0A → #1A1A2E
   Pill: "Risk Radar · AI Product" — dark pill
   Desc: "AI brand crisis prediction — BERT, RAG · Spring 2026"

5. Law Journal
   Gradient: #0F1729 → #1A2A4A
   Pill: "Law Journal · Legal Writing" — dark pill
   Desc: "Published pieces on entertainment + healthcare law"

6. Ol Pejeta
   Gradient: #2A1A0A → #6A5040
   Pill: "Ol Pejeta · Brand Strategy"
   Desc: "Still Here campaign · Spring 2026"

7. ASUCI Office of the President
   Gradient: #E8EEF8 → #D4E0F0
   Pill: "ASUCI · Outreach Intern"
   Desc: "Student government outreach · 2023–2024"

Currently section label: "CURRENTLY"
- Small logo circle (40px, #F5F5F5 bg)
- Name: 13px weight 400 + Role: 12px weight 300 #888
- Date: 11px weight 300 #BBBBBB right-aligned
- 20px gaps, hairline dividers

Currently:
- Letters of Gold · Director of Projects · 2026–Present
- The Daily Texan · Editorial Illustrator · 2024–Present
- Longhorn Racing · PR Photography · 2024–Present
- Texas Undergraduate Law Journal · Staff Writer · 2024–Present
- Tower & Bridge · Analytics Strategy · 2024–Present

---

### /about → About Page

Two-column layout:
Left: 220px fixed sidebar
Right: scrollable content

Sidebar:
- iris wang logo (32px) + "iris wang" 13px weight 400
- "design, strategy, & everything in between." 11px #888
- Anchor nav:
  Hi! · Work · Community · Philosophy ·
  Entertainment · Fun Facts ✦
  Active: IHWN gradient text, weight 400
  Inactive: #888888 weight 300
  Updates automatically on scroll (Intersection Observer)
  Each click smoothly scrolls to anchor
  Annotation: "Intersection Observer — built in Cursor"

Hi! Section:
Photo LEFT + bio text RIGHT, 40px gap
Polaroid style: 8px white border, 1.5° tilt,
shadow 0 8px 32px rgba(0,0,0,0.08)
Caption: italic 11px #BBBBBB
"austin, tx — somewhere between a law brief and a sketchbook"

"Hi, I'm Iris!" — 28px weight 300

Location: 📍 Austin, TX · NYC soon
          🎓 UT Austin · Advertising + CS · 2027

Bio paragraphs (15px weight 300 #444, line-height 1.9):

"With a diverse span of work, I lead with one desire.
The ultimate goal to bridge complex systems to
intuitive understanding."

"I'm an Advertising student at UT Austin with minors
in CS, design strategies, & entrepreneurship. I spend
my time building products, writing about healthcare law,
photographing race cars, and illustrating for a newspaper.
Each tells a story that deserves to be heard."

CTA: "Working on something cool? Let's talk! →"
IHWN gradient text

Work Section:
Label: "WORK"
Clean timeline list (same style as currently):
- SparroWriting · Lead Instructor · 2022–2025
- ASUCI Office of the President · Outreach Intern · 2023–2024
- Tower & Bridge · Analytics Strategy · 2025–Present
- Longhorn Racing · Operations Team · 2024–Present
- Texas Undergraduate Law Journal · Staff Writer · 2024–Present
- Letters of Gold · Director of Projects · 2026–Present

"See the full experience page →" IHWN gradient

Community Section:
Header: "My Communities 🤍"
3 soft purple cards:

Letters of Gold:
- Role: Director of Projects (incoming)
- Desc: "Building a children's book on skin protection and diversity"

Humane Society of Dallas:
- Role: Animal Volunteer
- Desc: "Because animals deserve advocates too 🐾"

Boys & Girls Club:
- Role: Volunteer
- Desc: "Giving back to the next generation"

Philosophy Section:
Header: "My Philosophy"
Kaizen (改善) — every day is an opportunity to improve.
Even if it's just 1%.

Quote blocks with IHWN gradient left border (2px):
20px weight 200 italic, attribution 11px #BBBBBB

Real quotes from Iris:
"The most powerful person in the world is the storyteller."
— attribution TBD

"Be intentional. Be consistent. Be bored."
— attribution TBD

Entertainment Section:
Header: "Entertainment"
2 tabs: Books · Music

Books tab — 3 sections as cover card grids
(80px × 110px, rounded 8px)
Also shows as Library component style
(replaces standalone /library page):

"CURRENTLY READING"
Warm blush covers:
- Crime and Punishment — Fyodor Dostoevsky
- East of Eden — John Steinbeck
- A Court of Silver Flames — Sarah J. Maas

"TO BE READ"
Soft lavender covers:
- I Want You to Be Happy — Jem Calber
- In Five Years — Rebecca Serle
- Babel — R.F. Kuang
- The Art of War — Sun Tzu
- Madonna in a Fur Coat — Sabahattin Ali

"ALMOST ✦ STARS"
Subtitle: "because art is not perfection"
Warm cream covers:
- The Goldfinch — Donna Tartt
- Recursion — Blake Crouch

Music tab:
Birds-eye vinyl record player SVG
- Dark vinyl record #1A1A1A, circular
- Album cover art center (80px circle)
- Tonearm SVG at ~30°
- Spins: CSS rotate 8s linear infinite
- Album switches: Framer Motion AnimatePresence, every 3s
- "currently spinning ●" label, ● IHWN gradient pulse
- Artist + track below, 13px weight 300

Rotation:
1. Sade — No Ordinary Love
2. Rufus Du Sol — New York
3. Noah Kahan — Call Your Mom
4. Olivia Dean — Baby Steps
5. Frank Sinatra — New York, New York
6. Michael Jackson — Human Nature

Fun Facts Section:
Header: "Fun Facts ✦"
Subtitle: "things that don't fit anywhere else"

Items (emoji + punchy line):
🎾 played & coached competitive tennis in high school
📸 the fastest thing i've photographed: 187mph
⚖️ has read more legal briefs than novels this year
🎨 illustrated something 50,000 people saw without knowing
🐾 squirrel & otter lover
🏊🏼‍♀️ lifeguard certified!
☕ approximately 847 americanos w/ cinnamon since freshman year

---

### Company Overview Modal (Dreams page click)

White modal, 20px radius, 580px, backdrop blur
Top-left: expand ↗ | Top-right: close ×

- Company logo (60px centered)
- Company name: 26px weight 200
- "why this company": 13px weight 300 #888888

Apple: "Apple sits at the intersection of technology
and human experience better than anyone.
Software updates were my joy since I was 5."

Spotify: "8 years of choir. 14 years of piano. Music is
something I cannot live without — why not create
for a company I love?"

Meta: "Healing works better if we heal together. Meta
has the opportunity to make wellness feel less lonely."

Gemini: "Crypto is intimidating because the information
is scattered and hard to trust. I want to bring
contextual, reliable news into the trading experience."

Projects:
PROJECT 01 — title + desc + "view case study →"
PROJECT 02 — same

---

### Mock Project Case Study Template
Route: /dreams/[company]/[project]

Breadcrumb: "Dreams → Apple → Maps Redesign"
11px weight 300 #BBBBBB

Sections:
OVERVIEW — one paragraph, what + why
COMPETITIVE ANALYSIS — side by side cards
THE PROBLEM — 18px pull quote style
DESIGN PROCESS — Sketches → Wireframes → Iterations → Hi-Fi
FINAL DESIGN — full width mockups, breathing room
REFLECTION — honest, short

"← Back to [Company]" top-left

Password protection:
Case studies locked while in progress.
Card shows "currently building 🔒"
Password given to recruiters directly.

---

### Experience Case Study Template
Route: /experience/[org]/[project]

Breadcrumb: "Experience → Texas Convergent → Ripple"

CONTEXT · THE PROBLEM · PROCESS · SOLUTION
IMPACT — "🏆 Best Presentation out of 18 teams"
  IHWN gradient bg 10% opacity, rounded 12px
REFLECTION

Warmer tone than mock studies.
"← Back to Experience" top-left

---

### /museum → Museum of Art

Layout: horizontal scroll ONLY (left ↔ right)
Background: #FAF7F2 (warm antique white gallery wall)
No vertical scroll

Filter tabs top:
All · Illustration · Oil · Watercolor · Sketchbook · Childhood
IHWN gradient on active tab

Artwork — ORNATE VINTAGE DOLLHOUSE FRAMES:
- Aged gold gradient: #C9A84C → #B8973D
  (worn antique — NOT bright modern gold)
- Decorative carved border detail (Victorian molding)
- Inner bevel/shadow on frame interior
- Cream mat between frame and art: #F5F0E8 ~12px
- Drop shadow: 0 8px 32px rgba(0,0,0,0.15)
- Frames vary: some heavy carved, some thin elegant
- Mix of portrait and landscape orientations
- Subtle 1-2° tilts on some frames (organic)
- NO text — no titles, no medium, no year, nothing
  Just the art.

Red velvet rope:
- Full scroll width at floor level
- Deep red: #8B1A1A
- Ornate gold stanchion posts with decorative caps
- Annotation: "SVG rope — built in Cursor"

"SCROLL →" 10px uppercase #BBBBBB right side

Hover: nothing — pure, clean
Click: full-screen lightbox, no text, Esc to close

Cursor notes:
"horizontal scroll — Framer Motion useScroll"
"frames — CSS border + box-shadow ornate"
"lightbox — Framer Motion AnimatePresence"

---

### /booth → The Booth (replaces Pet Photobooth)

Inspired by South Congress Hotel photobooth aesthetic:
Warm gradient background (amber → blush → cream)
Intimate, vintage, tactile

NOT just a dog photobooth — vintage photobooth for anyone.
Drop any photo → get a black and white film strip.

AI-powered (built in Cursor):
- react-webcam for live camera capture
- OR upload any photo
- AI applies: B&W filter + film grain + vintage treatment
- Output: classic 3-frame vertical photostrip
- Film style choices replace color picker

Dark background page: #1A1A0A (warm dark, not cold)
Card: #F5F0E8 (aged paper cream)
Accent: #C9A84C (aged gold)

Card contents:
- macOS dots top-left (subtle #555555)
- Title: "The Booth" 18px weight 400
- Two options: "take a photo" (webcam) | "upload"
- Film style picker (7 options as rectangular tags):
  Classic B&W · Kodak · Ilford · Polaroid ·
  Cinestill · Fuji · Expired
- Output: 3-frame vertical strip
  White border, sprocket holes, film grain
  Timestamp: "2026 · museum of iris"
- Share button: aged gold accent

Below card:
"from the darkroom" label 10px uppercase aged gold
Example strips in B&W with grain

Annotation: "react-webcam + canvas API —
AI filter processing built in Cursor"

South Congress Hotel vibe:
Warm, intimate, slightly glamorous
Like stepping into a dimly lit photo booth
on South Congress at 10pm

---

### /coffee → What's Your Order?

A fun interactive coffee builder — Papa's Freezeria
meets actual coffee enthusiasm.
Users build their order, submit, Iris gets notified.

Goal: learn about visitors in a fun, human way.
Not analytics — just vibes and connection.

Background: warm cream #FDF8F0
Soft watercolor coffee-colored splashes (amber/brown tones)

Floating card aesthetic:
- Width: 560px, border-radius: 20px
- Background: #FFFFFF
- macOS dots top-left
- Subtle coffee cup steam animation somewhere

Card contents (build your order):

Title: "What's Your Order?" — 22px weight 300
Subtitle: "tell me what you're having ☕"
11px weight 300 #888

Step 1 — Base:
Visual selector with illustrations:
Espresso · Americano · Latte · Cappuccino ·
Cold Brew · Matcha · Tea
Each as a small illustrated card, tap to select
Active: IHWN gradient border

Step 2 — Milk:
Pill selectors:
Oat · Almond · Whole · Skim · None
Active: filled IHWN gradient pill

Step 3 — Extras (multi-select):
Small checkboxes or toggles:
Extra shot · Vanilla · Cinnamon · Caramel ·
Hazelnut · Brown sugar · Lavender · No sugar

Step 4 — Temperature:
Toggle: Hot ☀️ / Iced 🧊

Step 5 — Your name:
Text input: "your name (or alias)"
Geist Sans, 13px, soft border

Submit button:
"place my order →"
IHWN gradient background, #FFFFFF text
Border-radius: 999px

After submit:
Friendly confirmation message fades in:
"order received! ☕ iris will be right with you."
(Iris gets email/notification with the order)

Backend annotation:
"form submission → EmailJS or Formspree
sends to Iris's email — built in Cursor"

Fun copy throughout:
Each step has a small playful label
Feels warm, quirky, very Iris

---

## Iris's Content

Name: Iris Wang
School: UT Austin · Advertising + CS · 2027
Minors: CS · Design Strategies · Entrepreneurship
Email: iriswang32@gmail.com
Status: open to summer 2026 internships · anywhere
Location: Austin, TX (New York soon)
Footer drink: americanos ☕
Footer text: "Built with Next.js & americanos ☕"
Footer CTA: "Let's talk!"

---

## Humanity Details
- Hand-drawn watercolor logo mark → /public/images/lotus-logo.png
  Use next/image, 32px tall in nav, auto width
  Alt text: "Iris Wang logo"
  Never generate SVG — always use this PNG
- Watercolor splashes throughout site (not just hero)
- About photo: 1.5° polaroid tilt
- "americanos ☕" in footer
- Fun Facts voice: personal, surprising, punchy
- Kaizen as design philosophy
- The Booth: South Congress Hotel intimacy
- Coffee Order: learning about visitors through joy
- Museum of Art: just the art, nothing else
- Emotion picker: sunrise animation, meets user where they are
- Dark mode background: #0A0A0A solid, no gradient

---

## Phase 2 (future)
- /thoughts → Blog / Reading Room
- AI Fact Check app concept

---

## Cursor / Claude Code Build Notes

Logo: always use /public/images/lotus-logo.png
Never generate SVG or any other logo mark.
Use next/image component everywhere.

Animations (Framer Motion):
- Emotion picker: sunrise ink drop animation (build last)
  white → ink drop falls → color fills upward → question appears
- Loading screen: emotion color fill + text + dots
- Dark mode: CSS variables swap 0.6s
- Rotating hero text: AnimatePresence 2.5s
- Card hover: scale(0.97) spring + desc fade below card
- Modal: fade + scale + backdrop blur
- Museum: useScroll horizontal
- Record player: CSS rotate + AnimatePresence album swap
- Booth: react-webcam + canvas filter processing
- Coffee builder: step animation + submit confirmation
- Watercolor blobs: slow drifting radial gradients

Content (Sanity CMS):
- Books, music rotation, fun facts, quotes
- Case studies with password protection
- Experience orgs and projects
- "currently building" toggle per case study

Tech stack:
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Sanity CMS
- Vercel
- PostHog (analytics)
- EmailJS/Formspree (coffee order submissions)
- react-webcam (The Booth)
- Geist Sans (next/font)