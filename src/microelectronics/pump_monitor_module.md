---
layout: page
title: "Vacuum Pump Monitor Module"
categories: [microelectronics]
tags: 
  - electronics
  - esp32
  - sensors
  - monitoring
  - preventive-maintenance
  - nemo
  - imu
  - temperature
  - current-sensing
  - vibration-analysis
  - embedded-systems
---

## Project Overview: Using technology to take better care of our vacuum pumps, preventive monitoring and maintenance. It will us a CT sensor to measure current, and an IMU to measure vibration, and a couple thermistors to measure temperature. It will integrate with our existing lab management system, NEMO, to provide real-time monitoring and alerts.

## Design goals:
- Get this out into the world, get it across labs, especially NEMO enabled labs
- Accuracy is nice, ability to measure change is more important
- Monitor: Pump and motor temp, current draw, vibration
- No SMD, everything should be solderable by hand, readily available parts. Easy to change by the end user if they want different sensors or different ranges.
- Easy to configure code, some kind of light UI?
  - Calibration steps, end points other than NEMO?
- There is a monitor PCB and then different modules can connect to it, making it modular. 

## Architecture:
- Monitor module:
  - just the screen, ESP32, and RJ45 connector with SPI connections
- Pump monitor module:
  - Will recieve 5v and regulate down to 3.3v usind an LDO
  - Screw terminal connections for NTCs, jack for a CT sensor, and an I2C accelerometer inside
  - These will all feed into an ATtiny 3216 that has ADCs, I2C connector
  - Process this data and puts in an SPI buffer for the screen to pick up
  - Sampling doesn't have to be fast at all, maybe 2Hz

## Pump module hardware:
- ATtiny 3216
  - Takes all the analog inputs, the I2C from the acceperometer and converts to SPI that the screen ESP can poll from. 
- 3.5mm female headphone jack
- Resistors, capacitors, etc.
- CT sensor sct-013-000
  - output 0-1.25v output
- 10 kOhm ntc
- MPU6050 accelerometer
- LDO 5v to 3.3v
- op amp for CT sensor

## Screen Monitor Hardware
- 2.8" TFT display
- ESP32 with u.fl antennae
- RJ45 connector with 8 pins
- u.fl to SMA connector
- SMA rubber ducky antenna


## Pin outs:
- Yet to be determined, need to prototype first

## Don't forget:
- series resistors into the ADCs
- 22-47 ohm series resistors near the ATtiny 3216 for SCLK, MOSI, and MISO
- optional CS pullup resistor at ATTiny, to stop it from "chatting" with the ESP32 unless it's supposed to.
- large 1- 4.7uf Capacitor on output of the LDO on the pump module board
- small 100nf capacitor on the input of VDD on the ATtiny 3216
  
## Up Next:
- ~~getting my test device online and sending to NEMO, ideally before break.~~
- Testing the proposed CT-Opamp - ATtiny 3216 set up on a perfboard or breadboard
- Over break start Breadboard testing the screen unit, getting the code working and maybe start designing a UI
- Once everything has been breadboarded and tested, I can design the PCBs and get them manufactured
- At which point I can design and 3D print some enclosures and get the device out into the world


## Work Log:

###12/29/2025
**Task:** ATTiny 402 code

**Notes:**
- Spent the last few days learning to write C for the ATTiny 402, it's interesting learning about bit masks and the the quirks and features of directly configuring the hardware.
- Also configured the github repoo for this project

### 12/18/2025
**Task:** Final tweaks to pump beta, Screen UI on Squareline

**Notes:**
- Modified the RMV to amperage correction factor. Super interesting that the V-RMS is way higher when it's connected to the external power supply as opposed to my laptop. Maybe the laptop introduces some additional sag onto th midpoint bias?
- Anyways adjusted the correction from about 4 mV_RMS/A to about 8 mV_RMS/A, which takes my calculated amperage from 8 to 4, which is what my Fluke DMM was reading.
- Got the free edition of squarline studio working, licensing took me a sec to figure out. 

### 12/17/2025
**Task:** Organizing project, getting the test device online, TFT screen wiring and configuration

**Notes:**
- Organized the folders, now the KiCAD and all the code is in the same repo on git hub, so I can back up my KiCAD too! Fucking brilliant.
- Looked at the collector code, somehow date is part of the ESP32 payload, which kinda doesn't make sense? No idea how the interns are managing to get a date from the ESp32 unless I'm missing something.
- This proves that i will need some way to tell time on the ESP32, either an RTC or a way to get the time from the internet.
- For my set up, it makes way more sense for the collector to add the dat to the PUSH. 
- Finished getting the prototype online and sneding data to NEMO, very excited about that. Got temp sensors mounted to the pump and motor. 
- The CT sensor is kind of flaky, but it has the odds stacked against it on the hardware side. 
- I'm not going to sweat this version, I know I need an op amp and a larger capacitor to clean up the signal.
- Learned that I may not need the SMA antennae, the provided tiny cheap antennae connects right away even in the Savannah enclosure.
- Massive day, recieved the 2.8" module and some other parts, I bread boarded the screen and go the touch and display working!
- When I first did this like six months ago, this was a two week project, so stoked to have done it in like 90 minutes. Touch and everything. 

### 12/16/2025
**Task:** Playing KiCAD

**Notes:**
- Didin't make much progress, but I did realize I;m putting the cart before the horse a bit. 
- I want to get the test online first, and I need to have my hands on the hardware before I can really do a layout
- Did learn all about how I can use the SD card to store data, it's an SPI connection
- AND the ESP32 has two SPI channels so I can use one to drive the screen and the other for the sensor and SD card
- Learned the UI shouldn't be too heavy on the scale of things, even if I have lots of config steps
- Also learned more about NVM and how that works on the ESP32.

### 12/15/2025
**Task:** KiCAD, design changes

**Notes:**
- The piezo sensor needs a level of circuitry and high sampling frequency that makes this whole project much harder. Not to mention piezo mounting can be a challenge and is super important
- After designing the monitor circuit a couple times, I'm realizing it will make more sense to have a small MCU in the monitor module itself
- The module MCU can take care of converting I2C to SPI from the IMU, which will lengthen our max cable run
- It can also take care of the ADC locally
- This makes the wiring at the RJ45 connector much simpler and increases the max length of the cable
- However I will need to learn how the hell to program the ATtiny 3216, it's a whole new world of microcontrollers.

### 12/14/2025
**Task:** Learning, more sensors?!

**Notes:**
- Thought to add a piezo sensor to this, I mean there was one more output, how could I not?
- Learning about sampling freauencies, DMA, kSPS (kilo Samples per Second, which is distinct from kHz)
- The piezo has the advantages of detecting higher frequency events
- ALSO learned about anti-aliasing, high frequency vibrations masking as lower frequency because of the sampling rate
- ALSO learned about I2S, unrelated to I2C. We'll using I2s to move the signal from the ADC to the RAM

### 12/13/2025
**Task:** Re-thinking it all, KiCAD

**Notes:**
- I want this module to be swanky and take off, and I want it to have a super low barrier to entry
- I also want it to be flexible
- I started by thinking about just adding a screen for data at a glance, but then if you add a screen you'd might as well be able to do some baseline configuration with a touch screen.
- Then if you add a screen you don't want to bolt that directly to the pump, so it'd make more sense to have a screen/esp combo mounted somewhere, and then a pump monitor module strapped to the pump. This keeps this very flexible, and minimizes the components that are being vibrated to death. 
- And THEN I thought that I should use as flexible of a connection method as possible. I looked into MP 8 pin connectors but that would have driven the cost way up, and I just don't need that. 
- Instead I opted for a standard ethernet RJ45 connection that has 8 pins, which should be enough to support most any module
- So the high level architecture is: Screen/esp unit, touch screen, easy to configure, then different modules that plug in via a standrard ethernet cable, and we'll just do power over ethernet, and the resistors, and any SPI/I2C connections
- This means we're desining TWO PCBs, one to support the screen and the other for the module
- Also means that I can use an ESP32 with more I/O and power, it it also needs to drive a screen. 

### 12/12/2025
**Task:** KiCAD

**Notes:**
- Finally understood how the schematic and footprint interact with eachother
- The schematic pin out needs to match the footprint pin out exactly, then the wires create a network allwoing you to connect things in the PCB editor
- So you schematic doesn't have to be sexy, but it does need to represent what is connected and how
- I have my work cut out for me making a schematic that makes sense, then the PCB is straight forward I think. 

### 12/11/2025
**Task:** Just Learning

**Notes:**
- Learned about op amps, and why the voltage of my voltage divider was seriously sagging under load
- Pretty cool when everything clicks. My 100 kOhm voltage divider work perfectly with no load of course, but as soon as there was load it couldn't supply nearly enough current and it sagged from 1.65V down to 0.2V!
- This is where the dual channel op amp will help. I'll use one channel as a midpoint bias, to just keep the 1.65 volts rock steady. I'll still need to feed it from a voltage divider, but it'll just be a reference voltage
- The bias op amp will have a straight 3.3v feed and pull as much current as it needs to keep it at 1.65v
- In a perfect world, I wouldn't need the signal amplification of the op amp, the 1VAC swing of the CT would be enough to rpovide a good range to the ADC pin, but in reality I'm seeing 30x attenuation from my circuit. 

## 12/10/2025
**Task:** KiCAD for days

**Notes:**
- Started designing the circuit, realizing I don't know shit about how kiCAD works. There's quite a few layers to it!

### 12/9/2025
**Task:** CT circuit troubles, testing

**Notes:**
- The thermistor formula wasn't accurate at all, but the ADC was reading spot on for the voltage and resistance values so that was cool
- I ended up going to a two parameter Steinhart-hart equation. ditched the C parameter, who needs it... the temp sensing seems pretty dang accurate now, definitely good enough for what I need.
- The CT circuit needed a lot of attention. My wiring was correct, some of my hardware shoices can be improved, but it was working, just noisy
  - My fundamental problem is that there is a shit load of attenuation between the CT and the ADC measurement, and I don't fully understand it. 
  - ON the Savannah pump, the adc measures 0.4 VAC across the L and K pins
  - By the time I measure and calculate it, this is like .011 V_rms on the ADC!
  - First, i increased the nuber of measurements to measure over AC cycles, up from 1.6 to try and get a better signal
  - I still need to install a larger cap, my too small cap is a high pass filter
  - I think the long term solution is to add an op-amp but it does increase the complexity
  - Other problems include that for some reason my waveform is measured to be centered aroun 0.2v when it should be centered around 1.65 which is my bias voltage
  - My confusion lies in how all these things are calculated, like I'm seeing pretty big voltage swings


### 12/8/2025
**Task:** Holder design, code development

**Notes:**
- designed a holder for the monitor perf board. 
- My worry is that I'll isolate the vibration sensor too much and the signal won't be as strong but we'll see
- Started writing the code, took me a minute but I did it without cursor!
- The PIO set up took a sec, and took another sec to get the ESP32 working with the serial out. 
- Printed the holder, went well. I undersized the holes by 8 thousands, and with such a tiny screw they were almost impossible to get in. 
- Learned my wiring was totally fucked, I did a lot of stuff wrong:
  - The power connection to the IMU was flaky, and this was the gateyway to the rest of the devices
  - I used 2.2 ohm resistors instead of 2.2 kOhm resistors in the voltage dividers, which made it look like there was a short somewhere, because I kept seeing 3.3v at the ADC pin. We did a lot of soldering and unsoldering before we realized the problem. I figured it out using my brain and math, looking at the voltage divider formulas
  - The CT circuit was technically correct, but the capacitor was underiszed which I learned acts as a high pass filter for AC waves. So much to learn!
  - also wired the SDA and SCK pins to the wrong pins on the ESP, that's what you get for not having the actual device when you make the board
- once I fixed all the wiring, the IMU worked pretty dang well with the 4G setting, the 2G was noisy

### 12/7/2025
**Task:** Perf Board Assembly

**Notes:**
- Talk about rapid prototyping, had the idea on a Friday, and built it on a Sunday. Shout out Amazon.
- Learned about the pitfall of CT clamps, you can't just clamp them around the whole wire, you must have an exposed loop. If you clamp the whole wire the fields cancel out and you don't get a reading. 
- I tested it by splitting the wire on my box fan, highest setting it read 0.06 VAC, which if 10A=1VAC, then that's 0.6A, which is about right for a box fan. I think. 
- Soldered together the perfboard, went well actually. Made a firecracker of a device I've gotten way better at perf board building, I get it now. 
- I made the mistake of putting the NTCs on the bottom of the voltage divider, but I'm just going to try it as is and see what happens.


## Open questions:
- What is the current range of our pumps? Do we need different current ranges for different pumps?
- Should I subtract out some baseline for the vibration sensor? It does have a bit of noise, like in the 1 m/s^2 category
- Is the thermistor accurate, is the code right and my wiring good?

- Is there a safer way to do the current clamp, other than hacking a cable open?

## Figures out stuff:
- Figure out why my baseline value is not being measured at 1.65, that could really impact my rms value
  - The voltage divider was sagging under load
- undersrtanding all the different voltage values, what's really important and how are things measured?
- is the 2gs for the vibration sensor a good range?
  - Yes between 2 or 4, depending on how much she shakes
- Designing in kiCAD, do I really need an op-amp
  - Yes I really do need it, and I shoudl go for a dual channel op amp because it can also provide a stable voltage midpoint bias, unlike my high resistance voltage divider. 
- Understanding op-amp wiring