# Anomaly Observatory

Start with [index.html](index.html): an illustrated entrance to six collections. All seven pages are standalone HTML. Open them directly in a browser; no build, server, API key, or network connection is required. External source links require internet access.

The complete visual redesign replaces the original canvas artwork with 112 explicitly mapped scene designs: 111 catalog/laboratory demos plus the six-phase earth-section scene. New aircraft silhouettes, landscapes, engine and sail illustrations, orbital compositions, abstract fields and layered geology share an observatory interface. The research archive uses a contrasting cool-paper reading layout.

Catalogs have illustrated thumbnails, previous/next navigation and direct scene links. Timeline libraries include a five-frame visual inspector. All demo stages support annotation visibility and an expanded layout; Escape exits expanded mode. On phones, the catalog collapses behind Browse and scene annotations start hidden for clarity. The illustrations preserve the existing playback controls and numerical outputs; the new artwork does not validate those models.

## Maintain the design

Edit the canonical files under `design/`, then run:

```sh
npm run build:design
npm run check:design
```

The builder embeds the shared visual system into each HTML page. Generated blocks are checked for drift. `DESIGN.md` and `UX-CONTRACT.md` record the palette, interface ownership, offline behavior and accessibility choices. Parameter values affect artistic display scaling only; that scaling has no physical interpretation.

| File | Contents | Upgrades |
| --- | --- | --- |
| [exotic_propulsion_simulation.html](exotic_propulsion_simulation.html) | 10 parameterized drive concepts | One active animation, live parameter/metric updates, pause/reset, keyboard tabs, reduced-motion support, model limitations |
| [exotic_propulsion_simulations.html](exotic_propulsion_simulations.html) | 24 propulsion illustrations | Search, seeking, playback speed, replay, repeatable timeline redraws, mobile layout |
| [nuclear_test_simulations.html](nuclear_test_simulations.html) | 22 historical/conceptual illustrations | Reliable playback, seeking, speed, responsive layout, gradient crash fix |
| [underground_nuclear_test.html](underground_nuclear_test.html) | Six-phase schematic | Keyboard phase navigation, seeking, speed, replay, reset cleanup, mobile layout |
| [uap_classified_tech_simulations.html](uap_classified_tech_simulations.html) | 55 encounter/technology illustrations | Initial canvas painting, playback fixes, search, seeking, speed, evidence context, mobile layout, scene crash fix |
| [ufo-research.html](ufo-research.html) | 11-section research archive | Full-text section search including hidden content, keyboard tabs, deep links, reading progress, printable expanded content, mobile tables, selected evidence corrections |

Playback pauses when its tab is hidden. The libraries start paused; the parameter lab respects the browser's reduced-motion setting. Animation time is illustrative and is not a physical timescale. On the UAP canvas, Space toggles playback, arrows seek, and Home/End jump to the boundaries. Native sliders support keyboard adjustment; tab and phase controls expose their selection to assistive technology.

## Evidence and scope

These pages are educational illustrations, not validated scientific models, engineering tools, or evidence that speculative capabilities exist. The parameter laboratory retains unvalidated equations and illustrative metrics, now labeled accordingly. Historical narratives, embedded canvas captions, quotations, specifications, and most source mappings have **not** received a comprehensive factual audit.

The research archive was originally compiled in March 2026. The September 2026 update improves its interface, distinguishes reporting from interpretation, and corrects selected overstatements. In particular, the tested metal specimen's claimed waveguide behavior is qualified using [ORNL's published analysis](https://www.aaro.mil/Portals/136/PDFs/Information%20Papers/ORNL-Synopsis_Analysis_of_a_Metallic_Specimen.pdf). [NASA's UAP study scope](https://science.nasa.gov/uap/faqs/) supplies context for observational limitations. These references do not validate the remainder of the archive.

All six original files were reviewed. Changes preserve their standalone structure and original illustrations. Nuclear and military changes concern playback, rendering, accessibility, and evidence presentation; no weapon design or operational capability was added.

## Browser verification

Requires Node.js 22 or newer:

```sh
npm ci
npx playwright install chromium
npm test
```

The 33-test suite opens local files directly in Chromium and checks drawing boundaries, actual controls, animation ownership and elapsed-time behavior, replay/reset, hidden-tab suspension, keyboard navigation, search, reduced motion, and narrow viewports. The UAP sweep evaluates every scene at 1,001 timeline positions. The redesign checks every scene design at multiple positions, confirms animation changes, and exercises the collection links, visual inspector, annotation toggle, expanded mode, mobile catalogs and deep links. Tests exercise canvas exceptions and behavior; they do not validate the physics or historical claims. Firefox, Safari, and a full assistive-technology audit remain outside this verification.

For an optional local HTTP preview, run `npm run serve` and open `http://127.0.0.1:8000/`. The HTML also works without this server.
