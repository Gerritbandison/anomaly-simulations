(function (global) {
  'use strict';
  const C = 299792458;
  const EARTH_MU = 398600.435507e9;
  const EARTH_RADIUS = 6371000;
  const TAU = Math.PI * 2;
  const DEG = 180 / Math.PI;
  const parameter = (key, label, unit, min, max, step, value) => ({key, label, unit, min, max, step, value});
  const output = (label, value, unit, precision = 3) => ({label, value, unit, precision});
  const source = (title, url, supports) => ({title, url, supports});
  const astro = source('NASA JPL · Astrodynamic parameters', 'https://ssd.jpl.nasa.gov/astro_par.html', 'Earth gravitational parameter and vacuum speed of light; constants only, not a mission prediction.');
  const models = {
    momentum: {
      title: 'Momentum leaves; thrust follows',
      question: 'What changes when more propellant leaves each second, or leaves faster?',
      parameters: [parameter('massFlow', 'Propellant flow', 'kg/s', 0, 5, .01, .2), parameter('exhaustVelocity', 'Exhaust speed', 'm/s', 100, 10000, 100, 2000)],
      assumptions: ['Steady, one-dimensional exhaust measured relative to the vehicle.', 'Exit pressure equals ambient pressure; the pressure-thrust term is omitted.', 'Kinetic power is energy carried by the exhaust, not electrical input power or total engine efficiency. No trajectory is predicted.'],
      equation: 'F = ṁvₑ; Pₖ = ½ṁvₑ²',
      sources: [source('NASA Glenn · Rocket thrust', 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/rocket-thrust/', 'Momentum flux gives thrust; nozzle pressure can supply an additional term.'), source('OpenStax · Kinetic energy', 'https://openstax.org/books/university-physics-volume-1/pages/7-2-kinetic-energy', 'Classical kinetic energy, differentiated for a steady mass flow.')],
      calculate(p) { return {thrust: p.massFlow * p.exhaustVelocity, kineticPower: .5 * p.massFlow * p.exhaustVelocity ** 2, outputs: [output('Thrust', p.massFlow * p.exhaustVelocity, 'N', 1), output('Exhaust kinetic power', .5 * p.massFlow * p.exhaustVelocity ** 2, 'W', 0)]}; }
    },
    inverseSquare: {
      title: 'The same light, spread farther',
      question: 'How much of a reference intensity remains as distance changes?',
      parameters: [parameter('distance', 'Observation distance', 'm', 1, 100, 1, 10), parameter('referenceDistance', 'Reference distance', 'm', 1, 100, 1, 5)],
      assumptions: ['An isotropic point source with unchanged luminosity in a transparent medium.', 'Distances are measured from the source; absorption, beam focusing and extended sources are excluded.', 'Only a ratio is calculated. No source power, detector response or biological exposure is inferred.'],
      equation: 'I(r) / I(r₀) = (r₀ / r)²',
      sources: [source('OpenStax · The behavior of light', 'https://openstax.org/books/astronomy-2e/pages/5-1-the-behavior-of-light', 'Light from a point source dilutes with the square of distance.')],
      calculate(p) { const ratio = (p.referenceDistance / p.distance) ** 2; return {ratio, outputs: [output('Relative intensity', ratio, '× reference', 4), output('Reference intensity remaining', ratio * 100, '%', 2)]}; }
    },
    parallax: {
      title: 'A moving camera, a fixed target',
      question: 'Can viewpoint motion make a stationary object appear to move?',
      parameters: [parameter('cameraSpeed', 'Camera sideways speed', 'm/s', 0, 300, 1, 100), parameter('duration', 'Observation interval', 's', .1, 10, .1, 2), parameter('range', 'Initial target range', 'm', 100, 10000, 100, 2000)],
      assumptions: ['The target is stationary; the camera translates sideways without rotating.', 'The first sight line is perpendicular to the camera path. Range is its initial perpendicular distance.', 'The reported angular rate is averaged over the interval, not instantaneous. This hypothetical geometry cannot determine an actual UAP speed.'],
      equation: 'b = v_camera Δt; Δθ = atan(b / R); mean angular rate = Δθ / Δt',
      sources: [source('NASA Goddard · Parallax', 'https://pwg.gsfc.nasa.gov/stargaze/Sparalax.htm', 'Known baseline and sight-line angle determine geometric parallax. The right-triangle construction here uses exact arctangent.')],
      calculate(p) { const baseline = p.cameraSpeed * p.duration; const angle = Math.atan2(baseline, p.range); return {baseline, angle, outputs: [output('Angular shift', angle * DEG, '°', 3), output('Mean apparent angular rate', angle * DEG / p.duration, '°/s', 3), output('Camera displacement', baseline, 'm', 1)]}; }
    },
    diffraction: {
      title: 'An aperture sets an angular limit',
      question: 'How do aperture diameter and wavelength affect ideal resolution?',
      parameters: [parameter('wavelength', 'Wavelength', 'nm', 380, 1000, 10, 550), parameter('diameter', 'Circular aperture diameter', 'mm', 10, 300, 5, 100)],
      assumptions: ['Ideal unobscured circular aperture and monochromatic light in the far field.', 'Rayleigh small-angle criterion; diameter is much greater than wavelength throughout this domain.', 'Aberrations, atmospheric turbulence, detector sampling and signal-to-noise are excluded. The drawing is an angular scale, not a calculated point-spread intensity.'],
      equation: 'θ ≈ 1.22 λ / D (radians); arcseconds = radians × 180/π × 3600',
      sources: [source('OpenStax · Applications of diffraction', 'https://openstax.org/books/physics/pages/17-2-applications-of-diffraction-interference-and-coherence', 'Rayleigh angular-resolution criterion for a circular aperture, with θ in radians.')],
      calculate(p) { const angle = 1.22 * p.wavelength * 1e-9 / (p.diameter * 1e-3); return {angle, arcseconds: angle * DEG * 3600, outputs: [output('Angular resolution', angle * DEG * 3600, 'arcsec', 3), output('Angular resolution in radians', angle, 'rad', 7)]}; }
    },
    orbit: {
      title: 'Higher orbits take longer',
      question: 'How does circular orbital period change with altitude above Earth?',
      parameters: [parameter('altitude', 'Altitude above mean surface', 'km', 100, 36000, 100, 400)],
      assumptions: ['Circular two-body orbit around a spherical Earth; satellite mass is negligible.', 'Adopted mean Earth radius: 6,371 km. Earth μ = 398600.435507 km³/s² (JPL DE440).', 'No atmospheric drag, oblateness, Moon/Sun perturbations or station keeping. This is not an orbit propagator or lifetime forecast.'],
      equation: 'r = R_E + h; T = 2π√(r³/μ); v = √(μ/r)',
      sources: [source('OpenStax · Satellite orbits and energy', 'https://openstax.org/books/university-physics-volume-1/pages/13-4-satellite-orbits-and-energy', 'Circular-orbit speed and period derived from Newtonian gravity.'), astro, source('NASA JPL · Planetary physical parameters', 'https://ssd.jpl.nasa.gov/planets/phys_par.html', 'Earth mean-radius context; the model rounds the radius to 6,371 km.')],
      calculate(p) { const radius = EARTH_RADIUS + p.altitude * 1000; const period = TAU * Math.sqrt(radius ** 3 / EARTH_MU); const speed = Math.sqrt(EARTH_MU / radius); return {radius, period, speed, outputs: [output('Orbital period', period / 60, 'min', 2), output('Orbital speed', speed / 1000, 'km/s', 3), output('Distance from Earth center', radius / 1000, 'km', 0)]}; }
    },
    sampling: {
      title: 'A camera can miss the cycles',
      question: 'When can different oscillations produce the same sampled signal?',
      parameters: [parameter('signalFrequency', 'Signal frequency', 'Hz', 0, 30, .1, 7), parameter('sampleRate', 'Sampling rate', 'samples/s', 1, 60, 1, 10), parameter('phase', 'Initial phase', '°', 0, 360, 1, 30)],
      assumptions: ['One pure sine with unit amplitude, sampled instantaneously at equal time intervals.', 'No exposure blur, noise, anti-alias filter or frequency inference from real footage.', 'The lowest folded frequency is one possible explanation of the samples, not a uniquely recovered signal. At Nyquist, phase can conceal the oscillation completely.'],
      equation: 'y[n] = sin(2πf n/fₛ + φ); f_alias = |((f + fₛ/2) mod fₛ) − fₛ/2|',
      sources: [source('NIST · Sampling and aliasing', 'https://tf.nist.gov/phase/Properties/ten.htm', 'Equal-spaced sampling, Nyquist frequency and ambiguity between signal frequencies.'), source('NIST · Introduction to sampled data, §3.5', 'https://nvlpubs.nist.gov/nistpubs/Legacy/TN/nbstechnicalnote334.pdf', 'Spectral folding above half the sampling frequency; examples of alias frequencies.')],
      calculate(p) { let signedAlias = ((p.signalFrequency + p.sampleRate / 2) % p.sampleRate + p.sampleRate) % p.sampleRate - p.sampleRate / 2; if (Math.abs(signedAlias) < 1e-12) signedAlias = 0; const phase = p.phase / DEG; const aliasFrequency = Math.abs(signedAlias); const samples = Array.from({length: Math.floor(p.sampleRate) + 1}, (_, i) => ({time: i / p.sampleRate, value: Math.sin(TAU * p.signalFrequency * i / p.sampleRate + phase)})); return {signedAlias, aliasFrequency, phase, samples, atOrAboveNyquist: p.signalFrequency >= p.sampleRate / 2, outputs: [output('Apparent alias frequency', aliasFrequency, 'Hz', 2), output('Nyquist frequency', p.sampleRate / 2, 'Hz', 2)]}; }
    },
    doppler: {
      title: 'An approaching sound rises in pitch',
      question: 'What does a stationary listener hear from a moving source?',
      parameters: [parameter('sourceFrequency', 'Emitted frequency', 'Hz', 100, 2000, 10, 500), parameter('sourceVelocity', 'Source velocity toward listener', 'm/s', -100, 100, 1, 40)],
      assumptions: ['Sound in stationary, uniform air with assumed wave speed 343 m/s.', 'Listener is stationary in the medium; source moves directly toward (+) or away from (−) the listener.', 'Subsonic, constant velocity. This acoustic model does not apply to electromagnetic or relativistic Doppler shifts.'],
      equation: 'f_observed = f_source c_sound / (c_sound − v_source); λ_ahead = (c_sound − v_source)/f_source',
      sources: [source('OpenStax · The Doppler effect', 'https://openstax.org/books/university-physics-volume-1/pages/17-7-the-doppler-effect', 'Stationary observer and moving subsonic sound source, with the direction-dependent denominator.')],
      calculate(p) { const observed = p.sourceFrequency * 343 / (343 - p.sourceVelocity); const wavelength = (343 - p.sourceVelocity) / p.sourceFrequency; return {observed, wavelength, outputs: [output('Observed frequency', observed, 'Hz', 2), output('Frequency shift', observed - p.sourceFrequency, 'Hz', 2), output('Wavelength toward listener', wavelength, 'm', 3)]}; }
    },
    wave: {
      title: 'Frequency trades places with wavelength',
      question: 'What wavelength belongs to a radio frequency in vacuum?',
      parameters: [parameter('frequency', 'Radio frequency', 'MHz', 50, 1000, 10, 100)],
      assumptions: ['Plane electromagnetic wave in vacuum; c = 299,792,458 m/s exactly.', 'Frequency is entered in MHz and converted to Hz before calculation.', 'Vertical amplitude is normalized for the diagram. No field strength, transmitted power, antenna gain or biological effect is calculated.'],
      equation: 'λ = c/f; T = 1/f',
      sources: [source('OpenStax · Plane electromagnetic waves', 'https://openstax.org/books/university-physics-volume-2/pages/16-2-plane-electromagnetic-waves', 'Relation between vacuum propagation speed, frequency and wavelength.'), astro],
      calculate(p) { const frequency = p.frequency * 1e6; const wavelength = C / frequency; return {frequency, wavelength, period: 1 / frequency, outputs: [output('Wavelength', wavelength, 'm', 4), output('Period', 1e9 / frequency, 'ns', 3)]}; }
    },
    snell: {
      title: 'Light bends at a boundary',
      question: 'When does a refracted ray become total internal reflection?',
      parameters: [parameter('n1', 'Incident-medium index', '', 1, 2.5, .01, 1), parameter('n2', 'Second-medium index', '', 1, 2.5, .01, 1.5), parameter('angle', 'Incident angle from normal', '°', 0, 89, 1, 45)],
      assumptions: ['Flat boundary between ordinary positive-index, lossless media.', 'Angles are measured from the normal. Refractive indices are fixed for the chosen light.', 'No Fresnel intensity calculation, polarization, absorption or negative-index materials. A reflected ray is shown geometrically; its brightness is not reflectance.'],
      equation: 'n₁ sin θ₁ = n₂ sin θ₂; θ_critical = asin(n₂/n₁) when n₁ > n₂',
      sources: [source('OpenStax · Refraction', 'https://openstax.org/books/university-physics-volume-3/pages/1-3-refraction', 'Snell’s law, positive refractive index and angles measured from the normal.'), source('OpenStax · Total internal reflection', 'https://openstax.org/books/university-physics-volume-3/pages/1-4-total-internal-reflection', 'Critical angle and the high-index to low-index condition for total internal reflection.')],
      calculate(p) { const sine = p.n1 / p.n2 * Math.sin(p.angle / DEG); const totalInternalReflection = sine > 1 + 1e-12; const refractedAngle = totalInternalReflection ? null : Math.asin(Math.min(1, sine)) * DEG; const criticalAngle = p.n1 > p.n2 ? Math.asin(p.n2 / p.n1) * DEG : null; const outputs = [output('Reflection angle', p.angle, '°', 2)]; if (refractedAngle !== null) outputs.unshift(output('Refraction angle', refractedAngle, '°', 2)); if (criticalAngle !== null) outputs.push(output('Critical angle', criticalAngle, '°', 2)); return {totalInternalReflection, refractedAngle, criticalAngle, status: totalInternalReflection ? 'Total internal reflection' : 'Refraction', outputs}; }
    },
    oscillator: {
      title: 'A spring has a natural rhythm',
      question: 'How do stiffness and mass set an oscillator’s frequency?',
      parameters: [parameter('mass', 'Oscillating mass', 'kg', .1, 10, .1, 1), parameter('stiffness', 'Spring stiffness', 'N/m', 1, 400, 1, 40), parameter('amplitude', 'Displacement amplitude', 'm', .01, .5, .01, .1)],
      assumptions: ['Ideal linear spring, fixed support, negligible spring mass and no damping.', 'Released from rest at maximum displacement: x(t) = A cos(ωt).', 'Changing amplitude changes displacement, not the natural frequency in this linear model. Oscillation is not a prediction of net thrust.'],
      equation: 'ω = √(k/m); f = ω/(2π); T = 2π√(m/k); x(t) = A cos(ωt)',
      sources: [source('OpenStax · Simple harmonic motion', 'https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion', 'Mass-spring motion and the relationship among angular frequency, period, mass and stiffness.')],
      calculate(p) { const omega = Math.sqrt(p.stiffness / p.mass); return {omega, frequency: omega / TAU, period: TAU / omega, outputs: [output('Natural frequency', omega / TAU, 'Hz', 3), output('Period', TAU / omega, 's', 3)]}; }
    }
  };

  const learning = {
    momentum: {
      takeaway: 'Thrust needs momentum transfer. At fixed exhaust speed, doubling mass flow doubles thrust and exhaust kinetic power.',
      steps: [
        ['Count the outgoing mass', 'Mass flow is the propellant mass crossing the exit each second. Set it to zero and the momentum-thrust term vanishes.'],
        ['Change the exit speed', 'Exhaust speed is measured relative to the vehicle. Faster exhaust carries more momentum per kilogram.'],
        ['Balance the momentum', 'Multiply mass flow by exhaust speed to find thrust. Exhaust kinetic power grows with speed squared, so it grows faster than thrust.']
      ]
    },
    inverseSquare: {
      takeaway: 'Doubling source distance reduces intensity to one quarter when the point-source assumptions apply.',
      steps: [
        ['Choose a reference', 'The reference distance defines intensity ratio 1. No absolute source brightness is needed to compare two distances.'],
        ['Spread the same light', 'At a larger radius, the same emitted power passes through a larger spherical area. That area grows as radius squared.'],
        ['Compare the ratio', 'Divide reference distance by observation distance, then square. A logarithmic plot makes the full range readable.']
      ]
    },
    parallax: {
      takeaway: 'Apparent angular motion can come entirely from observer motion. Without range and viewing geometry it is not a target-speed measurement.',
      steps: [
        ['Fix the target', 'Start with a stationary target straight ahead. The initial sight line is perpendicular to the camera path.'],
        ['Move the viewpoint', 'The camera travels sideways by speed times interval. The second sight line now forms a right triangle with the first.'],
        ['Read the angle', 'Arctangent of baseline divided by range gives the sight-line shift. Dividing by the interval gives its average angular rate.']
      ]
    },
    diffraction: {
      takeaway: 'A larger ideal aperture resolves smaller angles; a longer wavelength increases the diffraction limit.',
      steps: [
        ['Set the optical scale', 'Specify a wavelength in nanometres and aperture diameter in millimetres. Both are converted to metres before division.'],
        ['Find the angular limit', 'The Rayleigh criterion estimates the separation of two point sources at the resolution threshold of a circular aperture.'],
        ['Separate ideal from practical', 'The diagram shows the calculated angle on a shared ruler. Real optics may perform worse because of atmosphere, aberrations, noise or detector sampling.']
      ]
    },
    orbit: {
      takeaway: 'A higher circular orbit moves more slowly but covers a larger circumference, so its period increases.',
      steps: [
        ['Measure from the center', 'Add altitude to the adopted mean Earth radius. The gravity equation uses center-to-center distance, not altitude alone.'],
        ['Match gravity to curvature', 'Circular motion requires a centripetal acceleration. Equating this to Newtonian gravitational acceleration sets the orbital speed.'],
        ['Time one lap', 'Divide circumference by speed to find the period. This ideal calculation does not describe orbital decay or an actual mission trajectory.']
      ]
    },
    sampling: {
      takeaway: 'The same samples can fit more than one continuous signal. A low-frequency appearance is not proof of a low-frequency source.',
      steps: [
        ['Make a continuous signal', 'The gray curve is a unit-amplitude sine with the selected frequency and starting phase.'],
        ['Keep only the samples', 'Gold dots record the sine at equally spaced instants. What happens between those dots is not observed.'],
        ['Find another explanation', 'The dashed curve is the folded low-frequency alias. It passes through the same dots, exposing the ambiguity rather than recovering a unique original signal.']
      ]
    },
    doppler: {
      takeaway: 'A source approaching through still air raises the received pitch; receding motion lowers it.',
      steps: [
        ['Hold the listener still', 'The sound source emits its chosen frequency. The medium and listener are stationary, and sound speed is fixed at 343 m/s.'],
        ['Move the source', 'Positive velocity means motion toward the listener. Consecutive wavefronts arrive closer together; negative velocity spreads them apart.'],
        ['Compare received cycles', 'The color curve uses the calculated received frequency on the same time axis as the gray emitted-frequency curve. This is acoustic Doppler, not a light-wave formula.']
      ]
    },
    wave: {
      takeaway: 'In vacuum, doubling electromagnetic frequency halves wavelength and period; propagation speed stays c.',
      steps: [
        ['Convert the frequency', 'One megahertz is one million cycles per second. The calculation converts the frequency slider to hertz.'],
        ['Link space and time', 'A wave advances one wavelength in one period. Dividing the vacuum speed of light by frequency gives that wavelength.'],
        ['Read the spatial pattern', 'The plot freezes one instant over six metres. The gold arrow spans one wavelength; vertical amplitude is normalized and says nothing about power.']
      ]
    },
    snell: {
      takeaway: 'Refraction follows the index ratio. Total internal reflection requires travel from higher to lower index above the critical angle.',
      steps: [
        ['Identify the normal', 'The dashed line is perpendicular to the boundary. Incident and refracted angles are measured from that line.'],
        ['Apply Snell’s law', 'Multiply the incident-angle sine by the ratio of refractive indices. If the result is at most one, its inverse sine gives a transmitted direction.'],
        ['Check the critical case', 'At the critical angle the transmitted direction lies along the boundary. Above it, there is no propagating refracted ray in this model: total internal reflection occurs.']
      ]
    },
    oscillator: {
      takeaway: 'Natural frequency rises with the square root of stiffness and falls with the square root of mass. Amplitude does not change it in this ideal model.',
      steps: [
        ['Displace a mass on a spring', 'Release the mass from rest at the selected amplitude. The support is fixed, and the spring obeys a linear restoring-force law.'],
        ['Balance force and inertia', 'The stiffness-to-mass ratio sets angular frequency squared. A stiffer spring returns faster; a heavier mass responds more slowly.'],
        ['Follow the repeating motion', 'The plotted cosine shows displacement over time. The mass oscillates about equilibrium; the calculation predicts no net propulsion.']
      ]
    }
  };
  for (const [id, lesson] of Object.entries(learning)) {
    models[id].takeaway = lesson.takeaway;
    models[id].steps = lesson.steps.map(([title, body], index) => ({title, body, progress: index / 2}));
  }

  function inputs(id, values = {}) {
    const model = models[id];
    if (!model || !Object.prototype.hasOwnProperty.call(models, id)) throw new RangeError(`Unknown experiment: ${id}`);
    if (!values || typeof values !== 'object' || Array.isArray(values)) throw new TypeError(`${id}: values must be a parameter object`);
    for (const key of Object.keys(values)) if (!model.parameters.some(p => p.key === key)) throw new RangeError(`${id}: Unknown parameter ${key}`);
    const normalized = {};
    for (const p of model.parameters) {
      const value = Object.prototype.hasOwnProperty.call(values, p.key) ? values[p.key] : p.value;
      if (typeof value !== 'number' || !Number.isFinite(value)) throw new TypeError(`${id}: ${p.label} must be a finite number in ${p.unit || 'dimensionless units'}`);
      if (value < p.min || value > p.max) throw new RangeError(`${id}: ${p.label} must be between ${p.min} and ${p.max} ${p.unit}`);
      normalized[p.key] = value;
    }
    return normalized;
  }
  for (const [id, model] of Object.entries(models)) {
    const formula = model.calculate;
    model.calculate = function (values = {}) {
      const normalized = inputs(id, values);
      const result = formula(normalized);
      if (!result.outputs.every(item => Number.isFinite(item.value))) throw new Error(`${id}: calculation produced a nonfinite output`);
      return {id, values: normalized, ...result};
    };
  }
  function calculate(id, values = {}) {
    inputs(id, values);
    return models[id].calculate(values);
  }

  function text(ctx, value, x, y, color = '#b8c9db', size = 17, align = 'left') {
    ctx.fillStyle = color; ctx.font = `${size}px system-ui, sans-serif`; ctx.textAlign = align; ctx.fillText(value, x, y);
  }
  function line(ctx, x1, y1, x2, y2, color = '#55647b', width = 2, dashed = false) {
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.setLineDash(dashed ? [6, 6] : []); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.setLineDash([]);
  }
  function arrow(ctx, x1, y1, x2, y2, color, width = 3) {
    line(ctx, x1, y1, x2, y2, color, width); const angle = Math.atan2(y2-y1, x2-x1); ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(x2,y2); ctx.lineTo(x2-10*Math.cos(angle-.4),y2-10*Math.sin(angle-.4)); ctx.lineTo(x2-10*Math.cos(angle+.4),y2-10*Math.sin(angle+.4)); ctx.closePath(); ctx.fill();
  }
  function circle(ctx, x, y, radius, color, filled = false) {
    ctx.beginPath();ctx.arc(x,y,Math.max(0,radius),0,TAU);if(filled){ctx.fillStyle=color;ctx.fill();}else{ctx.strokeStyle=color;ctx.lineWidth=2;ctx.stroke();}
  }
  function chart(ctx, {left=72, top=100, width=650, height=220, xmin=0, xmax=1, ymin=-1, ymax=1, xlabel='', ylabel=''}) {
    const px = value => left+(value-xmin)/(xmax-xmin)*width;
    const py = value => top+height-(value-ymin)/(ymax-ymin)*height;
    for(let i=0;i<=4;i++){const y=top+i*height/4;line(ctx,left,y,left+width,y,'#223044',1);}
    line(ctx,left,top,left,top+height);line(ctx,left,top+height,left+width,top+height);
    text(ctx,String(Number(xmin.toPrecision(3))),left,top+height+24,'#8fa4bd',14);text(ctx,String(Number(xmax.toPrecision(3))),left+width,top+height+24,'#8fa4bd',14,'right');
    text(ctx,String(Number(ymax.toPrecision(3))),left-9,top+6,'#8fa4bd',14,'right');text(ctx,String(Number(ymin.toPrecision(3))),left-9,top+height,'#8fa4bd',14,'right');
    text(ctx,xlabel,left+width/2,top+height+48,'#c5d1df',15,'center');text(ctx,ylabel,left,top-17,'#c5d1df',15);
    return {px,py,left,top,width,height};
  }
  function curve(ctx, axes, fn, xmin, xmax, color, dashed=false) {
    ctx.save();ctx.beginPath();ctx.rect(axes.left,axes.top,axes.width,axes.height);ctx.clip();ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.setLineDash(dashed?[7,5]:[]);ctx.beginPath();
    for(let i=0;i<=800;i++){const x=xmin+(xmax-xmin)*i/800;const y=fn(x);if(i===0)ctx.moveTo(axes.px(x),axes.py(y));else ctx.lineTo(axes.px(x),axes.py(y));}ctx.stroke();ctx.restore();
  }
  const diagrams = {
    momentum(ctx,r,color) {
      const p=r.values;
      text(ctx,'EXHAUST',85,105,color,15);text(ctx,'VEHICLE',370,105,'#d6dfeb',15);text(ctx,'THRUST',600,105,color,15);
      ctx.fillStyle='#283d52';ctx.fillRect(350,145,100,75);ctx.beginPath();ctx.moveTo(450,145);ctx.lineTo(495,183);ctx.lineTo(450,220);ctx.closePath();ctx.fill();
      const massDots=Math.round(p.massFlow*10);
      for(let i=0;i<massDots;i++)circle(ctx,320-(i%10)*23,155+Math.floor(i/10)*13,2.5,color,true);
      const exhaustLength=30+200*p.exhaustVelocity/10000;
      arrow(ctx,320,250,320-exhaustLength,250,color);text(ctx,`${p.exhaustVelocity.toFixed(0)} m/s`,200,280,color,17,'center');
      if(r.thrust>0)arrow(ctx,505,180,505+200*r.thrust/50000,180,color,5);
      text(ctx,`${r.thrust.toFixed(1)} N`,600,225,'#edf4fa',24,'center');
      text(ctx,`${p.massFlow.toFixed(2)} kg leaves each second`,400,326,'#c5d1df',19,'center');
      text(ctx,'Arrow scale: 200 px = 50,000 N; dots encode mass flow.',400,372,'#8fa4bd',14,'center');
    },
    inverseSquare(ctx,r,color) {
      const axes=chart(ctx,{xmin:0,xmax:2,ymin:-4,ymax:4,xlabel:'log₁₀ distance / m  (0 = 1 m; 2 = 100 m)',ylabel:'log₁₀ relative intensity'});
      curve(ctx,axes,x=>2*(Math.log10(r.values.referenceDistance)-x),0,2,color);
      circle(ctx,axes.px(Math.log10(r.values.distance)),axes.py(Math.log10(r.ratio)),7,color,true);
      circle(ctx,axes.px(Math.log10(r.values.referenceDistance)),axes.py(0),6,'#f1cd83');
      text(ctx,'Solid dot: observation. Ring: reference intensity = 1.',400,395,'#b8c9db',15,'center');
    },
    parallax(ctx,r,color) {
      const scale=210/Math.max(r.values.range,r.baseline,1), start={x:220,y:305}, target={x:220,y:305-r.values.range*scale}, finish={x:220+r.baseline*scale,y:305};
      line(ctx,start.x,start.y,target.x,target.y,'#637d98',2,true);line(ctx,finish.x,finish.y,target.x,target.y,color,3);arrow(ctx,start.x,start.y,finish.x,finish.y,'#f1cd83');
      circle(ctx,target.x,target.y,7,color,true);circle(ctx,start.x,start.y,7,'#f1cd83',true);circle(ctx,finish.x,finish.y,7,color,true);
      text(ctx,'Fixed target',target.x-18,target.y-22,color,17);text(ctx,'Camera start',180,333,'#f1cd83',16);text(ctx,'Camera end',finish.x+16,305,color,16);
      text(ctx,`Range: ${r.values.range.toFixed(0)} m`,470,145,'#b8c9db',19);text(ctx,`Baseline: ${r.baseline.toFixed(1)} m`,470,185,'#b8c9db',19);text(ctx,`Angle shift: ${(r.angle*DEG).toFixed(3)}°`,470,235,color,24);
      text(ctx,'Geometry uses one uniform spatial scale; target never moves.',400,380,'#8fa4bd',15,'center');
    },
    diffraction(ctx,r,color) {
      const px=angle=>90+(angle+30)/60*620;
      const threshold=r.arcseconds;
      ctx.fillStyle='#233c49';ctx.fillRect(px(-threshold),150,px(threshold)-px(-threshold),140);
      line(ctx,90,290,710,290,'#61758a');
      for(const angle of [-30,-15,0,15,30]){line(ctx,px(angle),284,px(angle),300,'#61758a');text(ctx,String(angle),px(angle),322,'#8fa4bd',15,'center');}
      line(ctx,px(0),130,px(0),290,'#f1cd83',2,true);
      line(ctx,px(threshold),130,px(threshold),290,color,3);
      circle(ctx,px(0),105,7,'#f1cd83',true);circle(ctx,px(threshold),105,7,color,true);
      text(ctx,`θ = ${threshold.toFixed(3)} arcsec`,400,76,color,23,'center');
      text(ctx,'Angular separation / arcseconds',400,353,'#c5d1df',16,'center');
      text(ctx,'Two point directions separated by the ideal resolution limit.',400,395,'#8fa4bd',15,'center');
    },
    orbit(ctx,r,color) {
      const scale=140/(EARTH_RADIUS+36000000),cx=225,cy=235, earth=EARTH_RADIUS*scale,orb=r.radius*scale;
      circle(ctx,cx,cy,earth,'#325d79',true);circle(ctx,cx,cy,orb,color);
      circle(ctx,cx+orb,cy,6,'#f1cd83',true);arrow(ctx,cx+orb,cy,cx+orb,cy-65,color);
      text(ctx,'Earth',cx,cy+earth+24,'#b8c9db',16,'center');
      text(ctx,`${(r.period/60).toFixed(2)} min`,470,170,color,34);text(ctx,'for one circular orbit',470,201,'#b8c9db',17);
      text(ctx,`${(r.speed/1000).toFixed(3)} km/s`,470,258,'#f1cd83',27);text(ctx,'tangential orbital speed',470,288,'#b8c9db',17);
      text(ctx,'Shared spatial scale: outermost allowed orbit = 36,000 km altitude.',400,380,'#8fa4bd',14,'center');
    },
    sampling(ctx,r,color) {
      const axes=chart(ctx,{xmin:0,xmax:1,ymin:-1.2,ymax:1.2,xlabel:'Time / seconds',ylabel:'Normalized signal'});
      curve(ctx,axes,time=>Math.sin(TAU*r.values.signalFrequency*time+r.phase),0,1,'#8493a8');
      curve(ctx,axes,time=>Math.sin(TAU*r.signedAlias*time+r.phase),0,1,color,true);
      for(const point of r.samples)circle(ctx,axes.px(point.time),axes.py(point.value),4,'#f1cd83',true);
      text(ctx,'Gray: original sine · Dashed: alias · Gold: identical samples',400,395,'#b8c9db',15,'center');
    },
    doppler(ctx,r,color) {
      const axes=chart(ctx,{xmin:0,xmax:.01,ymin:-1.2,ymax:1.2,xlabel:'Time / seconds',ylabel:'Normalized pressure oscillation'});
      curve(ctx,axes,time=>Math.sin(TAU*r.values.sourceFrequency*time),0,.01,'#8493a8');
      curve(ctx,axes,time=>Math.sin(TAU*r.observed*time),0,.01,color);
      text(ctx,`Gray: emitted ${r.values.sourceFrequency.toFixed(0)} Hz · Color: heard ${r.observed.toFixed(1)} Hz`,400,395,'#b8c9db',15,'center');
    },
    wave(ctx,r,color) {
      const axes=chart(ctx,{xmin:0,xmax:6,ymin:-1.2,ymax:1.2,xlabel:'Distance along propagation / metres',ylabel:'Normalized electric field at one instant'});
      curve(ctx,axes,distance=>Math.sin(TAU*distance/r.wavelength),0,6,color);
      arrow(ctx,axes.px(0),62,axes.px(r.wavelength),62,'#f1cd83',2);
      text(ctx,`One wavelength = ${r.wavelength.toFixed(4)} m`,400,395,'#b8c9db',17,'center');
    },
    snell(ctx,r,color) {
      const cx=390,cy=235,len=145,angle=r.values.angle/DEG;
      ctx.fillStyle='#102232';ctx.fillRect(45,cy,710,140);line(ctx,45,cy,755,cy,'#61758a');line(ctx,cx,70,cx,375,'#f1cd83',1,true);
      arrow(ctx,cx-Math.sin(angle)*len,cy-Math.cos(angle)*len,cx,cy,color);
      arrow(ctx,cx,cy,cx+Math.sin(angle)*len,cy-Math.cos(angle)*len,'#8d9bb0',2);
      if(!r.totalInternalReflection){const second=r.refractedAngle/DEG;arrow(ctx,cx,cy,cx+Math.sin(second)*len,cy+Math.cos(second)*len,color,3);}
      text(ctx,`n₁ = ${r.values.n1.toFixed(2)}`,70,110,'#b8c9db',19);text(ctx,`n₂ = ${r.values.n2.toFixed(2)}`,70,345,'#b8c9db',19);
      text(ctx,`${r.values.angle.toFixed(1)}° from normal`,500,110,color,18);text(ctx,r.status,500,340,color,18);
      text(ctx,'Angles are drawn to scale. Brightness does not encode reflected power.',400,402,'#8fa4bd',14,'center');
    },
    oscillator(ctx,r,color) {
      const axes=chart(ctx,{top:135,height:180,xmin:0,xmax:2,ymin:-.5,ymax:.5,xlabel:'Time / seconds',ylabel:'Displacement from equilibrium / metres'});
      curve(ctx,axes,time=>r.values.amplitude*Math.cos(r.omega*time),0,2,color);
      line(ctx,axes.left,axes.py(0),axes.left+axes.width,axes.py(0),'#f1cd83',1,true);
      text(ctx,`f = ${r.frequency.toFixed(3)} Hz · T = ${r.period.toFixed(3)} s`,400,72,color,23,'center');
      text(ctx,'Fixed support + spring + mass. Oscillation alone does not imply thrust.',400,395,'#8fa4bd',14,'center');
    }
  };
  function render(canvas, id, values = {}, options = {}) {
    const result = calculate(id, values);
    if (!canvas || typeof canvas.getContext !== 'function') throw new TypeError('render: a canvas is required');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('render: a 2D canvas context is required');
    if (!canvas.width || !canvas.height) throw new RangeError('render: canvas dimensions must be positive');
    const color = typeof options.color === 'string' ? options.color : '#79dacf';
    ctx.save();
    try {
      ctx.resetTransform();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.setLineDash([]);ctx.shadowBlur=0;ctx.shadowOffsetX=0;ctx.shadowOffsetY=0;ctx.filter='none';
      ctx.fillStyle='#09121f';ctx.fillRect(0,0,canvas.width,canvas.height);
      const scale=Math.min(canvas.width/800,canvas.height/420);ctx.translate((canvas.width-800*scale)/2,(canvas.height-420*scale)/2);ctx.scale(scale,scale);
      text(ctx,`${options.label ? String(options.label).slice(0,32)+' · ' : ''}${models[id].title}`,32,35,'#e3edf7',19);
      diagrams[id](ctx,result,color);
    } finally {ctx.restore();}
    return result;
  }
  global.MuseumExperiments = {models, calculate, render, constants: {speedOfLight:C, earthMu:EARTH_MU, earthRadius:EARTH_RADIUS}};
})(window);
