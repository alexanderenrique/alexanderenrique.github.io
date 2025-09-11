---
layout: page
title: "Smart Thunderbird Electronics"
categories: [microelectronics]
tags: [electronics, classic-car, modernization]
---

# Smart T bird work log


- [Smart T bird work log](#smart-t-bird-work-log)
  - [Project Overview](#project-overview)
  - [Current Tasks](#current-tasks)
  - [Work Log](#work-log)
    - [09/07/2025](#09072025)
    - [09/3/2025](#0932025)
    - [09/2/2025](#0922025)
    - [08/31/2025](#08312025)
    - [08/29/2025](#08292025)
    - [08/28/2025](#08282025)
    - [08/27/2025](#08272025)
    - [08/06/2025:](#08062025)
    - [08/2/2025:](#0822025)
    - [07/31/2025:](#07312025)
    - [07/30/2025:](#07302025)
    - [07/29/2025:](#07292025)
    - [07/28/2025:](#07282025)
    - [07/25/2025:](#07252025)
    - [07/24/2025](#07242025)
    - [07/23/2025](#07232025)
    - [07/22/2025](#07222025)
  - [Road Map](#road-map)
  - [General notes:](#general-notes)
  - [Scope of work:](#scope-of-work)
    - [Sensors and controllers I want:](#sensors-and-controllers-i-want)
  - [Done](#done)
  - [Nodes:](#nodes)


## Project Overview
- I love me some data, micro electronics, and old cars so let's put them all together. 
- My dream is to have temperature data, PWM control of fans, and a cool hidden display where I can see all the readouts and what everything is doing, and also manually override sensors if say I want to put a fan on full blast or whatever else
- This project integrates with the [[thunderbird-restoration]] work


## Current Tasks
- Getting the CAN working
- Think about the larger picture of nodes, what needs to go where. If we're using full fat ESP32 with CAN, maximizing the IO from each to minimize the number of CAN wires
- Then we can think about the GUI, etc



## Work Log

### 09/07/2025
- I tried making some changes to the GUI offline, but it resulted in some serious bugs. I had deleted the power and current from the display, but that caused this crazy bug where the memory was looking for something at a certain memory address and it couldn't find it so it would reboot
- I got it working again, learned my lesson to make incremental changes instead of everything at once
- Made the UI nicer, it is displaying and updating the real time values as it should now


### 09/3/2025
- completely reorganized the project space, created different nodes that make more sense
- Wrote the code for a central node and the display node
- Wrote some basic UI stuff. Getting the screen set back up was a mission, something was lost in translation, I had to remember all the user setup stuff for the screen
- And the real trick was setting the rotation on the screen correctly, it gets totally scrambled without the right orientation. 
- Decided that the central node will do 3 things, measure voltage, IMU, and temp/humidity.

### 09/2/2025
- got the right transistors, and got the screen auto dim working!
- Played with a ton of different resistor values. Resistors to give the LDR the correct range, resistors to keep the BJTs happy, series resistors to keep the screen from flickering, etc. Lots going on.
- Tried all kinds of things to reduce the flicker, but what I learned is that as long as the background isn't white, the flicker is imperceptible on the other colors.
- I targeted 50,100,and 200 mA to the display. I could definitely make it dimmer, but the subtle flicker on white never went away. 

### 08/31/2025
- Tried to come up with the breadboard version of the screen central hub, it was a challenge!
- The resistor between the diode and ground really is necessary to get it to read properly
- I don't have the right transistors to build the circuit, I need some PNP transistors. And it's crazy that you use an NPN to trigger a PNP to make sure that the PNP is properly grounded. And there's math and resistors everywhere. 


### 08/29/2025
- came up with a screen holder print I'm pretty proud of. I don't think I'll need the securing bolts after all
- Started looking at the perf board layout, it's a lot to wrap your head around. Have to be super methodical, there is a lot going on. 
- Here's my pin out from the ESP:
  - MOSI → GPIO23
  - SCLK → GPIO18
  - CS (chip select) → GPIO5 (can be any GPIO)
  - DC (data/command) → GPIO16 (any GPIO)
  - RST (reset) → GPIO17 (any GPIO)
  - BLK/LED (backlight) → 5V from buck converter
  - TFT GND -> MOSFET Gate, pin 25
  - TX to CAN -> 21
  - RX to CAN -> 22
  - In from LDR -> 32
- Additional considerations:
  - Need resistor between the LDR and ground to adjust sensitivity
  - Need resistor between PWM pin and gate of mosfet to not blow stuff up

### 08/28/2025
- Finished the ashtray holder 1.0 and printed it. I was a little bit tight in the width, and long in the length. My bolt holes also weren't all that exact. 
- I decided to use M3 bolts directly into the PLA. Should be tight enough, especially because the screen kind of rests on the ashtray itself
- Made changes and have V 2.0 printing right now at the lab.
- Downloaded KiCAD. I think it's overkill for this project and I'll probably just use perf board, but I do love the sexiness of a real PCB. I kinda just want to create an MVP that works, and then I'll maybe make it nice. 

### 08/27/2025
- Started designing the ashtray holder for the screen

### 08/06/2025:
- I think I'm giving up on my wifi dreams and going CAN BUS like the rest of the automotive world
- I learned you must use a full blown ESP32 if you want to use can bus, the C3 and S3 don't natively speak canbus. 
- And if you want to use CAN, you need a little breakout board. Chat elegantly explained it as a walkie talkie. The ESPs already can communicate but they need the breakout board to send the message correctly. CAN does the whole high/low thing that the ESP can't drive

### 08/2/2025:
- still working on this wifi reliability thing, I think the c3 is just worse generally, maybe an antenna thing.
- uploaded the same SHT sketch to an esp32 (regular) and printed the wifi strength and in the kitchen right next to the AP the signal is like -68 dbm which isn't great, and then in the room it's -90 or less which is just terrible, could definitely contribute to the connectivity
-  added lines in the softAP that explicitly sets the max power at 20W, and makes sure the wifi doesn't sleep or go into low power mode
-  Considering either going to CAN Bus, which would make me a bit sad, or getting a stronger mini-AP, like an infrastructure spec one. 
-  Still trying to figure out if it's really a wifi strength thing or what. But I do feel like I'm asking a lot of the one little ESP to both drive a screen, touch polling, and set up a wifi network. 
-  

### 07/31/2025:
- got the C3 working and talking to the broker pretty easily, but the connection isn't the most reliable. I did two things:
- Disabled the DCHP and assigned static IP addresses to the sensor nodes
- Set the wifi frequency so that it goes to the same frequency everytime
- I just want it to connect right away when powered up, and it doesn't matter if either lost power at any point or anything
- Before these changes, it might take 2-3 reboots to connect
### 07/30/2025:
- the TMP36 sensor seems pretty dang inaccurate like there is a big offset of 15C, I guess this can have to do with the actual power supply voltage, the ADC quality, even noise from the wifi
- So I added an offset but idk if it's linear. Should still be close enough for non-mission critical stuff
- Also wrote code for an SHT sensor so I could measure office temperature, and further calibrate the TMP36
- Might still use the SHT31 code for

### 07/29/2025:
- wired up the TMP36 sensor, got it working easily enough
- learned about how the environmental variables work in PlatformIO
- Tried learning about how to structure much more complicated programs, there'll be a lot of nodes with different environments, and main.cpp files

### 07/28/2025:
- HAHA I WON! got the touch working with LVGL, it was all about lvgl not "moving forward" in time like it wasn't actually polling the screen. Everything was configured correctly, good wiring, LVGL just wasn't checking the screen if you can believe it

### 07/25/2025:
- Still battling the touch screen in LVGL, just seems like a set up issue
- I deleted any mention of the esp32-C3 from the ini file, don't want to confuse anything
- Copied the suggested lv_conf.h from lvgl folder, so it's much more fine grained control
- removed the "build simple" build flag from the .ini, to make sure it uses my lvgl_config.h
- Commented out another lv_conf.h file that I found in the .pio/lvgl folder. I don't want it getting confused with different conf files.  

### 07/24/2025
- Got the touch screen working, but the component that integrates to LVGL is still not working. Not sure how those are related
- It works when I set the baud rate to 96000 but not the default 115200, but I may just try that again
- LVGL and the regular touch out are related but different somehow. Like there is different code for LVGL to recognize a touch
- reducing the touch sensitivity to 100 from 600 could be a good thing, really light touch is kind of nice

### 07/23/2025
- short guide to PlatformIO
  
| Folder/File | Purpose/Contents |
|------------|------------------|
| .pio/ | Build output, temporary files (auto-generated) |
| include/ | Project-wide header files |
| lib/ | Custom libraries |
| src/ | Main source code |
| test/ | Unit tests |
| platformio.ini | Project configuration |

- first day of PlatformIO and I got the LVGL demo working, albeit with no touch yet but I feel great about it, learned a ton
- 

### 07/22/2025
- made a branch in Jeff's repo for my PlatformIO project, I think that is the way to go as opposed to Arduino CLI + VSCode. I just don't want to have to configure everything manually sounds scary
- Started playing with PlatformIO

## Road Map
- ESP32 C3 reading temperature
- Broker talking to the C3 node
- two way communication, turn LED on and off
- OTA updates
- advanced features like PWM
- Power and wiring from car
- Planning sensor nodes, perfboard

## General notes:
- Screen pinout, from 1-X
  - VCC
  - GND
  - CS
  - Reset
  - DC/RS
  - MOSI
  - SCK
  - LED
  - MISO
  - T_ClK
  - T_CS
  - T_DIN
  - T_DO
  - T_IRQ

## Scope of work:
### Sensors and controllers I want:
- Coolant temp and PWM fan control
- Trans cooler temp and PWM fan control
- Oil Temperature
- Battery voltage
- Display that is getting all the data wirelessly from the sensor network
- The sensor should autodim based on light conditions
- Bonues
  - Diff temp
  - fuel pressure eventually
  - drive shaft speed, could inform other parts of the project
  - Back up camera using LIDAR
  - Six axis IMU with a display for g forces and stuff
  - figuring out how to log and or transmit this data somewhere

## Done
- figuring out PlatformIO
- Creating a github repo (shout out jeff)
- wiring the touch screen
- getting basic touch working
- getting LVGL to read touch
- ESP32 reading temperature
- ESP32s talking to eachother using MQTT
- Broker ESP going with MQTT
- Most basic UI to display temp
- Getting the code working with the C3s
- Further Calibrating the TMP36

## Nodes:
- Screen Controller:
  - Overview: Drives display, connected to the LDR for auto dimming, has a CAN transciever
    | Sensor | From ESP32 | To ESP32 |
    ---------|---------|-------------|
    | light sensor | ??? | ??? |
    |Display| SO MANY | ????|

- In center console:
  - Overview: Measurement ESP32 that lives in the ashtray or somewhere inside the car for interior measurement
  - Measures: Inside temp and humidity, IMU, Battery Voltage, trans temp if it'll reach
  - Questions: Can we use the same buck converter and TVS to power two ESP32s?
    | Sensor | From ESP32 | To ESP32 |
    ---------|---------|-------------|
    | SHT31 | pwr,grnd | SDA/SCLK|
    | IMU | is it I2C? | ?????|
    |Voltage | voltage divider| ???|



- Engine Bay:
  - Overview: Oil temp at pan, fan PWM, radiator temp, SHT31 (Ambient temp/humidity)
  - Sensors: 2x TMP36, SHT31, 

    | Sensor | From C3 | To C3 |
    ---------|---------|---------
    | TMP36 | pwr, grnd | Analog in|
    | TMP36 | pwr, grnd | Analog in|
    | SHT31 | pwr,grnd | SDA/SCLK|
    | Mosfet| pull down resistor, PWM| None

- Trunk:
  - Overview: Back up camera, shows how far you are from whatever is behind you, run a temp sensor down to the diff
  - Sensor: LiDAR backup
  | Sensor | From C3 | To C3 |
  --------|---------|-------
  | Backup camera | I2C, UART | ???? |

