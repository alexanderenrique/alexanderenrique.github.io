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

### [Date]
**Main Task:** [Brief summary of what you did]

**Notes:**
- [Quick bullet points of challenges, what you learned, decisions made, or next steps]

### [Date]
**Main Task:** [Next entry]

**Notes:**
-