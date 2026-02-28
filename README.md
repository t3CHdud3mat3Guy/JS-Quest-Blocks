# JS Quest Blocks

A kid-friendly, Scratch-like JavaScript learning game where children build block programs to help a character reach a coin.

## Features
- Click-to-build block code workspace.
- Teaches sequence, functions, loops, and conditionals.
- Animated game stage with instant feedback.
- Local best-score tracking.

## Run in browser
Open `index.html` directly.

## Build a Windows `.exe` locally
This project uses Electron + electron-builder so you can package a downloadable executable.

### Option A: One-click Windows script
On Windows, double-click:

```bat
scripts\build-windows.bat
```

### Option B: Manual commands
```bash
npm install
npm start
npm run pack:win
```

Generated files will appear in `dist/` (NSIS installer `.exe` and portable `.exe`).

## Download `.exe` from GitHub Actions
A CI workflow is included at `.github/workflows/build-windows-exe.yml`.

1. Push this repository to GitHub.
2. Open the **Actions** tab.
3. Run **Build Windows EXE** (or push to your main branch).
4. Download the artifact named **JS-Quest-Blocks-Windows**.
5. Extract it to get the generated `.exe` files.

## Publish direct `.exe` downloads via GitHub Releases
A release workflow is included at `.github/workflows/release-windows-exe.yml`.

1. Push a version tag (example: `v1.0.0`).
2. GitHub Actions will build Windows executables.
3. A GitHub Release is created automatically with `.exe` files attached.
4. Share the Release URL so kids/parents can download directly.

Example:
```bash
git tag v1.0.0
git push origin v1.0.0
```

