---
layout: page
permalink: /projects/denton-rainmaker/
tags: [esp32, sprinkler, ac, triac, ble, irrigation]
---

<div class="hero">
  <h2 class="hero__title">Denton's Rainmaker</h2>
  <p class="hero__subtitle">A four-channel 24 VAC sprinkler controller with ESP32 brains, opto-triac zone drivers, Wi‑Fi clock sync, and BLE configuration from a browser.</p>

  <div class="btn-row">
    <a class="btn btn--primary" href="{{ sources.dentonRainmaker.pcbs }}" target="_blank" rel="noopener noreferrer">PCB files →</a>
    <a class="btn btn--secondary" href="{{ '/microelectronics/denton-rain-maker/' | url }}">Work log →</a>
  </div>
</div>

<div class="grid grid--3">
  <div class="card">
    <h3 class="card__title">Four-zone 24 VAC</h3>
    <p class="card__description">Opto-triac isolated drivers switch the irrigation valves the same way a commercial controller does, without a MCU pin ever touching AC.</p>
  </div>
  <div class="card">
    <h3 class="card__title">ESP32 + Wi‑Fi</h3>
    <p class="card__description">Clock sync over Wi‑Fi removes the need for a battery-backed RTC. Schedules stay honest without a coin cell to replace.</p>
  </div>
  <div class="card">
    <h3 class="card__title">BLE setup</h3>
    <p class="card__description">Configure Wi-Fi and schedules from a desktop browser over Bluetooth Low Energy, with no serial cable required.</p>
  </div>
  <div class="card">
    <h3 class="card__title">Rotary mode switch</h3>
    <p class="card__description">Eight-position DIP rotary: OFF, AUTO, BLE CONFIG, TEST ALL, and per-zone TEST. Hands-on control when you don't want an app.</p>
  </div>
</div>

<div class="grid grid--2">
  <div class="card card--gallery">
    <h3 class="card__title">Gallery</h3>
    <div class="placeholder-image" aria-label="PCB and install photos coming soon"></div>
  </div>
</div>

## Why I Built It

I was troubleshooting my sprinkler system, cracked open the controller, and realized the board is basically a power supply, a handful of AC drivers, and some logic. Two of the 24 VAC channels on mine were already dead. I could buy a replacement, or design my own and finally learn the AC side of embedded hardware properly.

Denton's Rainmaker is that replacement: an ESP32-based four-zone controller that rectifies and bucks 24 VAC down for the MCU, isolates the GPIOs from the valve power with opto-triacs, and keeps a physical rotary switch for modes you actually use in the yard. Along the way it's a crash course in net classes, snubbers, MOVs, fixed-output bucks, and why ESR matters when the supply is coming from rectified AC.

## Key Specs

### Core Hardware
- MCU: Seeed Studio ESP32-C3
- Zones: 4 × 24 VAC valve drivers (MOC3063 opto-triac + BT136S-800E)
- Input: 24 VAC from a wall transformer
- DC rail: MB6M rectifier → LM5164 buck → 3.3 V LDO for the ESP32
- Mode select: 8-position rotary DIP switch (digital, 3 GPIO)
- Indicators: Power, Bluetooth active, and per-zone relay-state LEDs
- PCB: ~3×3 in

### Modes
- OFF, AUTO, BLE CONFIG, TEST ALL ZONES, TEST 1-4

## Status

PCB has been sent to fab. Next up: breadboard the critical AC and buck circuits, finish firmware, and bring up the first assembled board.

## Source files

<div class="card">
  <h3 class="card__title">PCB &amp; schematic</h3>
  <p class="card__description">KiCad project on GitHub — schematic, board layout, and BOM CSV. Firmware will land here once bring-up starts.</p>
  <a class="section__link" href="{{ sources.dentonRainmaker.pcbs }}" target="_blank" rel="noopener noreferrer">PCB files →</a>
  <a class="section__link" href="{{ sources.dentonRainmaker.repo }}" target="_blank" rel="noopener noreferrer">Repository →</a>
</div>

## Quick links

- **Work log / lab notebook:** [Denton's Rainmaker, work log]({{ '/microelectronics/denton-rain-maker/' | url }})
- **GitHub:** [alexanderenrique/denton-rain-maker]({{ sources.dentonRainmaker.repo }})
