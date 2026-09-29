---
layout: page
permalink: /projects/T-Bird_electronics/
tags: [electronics, classic-car, thunderbird, esp32, automotive]
---

<div class="hero">
  <h2 class="hero__title">T-Bird Electronics</h2>
  <p class="hero__subtitle">Modern electronics for the 1968 Thunderbird restomod: sensors, displays, power management, and more.</p>

  <div class="btn-row">
    <a class="btn btn--primary" href="{{ sources.smartTbird.repo }}" target="_blank" rel="noopener noreferrer">GitHub →</a>
    <a class="btn btn--secondary" href="{{ '/microelectronics/T-bird_electronics/' | url }}">Work log hub →</a>
    <a class="btn btn--secondary" href="{{ '/wrenching/thunderbird-restomod/' | url }}">Restomod notes →</a>
  </div>
</div>

<div class="grid grid--3">
  <div class="card">
    <h3 class="card__title">Sensor network</h3>
    <p class="card__description">Oil, coolant, and trans temps plus system voltage on an RS-485 bus, hardened for the engine bay.</p>
  </div>
  <div class="card">
    <h3 class="card__title">In-dash display</h3>
    <p class="card__description">A display and control node for live engine data: voltage, temps, O2, and future methanol monitoring.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Analog where it fits</h3>
    <p class="card__description">The alternator delay is a CMOS 555 and a MOSFET. No MCU, no firmware, nothing to flash at the curb.</p>
  </div>
  <div class="card">
    <h3 class="card__title">One repo</h3>
    <p class="card__description">Firmware and board files for the modules live together in <a href="{{ sources.smartTbird.repo }}" target="_blank" rel="noopener noreferrer">smart_tbird</a>.</p>
  </div>
</div>

## Modules

<div class="grid grid--2">
  <div class="card">
    <h3 class="card__title">Alternator Delay 555 Timer</h3>
    <p class="card__description">Analog delay circuit for alternator field excitation. No MCU, no firmware, just a CMOS 555 and a MOSFET.</p>
    <a href="{{ '/projects/alternator-555-timer/' | url }}" class="section__link">Project page →</a>
    <a href="{{ '/microelectronics/alternator_555_timer/' | url }}" class="section__link">Work log →</a>
  </div>

  <div class="card">
    <h3 class="card__title">T-Bird Display Node</h3>
    <p class="card__description">In-dash display and control node for real-time engine data: voltage, temps, O2, and future methanol monitoring.</p>
    <a href="{{ '/microelectronics/display_node/' | url }}" class="section__link">Work log →</a>
  </div>

  <div class="card">
    <h3 class="card__title">Engine Sensing Node</h3>
    <p class="card__description">Sensor node for oil, coolant, and trans temps plus system voltage. RS-485 bus, automotive-hardened enclosure.</p>
    <a href="{{ '/microelectronics/engine_sensing_node/' | url }}" class="section__link">Work log →</a>
    <a href="{{ '/projects/engine-monitor-bom.csv' | url }}" class="section__link" download="engine-monitor-bom.csv">BOM →</a>
  </div>

  <div class="card">
    <h3 class="card__title">Methanol Injection Controller</h3>
    <p class="card__description">Controller for methanol injection line pressure and spray monitoring.</p>
    <a href="{{ '/microelectronics/methanol_injection_controller/' | url }}" class="section__link">Work log →</a>
  </div>
</div>

## Quick links

- **Work log / lab notebook:** [T-Bird electronics hub]({{ '/microelectronics/T-bird_electronics/' | url }})
- **Related wrenching notes:** [Thunderbird restomod, work log]({{ '/wrenching/thunderbird-restomod/' | url }})
- **Source:** [smart_tbird on GitHub]({{ sources.smartTbird.repo }})
