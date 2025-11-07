---
layout: page
title: "Today I Learned"
categories: [general]
tags: 
  - learning
  - knowledge
  - daily
  - discoveries
  - insights
  - tips
  - tricks
  - documentation
  - #learning
  - #knowledge
---

I'm learning just all the time and I think it's cool to look back and see what you learned and when.

## Learnings

### 11/07/2025
-Learned that Web Socket Http, ModbusTCP and ProXr are all communications protocols, which I half knew, but I was able to decipher which protocol was being used by the standard port used on the SNSF interlocks. Probably. They can have differeent ports of course. 

### 11/3/2025
- Converting from OBJ to GLB, and how to use them in model-viewer
- React and CSS, like how they work together and interact

### 10/29/2025
- Really learned about traing on margin, I think I actually get it now.

### 10/16/2025
- Learned about TLS handshake and how it works.

### 10/15/2025
- Learned about Brewster angles again. 
  - p-polarized light (polarized in the plane of incidence) is not reflected — it all transmits.
  - s-polarized light (polarized perpendicular to the plane) still reflects.
  - So basically in ellipsometery: near the Brewster angle, the reflectance of p-polarized light drops sharply. Small changes in film thickness or refractive index cause large measurable changes in the reflected polarization.

### 10/14/2025
- learned about Voronoi and how to use them in onshape designs
- U, V, and Seed parameters.
  

### 10/13/2025
- learned about Jitter in the sense of retrying a connectino as a way to mitigate many seperate things trying to connect at the exact same time.
  - Evidentely plus or minus 10% is ideal, not too long and wasting time, not too short and not solving you "trampling herd" problem.

### 10/10/2025
- I feel like I really understood birefringence for the first time, thought I've tried to learn it countless times
- Learned in the context of ellipsometery of course

### 10/04/2025
- Ford Rangers use a dual pump fuel system.
- Hitting a starter motor with a wrench CAN actually work


### 10/02/2025
- how to buy a domain and link it to your github pages site
- about DNS and TXT records and how to set them up and kinda what they do ish


###10/1/2025
- learned about 11ty and other ways to build a website
- learned about mermaid.js and ways to spice up my page with diagrams

### 09/25/2025
- How python plugins are structured and how to make your own

### 09/24/2025
- Redis as an intermediary between NEMO and the MQTT service, the concept of message queues and how they work

#### 09/10/2025
- When you manually start a google VM, you are using one set of permissions. When you cloud scheduler starts it using the SA (Service Account) it has a different set of permissions. And the SA needs to have the privileges to say get credentials from GCP
- Also learned that at Harvard, if you work more than you job, you can get paid up to 1.25X your salary. Gonna be using that in the future.

#### 09/09/2025
- How to download and install modules from a tar.gz. file. Still don't really understand what they are, but there's tarballs and such?
- You really do need to use OAuth to schedule vm cron jobs in google cloud scheduler
  - sub bullet point, sometimes you need to slow down and use your brain

#### 09/08/2025
- TLS over MQTT and how the CA credentialing works. Security will always be a whole thing on computers huh?
- Learned about public and private I.P. addresses. Just because you can ping an address, doesn't mean you can access a specific port (like 8883 for SSL MQTT or 1833 for insecure MQTT)

#### 09/04/2025
- more about MQTT and how NEMO Merger can communicate almost instantly with the tool interlocks
- The NEMO API doesn't support any kind of filtering or pagination, if you ping it, it returns the full object

#### 09/03/2025
- Digital low pass filters, especially in terms of IMUs. You don't want all the jittery high frequency noise, so you can implement a low pass filter to just give you the real stuff - used in Smart-T-Bird project


#### 09/02/2025
- g forces in a passenger car without sticky tires is really pretty low I've been told, like less than 1g in acceleration, cornering, and braking
- It takes a serious track or electric vehicle to get you over 1g, or a fighter jet or f1 car - relevant for Smart-T-Bird IMU sensors
- grounding resistors for an LDR make a huge difference. Without the resistor, the LDR is basically always high, like maxed out. I think a 2K resistor ended up being the sweet spot. Almost all the way up - used in Smart-T-Bird auto-dimming display

#### 08/30/2025
- Seems obvious now, but you can't just use any old MOSFET or transistor for high side or low side switching. 
- The LED screen I have only has control over LED power, so I'll have to PWM the high side. No control over ground - used in Smart-T-Bird display control
- Learned about BJTs vs MOSFETs. So many different kinds and types of doping and everything else

#### 08/29/2025
- You can use an ESP32 C3 with CAN, you just need a module that goes from SPI to CAN. Lots of these modules already exist and have the transmitter built in. - used in Smart-T-Bird CAN bus communication 

#### 08/28/2025
- Temporary Voltage Spike diodes and how they work. They're like blow off valves for high instantaneous voltage spikes. I'll need to put one in front of my buck converter in my display - used in Smart-T-Bird power management

#### 08/27/2025
- Google cloud shell and how to set up cron jobs to turn the VM on an off. No need for it to stay on all the time just to run a job a couple times a day! - used in NEMO Merger automation

#### 08/24/2025
- RTOS and how that works, like FreeRTOS. I don't think I need it for any of my current work, but cool to know it exists
- Learned how to do GD&T in OnShape for the yoshimura flange project, to get it on the blog - see 3d-models for the final design


#### 08/23/2025
- Spanish Moss does not natively grow in California, it's actually a lichen called lace lichen, and it's the state lichen of California. The more you know!

#### 08/20/2025
- mkdocs is the truth, started learning about how to lay out a blog using it instead of github pages themes - used to build this index site

#### 08/17/2025
- working with github pages I started learning about layouts of webpages and .scss files

#### 08/10/2025
- I learned about jumbo mortgage loans, anything above about $1.1 million in the bay area
  

#### 08/05/2025
- the google OAuth doesn't work so well with a headless set up like in cron job. It needs to constantly open new ports or whatever on the local host for authentication. It would work for a couple hours and then silently fail
- Service accounts are the way to go for Cron Jobs

#### 08/05/2025
- Messing with the cron job I feel like I have a much better grasp of interacting with the terminal and using nano to modify files. I don't know many commands but definitely the common useful ones. 

#### 08/04/2025
- there are limits to the max power your wifi is allowed to have, set by the FCC. Basically if any one person has too powerful a device it can mess things up for everyone
- You can buy ESP32s without the integrated wifi antenna, and plug your own antennas in.
- The C3s just have totally horrible antenna, they don't connect for shit
- The programming language GO, I wonder if it could help me speed up some algo stuff. 
- cronjobs, set up my first one on the collector computer

#### 07/30/2025
- learned about serial communications, man that stuff is cool. Synchronous, asynchronous, UART, I2C, SPI. It's like you use it and kinda know what's happening but cool to learn it
  
#### 07/28/2025
- MQTT and how that works, kinda
- Started learning about PRAM and the best way to drive displays
- Sometimes deleting a token and reauthenticating is the way to go
- Manually advancing the LVGL clock will solve your problems
- Started learning about Data Structures and algorithms. Learned about "bigO" and the complexity of running nested loops, like how that increases exponentially
- Kinda started on recursive algorithms but those tie my head in a knot

#### 07/25/2025
- reflecting on a past learning, I got all mad at the higher ups because they weren't doing shit, but sometimes the higher ups are also fed up because their higher ups aren't doing shit. So while it's important for your voice to be heard, maybe give them the benefit of the doubt. Maybe. 

#### 07/24/2025
- learned about glancing angle x-ray spectroscopy for very thin films


#### 07/23/2025
- in PlatformIO and C/C++ header files are a lot like modules in python. Or like utils so that's where you put stuff you want to use globally
- I think I learned about build flags, but not sure I get it yet
- if there's errors in your IDE and lots of red lines it probably means your shit is broken
- learned about MISO, MOSI, IRQ, and general SPI interface stuff

  
#### 07/22/2025
- If you need .env and pydantic is being a dick about it, just export it

#### 07/21/2025
- Started this blog! learned about Jekyll and hosting pages on GitHub. I feel cool
- Pydantic is useful because it can super quickly enforce things. You could write lengthy code to enforce types, but Pydantic reduces the boilerplate code you need

#### 07/20/2025
- The best way to remove bushings is to destroy them
  - always start by heating the rubber to get it to release from the metal
  - Push out the rubber, or drill it out, or if you want cancer sooner just burn it out and carbonize it
  - Then remove the shell of the bushing by cutting a groove in it and hammering it out
  - Air hammers work ok, not as well as you'd want. Maybe mine just isn't that strong

#### 07/19/2025
- You can bend the hell out of a control arm with a hydraulic press. You can't just push the center of a bushing as hard as you can and hope it pops out
- MOSI/MISO. Master in slave out, slave out master in. 
- About the stack of code you need to go from arduino IDE to a proper gui
  - It's the driver for the screen, then a graphics package (like LVGL), and then a GUI editor
  - Screens are actually kind of hard
- It's a pain in the ass to set up arduino IDE in VS Code or Cursor


