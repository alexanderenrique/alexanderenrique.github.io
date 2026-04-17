---
layout: page
title: "E-Ink Display"
description: "Battery-powered ESP32 e-ink displays with BLE configuration, OTA updates, and multiple firmware apps"
permalink: /projects/e-ink-display/
tags: [esp32, e-ink, ble, iot, low-power]
---

## What it is

A small, battery-powered ESP32 + e-ink display platform that can run a few different “apps” depending on what you want the display to do: sensor readouts, shelf labels, messages, or fun data pulls.

The guiding idea is simple: **make it easy to deploy a lot of displays** without special tooling—flash from the browser, configure over BLE, and let e-ink do what it’s good at (update rarely, sip power).

## Quick links

- **E-Ink portal (configure + install firmware):** [E-Ink Display portal]({{ '/e-ink/' | url }})
- **Install firmware (browser-based):**
  - [Sensor firmware]({{ '/install-firmware/sensors/' | url }})
  - [Shelf label firmware]({{ '/install-firmware/shelf-labels/' | url }})
  - [Messages firmware]({{ '/install-firmware/messages/' | url }})
  - [Fun app firmware]({{ '/install-firmware/fun/' | url }})
- **Work log / lab notebook:** [E-Ink Display — work log]({{ '/microelectronics/e-ink-display/' | url }})

## Design goals

- **Easy assembly:** through-hole where possible, straightforward soldering
- **Useful without a single ecosystem:** works standalone; can optionally integrate with other systems
- **Simple onboarding:** web flashing + BLE configuration
- **Battery-first:** long sleep times and minimal wake work; e-ink refreshes only when needed

## What it can do (today)

- **Sensor mode:** periodic temperature/humidity reads (and optional reporting)
- **Shelf label mode:** display recurring / inventory-style information
- **Messages mode:** send text to a display from a web interface
- **Fun mode:** lightweight “party trick” endpoints (facts, status feeds, etc.)

## Hardware (high level)

- **ESP32** (varies by build)
- **2.9" e-ink display**
- **I2C sensor** (e.g. SHT31) for temp/RH builds
- Optional add-ons depending on revision: **microSD**, **RTC**, and more aggressive **power gating**

## Where to go deeper

If you want the messy details (BOMs, PCB revisions, power testing, firmware changes, deployment notes), the running notebook is here:

**[E-Ink Display — work log]({{ '/microelectronics/e-ink-display/' | url }})**

