---
layout: page
title: "E-Ink Display"
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
  - displays
  - inventory
---

## Project Overview
Creating battery-powered ESP32 e-ink displays for lots of things! So far I've created four different apps that can run on the display. The first and maybe most useful being local temperature and humidity sensing, with the ability to push data to NEMO. Secondly, it can inegrate with nemo to display shelf information from the recurring charges. A couple fun applications include a "Fun" API that displays random earthquake and cat facts. The last app is a "Messages" app that allows you to send messages to the display from a web interface. 

### Hardware:
- Testing power consumption in various sleep modes
- Soldering PCB V2.0
- Designing enclosure V2.0

### Firmware:
- Finish OTA updates
  - Adding CA, locking it down
  - Creating a manifest.json to store the latest version
- Adding an API so that I can send messages to other displays


### Per App Breakdown:
#### Sensor Mode:
- Making sure the nemo sensor actually pushes

#### Shelf Label:
- Start working on pinging the NEMO API to get the shelf info
- Writing a script for the VM to share the shelf info
- Generally testing, is it even useful?
- This will heavily depend on battery life and how compact I can make the enclosure.

#### Message Mode:
- Testing



## Before UGIM:
- Have a proper PCB that people can buy and use
- Have an SOP written on how to solder and assemble the display
- Proper website with documentation and support
- ~~.bin uploader on web working~~
- Sensor and Shelf modes working
- Testing power consumption
- OSHWA certification(?)
- Stanford OTL Blessing



## Work Log:

### 02/18/2026
**Task:** Shitting Pants

**Notes:**
- I went to assemble another one of my three boards, and I broke off the battery ground pad trying to re-work that tricky solder joint!
- So I was like whatever, I'll just attach it to the board, no battery and attach a screen for testing
- I tried testing and it just would not display right, like half displaying the red text on one display, and not displaying anything on the other display
- So I was like well heck, I've only ever used on display, are these broken? Is my ESP32 damaged? I tried a bunch of things, but nothing worked
- So back to the fundamentals, I got a new ESP32, recreated the pin out on the bread board. Uploaded it, and what do you know it works perfect. I think the ESP32 was broken in some insidious way with the ground pad sheared off
- Both screens are working now, definitely came down to the ESP

### 02/17/2026
**Task:** PCB V2 ordered!

**Notes:**
- made my final revisions to the PCB and ordered it. Now the long wait. 
- List of changes off the top of my head:
  - making the battery connection holes larger
  - moved the ESP32 to the other side of the board and farther away from the pins so it doesn't clash with the e-ink display pins
  - moved the battery connection holes farther apart so they are easier to solder
  - made the ESP32 pads smaller, they just didn't need to be that big
  - Changed my silk screen, no more "dreams and gasoline", now it's "Designed with love in Redwood City"

### 02/17/2026
**Task:** Meeting With OTL

**Notes:**
- the take away is that there are two criterea to meet if Stanford has rights to the invention:
- First: more than incidental use of Stanford resources. Laptop and internet usage is considered incidental use. I also barely worked on it at work, which means I didn't us Stanford Time.
- Second: Commercialization. Since I'm not trying to commercialize it, Stanford is kind of live and let live. if I want to make a buck, that's a different story.
- There is an open source office that can help with ope source questions, I'll be reaching out to them for more information for sure. 

### 02/11/2026
**Task:** Adding OTA URLs to the Raspberry Pi, Code, PCB

**Notes:**
- Logged in to the Pi, created more folders to hold the OTA updates, including manifests and firmware files
- Created a bash script that uploads the files automatically, figures out the pathing and everything else
- Added detection for mismatch between the config that is sent and the firmware available
- Started modifying the PCB for V2. Changes include:
  - Narrowing the throughole for the ESP32
  - Changing the ESP pad design to be smaller, no need for the massive rectangle pads
  - Widening the battery connection holes from the ESP32 to the board
  - Enlarging the battery connection holes for the plastic charger case
  - Switching the side of the board the ESP is on to make things more compact
  - Moving where the components are placed so that it doesn't clash with anything on the back side of the display PCB
- Also Added a Root level readme to the GitHub. 

### 02/10/2026
**Task:** Fixing Messages Mode, Many Case re-designs

**Notes:**
- Changes on the messages app on the web side so it sends the right config mode
- I learned there is a packet maximum of 512 bytes, so the move is really to send the messages in chunks. But that would require some work on the ESP32 side
- Increased the spacing between words so it's way more readable, this is done in the text render function by adding more pixels to the spacing, you can't just add more spaces I learned
- Re-designed the enclosure. Now that I know where the port is, I made a hole for it to plug in.
- General improvements to the box, just polishing it off.
- It always takes more versions than you think, lining up the USB-C port was weirdly challenging. On try #3. 

### 02/07/2025
**Task:** Soldering PCB

**Notes:**
- Received my PCBs back, they worked!! all the connections were correct, holy cow

### 02/06/2025
**Task:** Adding battery message

**Notes:**
- Added a message to display when battery <5%
- Wakes up when charge is >10%, waking up every 5 minutes to check the battery level
- This is all configurable in hardware.h, but not configurable via the web interface. End users don't need to know how to configure everything everything

### 02/05/2025
**Task:** Firmware from the browser

**Notes:**
- Added a page on the website for firmware updates, it needs a few different binaries to work
- It installed first try actually, but the partitions weren't correct so it was stuck in an infinite loop of boots
- Once I set the partitions correctly, it installed fine and worked great.
  
### 02/03/2025
**Task:** Adding BLE Mode

**Notes:**
- Started chipping away at the BLE, getting there.
  - First, it was a mission to make the ESP32 discoverable by the browser. I was able to find it using a python script that detects everything, but the browser is particular
  - I had to add a service UUID to the ESP32, as well as TX power and all this other stuff
  - Then once it was found by the browser, it wouldn't connect because it was not advertising and services/characteristics
  - Once I broadcasted the right characteristics it was able to connect
- Sending from the computer to the ESP was actually pretty easy, that worked right away
- Cleaned up some UI, moved buttons around
- Added a feature so that after you upload the configuration, it reboots and applies the new configuration, and also doesn't do the BLE connection again
- BLE and Wifi use the same antenna so you can't use both at the same time.
- Yeah just did a shit load of work, also added the nemo stuff
- It occurs to me that to have this be as flexible as possible, I should really just ship them with a bare minimum bluetooth set up, and then the end user can download thier own firmare. I guess this makes sense??
- At some level people need to be able to flash their own shit if they but their own ESP32s that I never touch. Hmm complex.

### 02/02/2025
**Task:** Printing the enclosure, thinking

**Notes:**
- V1 was surprisingly close! I don;t have the PCB yet so I'm not sure about the total depth, but I was a bit generous with it. I may be able to make it flatter, also battery dependent.
- Realized if you want it to be desk mounted, you might want little feet to prop it up and point it at you. But for a shelf it's lovely.
- Oh yeah and I'll need to add a port for the USB-C port.
- I was thinking a huge part of this is lab oriented, I'm thinking I should start putting some emphasis on the lab portion of the display
  - Like setting it up so that it's very easy to configure in 

### 02/01/2025
**Task:** OTA Updates

**Notes:**
- Did the first successful OTA update!! It was so exciting, hella cool to watch it download firmware off the internet
- Learned that I had the wrong CA certificate, I needed one of the google ones, v4 or something? I still don't fully get how that works but cursor came in solid on this one and found the one I needed
- With the OTA I realized I really do need the versioning, so I created a manifest.json that will store the latest version, and it creates a SHA-256 key


### 01/30/2025
**Task:** Enclosure Design, Brainstorming V2

**Notes:**
- Designed an enclosure for the battery and display. 
- Only part I'm not 100% on is how the back attaches, I opted for a four tongue and groove set up with a hole in it so It's easy to pull out. I guess we'll see how it works.
- I know I should be working on V1, but I'm thinking about how to add a button and an LED to V1
- I think I can repurpose my ADC pin that is currently doing the battery measurement
-I'll need to do a super high resistivity pull up resistor on the pin, and then use the button to take it to ground
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

## Done:
- ~~Shitting Pants~~
- ~~PCB V2 ordered!~~
- ~~Adding OTA URLs to the Raspberry Pi, Code, PCB~~
- ~~Fixing Messages Mode, Many Case re-designs~~
- ~~Soldering PCB~~
- ~~Adding battery message~~
- ~~Firmware from the browser~~
- ~~Adding BLE Mode~~
- ~~Setting up OTA Pipeline~~
- ~~Re-configuring code, adding OTA updates~~

## V1.0:
### Hardware:
- ~~Designing the PCB, SMD and Through hole components~~
- ~~Designing the enclosure~~
  - Design enclosure V2
- ~~Receive and solder it together~~
- Hardware V2 revisions:
  - ~~moving the location of the battery through hole pads~~
  - ~~making the battery connection holes larger~~
  - ~~moving the ESP32 farther away so it doesn't clash with the port for the tags~~
  - ~~Shrinking the pads for the ESP32, it doesn't need to be that big~~
  - ~~Flipping it so the ESP is on the opposite side? Doesn't make that much sense to put the ESP on the same side. I've learned.~~
- ~~Displaying "battery low" message before it goes to sleep~~
- ~~Adding web based .bin uploader~~