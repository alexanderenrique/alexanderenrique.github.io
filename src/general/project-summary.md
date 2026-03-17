# Project Summary — High-Level Overview

## 1. MQTT Project (NEMO Tool Status)
*Source: [[NEMO-MQTT-Bridge]], [[NEMO-Tool-Display-Hardware]]*

### Problem Statement
Lab members need real-time visibility into tool status (enabled/disabled) without polling the NEMO API, which is too slow for instant feedback. The NEMO API takes ~2 minutes per call, making it unsuitable for time-sensitive status updates when someone enables or disables a tool.

### Technology Stack
**Software:**
- Django (NEMO-CE plugin)
- Redis (message queue intermediary)
- MQTT (Mosquitto broker)
- HMAC message authentication, MQTT username/password
- PyPi package: NEMO-MQTT-Bridge

**Hardware:**
- ESP32
- 4" SPI TFT display with touch
- Custom PCB, 3D-printed enclosure

### Current Status
- Plugin working end-to-end: NEMO → Redis → MQTT → ESP32 display
- Deployed to collector VM; HMAC and password auth in place
- Monitor page shows messages in human-readable format

---

## 2. E-Ink Display
*Source: [[e-ink-display]]*

### Problem Statement
Need low-power, battery-operated displays for lab environments, inventory/shelf labels, and environmental sensing. E-ink only draws power when updating, enabling long battery life.

### Technology Stack
**Hardware:**
- ESP32 (ESP32-C3, ESP32-C6 for low-power variants)
- 2.9" E-Ink display (through-hole)
- SHT31 temperature/humidity sensor
- MicroSD card slot, RTC module for offline data collection (Upcoming)
- Custom PCB, LiPo battery

**Software:**
- Firmware with configurable modes: Sensor with and without NEMO connection, Shelf Label connecte to NEMO
- BLE configuration
- OTA updates via Raspberry Pi + Caddy + Cloudflare tunnel
- Web-based firmware uploader, NEMO integration for data push

### Current Status
- PCB V2 assembled and working; sensor mode pushing >1% battery/day at 30min refresh
- Four modes: Sensor (temp/humidity → NEMO), Shelf Label (recurring charges)
- OTA pipeline, BLE config, web .bin uploader working
- Before UGIM: SOP for assembly, documentation site, OSHWA certification, Stanford OTL blessing
- Next: Power consumption testing, PCB V3 (gated power), RTC/SD card non-wifi option

---

## 3. Pump Monitor Module
*Source: [[pump_monitor_module]]*

### Problem Statement
Vacuum pumps need preventive monitoring and maintenance. Manual checks are unreliable; continuous monitoring of temperature, current, and vibration can improve uptime and reduce failures.

### Technology Stack
**Hardware:**
- Monitor unit: ESP32-C3 (SEEED), TFT display, RTC, SD card, RS-485 transceiver, RJ45 connector
- Pump module: ESP32-C3, CT sensor (SCT-013-000), NTC thermistors, MPU6050 accelerometer
- LDO regulator, op-amp for CT signal conditioning
- Through-hole only for hand assembly

**Software:**
- ESP32 firmware for sensor data collection and NEMO integration
- Touch UI for configuration and alarm acknowledgment

### Current Status
- Prototype online and sending data to NEMO
- RTC and SD card writing working on breadboard
- PCB design in progress; RS-485 transceiver selected (MAX3485)
- CT sensor still needs op-amp improvements for signal clarity
- Next: RS-485 communication testing, Op-Amp wiring, PCB fabrication

---

## Summary Table

| Project | Problem | Status |
|---------|---------|--------|
| MQTT | NEMO tool status not real-time | Working end-to-end; SSL/TLS pending |
| E-Ink | Low-power lab displays | V2 working; V3/V4 planned |
| Pump Monitor | Preventive pump maintenance | Prototype → NEMO; PCB design phase |
