---
layout: page
permalink: /projects/e-ink-display/
tags: [esp32, e-ink, ble, iot, low-power]
---

<div class="hero">
  <h2 class="hero__title">Battery-powered ESP32 E‑Ink Display</h2>
  <p class="hero__subtitle">A small ESP32 + e‑ink display platform with 8+ month battery life</p>

  <div class="btn-row">
    <a class="btn btn--primary" href="{{ sources.eInkDisplay.pcbs }}" target="_blank" rel="noopener noreferrer">PCB files →</a>
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
  <div class="card card--video">
    <h3 class="card__title">Printing the case</h3>
    <p class="card__description">Everybody likes watching a 3D printer, even a video of a 3D printer</p>
    <video class="project-video" controls playsinline>
      <source src="{{ '/images/IMG_0047.mp4' | url }}" type="video/mp4">
    </video>
  </div>
  <div class="card card--gallery">
    <h3 class="card__title">Gallery</h3>
    <div class="photo-gallery">
      <figure class="photo-gallery__item">
        <img src="{{ '/images/IMG_0048.jpeg' | url }}" alt="E-Ink display showing ISS tracker">
        <figcaption class="photo-gallery__caption">Fun app — ISS tracker</figcaption>
      </figure>
      <figure class="photo-gallery__item">
        <img src="{{ '/images/IMG_8216.jpeg' | url }}" alt="E-Ink display showing a fun fact">
        <figcaption class="photo-gallery__caption">Fun app — desk display</figcaption>
      </figure>
      <figure class="photo-gallery__item">
        <img src="{{ '/images/IMG_9793.png' | url }}" alt="Humidity chart from sensor data in NEMO">
        <figcaption class="photo-gallery__caption">Sensor data in NEMO</figcaption>
      </figure>
    </div>
  </div>
</div>


## Why I Built it and Why it Matters

I built it to monitor environmental conditions (temperature and humidity) at the point of experiment. Environmental factors are often under-monitored and can lead to phantom process problems, especially for very environmentally sensitive processes such as wet chemistry and photolithography.
It has been my experience that even in "climate controlled" spaces such as cleanrooms, temperature and humidity are not always as uniform as building HVAC systems would lead you to believe.

I wanted the environmental data to not only be displayed, but collected and sent to the lab management software for long term tracking. This is accomplished using the "sensor" app.
With this platform, I realized I could also have it retrieve information from various APIs (via the "fun" app).

## Key Specs:
- Battery life: 8–12 months using two 3300 mAh 18650 batteries and a 30-minute refresh interval
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

**Build & support docs checklist:** [Build & support checklist (hardware)]({{ '/guides/support-checklist/' | url }})

