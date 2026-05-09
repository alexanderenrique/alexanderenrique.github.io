---
layout: page
title: "Smart Hot-Plate"
description: "Hot-plate safety using load cell mass, temperature, and a finite-state machine"
permalink: /guides/smart-hotplate/
---

## What this is

The smart hotplate is a lab safety concept aimed at making hotplates safer. Hotplates are very commmon lab equipment that are used to heat solvents, acids, bases, photoresist developers and more. It is easy for lab members to start heating a liquid on a hot plate and leave it unattended. This leads to fire risks, potentially broken glassware, dangerously hot acids, etc.

By combining mass (load cell + HX711), hot plate temperature (K-type thermocouple and amplifier), and possible a current sensor, we can create a finite-state machine on an ESP32. We can use these sensors to infer whether the setup is in a normal run, evaporating safely, or drifting into dangerous cases (empty hot plate, dry-down, boil-off, etc.).

Users get status on a small touchscreen; resets go through the UI. The goal is a beaker size and solution agnostic set up with no constant tare rituals; while still catching risky situations that are easy to miss in a busy lab.

## Approach

- **Measure:** total mass on the plate including beaker and liquid, temperature of the hot plate, current draw of the plate.
- **Classify** behavior with an explicit FSM: dozens of situations (idle, heating empty, loaded, evaporating, refill, anomaly, and so on) map to states, timers, and whether a **shutdown** is warranted.
- **Act** if an unsafe behavior or situation is detected by the FSM


## Hardware & Architecture

- **Inside the Hotplate**
  - Load Cell and Amplifier
  - K type thermocouple and amplifier
  - Possibly CT sensor with op amps
  - ATTiny 3216 MCU
  - RS-485 chip to communicate with the head unit
  - Passives like capacitors, resistos, op amps, RJ45 connector, etc


- **Head Unit**
  - ESP32
  - TFT display
  - RS-485 break out board
  - MOSFETs for interlock control
  - Passives

- **Architecture**
-   - The ATTiny takes in the data from the thermocouple, as well as the DT and CLK duties from the HX711
  - The Attiny does minimal data buffering and telemetry, it does not decide the state
- This information is passed to the ESP32, which decides, the states, controls the interlock, etc

## Using this documentation

For **BOM, parking-lot tasks, and day-by-day work log**, see the deep-dive notebook:

**[Smart Hotplate — full project notes]({{ '/microelectronics/smart-hotplate/' | url }})**

This page is the short overview; that page is the running lab book.

