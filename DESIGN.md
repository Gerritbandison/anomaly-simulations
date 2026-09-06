---
version: alpha
colors:
  background: "#11172a"
  surface: "#1a2238"
  ink: "#f0f2f7"
  muted: "#acb7cb"
  primary: "#b7c5ff"
  secondary: "#8ed9d0"
  warning: "#f1b88c"
typography:
  display:
    fontFamily: "'Arial', 'Liberation Sans', sans-serif"
  body:
    fontFamily: "system-ui, sans-serif"
  utility:
    fontFamily: "'SFMono-Regular', Consolas, monospace"
rounded:
  DEFAULT: "14px"
  stage: "22px"
spacing:
  unit: "6px"
components:
  stage:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.stage}"
  caption:
    textColor: "{colors.muted}"
  historicalAccent:
    textColor: "{colors.warning}"
---

# Anomaly Observatory

## Overview
An illustrated digital observatory for exploring historical events, engineering concepts and disputed encounters. The user explicitly authorized a complete redesign of every page and demo, with creative freedom over appearance and behavior. Product register for laboratories; editorial register for the research archive and collection entrance.

Signature: luminous, layered vector scenes inside a large observation stage, with a quiet annotated filmstrip for exploring each sequence. The scene, not decoration around it, carries the experience. Avoid neon dashboard clutter, tiny canvas labels, fake live telemetry, or presenting artistic motion as measured evidence.

## Colors
The frontmatter values map directly to the `--obs-*` variables in `design/observatory.css`. Per-collection accents: encounters periwinkle, propulsion sea-glass, historical phenomena amber, parameter laboratory lilac. The archive uses a cool-paper surface for long reading while retaining the same ink family. Palette variation represents collection membership, not scientific confidence.

## Typography
Large, tightly spaced display headings; restrained sentence case; body copy with comfortable line height; small monospaced captions reserved for controls and sequence position. System font stacks maintain offline portability without network font shifts. Canvas labels use the same sans and utility roles.

## Layout
Desktop: 280px illustrated catalog + fluid stage and context. The control strip stays adjacent to the scene, with a visual sequence below. On phones: catalog becomes a collapsible, searchable region; the stage and controls take full width. Document scroll owns long reading. An immersive scene mode expands the stage without browser fullscreen permission. The archive uses a wide opening composition and a readable text column.

## Elevation & Depth
Depth comes from layered terrain, atmospheric haze, overlapping geometry, soft scene lighting and restrained panel elevation. Gradients belong to light/materials inside scenes; they are not blanket button decoration.

## Shapes
22px observation stages, 14px panels, 8px controls, fine borders. Subject geometry varies intentionally: aircraft silhouettes, chamber sections, wavefronts, orbital paths, earth strata, sails and sensor scenes.

## Components
Canonical source is `design/observatory.css`, `design/scene-renderer.js`, and `design/observatory.js`. `scripts/build-design.mjs` embeds these into each standalone HTML, so file downloads remain offline-capable. Generated blocks must not be edited manually. Scene manifests explicitly cover every active demo; there is no generic unknown-scene fallback. Previous simulation controls retain their state/timing contracts. New controls: annotation visibility, immersive stage, previous/next, scene links, and a visual sequence inspector.

## Do's and Don'ts
- Show an illustration label and readable descriptions; never fake sensor measurements.
- Use deterministic particle paths for scrubbed scenes; preserve pause, replay and reduced-motion behavior.
- Use native buttons, range controls and selects, visible focus and operable scrollbars.
- Preserve source caveats and original metadata. Do not add weapon construction or optimization detail.
- Inspect all scene contact sheets, desktop and 320px views, and run browser regressions.

## Museum learning layer
The user approved a substantive science-museum upgrade and explicitly allowed pruning redundant or poor-fit demos. The active catalog is 33 exhibits: 23 retained illustrations/historical exhibits and 10 established-principle experiments. `design/curation.js` is authoritative for membership. The primary content hierarchy is question → explanation → experiment when appropriate → assumptions → scoped sources. Evidence badges describe the status of a claim, not a decorative quality score. A/B comparisons use independent inputs and matched graph axes where applicable. The original toy drive UI is retired; arbitrary display scaling is removed.

Learning styles live in `design/museum.css`, composed with the existing stylesheet by the standalone builder. Teaching records live in `design/exhibits-uap.js` and `design/exhibits-science.js`; numerical models, their steps and renderers live in `design/experiments.js`. Source scope is visible beside each link. `design/museum.js` owns the directory, lesson steps, evidence filters and comparison controls. Keep scenario status readable in text, including total internal reflection and sampling ambiguity.
