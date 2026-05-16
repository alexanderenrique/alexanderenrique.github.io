---
layout: page
title: "E‑Ink Display guide"
description: "Step-by-step: parts, assembly, firmware, and configuration for the ESP32 e-ink display"
permalink: /guides/e-ink/
---

## Build Flow

Use this path to go from bare parts to a configured display.

### 1. Obtiain the hardware

- **PCB** — Buy one freom me *here* or have your own manufactured by uploading the .zip file
  - Also feel free to modify, that's what makes this fun
- **Passive components** — resistors, capacitors, MOSFETs, you can find the Bill Of Materials (BOM) *here*

### 2. Start Printing the enclosure
- For maximum efficiency you'll want to start printing the enclosure first. You can find the STL *here*
- The print will require support for the charging port hole, unless you have some very swanky 3D printer
- PLA works fine, though you could print it from something else if you felt like it
- The print takes roughly 40 minutes on a Creality K1, you speed will vary of course


### 3. Solder the board

- Order of the components doesn't really matter, though I prefer to start with all the passives like resistors and capacitors
- I would suggests first adding the pins to the ESP32 Dev board, then applying a small amount of solder to the battery pads, and then soldering battery wires to the pads
- Once the ESP32 Assembly is complete with header pins and battery wires, then it can be carefully inserted onto the PCB
- The only slightly challenging component to solder is the P-Type MOSFET which is in the SOT-223 packaging. I would suggest tinning one pad on the PCB, then placing the MOSFET on the boart and then reflowing the solder to capture the MOSFET

### 3. Flash the Firmware

- Connect your ESP32 to your computer, selecting "allow accessory to connect" if prompted
- Pull up the e-ink portal *here* and select which firmware you would like to flash
- Follow the prompts on the flashing page

- **Sensor** — show temperature, humidity, or other sensor readouts
- **Fun app** — display lightweight fun facts or interactive content


### 7. Set configuration in the browser

- Open the matching **configuration** page for your firmware mode from the portal below
- Press the reset button on the ESP32, at which point the ESP should display "Bluetooth Pairing Mode"
- The display is now available for pairing, select you device and push the "send configuration" button on the configuration page
- Upon receiving the configuration, the display will exit Bluetooth mode and start displaying the App content chosen


## E‑Ink Portal

<div id="e-ink-portal" class="e-ink-intro">
  <p>Configure and install firmware for ESP32-powered e‑ink displays.</p>

  <div class="e-ink-modes">
    <div class="mode-card">
      <h3>Firmware installation (browser)</h3>
      <p>Install firmware directly from your browser. Choose Sensor or Fun App firmware.</p>
      <a href="{{ '/install-firmware/sensors/' | url }}" class="btn">Install Sensor Firmware</a>
      <a href="{{ '/install-firmware/fun/' | url }}" class="btn">Install Fun App Firmware</a>
    </div>

    <div class="mode-card">
      <h3>Configuration (BLE)</h3>
      <p>Configure your displays wirelessly via Bluetooth Low Energy (BLE). Set up sensor monitoring or fun interactive content.</p>
      <a href="{{ '/e-ink/config-sensor/' | url }}" class="btn">Configure Sensor</a>
      <a href="{{ '/e-ink/config-fun/' | url }}" class="btn">Configure Fun</a>
    </div>
  </div>
</div>
