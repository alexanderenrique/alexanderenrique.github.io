---
layout: page
title: "Desktop Chime"
categories: [microelectronics]
tags:
  - electronics
  - attiny
  - rtc
  - solenoids
  - musical-instruments
  - woodworking
---

## Project Overview

This is just a fun one, because it's cool to build cool shit. I was walking around campus and I was like damn, I really love the sound of the chime on the hour. As Papi used to say, all you really need to know is the hour.

The plan is an ATtiny3216-based desktop chime that strikes tone bars with small solenoids. Pick a song with a knob, hit play (or let it fire on the hour), and it plays from stored note arrays. It'd be super pretty to make it out of wood; surely there is some CNC way to do this precisely. Small solenoid strikers hit the bars really quickly. No internet — an RTC keeps time so you program it once and it can run forever.

## Design Goals

1. Chime on the hour without WiFi or NTP, using standalone RTC timekeeping
2. Selectable melodies (Westminster + a handful of tunes) via a front-panel knob
3. Manual play and clock-sync buttons for demos and time correction
4. Self-contained: set time once, runs indefinitely on wall power

## Melody Bars (4)

| Property | Value |
|----------|-------|
| Material | 6061 Aluminum |
| Thickness | 0.080" |
| Width | 1" |
| Lengths | D3 11", G3 9.5", A3 9",  B3 8.3" |

## Bar Physics & Mounting

Real glockenspiels use undercut bars to get better tones, but that adds machining challenges, I'll compromise and make longer bars without undercuts.

Mounting of the bars is super important, and not something you really look at unless you're building your own musical instrument. The mounting holes need to be **22.4% from the end of the bar**, that's where the nodes are, so that's where it'll be stationary and you can actually support it without killing the resonance.

Some fancy people use like nylon string to support it but that sounds hard so I might just use some small O-rings, or experiment with plastic washers, I worry the O-ring will dampen vibration but you never know.

## Architecture

- **MCU:** ATtiny3216 — scheduling, song playback, button/knob input, LED drive
- **Timekeeping:** External I2C RTC with battery backup (no internet required)
- **Song select:** Rotary knob positions map to melodies (Off, Westminster, and a set of tunes); songs stored as note/delay arrays keyed to tempo
- **Controls:** Play button (trigger selected song) and clock-sync button (nudge time if it drifts)
- **Actuation:** Solenoid strikers on xylophone bars (~30 ms pulses, dithered for a more organic hit)
- **Drive electronics:** 8-channel P-MOSFET DIP driver bank with flyback diodes
- **Indication:** Per-note LEDs with diode + RC fade so strikes glow and slowly dim
- **Enclosure:** Wood body; PLA solenoid holders and striker tips
- **Power:** Wall adapter at 12 V for the solenoids; regulated rail for the ATtiny / RTC

{% mermaid %}
graph LR
    RTC["I2C RTC<br>+ battery"] --> MCU["ATtiny3216"]
    KNOB["Song<br>Select Knob"] --> MCU
    PLAY["Play<br>Button"] --> MCU
    SYNC["Clock Sync<br>Button"] --> MCU
    MCU --> MOSFET["8-ch P-MOSFET<br>Driver Bank"]
    MCU --> LED["LEDs<br>+ RC fade"]
    MOSFET --> SOL["Solenoid<br>Strikers"]
    SOL --> BARS["Xylophone<br>Tone Bars"]
{% endmermaid %}

### Knob / song map

| Position | Song |
|----------|------|
| Off | — |
| 1 | Westminster |
| 2 | Happy Birthday |
| 3 | When the Saints Go Marching In |
| 4 | La Cucaracha |
| 5 | Hot Cross Buns |
| 6 | Mary Had a Little Lamb |
| 7 | Joy to the World |
| 8 | Jingle Bells |
| 9 | Twinkle Twinkle Little Star |

## Electronics: Open Questions

- Solenoid stroke and tip material (rubber vs Delrin) for a clean attack without buzzing the mount
- Photoresistor for night quiet-mode — still on the fence
- Final LED fade RC values and which notes get indicators

## Design specs
- 1.025" bottom to top of bar
- 1.366 bottom of solenoid to top of tip
  - Plus 0.1" for the base
  - so 1.466
- Standoff 1.466 - 1.025 = 0.441
- plus 0.2" for clearance
- 0.641 stand off

## Up Next
- Play with striker, does it sounds the same when hit from the back? (haha)


- ~~Designing the bars~~
- ~~Having them cut, or cutting them myself~~
- Figure out mounting
- ~~Ordering the striker solenoids~~
- Designing tips for the solenoids so they strike nicely

## Work Log

### 08/03/2026
**Task:** Printing solenoid holder

**Notes:**
- It printed...

### 08/02/2026
**Task:** Designing the solenoid holder

**Notes:**
- received the boards and everything I need to assemble them
- Motivated me to make the solenoid holder
  - Took a couple stabs, kinda just figuring it out as I went, but I got there in the end

### 07/14/2026
**Task:** 3D printing

**Notes:**
- started 3D printing my striker tip and solenoid holder I designed the other day

### 07/13/2026
**Task:** PCB

**Notes:**
- Man I was dreaming about LEDs again, so weird
- I finally came up with a design that makes me happy, few more hours on it and I shipped it out for fab
- I'm been doing so much PCB stuff lately, I feel liek I need to touch some grass.
- Haven't even been doing much programming, and when all my boards come in it'll be programming and soldering galore
- Kinda just a big PCB phase, but I think I'm out of the thick of it
- I guess I cranked out a PCB in 4 days, that's pretty good.

### 07/12/2026
**Task:** PCB, CAD

**Notes:**
- Sleeping on it, I wasn't too happy with my massive array of diodes and resistors, so I did what I always do and I asked AI.
- Turns out they sell diode arrays and transistor and resistor arrays. That would save me a ton of space.

### 07/11/2026
**Task:** PCB, CAD

**Notes:**
- Once I start a project, I have a hard time letting go. It's probably not what I should be doing.
- Spend time designing the PCB and thinking about how I might want it to look. It's gonna be a decently big one, lots and lots of components.
- That said, it's going to be pretty straightforward. I learned that I can skip some of the pull-up resistors, that the ATtiny has some built-in pull-ups.
- A lot of the complexity comes from me wanting to have lights that slowly dim out. That means I have to have a diode and an RC circuit in addition to every LED, so that kind of doubles the component count.
- Lots of extra stuff, really. The RTC, the knob that selects the song. 
- I also decided there should be a play button as well as a clock sync button in case we gain or lose any minutes.
- The logic flow will be: you select a song using the knob, and you hit the play button.
- Also designed a single solenoid holder as well as a PLA solenoid tip.
- I learned that the striker time should probably be about 30 ms, and that dithering the pulse time of the Solonadon would be the way to make it sound a bit more organic.
- I also learned that we can store the songs as arrays where we have saved delays based on the tempo of different songs.


### 07/09/2026
**Task:** Thinking, starting the schematic

**Notes:**
- This has been the most slow burn project ever, I've been ordering like on piece at a time for it forever
- Been schemeing about how to do the RTC and keeping the time accurate. 
- My best thought right now is to have the external I2C RTC with battery back up, an Attiny, and the 8 p-type mosftet  DIP, I think that would look cool
- Made a heap of progress on the design, I learned about how to make the KiCAD sexy and having sub sheets and stuff like that
- Pretty much have the schematic thought out, there are just a few footprints to finish massaging and connecting
- I should probably put more energy in to pressing t bird things, but this was a fun distraction for a day
- I thought to include a photo resistor so it could tell when it's dark out, but I'm kinda on the fence about that one, could be cool

### 06/23/2026
**Task:** Receiving parts, thinking

**Notes:**
- Suspended the D3 bar with string, which I think is the longest/lowest, and tried striking it. Didn't sound very good. It did ring but all kinds of out of tune
- I'm abandoning making the tone bars for now, pivoting to using the kids xylophone

### 06/22/2026
**Task:** Receiving parts, thinking

**Notes:**
- Receive the laser-cut chime bars.
  - I haven't pictured them properly for this tone yet, but some of them just sound really flat and bad.
  - I did notice that some had a curvature to them, maybe like 0.050" which I imagine doesn't help the resonant frequency.
- Look into 8 channel MOSFET drivers, they do exist, and they're pretty cheap. I think they'll be a good solution
- I also receive the solenoids. The one that I like works only at 12 V and pulls over half an A when it's first energizing, and then the holding current is about 0.2 A.
- I'm not sure what to do about the chime bars. I would like to have my own tones, but it might not be worth it

### 06/15/2026
**Task:** Ordering the tone bars

**Notes:**
- Went for notes in the 3rd octave, D3, G3, A3, B3.
- Using 0.080" aluminum the length for d3 was 11". Technically a bit shorter, but I left them 2% long. You can always file some off to make it sharper, but if they are all 2% off I think it'll sound good.


### 06/14/2026
**Task:** Moving off the backburner

**Notes:**
- Ordered the solenoids, it's really not clear off of the internet which solenoid will work the best, I know many of them can't stay energized for long, so I need one that is "pulled" by default and I can "Push" it when I want
- I had another send cut send order going out so I figured now would be a good time to design the bars
- I opeted for longer bars than initially planned, I want that good tone so I opted for bars that are 8-11" long
- This also gives me more space to package things underneath
- And if you think about it, it'll still end up being smaller than a regular piece of paper. 

### 02/11/2026
**Task:** Project Inception

**Notes:**
- Started day dreaming, learning about how tone bars work and the physics behind getting the right tone.
- Real glockenspiels use undercut bars to get better tones, but that add machining challenges so I'll compromise and make longer bars without undercuts.
- Mounting of the bars is super important, and not something you really look at unless you're building your own musical instrument.
- Looks like there's some nylon chords, and the mounting holes need to be 22.4% away from the end of the bar, becasue that's where the nodes are, so that's where it'll be stationary and you can actually support it.
