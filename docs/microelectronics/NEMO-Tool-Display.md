---
layout: page
title: "NEMO Tool Display"
categories: [microelectronics]
tags: [electronics, esp32, mqtt, display]
---

# NEMO Tool Display Project

## Project Overview
- Create a small display system that shows the current status and next reservation for NEMO tools
- Uses ESP32 connected to TFT display to show real-time tool availability information
- MQTT communication with broker to receive tool status updates
- Clean and professional looking display that can be mounted near tools

## Current Tasks
- Set up ESP32 with TFT display
- Implement basic MQTT client functionality
- Design simple UI layout for tool status
- Test communication with MQTT broker
- Create mounting solution for display

## Components Needed
- ESP32 development board
- TFT display (ILI9341 or similar)
- Power supply
- Enclosure/mounting hardware

## Technical Details
### Display Pinout
- MOSI → GPIO23
- SCLK → GPIO18 
- CS → GPIO5
- DC → GPIO16
- RST → GPIO17
- LED → 3.3V
- GND → GND

### MQTT Topics
- Tool status: `nemo/tools/{tool_id}/status`
- Next reservation: `nemo/tools/{tool_id}/next`

## Work Log

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
