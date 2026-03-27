---
layout: page
title: "NEMO MQTT & Tool Display"
description: "Real-time tool status from NEMO to wall-mounted displays over MQTT"
permalink: /nemo-mqtt/
---

## What this is

This project connects **[NEMO](https://github.com/usnistgov/NEMO)** lab management to small **ESP32 + TFT displays** mounted near tools. When someone enables or disables a tool in NEMO, the display updates almost immediately—without polling a slow HTTP API.

It sits in the middle ground between a portfolio piece and production lab infrastructure: a **Django plugin** you install into NEMO, a **bridge service** that talks to MQTT, and **firmware** on dedicated hardware.

## Why MQTT instead of only REST

Tool enable and disable is time-sensitive. MQTT keeps the path short once events leave NEMO: the plugin reacts to Django signals, events land in **PostgreSQL** (NEMO's native database), and the bridge picks them up and publishes so subscribers on the LAN get small JSON payloads. Non-urgent data (next reservation, configuration text, etc.) can still come from the REST API on a relaxed schedule.

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

- **NEMO side:** A plugin (`NEMO_mqtt_bridge`) hooks the same kinds of events NEMO already uses for usage logging. Work is persisted in **PostgreSQL**—no separate Redis message tier—so installs reuse NEMO's database and operations stay simpler.
- **Infrastructure:** A **bridge** process consumes new rows / notifications from Postgres and publishes to **MQTT**. The broker can be embedded (e.g. during development) or Mosquitto in production, with username/password and **HMAC-signed** payloads where configured.
- **Edge:** Each display is an ESP32 subscribed to the right topics, rendering tool state, user, and timing on a TFT. Message size stays small because the MCU only needs a few fields per update.

## Security notes (summary)

MQTT ports are protected; messages use **HMAC** authentication and timestamp checks to limit trivial replay. This mirrors data that is already visible in NEMO, but the chain is still locked down for a lab network.

## Using this documentation

| Piece | What you’ll find there |
|--------|-------------------------|
| [NEMO MQTT Bridge (plugin & ops)]({{ '/coding/NEMO-MQTT-Bridge/' | url }}) | Install notes, PostgreSQL/MQTT wiring, work log, packaging |
| [NEMO Tool Display (hardware & firmware)]({{ '/microelectronics/NEMO-Tool-Display-Hardware/' | url }}) | ESP32 + TFT setup, MQTT client, enclosure, PCB |

Start with the bridge page if you are **installing or configuring NEMO**; use the hardware page if you are **building or flashing a display**.
