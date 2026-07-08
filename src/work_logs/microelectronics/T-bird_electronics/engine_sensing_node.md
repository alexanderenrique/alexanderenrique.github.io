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

### PCB don't forget:
- ~~Adding a return for the inductor pickup~~
- ~~Adding GND, 3.3V, 5V, UPDI test pads~~
- ~~Traces, duh~~
- ~~Comparator feedback resistors, from 1Mohm to 330Ohm~~
- ~~Adding 220 pF cap to the tach input~~
- ~~Correct voltage divider for comparator~~

-----------------------------------

## Work Log

### 07/03/2026
**Main Task:** Fucking UPDI

**Notes:**
- Basically lost my mind trying to program the ATtiny3216
  - I got the Adafruit HV programmer, and I tried everything. I triple checked my configuration. I looked at it using an oscilloscope. I saw the high voltage pulse. I saw the brake and the ATtiny. I tried three different ones, and none of them seemed to respond.
  - I seriously tried for hours. I was so irked.
- I then tried to program the ATtiny402, and guess what? First try, the programmer worked perfectly, and I was able to upload a blink sketch.
  - The blinking LED dopamine is unreal.
- So the question is, why are all my 3216s not programming? The reset pin is shared by the UPDI, but that shouldn't be a problem on all these chips fresh out of the box. What are the odds that three of them are bricked?
- My next option is to use one of the dumb USB-to-UART things and then hack together my own UPDI. I learned that the Arduino IDE now supports using UPDI directly, so all the Arduino-y hacks with the JTAG-to-UPDI you just don't need to do anymore.
- I also learned about the different families of ATtinys. I'm pretty tempted to use the 3226, which is a drop-in replacement but the later family. Evidently, you Multiplex the reset pin on that, but it still does have the same high voltage reset requirement.
  - Not that this high voltage reset thing should matter, because they've never been programmed before. They're fresh out of the box.

### 07/01/2026
**Main Task:** Sent to Fab!

**Notes:**
- Received a bunch of the components last night, had some footprint updates, minor stuff
- Took one last good look at it and sent it off for fab!

### 06/30/2026
**Main Task:** Final Lay out

**Notes:**
- I decided to add an oscilloscope test point for the ignition circuit, after the resistors, capacitors and diode. Just a little hole I might solder a wire into for testing
- More layout polishing, double triple checking the way the MOSFET goes, making sure the circuits are protected the way they need to be
- I always get scared to ship off a board, especially given the 555.
  - I'll be smarter about bring up this time though, and I have test points!
- Everytime I look there is something else, I learned to use the Design Rule Checker which has proved really useful. Lots of sneaky ground pins and fill zones that weren't connected the way they should be, so I hunted those down with the help of the DRC.
- Another two hours of proofing and checking, sheesh!
- Also realized I put some analog signals to non analog channels so I have to move some of those around

### 06/29/2026 (afternoon)
**Main Task:** Oscilloscope on the ignition, sick

**Notes:**
- I coiled the wire about five turns around the ignition lead on plug 1 with a 100k resistor and a 100pF capacitor, and I was actually able to see signals on the oscilloscope!
  - The five turns netted me a massive signal like up to 10v at times, not sure about the math on that one but even if it is super low current I dont want or need that much signal
- Pretty epic. I have a lot of noise and ringing and stuff, but there are discernible peaks. It'll just be up to the computer and some smoothing to make sure that I can get values that I can actually use.
- At idle, I was able to see peaks about 120ms apart which corresponds pretty dange well to around 1000 RPM. This was at high idle, engine jsut turned on
  - I measure later and the spacing was like 160ms which is more like 750RPM which is what I'd expect. So sick.
- With 3 turns of the narrow gauge wire, I was able to see pulses that I'm looking for were consistently over about 0.8 V.
- For my comparater, I decided on 10k top and 2k bottom, netting me a threshold of about 0.55v. This will go on the inverting and the tach signal will go on the non inverting
  - I learned all about inverting and non inverting last night in my electronics text book hehehe nerd stuff
  - I will use a 100k positive feedback resistor which should net me about 80 mV of hysteresis, prevent false triggers and such
- The whole ignition and floating ground thing really did my head in, there are two methodologies for getting a signal, you can either use the antenna method like I am, or a full current transformer. This lead to my confusion about whether or not the both ends of the wire needed to return to ground. In the antenna method they do not

### 06/29/2026
**Main Task:** Final Layout, polish, traces

**Notes:**
- You can never really know how the traces are going to work out until you start putting them down, but it's pretty satisfying to have everything pretty polished and just hammer away and make slam dunk connections
- Added the tachometer circuit, cross your fingers on that one
  - I learned that the tachometer sensing wire is actually more like a capacitor than an inductor
  - I also learned that both sides DO need to be connected to the board, we are sensing a voltage afterall so we need a potential difference
  - I forgot to order the correctresistors for the comparator divider but whatever, I'm keen to see what the scope says about the voltage

### 06/28/2026
**Main Task:** Tachometer Layout

**Notes:**
- I managed to fit even more stuff on the board, I think it's gonna work
- Added the comparator, currently it is using a 0.2V reference
  - I'm going to throw the scope the on the old t bird later today and see what kind of voltages I can really expect

### 06/27/2026
**Main Task:** Adding tachometer, cause why not?

**Notes:**
- Now I'm just overboard, I'm done like really done
- Tachometer would be pretty sweet I've always wanted one, and famous last words but I think it wouldn't be that hard??
- I learned about comparators, useful thing in this context for sure
- Really solidified my understanding of diodes I think, I hope. 
  - I was going to opt for a 2 in one diode but the polarity was doing my head in so I went for a single option, just incase I hae to flip one or the other

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