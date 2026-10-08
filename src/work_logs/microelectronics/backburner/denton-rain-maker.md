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

### Work Log

### 10/4/2026
**Task:** Figured out the smoke!

**Notes:**
- Figured out the smoke!
  - Okay, I learned that what was basically happening is that the diode was not going through the current-limiting resistor, so the diode was seeing the full reverse current of every half cycle. That's why it was releasing the magic smoke.
  - In the future, you use a current-limiting resistor on the whole LED/diode assembly as one. I think for this board, I will probably just leave the LEDs and the diodes off.

### 10/3/2026
**Task:** Learning ("where the rubber meets the road")

**Notes:**
- learning:
  - Okay, I was pretty stumped by the whole 24 V making its way all the way through the triac, but I did some learning and some research on this.
  - I learned that triacs can leak a little bit of power in the milliamp range, which is just enough to dimly illuminate an LED, which is exactly what I was seeing.
  - I also learned that this is why people use neon bulbs, sometimes the NE2 bulbs, which are more AC-friendly than an LED, which is, of course, a diode.
    - For my next project, I'll find a way to use a little PCB-mounted neon bulb because that sounds so cool.
  - I also fully understood that the snubber across a triac works because, at lower AC frequencies like 60 Hz, the capacitor is basically open and doesn't conduct. For those ultra-fast spikes, like whenever a solenoid closes, the capacitor acts like a short, and that allows the power to drain through the resistor harmlessly.
  - BUT WHY THE SMOKE

### 10/2/2026
**Task:** Powering the board

**Notes:**
- Powering the board
  - I got a 24VAC power supply, the leads are actually much finer gauge than I thought, I was able to puth them into the small terminal block no problem
  - Got the board powered up, the bridge rectifier was perfect, the 5V was perfect, the LDO worked
  - I had the 3.3V LED soldered in backwards
  - As a test, I took 3.3V and applied it to the pin where it'll go to drive the triac circuit
  - I released the magic smoke big time!! Straight cooked the diode associated with the LED
  - Man I do not know what is going on. The LED was acting as some sort of rectifier, like I saw 18 VDC between the comm and the outputs when not driven high, and then when I removed the LED and diode I saw the full 24VAC making it through.
  - I did probe for continuity, an there isn't like plain continuity between the two, the opto triac/triac must be doing something
  - Time to review the schematic I guess, I really thought I got it right... or maybe I did and I've got some hardware issue? Or I'm using it wrong?? Like does it want to be pulled low to turn off? That'd be a twist.

### 09/20/2026
**Task:** Soldering the board

**Notes:**
- Soldering the board
  - Soldered it together, much like the code, it works great when you don't apply power or anything!
  - I did make one mistake, the 6 pin connector is way smaller than I anticipated, I thought 2.54mm would be like the big standard connector, but it is most certainly not
  - I ordered the smaller connector just to finish the board but I'm not sure if the wires from the sprinkler solenoids will fit in it
  - I did pretty much everything except for a capacitor, the MCU which I don't have, and the couple connectors I don't have

### 07/19/2026
**Task:** Code

**Notes:**
- Wrote the code, added it to denton-works as well
- It's super easy and perfect when you can't test it! Boards should get here today, I'm eager to test my reflow hotplate and see how that works

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
