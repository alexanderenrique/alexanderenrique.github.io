---
layout: page
title: "WiFi Gas Cylinder Scale"
categories: [microelectronics]
tags:
  - electronics
  - esp32
  - load-cell
  - sensors
  - monitoring
  - nemo
  - battery
  - embedded-systems
---

## Project Overview

There are currently several gas cylinders in the basement of the lab that are manually monitored for their weight on a daily and regular basis by staff members. This isn't the most efficient way to do it, and if there was some kind of smart scale that connected to NEMO, we could automate this process and save someone the task.

## Design Goals

- Scale pad must be **1 sq ft**
- Capable of supporting **200 kg** (worst-case for a size 300 cylinder, plus some shock-loading cushion)
- Battery-powered with as long a battery life as possible (lithium-ion)
- Rechargeable when the time comes
- Integrates with NEMO for automated weight monitoring

## Components Needed

- Metal plates for the top and bottom support of the scale
- Load cell (single-point)
- ESP32 (breakout module or one of the dev boards)
- Lithium-ion battery
- Boost converter or LDO / buck converter
- Load cell amplifier (e.g. NAU7802SGI-ND)
- Possibly a BMS / P-type MOSFET circuit so it can be plugged in to charge

## Notes on selecting the voltage on the buck boost TPS63900:
For a permanently fixed 3.3 V output, the simplest configuration is:

CFG3 ── 16.2 kΩ ── GND
SEL  ────────────── GND

This makes the converter use the SEL = LOW preset, and 16.2 kΩ on CFG3 programs that preset to 3.3 V. Use a 1% resistor or better.

You must still configure CFG1 and CFG2, even if you never intend to drive SEL high. For example, you could configure the high state as 3.3 V too:

CFG1 ── 36.5 kΩ ── GND   → VOUT2 = 3.3 V
CFG2 ── 0 Ω ────── GND   → unlimited input-current setting
CFG3 ── 16.2 kΩ ── GND   → VOUT1 = 3.3 V
SEL  ────────────── GND

## Charging Notes

- Realistically, it may not be super feasible to plug in a scale while a heavy gas cylinder is sitting on it
- If I'm okay with just unplugging the battery and charging it externally, that could save a lot of headache

## Up Next

- Spec the load cell for 200 kg / 1 sq ft pad
- Decide on ESP32 board + power architecture (boost vs buck, BMS vs removable battery)
- Prototype NAU7802 + load cell readout
- Figure out NEMO payload / reporting cadence for long battery life

## Work Log

### 07/21/2026
**Main Task:** Capture the project idea

**Notes:**
- Wrote down the problem: daily manual weighing of basement gas cylinders, wants a NEMO-connected smart scale instead
- Design targets: 1 sq ft pad, 200 kg capacity, Li-ion with long battery life, rechargeable somehow
- Rough BOM sketched: plates, single-point load cell, ESP32, battery, power conversion, NAU7802 amp
- Open question on charging: in-place charge with BMS/MOSFET vs just pull the pack and charge externally
