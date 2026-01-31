---
layout: page
title: "ESP32 Battery-Powered Storage Tags"
categories: [microelectronics]
tags: 
  - electronics
  - esp32
  - battery-powered
  - e-ink
  - storage
  - iot
  - low-power
  - wireless
  - tags
  - inventory
---

## Project Overview
Creating battery-powered ESP32 tags for storage cabinets. These tags will display information about who owns each cabinet, updating wirelessly and running on battery power for extended periods. The goal is to have a low-maintenance system that helps organize and track storage locations.

## Design Goals:
- Long battery life - months on a single battery
- Wireless updates - no need to physically access tags to update information
- Clear display - readable at a glance
- Low cost - keep per-tag cost reasonable
- Easy deployment - simple setup and configuration
- Low maintenance - minimal intervention required

## Architecture:
- ESP32 microcontroller for wireless connectivity
- E-ink display for low-power information display
- Battery power management for extended operation
- Smart Lab 2.4GHz wireless 
- Central management system for updating tag information

## Hardware Components:
- ESP32 development board (or custom PCB)
- E-ink display module
- Battery (LiPo or similar)
- Power management IC
- Enclosure/mounting hardware

## Technical Details:
### Power Management:
- Deep sleep modes to minimize power consumption
- Wake on wireless trigger or scheduled updates
- Battery monitoring and low-battery alerts

### Display:
- E-ink display for zero-power display retention
- Update frequency considerations
- Display size and resolution

## V1.0:
### Hardware:
- ~~Designing the PCB, SMD and Through hole components~~
- Designing the enclosure
- Receive and solder it together
- Testing power consumption in various sleep modes

### Firmware:
- Finish OTA updates
  - Adding CA, locking it down
- Adding an API so that I can send messages to other displays
- Displaying "battery low" message before it goes to sleep




### Software:
- No software needed for this version

## V2.0:
### Hardware:
- Revising, potentially adding switches to engage programming mode
- Smaller Cap, mosfets
- More capcitors, especially small ones

### Firmware:
- Integrating BLE mode

### Software:
- Creating an app for configuration


## Before Launch:
- Make sure it deep sleeps
- Checks for OTA updates at midnight and on boot

## Voltage divider:
47k and 60k (or so, check the code for exact values)
R1 = top resistor (battery → R1 -> ADC pin)
R2 = bottom resistor (ADC pin → R2 -> GND)


## Work Log:

### 01/30/2025
**Task:** Brainstorming V2

**Notes:**
- I know I should be working on V1, but I'm thinking about how to add a button and an LED to V1
- I think I can repurpose my ADC pin that is currently doing the battery measurement
I'll need to do a super high resistivity pull up resistor on the pin, and then use the button to take it to ground
- I can put the LED on pin 20, which isn't currently doing anything.
- Designed the box enclosure, cool cool

### 01/27/2025
**Task:** Setting up OTA Pipeline

**Notes:**
- Installed Caddy on my Raspbery pi, it's a super easy to use web server that I'll use to serve the .bin files for OTA updates.
- Re-jigged the NameServer from google to Cloud flare, so that I can use a cloudflare tunnel to safely transport my .bin files to the wider internet.
- Created a cloudflare account and cloudflare tunnel, it was super easy to set up

### 01/26/2025
**Task:** Re-configuring code, adding OTA updates

**Notes:**
- Broke the code up into separate files for APIs, Display formats, etc. Making it more manageable, it was like 1000 straight lines for a minute
- Added partitions to the code to allow for OTA updates. I learned that on the ESP32 when you upload the flash % used as shown in platformio is actually the % of the partition that is used, not the % of the total flash. So I was pooping a brick when I saw 72% used, but that was just the first partition.
- 

### 01/25/2025
**Task:** Voltage Divider, Shipping PCB

**Notes:**
- Designed and tested the voltage divider, learning experience. The ADC on the smaller ESPs staturate at 2.5v, they don't have the full range of the full size ESPs.
- So I spent like an hour debugging why it was saturating at 3.2v. Changed resistor values and it worked!
- Added the battery percentage to the display.
- Opted for linear battery discharge reading, though I know a fourth order polynomial or look up table would be more accurate
- Spent A LOT of time designing a PCB, and realized I fucked up the oreintation of the display so I had to go back to the bread board, change the pin out, test it, and then re-design the PCB.
- Sent the PCB to PCBway, chinese stuff with sketch payment, we'll see how it goes.

### 01/22/2025
**Task:** Designing the PCB, adding battery voltage

**Notes:**
- Previously I used all the ADCs, so I need to try a different pin out to see if I can free up an ADC for battery measurement.
- I'll also need a GPIO to drive a p MOSFET, so I can allow current to flow on the high side through my voltage divider and into the ADC.

### 01/22/2025
**Task:** Re-pinning the ESP32C3 to the display

**Notes:**
- Ok so I want to make a PCB for the display, which meas re-assigning pins to make the lay out easier
- It actually worked, I was able to assign everything where I wanted it. 
- Added a couple end points, the random facts and where is the ISS?
- Soldered a battery onto it, I'd love to get this sorted with a battery, that'd be sweet.
  - It will infact charge an 18650 battery, it looks like it regulates a 4.2V charging voltage. When no battery is connected, that's the voltage I see
- Also added an I2C SHT sensor, it'd be cool to display room temperature and humidity.
- I also want it to display Wifi strength as part of the "Home Data" section.
- Ok well I got both of the above working, it now displays wifi strength when it has it, and "wifi disconnected" when it doesn't.
- Adding the temp was pretty trivial too
- Did more work in formatting how the data is displyaed, and how the text wrapping works.
- Had a funny moment, my device was in such deep sleep that I couldn't connect to it via serial, I had to wake it up with a button press. Wake it up and time the upload so that it was awake for the upload.


### 01/21/2025
**Task:** Connecting Display to ESP32C3

**Notes:**
- Connected the display to the ESP32C3, it was actually easier to implement than any of the TFT displays.
- Wiring was easy I used the default SPI and other pins that were already assigned to the ESP32C3.
- Started pinging the cat facts API and the Earthquake API

### 01/19/2025
**Task:** Soldering Pins on e-ink display

**Notes:**
- Received the displays from China, took a few weeks but very exciting to have them.
- Just did some basic soldering, I was suprised that there are 8 pins on it, and they all seems 
### 01/05/2025
**Task:** Project inception

**Notes:**
- Started thinking about Mohammed's attempt to hack the e-ink display, then I thought, why not just make my own?
- The e-ink is the obvious choice as it only uses power when it writes, and ESP32-C3 are ultra low power.
- The only thing is that the e-ink displays are kinda pricey at $10 each, but if the whole project comes out to $15/unit, that really isn't bad at all. I have to remember we are dealing with adult money here.

## Open Questions:
- What's the target battery life?
- How often do tags need to update?
- What information should be displayed on each tag?
- Do we need a central server/management system?
- What's the range/coverage needed for wireless updates?

## To-Do/Don't Forget:
- [ ] [Task item]
- [ ] [Task item]
