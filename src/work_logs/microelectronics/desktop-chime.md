---
layout: page
title: "Desktop Chime"
categories: [microelectronics]
tags:
  - electronics
  - esp32
  - rtc
  - solenoids
  - musical-instruments
  - woodworking
---

## Project Overview

This is just a fun one, because it's cool to build cool shit. I was walking around campus and I was like damn, I really love the sound of the chime on the hour. As Papi used to say, all you really need to know is the hour.

The plan is an ESP32-based desktop chime that uses aluminum striker bars with small solenoids to strike the bars. It'd be super pretty to make it out of wood — surely there is some CNC way to do this precisely. Small solenoid strikers hit the bars really quickly. It'd be nice if it didn't need an internet connection, so I'll use an RTC to keep track of the time. Program it once and then it can run forever.

## Design Goals

1. Chime on the hour without WiFi or NTP — standalone RTC timekeeping
2. Pleasant tone from simple rectangular aluminum bars (no undercut machining)
3. Compact-ish desktop form factor (I want it to be smaller but physics is dogmatic about tone and length)
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

- **MCU:** ESP32 — firmware, scheduling, solenoid drive logic
- **Timekeeping:** External RTC module (no internet required)
- **Actuation:** 4× solenoid strikers 
- **Drive electronics:** MOSFET + flyback diode per solenoid (or shared drive with per-channel diodes — TBD)
- **Enclosure:** Wood body, CNC or manual layout for bar mounting and solenoid placement
- **Power:** Wall adapter, 5 V or 12 V depending on solenoid choice

{% mermaid %}
graph LR
    A["RTC"] --> B["ESP32"]
    B --> C["MOSFET<br>Driver Bank"]
    C --> D["Solenoid<br>Strikers"]
    D --> E["Aluminum<br>Tone Bars"]
{% endmermaid %}

## Electronics — Open Questions

- One MOSFET + diode per solenoid for independent chord playback, vs. shared driver with blocking diodes
- Solenoid voltage and stroke — need to strike quickly without rattling the mount
- Custom striker tips (rubber or delrin?) to get a clean attack without buzzing
- RTC choice and battery backup for power-loss time retention

## Mechanical / Form Factor

Four bars, 1" wide 

- Bar sourcing: order pre-cut lengths vs. buy stock and cut to size — not sure how precise length needs to be yet
- Mounting frame: wood base with node-point suspension holes
- Solenoid placement: aligned to strike bar just off of center

## Up Next
- Play with striker, does it sounds the same when hit from the back? (haha)
- Start loosely designing circuit
- Can I get the aluminum bars to work? It might be cool to have the whole octave notes anyways...

- ~~Designing the bars~~
- ~~Having them cut, or cutting them myself~~
- Figure out mounting
- ~~Ordering the striker solenoids~~
- Designing tips for the solenoids so they strike nicely

## Work Log

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
