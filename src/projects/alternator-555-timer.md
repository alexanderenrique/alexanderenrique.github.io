---
layout: page
permalink: /projects/alternator-555-timer/
tags: [automotive, analog, 555-timer, thunderbird, alternator]
---

<div class="hero">
  <h2 class="hero__title">Alternator 555 Timer</h2>
  <p class="hero__subtitle">A tiny analog delay circuit that excites the alternator field only after the engine is running, no MCU, no firmware, no belt squeal.</p>

  <div class="btn-row">
    <a class="btn btn--primary" href="{{ sources.alternator555Timer.pcbs }}" target="_blank" rel="noopener noreferrer">PCB files →</a>
    <a class="btn btn--secondary" href="{{ '/microelectronics/alternator_555_timer/' | url }}">Work log →</a>
  </div>
</div>

<div class="grid grid--3">
  <div class="card">
    <h3 class="card__title">Pure analog</h3>
    <p class="card__description">CMOS 555 monostable timer, no buck converter, no code, no flashing. Wire it in and forget it.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Delayed excitation</h3>
    <p class="card__description">Holds the alternator field off for ~10 seconds after key-on so V-belts can spin up before the load hits.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Simple I/O</h3>
    <p class="card__description">Three connections: I wire in, I wire out, and ground. Splice in to your exciter wire and add a ground.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Status LEDs</h3>
    <p class="card__description">Green = device has power. Red = alternator field is excited. Easy to see what's happening under the hood.</p>
  </div>
</div>

<div class="grid grid--2">
  <div class="card card--gallery">
    <h3 class="card__title">Gallery</h3>
    <div class="placeholder-image" aria-label="PCB and install photos coming soon"></div>
  </div>
</div>

## Why I Built It

Upgrading to a 140 A alternator on my 1968 Thunderbird was the right call electrically, and a nightmare mechanically. At full output, a modern alternator can pull roughly 3 horsepower through the factory V-belts. When the field excites immediately at startup, the belts slip and squeal before the engine has settled into a steady idle.

The fix is straightforward: **delay the alternator excitation** until the crankshaft is turning and the belts have traction. You could reach for an ESP32 and PWM your way into complexity, but this problem doesn't need a microcontroller. A 555 timer, a MOSFET, and a handful of passives do the job with nothing to flash and nothing to debug at 2 a.m. in a parking lot.

Crucially, the circuit is design to fail **on** so if the 555 dies, the alternator will still charge. If you totally fry the MOSFET somehow, the excitor wire can always be spliced back together on the side of the road and you can continue on normally. Not that I expect that to happen...

## Key Specs

### Core Circuit
- Timer: CMOS 555 (rail-to-rail output, critical for fully turning off the P-channel MOSFET)
- Delay: ~10 seconds nominal (8 to 12 s acceptable; set by RC network)
- Input: Alternator I wire, ground
- Output: Switched I wire to alternator field
- Indicators: Green power LED, red excitation-active LED
- PCB size: 1.5 in²
- Voltage range: 0-15V
  - Won't really work below 2V or so, and the LEDs won't illumitate below 12v. But the circuit will work.

### Why CMOS, Not Classic 555

The classic bipolar 555 doesn't swing fully to the positive rail, output tops out about 1.5 V below Vcc. That's uncomfortably close to the P-MOSFET gate threshold. A partially-on MOSFET has high resistance and generates serious heat. The CMOS variant (e.g. TLC555) is truly rail-to-rail and drives the FET hard off.

## Source files

<div class="card">
  <h3 class="card__title">PCB &amp; schematic</h3>
  <p class="card__description">Gerbers, schematic, and BOM on GitHub. Designed for through-hole and small SMD passives on a compact board that lives in the engine bay.</p>
  <a class="section__link" href="{{ sources.alternator555Timer.pcbs }}" target="_blank" rel="noopener noreferrer">PCB files →</a>
  <a class="section__link" href="{{ sources.alternator555Timer.repo }}" target="_blank" rel="noopener noreferrer">Repository →</a>
</div>

## Documentation & support

<div class="related-content">
  <h3>Support checklist (placeholder)</h3>
  <div class="related-grid">
    <div class="related-card">
      <h4>Wiring</h4>
      <p>I wire in/out, ground, and 12 V feed. Polarity and fuse placement.</p>
    </div>
    <div class="related-card">
      <h4>Troubleshooting</h4>
      <p>"No charge", "charges immediately", "MOSFET hot", "wrong delay".</p>
    </div>
    <div class="related-card">
      <h4>Revision/compatibility</h4>
      <p>PCB rev identifiers, alternator I-wire conventions (Ford, GM, etc.).</p>
    </div>
    <div class="related-card">
      <h4>Support</h4>
      <p>What to include when asking for help (photos, meter readings, alternator model).</p>
    </div>
  </div>
</div>

**Build & support docs checklist:** [Build & support checklist (hardware)]({{ '/guides/support-checklist/' | url }})

## Quick links

- **Work log / lab notebook:** [Alternator 555 Timer, work log]({{ '/microelectronics/alternator_555_timer/' | url }})
- **T-Bird electronics hub:** [All Thunderbird electronics work logs]({{ '/microelectronics/T-bird_electronics/' | url }})
- **Related wrenching notes:** [Thunderbird restomod, work log]({{ '/wrenching/thunderbird-restomod/' | url }})
