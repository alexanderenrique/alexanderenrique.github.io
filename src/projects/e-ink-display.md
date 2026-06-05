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

I originally built this device to monitor environmental conditions, primarily temperature and humidity, directly at the point of experiment. Environmental factors are often under-monitored in laboratory settings and can contribute to subtle, difficult-to-diagnose process variations, particularly in environmentally sensitive workflows such as wet chemistry, photolithography, and materials processing.

In my experience, even in "climate-controlled" environments such as cleanrooms, temperature and humidity are not always as uniform as building HVAC specifications would suggest. Localized variations caused by equipment, airflow patterns, occupancy, and room layout can create meaningful differences between what the facility reports and what an experiment actually experiences.

I wanted this environmental data to be more than just a real-time display. The device continuously collects measurements and uploads them to the laboratory management system through the Sensor app, enabling long-term logging, trend analysis, and historical correlation with experimental results. This makes it possible to identify environmental influences that might otherwise be mistaken for equipment or process issues.

Once the platform was in place, it became clear that the same hardware could serve additional purposes. Through the Fun app, the display can retrieve and present information from external APIs, transforming it from a simple environmental monitor into a flexible laboratory (or home) information display. The low-power e-paper display allows information to remain visible at all times while consuming minimal energy, making it well-suited for continuous deployment throughout the lab.


## Key Specs:

### Core Hardware
- Display: 2.9" two tone e-paper
- Display resolution: 296 × 128 pixels
- Wireless connectivity: IEEE 802.11 b/g/n (2.4 GHz)
- Microcontroller: SEED Studios ESP32-C3
- Sampling interval: User configurable
- Unit cost: Approximately $25
- Weight: ~130g
- Dimensions (in): 3.880 × 1.58 × 1.78 in
- Dimensions (mm): 98.55 × 40.13 × 45.21 mm

### Suggested Battery Configuration
- Battery: 2 × 18650 Li-ion cells
- Battery capacity: 6,600 mAh nominal total
- Battery life: 8–12 months at 30-minute refresh intervals
- Deep-sleep current: 50 µA


### SHT31 Temperature Sensor Specs:
- Temperature measurement range: -40°C to 125°C
- Temperature accuracy: ±0.3°C
- Humidity measurement range: 0–100 %RH
- Humidity accuracy: ±2 %RH

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

<div class="card card--video">
  <h3 class="card__title">Printing the case</h3>
  <p class="card__description">Everybody likes watching a 3D printer, even a video of a 3D printer</p>
  <video class="project-video" controls playsinline>
    <source src="{{ '/images/IMG_0047.mp4' | url }}" type="video/mp4">
  </video>
</div>

