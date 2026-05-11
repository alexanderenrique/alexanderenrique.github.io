---
layout: page
permalink: /projects/nemo-mqtt/
tags: [nemo, mqtt, django, postgres, iot]
---

<div class="hero">
  <h2 class="hero__title">NEMO → MQTT → Edge displays</h2>
  <p class="hero__subtitle">Near real-time tool state from NEMO to tool-mounted displays without slow REST polling.</p>

  <div class="btn-row">
    <a class="btn btn--primary" href="{{ shopify.products.nemoMqttPcb }}">Buy PCB →</a>
    <a class="btn btn--secondary" href="{{ '/guides/nemo-mqtt/' | url }}">Build guide →</a>
    <a class="btn btn--secondary" href="{{ '/coding/NEMO-MQTT-Bridge/' | url }}">Work log →</a>
  </div>
</div>


<div class="grid grid--3">
  <div class="card">
    <h3 class="card__title">Near Instant Updates</h3>
    <p class="card__description">Tool status changes show up quickly where they matter in the lab.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Postgres LISTEN/NOTIFY</h3>
    <p class="card__description">Avoids multi-minute REST polling and stays aligned with NEMO’s Postgres model.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Edge-friendly payloads</h3>
    <p class="card__description">Small messages with just the fields a microcontroller needs to render state.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Configurable security</h3>
    <p class="card__description">Broker auth + optional HMAC verification.</p>
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

## Why is this important

- For many labs, tool "enable/disable" is central to billing, utilization data, understanding up time, etc. 
- Though the status of a tool is readily visible in the NEMO software, lab processing can be stressful and frantic and chaotic, and lab members often forget to enable tools
  - This leads to process failures (you have to enable the tool for it to run!), wasted time, and often lack of accountability when using tools like wet benches that are hard to interlock
- The tool status has previously been displayed using a small (and I do mean small) red/green LED placed somewhere on the tool
  - This is tied to the tool interlock box and is easy to miss, even for experienced lab members
  - It is much hard to miss a 4" TFT display with your name on it, or possibly someone elses name on it!

## Additional Feautures

- The display shows current "enabled" lab member, but it also shows who used the tool last
  - This is designed to foster accountability. If you left the tool in a state of disrepair, the next user will konw immediately who did it!
- The display also shows "tasks" (the yellow wrench icon on NEMO) as well as shut downs
  - A seperate page displays the message associated with the task or the shut down, so that lab members can easily be informed of problems with the tool that need to be taken into consideration
- The NEMO API is used for slower refreshing data, such as "next reservation" which is also displayed on a seperate screen


## What you can buy

<div class="card">
  <h3 class="card__title">PCB</h3>
  <p class="card__description">Hardware for the display-side setup. (Add exact rev + compatibility notes here.)</p>
  <a class="section__link" href="{{ shopify.products.nemoMqttPcb }}">Buy PCB (Shopify) →</a>
</div>


**Start here:** [NEMO MQTT & Tool Display — setup guide]({{ '/guides/nemo-mqtt/' | url }})


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

