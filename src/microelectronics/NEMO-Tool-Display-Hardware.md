---
layout: page
title: "NEMO Tool Display"
categories: [microelectronics]
tags: 
  - electronics
  - esp32
  - mqtt
  - display
  - tft
  - iot
  - real-time
  - tool-status
  - reservations
  - nemo
  - lab-management
  - ssl
  - broker
  - #nemo
  - #lab-management
  - #electronics
---

## Project Overview
- Create a small display system that shows the current status and next reservation for NEMO tools
- Uses ESP32 connected to TFT display to show real-time tool availability information
- MQTT communication with broker to receive tool status updates
- Clean and professional looking display that can be mounted near tools

## Process Flow
{% mermaid %}
graph LR
    A["VM recieves MQTT message from NEMO<br><small><i>(Secure SSL if configured)</i></small>"]
  A --> B["Processes message, trims excess data"]
  B --> C["VM publishes MQTT message on port 1883 on the LAN"]
  C --> D["ESP32 subscribes to the topic"]
  D --> E["ESP32 displays the data on the TFT display"]
{% endmermaid %}


## Things to keep in mind:
- The ESP32 can only handle a few bytes over MQTT, so keeping message size down is important.
- NEMO sends information on tool status, user, enable time etc. The only reason I went with the whole plugin and not an API call was for speed of enables and disables, it's instant with the plugin, but it's very slowwith the API call.
  - This is to say if you want to add non time sensitive information from the API, this is the place to do it.
  - You can ping the API for next reservation, requested configuration, etc.

## Current Tasks
- Making sure the SSL is working properly. The not secure one is working.
- Testing end to end, going from NEMO to ESP32 to display
- Cleaning up the NEMO plugin so that its something that can be used by other people


## Components Needed
- ESP32 development board
- TFT display (ILI9341 or similar)
- Power supply
- Enclosure/mounting hardware
- **Link to custom PCB**
- **Link to 3D printed enclosure**

## Technical Details
### Required hardware:
- ESP32 30 pin
- 4" SPI TFT display, touch is not used in this project. Don't wan't people touching things in the cleanroom I don't think
- 5V 1A power supply for the ESP32 and display. The display will get power through the VIN pin of the ESP32
- The custom PCB, to make things nicer to solder together
- 3D printed enclosure

### MQTT Topics
- Tool status: `nemo/tools/{tool_id}/status`
- Next reservation: `nemo/tools/{tool_id}/next`

### Up Next/To figure out:
- adding another tool to my NEMO test
- making sure it is only listening to the correct tool

- Say I don't enable the tool, but I do change the tool status from functioning to non-functioning, will that cause the MQTT message to send?

## Work Log

### 10/14/2025
- Ok so the plugin side seems to be working which is great, but I did change some things which seems to have broken the display side.
- We're easily receiving the messages, consistently connecting to the broker, etc, but now the publishing and trimming of messages is not working.
- The main problem was that I decided to use Redis db1 instead of db0, and the consolidated connection manager script was using db0.
- Shot myself in the foot with one of my clean up scripts. when NEMO fires up, I had written in that it should stop all mqtt brokers, and only restart the one that it needs.
  - However since we're all on the same machine, it was also killing port 1883 which is the ESP32 MQTT broker.
  - So I wrote in the start code to re-open port 1883 when it launches, and don't try and connect unless the port is open.
  - That quiet closing of the ESP32 port was the problem!


### 09/21/2025
- man have done a heap of work on this. Got the MQTT working properly in bakersfield
- I learned that there is kind of a maximum message size that can be sent over MQTT, and that's about 1000 bytes. So I need to be careful about what I'm sending and how often I'm sending it., the ESP can only handle a few bytes over MQTT. Like 600+ is too many
- Had a super random error that cost me a couple hours. Made a mundane UI change, and something must have gotten corrupted because I got the white screen of death. I even tried pulling the working version from github and that still white screened
- I also saw the blue LED turn on which I learned means it in some kind of stuck or boot state, no bueno
- just clobbered the .pio and reloaded a bunch of stuff, got it going
- added a tool look up function to create an automatic mapping. NEMO sends data with the tool ID, but I want users to just enter the toolname and then the main.py does the mapping
- and also the esps will suscribe to a topic based on the toolname, which is easier to set up in the code
- Added logic so that if the first+last name of the user is more than 13 characters, it only displays first name
- that way, you don't have the name running off the screen. And if you first name is more than 13 letter, well you're SOL
- Tons of work on the UI, basically started from the beginning with my reboot problem

### 09/17/2025
- Wrote a bit more code on the plane to configure the broker on the VM, hopefully it works, it's just a bit hard to test
- The collector computer at work has a public IP I can ping but the ports are protected by a firewall, and the raspberry pi at home has no restrictions but it doesn't have a public IP, it has NAT going on. 
- Made the messaging tool specific, so that each node can subscripe to one tool from the broker
- Started working on KiCAD! Created my first symbols, the esp32 base and the pinout for the display
- I then wired them together in the layout editor, for some reason I'm pretty hell bent on doing a single layer PCB, just cause I think it's be nice and simpler. Maybe even cheaper.
- I mentioned I don't want touch capabilities, mostly because people have filthy gloves and it might destroy my display. Though it might be nice to cycle through two screens, one that displays the status, and another for problems. Idk if that's worth it. 

### 09/08/2025
-Thought about it over the weekend, I don't want to have people need to go into the back end of NEMO to initialize all this stuff.
- So throught the magic of cursor, I created a new page under configuration and got it working so that you can select the address and port of your broker as well as the user name and password
- Spent a lot of time on Nomachine messing around with the colector comupter installing Mosquitto and getting the authentication on the SSL/TSL going
- Learned about sharing credentials and stuff, which lead me back to modifying the NEMO page so that there is now a field to enter for CA credentials for you broker. Looks legit!
- The collector VM DOES have a public IP address and I am able to ping it. However, when I try and access the ports I get nothing. It's being intercepted by a firewall I'm pretty sure.
- I think the next step is to try and configure my raspberryPi at home to see if it has a public IP and if I can get MQTT messages out to it. 

### 09/06/2025
-Clones NEMO-CE, and got the MQTT working locally! created a dummy user in the back end, got the hook written. I was using port 1883 without any security for testing, I was amazed how fast I/cursor got it going

### 09/05/2025
- Initial project planning and component selection
- Researching display options and MQTT implementation
- Learned that the NEMO API doesn't support any kind of filtering
- This will make it very slow, pinging the API and downloading the file everytime takes 5 seconds, which wold make it really slow between someone enabling and changing the screen status
- And that's just pinging the API, who knows how long it takes nemo to take the enable command, then make a data base entry, then put it on the API
- For this reason, I'm going to try and write my own MQTT hook into the backend of NEMO. A brave new world.

## Next Steps
- Order components
- Test basic display functionality
- Set up MQTT client code
- Design UI layout
- Create prototype enclosure

## DONE:
- Set up ESP32 with TFT display
- Implement basic MQTT client functionality
- Design simple UI layout for tool status
- Test communication with MQTT broker