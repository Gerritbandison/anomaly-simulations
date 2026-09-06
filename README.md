# Anomaly Observatory — interactive science museum

Open [index.html](index.html) to explore a curated collection of **33 exhibits**. All seven pages work as standalone local HTML without a build, server, account, API key or network connection. Only external reference links require internet access.

The collection now prioritizes learning and evidence over breadth:

| Collection | Active exhibits | Focus |
| --- | --- | --- |
| Encounters and technology | 9 | Nimitz/Gimbal/Go Fast evidence; SR-71, F-117, B-2, radar cross section, imaging and GPS |
| Propulsion | 8 | NERVA, ion/Hall/VASIMR, solar sails, Alcubierre, Kilopower and RTGs |
| Nuclear history | 5 | Trinity, Castle Bravo, Baker, Nevada and fallout records; historical and observational only |
| Earth section | 1, with six phases | Schematic geological sequence and its limitations |
| Physics laboratory | 10 | Quantitative, idealized experiments with known equations |

Redundant scenes and unsupported-story demonstrations are removed from the active catalogs. Older records and render functions remain in the source/history for provenance; `design/curation.js` controls the public allowlist. The old speculative drive-performance UI and arbitrary parameter-to-art scaling are retired.

## What to explore

Every active exhibit has a distinct learning question, takeaway, three teaching steps, evidence status with a reason, specific limitations and scoped primary references. Clicking a teaching step in a timeline exhibit seeks its illustrative sequence. Those animation positions are not physical timestamps.

The home directory and catalogs combine text search with evidence categories. Existence of a program, evidence for a physical principle and validation of a particular vehicle are separate claims. Compare-exhibit panels make those boundaries visible side by side.

The ten experiment models are:

- Momentum flux: mass flow, exhaust velocity, thrust and exhaust kinetic power.
- Inverse-square light dilution, expressed relative to a reference distance.
- Geometric parallax from a translating camera and stationary target.
- Ideal circular-aperture diffraction limit.
- Two-body circular Earth-orbit period and speed.
- Sine sampling, Nyquist folding and alias ambiguity.
- Acoustic Doppler shift for a moving source and stationary listener.
- Vacuum electromagnetic wavelength and period.
- Positive-index Snell refraction and total internal reflection.
- An ideal mass–spring oscillator.

Each experiment exposes real units, a displayed equation, model limits and primary-source references. Scenario A and B are independent. Copy A to B establishes a common baseline; Reset restores defaults. Drawings use calculated quantities. Numerical tests cover dimensional references, boundaries, aliasing, TIR and monotonic relationships. These are educational models, not engineering-grade solvers or predictions of speculative drive performance. Nuclear exhibits have no weapon-design, yield, blast or fallout-optimization model.

The research dossier remains a labeled historical archive, with an evidence-reading guide. It has not received a comprehensive factual audit. Scoped references in curated exhibits do not validate every inherited description or canvas caption.

## Development

Requires Node.js 22 or newer:

```sh
npm ci
npx playwright install chromium
npm run build:design
npm run check:design
npm test
```

Canonical files under `design/` own the interface, curation, teaching content and models. The build embeds them into the seven HTML files, preserving offline use. Do not manually edit generated design blocks. `DESIGN.md` and `UX-CONTRACT.md` document the design and behavior contracts.

The browser suite checks numerical references, all active exhibits, scenario independence, filter intersections, source/assumption coverage, navigation and hash recovery, labels/IDs, original playback reliability, offline use, and 320px layouts. Verification uses Chromium; cross-browser and full assistive-technology audits remain outside the tested scope.

For optional local HTTP preview: `npm run serve`, then open `http://127.0.0.1:8000/`.
