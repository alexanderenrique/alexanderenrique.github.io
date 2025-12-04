---
layout: page
title: "500mA Constant Current LED Driver"
categories: [microelectronics]
tags: 
  - electronics
  - LED
  - dimming
  - constant-current
  - pwm
  - embedded
  - power-supply
  - buck-boost
  - LT3478
---

# Constant Current LED Driver

## Project Overview
As hobbyist, there aren't any off the shelf modules for driving LEDs at constant current if you want to do dimming. The way people mostly do it now is to do PWM on the voltage supply or ground of the LED which isn't as good. Not as healthy for the LED because the current is not constant, especially as things begin to heat up.

However, constant current has its own set of challenges, and there aren't any hobbyist friendly breadboards that are designed around these chips. They have way more inputs, outputs, configuratbility options and just generally things to know. So I'm building my own.

## Target Design Specs:
- Supports PWM dimming (the whole point of this is to be able to dim LEDs)
- Works from 3–16 V input (good for breadboard or car voltages)
- Provides up to ~500 mA of regulated LED current (as set by RSENSE Resistor)
- Uses a switch-mode constant-current LED driver (not linear)
- Uses an inductor-based buck/boost driver
- Has smooth power-on behavior (soft start)
- Has  thermal foldback with an NTC
- Includes a small MCU for control and configurability
- Designed to be breadboard-friendly and commercializable

## Fixed Values in the design:
- RSENSE Resistor: 0.2–0.3 Ω, to limit power to 0.5A (enough for most any single LED)
- LT3478: 2MHz switching frequency (minimize that ripple)
- Inductor: 4.7uH, this is a good value for a buck/boost converter where Vin=Vout

## Control flow:
{% mermaid %}
flowchart TD
    A[User<br>sets PWM<br>brightness] --> B[MCU<br>reads PWM<br>input]
    B --> C[MCU<br>determines<br>LED current<br>(uses Vin, Vout,<br>NTC temp,<br>RSENSE max current)]
    C --> D[MCU outputs<br>PWM signal]
    D --> E[RC circuit<br>smooths PWM<br>(0–1.24V)]
    E --> F[CTRL1 input<br>on LT3478]
    G[NTC<br>(temperature sensor)] --> H[CTRL2 input<br>on LT3478]
    F & H --> I[LT3478<br>drives LED<br>at commanded current]
{% endmermaid %}

## Hardware Components Decided so far:
- LED Driver: LT3478 = external inductor + external sense resistor
  - Wide VIN (3–36 V)
  - ~2 MHz switching
  - PWM dimming support
  - CTRL1/CTRL2 analog dimming
  - Soft start
  - Thermal foldback with NTC
  - Known good design notes
- Inductor: 
  - 4.7uH
  - 1A max current
  - DCR < 0.1 Ω, minimize heat at higher power levels
  - This value can remain pretty fixed if Vin=Vout, otherwise it needs to be dynamic
  - Saturation current ≥ 1.2 A
- Sense Resistor:
  - Power: 1/2 W
  - Value: 0.2–0.3 Ω
- NTC:
  - 10kΩ 

## Breakout Board Pinout:
- Input Side:
  - VCC: Control voltage for the chips
  - Vin: Input voltage for LED
  - GND: Ground for chips 
  - LED: PWM command
- Output Side:
  - LED+: LED positive terminal
  - LED-: LED negative terminal

## Pinout of the LT3478:
- Vin: Input voltage
- GND: Ground
- CTRL1: PWM input from the MCU to control the current based on what Vin and Vout are
- CTRL2: Analog dimming input 2, can be connected to a seperate NTC to control the thermal regulation
- RSENSE: Sense resistor input, this is the resistor that determines the max power the LT3478 will push

## Other Sub Circuits I'll need:
- Voltage divider for the NTC to control the thermal foldback
- Voltage divider for the Vin and Vout to control the current based on what Vin and Vout are
- RC circuit to smooth the PWM signal to CTRL1
  
## Other Things to figure out:
- Do I really want two NTCs? Like if the MCU chip fails it's already game over.
- Re-flow oven, creating a little PID controlled oven for the reflow
- Silk screen the solder paste on
