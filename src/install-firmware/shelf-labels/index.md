---
layout: page
title: "Install Shelf Label Firmware"
permalink: /install-firmware/shelf-labels/
categories: [microelectronics]
tags: [esp32, firmware, installation, shelf-label]
---

Install the Shelf Label Mode firmware for your ESP32-C3 Display device directly from your browser. This firmware enables e-ink displays for shelf labels.

### Current Version: 1.0.0

### Install Firmware

Connect your ESP32-C3 device via USB and click the button below to install the firmware:

<div style="text-align: center; margin: 2rem 0;">
  <esp-web-install-button manifest="{{ '/install-firmware/shelf-labels/manifest.json' | url }}">
    <button class="install-btn">
      Install Shelf Label Firmware
    </button>
  </esp-web-install-button>
</div>

<script
  type="module"
  src="https://unpkg.com/esp-web-tools@10/dist/web/install-button.js">
</script>

For more information about this project, see the [E-Ink Display]({{ '/projects/e-ink-display/' | url }}) project page.
