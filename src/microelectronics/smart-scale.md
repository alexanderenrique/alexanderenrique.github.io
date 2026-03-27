---
layout: page
title: "Smart Scale"
categories: [microelectronics]
tags:
  - electronics
  - sensors
  - esp32
  - calibration
  - data-logging
---

## Project Overview
Hot plates are easily one of the most dangerous aspects of any lab facility. In my experience, they are under moniotred and safety features are often few and far between. Left hot and unattended, or in the event of boil off can cause fires and damages. Hot plates can get hot enough to burn things like wipes!

My goal here is to create a system that uses the mass of the hotplate/beaker/liquid and the temperature of the hot plate to determine if the hotplate is in a safe steady condition, or if the system ahs become unsafe and should be shut down. The system requires minimal user intervention, weight detection and mass change is all measured automatically without any manual tare. Users will be notified to the status of the system via a small touch screen display. Resets will be performed via the UI.

| #  | Situation                              | Mass (W)         | Mass Rate (dW/dt)  | Temp (T)       | Temp Rate (dT/dt) | Interpretation           | ESP32 State     | Action                        | Shut Off?        |
|----|----------------------------------------|------------------|--------------------|----------------|-------------------|--------------------------|-----------------|-------------------------------|------------------|
| 1  | Empty plate idle                       | baseline         | ≈0                 | low            | ≈0                | Nothing present          | IDLE            | Do nothing                    | ❌               |
| 2  | Empty plate heating                    | baseline         | ≈0                 | >T_hot         | ≈0 or ↑           | Heater left on           | EMPTY_HEATING   | Start timer                   | ✅ after timeout |
| 3  | Beaker placed, heater OFF              | ↑ step           | ≈0                 | low            | ≈0                | User setup               | LOADED          | Wait                          | ❌               |
| 4  | Beaker placed, heater already ON       | ↑ step           | ≈0                 | >T_hot         | ≈0                | Empty container heating  | HEATING_NO_LOAD | Start timer                   | ✅ after timeout |
| 5  | User filling beaker                    | ↑ gradual        | positive           | low/medium     | ≈0                | Filling event            | LOADED_FILLING  | Auto-tare/update baseline      | ❌               |
| 6  | Heater turned on                       | stable           | ≈0                 | rising         | ↑                 | Warmup phase             | HEATING         | Suppress alarms               | ❌               |
| 7  | Warmup before boiling                  | stable           | ≈0                 | high           | small ↑           | Liquid heating           | HEATING         | Wait                          | ❌               |
| 8  | Normal evaporation begins              | ↓                | negative           | >T_hot         | ≈0                | Experiment running       | EVAPORATING     | Monitor loss                   | ❌               |
| 9  | Stable evaporation                     | ↓ linear         | steady negative    | high           | ≈0                | Healthy process          | EVAPORATING     | Track rate                     | ❌               |
| 10 | Evaporation very slow                  | slight ↓         | small negative     | medium/high    | ≈0                | High boiling solvent     | EVAPORATING     | Extend thresholds              | ❌               |
| 11 | User adds more liquid mid-run          | ↑ step           | positive spike     | hot            | ≈0                | Refill                   | REFILL_EVENT    | Reset baseline                 | ❌               |
| 12 | Stirring noise                         | fluctuates       | noisy ±            | hot            | ≈0                | Mechanical noise         | FILTERING       | Ignore via averaging           | ❌               |
| 13 | Evaporation suddenly stops             | stable           | →0                 | hot            | ≈0                | Possibly dry             | SUSPICIOUS      | Start timer                    | ✅ if persists   |
| 14 | Near drydown                           | ↓ slowing        | magnitude decreasing| hot            | ≈0                | Liquid nearly gone       | DRYDOWN_RISK    | Prepare shutdown               | ⚠ soon          |
| 15 | Dry container heating                  | stable low W     | ≈0                 | hot            | ≈0                | Dangerous state          | DRY_HEATING     | Immediate shutdown             | ✅               |
| 16 | Heater off normally                    | stable           | ≈0                 | falling        | ↓                 | User finished            | COOLING         | Exit monitoring                | ❌               |
| 17 | Cooling phase                          | stable           | ≈0                 | low            | ↓                 | Safe                     | LOADED_IDLE     | Wait                           | ❌               |
| 18 | Heater failure                         | stable           | ≈0                 | low            | ≈0                | Heater not working       | FAULT           | Notify user                    | ❌               |
| 19 | Plate hot but no mass ever added       | baseline         | ≈0                 | hot            | ≈0                | Abandoned heater         | EMPTY_HEATING   | Timer                          | ✅               |
| 20 | Rapid unexpected mass loss             | ↓ fast           | large negative     | hot            | ≈0                | Spill or boilover        | ANOMALY         | Emergency stop                 | ✅ immediate     |
| 21 | User removes beaker                    | ↓ step           | negative spike     | any            | any               | End of run               | IDLE_RESET      | Reset system                   | ❌               |
| 22 | Sensor drift                           | slow change      | tiny               | any            | any               | Thermal/mech drift       | COMPENSATE      | Ignore                         | ❌               |


## Architecture
- Hardware:
  - MCU:
  - Sensor:
  - Display:
  - Power:
- Software:
  - Firmware:
  - Data processing:
  - Logging / upload:


## Components Needed
- Load Cell
- HX711 loadcell amplifier
- ESP32 (not sure which dev board yet)
- TFT display
- Some kind of cable between display and load cell
- K type TC amplifier
- K Type TC


## Parking on a downhill
- ~~Finishing the pinout for the TFT display~~
- ~~Pushing to the display~~
- Adding the TC amplifier to an ADC
- ~~Designing Top~~
  - ~~Printing ~~Top~~
- Designing Bottom~
  - Printing bottom


## Work Log

### 03/27/2026
**Main Task:** Display tweaks, printing test stand

**Notes:**
- I'm going to use my desk mounted hot plate as a model system for this, so I designed and 3D printed up a little test stand to hold the load cell
- Went fine, one of those super easy things that takes more time to print than design, gotta love a quick win

### 03/26/2026
**Main Task:** Adding Display, FSM logic

**Notes:**
- Finite State Machine baby
- Added the screen with touch, that went well.
- This little screen is a bit fiddly, the order of the colors or something is swapped to you have to enter a custom setting. Like instead of BGR it's RGB
- Moved away from any traces of grams and moved soley over to counts. 
- Adding the logic is a bit tricky, very hard to imitate loading a scale and then evaporation by hand

### 03/25/2026
**Main Task:** Project Inception

**Notes:**
- Started with a 10kg loadcell and HX711, it went together super fast, i was measuring mass in no time
- Used a SEEED ESP32-c3 because it's what I had on hand but I may want to use a bigger board in the future, not a lot of pins to play with on the little guys
- Started loosely on the display part
- 

