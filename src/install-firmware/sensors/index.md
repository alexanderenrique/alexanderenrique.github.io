---
layout: page
title: "Install Sensor Firmware"
permalink: /install-firmware/sensors/
categories: [microelectronics]
tags: [esp32, firmware, installation, sensor]
---

Install the Sensor Mode firmware for your ESP32-C3 Display device directly from your browser. This firmware enables sensor data visualization and monitoring with NEMO sensor integration.

### Current Version: 1.0.0

### Install Firmware

Connect your ESP32-C3 device via USB and click the button below to install the firmware:

<div style="text-align: center; margin: 2rem 0;">
  <esp-web-install-button manifest="{{ '/install-firmware/sensors/manifest.json' | url }}">
    <button class="install-btn">
      Install Sensor Firmware
    </button>
  </esp-web-install-button>
</div>

<script
  type="module"
  src="https://unpkg.com/esp-web-tools@10/dist/web/install-button.js">
</script>
