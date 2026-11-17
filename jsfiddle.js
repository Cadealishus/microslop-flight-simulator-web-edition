(() => {
  "use strict";

  /*
   * MICROSLOP FLIGHT SIMULATOR: JSFIDDLE LAUNCHER
   *
   * Paste this into JSFiddle's JavaScript box and press Run.
   *
   * The button reads the game's page from GitHub (through mirrors), turns it
   * into a page of its own (a Blob) and opens that in a new window, where the
   * game loads its files from the same mirrors.
   */

  const OWNER = "Cadealishus";
  const REPO = "microslop-flight-simulator-web-edition";
  const REF = "main";

  // Tried in this order, file by file.
  const BASES = [
    `https://raw.githubusercontent.com/${OWNER}/${REPO}/${REF}/`,
    `https://cdn.jsdelivr.net/gh/${OWNER}/${REPO}@${REF}/`,
    `https://${OWNER.toLowerCase()}.github.io/${REPO}/`,
  ];

  document.body.innerHTML = `
    <style>
      html, body { margin: 0; width: 100%; height: 100%; overflow: hidden; background: #06101f; }
      #outer {
        position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; text-align: center;
        background: linear-gradient(160deg, #1a6fd1 0%, #0b2a5c 55%, #06101f 100%);
        font-family: "Segoe UI", system-ui, sans-serif; color: #fff;
      }
      .logo { font: italic 900 clamp(30px, 7vw, 60px)/1.05 "Segoe UI", system-ui, sans-serif; text-shadow: 0 4px 24px #0008; }
      .sub { margin: 12px 0 28px; color: #bcd4f5; letter-spacing: 2px; font-size: 14px; }
      #open {
        padding: 16px 34px; border: 0; border-radius: 12px; cursor: pointer;
        background: #3aa0ff; color: #fff; font: 700 18px "Segoe UI", system-ui, sans-serif;
        box-shadow: 0 6px 24px #0007;
      }
      #open:hover { background: #5ab2ff; }
      #open:disabled { opacity: .6; cursor: default; }
      #msg { margin-top: 18px; min-height: 1.5em; color: #bcd4f5; font-size: 13px; max-width: 520px; line-height: 1.5; }
      #msg a { color: #fff; }
    </style>
    <div id="outer">
      <div>
        <div class="logo">Microslop<br>Flight Simulator</div>
        <div class="sub">WEB EDITION</div>
        <button id="open">▶ OPEN GAME WINDOW</button>
        <div id="msg">Needs Chrome or Edge. The game is a 73 MB download.</div>
      </div>
    </div>
  `;

  const msg = document.getElementById("msg");
  const button = document.getElementById("open");

  // What runs in the new window: fetch the game's page from the first mirror
  // that answers, tell it where its files are, and turn into it.
  function windowMain(BASES) {
    const say = t => (document.getElementById("say").textContent = t);
    (async () => {
      let last;
      for (const base of BASES) {
        try {
          say("Reading the game's page from " + new URL(base).host + "…");
          const r = await fetch(base + "index.html", { cache: "no-store", mode: "cors" });
          if (!r.ok) throw new Error(`HTTP ${r.status} from ${new URL(base).host}`);
          let html = await r.text();
          html = html.replace("<head>", `<head><script>window.GAME_BASES = ${JSON.stringify(BASES)};<\/script>`);
          location.replace(URL.createObjectURL(new Blob([html], { type: "text/html" })));
          return;
        } catch (e) {
          last = e;
          console.warn("[Microslop] mirror failed", base, e);
        }
      }
      say("Could not reach the game: " + (last && last.message || last));
    })();
  }

  const page = `<!doctype html>
<html><head><meta charset="utf-8"><title>Microslop Flight Simulator</title>
<style>
  html, body { margin: 0; height: 100%; background: linear-gradient(160deg, #1a6fd1 0%, #0b2a5c 55%, #06101f 100%); }
  #say { position: fixed; right: 28px; bottom: 24px; color: #fff; font: 600 15px "Segoe UI", system-ui, sans-serif; text-shadow: 0 2px 8px #000a; }
</style></head>
<body><div id="say">Loading…</div>
<script>(${windowMain.toString()})(${JSON.stringify(BASES)});<\/script>
</body></html>`;

  button.onclick = () => {
    const url = URL.createObjectURL(new Blob([page], { type: "text/html" }));
    // What window.open hands back does not matter: the page runs on its own.
    window.open(url, "_blank");
    msg.innerHTML = `The game is opening in its own window. Nothing? <a href="${url}" target="_blank">Open it here</a>.`;
  };
})();
