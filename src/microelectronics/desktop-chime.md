---
layout: page
title: "Desktop Chime"
categories: [microelectronics]
tags: 
  - aluminum
  - machining
  - chime
---

## Project Overview
This is just a fun one, because it's cool to build cool shit. I was walking around campus and I was like damn, I really love the sound of the chime on the hour. As Papi used to say, all you really need to know is the hour. I'd designing an ESP32 based desktop chime that uses Aluminum striker bars with little solenoids to strike the bars. It'd be super pretty to make it out of wood, surely there is some CNC was to do this precisely. I'll use small solenoid strikers to hit the bars really quickly. It'd be nice if it didn't need an internet connection so I'll use an RTC to keep track of the time. Program it once and then it can run forever.

## Specs

Melody Bars (4):
6061 Aluminum
3/32" thick
3/4" wide
Lengths:
4.00"
3.56"
3.27"
3.08"
Hour Strike Bar:
4.7" long
Same width & thickness
Same material

## Up Next:
- Designing the bars
- Having them cut, or cutting them myself
  - Just one length that I cut to size? Not sure how precise this needs to be. 
- Figure out mounting
- Ordering the striker solenoids
- Designing tips for the solenoids so they strike nicely
- Figuring out diodes and MOSFETs to drive the solenoids
  - Just one diode and MOSFET with a bunch of smaller diodes to stop backflow?? But it would be cool to be able to play chords or something!
- Figure out the wood and the form factor I want this to take
  - Five bars, about 3/4" wide, could be something like a 5x5" box with the ESP stuff hidden. Or is there some cool steam punk way to display the PCB and mosfets? Or is the cool part a box that seemingly plays itself?
## Work Log:

### 02/11/2026
**Task:**  Project Inception

**Notes:**
- Started day dreaming, learning about how tone bars work and the physics behind getting the right tone. 
- Real glockenspiels use undercut bars to get better tones, but that add machining challenges so I'll compromise and make longer bars without undercuts.
- Mounting of the bars is super important, and not something you really look at unless you're building your own musical instrument.
- Looks like there's some nylon chords, and the mounting holes need to be 22.4% away from the end of the bar, becasue that's where the nodes are, so that's where it'll be stationary and you can actually support it. 