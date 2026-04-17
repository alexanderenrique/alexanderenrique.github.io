---
layout: page
title: "NEMO MQTT"
description: "Real-time tool status from NEMO to wall-mounted ESP32 displays over MQTT"
permalink: /projects/nemo-mqtt/
tags: [nemo, mqtt, django, postgres, iot]
---

## What it is

This project pushes tool status out of **NEMO** in near real-time so you can drive things like wall-mounted displays, dashboards, or lightweight notifications without waiting on slow polling intervals.

At a high level: NEMO events land in Postgres, a bridge service publishes updates to an MQTT broker, and edge devices subscribe to the topics they care about.

## Quick links

- **Architecture & setup overview:** [NEMO MQTT & Tool Display]({{ '/nemo-mqtt/' | url }})
- **Work log / lab notebook:** [NEMO MQTT Plugin — work log]({{ '/coding/NEMO-MQTT-Bridge/' | url }})
- **Related hardware notes:** [NEMO Tool Display Hardware — work log]({{ '/microelectronics/NEMO-Tool-Display-Hardware/' | url }})
- [**PyPI package:**](https://pypi.org/project/nemo-mqtt-bridge/) This is what gets installed in NEMO, install is very simple. See the Readme.md on PyPi
- **Photos (TODO):** [https://photos.app.goo.gl/<album-id>](https://photos.app.goo.gl/<album-id>)
- [**Head Firmware:**](https://github.com/alexanderenrique/NEMO-Tool-Display/tree/main/display-firmware)
- [**Head Unit PCB:**](https://github.com/alexanderenrique/NEMO-Tool-Display/tree/main/tool-display-pcb) You can upload the .ziip file directly to your favorite PCB maker. It's designed for a 30 pin ESP32 Dev board with the PCB antenna. Easy enough to find.
- **Head Unit Case:** 
- [**Broker code:**](https://github.com/alexanderenrique/NEMO-Tool-Display/tree/main/vm-server) This stradles the LAN and Public network. In my case this exists on a linux box in a closet in a lab fingerwall. This could also run on the NEMO machine, or you could have NEMO communicate directly with the headunit. 
- **STLs + build/components overview (TODO):** [https://github.com/<org>/<repo>/tree/main/<path>](https://github.com/<org>/<repo>/tree/main/<path>)

## Why MQTT (vs polling REST)

For a satisfying user experience, the “tool just turned on/off” signal needs to arrive quickly (instantly, not minutes). MQTT is a clean fit for low-latency fan-out to many small subscribers, while REST endpoints can still serve slower-moving data (configuration, next reservation, etc.) on a relaxed schedule.

## Architecture (high level)

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

## Where to go deeper

The project overview includes the step-by-step “how to run it end-to-end”; the work log includes the day-by-day implementation details and the messy debugging trail.

- **Overview:** [NEMO MQTT & Tool Display]({{ '/nemo-mqtt/' | url }})
- **Work log:** [NEMO MQTT Plugin — work log]({{ '/coding/NEMO-MQTT-Bridge/' | url }})

