---
layout: page
title: "Install Fun App Firmware"
permalink: /install-firmware/fun/
categories: [microelectronics]
tags: [esp32, firmware, installation, fun-app]
---

Install the Fun Mode firmware for your ESP32-C3 Display device directly from your browser. This firmware enables different informative APIs, and some fun ones. 

### Current Version: 1.0.0

### Install Firmware

Connect your ESP32-C3 device via USB and click the button below to install the firmware:

<div style="text-align: center; margin: 2rem 0;">
  <esp-web-install-button manifest="{{ '/install-firmware/fun/manifest.json' | url }}">
    <button class="install-btn">
      Install Fun App Firmware
    </button>
  </esp-web-install-button>
</div>

<script
  type="module"
  src="https://unpkg.com/esp-web-tools@10/dist/web/install-button.js">
</script>

For more information about this project, see the [[e-ink-display]] project page.
