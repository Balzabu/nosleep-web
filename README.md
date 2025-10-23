# ⚡ nosleep-web

> Keep your screen awake without installing sketchy executables on your machine.

A browser-based sleep prevention tool that actually works. No downloads, no sus registry edits, no "trust me bro" installers. Just open, click start, and your screen stays awake.

**Live Demo:** 

## Why This Exists

Ever needed to keep your screen on but didn't want to:
- Download random executables from the internet?
- Give admin permissions to suspicious software?
- Deal with antivirus flags and Windows Defender alerts?
- Trust closed-source "nosleep.exe" files?
- Launch strange powershell oneliners?
- Run custom AutoHotKey macros?

Yeah, me too. That's why this exists. It's just a web page that leverages browser APIs to keep your system awake. Open-source, runs in your browser, zero installation headaches.

## How It Works

The tool uses two different approaches depending on your browser:

**Wake Lock API** (Chrome, Edge, Opera, Brave)
Native browser API that tells the OS "hey, keep the screen on". Clean, efficient, exactly what you want.

**Video Fallback** (Firefox, Safari, older browsers)
Plays an invisible 1-frame video on loop. The browser thinks "oh, video is playing" and keeps the screen awake. Hacky? Maybe. Does it work? Absolutely.

The tool automatically detects which method your browser supports and uses the best option available. You don't need to think about it.

## Features

**Cross-browser compatibility** - Works on Chrome, Firefox, Edge, Safari, Opera, and most modern browsers. If it has a rendering engine from this decade, it'll work.

**Offline capable** - Install it as a PWA and it works without an internet connection. Perfect for those moments when you're on a network that blocks everything.

**Zero tracking** - No analytics, no cookies, no telemetry, no phone-home behavior. What happens in your browser stays in your browser.

**Tab visibility handling** - Warns you when the tab goes to the background since sleep prevention might not work correctly when hidden. No surprises, no "why isn't this working?" moments.

## Installation

### Quick Start (Just Use It)

Open [the live demo](https://yourusername.github.io/nosleep-web) and click START. That's it. Bookmark it if you want.

### Install as PWA (Recommended)

1. Open the web app in your browser
2. Look for the install icon in the address bar (usually a ⊕ or 📥 icon)
3. Click "Install" or "Add to Home Screen"
4. Now you have it as a standalone app that works offline

* Chrome/Edge: Click the ⊕ icon in the address bar
* Firefox: Menu → Install This Site as an App
* Safari (iOS): Share button → Add to Home Screen
* Safari (macOS): File → Add to Dock

### Deploy Your Own (Github Pages)

Want to host your own instance? Fork this repo and enable Github Pages:

1. Fork this repository
2. Go to Settings → Pages
3. Set Source to "Deploy from a branch"
4. Select `main` branch and `/ (root)` folder
5. Click Save
6. Your copy will be live at `https://yourusername.github.io/nosleep-web`

Github Pages is free, fast, and you get HTTPS by default. Perfect for a static PWA like this.

## Usage

The interface is intentionally simple:

**START** → Activates sleep prevention

**STOP** → Deactivates and lets your screen sleep normally

When active, you'll see the status change to show which method is being used (Wake Lock or Video Fallback). Check the browser console (F12) for detailed logs if you're curious about what's happening under the hood.

**Pro tip:** Keep the tab visible (not minimized or in the background) for best results. The tool will warn you if you try to hide it while active.

## Browser Support

| Browser | Method | Status |
|---------|--------|--------|
| Chrome 84+ | Wake Lock API | ✅ Native support |
| Edge 84+ | Wake Lock API | ✅ Native support |
| Opera 70+ | Wake Lock API | ✅ Native support |
| Brave | Wake Lock API | ✅ Native support |
| Firefox | Wake Lock API  | ✅ Native support but also supports fallback |
| Safari (iOS/macOS) | Video Fallback | ✅ Works via fallback |

Basically, if your browser was released after 2020, you're good. If you're somehow still on Internet Explorer... I can't help you, friend.

## Tech Stack

**Frontend:** Vanilla JavaScript (no frameworks, no build tools, no `node_modules` black hole)

**Styling:** Pure CSS with hacker terminal aesthetic

**PWA:** Service Worker for offline support and caching

**APIs:** Wake Lock API + HTML5 Video as fallback

The entire app is three files: `index.html`, `sw.js`, and `manifest.json`. That's it. No webpack, no babel, no 300MB dependencies. Just clean, readable code that does one thing well.

## Development

Want to modify it? Clone the repo and open `index.html` in your browser. That's literally it. No install step, no dev server, no build process.

```bash
git clone https://github.com/balzabu/nosleep-web.git
cd nosleep-web
# Open index.html in your browser
```

Test locally:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server

# Or just drag index.html into your browser ¯\_(ツ)_/¯
```

Then open `http://localhost:8000` in your browser.

## Contributing

Found a bug? Want to add a feature? PRs are welcome. Just keep it simple and don't bloat the codebase with unnecessary dependencies.

If you're adding a feature:
- Keep it lightweight (the whole app is <20KB, let's maintain that)
- Make sure it works across browsers
- Update the README if it changes usage

## License

MIT License - do whatever you want with this. Fork it, modify it, sell it to the CIA, I don't care. Just don't blame me if something breaks.

See [LICENSE](LICENSE) for details.

## FAQ

**Q: Does this drain my battery?**
A: Less than watching a video or keeping your screen on manually. The Wake Lock API is pretty efficient, and the video fallback uses a tiny 1-frame video.

**Q: Will this keep my laptop from sleeping when I close the lid?**
A: No. This prevents *screen* sleep and *display* timeout, but closing the lid triggers a hardware/OS-level sleep that browsers can't override. That's a good thing - you don't want random web pages preventing your laptop from sleeping when you close it.

**Q: Can I use this on mobile?**
A: Yes, but results may vary. iOS Safari and Android Chrome both support it, but mobile browsers are more aggressive about background tab management. Works best when the app is visible and in the foreground.

**Q: Is this legal?**
A: Yes??? It's literally just a web page using standard browser APIs. If this is illegal, half the internet is in trouble.

**Q: Why is it called N0SLH33P with leetspeak in the UI but nosleep-web in the repo name?**
A: Because SEO exists and people search for "nosleep web" not "n0slh33p". The leetspeak is just for aesthetic vibes in the UI.

---

**Built with ☕ by someone tired of downloading random executables**

If this saved you from installing sketchy software, consider starring the repo. It's free and makes me feel good about my life choices.
