# ParcelVest Website – Product Requirements Document

## 📍 Project Overview

A professionally built, hard-coded, high-converting informational website for **ParcelVest**, a Florida-based land acquisition company. We specialize in helping absentee and overwhelmed landowners get relief from burdensome property ownership — including inherited parcels, tax-draining land, or lots locked in restrictive zoning or development hurdles. We offer fast, fair, and discreet acquisitions.

---

## ⚙️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js + Express (optional for form handling)
- **Styling**: Custom CSS with variables for branding
- **Fonts**: Montserrat, Inter (Google Fonts)
- **Deployment**: Static files or Node.js server

---

## 🧬 Brand Identity

### Core Values

- **Trust**: $100M+ in land transactions over 30+ years
- **Simplicity**: A clear, no-hassle process
- **Speed**: 48-hour offers, 7-day closings
- **Discretion**: Professional and private communication
- **Relief**: We solve problems most buyers avoid
- **Transparency**: No hidden fees, ever

### Visual Identity

- **Primary Colors**:
  - Deep Forest Green `#1F3D1B`
  - Sandstone Beige `#E8DCC2`
  - Slate Gray `#4A4A4A`
- **Accent Colors**:
  - Copper `#B87333`
  - Gold `#FFD700`

### Typography

- **Headers**: Montserrat, sans-serif
- **Body**: Inter, Helvetica, Arial, sans-serif

### Brand Voice

- Calm, clear, and professional
- Empathetic to life events and financial stress
- Focused on solutions, not hard-selling
- Emphasizes relief, trust, and simplicity

---

## 🧭 Page Structure

### 1. Hero Section

- Headline: **"Your Land. Our Solution."**
- Subheadline: Emphasizes relief from unwanted land burdens
- Dual CTAs: **[Get Your Offer]** and **[How It Works]**
- Full-width Florida land imagery with slight motion

### 2. How It Works

- 4-step visual journey (Inquiry → Offer → Closing → Payment)
- 1-2 sentence explanations per step
- Set expectations clearly

### 3. Why ParcelVest

- Backed by $100M+ in land deals
- 6 core differentiators (speed, discretion, simplicity, etc.)
- Trust indicators (experience, credentials)

### 4. Landowner Scenarios We Solve

- Inherited property you don’t want
- “Alligator” parcels draining taxes or HOA fees
- Zoning nightmares
- Government resistance to development
- Out-of-state or absentee ownership
- Family disputes or title tangles

### 5. Testimonials

- 3 highly relatable landowner success stories
- Includes names, counties, and their situations
- Images optional, real tone prioritized

### 6. FAQ Section

- 6 high-intent questions answered
- Accordion design with smooth UX
- Covers objections, e.g., “How fast?”, “Do I need a lawyer?”, “What if I owe taxes?”

### 7. Contact Form

- First Name, Last Name, Email, Phone, Parcel Zip (minimum)
- POST to `/webhook/audiencelab-cdp`
- Confirmation message and next-step transparency

---

## 🔧 Technical Features

### Form Integration

- Sends lead data to `/webhook/audiencelab-cdp`
- Includes email, phone, zip, and SHA256 hash fields if available
- Triggers Claude scoring (landowner lead qualification)
- Includes spam prevention (honeypot or captcha)

### SEO Optimization

- Proper semantic HTML5 tags
- Title, meta description, OG: tags, Twitter card
- JSON-LD schema for LocalBusiness and FAQ
- Alt text on every image
- Keyword targeting for:
  - "Sell land Florida"
  - "Get offer for vacant lot"
  - "Sell inherited land"

### Performance

- Mobile-first responsive layout
- <picture> and srcset support for responsive image loading
- SVG icons and optimized PNG/JPEGs
- CSS transitions for subtle motion
- Load time under 3 seconds on 4G

### Accessibility

- WCAG 2.1 AA compliance minimum
- Keyboard navigable
- Proper heading hierarchy
- ARIA roles for FAQs, forms
- Sufficient color contrast

### Future Integrations

- Claude AI live chat placeholder
- Supabase backend connector (hook ready)
- Meta Pixel and Google Analytics
- A/B test structure for CTAs
- API gateway for internal parcel review engine

---

## 🗂️ File Structure

/projects/ParcelVest Website/
├── index.html # Main landing page
├── server.js # Node.js Express server (optional)
├── package.json # NPM dependencies
├── /assets/
│ └── /images/
│ ├── logo.svg
│ └── hero-land.jpg
├── /styles/
│ └── main.css # Custom theming
├── /scripts/
│ └── main.js # JS for form, nav, animations
└── project.prd.md # This document

yaml
Copy
Edit

---

## 🚀 Deployment Options

### Static Hosting

1. Upload `/index.html` and assets to static host (e.g., Netlify, Vercel)
2. Use a third-party form handler like Formspree or your webhook server

### Node.js Hosting

1. `npm install`
2. `npm start`
3. Server runs on `localhost:3000`
4. Handles POSTs from contact form

---

## 🔁 Maintenance Notes

- Update testimonials at least quarterly
- Monitor `/webhook/audiencelab-cdp` logs weekly
- Audit SEO tags monthly
- A/B test hero CTA copy 2x per quarter

---

## 📈 Success Metrics

- **Form Submission Rate** ≥ 3%
- **Mobile Lighthouse Score** ≥ 95
- **Page Load Time** ≤ 3s
- **Bounce Rate** ≤ 50%
- **Top 5 ranking** for "sell land Florida" keyword cluster
- **Claude Score** engagement tracking weekly

---

## 🔗 Connected Systems

This website is integrated into the broader **Florida Land Acquisition & Developer Disposition Engine**:

- 📬 **Webhook**: `/webhook/audiencelab-cdp`
- 🤖 **Claude Lead Scoring**: Triggered post-ingest
- 🗃️ **Supabase**: Stores and maps leads to ZIP and parcel ID
- 📊 **AudienceLab CDP**: Enables retargeting and matchback

---

## 📇 Contact

All inquiries about this website should be directed to the **ParcelVest Development Team**.