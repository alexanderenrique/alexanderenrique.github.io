---
layout: page
title: "Denton's Rainmaker"
categories: [microelectronics]
tags:
  - electronics
  - esp32
  - water
---

## Project Overview

**Repo:** [alexanderenrique/denton-rain-maker](https://github.com/alexanderenrique/denton-rain-maker)  
**Project page:** [denton.works/projects/denton-rainmaker/](https://denton.works/projects/denton-rainmaker/)

So I was troubleshooting my sprinkler system over the weekend and looking at the PCB, and man, it just looks so simple. Luckily for me, two of the 24VAC drivers are actually broken in this controller, so I can either rewire a new board in or, way more excitingly, just design my own from scratch.

Things I'm hoping to learn about in this project are:
- optocouplings
- how to do good power management and wire up buck converters
- rotary encoder switches for different settings for the device

## Design Goals

- Four-channel sprinkler system control at 24 VAC
- Wifi capabilities via ESP32
  - For clock synching, removes the need for an RTC and battery
- Configurable via desktop browser using Bluetooth Low Energy
- Rotary encoder switch with eight positions
    - OFF, AUTO, BLE CONFIG, TEST ALL ZONES, TEST 1, TEST 2, TEST 3, TEST 4.
- LEDs, lots of LEDs, to show power into the box, Bluetooth active and the state of which relays should be getting energized


## Architecture

- **MCU:** ESP32 S3, the brains
- **Power** 24 VAC in from the wall
  - Goes directly to the triacs that power the relays
  - 24 VAC is also rectified and then converted down for ESP32 use
  - Opto triacs are used to separate the GPIOs from the ESP32 and the EC power.
- **Selector** 8 position rotary switch

### BOM-ish

- ESP32 SEED Studios C3
- MOC3063 6 pin photo triac driver
- Rectifier: MB6M
- Buck converter: LM5164
- Triac: BT136s-800E, 118
- Switch Knob 2047
- Heaps of LEDs
  - 1206 SMD LED https://www.digikey.com/en/products/detail/liteon/LTST-C150KGKT/365085

### Up Next:
- Breadboard the critical circuits
- Finish adding footprints, quadruple check layout
- Start writing the code


### Work Log

### 07/08/2026
**Task:** PCB sent to fab!

**Notes:**
- My largest and most expensive board yet, I really hope it works. 
- 3x3" was $43! Dang, but you get that

### 07/06/2026
**Task:** PCB and schematic re-visit

**Notes:**
- Started looking at this project again while I wait on other components for other projects
- I've learned so much from my other adventures I thought to apply it here.
- The 3.3 V LDO that I bought is different than the one I had indicated, so I swapped that out.
- I had the AC fuse across the two phases, which doesn't make sense.


### 06/23/2026
**Task:** PCB redesigned for fixed output buck

**Notes:**
- Added footprints of the inductor, and the diode for the new buck converter
- Learned that some old buck supplies actually want a little ESR, so I guess an electrolytic cap is in the cards for both input and output side. Jesus so many caps.
- I have a box of 47uF 50V caps at home so I think I'm just going to leave a large footprint and send it on the smaller caps and see how it behaves. I can swap in a 220uF later if need be
  - 220uFx50V is a 10mm diameter cap

### 06/20/2026
**Task:** DC power supply thoughts

**Notes:**
- I was copying the LMR based design for the DC-DC buck converter when I had a thought that there must be a simpler way to achieve 5 V out.
- I did a bunch of research and realized that there are fixed output voltage buck converters that only require an inductor and a capacitor.
  - I wanted a one-size-fits-all solution for both the Rainmaker and my car projects, but the max voltage on the Rainmaker is higher than the car stuff putting it in a different class, so I had to get this spendy $7 buck converter.
  - I learned all about switching frequency and inductor size.
  - I removed the old one from the board as well as all of its resistors, and I'm redesigning it.
  - The simpler older buck converters also require a diode to ground, which is interesting.
- I ordered all the parts and pretty much got it right. Now I'm waiting for things to come in to test my circuits before commiting to the PCB

### 06/20/2026
**Task:** PCB time, re design after redesign

**Notes:**
- Layout it good, I've learned a hell of a lot of things:
  - First, how triacs and opto-triac actually work. I think I understand it.
  - Why it's important to place a snubber across triacs, even though it's kind of overkill for my application here
  - I learned to make sure parts are in stock before designing a whole circuit around them. I'm having to redesign the buck circuitry around a new buck converter.
  - Finally understood equivalent series resistance (ESR) and why it actually makes sense to do two 22 µF capacitors in a row instead of one big electrolytic with higher ESR.
  - Learned about MOV varistors and how they can save your bacon.

### 06/17/2026
**Task:** PCB time

**Notes:**
- Started yesterday, took a couple days to lay out the PCB, I got it down to less than 3x3" which I'm pretty stoked on
- 

### 06/16/2026
**Task:** Schematic, re-thinking my knob, net class woes

**Notes:**
- i wasn't happy with the massive Adafruit knob and resistor ladder, it just added a lot of parts to the BOM, like 8 resistors, and a knob, and a 1" square footprint, and that's before labels!
- I did some HW and found the joy of rotary DIP switches. The 8 pin takes 3 GPIO but it is digital which makes me happy, no ADC weirdness
- Foun one I like that measures 10mmx10mm, tiny, but how hoften do you really need it?
  - Postions as of now will be: Program, Off, Auto, Test 1, Test 2, Test 3, Test 4, Test All Sequentially (or maybe party mode with LEDs) 
- Added a blue LED to indicate when it's in programming mode
- For once I'm not IO limited so we ball
- AC circuits are a net class nightmare, much learning about KiCAD today
- I also learned that in a 2 wire transformer kind of set up like I have, it's actually floating and there isn't really a Line or Neutral. But I'm leaving this concept in the schematic, just to clarify things
- Update: KiCAD is fine it's my dumb ass that doesn't understand TRIACs and would have absolutely released the magic smoke
- Fricking crushing the PCB layout, it's my favorite part. There are so many fun puzzles and things to learn. It's like you put each little piece together and then you combine it into one big thing!

### 06/15/2026
**Task:** Schematic capture

**Notes:**
- Started laying out the schematic, trying to wrap my mind around all the different components I've never worked with before
- New to me include:
  - Optotriacs
  - triacs
  - resistor ladders
  - AC power management
  - Serious big boy buck converters where you have to design your own package
- Took forever to wrap my mind around the triacs and I'm still not sure I 100% get it. Kinda like a relay but not? Working in AC land feels very different than DC land
- Designed the resistor ladder for the switch, man this stuff reallly tickles my brain

### 06/14/2026
**Task:** Project Inception

**Notes:**
- Amanda of all people suggested solving this problem with microelectronics so you can imagine I am all in on it
- It'll be my first foray into AC plus micro controllers, plus digital, plus some analog stuff, plus fun knows and resistor ladders
