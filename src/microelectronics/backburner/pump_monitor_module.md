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
- Monitor BOM:
  - Screen to display data
  - ESP32 with external Wifi Antennae to connect to NEMO
  - RJ45 connector for SPI connections to the pump module
  - Real time clock for timekeeping
  - SD card for data storage
  - RS-485 transceiver for communication with the pump module


- Pump monitor module BOM:
  - LDO regulator from 5v to 3.3v for the ATtiny 3216 and sensors
  - Screw terminal connections for NTCs, jack for a CT sensor, and an I2C accelerometer inside
  - These will all feed into an ATtiny 3216 that has ADCs, I2C connector and SPI output for the monitor ESP32 to poll from
  - Process this data and puts in an SPI buffer for the screen to pick up
  - Sampling doesn't have to be fast at all, maybe 2Hz

## Pump module hardware:
- ESP32C3-SEEED
  - Takes all the analog inputs, the I2C from the accelerometer and converts to SPI that the screen ESP can poll from. 
- 3.5mm female headphone jack
- Resistors, capacitors, etc.
- CT sensor sct-013-000
  - output 0-1.25v output
- 10 kOhm ntc
- MPU6050 accelerometer
- LDO 5v to 3.3v
- op amp for CT sensor



## Don't forget:
- real time clock and writing to the SD card!
- series resistors into the ADCs
- large 1- 4.7uf Capacitor on output of the LDO on the pump module board
- small 100nf capacitor on the input of VDD on the SEED c3
  
## Up Next:
- Prototype the hardware, get it working, then design the PCBs
  - Monitor module:
    - ~~Testing and adding the RTC~~
    - ~~Testing and adding the SD card~~
    - Testing RS485 communication
  - Pump module:
    - Testing Op Amp wiring
    - Testing RS-485 communication
      - Buying the RS-485 transciever
- Design the PCBs

## Notes for next time:
Connect T_IRQ
- Use interrupt or at least GPIO read
- Only read touch when IRQ is low
- Increase touch SPI clock to ~2 MHz
- Never poll touch inside long drawing loops


## Done:
- ~~getting my test device online and sending to NEMO, ideally before break.~~
- ~~Comapring the ESP32-C3 to the SEED studio version, figuring out if the pinout is similar enough that we can just swap one for the other on the pump module board~~
- - ~~Over break start Breadboard testing the screen unit, getting the code working and maybe start designing a UI~~

## Workingpin out for PCB design:
| Pin Function          | GPIO | Description                                 |
|-----------------------|------|---------------------------------------------|
| MOSI                  | 23   | SPI Master Out Slave In (shared: TFT + SD)  |
| MISO                  | 19   | SPI Master In Slave Out (SD card only)      |
| SCK                   | 18   | SPI Clock (shared: TFT + SD)                |
| CS (TFT display)      | 16   | TFT display chip select                     |
| DC (Data/Command)     | 5    | TFT data/command control                    |
| RST (Reset)           | 17   | TFT reset pin                               |
| CS (SD card)          | 33   | SD card chip select                         |
| CS (Touch controller) | 27   | Touch controller chip select                |
| SDA                   | 21   | I2C data line                               |
| SCL                   | 22   | I2C clock line                              |
| RX                    | 3    | RS-485 receive                              |
| TX                    | 1    | RS-485 transmit                             |

## Proposed pin out for PCB design:
| Pin Function          | GPIO | Description                                 |
|-----------------------|------|---------------------------------------------|
| MOSI                  | 23   | SPI Master Out Slave In (shared: TFT + SD)  |
| MISO                  | 19   | SPI Master In Slave Out (SD card only)      |
| SCK                   | 18   | SPI Clock (shared: TFT + SD)                |
| CS (TFT display)      | 16   | TFT display chip select                     |
| DC (Data/Command)     | 5    | TFT data/command control                    |
| RST (Reset)           | 17   | TFT reset pin                               |
| CS (SD card)          | 33   | SD card chip select                         |
| CS (Touch controller) | 27   | Touch controller chip select                |
| SDA                   | 21   | I2C data line                               |
| SCL                   | 22   | I2C clock line                              |
| RX                    | 3    | RS-485 receive                              |
| TX                    | 1    | RS-485 transmit                             |



## Work Log:

### 01/21/2026
**Task:** Designing the PCBs

**Notes:**
- Learned that my 5V RS-485 transceiver isn't going to work. I thought it just needed 5V supply and that the logic would be handled at logic (3.3v) levels, but it's actually a 5V logic level device. Which I guess makes sense for such a cheap device.
- I changed plan to  MAX3485 Transciever, it's 50 for $8 which is crazy. i thought it was $8 each and I was all mad, but it's a deal.
- Started designing the PCB, always a time consuming head scratcher, but it is fun. 
- Kinda hacked together a PCB, I figure there will be lots of iterations and bread board time and re-assigning pins, so instead of trying to get everything perfect, I'm just going to make something then iterate. 
- Ok so after much frustration, my big chatGPT revelation is that I can just re-assign the heck out of all these pins, most any pin can be anything, so that'ss require more bread boarding, but hopefully I can re-assign things.

### 01/16/2026
**Task:** SD card writing

**Notes:**
- Flaky ass connections on the breadboard make me lose my mind, SD card wouldn't mount with the exact same code and pinout as yesterday. Fiddled with it and now it's good
- Edited the formatting of the data, removed the milliseconds column, not necessary with the RTC
- I've got the SD card writing well enough on the breadboard, I think I can slowly start designing the PCBs
- Last thing to test is the RS-485 communication. I know it'll work if I use the pre-made module, but I want to design my own little one on perfboard to make sure my PCB design is correct in the future.
  

### 01/15/2026
**Task:** SD card writing, taking a step back on the UI

**Notes:**
- Soldered the SPI connections to try and get the SD card working
- Connected it to the HSPI. The one that didn't want to work as the ESP32-C3 master, but it might work here
- Update: I gave up on HSPI pretty quick I moved it to the VSPI that the touch and display are on, and it worked!
- IDK what it is with the problem is with the HSPI
- 

### 01/14/2026
**Task:** Playing with the RTC

**Notes:**
- It takes a CR2032 battery, but I learned the 2025s are dimensionally almost the same, jsut thinner and lower capacity
- The battery ground and the rest of the grounds are connected, but the positive has very high resistance to the other voltage in pins. I suspect this is because the battery only needs to power the chip and oscillator and doesn't (shouldn't) power the LED or anything unnecessary
- The battery IS supplied with 3V, seemingly regulated? i applied 3.3v to the pin in, and read 3v out the battery out.
- The code for the RTC is pretty simple, integrated nicely with the rest of the code.
- Learned that you have to have the UART disconected between the c3 and esp32 while flashing, otherwise it will fail to flash
- futzed with the time setting UI, the location of the touch input is just not right at all

### 01/13/2026
**Task:** Learning about RTC and RS485

**Notes:**
- Will need recharargable 2032 battery for the RTC
- The RS-485 is definitely the right way to do it, but it does involve adding at least 3 resistors.
  - Pull up and pull down resistors (1k-5kOhm)
  - Terminating resistors (120Ohm)
- Kinda came up with a roadmap for how to implement it

### 01/12/2026
**Task:** Learning, scheming

**Notes:**
- Learned more about taking this thing to the next level, OSHWA and FCC compliance
- The UART works nice on my bench here with a 3" wire run, but I learned that if I ever wanted to meaningfully sell these I'd need FCC 15b compliance
- The very fast rise time on the UART especially on a long cable would prove to be a challenge. It's not about Baud, it's about the rise times and how much EMI it generates
- The fix is to use differential pairs like RS-485, which would mean adding another chip which is a bit of a bummer, but doable. 
- RS-485 doesn't need to happen right away, it could be a V2 thing. 
- Good option for RS-485 transciever: https://www.digikey.com/en/products/detail/texas-instruments/SN75176BP/277385

### 01/09/2026
**Task:** Connecting two ESP32s via SPI, then bit banging SPI, then UART. FUCK.

**Notes:**
- Spent forever trying to get the SPI working. Trouble shooting every pin, battling sneaky pull ups, probing with the mutlimeter, etc
- Finally got a bit banging SPI version working, but then I though if you're gonna bit bang there's gotta be a way to do it with less than four wires.
- UART is the hero, changed the code to use 1 wire UART, should really simplify things.
- UART worked, just worked right away. Gotta remind myself that is how you learn. Trying things and suffering. 

### 01/07/2026
**Task:** SEED c3 vs regular c3 comparison, connecting master and slave ESP32s via SPI

**Notes:**
- SO bad new, the pinouts of the two are wildly different, the SEED c3 is not a drop in replacement for the regular c3.
- I guess my question is, how bad is the wifi on the regular C3, and is it worth the premium to just use the SEED c3?
- I'm gonna go with yes, the $5 board with the antenna will save heaps of headaches. Nothing worse than Wifi not working.
- The SPI display stopped working when I connected the slave ESP32 to the HSPI connection. I spent like an hour testing all my wiring, it was fine but something about connecting pin 12 on the master to the MISO pin on the slave was causing the display to stop working.
- I moved the MISO pin to pin 25 on the master and it didn't transmit data, but it did stop the SPI problems.
- Wrote some dummy code on the slave to generate random values and hold onto them until the master ESP32 polls it. Not working yet. 

### 01/06/2026
**Task:** Re-thinking hardware choices, screen programming

**Notes:**
- Looking at the cost versus complexity of going to the attiny 3216 vs the ESP32-C3 for the pump module MCU, it just makes way more sense to stick with the ESP32-C3
  - The ATTiny needs special programming tricks, written in C, and it's only like $1 cheaper than the ESP32-C3
  - Being an SMD also makes it wayyyyyyy harder to work with.
  - If I'm clever, I think I can build a pump moniotr module board that can use either the cheap bare bones ESP32-C3 OR the SEEED studio version. That way you can have the cost savings of the cheap one if you're already attaching a monitor, or if you want a headless standalone you can just use the SEEED studio version.
  - The Op-Amp is similar, turns out there is a DIP version of the MCP6022 that I can use instead of the SOIC. 
  - I really do want this to get out into the world, and through hole packaging is way easier to work with than SMD.
- Screen Programming:
  - Trying to keep it simple for version 1.0, though cursor makes the UI stuff so easy it's hard not to go all out
  - Went from Hello World to a basic UI that displays the data
  - Added touch alarm acknowledgment, it changes to red if the values are outside a certain range
  - Added SPI logging via SD card for people that want a stand alone system. 

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

===============================================
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
