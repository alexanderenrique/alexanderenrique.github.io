---
layout: page
title: "Vacuum Pump Monitor Module"
categories: [microelectronics]
tags: 
  - electronics
  - esp32
  - sensors
  - monitoring
  - preventive-maintenance
  - nemo
  - imu
  - temperature
  - current-sensing
  - vibration-analysis
  - embedded-systems
---

## Project Overview: Using technology to take better care of our vacuum pumps, preventive monitoring and maintenance. It will us a CT sensor to measure current, and an IMU to measure vibration, and a couple thermistors to measure temperature. It will integrate with our existing lab management system, NEMO, to provide real-time monitoring and alerts.


## Hardware Components:
- ct sensor sct-013-000
  - output 0-1.25v output
- 10 kOhm ntc
- MPU6050 accelerometer
- 3.5mm jack for connection to different amperage sensors
- u.fl to sma long connector 50ohm
- SMA rubber ducky antenna

## Work Log:

### 12/8/2025
**Task:** Holder design, code development

**Notes:**
- designed a holder for the monitor perf board. 
- My worry is that I'll isolate the vibration sensor too much and the signal won't be as strong but we'll see
- Started writing the code, took me a minute but I did it without cursor!
- The PIO set up took a sec, and took another sec to get the ESP32 working with the serial out. 
- Printed the holder, went well. I undersized the holes by 8 thousands, and with such a tiny screw they were almost impossible to get in. 

### 12/7/2025
**Task:** Perf Board Assembly

**Notes:**
- Talk about rapid prototyping, had the idea on a Friday, and built it on a Sunday. Shout out Amazon.
- Learned about the pitfall of CT clamps, you can't just clamp them around the whole wire, you must have an exposed loop. If you clamp the whole wire the fields cancel out and you don't get a reading. 
- I tested it by splitting the wire on my box fan, highest setting it read 0.06 VAC, which if 10A=1VAC, then that's 0.6A, which is about right for a box fan. I think. 
- Soldered together the perfboard, went well actually. Made a firecracker of a device I've gotten way better at perf board building, I get it now. 
- I made the mistake of putting the NTCs on the bottom of the voltage divider, but I'm just going to try it as is and see what happens.


## Open questions:
- What is the current range of our pumps? Do we need different current ranges for different pumps?
- Is the thermistor accurate, is the code right and my wiring good?
- is the 2gs for the vibration sensor a good range?
- Is there a safer way to do the current clamp, other than hacking a cable open?