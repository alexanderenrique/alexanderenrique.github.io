---
layout: page
title: "Engine Sensing Node"
categories: [microelectronics]
tags:
  - electronics
  - thunderbird
  - sensors
  - esp32
  - pcb
  - automotive
---

## Project Overview

A sensor node designed to collect engine operating data (temperatures, voltages, sensors, etc) in the Thunderbird. Focus on reliability, automotive-hardening, and ease of install. Intended for RS-485 data bus communication with robust PCB and enclosure.

**Repo:** [smart_tbird/temp_fan_node](https://github.com/alexanderenrique/smart_tbird/tree/platformIO/temp_fan_node)  
**T-Bird hub:** [denton.works/microelectronics/T-bird_electronics/](https://denton.works/microelectronics/T-bird_electronics/)

## Notes:
- Sensors:
  - 10k NTC thermistors: Oil temp, coolant temp, trans temp, underhood/intake temp, PCB board temp
  - Voltage divider for input voltage
- Outputs:
  - PWM control for fan
  - RS-485
- Communication protocol: RS-485
- Enclosure: 3D printed, waterproof, vibration resistant
- Pluggable connectors for serviceability


## Up Next:
- Making an arduino JTAG2UDPI programmer
- Trying to program my first ATTiny
- Figuring out how to read out from the ATTiny using the UART to USB
- Checking the pins
- Quadruple checking PCB
  - Schematic tidy up
  - Mounting hole location
  - connector sizing

-----------------------------------

## Work Log

### 06/25/2026
**Main Task:** Schematic cleanup/checking, layout

**Notes:**
- I got greedy and there is now a hell of a lot going on this board
- Like 7 different ADC inputs, each one is a voltage divider, plus PWM for the fan, plus power regulation
- Double checking the schematic, some pins weren't connected that really needed to be, making the nets clearer so my schematic doesn't have mistake
- Modifying the PCB as things change, I think I have it pretty much dialed. Simple circuits, just a lot of them
- I learned about the joy of 0.1uF decoupling caps and ADCs, every ADC circuit is getting one right at the pin

### 06/24/2026
**Main Task:** Adding MORE temp

**Notes:**
- Having a think about it, I have so many ADC channels it seems like a shame to stop at just those few sensors
- I thought to also add a board mounted NTC, they sell those in 1206 pretty cheap and simple
- I also thought to add an engine bay/intake temp sensor, like maybe in the air filter element or somewhere around there

### 06/21/2026
**Main Task:** Schematic capture, light PCB layout

**Notes:**
- Crushed the schematic sitting in SEA-TAC, it's messy and I'll want to clean it up but logically I think it's quite good
- Know quantities like voltage dividers are easy, it's just knowing how to connect things on the ATTiny
  - You never know about those mysterious pins like hidden strapping pins that just totally fuck up the boot