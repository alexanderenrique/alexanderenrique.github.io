---
layout: page
title: "T-Bird Display Node"
categories: [microelectronics]
tags:
  - electronics
  - thunderbird
  - esp32
  - display
  - automotive
  - pcb
---

## Project Overview

A display/control node for the Smart Thunderbird project. Intended to show real-time engine and sensor data (temp, voltage, RPM, etc) in the car using a robust, automotive-ready display driven by an ESP32. Focus on reliability, visibility, and integration with RS-485/CAN bus for future expansion.

**Repo:** [smart_tbird/display](https://github.com/alexanderenrique/smart_tbird/tree/platformIO/display)  
**T-Bird hub:** [denton.works/microelectronics/T-bird_electronics/](https://denton.works/microelectronics/T-bird_electronics/)

-----------------------------------

## Things to display

### Current

| Parameter      | Alarm Min | Alarm Max |
| -------------- | --------- | --------- |
| Voltage        | 12        | 15        |
| Oil temp       | 0         | 100       |
| Coolant Temp   | 0         | 100       |
| Trans temp     | 0         | 85        |
| O2 Sensor      | 10        | 15        |
| PCB temp
| RPM
| Ambient Air

### Future

| Parameter             | Alarm Min | Alarm Max |
| --------------------- | --------- | --------- |
| MAP                   | None      | 7 PSI     |
| Methanol line pressure| 70        | 150       |
| Methanol spray        | Bool      | ??        |

## Node features
- connection to touch 4" TFT display
- voltage regulated input
- RS-485
- PWM dimming circuit via LDR
- RGB Warning light (integrated somewhere cool?)
- INput voltage divider
- NTC for board/ambient temp

## Work Log

### 07/26/26
**Main Task:**  Mounting in box

**Notes:**
- Drilled some holes in the existing box but that just didn't turn out quite the way I wanted it to 
- I just used some VHB tape to get it in there, I am starting to get a bad case of the "doesn't have to be perfect, just has to work" 

### 07/15/26
**Main Task:**  Mounting design

**Notes:**
- Spent like an hour designing a bracket, I decided that using the existing cubby would be the best and easiest way to do it
- If I mounted it vertically, I could save some space and still have a cubby, but for some reason I just can't bring myself to do that, it just isn't what I want even if it is the better engineering solution
- Started 3D printing it, it fit perfect first try, that never happens

### 07/14/26 (afternoon)
**Main Task:**  RS-485 Troubleshooting, mounting

**Notes:**
- yeah that was it, swapped to RX/TX2 and it worked perfect. It be like that sometimes
- I even did some faster rpm sweeps, and it looked really good. CPU utilization was up and the FPS was single digits, but whatever.
- I was even able to translate the sketch over to the ATtiny3226, and that worked perfectly the first time.
- I didn't realize it, but I'm using the non-standard RX and TX on the ATtiny3226. I'm using PA1 2 and 3 
- I'm starting to think about how I'm going to mount this thing.
- I think I'm going to reuse the old box because it's useful and then just incorporate a bracket screwed to the inside of it.

### 07/14/26
**Main Task:**  RS-485 Troubleshooting

**Notes:**
- Yeah so it was never going to work right away
- The display side actually came good with a little troubleshooting, the modbus that I wrote wasn't really sending bits, but then I uploaded a test RS-485 sketch and that was sending actual bits at the right speed so that was good
  - Thinking about it, not sure what language the RS-485 demo actually speaks, but at least the bit time matchess what I expect from the baud. 
- Troubleshooting it I learned a bit more about how the RS-485 works and how the master can get away with not having an RE-DE
- Update I think I actually cracked it after stepping away for a bit. 
  - I had it wired, wrong, it was always me that was the problem...
  - I was using GPIO 3/1 for RX and TX but this is the UART that talks to the serial monitor and is busy
  - I should have wired it to 16/17 which is the RX2/TX2 which is free for RS-485

### 07/13/26
**Main Task:**  Display a day early!

**Notes:**
- The display came, and would you believe that it actually worked on the very first flash?
- Did some light UI modifications through cursor. Things didn't translate 100% between the two, between PicoPixel and the display.
- Man just going so fricking well, aint no way the RS-485 works out of the box, right? 

### 07/11/26
**Main Task:**  PicoPixel!

**Notes:**
- I learned that LVGL Pro Editor is not the way to go about this. It's a good way to customize widgets, but not really like a drag-and-drop UI maker.
- Gemini suggested PicoPixel, and that's what I ended up using. It was pretty dang easy to use. Not the most powerful, but it's a super good start.
- I finally understood the architecture and who's responsible for what.
  - The UI design software just creates a template, and then I have to go in and write the code that actually updates the values that I'm receiving, which makes sense.
- Designed to screens: a main kind of dashboard with the most pertinent info, and then a smaller display that has kind of the sillier stuff like fan PWM, underhood temp, and PCB Mosfet temp
- I mean cmon this looks pretty cool:
![LVGL PicoPixel UI design snapshot](/images/picopixel-ui-design.png)

### 07/07/26
**Main Task:**  Buying more displays

**Notes:**
- A lovely intern suggested I look into ESP32 powered displays and lo and behold there are some good options out there
- I found an option from Waveshare that even has RS-485 built in, and tolerates from 5-36 volts or something like that
- I also got an email from the Stone people. I kinda regret buying that one, I think the ESP32 option will work out better but I'll side by side them 

### 07/05/26
**Main Task:**  Stone HMI software

**Notes:**
- Found a copy of the Stone GUI software online, and against my better judgment, I downloaded a totally unsafe application from the Internet.
- There's some YouTube tutorials that have like 50 views that I think are going to be my saving grace. It seems pretty easy to use once I learn it.
- I think from here I'm going to go ahead and order a display and see if the free version of the software I got will actually upload to it.

### 07/03/26
**Main Task:**  ESP ain't gonna cut it

**Notes:**
- I tried doing gestures and graphics using my standard ESP32 and touch-TFT display, and it is just so slow that it's unusable.
- Learned all about PS RAM and how much power it takes to really run a display smoothly
- So I learned that the ESP32 itself has the ability to drive a TFT screen very smoothly if it has all that PS RAM. Whenever it's broken out into a dev board like this, it doesn't interface with the display in a way that actually makes it any faster. They're still bottlenecked by this SPI interface.
- Then I went down a rabbit hole of seeing if I could use an ESP32-controlled monitor. Adafruit does sell some options for that, but they're all kind of small.
- Then I thought, I know it's a big screen that has a lot of compute and a tablet, so I looked into hacking tablets and such. That could be a viable option, but the boot time would be unacceptable for me. I want microcontroller instant on, just like a real car.
- So then I found a company called StoneHMI, and I guess they sell displays for PLCs and stuff like that. That's pretty promising.
- I would have to learn their GUI software if I can even get a copy, but in terms of speed and legitness, this is definitely the way to do it.

### 07/02/26
**Main Task:**  LDR, schematic, PCB

**Notes:**
- Measured the resistance of the LDR that I have in the ambient bedroom light, measured around 2kOhm. Totally covered it measured 5k, so I'm thinking something like a 2k resistor
- 

### 07/01/26 (afternoon)
**Main Task:**  Breadboarding, PWM and touch

**Notes:**
- Swapped some touch wires around, the touch half magically started working but whatever
- Messed with the PWM. I learned that the pull-up resistor really is important without the pull-up, there's nothing to ever pull the gate high, so it'll never turn off.
- Also learned that there is some capacitance thing happening at 40 kHz, and it never dims quite right, so by lowering the frequency to like 5,000 kHz, I was able to get much better dimming, even down to a thousand actually.
- I was using the 3.3 V rail, so I think it will be more pronounced yet when I use a proper 5 V supply, but the concept will work.
- I also learned the importance of current-limiting resistors in series. The voltage rail on the ESP32 was seriously sagging to the base of the NPN, but as soon as I added a resistor, lo and behold, the voltage came back, as the NPN wasn't trying to pull all the current in the world.

### 07/01/26
**Main Task:**  Breadboarding, getting display working

**Notes:**
- Took me forever to get the breadboard right, idk maybe I'm just tired from too many 5am mornings
- The ported over code took some massaging but it did work eventually
  - Lots of booting errors
- Took a second to get the USB right on the new board. I learned the two ports have different purposes, one is USB to UART the other is for USB peripherals
  - You're supposed to use the UART one for programming, but I got the other one to work. Maybe I have it backwards or something
  - The RGB on the dev board is a trip
- Still working on getting the touch going. That does tend to be pretty fiddly
- Now that I have the oscilliscope it's game on though, super keen on that

### 06/30/26
**Main Task:**  Cursor coding

**Notes:**
- With the sensor node shipped out, I can start turning my attention to this little guy which I anticipate to be a fair bit easier
  - Way less going on, less constrained for space, etc
- Started by porting the old code over
- I guess thinking about it, I really really always want to know the voltage, and if the engine node dies I'll lose that
  - I'll duplicate that and the NTC on both boards, it's easy enough

### 06/23/26
**Main Task:**  Scheming, spending money

**Notes:**
- The little ESP32 30 pin dev board *can* run the 4" display, but if I want graphics and real sexyy things I'll need more horsepower
- SEEED makes an S3 dev board, but I opted for a Hoysond one coming in at $5 a board, dual core processor, DMA, lots of good stuff