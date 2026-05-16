---
layout: page
permalink: /projects/e-ink-display/
tags: [esp32, e-ink, ble, iot, low-power]
---

<div class="hero">
  <h2 class="hero__title">Battery-powered ESP32 E‑Ink Display</h2>
A small ESP32 + e‑ink display platform with 8+ month battery life

  <div class="btn-row">
    <a class="btn btn--primary" href="{{ shopify.products.eInkDisplay }}">Buy PCB →</a>
    <a class="btn btn--secondary" href="{{ '/guides/e-ink/' | url }}">Build guide →</a>
  </div>
</div>

<div class="grid grid--3">
  <div class="card">
    <h3 class="card__title">Through-hole friendly design</h3>
    <p class="card__description">All components are through-hole for easy, beginner-friendly soldering. No tiny SMD parts.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Web flashing</h3>
    <p class="card__description">Install firmware directly from your browser.</p>
  </div>
  <div class="card">
    <h3 class="card__title">BLE configuration</h3>
    <p class="card__description">Pair over Bluetooth to set Wi‑Fi, refresh intervals, and settings.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Multiple firmware “apps”</h3>
    <p class="card__description">Sensor readouts and lightweight fun API content.</p>
  </div>
  </div>
<div class="grid grid--2">
  <div class="card">
    <h3 class="card__title">Product video (coming soon)</h3>
    <p class="card__description">Add a short “flash → pair → update” walkthrough video here.</p>
    <div class="placeholder-image">🎥</div>
  </div>
  <div class="card">
    <h3 class="card__title">Gallery (placeholder)</h3>
    <p class="card__description">Add photos: PCB front/back, assembled build, and a few in-use shots.</p>
    <div class="placeholder-image">🖼️</div>
  </div>
</div>


## Why I Built it and Why it Matters

I built it to monitor environmental conditions (temperature and humidity) at the point of experiment. Environmental factors are often under monitored and can lead to phantom process problems, especially for very environmentally sensitive processes such as wet chemistry and photolithography.
It has been my experiece that even in "climate controlled" spaces such as cleanrooms, temperature and humidity are not always as uniform as building HVAC systems would lead you to believe. 

I wanted the environmental data to not only be displayed, but collected and sent to the lab management software for long term tracking. This is accomplished using the "sensor" app.
With this platform, I realized I could also have it retrieve information from various APIs (via the "fun" app).

## Key Specs:
- Battery life: 8-12 month using 2 3300 mAh 18650 batteries an 30 minute refresh interval
  - Battery life heavily dependent on refresh interval
- Display size: 2.9"
- Approximate unit cost: $25
- **Anything else??**

## Build guide

For assembly order, firmware flashing, BLE setup, and configuration links, start with the [E‑Ink Display build guide]({{ '/guides/e-ink/' | url }}).

## Documentation & support

<div class="related-content">
  <h3>Support checklist (placeholder)</h3>
  <div class="related-grid">
    <div class="related-card">
      <h4>Guide</h4>
      <p>Parts, assembly order, flashing, BLE config.</p>
    </div>
    <div class="related-card">
      <h4>Troubleshooting</h4>
      <p>“Won’t flash”, “won’t pair”, “blank screen”, “battery drain”.</p>
    </div>
    <div class="related-card">
      <h4>Revision/compatibility</h4>
      <p>PCB rev identifiers, supported panel/ESP32 variants.</p>
    </div>
    <div class="related-card">
      <h4>Support</h4>
      <p>What to include when asking for help (photos, versions, logs).</p>
    </div>
  </div>
</div>

**Sell & support docs checklist:** [Selling & support checklist (hardware)]({{ '/guides/support-checklist/' | url }})

