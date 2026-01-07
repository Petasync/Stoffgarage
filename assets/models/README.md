# 3D-Modelle Verzeichnisstruktur

Dieses Verzeichnis enthält die 3D-Modelle für den interaktiven Fahrzeug-Viewer.

## Verzeichnisstruktur

```
assets/models/
├── cars/           # Fahrzeug-Modelle nach Karosserie-Typ
│   ├── sedan.glb       # Limousine (3er BMW, Mercedes C-Klasse, etc.)
│   ├── hatchback.glb   # Kleinwagen (VW Polo, Golf, Fiat 500, etc.)
│   ├── wagon.glb       # Kombi (Passat Variant, Octavia Combi, etc.)
│   ├── suv.glb         # SUV (VW Tiguan, Audi Q3, BMW X3, etc.)
│   ├── van.glb         # Van (VW Multivan, Mercedes V-Klasse, etc.)
│   └── pickup.glb      # Pickup (VW Amarok, Ford Ranger, etc.)
└── covers/         # Abdeckungen (optional - werden aktuell prozedural generiert)
    └── standard.glb    # Standard-Abdeckung
```

## Dateiformat

**Empfohlenes Format:** `.glb` (Binary glTF)
- Komprimiertes Format
- Schnelles Laden
- Alle Texturen und Materialien in einer Datei

**Alternative:** `.gltf` (JSON glTF)
- Lesbar für Debugging
- Separate Texturen-Dateien möglich

## Modell-Anforderungen

### Technische Spezifikationen:
- **Polycount:** Max. 50.000 Dreiecke pro Modell
- **Texturen:** Max. 2048x2048px
- **Pivot Point:** Boden-Mitte (0,0,0)
- **Einheit:** 1 Unit = 1 Meter (Auto sollte ca. 4-5 Units lang sein)
- **Ausrichtung:** Front zeigt zu +Z Achse

### Materialien:
- PBR (Physically Based Rendering) Materialien verwenden
- Metallic-Roughness Workflow
- Farben: Neutral/Grau für Fahrzeuge (werden später farbig angezeigt)

### Optimierung:
- Geometrie optimieren (Decimate Modifier in Blender)
- Texturen komprimieren
- Unnötige Vertices entfernen
- LOD (Level of Detail) optional

## Lazy Loading

Die 3D-Modelle werden **nur bei Bedarf** geladen:
1. Nutzer wählt ein Fahrzeug aus
2. System ermittelt den Karosserie-Typ (bodyType)
3. Entsprechendes 3D-Modell wird vom Server geladen
4. Modell wird im Browser gecacht

**Vorteil:** Schnelle initiale Ladezeit, nur benötigte Modelle werden geladen.

## Fallback-System

Wenn ein 3D-Modell nicht gefunden wird:
- System verwendet automatisch ein **Platzhalter-Modell** (generiert mit Three.js)
- Funktionalität bleibt erhalten
- Keine Fehlermeldungen für den Nutzer

## Erstellung von 3D-Modellen

### Empfohlene Software:
- **Blender** (kostenlos, Open Source)
- **Maya**
- **3ds Max**

### Export-Einstellungen (Blender):
1. File → Export → glTF 2.0
2. Format: glTF Binary (.glb)
3. Include: Selected Objects
4. Transform: +Y Up
5. Geometry: Apply Modifiers, Compression

### Beispiel-Workflow (Blender):
```
1. Auto-Modell importieren/erstellen
2. Material anwenden (PBR)
3. Geometrie optimieren (Polycount reduzieren)
4. Pivot auf Boden-Mitte setzen
5. Export als .glb
6. In assets/models/cars/ speichern
```

## Karosserie-Typen (bodyType)

| bodyType   | Beschreibung              | Beispiele                          |
|------------|---------------------------|------------------------------------|
| sedan      | Limousine (Stufenheck)    | BMW 3er, Mercedes C-Klasse, Audi A4 |
| hatchback  | Kleinwagen/Kompakt        | VW Polo, Golf, Fiat 500           |
| wagon      | Kombi                     | Passat Variant, Octavia Combi     |
| suv        | SUV/Geländewagen          | BMW X3, Audi Q5, VW Tiguan        |
| van        | Van/Kleinbus              | VW Multivan, Mercedes V-Klasse    |
| pickup     | Pickup-Truck              | VW Amarok, Ford Ranger            |

## Testing

Nach dem Hinzufügen neuer Modelle:
1. Browser-Cache leeren
2. Fahrzeug auf der Website auswählen
3. Prüfen ob Modell korrekt lädt
4. Rotation und Zoom testen
5. Abdeckungs-Toggle testen

## Performance-Tipps

### Server-Seite:
- **Gzip-Kompression** für .glb Dateien aktivieren
- **CDN** verwenden für schnellere Downloads
- **Cache-Headers** setzen (lange Ablaufzeit)

### Modell-Optimierung:
- Texturen im **WebP** oder **JPEG** Format
- **Draco-Kompression** für Geometrie (optional)
- Modelle unter **2 MB** pro Datei halten

## Lizenz & Quellen

**Wichtig:** Nur lizenzfreie oder eigene 3D-Modelle verwenden!

Kostenlose 3D-Modell-Quellen:
- **Sketchfab** (mit Free-Lizenz filtern)
- **TurboSquid Free**
- **CGTrader Free**
- **BlendSwap**

Kommerzielle Quellen:
- **TurboSquid**
- **CGTrader**
- **Envato 3D Models**

## Roadmap

Geplante Erweiterungen:
- [ ] Hochauflösende Modelle für Desktop
- [ ] LOD-System (niedrige Auflösung für Mobile)
- [ ] Farbvarianten für Fahrzeuge
- [ ] Animierte Abdeckung (auf-/zuziehen)
- [ ] Echtzeit-Schatten und Reflexionen
- [ ] Material-Wechsel (verschiedene Abdeckungs-Qualitäten)

## Support

Bei Fragen zur 3D-Modell-Integration:
- Dokumentation: `/docs/3d-viewer.md`
- Code: `/assets/js/viewer-360-3d.js`
