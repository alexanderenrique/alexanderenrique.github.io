---
layout: page
title: "T-Bird Display Node"
categories: [microelectronics]
tags:
  - electronics
  - thunderbird
  - esp32
  - display
  - automotive
  - pcb
---

## Project Overview

A display/control node for the Smart Thunderbird project. Intended to show real-time engine and sensor data (temp, voltage, RPM, etc) in the car using a robust, automotive-ready display driven by an ESP32. Focus on reliability, visibility, and integration with RS-485/CAN bus for future expansion.

**Repo:** [smart_tbird/display](https://github.com/alexanderenrique/smart_tbird/tree/platformIO/display)  
**T-Bird hub:** [denton.works/microelectronics/T-bird_electronics/](https://denton.works/microelectronics/T-bird_electronics/)

-----------------------------------

## Things to display

### Current

| Parameter      | Alarm Min | Alarm Max |
| -------------- | --------- | --------- |
| Voltage        | 12        | 15        |
| Oil temp       | 0         | 100       |
| Coolant Temp   | 0         | 100       |
| Trans temp     | 0         | 85        |
| O2 Sensor      | 10        | 15        |

### Future

| Parameter             | Alarm Min | Alarm Max |
| --------------------- | --------- | --------- |
| MAP                   | None      | 7 PSI     |
| Methanol line pressure| 70        | 150       |
| Methanol spray        | Bool      | ??        |

## Node features
- connection to touch 4" TFT display
- voltage regulated input
- RS-485
- PWM dimming circuit via LDR
- RGB Warning light (integrated somewhere cool?)

## Work Log

### 06/23/26
**Main Task:**  Scheming, spending money

**Notes:**
- The little ESP32 30 pin dev board *can* run the 4" display, but if I want graphics and real sexyy things I'll need more horsepower
- SEEED makes an S3 dev board, but I opted for a Hoysond one coming in at $5 a board, dual core processor, DMA, lots of good stuff