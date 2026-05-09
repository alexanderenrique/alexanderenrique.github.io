---
layout: page
title: "E‑Ink Display guide"
description: "Step-by-step: parts, assembly, firmware, and configuration for the ESP32 e-ink display"
permalink: /guides/e-ink/
---

Your one stop shop for building, flashing, and configuring the ESP32 e‑ink display.

## Build Flow

Use this path to go from bare parts to a configured display.

### 1. Order the hardware

- **PCB** — (revision, fab house, which zip/gerbers to upload)
- **Passive components** — resistors, capacitors, etc. (reference BOM)
- **MCU** — ESP32 module or dev board as used in your revision
- **E-ink display** — panel matching the PCB (size, connector, partial refresh support if relevant)

### 2. Solder the board

- Assembly order that avoids hard-to-reach joints (e.g. low profile parts first, if applicable)
- **Tips** — flux, temperature, common cold-joint checks, how to seat the display connector without stressing the flex, ESD notes, anything specific to this PCB

### 3. Choose a firmware mode

- **Sensor** — show temperature, humidity, or other sensor readouts
- **Shelf label** — display static or slowly changing label content
- **Messages** — show text updates or short messages
- **Fun app** — display lightweight fun facts or interactive content

### 4. Connect to a computer and open the firmware page

- USB cable / driver notes if needed
- In the browser, go to the right **install firmware** page for the app you want from the portal below

### 5. Install firmware

- Put the device in bootloader / flash mode per your board (button sequence or auto)
- Run the web installer through completion; confirm no errors

### 6. Reboot and pair over Bluetooth

- Power-cycle or reset after flashing
- Device should advertise for **Bluetooth Low Energy (BLE) pairing** so you can reach it from the config UI

### 7. Set configuration in the browser

- Open the matching **configuration** page for your firmware mode from the portal below
- Pair when prompted, then set Wi-Fi, intervals, labels, MQTT, or other options as your app requires
- Save / apply and confirm the display behaves as expected
- Iterate on update intervals, labels/messages, and any integration settings

## E‑Ink Portal

<div id="e-ink-portal" class="e-ink-intro">
  <p>Configure and install firmware for ESP32-powered e‑ink displays.</p>

  <div class="e-ink-modes">
    <div class="mode-card">
      <h3>Firmware installation (browser)</h3>
      <p>Install firmware directly from your browser. Choose from Sensor Mode, Shelf Label, Messages, or Fun App firmware.</p>
      <a href="{{ '/install-firmware/sensors/' | url }}" class="btn">Install Sensor Firmware</a>
      <a href="{{ '/install-firmware/shelf-labels/' | url }}" class="btn">Install Shelf Label Firmware</a>
      <a href="{{ '/install-firmware/messages/' | url }}" class="btn">Install Messages Firmware</a>
      <a href="{{ '/install-firmware/fun/' | url }}" class="btn">Install Fun App Firmware</a>
    </div>

    <div class="mode-card">
      <h3>Configuration (BLE)</h3>
      <p>Configure your displays wirelessly via Bluetooth Low Energy (BLE). Set up sensor monitoring, shelf labels, messages, or fun interactive content.</p>
      <a href="{{ '/e-ink/config-sensor/' | url }}" class="btn">Configure Sensor</a>
      <a href="{{ '/e-ink/config-label/' | url }}" class="btn">Configure Shelf Label</a>
      <a href="{{ '/e-ink/config-messages/' | url }}" class="btn">Configure Messages</a>
      <a href="{{ '/e-ink/config-fun/' | url }}" class="btn">Configure Fun</a>
    </div>
  </div>
</div>
