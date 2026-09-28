---
layout: page
title: "MotoTemp"
categories: [microelectronics]
tags:
  - electronics
  - esp32
  - sensors
  - bluetooth
  - motorcycle
---

## Project Overview

Many bikes I deal with, even modernish ones (pre-2015) and lightweight dirt bikes, have no way to know what temperature the engine, cylinder head, or radiator is at. There are no lights on the dashboard. I don't know when the engine is warm and ready to take a beating, or if it's overheating.

The plan is a thin handlebar-mounted strip with a few thermistors tied to RGB LEDs. Each channel shows whether that component is cool, at operating temp, or overheating. An ESP32 runs the strip, and a separate Bluetooth app shows the actual value in real time and lets you customize the colors and the set points. One bike might be overheating at 250F; another cylinder temp may regularly reach 300F.

## Design Goals

1. Glanceable engine, cylinder head, and radiator status from the bars, without a dash gauge
2. RGB indication per channel: cool, operating temperature, or overheating
3. Per-bike thresholds and colors, because the numbers aren't the same from bike to bike
4. Live numeric readout over Bluetooth

## Architecture

- **MCU:** ESP32
- **Sensors:** A few thermistors on the parts that matter, probably 100k thermistors for the generally higher temps (engine, cylinder head, radiator)
- **Indication:** RGB LEDs on a thin handlebar-mounted strip
- **App:** Bluetooth companion for the live temperature, color customization, and setpoint changes

## Detailed Implementation:
- Data to be displayed: battery state, oil temp/head temp, coolant temp, ambient temp (?) I feel like 4 LEDs is the sweet spot visually
- 100k Ring style NTC thermistors for the hot sensing, board mounted 10K thermistor for the ambient temp would be fine
- LEDs will operate at 5V for current reasons so we'll need a level shifter if we want the ESP32 to be able to communicate with them
  - This'll be my first time using a dedicated push pull buffer IC
  - You'll need two of these, one for MOSI and another for CLK 74AHCT1G125
  - Don't forget the series resistor for line ringing, 33ohm in series with the MOSI and CLK lines
  - Also a bulk 100uF tantalum capacitor probably both where power comes in and then another one across the 5V rail close to the LEDs

## Notes
- On an ESP32, GPIO 2, 8, and 9 are all strapping pins and probably shouldn't be touched.
- IO 0,1,3,4,5 are safe ADCs, pins 6,12,13,18,19

## BOM
- ESP32C3 mini with PCB antenna trace
- RGB addressable LEDs
- 5V buck converter w/ accoutrements
- 3.3V LDO w/ capacitors
- 100k NTC ring terminals
- PCB mounted thermistor
- Push pull buffer

## Work Log

### 09/26/2026
**Task:** Schematic and PCB Layout

**Notes:**
- Schematic and PCB Layout
  - Layout was pretty straight forward, I decided on four things indicated which keeps things simple:
    - Two external NTC 100k thermistors one for coolant and one for cylinder head temp
    - One PCB mounted 10k thermistor to measure ambient/ board temp
    - Voltage divider on the input voltage to monitor charging status
  - One whole side of the board is going to be power management

### 09/25/2026
**Task:** Schematic Start

**Notes:**
- Schematic Start
  - Started on selecting and ordering the hardware
  - Learned a bunch about how different kinds of addressable LEDs work
  - Also had to learn how to program the ESP32 without the aid of a dev board, it isn't that hard but maybe a little fiddly to get it to enter programming mode. Each microcontroller really has its own secret handshake
  - Thought about how I want the connectors to work to the board, my best idea presently is a grommet and the wires soldered to the board. I thought maybe a seperate connection on the board but that introductes crimps and pig tails and such which I don't love


### 09/22/2026
**Task:** Motorcycling through the desert

**Notes:**
- My 2011 Husqvarna Sm630 is a ripper of a bike, and this was the first time I really took it off road. As I'm slipping the clutch and crawling over rocks miles from civilization, I'm wondering if we're starting to get warm, or if the fans are on, or what's going on down there. That was my inspiration. I couldn't find a cheap, simple system for this
