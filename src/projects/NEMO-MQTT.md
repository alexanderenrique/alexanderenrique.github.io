---
layout: page
title: "NEMO MQTT"
description: "Real-time tool status from NEMO to wall-mounted ESP32 displays over MQTT"
permalink: /projects/nemo-mqtt/
tags: [nemo, mqtt, django, postgres, iot]
---

<div class="hero">
  <h2 class="hero__title">NEMO → MQTT → Edge displays</h2>
  <p class="hero__subtitle">Near real-time tool state from NEMO to wall-mounted displays without slow REST polling.</p>

  <div class="btn-row">
    <a class="btn btn--primary" href="{{ shopify.products.nemoMqttPcb }}">Buy PCB →</a>
    <a class="btn btn--secondary" href="{{ '/guides/nemo-mqtt/' | url }}">Setup guide →</a>
    <a class="btn btn--secondary" href="{{ '/coding/NEMO-MQTT-Bridge/' | url }}">Work log →</a>
  </div>
</div>

<div class="grid grid--3">
  <div class="card">
    <h3 class="card__title">&lt;2s updates</h3>
    <p class="card__description">Tool on/off changes show up quickly where they matter—on the lab floor.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Postgres LISTEN/NOTIFY</h3>
    <p class="card__description">Avoids multi-minute polling loops and stays aligned with NEMO’s DB-centric model.</p>
  </div>
  <div class="card">
    <h3 class="card__title">MQTT fan-out</h3>
    <p class="card__description">Publish once; many subscribers (displays/dashboards/alerts) update in parallel.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Edge-friendly payloads</h3>
    <p class="card__description">Small messages with just the fields a microcontroller needs to render state.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Configurable security</h3>
    <p class="card__description">Broker auth + optional HMAC verification where configured.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Flexible topology</h3>
    <p class="card__description">Works when MCUs must stay off the public network (broker/bridge host in between).</p>
  </div>
</div>

<div class="grid grid--2">
  <div class="card">
    <h3 class="card__title">Demo video (placeholder)</h3>
    <p class="card__description">Add a quick clip showing NEMO enable/disable → display update.</p>
    <div class="placeholder-image">🎥</div>
  </div>
  <div class="card">
    <h3 class="card__title">In-lab photos (placeholder)</h3>
    <p class="card__description">Add photos: mounted display, PCB, and the full system layout.</p>
    <div class="placeholder-image">🧰</div>
  </div>
</div>

## What it is

This project pushes tool status out of **NEMO** in near real-time so you can drive wall-mounted displays, dashboards, or lightweight notifications without waiting on slow polling intervals.

At a high level: NEMO events land in Postgres, a bridge service publishes updates to an MQTT broker, and edge devices subscribe to the topics they care about.

## What you can buy

<div class="card">
  <h3 class="card__title">PCB</h3>
  <p class="card__description">Hardware for the display-side setup. (Add exact rev + compatibility notes here.)</p>
  <a class="section__link" href="{{ shopify.products.nemoMqttPcb }}">Buy PCB (Shopify) →</a>
</div>

## Getting started

1. Confirm your NEMO install uses **PostgreSQL** (SQLite won’t work for LISTEN/NOTIFY).
2. Install the NEMO bridge plugin/package.
3. Configure broker host/auth and optional HMAC key in NEMO.
4. Run the bridge/broker host in your preferred topology.
5. Flash/configure the display firmware and subscribe to the right tool topics.

**Start here:** [NEMO MQTT & Tool Display — setup guide]({{ '/guides/nemo-mqtt/' | url }})

## Why MQTT (vs polling REST)

For a satisfying user experience, the “tool just turned on/off” signal needs to arrive quickly (instantly, not minutes). MQTT is a clean fit for low-latency fan-out to many small subscribers, while REST endpoints can still serve slower-moving data (configuration, next reservation, etc.) on a relaxed schedule.

## Architecture (high level)

<div class="card">
  <h3 class="card__title">Architecture at a glance</h3>
  <p class="card__description">NEMO emits events → Postgres persists → bridge publishes → broker fans out → ESP32 renders.</p>
</div>

{% mermaid %}
flowchart LR
  subgraph nemo [NEMO server]
    UI[Tool on/off in UI]
    SIG[Django signals]
    PG[(PostgreSQL)]
  end
  subgraph bridge [Bridge & broker]
    BR[Bridge to MQTT]
    BK[MQTT broker]
  end
  subgraph edge [Lab floor]
    ESP[ESP32 display]
  end
  UI --> SIG
  SIG --> PG
  PG --> BR
  BR --> BK
  BK --> ESP
{% endmermaid %}

## Documentation & support

<div class="related-content">
  <h3>Support checklist (placeholder)</h3>
  <div class="related-grid">
    <div class="related-card">
      <h4>Setup guide</h4>
      <p>Prereqs, install steps, topology options, verification steps.</p>
    </div>
    <div class="related-card">
      <h4>Troubleshooting</h4>
      <p>“No publishes”, “no subscribes”, “broker auth”, “HMAC mismatch”.</p>
    </div>
    <div class="related-card">
      <h4>Revision/compatibility</h4>
      <p>PCB rev identifiers, supported ESP32 + display combos.</p>
    </div>
    <div class="related-card">
      <h4>Support</h4>
      <p>What to include when asking for help (versions, logs, topology, photos).</p>
    </div>
  </div>
</div>

**Sell & support docs checklist:** [Selling & support checklist (hardware)]({{ '/guides/support-checklist/' | url }})

## Quick links

- **Architecture & setup overview:** [NEMO MQTT & Tool Display]({{ '/guides/nemo-mqtt/' | url }})
- **Work log / lab notebook:** [NEMO MQTT Plugin — work log]({{ '/coding/NEMO-MQTT-Bridge/' | url }})
- **Related hardware notes:** [NEMO Tool Display Hardware — work log]({{ '/microelectronics/NEMO-Tool-Display-Hardware/' | url }})
- [**PyPI package:**](https://pypi.org/project/nemo-mqtt-bridge/)
- **Photos (TODO):** [https://photos.app.goo.gl/<album-id>](https://photos.app.goo.gl/<album-id>)
- [**Head Firmware:**](https://github.com/alexanderenrique/NEMO-Tool-Display/tree/main/display-firmware)
- [**Head Unit PCB:**](https://github.com/alexanderenrique/NEMO-Tool-Display/tree/main/tool-display-pcb)
- **Head Unit Case:** (TODO)
- [**Broker code:**](https://github.com/alexanderenrique/NEMO-Tool-Display/tree/main/vm-server)
- **STLs + build/components overview (TODO):** [https://github.com/<org>/<repo>/tree/main/<path>](https://github.com/<org>/<repo>/tree/main/<path>)

