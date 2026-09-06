(() => {
'use strict';
window.MuseumScienceExhibits = {
  "propulsion/nerva": {
    "title": "NERVA: an engine with a test record",
    "status": "historical",
    "statusReason": "NERVA was a real ground-test program; this illustrated spacecraft is not evidence of a flown nuclear engine.",
    "question": "What separates an engine experiment from a space mission?",
    "takeaway": "Ground tests establish particular operating results. A flight mission must demonstrate an entire vehicle.",
    "steps": [
      {
        "title": "Recognize the hardware",
        "body": "The engine silhouette stands for a historical test program, not a surviving vehicle in orbit.",
        "progress": 0
      },
      {
        "title": "Follow the plume",
        "body": "The visible stream represents expelled propellant; the starfield is a presentation setting.",
        "progress": 0.5
      },
      {
        "title": "Ask for the test record",
        "body": "Use NASA’s history to distinguish measured engine work from later mission proposals.",
        "progress": 1
      }
    ],
    "assumptions": [
      "No flight trajectory is being solved.",
      "Plume color does not measure temperature or performance."
    ],
    "sources": [
      {
        "title": "NASA: Nuclear Rocket History",
        "url": "https://www.nasa.gov/rocket-systems-area-nuclear-rockets/",
        "supports": "Documents the NERVA program and its ground-test history."
      }
    ],
    "experiment": "momentum"
  },
  "propulsion/ion": {
    "title": "Ion thrusters: a small push sustained",
    "status": "demonstrated",
    "statusReason": "Gridded ion propulsion has flown on spacecraft; individual particles and plume colors here are illustrative.",
    "question": "How can a faint-looking plume change a spacecraft’s motion?",
    "takeaway": "Electric propulsion exchanges momentum with expelled propellant over time.",
    "steps": [
      {
        "title": "Find the exhaust direction",
        "body": "The narrow stream marks material leaving the vehicle.",
        "progress": 0
      },
      {
        "title": "Watch the duration",
        "body": "Continued operation matters even when an instantaneous push is modest.",
        "progress": 0.5
      },
      {
        "title": "Compare mechanisms",
        "body": "An electric field can accelerate propellant without chemical combustion.",
        "progress": 1
      }
    ],
    "assumptions": [
      "Particle dots do not represent measured particle counts.",
      "The scene omits the electrical supply and spacecraft dynamics."
    ],
    "sources": [
      {
        "title": "NASA: Electric Propulsion Hits Its Stride",
        "url": "https://technology.nasa.gov/page/electric-propulsion-hits-its-stride",
        "supports": "Describes gridded ion and Hall propulsion and their spacecraft use."
      }
    ],
    "experiment": "momentum"
  },
  "propulsion/hall": {
    "title": "Hall thrusters: an annular electric engine",
    "status": "demonstrated",
    "statusReason": "Hall propulsion is established spacecraft technology; this ring is a simplified illustration of that family.",
    "question": "Why does an electric thruster have a ring-shaped discharge?",
    "takeaway": "Electric and magnetic fields play distinct roles in a Hall thruster; the visible plume alone cannot show them.",
    "steps": [
      {
        "title": "Locate the annulus",
        "body": "The ring distinguishes this illustration from a gridded ion engine.",
        "progress": 0
      },
      {
        "title": "Follow the expanding plume",
        "body": "The visible exhaust represents accelerated propellant, not a pressure wave in air.",
        "progress": 0.5
      },
      {
        "title": "Connect to the hardware record",
        "body": "NASA’s development account describes tests and qualification, rather than relying on plume appearance.",
        "progress": 1
      }
    ],
    "assumptions": [
      "The ring geometry is not a dimensioned design.",
      "Color is not a calibrated diagnostic of the discharge."
    ],
    "sources": [
      {
        "title": "NASA: Solar Electric Propulsion",
        "url": "https://www.nasa.gov/space-technology-mission-directorate/tdm/solar-electric-propulsion/",
        "supports": "Explains solar electric propulsion and NASA’s Hall-thruster development and qualification work."
      }
    ],
    "experiment": "momentum"
  },
  "propulsion/vasimr": {
    "title": "VASIMR: plasma research and mission claims",
    "status": "theoretical",
    "statusReason": "NASA describes VASIMR as a thruster under development; a proposed mission is not a demonstrated flight capability.",
    "question": "What does a plasma demonstration leave unresolved?",
    "takeaway": "Heating plasma is a building block; a useful spacecraft also needs power, heat rejection, and verified thrust.",
    "steps": [
      {
        "title": "Locate the plasma column",
        "body": "The glow introduces an electrically energized propellant, not a fusion reaction.",
        "progress": 0
      },
      {
        "title": "Identify the field motif",
        "body": "Curved lines are visual cues for magnetic influence, not a solved field map.",
        "progress": 0.5
      },
      {
        "title": "Ask about the vehicle",
        "body": "Separate a thruster’s laboratory behavior from claims about whole-mission travel time.",
        "progress": 1
      }
    ],
    "assumptions": [
      "Visual motion is slowed arbitrarily.",
      "No mission duration or installed power is inferred from the scene."
    ],
    "sources": [
      {
        "title": "NASA: Small Business Technology Research",
        "url": "https://www.nasa.gov/directorates/stmd/small-business-innovation-research-small-business/nasa-funds-small-business-to-advance-tech-for-space-earth/",
        "supports": "NASA identifies VASIMR as developmental electrothermal propulsion; it does not verify a particular travel-time claim."
      }
    ],
    "experiment": "wave"
  },
  "propulsion/solar": {
    "title": "Solar sails: light carries momentum",
    "status": "demonstrated",
    "statusReason": "Radiation pressure is established; solar-sail principles do not establish every proposed laser-driven interstellar mission.",
    "question": "How can light push something without a material wind?",
    "takeaway": "Light carries momentum, and exchanging that momentum can exert a force on a sail.",
    "steps": [
      {
        "title": "Find the illuminated surface",
        "body": "The broad sail is the surface interacting with light.",
        "progress": 0
      },
      {
        "title": "Notice its orientation",
        "body": "An angled surface changes the geometry of the interaction.",
        "progress": 0.5
      },
      {
        "title": "Distinguish two claims",
        "body": "A light-pressure demonstration is not a validation of a distant laser or an interstellar mission.",
        "progress": 1
      }
    ],
    "assumptions": [
      "Sail shape and reflectivity are idealized.",
      "The scene does not include beam spreading, pointing, or heating."
    ],
    "sources": [
      {
        "title": "NASA: Steering Solar Sails",
        "url": "https://www.nasa.gov/general/steering-of-solar-sails-using-optical-lift-force/",
        "supports": "Explains light momentum and discusses solar-sail steering concepts."
      }
    ],
    "experiment": "momentum"
  },
  "propulsion/alcubierre": {
    "title": "Alcubierre drive: geometry before engineering",
    "status": "theoretical",
    "statusReason": "Alcubierre proposed a spacetime geometry; the paper does not supply a buildable drive or demonstrated faster-than-light travel.",
    "question": "What is the difference between a mathematical spacetime and a machine?",
    "takeaway": "Specifying a geometry does not show how matter and energy could physically create it.",
    "steps": [
      {
        "title": "Identify the drawn bubble",
        "body": "The curved boundary is a visual metaphor for a specified spacetime region.",
        "progress": 0
      },
      {
        "title": "Notice the observer’s view",
        "body": "The starfield suggests relative motion, not a measured trajectory.",
        "progress": 0.5
      },
      {
        "title": "Read the requirement",
        "body": "The original paper explicitly raises exotic-matter requirements; animation does not resolve them.",
        "progress": 1
      }
    ],
    "assumptions": [
      "The grid is not a numerical solution of Einstein’s equations.",
      "No speed or energy requirement is inferred from the picture."
    ],
    "sources": [
      {
        "title": "Alcubierre: The Warp Drive",
        "url": "https://arxiv.org/abs/gr-qc/0009013",
        "supports": "The author’s original warp-geometry proposal, including its exotic-matter limitation."
      }
    ]
  },
  "propulsion/kilopower": {
    "title": "Kilopower: a power-system research program",
    "status": "historical",
    "statusReason": "Kilopower is a documented NASA fission-power project; the lunar scene is not evidence of a deployed surface plant.",
    "question": "Why does a spacecraft need power even while stationary?",
    "takeaway": "Electrical service and propulsion are separate functions: a reactor illustration need not depict an engine.",
    "steps": [
      {
        "title": "Recognize the stationary setting",
        "body": "The lunar ground makes this a power-supply story rather than a thrust sequence.",
        "progress": 0
      },
      {
        "title": "Separate heat from electricity",
        "body": "The housing suggests a system that must convert heat into useful electrical output.",
        "progress": 0.5
      },
      {
        "title": "Check the project scope",
        "body": "NASA’s project description concerns technology development, not the lunar installation pictured.",
        "progress": 1
      }
    ],
    "assumptions": [
      "The scene does not model conversion efficiency.",
      "The lunar placement is illustrative rather than a deployment record."
    ],
    "sources": [
      {
        "title": "NASA: Kilopower Project",
        "url": "https://www.nasa.gov/directorates/stmd/nuclear-systems-ns-kilopower/",
        "supports": "Documents Kilopower’s research objectives and subsystem-development scope."
      }
    ]
  },
  "propulsion/rtg": {
    "title": "Radioisotope generators: heat without a chain reaction",
    "status": "demonstrated",
    "statusReason": "Radioisotope power systems have extensive spacecraft use; the illustrated housing is a generic representation.",
    "question": "How is this different from a fission reactor?",
    "takeaway": "An RTG uses heat from radioactive decay to supply electricity; it is not a nuclear rocket.",
    "steps": [
      {
        "title": "Find the finned housing",
        "body": "The fins provide a visual cue for a thermal power system.",
        "progress": 0
      },
      {
        "title": "Follow the energy story",
        "body": "Decay heat supplies the input to electrical conversion.",
        "progress": 0.5
      },
      {
        "title": "Separate power from motion",
        "body": "The spacecraft can use that electricity without the housing itself producing thrust.",
        "progress": 1
      }
    ],
    "assumptions": [
      "Heat-flow colors are not measured temperatures.",
      "Electrical output and aging are not calculated."
    ],
    "sources": [
      {
        "title": "NASA: About Radioisotope Power Systems",
        "url": "https://science.nasa.gov/planetary-science/programs/radioisotope-power-systems/about-rps/",
        "supports": "Explains decay heat, electricity production, and spacecraft use of radioisotope power."
      }
    ]
  },
  "nuclear/trinity": {
    "title": "Trinity: an event and a lasting legacy",
    "status": "historical",
    "statusReason": "The July 1945 test is documented; the light sequence is a reconstruction, not archival footage.",
    "question": "What does a spectacular image leave outside the frame?",
    "takeaway": "The historical record includes nearby communities and radiation exposure, not only the photographed cloud.",
    "steps": [
      {
        "title": "Place the scene",
        "body": "The desert identifies the New Mexico test setting.",
        "progress": 0
      },
      {
        "title": "Read the flash cautiously",
        "body": "Brightness and cloud growth are artistic choices rather than a recovered camera record.",
        "progress": 0.5
      },
      {
        "title": "Widen the history",
        "body": "NPS documents the continuing consequences for people living nearby and downwind.",
        "progress": 1
      }
    ],
    "assumptions": [
      "The scene is not geographically or temporally calibrated.",
      "Visible light does not represent radiation exposure."
    ],
    "sources": [
      {
        "title": "NPS: Trinity Site",
        "url": "https://www.nps.gov/mapr/learn/historyculture/trinity.htm",
        "supports": "Documents the test date, location, and consequences for nearby and downwind residents."
      }
    ]
  },
  "nuclear/castlebravo": {
    "title": "Castle Bravo: the consequences crossed the horizon",
    "status": "historical",
    "statusReason": "The 1954 test and regional contamination are documented; the scene does not reconstruct a fallout map.",
    "question": "Can an event’s consequences extend beyond its photograph?",
    "takeaway": "A testing site’s boundary did not contain the historical impact on surrounding Pacific communities.",
    "steps": [
      {
        "title": "Start with the lagoon",
        "body": "The setting identifies an atoll, not an isolated empty stage.",
        "progress": 0
      },
      {
        "title": "Watch the field of view",
        "body": "The image has edges; the historical consequences did not stop at them.",
        "progress": 0.5
      },
      {
        "title": "Consult the regional account",
        "body": "CTBTO records contamination affecting several Marshall Islands atolls.",
        "progress": 1
      }
    ],
    "assumptions": [
      "No wind field or deposition pattern is modeled.",
      "The image cannot identify affected or unaffected locations."
    ],
    "sources": [
      {
        "title": "CTBTO: Pacific Testing History",
        "url": "https://www.ctbto.org/news-and-events/news/ctbto-enhances-cooperation-pacific-states",
        "supports": "Documents Castle Bravo and contamination across several atolls."
      }
    ]
  },
  "nuclear/underwater": {
    "title": "Underwater testing: reading a water-column image",
    "status": "historical",
    "statusReason": "Pacific underwater testing is documented; the stylized column is not a fluid-dynamics reconstruction.",
    "question": "How does a photograph differ from an environmental measurement?",
    "takeaway": "A water-column image records a visible event; environmental consequences require other observations.",
    "steps": [
      {
        "title": "Find the waterline",
        "body": "It separates the scene’s underwater and atmospheric regions.",
        "progress": 0
      },
      {
        "title": "Watch the column",
        "body": "The rising shape is an illustration of a familiar historical image.",
        "progress": 0.5
      },
      {
        "title": "Ask what was measured elsewhere",
        "body": "Testing records and environmental observations provide evidence the picture cannot.",
        "progress": 1
      }
    ],
    "assumptions": [
      "Water-column height and time are uncalibrated.",
      "No pressure, contamination, or vessel-damage prediction is included."
    ],
    "sources": [
      {
        "title": "CTBTO: Pacific Testing History",
        "url": "https://www.ctbto.org/news-and-events/news/ctbto-enhances-cooperation-pacific-states",
        "supports": "Documents the 1946 US underwater test in the Pacific testing sequence."
      }
    ]
  },
  "nuclear/nevada": {
    "title": "Nevada: reading a changed landscape",
    "status": "historical",
    "statusReason": "USGS preserves mapped surface effects at the Nevada Test Site; this aerial view is imagined.",
    "question": "Why is a map more informative than a field of repeated circles?",
    "takeaway": "A measured landscape record distinguishes features, locations, and dates that generic craters cannot.",
    "steps": [
      {
        "title": "Look across the surface",
        "body": "Repeated depressions evoke the test-site landscape.",
        "progress": 0
      },
      {
        "title": "Distinguish the features",
        "body": "A real map records more than circular depressions, including fractures and other surface changes.",
        "progress": 0.5
      },
      {
        "title": "Compare with the archive",
        "body": "The USGS collection preserves observations with location and test context.",
        "progress": 1
      }
    ],
    "assumptions": [
      "Crater positions are not geographic coordinates.",
      "Feature size does not encode yield or test depth."
    ],
    "sources": [
      {
        "title": "USGS: Surface Effects Map Archive",
        "url": "https://pubs.usgs.gov/of/2003/151/",
        "supports": "Documents the mapped Nevada surface-effects archive and its observational basis."
      }
    ]
  },
  "nuclear/fallout": {
    "title": "Fallout: visible dust and invisible evidence",
    "status": "historical",
    "statusReason": "Radioactive material from testing has been measured; the drifting particles here are not a forecast.",
    "question": "Can you infer contamination by looking at a cloud?",
    "takeaway": "Sampling and analysis identify radioactive material; a visible plume alone cannot establish exposure.",
    "steps": [
      {
        "title": "Notice the drifting marks",
        "body": "They stand for transport through an environment.",
        "progress": 0
      },
      {
        "title": "Separate particles from appearance",
        "body": "Rendered dots cannot encode a measured radioactive concentration.",
        "progress": 0.5
      },
      {
        "title": "Follow the evidence chain",
        "body": "CTBTO describes collecting and analyzing samples rather than judging contamination by sight.",
        "progress": 1
      }
    ],
    "assumptions": [
      "No weather or radionuclide inventory is supplied.",
      "The scene is not an exposure, deposition, or protective-action map."
    ],
    "sources": [
      {
        "title": "CTBTO: Radionuclide Monitoring",
        "url": "https://www.ctbto.org/our-work/monitoring-technologies/radionuclide-monitoring",
        "supports": "Explains atmospheric sampling and the transport of radioactive particles and gases."
      }
    ]
  },
  "earth/sequence": {
    "title": "Below the surface: observations across different timescales",
    "status": "historical",
    "statusReason": "Ground deformation after testing has been observed; these six illustrated phases are not a validated geological timeline.",
    "question": "How much of an underground story can be learned from the surface?",
    "takeaway": "A cutaway is an explanatory construction; maps, satellite observations, and groundwater studies supply different evidence.",
    "steps": [
      {
        "title": "Identify the imagined section",
        "body": "The opening layers reveal a subsurface view that is not directly photographed.",
        "progress": 0
      },
      {
        "title": "Watch the change in form",
        "body": "The middle scene condenses processes into a legible sequence without prescribing when they occur.",
        "progress": 0.5
      },
      {
        "title": "Distinguish aftermath from completion",
        "body": "A final frame ends an animation; it does not mean deformation or environmental monitoring has ended.",
        "progress": 1
      }
    ],
    "assumptions": [
      "Different processes are compressed into one presentation clock.",
      "A collapse sink is not the same feature as an excavation crater.",
      "A closed-looking surface does not establish contaminant containment."
    ],
    "sources": [
      {
        "title": "USGS: Surface Effects Glossary",
        "url": "https://pubs.usgs.gov/of/2003/151/Archive/introduction/glossary.htm",
        "supports": "Defines observed surface features, including collapse sinks and craters."
      },
      {
        "title": "USGS: Satellite Observations of Test-Site Subsidence",
        "url": "https://www.usgs.gov/publications/new-signatures-underground-nuclear-tests-revealed-satellite-radar-interferometry",
        "supports": "Documents deformation continuing on longer timescales."
      },
      {
        "title": "USGS: Nevada Test-Site Hydrogeology",
        "url": "https://pubs.usgs.gov/wri/wri964109/report.htm",
        "supports": "Describes test-site hydrogeology and subsurface contaminants, not this cutaway geometry."
      }
    ]
  }
};
})();
