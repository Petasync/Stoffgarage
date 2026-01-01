# Stoffgarage - Premium Website

Eine moderne, hochperformante Next.js Website für Premium Autoabdeckungen mit 3D-Visualisierung, Animationen und interaktiven Features.

## ✨ Features

- 🎨 **3D Visualisierung** - Three.js powered 3D-Modelle
- 🔄 **360° Produktansichten** - Interaktive Produktdarstellung
- 🎬 **Smooth Animations** - GSAP & Framer Motion
- 📱 **Mobile-First Design** - Vollständig responsive
- ⚡ **Optimale Performance** - Next.js 14 mit Static Export
- 🎯 **SEO-Optimiert** - Meta Tags, Open Graph, Schema.org
- 🌙 **Dark Theme** - Premium dunkles Design mit Glassmorphismus
- 🚀 **Schnelle Ladezeiten** - Code Splitting, Lazy Loading

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
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root Layout mit SEO
│   ├── page.tsx           # Homepage
│   └── globals.css        # Globale Styles
├── components/            # React Komponenten
│   ├── Hero.tsx          # Hero Section mit 3D
│   ├── Navigation.tsx    # Haupt-Navigation
│   ├── ProductCard.tsx   # Produkt-Karten
│   └── Footer.tsx        # Footer
├── public/               # Statische Assets
│   ├── images/          # Bilder
│   └── models/          # 3D Modelle
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

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
