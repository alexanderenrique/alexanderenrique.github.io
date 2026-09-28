---
layout: page
title: "Smart Hotplate"
categories: [microelectronics]
tags:
  - electronics
  - sensors
  - esp32
  - calibration
  - data-logging
---

## Project Overview
Hot plates are easily one of the most dangerous aspects of any lab facility. In my experience, they are under monitored and safety features are often few and far between. Left hot and unattended, or in the event of boil off can cause fires and damages. Hot plates can get hot enough to burn things like wipes!

My goal is to create a system that uses the mass of the hotplate+beaker+liquid and the temperature of the hot plate to determine if the hotplate is in a safe condition, or if the system ahs become unsafe and should be shut down. The system requires minimal user intervention, weight detection and mass change is all measured automatically without any manual tare. Users will be notified to the status of the system via a small touch screen display. Resets will be performed via the UI.

There are two basic events that will trigger a hot plate shut off:
1.) Hotplate is on, mass has been stable for a specified timeout time
  - Could be from hotplate left on with no beaker
  - All liquid has evaporated from beaker
2.) Mass suddenly removed
  - Beaker removed from hot plate
  - Beaker broke


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
- Loadcell amplifier
- ESP32 (not sure which dev board yet)
- TFT display
- Some kind of cable between display and load cell
- K type TC amplifier
- K Type TC


## Parking on a downhill
- ~~Finishing the pinout for the TFT display~~
- ~~Pushing to the display~~
- ~~Adding the TC amplifier to an ADC~~
- ~~Designing Top~~
  - ~~Printing ~~Top~~
- ~~Designing Bottom~~
  - ~~Printing bottom~~
- Adding Op-Amp Circuitry and CT
- Add Low Pass filter to load cell (10 kOhm in seris, 1uF to ground for both signal lines, 4.7nF across the two signal lines)
- Splitting into Head Unit and sensor node


## Work Log

### 07/19/2026
**Main Task:** Re-thinking this is a way that makes me happy

**Notes:**
- I've never quite been happy with what I first built and I couldn't quite put my finger on it
- I really want to revisit the homemade smart scale, and this is kinda an extension of that
- I'm thinking a modular architecture where I could use the same board/load cell set up for both the hot plates and the gas weighing
- This would mean actual brains underneath the scale, and then the head unit just displays

### 06/08/2026
**Main Task:** A simpler FSM, longer periods generally

**Notes:**

1. Mass-loss shutdown: less sensitive
You asked to make shutdown more conservative on a heavy hotplate. We tightened the sudden-loss path so it needs ~2 seconds of clearly large loss before tripping:

Higher EMA gap thresholds (35% of load)
Faster drop rate threshold (−3000 counts/s, later made relative)
Fast-drop confirmation over 2 seconds (not instant)
Longer empty-plate debounce (4 s)
2. Touch reset behavior
Touch was setting a flag but mostly only affected FAULT. We wired it so any screen touch (or serial ack):

Forces IDLE for 3 seconds (TOUCH_SETTLE_MS)
Clears shutdown reason and resets FSM hysteresis timers
Suppresses safety shutdowns during settle
Shows “Stabilizing after touch...” on the display
3. EMA gap tuning
You wanted a wider fast/slow separation and more intuitive sign:

Slow EMA alpha: 0.03 → 0.01 (~17 s → ~50 s time constant)
ema_gap: now fast − slow (negative = mass falling)
Sudden-loss checks updated for the new sign
UI label changed to (fast-slow)
4. Why sample removal didn’t trigger shutdown
You shared a log where raw counts crashed after removing the sample, but nothing shut down. We traced it:

Detection is EMA-based, not raw delta
The old −100k absolute gap gate blocked small loads
FSM went HEATING_MONITORING → IDLE (relay off) before safety paths could fire
5. Relative thresholds (main refactor)
You asked to replace magic count constants so small beakers work. We audited and converted 11 absolute HX711 thresholds to fractions of reference load (baseline when known, else cal scale), with optional absolute noise floors:

Mass presence, near-zero rate, spike reject, sudden loss, fast drop, boil oscillation, evap band, etc.
Added referenceLoadCounts(), countsThreshold(), and related helpers
Fixed the sudden-loss bug where absolute AND relative gates both had to pass

### 05/29/2026
**Main Task:** A simpler FSM, longer periods generally

**Notes:**
- It's cool to see the mass change in near real time, but I'm not sure this is strictly necessary for my FSM
- Moved to a fast and slow moving average set up, didn't really test it too much

### 05/28/2026
**Main Task:** Bench testing with real hotplate

**Notes:**
- Moved to a better system for signal processing. 
- Used a fast and slow EMA, and took the delta between them to calculate if the mass was decreasing or increasing, it seemed to work pretty consistently actually, better than the smoothed dM/dt

### 05/27/2026
**Main Task:** Bench testing with real hotplate

**Notes:**
- got it hooked up to Jim's franken 3D printed hot plate, with a TC for the FSM mounted really near the heating element
- It works decently, this will just be an exercise in smoothing and signals
- Detecting what is happening when is challenging, and things seem to want to drift around a bit. It's definitely sensitive, and kinda noisy. I'm not super sure how to deal with this to dial in the states. 
- Like maybe the mass updates pretty often, but the delta has some massive smoothing or SMA smoothing or something
- It is this weird combination of noisy and also slow changing, but I do think it has potential

### 03/30/2026
**Main Task:** Assembly, starting testing, adding TC

**Notes:**
- Assembled my 3D printed test, it was able to detect mass loss due to evaporation which was pretty cool
- Adding the TC was pretty trivial and it works well
- The part I'm having a hard time with is the matrix of possible states for my Finite State Machine,it;s a couple things:
  - First, the load cell is very very sensitive which is a good thing, but there is noise and even when it is evaporating, the mass sometimes oscillates positive.
    - I don't want' to smooth and retard the signal more, it's already kind of slow to react, it's like I need some kind of hybrid smoothing system but I'm not sure what
  - Second, it's a fine line between evaporating which is good and the heater should be on, and steady state time out. That is, hot plate is on but mass is not changing, indicating boil off or unattended hot plate with nothing on it.
- Trying to think through my FSM, and it seems more and more like I will need the current sensor to detect when current is really flowing to the plate
- Added a parameter so that if 2/3 of the dM/dt is negative is thinks evaporation is happening
- if it's 50/50 positive and negative, that's when it triggers the steady state and subsequent time out
- Jim started designing a way to hold the hot plate lid and incorporate my electronics

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

