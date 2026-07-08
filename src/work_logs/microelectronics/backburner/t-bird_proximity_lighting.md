---
layout: page
title: "T-Bird Proximity Lighting"
categories: [microelectronics]
tags:
  - electronics
  - thunderbird
  - attiny
  - radar
  - pwm
  - automotive
  - backburner
---

## Project Overview

Ground-effect proximity lighting for the Smart Thunderbird. Uses an Infineon BGT60 shield module (60 GHz radar) to detect when someone walks up to either side of the car, then ramps PWM LEDs underneath the car for a ground-effect illumination effect as they approach.

**T-Bird hub:** [denton.works/microelectronics/T-bird_electronics/](https://denton.works/microelectronics/T-bird_electronics/)

---

## Node features

- Infineon BGT60 shield module — 60 GHz radar proximity detection (left and right sides)
- PWM LED strips mounted underneath the car for ground-effect lighting
- ATtiny 402 MCU
- High-side or low-side LED switching (TBD)
- Input voltage monitoring — fade LEDs out slowly on rising input voltage (engine start / alternator coming online)
- Battery health watchdog — periodic checks; do not illuminate or drain the battery when input is at 12.35 V or lower

## Design notes

- **MCU:** ATtiny 402
- **Proximity:** BGT60TR13C radar shield — detect approach from either side
- **LED control:** PWM dimming for smooth ramp-in as proximity increases; slow fade-out on voltage rise
- **Switching topology:** High-side vs low-side TBD — depends on LED wiring and common rail
- **Battery cutoff:** 12.35 V threshold — watchdog runs periodically, not continuously

## Open questions

- High-side or low-side switching for the LED strings?
- One node per side, or one MCU driving both sides?
- How does radar range map to PWM duty cycle — linear, stepped, or curved?
- Power source — always-on from car battery, or switched ignition feed?
- Enclosure and mounting under the car — weatherproofing, vibration

## Up Next

- Read BGT60 shield docs and eval examples
- Breadboard ATtiny 402 PWM + MOSFET switching
- Characterize radar detection range and field of view for side approach
- Prototype voltage divider + slow fade logic on rising input voltage

---

## Work Log

### 07/02/26
**Main Task:** Project inception

**Notes:**
- I do just love projects, and learning new stuff, gotta keep myself busy and out of trouble
- Now that I have what I beleive to be mad electronics skills I want to keep building things that are both stealth and very cool.
