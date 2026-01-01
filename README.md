# STOFFGARAGE - Premium Fahrzeugabdeckungen

Moderne, professionelle Website für STOFFGARAGE - Ihr Experte für Premium Fahrzeugabdeckungen.

## 🚀 Features

- **Dunkles, modernes Design** - Professionelles Schwarz/Dunkelblau Theme
- **Voll responsiv** - Optimiert für Desktop, Tablet und Mobile
- **Produkt-Konfigurator** - Interaktiver Konfigurator für alle Produktkategorien
- **SEO-optimiert** - Meta-Tags, Sitemap, strukturierte Daten
- **Performance** - Schnelle Ladezeiten, optimierte Assets
- **Accessibility** - WCAG-konform, semantisches HTML

## 📁 Projektstruktur

```
stoffgarage/
├── index.html                  # Homepage
├── auto.html                   # Auto-Abdeckungen mit Konfigurator
├── van.html                    # Van-Abdeckungen
├── pickup.html                 # Pickup-Abdeckungen
├── wohnmobil.html             # Wohnmobil-Abdeckungen
├── hagelschutz.html           # Hagelschutz-Produkte
├── ueber-uns.html             # Über uns Seite
├── faq.html                   # FAQ mit Accordion
├── kontakt.html               # Kontaktformular
├── impressum.html             # Impressum
├── datenschutz.html           # Datenschutzerklärung
├── agb.html                   # AGB
├── assets/
│   ├── css/
│   │   └── style.css          # Haupt-Stylesheet
│   ├── js/
│   │   ├── main.js            # Haupt-JavaScript
│   │   ├── products.js        # Produktdatenbank
│   │   └── configurator.js    # Konfigurator-Logik
│   └── images/
│       └── logo.svg           # STOFFGARAGE Logo
├── sitemap.xml                # Sitemap für SEO
└── robots.txt                 # Robots.txt
```

## 🛠 Technologie-Stack

- **HTML5** - Semantisches, valides HTML
- **CSS3** - Custom CSS mit CSS Variables
- **Tailwind CSS** - Utility-First CSS Framework (via CDN)
- **Vanilla JavaScript** - Keine Frameworks, pure Performance
- **Google Fonts** - Inter Font Family
- **SVG Icons** - Lucide Icons / Heroicons

## 📦 Deployment auf Hetzner

### Voraussetzungen

- Hetzner Webhosting oder Server mit Apache/Nginx
- FTP/SFTP Zugang
- Domain (z.B. stoffgarage.de)

### Deployment-Schritte

#### Option 1: FTP Upload

1. Verbinden Sie sich via FTP mit Ihrem Hetzner Hosting:
   ```
   Host: ftp.ihre-domain.de
   Benutzer: Ihr FTP-Benutzername
   Passwort: Ihr FTP-Passwort
   Port: 21 (oder 22 für SFTP)
   ```

2. Navigieren Sie zum Web-Root-Verzeichnis (meist `/` oder `/httpdocs`)

3. Laden Sie alle Dateien hoch:
   - Alle HTML-Dateien
   - `/assets/` Ordner komplett
   - `sitemap.xml`
   - `robots.txt`

4. Setzen Sie korrekte Dateiberechtigungen:
   - HTML-Dateien: 644
   - Ordner: 755
   - CSS/JS-Dateien: 644

#### Option 2: Git Deployment

1. SSH-Zugang zu Ihrem Server:
   ```bash
   ssh username@ihre-domain.de
   ```

2. Navigieren Sie zum Web-Root:
   ```bash
   cd /var/www/html
   # oder
   cd /usr/share/nginx/html
   ```

3. Repository klonen:
   ```bash
   git clone https://github.com/IhrUsername/stoffgarage.git .
   ```

4. Dateiberechtigungen setzen:
   ```bash
   find . -type f -exec chmod 644 {} \;
   find . -type d -exec chmod 755 {} \;
   ```

### Apache Konfiguration

Erstellen oder bearbeiten Sie die `.htaccess` Datei:

```apache
# Enable Rewrite Engine
RewriteEngine On

# Redirect to HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove .html extension
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}\.html -f
RewriteRule ^(.*)$ $1.html [L]

# Custom Error Pages
ErrorDocument 404 /404.html

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

## 🔧 Konfiguration

### Analytics Integration

1. **Google Analytics** einrichten:
   - In `assets/js/main.js` Zeile ~120 finden
   - Ihr Tracking-ID einsetzen: `G-XXXXXXXXXX`
   - Kommentar entfernen

2. **Microsoft Clarity** einrichten:
   - In `assets/js/main.js` Zeile ~128 finden
   - Ihre Project-ID einsetzen
   - Kommentar entfernen

### EmailJS Konfiguration

Für das Kontaktformular:

1. Account erstellen auf [EmailJS](https://www.emailjs.com/)
2. Service und Template einrichten
3. In `assets/js/main.js` Zeile ~80 IDs einsetzen:
   ```javascript
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
   ```

### Produktdaten aktualisieren

Produktdaten befinden sich in `assets/js/products.js`:

```javascript
const products = {
  auto: [...],    // Auto-Abdeckungen
  van: [...],     // Van-Abdeckungen
  pickup: [...],  // Pickup-Abdeckungen
  wohnmobil: [...],  // Wohnmobil-Abdeckungen
  hagelschutz: [...]  // Hagelschutz
};
```

## 🎨 Design-System

### Farben

```css
--bg-primary: #0a0a0a;      /* Haupthintergrund */
--bg-secondary: #1a1a1a;    /* Sekundärer Hintergrund */
--bg-card: #0f0f0f;         /* Card-Hintergrund */
--border-color: #2a2a2a;    /* Rahmenfarbe */
--text-primary: #ffffff;    /* Haupttext */
--text-secondary: #a0a0a0;  /* Sekundärtext */
--accent-primary: #3b82f6;  /* Primär-Akzent (Blau) */
--accent-dark: #1e3a8a;     /* Dunkles Blau */
--accent-light: #60a5fa;    /* Helles Blau */
```

### Typografie

- **Schriftart**: Inter (Google Fonts)
- **Größen**: 16px base, responsive scaling

## 📱 Browser-Support

- Chrome/Edge (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Mobile Safari/Chrome

## ⚡ Performance-Optimierung

- **Lazy Loading** für Bilder aktiviert
- **CSS/JS Minifizierung** empfohlen für Production
- **CDN** für Tailwind CSS und Google Fonts
- **Caching** via .htaccess konfiguriert

### Minifizierung

Für Production empfohlen:

```bash
# CSS minifizieren
npx cssnano assets/css/style.css assets/css/style.min.css

# JS minifizieren
npx terser assets/js/main.js -o assets/js/main.min.js
npx terser assets/js/configurator.js -o assets/js/configurator.min.js
npx terser assets/js/products.js -o assets/js/products.min.js
```

## 🔒 Sicherheit

- HTTPS erzwungen via .htaccess
- XSS-Schutz aktiv
- CSRF-Schutz für Formulare empfohlen
- Sichere HTTP-Header gesetzt

## 📝 Rechtliche Seiten

**WICHTIG**: Die Seiten `impressum.html`, `datenschutz.html` und `agb.html` enthalten Platzhaltertexte.

Vor dem Go-Live MÜSSEN diese mit Ihren rechtlichen Daten aktualisiert werden:
- Firmenadresse
- Handelsregisternummer
- USt-IdNr.
- Kontaktdaten
- Datenschutzbeauftragter
- Cookie-Richtlinien

Nutzen Sie Generatoren wie:
- [eRecht24](https://www.e-recht24.de)
- [Datenschutz-Generator](https://datenschutz-generator.de)

## 🚀 Go-Live Checklist

- [ ] Alle Produktdaten aktualisiert
- [ ] Analytics-IDs eingetragen
- [ ] EmailJS konfiguriert
- [ ] Impressum ausgefüllt
- [ ] Datenschutzerklärung ausgefüllt
- [ ] AGB ausgefüllt
- [ ] Kontaktdaten aktualisiert
- [ ] Domain auf Server geleitet
- [ ] SSL-Zertifikat installiert
- [ ] .htaccess konfiguriert
- [ ] Google Search Console eingerichtet
- [ ] Sitemap bei Google eingereicht
- [ ] Alle Links getestet
- [ ] Mobile Ansicht getestet
- [ ] Formular-Funktionalität getestet

## 📧 Support & Kontakt

Bei Fragen zum Deployment oder der Website:
- **E-Mail**: dev@stoffgarage.de
- **Tel**: +49 (0) 123 456789

## 📄 Lizenz

Copyright © 2026 STOFFGARAGE. Alle Rechte vorbehalten.

---

**Version**: 1.0.0
**Letzte Aktualisierung**: 01.01.2026
**Entwickelt mit** ❤️ **für STOFFGARAGE**
