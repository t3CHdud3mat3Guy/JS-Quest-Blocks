# JS Quest Blocks

A kid-friendly, Scratch-like JavaScript learning game where children build block programs to help a character reach a coin.

## Features
- Click-to-build block code workspace.
- Teaches sequence, functions, loops, and conditionals.
- Animated game stage with instant feedback.
- Local best-score tracking.

## Run in browser
Open `index.html` directly.

## Build a Windows `.exe`
This project is configured with Electron + electron-builder so you can package it as a downloadable executable.

### 1) Install dependencies
```bash
npm install
```

### 2) Launch desktop app (optional)
```bash
npm start
```

### 3) Build `.exe` artifacts
```bash
npm run pack:win
```

Generated files will appear in `dist/` (for example NSIS installer `.exe` and portable `.exe`).
