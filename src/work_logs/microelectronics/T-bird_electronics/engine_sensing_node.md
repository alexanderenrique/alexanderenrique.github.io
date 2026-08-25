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

### Pinout:
PC0,1,2,3: Temp Voltage dividers, 2k resistor, Thermistor on bottom
PA 1: TX, going to De
PA 2: RX going to Ro
PA 3: Tied to RE and DE
PA 4: Low side Fan PWM controller, active high
PA 5: PCB thermistor, thermistor on bottom, 2K resistor
PA 6: O2 sensor voltage divider for AFR, 1k top 2k bottom
PB 1: Voltage sensor, 10k top 2k bottom
PB 4: RPM comparator in, high indicates pulse, so non inverting. 

-----------------------------------

## V2 improvements:
- Swapping A and B, either silk screen or connection
- ~~removing fuse~~
- ~~adding real wire to board mounting~~
- correct filter values for RPM
- ~~removing O2 sensor pwr and gnd from the board. They don't need to be there~~

## To test:
- ~~does the PWM work the way I think it should~~
- ~~does RPM work, like at all~~
- does O2 sensor work
- Then we can design V2

## Work Log

### 07/24/2026
**Main Task:** Re-design, shipping the PCB

**Notes:**
- Designing and re-designing for the new wire to PCB mounts, double triple checking everything
- The board ended up getting bigger, I didn't want to cut it close on the fan amperage so I doubled the grounds from the PWM output, and two grounds from the board
- I'm like 95% sure I got everything right, I'm just a bit over this board, I kinda just want it to work. I got it so close the first time, but you learn everytime you build something!
- I guess I can expect it in mid august

### 07/23/2026 (afternoon)
**Main Task:** Subsystem testing: Fan, RPM

**Notes:**
- I had a silicon diode laying around that could handle the amperage, so I put that across the fan wiring.
  - Wouldn't you know it, the MOSFET barely heated up a degree or two F. Pretty cool, I'll be getting some Schottky diodes and doing the same thing
- I tested the RPM sensor, and can you believe that that also worked?! First try, just like 3 turns of the wire. It's like a little slow to respond but that's also a function of my averaging. It was reading very normal measurements, like 750 at idle in park, up to 1300 when I gave it a rev, awesome.
- I also half tested the O2 sensor. I plugged it in and powered it with the power supply. It did read and it did react pretty fast, the AFR was crazy rich at idle, which launched me down a rabbit hole of ignition timing and such. Cool to see though. It was sitting at 0.2 V, which is like 10.4:1. But then I gave it a rev and it responded and went up to about 1.3V which corresponds to 12.6:1 so I know it's working.

### 07/23/2026
**Main Task:** Subsystem testing: Fan, thermistors

**Notes:**
- Many things to change, but also a lot that I got right:
  - The PWM frequency was 1 kHz which produced a very audible noise. I'd read about this but never experienced it so that was cool
  - The default on works, but not quite how I thought, it still requires power into the module. Which isn't 100% awesome but good enough
  - The MOSFET got hot!! I forgot a flyback diode, and within 10 seconds of PWMing at 5% duty the mosfet was at 220F as measured by the thermistor. Super cool to see the thermistor in action though
- I learned about having a floor for the PWM, that low duty cycles just make heat and don't move air
- I also learned about rate inhibited decay, where we can basically have the fan test if there is ram air/additional cooling which is a good idea. 
  - Saves me from a PID loop, and it can actually be better becase the Integral doesn't have to wind down once the car is moving

### 07/20/2026
**Main Task:** It's alive

**Notes:**
- It's been a lot more time soldering. I got much better. I turned my iron temperature way down and used a lot of flux, and that helped.
- Finished assembling the board. It went pretty well. The only snag that I ran into is that I swapped my A and my B on my RS485.
- As soon as I swapped it out, it started working. It was super cool to see.
- I even got readings from the PCB-mounted thermistor. It was reading 80°F when it was closer to 70°F, but that could just be because of the resistor I chose and the thermistor not being in its efficient range just yet.
- I started looking at how I want to mount it in the car. It definitely is going to be a little tricky and time-consuming to get it mounted. Not sure exactly what that's going to look like.
- Along the firewall, where I had initially planned, is actually pretty busy and hot, so I think I'm going to put it by the electronics in the battery corner.
- I also flashed the code, and it worked the first time, which is pretty dang cool.
- I have to figure out the mounting before I'm able to actually start integrating and I'm routing the TC and oxygen sensor wires.

### 07/17/2026
**Main Task:** Soldering! Case Printing

**Notes:**
- Started soldering in the AM before work, I was super methodical and am testing system by system
- I was able to solder the SSOP devices without too much drama, felt great
- Used the solder wick for the first time
- I also learned that I was too hot and burning off my flux, for the leaded stuff I'm using I should have the iron closer to 310 C, instead of my toasty 380 C
- I solderded up to 5V buck converter and it worked perfect, then I went to the LDO and that also worked perfect, 3.299V coming out of that thing with no load, just beautiful
- Started soldering on the rest of the logic components
- Now that I have the boards I can do the case, it was pretty close first try, some measurement oversights but I think I'll get it on V2

### 07/15/2026
**Main Task:** "Writing the code", getting my mind bent by hysteresis

**Notes:**
- Mapped the pinout and fed it to cursor, it was so breezy, it compiles to 6.6KB of flash which is good to know.
- Implemented a lot of signal processing on the RPM feed:
  - Dropped values that are less than 15 ms apart. Aint no way it's spinning faster than 8000 RPMs
  - Then took the median of 3 samples, this should account for missed pulses or slightly too fast pulses
  - Then that median gets a light EMA
  - And then that EMA is smoothed to the nearest 50 RPM
- My main concern is with the thresholds, right now it's at 0.55V with a 100k 
- Ok so I did connect the hysterisis resistor correctly but I forgot an important part, a pull down resistor
  - the output feeding back to the non-inverting input is basically a weak pull upp, but it needs a pull down so that the voltage can come back down
  - I'll just come up with some Jank way to fix it on the current board
  - I'll add a resistor to the pull down diode
- I also changed the hysterisis resistor value from 100k to 22k to get a wider swing
- I should probably also change my divider on the inverting side to be maybe a volt
- It was also suggested to add some shielding to the pickup wire, I could run a shielded wire and then do some conductive wrap around my turns and the
- I learned and I feel like really understood how the push and pull of the hysteresis resistor network works
- I also learned that more turns may be better, to a point. Like the noise floor will always be there, but by having more turns I can increase my signal disproportionately more than the noise, which is good
  - The really advanced thing I hadn't thought of was to do a ton of turns and then feed that through a voltage divider to over sample and then reduce it. But with very small currents weird shit happens I think. 
- Also learned that I need roughly a 10-22nF capacitor on the input to act as a high pass filter, and that goin too large can slow down and over smooth your signal and you'll feel sad. 

### 07/14/2026
**Main Task:** Designing enclosure

**Notes:**
- The boards shipped from the fab today, so I should have them by the end of the week! I'm excited and nervous, I am trying to keep expectations down, there are so many new circuits what could go wrong?
  - Whole buck and LDO system, comparator for the RPM, heaps of voltage dividers but I feel good about those, and RS-485 that is untested

### 07/06/2026
**Main Task:** Fucking UPDI, with success

**Notes:**
- Not sure exactly what day this happened but I was finally able to program the Attiny 3216 and 3226!
- I recevied the MPLAB SNAP programmer, and I set up their IPE (integrated programming environment), moved a jumper on the board, generated a .hex file which is what the uploader wants
- And would you believe it the chips were recognized and it just worked, yeee hawwww
- I got yet another LED blinking, how doo is that


### 07/03/2026
**Main Task:** Fucking UPDI

**Notes:**
- Basically lost my mind trying to program the ATtiny3216
  - I got the Adafruit HV programmer, and I tried everything. I triple checked my configuration. I looked at it using an oscilloscope. I saw the high voltage pulse. I saw the break and the ATtiny. I tried three different ones, and none of them seemed to respond.
  - I seriously tried for hours. I was so irked.
- I then tried to program the ATtiny402, and guess what? First try, the programmer worked perfectly, and I was able to upload a blink sketch using the Ada fruit programmer.
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