# Openflight: Web Edition

The open-world flight simulator, running in your browser. No install.

**Play:** https://cadealishus.github.io/microslop-flight-simulator-web-edition/

Source code, the full feature list and the desktop version (Windows and Mac): https://github.com/Cadealishus/microslop-flight-simulator

## What you need
* **Chrome or Edge** on a computer. The game draws with WebGPU, which those have; recent Safari and Firefox work too.
* A graphics card or chip that can handle a 3D game.
* The first visit downloads about 73 MB. After that the browser keeps it, until the game is updated.
* **Sound** starts after you click the game or press a key (browsers keep pages silent until then).

## Play from JSFiddle
Paste this into JSFiddle's **JavaScript** box, press **Run**, then click **▶ Open game window**:

```js
(async () => { for (const u of ["https://raw.githubusercontent.com/Cadealishus/microslop-flight-simulator-web-edition/main/jsfiddle.js", "https://cdn.jsdelivr.net/gh/Cadealishus/microslop-flight-simulator-web-edition@main/jsfiddle.js"]) { try { const r = await fetch(u, { cache: "no-store" }); if (r.ok) return (0, eval)(await r.text()); } catch (e) {} } document.body.textContent = "Could not reach the game's launcher."; })();
```

That line fetches the launcher (`jsfiddle.js`) from this repo, so it always opens the latest version. You can also paste the whole of `jsfiddle.js` into JSFiddle instead.

## Multiplayer
Fly with friends, including friends on the Windows or Mac version: Esc, then **Multiplayer**, then **Host a room** and share the 5-letter code. Friends type it in and click **Join**, and start right beside you. Or send them a link that joins straight away:

`https://cadealishus.github.io/microslop-flight-simulator-web-edition/?join=K7Q2M&name=Sam`

Other players show as the aircraft they're flying, with green name tags and a box around them when close. Their crashes explode and burn for everyone. Rooms go through free public relays: anyone with the code can join. How it works is in the main repo's README.

## Graphics settings
Esc, then **Settings**: **Quality** (Potato, Low, Medium, High), **Render distance** (Short, Medium, Far), and switches for Shadows, Ambient occlusion, Clouds, Trees and Road traffic. On a slow computer (built-in graphics, a Celeron) pick **Potato**: lowest resolution (stretched up smoothly), short distance, and no shadows, trees or traffic.

## Starting a flight from the address
Add options to the link, the same as the desktop's command-line options:
* `?no-menu&airport=KSFO&runway=28R` starts on runway 28R at San Francisco
* `?no-menu&lat=48.86&lon=2.35&agl=300` starts 300 m over Paris
* `&aircraft=747` picks the aircraft (`c172`, `ka350`, `747`, `fedup`, `fa18`, `f14`, `a10`, `f117`, `l39`, `c17`)
* `&drive=raptor` starts at the wheel of a car (`raptor`, `countach`), `&drive=foot` on foot (from the next build of the game)
* `&time=18.5` sets the local time
* `&join=K7Q2M` joins a multiplayer room, `&name=Sam` sets your name

## Controls
W / S pitch, A / D roll, Q / E rudder, Shift / Ctrl throttle, F / V flaps, L gear, B brakes, C cockpit or chase camera, drag the mouse to look around, Tab flight panel, Esc pause menu, F1 help. Xbox-style gamepads work too.

**On foot and driving** (from the next build of the game): stop on the ground and press Enter to climb out. On foot: W / S walk, A / D turn, Shift run, 1 / 2 call a Ford F-150 Raptor R / Lamborghini Countach, Enter at a door to get in. Driving: W gas, S brake and reverse, A / D steer, Space handbrake, C inside or chase view, Enter to get out. The full list is in the main repo's README.

## How it works

**The game** is the same Rust code as the desktop version, compiled to WebAssembly (a fast program format browsers run) and drawing with WebGPU. The menus, flight model, aircraft, cars, buildings and shaders are all the same.

**Loading** (`index.html`):
1. The page shows the loading picture and a percentage.
2. It reads `pkg/parts.json`, which lists the game file's pieces and their total size.
3. It downloads the pieces (`pkg/part0.bin`...) and joins them back into the game file, counting the percentage as they come in. The file is kept in pieces because the jsDelivr mirror won't serve any file over 20 MB.
4. It runs `pkg/openflight.js` (`pkg/fablegame.js` in builds from before the rename), which starts the game from that file.

Every file is tried from a list of mirrors in turn: this site, or when the JSFiddle launcher opened the page, GitHub's raw file server, then jsDelivr, then this site. `parts.json` is fetched fresh each time, and the pieces are cached by a build number, so the browser keeps them between visits and gets new ones after an update.

**The JSFiddle launcher** (`jsfiddle.js`): the button opens a new window holding a small page made on the spot. That page asks GitHub for the exact latest version of this repo, so no mirror can hand it an out-of-date copy. It then downloads `index.html` from the first mirror that answers, adds the mirror list to it, and turns into it. From there it loads like the normal site.

**While you fly:** a browser page has one thread, so the scenery (terrain, buildings, roads, airports) is built between frames, and the game sets a time limit on it so the frames keep coming. Downloads of map data are started and checked on rather than waited for; work that finds a file missing asks for everything it needs at once and runs again when it's here.

## Differences from the desktop version
* Scenery loads slower, and the frame rate dips while it does.
* Live weather (METAR) and live air traffic (ADS-B) are off: those services don't allow requests from web pages. The live cloud map on the menu globe works.
* Google's satellite and 3D tiles aren't available.
* A web page can't close itself, so "Quit" goes back to the menu.
* The career logbook is kept in the browser's storage, separate from the desktop's (and separate again for the JSFiddle launcher).
* The scenery comes from map servers (Esri imagery, AWS terrain, OpenFreeMap buildings and roads). If a network blocks them, the game starts but the ground stays blank.

## Files
| File | What it is |
|---|---|
| `index.html` | the page: loading screen, downloads the game and starts it |
| `jsfiddle.js` | the JSFiddle launcher |
| `loading.jpg` | the loading picture |
| `pkg/parts.json` | the game file's size, pieces and build number |
| `pkg/part*.bin` | the game itself (WebAssembly), in pieces |
| `pkg/openflight.js` | the code that connects the game to the browser (`pkg/fablegame.js` before the rename) |
| `.nojekyll` | tells GitHub Pages to serve the files as they are |

These are build output: they're made from the main repo with `publish-web.ps1`, which rebuilds the game and pushes here.

The cars and the pilot are downloaded models; their authors and licences are in the main repo's `assets/vehicles/CREDITS.md`.
