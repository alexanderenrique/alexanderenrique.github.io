---
layout: page
title: "General Microelectronics Work Log"
categories: [microelectronics]
tags: 
  - electronics
  - embedded-systems
  - microcontrollers
  - circuit-design
  - sensors
  - #work-log
---

## Project Overview
- General microelectronics projects that are real little and don't get their own project page.

## Up Next:


## Work Log

### 01/03/2026
**Project:** Noise Sensor for Garage light and fan

**Task:** Wiring in the Sensor assembly into the 120VAC line

**Notes:**
- Intercepted the 120VAC out of the light, so the extension cord remains untouched.
- I spliced in the Neutral of the fan and the neutral for the 120VAC to 5VDC converter.
- The hot side was more interesting, that's the side I intercepted with the relay and the sensor assembly.
- Not too bad of work, but I did have to re-do some crimps and such
- I learned it's only sensistive to sharp noice like a clap or a door slamming, and the door slams a lot!
- I tried turning it on with the angle grinder and that didn't actually do it. I may just up the sensitivity, and also figure out how not to slam the door so much. 

### 01/02/2026
**Project:** Noise Sensor for Garage light and fan

**Task:** Making the Perf Board Assembly

**Notes:**
- Straight forward little project, used a random ESP32 C3 that I had laying around.
- Using the digital out of the noise sensor as an input to the ESP32 C3, and then using the ESP32 C3 to control the relay that turns on the light and fan.
- I tested the relay and it actually draws 50mA of current which is more than a GPIO pin can supply so I had to change course a bit
- I shorted the hot and relay activate pins on the relay, and went for low side switching so that I could use an n-type MOSFET as a low side switch.
- The ESP32 pulls it high, allowing the ground to be connected, triggering the relay.
- Had some light soldering issues as always but it works in the end.
## Done:

