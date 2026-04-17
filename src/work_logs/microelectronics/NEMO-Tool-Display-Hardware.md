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
- 4" SPI TFT display
- 5V 1A power supply for the ESP32 and display. The display will get power through the VIN pin of the ESP32
- The custom PCB, to make things nicer to solder together
- 3D printed enclosure



## For Alex K:

- Security I've implemented:
  - HMAC message authentication
  - Time stamp validation for replay attacks, not like that matters really
  - MQTT ports are PW protected, both on LAN and on Stanford net
  - This data is already publicly available, so it isn't the worst if it's intercepted

- Further to-dos:
  - Broker should only allow nemo's IP address

HW:
- Send Alex K github and PyPi links
- Socializing this with the NEMO community

Notes:
  MQTT cating on in OT
  Once it's up and running I can take it to Alex K for a pen test and review
  security clinets every week, usually on a Monday
  Joey Holtzman leads the group
  SSH into the machine, put the pubkey on my machine (do we need to open a port)
  Long run: replacing the linux machine in the closet with a mini PC


## Parking on a downhill:
- Adding the last state to NVS in the event of a power outage (maybe a good idea, not sure)

## Work Log

### 04/10/2026
**Main Task:**  VM issues

**Notes:**
- I spent a lot of time reconfiguring the VM after I clobbered the directory because I was having Git pull issues. I was impatient, and I paid for it.
- Make a master shell script that would be path agnostic to fire up the system services, but that didn't work at all.
- Spent like two hours on it and ended up going back to the original one where you have to manually configure the paths, but that actually worked really nicely.
- The general clean up of the workspace, standardized capitalization, that kind of thing.
- I think I fixed the issue where the screen would reconnect to the server, the broker, and get a cached message that the tool has shut down.
  - The giveaway that it was a bug is that any other shutdown must have a task or name associated with it, whereas when it was showing on the display, it was just a shutdown without a comment. 

### 03/25/2026
**Main Task:**  VM issues

**Notes:**
- Even more battling, I connected the screen on a whim, and the VM was dropping messages
- After a fair bit of digging, I learned that mosquitto had its own systemd thing going, and my nemo-mosquitto was competing with is and was losing and getting shut down and rebooting on this like five second loop
- Killed the mosquitto binary and am now only running my nemo-mosquitto
- That cleared things up

### 03/25/2026
**Main Task:**  VM issues

**Notes:**
- More battling with SSH but I got it this time, learned all about ssh and sshd, added the port 8883 to SSH into the collector via that port becasue it's the only open one
- Implemented Mosquitto and main.py as systemd components (is that the right way to say that?) and so they start automatically on boot
- Had lots of permissions issues with the systemd so it runs as root
- Did get it working eventually, it does feel a little slow like two seconds but not bad at all on the scale of things

### 03/18/2026
**Main Task:**  Network Issues, VM Issues, UI Issues

**Notes:**
- Added a range extender to the LAN,but there were a couple problems. It was annoying but I did learn a lot.
  - First, it was trying to do its own DCHP which would lead to sub nets and my IoT couldnt get to the collector. Well it was on Auto DCHP so sometimes it would and sometimes it wouldn't assign.
  - Second, I had also added the 5 GHz SNF Guest to the extender thinking that would be a nice thing, but when my ESP connected to the extender, for some reason the extender talked to the 5 GHz net instead and got an IP in a totatlly different public range and assigned that to the ESP which definitely will never work
  - Finally, I named the extended net a different SSID that the normal net, and connected the ESP to the different name
    - In my mind I'm like seamless transition, ESP connect wherever you want. But in reality, you want these things to be as deterministic as possible.
- Then I battled setting up SSH on the collector for a long time, I just totally broke it and I'm not sure why but I got it eventually, just a shitty hour or two.
  - Especially because I'm using a non standard SSH port
- Then for some reason the UI wasn't working as it should so I had to fine tune and make some tweaks. I really don't know why it worked at home but not at the lab. Either way I got it now. 


### 03/17/2026
**Main Task:**  UI

**Notes:**
- with the plugin now pushing the tasks and shut downs, I needed a UI to match!
- It's just a slow iterative process of making small changes, but I got it in the end
- The logic is really sound, and it can handle multiple tasks, and it looks sweet. Very very happy with it. 

### 03/15/2026
**Main Task:**  Case Design

**Notes:**
- Been flat out on the code lately, haven't been working on the hardware side.
- Spent some time redesigning the case, tightening the tolerances, making it so that there are detents so that the screen can't be pushed back whenever we start doing touch things.
- Up next, I'll need to redesign the PCB so that it doesn't hang over the edge of the display board as much.

### 02/28/2026
**Main Task:**  More UI changes

**Notes:**
- With the longer names, I've gone to a border system where the border of the display shows the tool status color.
- Looks good, ready for the Alex K demo.
- Alex K demo went well, I learned a bunch. I sent it off to Mathieu I hope he approves. 

### 02/27/2026
**Main Task:**  Names and formatting

**Notes:**
- Small UI changes on the display, instead of always displaying "last user" it now displays "current user" when in use
- Did some numbers on the distribution of name lenghts
  - This is percent of lab members, and the number of characters in their name:
  - 50% ≤ 12, 75% ≤ 15, 95% ≤ 20, 99% ≤ 24; max is 36.
- I'm thinking about maybe changing my layout to be more friendly to long names, right now 13 characters is my max but as you can see, that only accomodates less than half of people

### 02/18/2026
**Main Task:**  PCB Design

**Notes:**
- Started desining the PCB, it's really a super simple board onve you know what you're doing, the hardware is not complex
- Adding a couple capacitors just for the joy of it, yay more soldering!
- Checking and double checking all of my dimensions. The footprints are never quite right, i spend more time in the footprint editor than anything
- ~~Before I ship:~~
  - ~~Double check ALL critical dimensions~~
  - ~~Double check capacitor foot prints~~
- Ok double, triple checked things and sent it! Super keen, currently have two PCBs out, I love this stuff


### 02/16/2026
**Main Task:**  ESP32 Pinout

**Notes:**
- back at it, after my other adventures I learned how to really design a PCB and how to get the pin out to work smoothly
- Worked first time! Also added hardware.h and config.h to my src to keep it more universal across platforms
  - That is, no config in the .pio which gets rebuilt and destroyed contstantly
- Also got a real basic touch script working, so I verified the touch pinout that I used is going to work

### 10/14/2025
**Main Task:** Plugin and display integration fixes

**Notes:**
- Ok so the plugin side seems to be working which is great, but I did change some things which seems to have broken the display side.
- We're easily receiving the messages, consistently connecting to the broker, etc, but now the publishing and trimming of messages is not working.
- The main problem was that I decided to use Redis db1 instead of db0, and the consolidated connection manager script was using db0.
- Shot myself in the foot with one of my clean up scripts. when NEMO fires up, I had written in that it should stop all mqtt brokers, and only restart the one that it needs.
  - However since we're all on the same machine, it was also killing port 1883 which is the ESP32 MQTT broker.
  - So I wrote in the start code to re-open port 1883 when it launches, and don't try and connect unless the port is open.
  - That quiet closing of the ESP32 port was the problem!


### 09/21/2025
**Main Task:** MQTT integration and UI development

**Notes:**
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
**Main Task:** Broker configuration and PCB design start

**Notes:**
- Wrote a bit more code on the plane to configure the broker on the VM, hopefully it works, it's just a bit hard to test
- The collector computer at work has a public IP I can ping but the ports are protected by a firewall, and the raspberry pi at home has no restrictions but it doesn't have a public IP, it has NAT going on. 
- Made the messaging tool specific, so that each node can subscripe to one tool from the broker
- Started working on KiCAD! Created my first symbols, the esp32 base and the pinout for the display
- I then wired them together in the layout editor, for some reason I'm pretty hell bent on doing a single layer PCB, just cause I think it's be nice and simpler. Maybe even cheaper.
- I mentioned I don't want touch capabilities, mostly because people have filthy gloves and it might destroy my display. Though it might be nice to cycle through two screens, one that displays the status, and another for problems. Idk if that's worth it. 

### 09/08/2025
**Main Task:** NEMO configuration page and SSL setup

**Notes:**
- Thought about it over the weekend, I don't want to have people need to go into the back end of NEMO to initialize all this stuff.
- So throught the magic of cursor, I created a new page under configuration and got it working so that you can select the address and port of your broker as well as the user name and password
- Spent a lot of time on Nomachine messing around with the colector comupter installing Mosquitto and getting the authentication on the SSL/TSL going
- Learned about sharing credentials and stuff, which lead me back to modifying the NEMO page so that there is now a field to enter for CA credentials for you broker. Looks legit!
- The collector VM DOES have a public IP address and I am able to ping it. However, when I try and access the ports I get nothing. It's being intercepted by a firewall I'm pretty sure.
- I think the next step is to try and configure my raspberryPi at home to see if it has a public IP and if I can get MQTT messages out to it. 

### 09/06/2025
**Main Task:** Initial MQTT hook development

**Notes:**
- Clones NEMO-CE, and got the MQTT working locally! created a dummy user in the back end, got the hook written. I was using port 1883 without any security for testing, I was amazed how fast I/cursor got it going

### 09/05/2025
**Main Task:** Initial project planning and architecture decision

**Notes:**
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