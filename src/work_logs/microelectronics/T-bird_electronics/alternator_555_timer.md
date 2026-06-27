---
layout: page
title: "Alternator Delay 555 Timer"
categories: [microelectronics]
tags:
  - electronics
  - 555-timer
  - automotive
  - alternator
  - pcb
  - thunderbird
---

## Project Overview

A simple delay circuit for alternator field excitation using a 555 timer in monostable mode. Designed to power up the alternator and provide a start-up delay using robust analog electronics. No code, no microcontroller required. The project aims for a compact, reliable PCB solution for automotive use.

**Repo:** `/Users/adenton/Desktop/smart_tbird/alternator_555_timer/`


## Notes:
- Quick 555 Timer Pinout (Monostable Mode):
  - Pin 1 (GND): Ground, connect to circuit ground.
  - Pin 2 (TRIG): Trigger input. When voltage drops below 1/3 Vcc, starts the timing cycle and output goes high.
  - Pin 3 (OUT): Output pin. Goes high during the timing interval, then returns low.
  - Pin 4 (RESET): Pulling this pin low immediately resets the output to low. Usually held high to disable reset.
  - Pin 5 (CTRL): Control voltage (optional). Typically unused; connect a capacitor (~10nF) to ground for noise immunity.
  - Pin 6 (THRS): Threshold input. When voltage here exceeds 2/3 Vcc, the timing cycle ends and output goes low.
  - Pin 7 (DISCH): Discharge pin. Open collector, used to discharge the timing capacitor to ground at the end of cycle.
  - Pin 8 (VCC): Supply voltage (typically 5–15V).

- In monostable mode, a pulse to TRIG (Pin 2) starts a single timing interval. The period is set by an external resistor and capacitor between VCC, DISCH (Pin 7), and ground.

## To Do
REV B Changes:
- ~~Change the footprint of the diameter of the capacitor to be smaller.~~
- The in and out holes for the wires are way too big.
- ~~increase capacitor on Trig circuit to 1uF, I got 1.1uF to work on the bench~~
- ~~Standardize SMD sizing, 1206 is a nice not challenging middle ground.~~
- larger mounting holes, like 0.1"
- make it tall enough, board plus fuse is 0.8"
- Make bolt tabe more chamfered maybe 50 thou and farther out from body


## Work Log (Smart Alex edition)

### 06/26/2026
**Main Task:** PCB Redesign

**Notes:**
- Started the Rev B work, most of it was pretty simple
- I have no idea why I opted for 0805 caps in the first version
- Finished soldering the protoboard, I learned all about mosfets and getting their direction backwards *face palm* the diode icon in the MOSFET did exactly as promised and it conducted current all day long
- My LED wouldn't turn off even when all 3 pins were high. Damn it.
- That'll teach me to throw together a board, we are in the "getting humbled" stage of hardware

### 06/25/2026
**Main Task:** PCB RECEIVED!! Much debugging :(

**Notes:**
- Got the PCBs!! Wow so small so sexy, the pads for the SMD stuff looks bigger that I thought, even the 0805
- Spent time organizing
- 0805 parts are where I draw the line, those are too damn small and don't even save that much space over 1206
- Here's everything I learned from my debugging session:
  - Ok So chat gas lit me into thinking my RC circuit on the trigger pin was backwards, but it wasn't
  - I learned I need a better testing set up for power and ground and probes and stuff, my current set up involves too many fingers and it slows me down
  - The fundamental problem is that my capacitor was too small on the trig circuit, so like power supply ramp or anything and it wouldn't trigger the trig pin would just go straight high



### 06/23/2026
**Main Task:** Received Digikey order, designing case

**Notes:**
- Nice! Gotta love an electronics haul. 
- I didn't realize I'd bought clear LEDs that then illuminate a certain color but whatever
- Started working on the case design, I gave it like 90 minutes in the morning, man CAD just always takes forever
- Note to self, don't be stingy, make walls at least 100 thou thick. 
- Probably spent 3 hours designing a case, pretty dang proud of it. 
- I learned how to import PCB assemblies from Kicad into onshape which saved me a ton of time, I feel super legit now. Cool to see my PCB in OnShape


### 06/12/2026
**Main Task:** Shipping the PCB

**Notes:**
- hehe I've never turned something around this fast, designed the PCB using mostly 1206 SMD parts, my first SMD heavy project
- I got it down to 1.5 sqin which I feel is pretty impressive
- I kinda shipped a bit fast, I shoudl've taken a bit more time to put nice things on the silk screen, double check the wiring in and out hole sizes to solder the power wire into, and I think the mounting holes are some arbitrary distance apart. Oh well...
- Got m4 well nut for mounting, dampen some vibration

### 06/11/2026
**Main Task:** Schematic, light PCB design, breadboard

**Notes:**
- I dreamed about this last night, so weird
- I had a couple ideas, first to add LEDs so it's really easy to see what is going on. A green one for the device has power, and a red one for then the alternator should be excited. Easy enough to add
- The second was using a rheostat to tune the delay, but I decided this was unnecessary. I just don't care that much and if I shoot for 10 seconds, 8-12 is a perfectly fine range
- Ok bread board took most of the morning, I'm not even sure what I was doing wrong the first time, my schematic worked which is cool
- I feel like you don't really get it until you build it and have it fail a few times. Now i could build it off the top of my head
- I got it working with the parts at work, 3 second delay works perfectly, I'm sure changing the capacitor values will have the right effect. 
- Started chipping away at the PCB, mounting holes, holes for cables, etc. It's tight and looking nice

### 06/10/2026
**Main Task:** 555 timer, KISS edition

**Notes:**
- Ok so as much as I want to over complicate everything and make some crazy comprehensive box that would takes months to prototype and design, I think I want to get this working more. 
- I decided on a 555 timer, which means I get to avoid the buck converter, no code, no flashing, just a "fail proof" analog circuit
- Input will be really simple, I in, I out and ground.
- I spent time understanding the 555 timer and what each pin does, at once simple and complicated? Analog logic is a different kind of thinking
- I made it as far as starting to lay out the PCB, I think I got the schematic right and made mose of the right choices
- I learned that the classic 555 timer that uses BJTs or whatever isn't truly rail to rail, so it only swings up to about 1.5V under the rail. this is right at the voltage threshold that just barely starts turning the P type mosfet off
  - This is particularly bad becasue when when mosfet is mostly but not totally off the resistance is quite high and it generates a ton of heat, like a lot of heat
  - Like the max Vgs to turn the mosfter off is like -2V, so the -1.5V drop is pushing it
  - Luckily i learned that there is a CMOS version that is truly rail to rail and should allow the MOSZFET to totally turn off effectively
- I also learned about different SMD packaging sizes, I want to do something a bit different with this PCB and make it as small as possible, I think it could be really tiny like 2 in sq or something.
- I also learned a ton about capacitors, electrolytics have high capacitance but terrible tolerances and they degrade with heat

### 06/9/2026
**Main Task:** Re-imagination, reconception

**Notes:**
- Man that previous guy was such a schmuck. Now that I can design PCBs I look at the guy who used perfboard with a true sense of disgust. The loops, the bad soldering, ugh!
- So today I leared I need a timer to start my alternator after the engine starts, and sure you could use a 555 timer or something, but I ESP32, that's what I do. 
- Man I love microelectronics
- I want it to PWM the fan, and 