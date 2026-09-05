# Anomaly simulations

Six standalone HTML pages containing interactive illustrations and a UFO/UAP research archive. Open any HTML file directly in a browser; no build, server, API key, or network connection is required for the interface. External source links require internet access.

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

The suite opens local files directly in Chromium and checks drawing boundaries, actual controls, animation ownership and elapsed-time behavior, replay/reset, hidden-tab suspension, keyboard navigation, search, reduced motion, and narrow viewports. The UAP sweep evaluates every scene at 1,001 timeline positions. Tests exercise canvas exceptions and behavior; they do not validate the physics or historical claims. Firefox, Safari, and a full assistive-technology audit remain outside this verification.

For an optional local HTTP preview, run `npm run serve` and open `http://127.0.0.1:8000/`. The HTML also works without this server.
