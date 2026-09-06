(() => {
  'use strict';
  window.MuseumUapExhibits = {
  "uap/nimitz": {
    "title": "USS Nimitz Tic Tac",
    "status": "reported",
    "statusReason": "The Navy video is officially released; the reconstructed maneuvers and extraordinary acceleration are not established by that release.",
    "question": "Which measurements would turn a fast-looking encounter into an acceleration estimate?",
    "takeaway": "Separate a witness account, an infrared recording and a reconstructed flight path. A speed claim needs reliable positions, ranges and timestamps, not an animated trajectory.",
    "steps": [
      {
        "title": "Three evidence types",
        "body": "Fravor’s encounter narrative, later imagery and this drawing are different records; they should not be treated as one continuous observation.",
        "progress": 0
      },
      {
        "title": "Missing coordinates",
        "body": "An object moving across the view gives angular motion; physical displacement also requires its changing distance.",
        "progress": 0.5
      },
      {
        "title": "A testable conclusion",
        "body": "A defensible acceleration estimate would report uncertainty and synchronized measurements rather than read a number off this illustration.",
        "progress": 1
      }
    ],
    "assumptions": [
      "The scene is not recovered flight telemetry.",
      "Video authenticity does not identify the object."
    ],
    "sources": [
      {
        "title": "DoD: historical Navy video release",
        "url": "https://www.defense.gov/News/Releases/release/article/2165713/statement-by-the-department-of-defense-on-the-release-of-historical-navy-videos/",
        "supports": "Authenticates the official release of three Navy videos, not the acceleration depicted here."
      }
    ]
  },
  "uap/gimbal": {
    "title": "Gimbal UAP",
    "status": "reported",
    "statusReason": "The released recording is real; apparent image rotation alone does not establish rotation of an aircraft.",
    "question": "Does rotation in an infrared image necessarily mean the object rotated?",
    "takeaway": "An infrared camera produces an image through optics and processing. Distinguishing object motion from image behavior requires sensor context and comparison with alternative explanations.",
    "steps": [
      {
        "title": "Image versus object",
        "body": "The bright silhouette is a recorded intensity pattern, not a detailed photograph of an airframe.",
        "progress": 0
      },
      {
        "title": "Track the frame",
        "body": "Camera orientation, stabilization and image processing belong in the interpretation of apparent rotation.",
        "progress": 0.5
      },
      {
        "title": "Limit the inference",
        "body": "A rotating image is an observation; assigning a propulsion mechanism is an additional claim needing different evidence.",
        "progress": 1
      }
    ],
    "assumptions": [
      "No raw sensor calibration is supplied.",
      "The illustrated silhouette is not a measured shape."
    ],
    "sources": [
      {
        "title": "DoD: historical Navy video release",
        "url": "https://www.defense.gov/News/Releases/release/article/2165713/statement-by-the-department-of-defense-on-the-release-of-historical-navy-videos/",
        "supports": "Confirms release and dates of the Navy footage; it does not validate a rotating craft interpretation."
      }
    ]
  },
  "uap/gofast": {
    "title": "Go Fast: relative motion",
    "status": "reported",
    "statusReason": "The footage is documented, while apparent image speed is not itself a measurement of the object’s ground speed.",
    "question": "How can a moving camera make a distant object seem to race across the ocean?",
    "takeaway": "Apparent motion combines the observer’s motion, viewing direction and object motion. The parallax activity explores that general geometry; it is not a reconstruction or identification of Go Fast.",
    "steps": [
      {
        "title": "Moving viewpoint",
        "body": "An airborne camera changes position while observing the object and the ocean behind it.",
        "progress": 0
      },
      {
        "title": "Different distances",
        "body": "A foreground object and a more distant background can shift differently in the same camera view.",
        "progress": 0.5
      },
      {
        "title": "Measure before naming",
        "body": "Ground speed requires geometry and timestamps; apparent screen speed alone cannot establish an extraordinary vehicle.",
        "progress": 1
      }
    ],
    "assumptions": [
      "The parallax model uses invented classroom geometry.",
      "No case-specific identification is inferred."
    ],
    "sources": [
      {
        "title": "NASA: UAP independent study",
        "url": "https://science.nasa.gov/uap/",
        "supports": "Background: NASA explains data and calibration requirements, including interpretation of apparent motion; not proof from this toy model."
      },
      {
        "title": "DoD: historical Navy video release",
        "url": "https://www.defense.gov/News/Releases/release/article/2165713/statement-by-the-department-of-defense-on-the-release-of-historical-navy-videos/",
        "supports": "Documents release of the recording."
      }
    ],
    "experiment": "parallax"
  },
  "uap/sr71": {
    "title": "SR-71 Blackbird",
    "status": "demonstrated",
    "statusReason": "Museum records establish a flown reconnaissance aircraft; they do not establish every popular claim about its performance.",
    "question": "Why does sustained high-speed flight become a materials problem?",
    "takeaway": "High-speed airflow heats an aircraft’s structure. NASA describes the SR-71’s titanium construction as a response to sustained high-temperature flight: speed affects the whole vehicle, not only its engines.",
    "steps": [
      {
        "title": "Airflow transfers energy",
        "body": "Moving rapidly through air produces aerodynamic heating, so the surrounding flow and structure must be considered together.",
        "progress": 0
      },
      {
        "title": "Materials set boundaries",
        "body": "NASA describes titanium and titanium alloys as enabling the SR-71 airframe to withstand sustained high-speed heating.",
        "progress": 0.5
      },
      {
        "title": "A vehicle is a system",
        "body": "A real high-speed aircraft must manage structure, propulsion and operating limits together; a faster animation tests none of those requirements.",
        "progress": 1
      }
    ],
    "assumptions": [
      "No structural temperature or flight limit is calculated.",
      "The drawing does not model heat transfer or material expansion."
    ],
    "sources": [
      {
        "title": "National Museum of the USAF: SR-71A",
        "url": "https://www.nationalmuseum.af.mil/Visit/Museum-Exhibits/Fact-Sheets/Display/Article/198054/AFmuseum/lockheed-sr-71a/",
        "supports": "Documents the museum airframe and historical service."
      },
      {
        "title": "NASA: SR-71 research aircraft and titanium structure",
        "url": "https://www.nasa.gov/image-article/sr-71-takeoff-with-afterburner/",
        "supports": "Supports the material choice and high-temperature flight context; not a thermal simulation."
      }
    ]
  },
  "uap/f117": {
    "title": "F-117 Nighthawk",
    "status": "demonstrated",
    "statusReason": "A documented operational aircraft demonstrates low-observable design, not literal invisibility.",
    "question": "Why can an aircraft be visible to your eyes yet less conspicuous to a radar?",
    "takeaway": "Visible light and radar are electromagnetic observations at different wavelengths. The F-117 demonstrates low-observable design; appearance in a photograph and response to a radar are different measurements.",
    "steps": [
      {
        "title": "Start with the sensing wavelength",
        "body": "Your eye and a radar do not observe the same band of electromagnetic radiation.",
        "progress": 0
      },
      {
        "title": "Look at returned energy",
        "body": "A radar detects returned radiation, not simply the aircraft’s visible outline.",
        "progress": 0.5
      },
      {
        "title": "Keep the viewing conditions",
        "body": "Scattering depends on the sensing arrangement; low observable does not mean invisible to every observer.",
        "progress": 1
      }
    ],
    "assumptions": [
      "No classified signature data are included.",
      "The outline exaggerates facets for legibility."
    ],
    "sources": [
      {
        "title": "National Museum of the USAF: F-117A",
        "url": "https://www.nationalmuseum.af.mil/Visit/Museum-Exhibits/Fact-Sheets/Display/Article/198056/lockheed-f-117a-nighthawk/",
        "supports": "Documents the F-117 aircraft and development history."
      },
      {
        "title": "NASA/JPL: imaging radar principles",
        "url": "https://airsar.jpl.nasa.gov/documents/genairsar/radar.html",
        "supports": "Background on wavelength and angle-dependent backscatter, not an F-117 signature measurement."
      }
    ]
  },
  "uap/b2": {
    "title": "B-2 Spirit",
    "status": "demonstrated",
    "statusReason": "The B-2’s existence and flying-wing configuration are documented; the scene does not demonstrate invisibility or defense penetration.",
    "question": "What does a flying wing change about how an aircraft carries itself through the air?",
    "takeaway": "A flying wing combines much of the aircraft’s body and lifting surface into one configuration. Its silhouette illustrates that arrangement, while lift, drag and controlled flight still have to be balanced.",
    "steps": [
      {
        "title": "Identify the lifting configuration",
        "body": "The B-2’s broad wing contrasts with the distinct wing, fuselage and tail of a conventional airliner.",
        "progress": 0
      },
      {
        "title": "Balance lift and drag",
        "body": "Producing lift also contributes to drag; NASA explains that wing geometry affects this induced drag.",
        "progress": 0.5
      },
      {
        "title": "Avoid a shape-only verdict",
        "body": "A favorable outline alone cannot establish efficiency or handling; the whole aircraft and flight conditions determine performance.",
        "progress": 1
      }
    ],
    "assumptions": [
      "This is a configuration comparison, not a wind-tunnel result.",
      "No stability, drag coefficient or radar response is calculated."
    ],
    "sources": [
      {
        "title": "USAF: B-2 Spirit",
        "url": "https://www.af.mil/About-Us/Fact-Sheets/Display/Article/104482/b-2-spirit/",
        "supports": "Supports public B-2 configuration and program descriptions."
      },
      {
        "title": "NASA Glenn: drag and wing geometry",
        "url": "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/drag/",
        "supports": "Background physics of drag and its relation to lift and wing geometry; not B-2 performance data."
      }
    ]
  },
  "uap/rcs": {
    "title": "Radar cross section",
    "status": "demonstrated",
    "statusReason": "Radar scattering is measurable; the scene’s generic outline is not a measurement of any aircraft’s signature.",
    "question": "Why can the same object give different radar returns from different viewpoints?",
    "takeaway": "Radar measures scattered electromagnetic energy returned toward its receiver. Wavelength, viewing angle and material properties affect the return, so radar cross section is not simply physical size.",
    "steps": [
      {
        "title": "Transmit and receive",
        "body": "A radar sends radiation and measures part of the energy scattered back toward its antenna.",
        "progress": 0
      },
      {
        "title": "Change the observation",
        "body": "The same scene can produce different backscatter when wavelength, polarization or viewing direction changes.",
        "progress": 0.5
      },
      {
        "title": "Keep conditions with the number",
        "body": "A cross-section value without its measurement conditions hides information needed to interpret it.",
        "progress": 1
      }
    ],
    "assumptions": [
      "No aircraft-specific signature is calculated.",
      "The waves are qualitative, not a radar solver."
    ],
    "sources": [
      {
        "title": "NASA/JPL: radar and backscatter",
        "url": "https://airsar.jpl.nasa.gov/documents/genairsar/radar.html",
        "supports": "Explains radar observations and variable backscatter; its terrain-imaging examples are background, not an aircraft signature dataset."
      }
    ]
  },
  "uap/argus": {
    "title": "ARGUS-IS",
    "status": "demonstrated",
    "statusReason": "The developer documents flight testing of a wide-area imager; that does not establish perfect identification of every person.",
    "question": "Why does a large pixel count not guarantee that every object can be identified?",
    "takeaway": "Image collection, resolution, interpretation and tracking are different tasks. A wide-area camera can supply many pixels without removing ambiguity or observation limits.",
    "steps": [
      {
        "title": "Separate coverage and detail",
        "body": "A mosaic spreads observations over an area; the total pixel count alone does not specify useful detail.",
        "progress": 0
      },
      {
        "title": "Follow the data products",
        "body": "The developer distinguishes imagery, processing and transmitted metadata rather than a single all-seeing picture.",
        "progress": 0.5
      },
      {
        "title": "Test the inference",
        "body": "A visible moving mark is not automatically a reliably identified person or continuous track.",
        "progress": 1
      }
    ],
    "assumptions": [
      "No real surveillance data or identification model is used.",
      "Sampling controls are generic classroom signals, not camera specifications."
    ],
    "sources": [
      {
        "title": "BAE Systems: ARGUS development and flight tests",
        "url": "https://www.baesystems.com/en-us/article/bae-systems-wins--49-9-million-contract-to-develop-on-board-processor-and-integrate-darpa-s-argus-ir-nighttime-persistent-surveillance-system",
        "supports": "First-party evidence of ARGUS development and prior flight tests; performance claims remain scoped to the developer’s account."
      }
    ],
    "experiment": "sampling"
  },
  "uap/gps3": {
    "title": "GPS III",
    "status": "demonstrated",
    "statusReason": "GPS III is a documented satellite program; the illustration does not certify positioning accuracy or resistance to interference.",
    "question": "Why does a receiver normally need at least four satellites to find position and time?",
    "takeaway": "A GPS receiver compares signal timing with satellite positions. Multiple observations let it solve for three position coordinates and its clock offset; timing errors therefore become positioning errors.",
    "steps": [
      {
        "title": "Turn travel time into a constraint",
        "body": "A received signal carries timing information; its travel time constrains the satellite-to-receiver distance.",
        "progress": 0
      },
      {
        "title": "Account for the receiver clock",
        "body": "The receiver’s clock is not perfectly synchronized, adding another unknown alongside its three position coordinates.",
        "progress": 0.5
      },
      {
        "title": "Combine satellite observations",
        "body": "At least four usable satellite signals provide the independent observations needed for a basic position-and-time solution.",
        "progress": 1
      }
    ],
    "assumptions": [
      "The exhibit concerns civilian navigation principles, not military signal features.",
      "No atmosphere, multipath or real constellation is simulated."
    ],
    "sources": [
      {
        "title": "Space Systems Command: GPS III program",
        "url": "https://www.ssc.spaceforce.mil/Newsroom/Article/4467234/space-systems-command-looks-ahead-to-new-era-of-gps-success",
        "supports": "Documents GPS III as a deployed satellite program; not a guarantee of any receiver’s accuracy."
      },
      {
        "title": "FAA: how satellite navigation works",
        "url": "https://www.faa.gov/about/office_org/headquarters_offices/ato/service_units/techops/navservices/gnss/gps/howitworks",
        "supports": "Explains the combined use of at least four satellite signals for location and time."
      },
      {
        "title": "GPS.gov: GPS and telling time",
        "url": "https://www.gps.gov/gps-and-telling-time",
        "supports": "Documents atomic clocks and precise timing as part of GPS."
      }
    ]
  }
};
})();
