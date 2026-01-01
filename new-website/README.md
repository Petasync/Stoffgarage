# Stoffgarage - Premium Website

Eine moderne, hochperformante Next.js Website für Premium Autoabdeckungen mit 3D-Visualisierung, Animationen und interaktiven Features.

## ✨ Features

### Hauptfeatures:
- 🎨 **3D Auto-Konfigurator** - Interaktive Echtzeit-Konfiguration mit Three.js
- 🔄 **360° Produktviewer** - Drag-to-Rotate mit Auto-Rotation und Zoom
- 📱 **AR Vorschau** - Augmented Reality Preview mit QR-Code für Mobile
- ⭐ **Kunden-Bewertungen** - Verifizierte Reviews mit Filter-Funktion
- 🎬 **Smooth Animations** - GSAP & Framer Motion überall
- 🌙 **Premium Dark Theme** - Glassmorphismus & Neumorphismus Design

### Technische Features:
- 📱 **Mobile-First Design** - Vollständig responsive (320px - 4K)
- ⚡ **Optimale Performance** - 421 KB First Load, Static Export
- 🎯 **SEO-Optimiert** - Meta Tags, Open Graph, Schema.org
- 🚀 **Schnelle Ladezeiten** - Code Splitting, Lazy Loading, Image Optimization
- 🎨 **Custom Design System** - Tailwind mit Custom Colors & Animations
- 🔒 **Type-Safe** - TypeScript 5 mit strikter Konfiguration

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.3
- **Animations:** Framer Motion, GSAP
- **3D Graphics:** Three.js, @react-three/fiber, @react-three/drei
- **Deployment:** Static Export für Kundenserver

## 📦 Installation

### Voraussetzungen

- Node.js 18+ installiert
- npm oder yarn Package Manager

### Setup

1. **Dependencies installieren:**
```bash
cd new-website
npm install
```

2. **Development Server starten:**
```bash
npm run dev
```

Die Website ist dann verfügbar unter: `http://localhost:3000`

## 🚀 Build & Deployment

### Lokaler Build

```bash
npm run build
```

Dies erstellt einen optimierten Static Export im `out/` Ordner.

### Deployment auf Kundenserver

1. **Build erstellen:**
```bash
npm run build
```

2. **`out/` Ordner auf Server hochladen:**
```bash
# Via FTP, SFTP oder rsync
rsync -avz out/ user@server:/var/www/stoffgarage/
```

3. **Webserver konfigurieren** (Nginx Beispiel):
```nginx
server {
    listen 80;
    server_name stoffgarage.de www.stoffgarage.de;
    root /var/www/stoffgarage;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache statische Assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|webp|avif)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 📁 Projektstruktur

```
new-website/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root Layout mit SEO Metadata
│   ├── page.tsx                 # Homepage mit allen Sections
│   └── globals.css              # Globale Styles (Glassmorphism, Neumorphism)
├── components/                  # React Komponenten
│   ├── Hero.tsx                # Hero Section mit 3D Auto
│   ├── Navigation.tsx          # Desktop + Mobile Navigation
│   ├── ProductCard.tsx         # Produkt-Karten (4 Linien)
│   ├── Configurator.tsx        # 3D Auto-Konfigurator
│   ├── CarScene3D.tsx          # 3D Szene für Konfigurator
│   ├── Product360Viewer.tsx    # 360° Drag-to-Rotate Viewer
│   ├── ARPreview.tsx           # AR Vorschau mit QR-Code
│   ├── Reviews.tsx             # Kunden-Bewertungen System
│   ├── OptimizedImage.tsx      # Image Optimization Helper
│   └── Footer.tsx              # Footer mit Newsletter
├── public/                      # Statische Assets
│   ├── images/                 # Produkt-Bilder
│   └── models/                 # 3D Modelle (.glb/.gltf)
├── package.json                 # Dependencies
├── postcss.config.js           # PostCSS Config
├── tailwind.config.ts          # Tailwind Custom Theme
├── tsconfig.json               # TypeScript Config
├── next.config.js              # Next.js Static Export Config
└── README.md                   # Diese Datei
```

## 📦 Komponenten-Übersicht

### Haupt-Komponenten:
- **Hero.tsx** - 3D Hero mit Three.js Auto-Modell, Parallax, GSAP Animationen
- **Configurator.tsx** - Interaktiver Konfigurator mit Echtzeit-Preisberechnung
- **Product360Viewer.tsx** - 360° Produktansicht mit Drag, Zoom, Auto-Rotation
- **ARPreview.tsx** - AR UI mit Kamera-Simulation und QR-Code Modal
- **Reviews.tsx** - Review-System mit Filtern und Star-Ratings

### Helper-Komponenten:
- **Navigation.tsx** - Sticky Nav mit Blur-Effekt, Hamburger-Menü
- **ProductCard.tsx** - Neomorph Cards mit Hover-Effekten
- **CarScene3D.tsx** - 3D Szene für Konfigurator (separiert für Performance)
- **OptimizedImage.tsx** - Lazy Loading mit Skeleton und Error Handling
- **Footer.tsx** - Footer mit Newsletter, Social Links, Sitemap

## 🎨 Design System

### Farben

- **Primary:** Blue (#0ea5e9 - #0369a1)
- **Dark:** Navy/Charcoal (#0f172a - #334155)
- **Gold:** Akzentfarbe (#f59e0b - #d97706)

### Typografie

- **Body:** Inter
- **Display/Headlines:** Poppins

### Animationen

- `fade-in` - Sanftes Einblenden
- `slide-up` - Von unten einsliden
- `float` - Schwebende Elemente
- `glow` - Leuchteffekt

### Utilities

- `.glass` - Glassmorphismus Hell
- `.glass-dark` - Glassmorphismus Dunkel
- `.neomorph` - Neumorphismus Effekt
- `.gradient-text` - Gradient Text
- `.btn-3d` - 3D Button Effekt

## 🔧 Konfiguration

### SEO

SEO-Einstellungen in `app/layout.tsx`:
- Meta Tags
- Open Graph
- Twitter Cards
- Robots.txt

### Performance

Performance-Optimierungen in `next.config.js`:
- Image Optimization (AVIF, WebP)
- Compression
- Static Export
- Code Splitting

## 📝 Scripts

```bash
# Development
npm run dev          # Dev Server mit Hot Reload

# Production
npm run build        # Production Build
npm start           # Production Server (nur für Vercel)

# Linting
npm run lint        # ESLint Check
```

## 🎯 Next Steps

### Geplante Features

1. ✅ Hero Section mit 3D
2. ✅ Navigation (Desktop + Mobile)
3. ✅ Produktseiten
4. 🔄 Auto-Konfigurator (in Entwicklung)
5. 📋 360° Produktviewer
6. 📱 AR Feature
7. ⭐ Kunden-Bewertungen
8. 📊 Analytics Integration

### Performance Ziele

- PageSpeed Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Lighthouse Score: 90+

## 🐛 Troubleshooting

### Build Fehler

```bash
# Cache löschen
rm -rf .next out node_modules
npm install
npm run build
```

### Port bereits in Verwendung

```bash
# Anderen Port nutzen
PORT=3001 npm run dev
```

## 📞 Support

Bei Fragen oder Problemen:
- GitHub Issues erstellen
- E-Mail: support@stoffgarage.de

## 📄 Lizenz

© 2025 Stoffgarage. Alle Rechte vorbehalten.
