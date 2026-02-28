# JS Quest Blocks Pro

A Scratch-like JavaScript game for kids **and** a deeper JavaScript playground for teens/adults.

## Why Vite (not Webpack) in this project
You asked to pick one: this project uses **Vite** for modern JavaScript development speed and a clean setup.

- Fast dev server (`npm run dev`)
- Easy module-based code (`src/main.js`)
- Works with the current Electron + electron-builder packaging flow

## Windows 11 quick start
Open **PowerShell** in the project folder and run:

```powershell
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Run as desktop app (Electron)
```powershell
npm install
npm start
```

## Build Windows `.exe`
```powershell
npm install
npm run pack:win
```

Artifacts are generated in `dist/`.

## Learning modes included
- **Blocks mode**: sequence, loops, conditionals, function calls, async wait.
- **Code Playground**: free-form editor where you can run any JavaScript snippet, use templates, and keep code saved in localStorage.

## Playground features
- Loadable templates: starter, arrays, objects, classes, async/await.
- One-click run and output console.
- Output clear/reset controls.
- Auto-save of your current code draft.

## Optional one-click Windows build
```bat
scripts\build-windows.bat
```

## CI workflows
- `.github/workflows/build-windows-exe.yml` for artifact builds
- `.github/workflows/release-windows-exe.yml` for tag-based release publishing

## GitHub Pages site
A Pages deployment workflow is included at `.github/workflows/deploy-pages.yml`.

### One-time GitHub setup
1. Push this repo to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, set **Source = GitHub Actions**.

### Deploy
- Push to `main` (or run the workflow manually in **Actions**).
- The site is built with Vite and deployed from `dist/`.
- Your URL will be: `https://<your-username>.github.io/<repo-name>/`.

