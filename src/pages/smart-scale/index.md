---
layout: page
title: "Smart Scale"
description: "Hot-plate safety using load cell mass, temperature, and a finite-state machine"
permalink: /smart-scale/
---

## What this is

The **smart scale** is a lab safety concept aimed at **hot plates**: combining **mass** (load cell + HX711), **temperature** (K-type thermocouple and amplifier), and a **finite-state machine** on an ESP32 to infer whether the setup is in a normal run, evaporating safely, or drifting into dangerous cases (empty hot plate, dry-down, boil-off, etc.).

Users get status on a **small touchscreen**; resets go through the UI. The goal is **minimal manual steps**—no constant tare rituals—while still catching risky situations that are easy to miss in a busy lab.

## Problem

Hot plates are among the more hazardous everyday tools in a facility. They are often under-monitored, and failures (left on, boil-off, dry container still heating) can escalate quickly. The scale is an experiment in **automatic** interpretation from physics signals rather than only human vigilance.

## Approach

1. **Measure** total mass on the plate over time (trend and step changes suggest load, fill, evaporation, removal).
2. **Measure** plate or hot-surface temperature and its rate of change.
3. **Classify** behavior with an explicit **FSM**: dozens of situations (idle, heating empty, loaded, evaporating, refill, anomaly, and so on) map to states, timers, and whether a **shutdown** is warranted.

The full project log includes a large reference table that ties mass, mass rate, temperature, and temperature rate to interpretations and actions—that table is the engineering spec for the firmware.

## Hardware & software (overview)

- **MCU:** ESP32 family (e.g. Seeed ESP32-C3 for early bring-up); more pins may be needed as sensors grow.
- **Mass:** Load cell and **HX711** amplifier.
- **Temperature:** **K-type** thermocouple and matching amplifier into an ADC.
- **UI:** TFT with touch for status and reset flows.
- **Mechanical:** Custom framing / test stand so the load path is stable (e.g. desk hot plate as a reference rig).

Firmware owns the FSM and filtering (averaging to ignore stir noise, step detection for loads, and so on). Higher-level logging or upload paths are still open design items.

## Using this documentation

For **BOM, parking-lot tasks, and day-by-day work log**, see the deep-dive notebook:

**[Smart Scale — full project notes]({{ '/microelectronics/smart-scale/' | url }})**

This page is the short overview; that page is the running lab book.
