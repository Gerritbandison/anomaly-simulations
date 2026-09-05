# Observatory interaction contract

The user requested a complete creative redesign. README.md describes the evidence limitations and standalone/offline constraint. Existing playback tests define reliable elapsed-time, pause/replay/reset, hidden-tab and parameter behavior.

## Canonical UI Map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
| --- | --- | --- | --- | --- |
| Select/Listbox | Native select | This contract | Platform popup accepted for playback speed | Browser speed tests |
| Scrollbar | design/observatory.css | DESIGN.md | Catalog bounded on desktop; archive natural document flow | Narrow viewport checks |
| Search | design/observatory.js | Existing local catalogs | Local transient query; no remote requests or stored sensitive state | Search/clear browser tests |
| Navigation | Observatory shell | This contract | Home collections, scene hash links, previous/next; phase nav for earth section | Route and keyboard tests |
| Playback | Existing page controllers | Existing browser regressions | Timeline libraries, continuous parameter lab, six-phase earth section | Timestamp/RAF tests |
| Scene controls | Observatory stage | DESIGN.md | Annotations and immersive toggle, explicit keyboard buttons | Redesign browser tests |

All content is local and read-only. No accounts, remote data, destructive actions, billing, forms or CRUD. No high-risk domain action is introduced. Search is transient local exploration; scene hash is shareable. Empty search offers clearing and never changes selected scene. New design uses accessible native controls, 44px primary touch targets, semantic selected states, reduced motion, and no automatic page-scroll animations. Previous/next navigation resets the sequence and preserves the existing controllers' playback behavior. Immersive mode is an in-document layout, not a modal, and Escape returns to the normal stage. New art is an illustrative reinterpretation; no newly computed physical claims.
