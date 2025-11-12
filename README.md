# Telekom Azubi/Studis ReDesign

Eine moderne Bewerbungsplattform für Telekom-Azubis und dual Studierende, erstellt mit React, TypeScript, Vite und Tailwind CSS.

**Domain:** [telekom.abdullahu-adrian.de](https://telekom.abdullahu-adrian.de)  
**Vercel:** [schueler-telekom-de-redesign.vercel.app](https://schueler-telekom-de-redesign.vercel.app)

## Features

- 🎨 Modernes Design im Telekom-Stil
- 📱 Vollständig responsive
- 🔒 Sichere Login-Funktionalität
- ♿ Barrierefreie Implementierung
- 🎯 TeleNeo Schriftart integriert
- 🖼️ Telekom Logo eingebunden
- 🚀 Vierstufiger Bewerbungs-Wizard
- 📋 Bewerber-Profil-Verwaltung
- 🎉 Raketen-Animation beim Absenden
- 📊 Dashboard mit Bewerbungsübersicht

## Technologie-Stack

- **React 18** - UI Framework
- **TypeScript** - Typsicherheit
- **Vite** - Build Tool
- **Tailwind CSS** - Styling Framework
- **TeleNeo** - Telekom Schriftart

## Installation

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Production Build erstellen
npm run build

# Production Build preview
npm run preview
```

## Projektstruktur

```
├── src/
│   ├── components/
│   │   └── LoginForm.tsx    # Haupt-Login-Komponente
│   ├── App.tsx              # Haupt-App-Komponente
│   ├── main.tsx             # Entry Point
│   └── index.css            # Globale Styles & Font-Definitionen
├── dl-telekom-logo-01.jpg   # Telekom Logo
├── index.html               # HTML Template
└── package.json             # Dependencies
```

## Design

Die Seite folgt den Telekom Design Guidelines:
- Telekom Magenta (#E20074) als Hauptfarbe
- TeleNeo Schriftart für alle Texte
- Moderne, benutzerfreundliche UI
- Responsive Design für alle Geräte

## Deployment auf Vercel

Das Projekt ist für Vercel optimiert und kann einfach deployed werden:

### Option 1: Via Vercel CLI
```bash
# Vercel CLI installieren (falls nicht vorhanden)
npm i -g vercel

# Projekt deployen
vercel
```

### Option 2: Via GitHub Integration
1. Projekt auf GitHub pushen
2. Auf [vercel.com](https://vercel.com) anmelden
3. "New Project" erstellen
4. GitHub Repository auswählen
5. Vercel erkennt automatisch Vite und konfiguriert das Projekt

### Option 3: Via Vercel Dashboard
1. Auf [vercel.com](https://vercel.com) anmelden
2. "New Project" erstellen
3. Repository importieren oder manuell hochladen
4. Build-Einstellungen werden automatisch erkannt

**Vercel-Konfiguration:**
- Framework: Vite (automatisch erkannt)
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Lizenz

© 2024 Deutsche Telekom AG

