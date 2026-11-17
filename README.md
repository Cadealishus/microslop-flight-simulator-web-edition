# Microslop Flight Simulator: Web Edition

The open-world flight simulator, running in your browser with WebAssembly and WebGPU.

**Play:** https://cadealishus.github.io/microslop-flight-simulator-web-edition/ It needs Chrome or Edge (recent Safari and Firefox work too).

The game is a ~73 MB download the first time; after that the browser keeps it.

Start a flight straight from the address, e.g. `?no-menu&airport=KSFO&runway=28R`.

Source code and the desktop version: https://github.com/Cadealishus/microslop-flight-simulator

## Play from JSFiddle

Paste this into JSFiddle's JavaScript box and press Run, then click **Open game window**:

```js
(async () => { for (const u of ["https://raw.githubusercontent.com/Cadealishus/microslop-flight-simulator-web-edition/main/jsfiddle.js", "https://cdn.jsdelivr.net/gh/Cadealishus/microslop-flight-simulator-web-edition@main/jsfiddle.js"]) { try { const r = await fetch(u, { cache: "no-store" }); if (r.ok) return (0, eval)(await r.text()); } catch (e) {} } document.body.textContent = "Could not reach the game's launcher."; })();
```

It loads the launcher (`jsfiddle.js`) from this repository, so it always opens the latest version.
